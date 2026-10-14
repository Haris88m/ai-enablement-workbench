"""NEW offline synthetic example, 2026-10-14; not a historical workflow recording."""
import json
import os
import sqlite3
from tempfile import TemporaryDirectory
from pathlib import Path
from careeragent.evidence import search
from careeragent.receipts import SCHEMA, record_receipt, set_status
from fixtures import source_database
from servari import autonomy
from servari.provider_messages import _to_messages
from servari.context_queue import check_gate_queue

def main():
    with TemporaryDirectory(prefix="evidence-workflow-example-") as temporary:
        root = Path(temporary)
        sources = root / "sources"
        sources.mkdir()
        with source_database(sources) as connection:
            results = search(connection, ["coordination", "review"], sources)
        receipts = root / "receipts"
        receipts.mkdir()
        receipt = receipts / "fictional-confirmation.txt"
        receipt.write_text("SYNTHETIC EXAMPLE ONLY. Application received for APP-SYNTH-001 at Example Research Organisation, Research Support.", encoding="utf-8")
        with sqlite3.connect(":memory:") as connection:
            connection.executescript(SCHEMA)
            connection.execute("INSERT INTO applications(application_id,employer,role,status) VALUES(?,?,?,?)",
                ("APP-SYNTH-001", "Example Research Organisation", "Research Support", "Preparing"))
            receipt_id = record_receipt(connection, "APP-SYNTH-001", receipt, receipts)
            set_status(connection, "APP-SYNTH-001", "Submitted", "MANUAL_RECEIPT_VERIFIED",
                       submission_evidence_reference=receipt_id)
            synthetic_state = connection.execute("SELECT status FROM applications").fetchone()[0]
        prior_home = os.environ.get("SERVARI_HOME")
        os.environ["SERVARI_HOME"] = str(root)
        try:
            autonomy.set_level("synthetic-reviewer", 5)
            low = autonomy.decide("synthetic-reviewer", 8)
            high = autonomy.decide("synthetic-reviewer", 19)
        finally:
            if prior_home is None:
                os.environ.pop("SERVARI_HOME", None)
            else:
                os.environ["SERVARI_HOME"] = prior_home
        queue = root / "synthetic-gates.jsonl"
        queue.write_text(json.dumps({"id": "SYNTH-GATE", "status": "pending"}) + "\n",
                         encoding="utf-8")
        print(json.dumps({"classification": "NEW_SYNTHETIC_OFFLINE_EXAMPLE",
            "lexical_matches": results, "receipt_demo_state": synthetic_state,
            "receipt_warning": "Synthetic state transition; no external submission happened",
            "autonomy_safe": low, "autonomy_high_risk": high,
            "queue_survival_check": check_gate_queue(str(queue)),
            "provider_messages_only": _to_messages([{"from": "user", "text": "Summarize approved evidence."}]),
            "network_calls": 0}, indent=2))
    return 0

if __name__ == "__main__":
    raise SystemExit(main())
