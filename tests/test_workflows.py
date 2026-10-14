"""NEW offline tests for this public excerpt package, written 2026-10-14."""
import json
import os
import sqlite3
import unittest
from pathlib import Path
from tempfile import TemporaryDirectory
from unittest.mock import patch
from careeragent.evidence import search
from careeragent.privacy import privacy_minimize
from careeragent.receipts import SCHEMA, record_receipt, set_status
from fixtures import source_database
from servari import autonomy
from servari.provider_messages import _to_messages, _newest_user_text, _max_tokens
from servari.context_queue import check_gate_queue


class EvidenceTests(unittest.TestCase):
    def setUp(self):
        self.temporary = TemporaryDirectory(prefix="public-evidence-test-")
        self.root = Path(self.temporary.name)
        self.connection = source_database(self.root)

    def tearDown(self):
        self.connection.close()
        self.temporary.cleanup()

    def test_casefold_all_terms_and_priority(self):
        found = search(self.connection, ["COORDINATION", "review"], self.root)
        self.assertEqual([r["source_id"] for r in found], ["SYNTH-001", "SYNTH-002"])

    def test_root_filter_is_parameterized(self):
        self.assertEqual(search(self.connection, ["coordination"], self.root,
                                root_ids=["synthetic' OR 1=1 --"]), [])

    def test_limit_and_empty_query(self):
        self.assertEqual(len(search(self.connection, ["coordination"], self.root, limit=1)), 1)
        for query in ([], [""], [" "]):
            with self.assertRaises(ValueError):
                search(self.connection, query, self.root)
        for limit in (0, -1, True, 101):
            with self.assertRaises(ValueError):
                search(self.connection, ["coordination"], self.root, limit=limit)

    def test_failed_extraction_excluded(self):
        self.connection.execute("UPDATE source_files SET extraction_status='failed'")
        self.assertEqual(search(self.connection, ["coordination"], self.root), [])

    def test_outside_namespace_excluded(self):
        with TemporaryDirectory(prefix="outside-example-") as external:
            path = Path(external) / "outside.txt"
            path.write_text("coordination", encoding="utf-8")
            self.connection.execute("UPDATE source_files SET extracted_path=?", (str(path),))
            self.assertEqual(search(self.connection, ["coordination"], self.root), [])

    def test_snippet_is_minimized_and_no_paths_emitted(self):
        result = search(self.connection, ["coordination"], self.root, context=1000)[0]
        self.assertIn("[email redacted]", result["snippet"])
        self.assertNotIn("reviewer@example.invalid", result["snippet"])
        self.assertNotIn("source_path", result)
        self.assertEqual(privacy_minimize("2026-10-14"), "2026-10-14")


class ReceiptTests(unittest.TestCase):
    def setUp(self):
        self.temporary = TemporaryDirectory(prefix="public-receipt-test-")
        self.root = Path(self.temporary.name)
        self.receipt = self.root / "receipt.txt"
        self.receipt.write_text("SYNTHETIC: Application received for APP-SYNTH at Fictional Research, Analyst", encoding="utf-8")
        self.connection = sqlite3.connect(":memory:")
        self.connection.executescript(SCHEMA)
        self.connection.execute("INSERT INTO applications(application_id,employer,role,status) VALUES(?,?,?,?)",
                                ("APP-SYNTH", "Fictional Research", "Analyst", "Preparing"))

    def tearDown(self):
        self.connection.close()
        self.temporary.cleanup()

    def record(self):
        return record_receipt(self.connection, "APP-SYNTH", self.receipt, self.root)

    def submit(self, receipt_id, source="MANUAL_RECEIPT_VERIFIED"):
        return set_status(self.connection, "APP-SYNTH", "Submitted", source,
                          submission_evidence_reference=receipt_id)

    def test_confirmation_identity_and_hash_allow_synthetic_transition(self):
        receipt_id = self.record()
        self.submit(receipt_id)
        self.assertEqual(self.connection.execute("SELECT status FROM applications").fetchone()[0], "Submitted")

    def test_tampered_artifact_rejected(self):
        receipt_id = self.record()
        self.receipt.write_text("changed after capture", encoding="utf-8")
        with self.assertRaises(ValueError):
            self.submit(receipt_id)

    def test_missing_confirmation_rejected(self):
        self.receipt.write_text("Fictional Research Analyst APP-SYNTH draft only", encoding="utf-8")
        with self.assertRaises(ValueError):
            self.submit(self.record())

    def test_wrong_identity_rejected(self):
        self.receipt.write_text("Application received for a different fictional employer and role", encoding="utf-8")
        with self.assertRaises(ValueError):
            self.submit(self.record())

    def test_unapproved_status_source_and_missing_receipt_rejected(self):
        with self.assertRaises(ValueError):
            self.submit(self.record(), "CALLER_ASSERTED")
        with self.assertRaises(ValueError):
            self.submit(None)

    def test_receipt_namespace_and_empty_file(self):
        with TemporaryDirectory(prefix="outside-receipt-") as external:
            with self.assertRaises(ValueError):
                record_receipt(self.connection, "APP-SYNTH", self.receipt, Path(external))
        self.receipt.write_text("", encoding="utf-8")
        with self.assertRaises(ValueError):
            self.record()


class ServariTests(unittest.TestCase):
    def test_high_risk_and_invalid_scores_always_queue(self):
        with TemporaryDirectory(prefix="public-policy-test-") as temporary:
            with patch.dict(os.environ, {"SERVARI_HOME": temporary}):
                for level in range(6):
                    self.assertTrue(autonomy.set_level("synthetic-agent", level)["ok"])
                    for score in (17, 18, 19, 20, True, "8", 3, 21, None, 8.0):
                        self.assertEqual(autonomy.decide("synthetic-agent", score)["verdict"], "queue")

    def test_default_level_and_safe_score(self):
        with TemporaryDirectory(prefix="public-policy-test-") as temporary:
            with patch.dict(os.environ, {"SERVARI_HOME": temporary}):
                self.assertEqual(autonomy.get_level("synthetic-agent"), 2)
                self.assertEqual(autonomy.decide("synthetic-agent", 8)["verdict"], "report")
                self.assertEqual(autonomy.decide("synthetic-agent", 9)["verdict"], "queue")

    def test_provider_shape_is_only_messages(self):
        turns = [{"from": "user", "text": str(i)} for i in range(25)]
        messages = _to_messages(turns)
        self.assertEqual(len(messages), 21)
        self.assertEqual(messages[1]["content"], "5")
        self.assertEqual(_newest_user_text(turns), "24")
        self.assertEqual(_max_tokens({"max_tokens": "broken"}), 2048)
        self.assertEqual(_max_tokens({"max_tokens": -2}), 1)

    def test_queue_replays_decisions_and_rejects_corruption(self):
        with TemporaryDirectory(prefix="public-context-test-") as temporary:
            path = Path(temporary) / "queue.jsonl"
            self.assertTrue(check_gate_queue(str(path))["ok"])
            path.write_text(json.dumps({"id": "SYNTH-G1", "status": "pending"}) + "\n" +
                            json.dumps({"id": "SYNTH-G1", "type": "decision", "status": "approved"}) + "\n",
                            encoding="utf-8")
            self.assertIn("0 pending", check_gate_queue(str(path))["detail"])
            path.write_text("{broken", encoding="utf-8")
            self.assertFalse(check_gate_queue(str(path))["ok"])


if __name__ == "__main__":
    unittest.main()
