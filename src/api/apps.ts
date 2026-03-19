import { Hono } from 'hono';
import type { Env } from '../types';
import { insertApp, isModerationEnabled, listApproved } from '../db';

const app = new Hono<{ Bindings: Env }>();

app.get('/apps', async (c) => {
  const apps = await listApproved(c.env.DB);
  return c.json(apps);
});

app.post('/apps', async (c) => {
  const body = await c.req.json<{
    type: string;
    name: string;
    description: string;
    image_key?: string;
    link: string;
  }>();

  if (!body.name || !body.type || !body.description || !body.link) {
    return c.json({ error: 'Missing required fields' }, 400);
  }

  if (body.type !== 'app' && body.type !== 'system') {
    return c.json({ error: 'Invalid type. Must be "app" or "system"' }, 400);
  }

  const moderation = await isModerationEnabled(c.env.DB);
  const id = crypto.randomUUID();

  await insertApp(c.env.DB, {
    id,
    type: body.type as 'app' | 'system',
    name: body.name,
    description: body.description,
    image_key: body.image_key || null,
    link: body.link,
    status: moderation ? 'pending' : 'approved',
  });

  return c.json({ id, status: moderation ? 'pending' : 'approved' }, 201);
});

export default app;
