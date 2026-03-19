DROP TABLE IF EXISTS apps_new;

CREATE TABLE apps_new (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL CHECK(type IN ('app', 'system', 'website')),
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  image_key TEXT,
  link TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

INSERT INTO apps_new (id, type, name, description, image_key, link, status, created_at)
SELECT id, type, name, description, image_key, link, status, created_at
FROM apps;

DROP TABLE apps;
ALTER TABLE apps_new RENAME TO apps;
