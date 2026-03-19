import { Hono } from 'hono';
import type { Env } from '../types';

const app = new Hono<{ Bindings: Env }>();

app.post('/upload', async (c) => {
  const formData = await c.req.formData();
  const file = formData.get('file') as File | null;

  if (!file) {
    return c.json({ error: 'No file provided' }, 400);
  }

  const ext = file.name.split('.').pop()?.toLowerCase() || 'png';
  const allowedExts = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg'];
  if (!allowedExts.includes(ext)) {
    return c.json({ error: 'Unsupported file type' }, 400);
  }

  const maxSize = 5 * 1024 * 1024;
  if (file.size > maxSize) {
    return c.json({ error: 'File too large (max 5MB)' }, 400);
  }

  const key = `${crypto.randomUUID()}.${ext}`;
  await c.env.BUCKET.put(key, file.stream(), {
    httpMetadata: { contentType: file.type },
  });

  return c.json({ key });
});

app.get('/images/:key', async (c) => {
  const key = c.req.param('key');
  const object = await c.env.BUCKET.get(key);

  if (!object) {
    return c.json({ error: 'Not found' }, 404);
  }

  const headers = new Headers();
  headers.set('Content-Type', object.httpMetadata?.contentType || 'image/png');
  headers.set('Cache-Control', 'public, max-age=31536000, immutable');
  return new Response(object.body, { headers });
});

export default app;
