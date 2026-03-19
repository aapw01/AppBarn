import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';
import { AppTable } from '../components/AppTable';
import type { AppRecord } from '../types';

export const ListPage: FC<{ apps: AppRecord[] }> = ({ apps }) => {
  return (
    <Layout title="Browse" activePath="/apps">
      <section class="section">
        <div class="section-header">
          <h2 class="section-title">All Products</h2>
        </div>

        <div class="filters" id="filters">
          <button class="filter-tab active" data-filter="all">All</button>
          <button class="filter-tab" data-filter="app">Apps</button>
          <button class="filter-tab" data-filter="system">System Tools</button>
          <input
            class="filter-search"
            type="text"
            placeholder="Search…"
            id="searchInput"
          />
        </div>

        <div id="tableContainer">
          <AppTable apps={apps} />
        </div>
      </section>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const allApps = ${JSON.stringify(apps)};
          const filters = document.getElementById('filters');
          const search = document.getElementById('searchInput');
          let currentType = 'all';

          function render(list) {
            const container = document.getElementById('tableContainer');
            if (list.length === 0) {
              container.innerHTML = '<div class="table-wrap"><div class="table-empty">No items match your filter.</div></div>';
              return;
            }
            let html = '<div class="table-wrap"><table class="table"><thead><tr><th>Type</th><th>Name</th><th>Description</th><th>Link</th><th>Date</th></tr></thead><tbody>';
            list.forEach(function(a) {
              const date = new Date(a.created_at + 'Z').toLocaleDateString('en-US',{month:'short',day:'numeric',year:'numeric'});
              const tagCls = a.type === 'app' ? 'tag-app' : 'tag-system';
              const tagLabel = a.type === 'app' ? 'App' : 'System';
              const linkLabel = a.type === 'app' ? 'App Store' : 'GitHub';
              const icon = a.image_key
                ? '<img class="td-icon" src="/api/images/' + a.image_key + '" alt="" loading="lazy"/>'
                : '<div class="td-icon-placeholder">' + (a.type === 'app' ? '📱' : '⚙️') + '</div>';
              html += '<tr><td><span class="tag ' + tagCls + '">' + tagLabel + '</span></td>';
              html += '<td><div class="td-name">' + icon + a.name + '</div></td>';
              html += '<td class="td-desc">' + a.description + '</td>';
              html += '<td class="td-link"><a href="' + a.link + '" target="_blank" rel="noopener">' + linkLabel + '</a></td>';
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
