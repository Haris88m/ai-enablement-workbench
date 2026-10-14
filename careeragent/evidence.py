"""Callable adaptation of CareerAgent query_evidence.py, 2026-10-14.
The all-term casefold search and earliest-match snippet algorithm are retained.
Added input bounds and namespace containment for a safe reusable public API.
No vector retrieval, ranking model, or LLM is used.
"""
import re
import sqlite3
from pathlib import Path
from .privacy import privacy_minimize

def search(connection: sqlite3.Connection, query: list[str], text_root: Path,
           root_ids: list[str] | None = None, limit: int = 50, context: int = 260) -> list[dict]:
    if not query or not all(isinstance(term, str) and term.strip() for term in query):
        raise ValueError("At least one nonempty lexical term is required")
    if type(limit) is not int or not 1 <= limit <= 100:
        raise ValueError("Limit must be an integer between 1 and 100")
    if type(context) is not int or not 1 <= context <= 1000:
        raise ValueError("Context must be an integer between 1 and 1000")
    terms = [term.casefold() for term in query]
    where = ["extraction_status='success'", "extracted_path IS NOT NULL"]
    parameters = []
    if root_ids:
        where.append("source_root_id IN (%s)" % ",".join("?" for _ in root_ids))
        parameters.extend(root_ids)
    previous_factory = connection.row_factory
    connection.row_factory = sqlite3.Row
    results = []
    try:
        rows = connection.execute("SELECT * FROM source_files WHERE " + " AND ".join(where)
                                  + " ORDER BY priority DESC", parameters)
        approved_root = text_root.resolve(strict=True)
        for row in rows:
            path = Path(row["extracted_path"]).resolve()
            if not path.is_relative_to(approved_root) or not path.is_file():
                continue
            text = path.read_text(encoding="utf-8", errors="replace")
            lowered = text.casefold()
            if not all(term in lowered for term in terms):
                continue
            positions = [lowered.find(term) for term in terms]
            center = min(position for position in positions if position >= 0)
            start = max(0, center - context)
            end = min(len(text), center + context)
            snippet = privacy_minimize(re.sub(r"\s+", " ", text[start:end])).strip()
            results.append({"source_id": row["source_id"], "scope_policy": row["scope_policy"],
                            "sensitivity": row["sensitivity"], "snippet": snippet})
            if len(results) >= limit:
                break
    finally:
        connection.row_factory = previous_factory
    return results
