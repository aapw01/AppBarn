import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';
import type { Locale, Messages } from '../i18n';
import type { AppRecord } from '../types';

const chevronSvg = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>';

export const HomePage: FC<{
  apps: AppRecord[];
  stats: { approved: number; pending: number; total: number };
  locale: Locale;
  messages: Messages;
}> = ({ apps, stats, locale, messages }) => {
  const featured = apps.slice(0, 12);
  const navStats = {
    approved: stats.approved,
    apps: apps.filter((a) => a.type === 'app').length,
    system: apps.filter((a) => a.type === 'system').length,
  };
  return (
    <Layout activePath="/" stats={navStats} locale={locale} messages={messages}>
      <section class="section animate-in" style="padding-top: 16px">
        <div class="section-header">
          <h2 class="section-title">{messages.home.title}</h2>
          <a href="/apps" class="section-link">{messages.home.browseAll} →</a>
        </div>

        {featured.length === 0 ? (
          <div class="card-grid">
            <div class="card-grid-empty">{messages.home.empty}</div>
          </div>
        ) : (
          <div class="card-grid">
            {featured.map((app) => (
              <a class="card" href={app.link} target="_blank" rel="noopener">
                <div class="card-head">
                  {app.image_key ? (
                    <img class="card-icon" src={`/api/images/${app.image_key}`} alt="" loading="lazy" />
                  ) : (
                    <div class="card-icon-placeholder">
                      {app.type === 'app' ? '📱' : '⚙️'}
                    </div>
                  )}
                  <div class="card-meta">
                    <div class="card-name">{app.name}</div>
                    <div class="card-author">{app.type === 'app' ? messages.common.appStore : messages.common.github}</div>
                  </div>
                  <span class="card-chevron" dangerouslySetInnerHTML={{ __html: chevronSvg }} />
                </div>
                <div class="card-desc">{app.description}</div>
                <div class="card-foot">
                  <span class="card-tag">{app.type === 'app' ? messages.common.app : messages.common.systemTool}</span>
                  <span class="card-link">
                    {app.type === 'app' ? messages.common.appStore : messages.common.github}
                  </span>
                </div>
              </a>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
};
