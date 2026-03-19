import { getTypeMetaMap } from '../catalog';
import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';
import { AppTable } from '../components/AppTable';
import { getDateLocale, serializeForScript, type Locale, type Messages } from '../i18n';
import type { AppRecord } from '../types';

export const ListPage: FC<{
  apps: AppRecord[];
  locale: Locale;
  messages: Messages;
}> = ({ apps, locale, messages }) => {
  const runtimeData = serializeForScript({
    apps,
    dateLocale: getDateLocale(locale),
    typeMeta: getTypeMetaMap(messages),
    list: messages.list,
    common: messages.common,
  });

  return (
    <Layout title={messages.list.title} activePath="/apps" locale={locale} messages={messages}>
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">{messages.list.heading}</h2>
        </div>

        <div class="filters" id="filters">
          <button class="filter-tab active" data-filter="all">{messages.list.filters.all}</button>
          <button class="filter-tab" data-filter="app">{messages.list.filters.app}</button>
          <button class="filter-tab" data-filter="website">{messages.list.filters.website}</button>
          <button class="filter-tab" data-filter="system">{messages.list.filters.system}</button>
          <input
            class="filter-search"
            type="text"
            placeholder={messages.common.searchPlaceholder}
            id="searchInput"
          />
        </div>

        <div id="tableContainer">
          <AppTable apps={apps} locale={locale} messages={messages} />
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const runtime = ${runtimeData};
          const allApps = runtime.apps;
          const filters = document.getElementById('filters');
          const search = document.getElementById('searchInput');
          let currentType = 'all';

          function escapeHtml(value) {
            return String(value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          }

          function render(list) {
            const container = document.getElementById('tableContainer');
            if (list.length === 0) {
              container.innerHTML = '<div class="table-wrap"><div class="table-empty">' + runtime.list.empty + '</div></div>';
              return;
            }
            let html = '<div class="table-wrap"><table class="table"><thead><tr><th>' + runtime.common.type + '</th><th>' + runtime.common.name + '</th><th>' + runtime.common.description + '</th><th>' + runtime.common.link + '</th><th>' + runtime.common.date + '</th></tr></thead><tbody>';
            list.forEach(function(a) {
              const date = new Date(a.created_at + 'Z').toLocaleDateString(runtime.dateLocale,{month:'short',day:'numeric',year:'numeric'});
              const typeMeta = runtime.typeMeta[a.type];
              const icon = a.image_key
                ? '<img class="td-icon" src="/api/images/' + encodeURIComponent(a.image_key) + '" alt="" loading="lazy"/>'
                : '<div class="td-icon-placeholder">' + typeMeta.icon + '</div>';
              html += '<tr><td><span class="tag ' + typeMeta.tagClass + '">' + typeMeta.label + '</span></td>';
              html += '<td><div class="td-name">' + icon + escapeHtml(a.name) + '</div></td>';
              html += '<td class="td-desc">' + escapeHtml(a.description) + '</td>';
              html += '<td class="td-link"><a href="' + escapeHtml(a.link) + '" target="_blank" rel="noopener">' + typeMeta.linkLabel + '</a></td>';
              html += '<td class="td-time">' + date + '</td></tr>';
            });
            html += '</tbody></table></div>';
            container.innerHTML = html;
          }

          function apply() {
            const q = search.value.toLowerCase();
            const filtered = allApps.filter(function(a) {
              const typeOk = currentType === 'all' || a.type === currentType;
              const searchOk = !q || a.name.toLowerCase().includes(q) || a.description.toLowerCase().includes(q);
              return typeOk && searchOk;
            });
            render(filtered);
          }

          filters.addEventListener('click', function(e) {
            if (!e.target.classList.contains('filter-tab')) return;
            filters.querySelectorAll('.filter-tab').forEach(function(t){ t.classList.remove('active'); });
            e.target.classList.add('active');
            currentType = e.target.dataset.filter;
            apply();
          });

          search.addEventListener('input', apply);
        })();
      `}} />
    </Layout>
  );
};
