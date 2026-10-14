"""Source-derived generic receipt lifecycle; standalone adaptation, 2026-10-14.

set_status below retains the original CareerAgent function body. record_receipt
adapts the generic text confirmation/identity/hash subset of record_submission_receipt.
The minimal SCHEMA and harness are newly written. No full coordinator, lease,
provider metadata, employer exception or external submission is included.
A synthetic receipt proves a test transition, NOT an external application.
"""
from __future__ import annotations
import hashlib
import re
import sqlite3
from pathlib import Path
from datetime import date, datetime, timezone

STATUSES = (
    "Discovered",
    "Review",
    "Approved to Apply",
    "Preparing",
    "Ready for Submission",
    "Submitted",
    "Assessment",
    "Interview",
    "Final Interview",
    "Offer",
    "Rejected",
    "Withdrawn",
    "Expired",
    "Skipped",
)
TERMINAL_REMINDER_STATUSES = {"Submitted", "Skipped", "Withdrawn", "Expired", "Rejected", "Offer"}
SUBMISSION_STATUS_SOURCES = {
    "MODE_THREE_COORDINATOR", "MODE_THREE_EMAIL_COORDINATOR",
    "OWNER_DIRECTED_COORDINATOR",
    "MANUAL_RECEIPT_VERIFIED", "RECRUITMENT_EMAIL_RECEIPT",
}

# New, minimal fixture schema; not the production schema/migrations.
SCHEMA = """
PRAGMA foreign_keys=ON;
CREATE TABLE applications (
 application_id TEXT PRIMARY KEY, employer TEXT NOT NULL, role TEXT NOT NULL,
 status TEXT NOT NULL, date_submitted TEXT, discovered_queue INTEGER DEFAULT 1,
 submission_evidence_reference TEXT, updated_utc TEXT
);
CREATE TABLE application_submission_receipts (
 receipt_id TEXT PRIMARY KEY, application_id TEXT NOT NULL REFERENCES applications(application_id),
 source_type TEXT NOT NULL, receipt_path TEXT NOT NULL, sha256 TEXT NOT NULL,
 captured_utc TEXT NOT NULL, validated INTEGER NOT NULL, validation_notes TEXT
);
CREATE TABLE application_status_history (
 history_id TEXT PRIMARY KEY, application_id TEXT NOT NULL,
 old_status TEXT, new_status TEXT, changed_utc TEXT, change_source TEXT, notes TEXT
);
"""

def utcnow() -> str:
    return datetime.now(timezone.utc).replace(microsecond=0).isoformat()

def stable_id(prefix: str, value: str, length: int = 20) -> str:
    digest = hashlib.sha256(value.encode("utf-8", errors="surrogatepass")).hexdigest()
    return f"{prefix}-{digest[:length]}"

def record_receipt(connection: sqlite3.Connection, application_id: str,
                   path: Path, receipt_root: Path) -> str:
    """Adaptation: only generic UTF-8 text receipts, explicit storage root.
    This parser checks artifact content and identity, not provider authenticity.
    """
    row = connection.execute("SELECT employer,role FROM applications WHERE application_id=?",
                             (application_id,)).fetchone()
    if not row:
        raise ValueError("Unknown application identity")
    resolved = path.resolve(strict=True)
    if not resolved.is_relative_to(receipt_root.resolve(strict=True)) or not resolved.is_file():
        raise ValueError("Receipt must be a file inside the permitted receipt directory")
    if resolved.suffix.casefold() not in {".html", ".htm", ".json", ".md", ".txt", ".eml"}:
        raise ValueError("Public excerpt supports text receipts only")
    content = resolved.read_bytes()
    if not content:
        raise ValueError("Receipt is empty")
    receipt_text = content.decode("utf-8", errors="strict").casefold()
    employer, role = row
    confirmation_terms = ("application submitted", "successfully submitted", "application received",
                          "thank you for applying", "submission confirmation", "application confirmation")
    normalized_receipt = " ".join(re.findall(r"[a-z0-9]+", receipt_text))
    normalized_employer = " ".join(re.findall(r"[a-z0-9]+", employer.casefold()))
    normalized_role = " ".join(re.findall(r"[a-z0-9]+", role.casefold()))
    employer_tokens = [token for token in normalized_employer.split() if len(token) >= 3]
    employer_matched = bool(normalized_employer and
        (normalized_employer in normalized_receipt or
         (employer_tokens and all(token in normalized_receipt.split() for token in employer_tokens))))
    role_or_application_matched = bool(application_id.casefold() in receipt_text or
        (normalized_role and normalized_role in normalized_receipt))
    validated = bool(any(term in receipt_text for term in confirmation_terms)
                     and employer_matched and role_or_application_matched)
    digest = hashlib.sha256(content).hexdigest()
    captured = utcnow()
    receipt_id = stable_id("RCP", f"{application_id}|{digest}|{captured}")
    connection.execute("INSERT INTO application_submission_receipts VALUES(?,?,?,?,?,?,?,?)",
        (receipt_id, application_id, "confirmation_text", str(resolved), digest, captured,
         int(validated), "Generic text identity/confirmation subset; no provider-authenticity proof"))
    return receipt_id

def set_status(
    connection: sqlite3.Connection,
    application_id: str,
    new_status: str,
    source: str,
    notes: str | None = None,
    submission_evidence_reference: str | None = None,
) -> None:
    if new_status not in STATUSES:
        raise ValueError(f"Unsupported status: {new_status}")
    row = connection.execute("SELECT status FROM applications WHERE application_id=?", (application_id,)).fetchone()
    if not row:
        raise ValueError(f"Unknown application ID: {application_id}")
    old_status = row[0]
    if new_status == "Submitted":
        if source not in SUBMISSION_STATUS_SOURCES:
            raise ValueError("Submitted status requires an explicit receipt-verified source enum.")
        if not submission_evidence_reference:
            raise ValueError("Submitted status requires a normalized receipt ID.")
        receipt = connection.execute(
            "SELECT receipt_path,sha256,validated FROM application_submission_receipts WHERE receipt_id=? AND application_id=?",
            (submission_evidence_reference, application_id),
        ).fetchone()
        if not receipt:
            raise ValueError("Submitted status requires a receipt record for this application.")
        receipt_path, expected_digest, validated = receipt
        path = Path(receipt_path)
        if not validated or not path.is_file() or hashlib.sha256(path.read_bytes()).hexdigest() != expected_digest:
            raise ValueError("Submitted status requires an intact, independently validated receipt artifact.")
    if old_status == new_status:
        if new_status == "Submitted" and submission_evidence_reference:
            connection.execute(
                "UPDATE applications SET submission_evidence_reference=?,updated_utc=? WHERE application_id=?",
                (submission_evidence_reference, utcnow(), application_id),
            )
        return
    now = utcnow()
    submitted = date.today().isoformat() if new_status == "Submitted" else None
    connection.execute(
        "UPDATE applications SET status=?,date_submitted=COALESCE(date_submitted,?),discovered_queue=?,submission_evidence_reference=COALESCE(submission_evidence_reference,?),updated_utc=? WHERE application_id=?",
        (new_status, submitted, 0 if new_status == "Submitted" else 1, submission_evidence_reference, now, application_id),
    )
    history_id = stable_id("HIST", f"{application_id}|{old_status}|{new_status}|{now}")
    connection.execute(
        "INSERT INTO application_status_history(history_id,application_id,old_status,new_status,changed_utc,change_source,notes) VALUES(?,?,?,?,?,?,?)",
        (history_id, application_id, old_status, new_status, now, source, notes),
    )
