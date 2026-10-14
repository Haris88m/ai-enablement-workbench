"""Adapted Servari gate-queue replay; modified 2026-10-14.
Canonical queue path is an explicit parameter. No real work state is bundled.
Body replay logic retained; this is one survival pin, not the full context policy.
"""
import os
import json

def check_gate_queue(path):
    """PIN 4 helper. The gate-queue must be READABLE (parked decisions survive on disk).
    Absent file = OK (no parked decisions to lose); present-but-corrupt = NOT ok."""
    if not os.path.isfile(path):
        return {"ok": True, "detail": "gate-queue.jsonl absent — no pending parked decisions"}
    try:
        # Single pass: confirm every line parses AND count pending against THIS module's
        # configured path. We replay status (pending entry -> decision line) exactly,
        # bound to the path we are checking — never delegating to a sibling module that
        # resolves a DIFFERENT queue path. Replaying here also avoids any sys.path mutation.
        status = {}  # id -> latest status
        with open(path, "r", encoding="utf-8", errors="replace") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                try:
                    ev = json.loads(line)  # confirm each line is parseable
                except json.JSONDecodeError:
                    return {"ok": False,
                            "detail": "gate-queue.jsonl has a corrupt line (parked decision at risk)"}
                if not isinstance(ev, dict):
                    continue
                _id = ev.get("id")
                if not _id:
                    continue
                if ev.get("type") == "decision":
                    if _id in status:
                        status[_id] = ev.get("status", ev.get("decision", "decided"))
                else:
                    status[_id] = ev.get("status", "pending")
        pending = sum(1 for s in status.values() if s == "pending")
        return {"ok": True,
                "detail": f"gate-queue.jsonl readable ({pending} pending parked)"}
    except OSError as e:
        return {"ok": False, "detail": f"gate-queue.jsonl unreadable: {e}"}
