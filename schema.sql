CREATE TABLE IF NOT EXISTS apps (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('app', 'system', 'website')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_key TEXT,
  link TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS settings (
  key TEXT PRIMARY KEY,
  value TEXT NOT NULL,
  updated_at TEXT DEFAULT (datetime('now'))
);

INSERT OR IGNORE INTO settings (key, value) VALUES ('moderation_enabled', 'true');
