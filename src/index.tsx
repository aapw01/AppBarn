import { Hono } from 'hono';
import type { Env } from './types';
import appsApi from './api/apps';
import uploadApi from './api/upload';
import adminApi from './api/admin';
import { countByStatus, isModerationEnabled, listApproved } from './db';
import { getRequestI18n } from './i18n';
import { HomePage } from './pages/home';
import { ListPage } from './pages/list';
import { SubmitPage } from './pages/submit';
import { AdminPage } from './pages/admin';

const app = new Hono<{ Bindings: Env }>();

app.get('/', async (c) => {
  const { locale, messages } = getRequestI18n(c.req.raw.headers);
  const [apps, stats] = await Promise.all([listApproved(c.env.DB), countByStatus(c.env.DB)]);
  return c.html(<HomePage apps={apps} stats={stats} locale={locale} messages={messages} />);
});

app.get('/apps', async (c) => {
  const { locale, messages } = getRequestI18n(c.req.raw.headers);
  const apps = await listApproved(c.env.DB);
  return c.html(<ListPage apps={apps} locale={locale} messages={messages} />);
});

app.get('/submit', async (c) => {
  const { locale, messages } = getRequestI18n(c.req.raw.headers);
  const moderation = await isModerationEnabled(c.env.DB);
  return c.html(<SubmitPage moderationEnabled={moderation} locale={locale} messages={messages} />);
});

app.get('/admin', (c) => {
  const { locale, messages } = getRequestI18n(c.req.raw.headers);
  return c.html(<AdminPage locale={locale} messages={messages} />);
});

app.route('/api', appsApi);
app.route('/api', uploadApi);
app.route('/api/admin', adminApi);

export default app;
