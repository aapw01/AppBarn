import type { AppRecord } from './types';

export async function listApproved(db: D1Database): Promise<AppRecord[]> {
  const { results } = await db
    .prepare('SELECT * FROM apps WHERE status = ? ORDER BY created_at DESC')
    .bind('approved')
    .all<AppRecord>();
  return results ?? [];
}

export async function listByStatus(db: D1Database, status: string): Promise<AppRecord[]> {
  const { results } = await db
    .prepare('SELECT * FROM apps WHERE status = ? ORDER BY created_at DESC')
    .bind(status)
    .all<AppRecord>();
  return results ?? [];
}

export async function listAll(db: D1Database): Promise<AppRecord[]> {
  const { results } = await db
    .prepare('SELECT * FROM apps ORDER BY created_at DESC')
    .all<AppRecord>();
  return results ?? [];
}

export async function insertApp(
  db: D1Database,
  app: Omit<AppRecord, 'created_at'>
): Promise<void> {
  await db
    .prepare(
      'INSERT INTO apps (id, type, name, description, image_key, link, status) VALUES (?, ?, ?, ?, ?, ?, ?)'
    )
    .bind(app.id, app.type, app.name, app.description, app.image_key, app.link, app.status)
    .run();
}

export async function updateStatus(db: D1Database, id: string, status: string): Promise<boolean> {
  const result = await db
    .prepare('UPDATE apps SET status = ? WHERE id = ?')
    .bind(status, id)
    .run();
  return (result.meta?.changes ?? 0) > 0;
}

export async function getSetting(db: D1Database, key: string): Promise<string | null> {
  const row = await db
    .prepare('SELECT value FROM settings WHERE key = ?')
    .bind(key)
    .first<{ value: string }>();
  return row?.value ?? null;
}

export async function setSetting(db: D1Database, key: string, value: string): Promise<void> {
  await db
    .prepare(
      "INSERT INTO settings (key, value, updated_at) VALUES (?, ?, datetime('now')) ON CONFLICT(key) DO UPDATE SET value = excluded.value, updated_at = excluded.updated_at"
    )
    .bind(key, value)
    .run();
}

export async function isModerationEnabled(db: D1Database): Promise<boolean> {
  const val = await getSetting(db, 'moderation_enabled');
  return val !== 'false';
}

export async function countByStatus(db: D1Database): Promise<{ approved: number; pending: number; total: number }> {
  const row = await db
    .prepare(
      "SELECT COUNT(*) as total, SUM(CASE WHEN status='approved' THEN 1 ELSE 0 END) as approved, SUM(CASE WHEN status='pending' THEN 1 ELSE 0 END) as pending FROM apps"
    )
    .first<{ total: number; approved: number; pending: number }>();
  return { total: row?.total ?? 0, approved: row?.approved ?? 0, pending: row?.pending ?? 0 };
}
