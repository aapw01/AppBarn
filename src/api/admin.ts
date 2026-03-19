import { Hono } from 'hono';
import type { Env } from '../types';
import { getSetting, listAll, listByStatus, setSetting, updateStatus } from '../db';

const app = new Hono<{ Bindings: Env }>();

function checkAuth(c: any): boolean {
  const auth = c.req.header('Authorization');
  if (!auth) return false;
  const token = auth.replace('Bearer ', '');
  return token === c.env.ADMIN_TOKEN;
}

app.use('/*', async (c, next) => {
  if (!checkAuth(c)) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  await next();
});

app.get('/pending', async (c) => {
  const apps = await listByStatus(c.env.DB, 'pending');
  return c.json(apps);
});

app.get('/all', async (c) => {
  const apps = await listAll(c.env.DB);
  return c.json(apps);
});

app.post('/:id/approve', async (c) => {
  const id = c.req.param('id');
  const ok = await updateStatus(c.env.DB, id, 'approved');
  if (!ok) return c.json({ error: 'Not found' }, 404);
  return c.json({ ok: true });
});

app.post('/:id/reject', async (c) => {
  const id = c.req.param('id');
  const ok = await updateStatus(c.env.DB, id, 'rejected');
  if (!ok) return c.json({ error: 'Not found' }, 404);
  return c.json({ ok: true });
});

app.get('/settings', async (c) => {
  const moderation = await getSetting(c.env.DB, 'moderation_enabled');
  return c.json({ moderation_enabled: moderation !== 'false' });
});

app.post('/settings', async (c) => {
  const body = await c.req.json<{ moderation_enabled: boolean }>();
  await setSetting(c.env.DB, 'moderation_enabled', body.moderation_enabled ? 'true' : 'false');
  return c.json({ ok: true, moderation_enabled: body.moderation_enabled });
});

export default app;
