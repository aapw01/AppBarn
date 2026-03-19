import type { FC } from 'hono/jsx';
import { getTypeMeta, getTypeMetaMap, type AppTypeMeta } from '../catalog';
import { Layout } from '../components/Layout';
import { serializeForScript, type Locale, type Messages } from '../i18n';
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
    websites: apps.filter((a) => a.type === 'website').length,
    system: apps.filter((a) => a.type === 'system').length,
  };
  const runtimeData = serializeForScript({
    apps,
    typeMeta: getTypeMetaMap(messages),
    empty: {
      all: messages.home.empty,
      filtered: messages.home.emptyFiltered,
    },
    chevronSvg,
  });

  const renderCard = (app: AppRecord, typeMeta: AppTypeMeta) => (
    <a class="card" href={app.link} target="_blank" rel="noopener">
      <div class="card-head">
        {app.image_key ? (
          <img class="card-icon" src={`/api/images/${app.image_key}`} alt="" loading="lazy" />
        ) : (
          <div class="card-icon-placeholder">
            {typeMeta.icon}
          </div>
        )}
        <div class="card-meta">
          <div class="card-name">{app.name}</div>
          <div class="card-author">{typeMeta.sourceLabel}</div>
        </div>
        <span class="card-chevron" dangerouslySetInnerHTML={{ __html: chevronSvg }} />
      </div>
      <div class="card-desc">{app.description}</div>
      <div class="card-foot">
        <span class="card-tag">{typeMeta.label}</span>
        <span class="card-link">
          {typeMeta.linkLabel}
        </span>
      </div>
    </a>
  );

  return (
    <Layout activePath="/" stats={navStats} locale={locale} messages={messages}>
      <section class="section animate-in" style="padding-top: 16px">
        <div class="section-header">
          <h2 class="section-title">{messages.home.title}</h2>
          <a href="/apps" class="section-link">{messages.home.browseAll} →</a>
        </div>

        {featured.length === 0 ? (
          <div class="card-grid" id="homeCardGrid">
            <div class="card-grid-empty">{messages.home.empty}</div>
          </div>
        ) : (
          <div class="card-grid" id="homeCardGrid">
            {featured.map((app) => {
              const typeMeta = getTypeMeta(app.type, messages);
              return renderCard(app, typeMeta);
            })}
          </div>
        )}
      </section>
      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const runtime = ${runtimeData};
          const grid = document.getElementById('homeCardGrid');
          const filterButtons = Array.from(document.querySelectorAll('.nav-stat-btn[data-filter]'));
          if (!grid || filterButtons.length === 0) return;

          function escapeHtml(value) {
            return String(value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          }

          function render(filterType) {
            const filtered = filterType === 'all'
              ? runtime.apps
              : runtime.apps.filter(function(app) { return app.type === filterType; });
            const visible = filtered.slice(0, 12);

            if (visible.length === 0) {
              grid.innerHTML = '<div class="card-grid-empty">' + (filterType === 'all' ? runtime.empty.all : runtime.empty.filtered) + '</div>';
              return;
            }

            let html = '';
            visible.forEach(function(app) {
              const typeMeta = runtime.typeMeta[app.type];
              const icon = app.image_key
                ? '<img class="card-icon" src="/api/images/' + encodeURIComponent(app.image_key) + '" alt="" loading="lazy" />'
                : '<div class="card-icon-placeholder">' + typeMeta.icon + '</div>';
              html += '<a class="card" href="' + escapeHtml(app.link) + '" target="_blank" rel="noopener">';
              html += '<div class="card-head">' + icon + '<div class="card-meta"><div class="card-name">' + escapeHtml(app.name) + '</div><div class="card-author">' + typeMeta.sourceLabel + '</div></div><span class="card-chevron">' + runtime.chevronSvg + '</span></div>';
              html += '<div class="card-desc">' + escapeHtml(app.description) + '</div>';
              html += '<div class="card-foot"><span class="card-tag">' + typeMeta.label + '</span><span class="card-link">' + typeMeta.linkLabel + '</span></div>';
              html += '</a>';
            });
            grid.innerHTML = html;
          }

          filterButtons.forEach(function(button) {
            button.addEventListener('click', function() {
              const nextFilter = button.getAttribute('data-filter') || 'all';
              filterButtons.forEach(function(item) {
                const active = item === button;
                item.classList.toggle('active', active);
                item.setAttribute('aria-pressed', active ? 'true' : 'false');
              });
              render(nextFilter);
            });
          });
        })();
      `}} />
    </Layout>
  );
};
