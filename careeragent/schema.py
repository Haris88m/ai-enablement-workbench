"""Unchanged SOURCE_SCHEMA initialization definition extracted from CareerAgent.
No database contents or runtime migrations are included.
"""
SOURCE_SCHEMA = """
PRAGMA journal_mode=WAL;
PRAGMA foreign_keys=ON;

CREATE TABLE IF NOT EXISTS scan_runs (
    scan_run_id TEXT PRIMARY KEY,
    started_utc TEXT NOT NULL,
    completed_utc TEXT,
    configuration_hash TEXT NOT NULL,
    status TEXT NOT NULL,
    files_seen INTEGER DEFAULT 0,
    files_hashed INTEGER DEFAULT 0,
    files_reused INTEGER DEFAULT 0,
    errors INTEGER DEFAULT 0,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS source_files (
    source_id TEXT PRIMARY KEY,
    source_root_id TEXT NOT NULL,
    source_path TEXT NOT NULL UNIQUE,
    relative_path TEXT NOT NULL,
    file_name TEXT NOT NULL,
    extension TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    mtime_utc TEXT,
    ctime_utc TEXT,
    sha256 TEXT,
    scope_policy TEXT NOT NULL,
    priority INTEGER NOT NULL,
    sensitivity TEXT NOT NULL,
    source_group TEXT NOT NULL,
    document_type TEXT,
    filename_classification TEXT,
    is_canonical INTEGER DEFAULT 1,
    duplicate_group_id TEXT,
    version_family_id TEXT,
    inventory_status TEXT NOT NULL,
    extraction_status TEXT DEFAULT 'pending',
    extracted_path TEXT,
    extracted_chars INTEGER DEFAULT 0,
    requires_ocr INTEGER DEFAULT 0,
    error_message TEXT,
    first_seen_utc TEXT NOT NULL,
    last_seen_utc TEXT NOT NULL,
    date_last_checked TEXT NOT NULL
);

CREATE INDEX IF NOT EXISTS idx_source_hash ON source_files(sha256);
CREATE INDEX IF NOT EXISTS idx_source_policy ON source_files(scope_policy, is_canonical, extraction_status);
CREATE INDEX IF NOT EXISTS idx_source_root ON source_files(source_root_id);
CREATE INDEX IF NOT EXISTS idx_source_version ON source_files(version_family_id);
CREATE INDEX IF NOT EXISTS idx_source_duplicate ON source_files(duplicate_group_id);

CREATE TABLE IF NOT EXISTS duplicate_groups (
    duplicate_group_id TEXT PRIMARY KEY,
    sha256 TEXT NOT NULL,
    size_bytes INTEGER NOT NULL,
    canonical_source_id TEXT NOT NULL,
    member_count INTEGER NOT NULL,
    created_utc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS skipped_directories (
    scan_run_id TEXT NOT NULL,
    source_root_id TEXT NOT NULL,
    source_path TEXT NOT NULL,
    reason TEXT NOT NULL,
    recorded_utc TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS extraction_events (
    event_id TEXT PRIMARY KEY,
    source_id TEXT NOT NULL,
    started_utc TEXT NOT NULL,
    completed_utc TEXT,
    parser TEXT,
    status TEXT NOT NULL,
    characters_extracted INTEGER DEFAULT 0,
    requires_ocr INTEGER DEFAULT 0,
    output_path TEXT,
    message TEXT,
    FOREIGN KEY(source_id) REFERENCES source_files(source_id)
);
"""
