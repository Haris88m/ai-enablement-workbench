"""NEW synthetic fixture helpers written 2026-10-14. No historical records."""
from pathlib import Path
import sqlite3
from careeragent.schema import SOURCE_SCHEMA

def source_database(text_root: Path) -> sqlite3.Connection:
    connection = sqlite3.connect(":memory:")
    connection.executescript(SOURCE_SCHEMA)
    documents = [
        ("SYNTH-001", "synthetic", 90, "The synthetic coordination note records planning, review and evidence checks. Contact reviewer@example.invalid for this fictional exercise."),
        ("SYNTH-002", "synthetic", 60, "A synthetic coordination handoff records permissions, the named reviewer, next steps and a stop condition."),
        ("SYNTH-003", "other-synthetic", 30, "A fictional prototype experiment has no commercial outcome."),
    ]
    for source_id, root_id, priority, text in documents:
        path = text_root / (source_id + ".txt")
        path.write_text(text, encoding="utf-8")
        connection.execute("""
            INSERT INTO source_files
            (source_id,source_root_id,source_path,relative_path,file_name,extension,size_bytes,
             scope_policy,priority,sensitivity,source_group,inventory_status,
             extraction_status,extracted_path,first_seen_utc,last_seen_utc,date_last_checked)
            VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)
            """, (source_id, root_id, str(path), path.name, path.name, ".txt",
                  len(text.encode("utf-8")), "extract", priority, "synthetic_public",
                  "synthetic_demo", "indexed", "success", str(path),
                  "2026-10-14", "2026-10-14", "2026-10-14"))
    return connection
