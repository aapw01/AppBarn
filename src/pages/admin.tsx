import type { FC } from 'hono/jsx';
import { getTypeMetaMap } from '../catalog';
import { Layout } from '../components/Layout';
import { serializeForScript, type Locale, type Messages } from '../i18n';

export const AdminPage: FC<{
  locale: Locale;
  messages: Messages;
}> = ({ locale, messages }) => {
  const runtimeData = serializeForScript({
    common: messages.common,
    admin: messages.admin,
    status: messages.status,
    typeMeta: getTypeMetaMap(messages),
  });

  return (
    <Layout title={messages.admin.title} locale={locale} messages={messages}>
      <section class="section" id="adminSection" style="display:none">
        <div class="admin-header">
          <h2 class="admin-title">{messages.admin.heading}</h2>
          <div class="toggle-wrap">
            <span>{messages.admin.moderation}</span>
            <button class="toggle" id="moderationToggle" title={messages.admin.toggleTitle}></button>
          </div>
        </div>

        <div class="filters" id="adminFilters">
          <button class="filter-tab active" data-filter="pending">{messages.admin.filters.pending}</button>
          <button class="filter-tab" data-filter="approved">{messages.admin.filters.approved}</button>
          <button class="filter-tab" data-filter="rejected">{messages.admin.filters.rejected}</button>
          <button class="filter-tab" data-filter="all">{messages.admin.filters.all}</button>
        </div>

        <div id="adminTable"></div>
      </section>

      <div class="login-overlay" id="loginOverlay">
        <div class="login-card">
          <h3>{messages.admin.login.title}</h3>
          <p>{messages.admin.login.subtitle}</p>
          <input class="form-input" type="password" id="tokenInput" placeholder={messages.admin.login.placeholder} />
          <button class="btn-primary" id="loginBtn">{messages.admin.login.action}</button>
          <div class="login-error" id="loginError" style="display:none"></div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
          const runtime = ${runtimeData};
          let token = '';
          let currentFilter = 'pending';
          let allApps = [];

          const overlay = document.getElementById('loginOverlay');
          const section = document.getElementById('adminSection');
          const tokenInput = document.getElementById('tokenInput');
          const loginBtn = document.getElementById('loginBtn');
          const loginError = document.getElementById('loginError');
          const toggle = document.getElementById('moderationToggle');
          const adminFilters = document.getElementById('adminFilters');
          const adminTable = document.getElementById('adminTable');

          function escapeHtml(value) {
            return String(value)
              .replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;')
              .replace(/'/g, '&#39;');
          }

          function api(path, opts) {
            opts = opts || {};
            opts.headers = opts.headers || {};
            opts.headers['Authorization'] = 'Bearer ' + token;
            return fetch('/api/admin' + path, opts);
          }

          async function login() {
            token = tokenInput.value.trim();
            if (!token) return;
            loginBtn.disabled = true;
            try {
              const res = await api('/settings');
              if (res.status === 401) {
                loginError.textContent = runtime.admin.errors.invalidToken;
                loginError.style.display = 'block';
                return;
              }
              const data = await res.json();
              toggle.classList.toggle('active', data.moderation_enabled);
              overlay.style.display = 'none';
              section.style.display = 'block';
              await loadApps();
            } catch (e) {
              loginError.textContent = runtime.admin.errors.connection;
              loginError.style.display = 'block';
            } finally {
              loginBtn.disabled = false;
            }
          }

          loginBtn.addEventListener('click', login);
          tokenInput.addEventListener('keydown', function(e) { if (e.key === 'Enter') login(); });

          async function loadApps() {
            const res = await api('/all');
            allApps = await res.json();
            renderTable();
          }

          function renderTable() {
            const filtered = currentFilter === 'all'
              ? allApps
              : allApps.filter(function(a){ return a.status === currentFilter; });

            if (filtered.length === 0) {
              adminTable.innerHTML = '<div class="table-wrap"><div class="table-empty">' + runtime.admin.errors.empty + '</div></div>';
              return;
            }

            let html = '<div class="table-wrap"><table class="table"><thead><tr><th>' + runtime.common.type + '</th><th>' + runtime.common.name + '</th><th>' + runtime.common.description + '</th><th>' + runtime.common.link + '</th><th>' + runtime.common.status + '</th><th>' + runtime.common.actions + '</th></tr></thead><tbody>';
            filtered.forEach(function(a) {
              const typeMeta = runtime.typeMeta[a.type];
              const icon = a.image_key
                ? '<img class="td-icon" src="/api/images/' + encodeURIComponent(a.image_key) + '" alt="" loading="lazy"/>'
                : '<div class="td-icon-placeholder">' + typeMeta.icon + '</div>';
              const statusCls = 'tag-status tag-' + a.status;
              html += '<tr data-id="' + a.id + '">';
              html += '<td><span class="tag ' + typeMeta.tagClass + '">' + typeMeta.label + '</span></td>';
              html += '<td><div class="td-name">' + icon + escapeHtml(a.name) + '</div></td>';
              html += '<td class="td-desc">' + escapeHtml(a.description) + '</td>';
              html += '<td class="td-link"><a href="' + escapeHtml(a.link) + '" target="_blank" rel="noopener">' + typeMeta.linkLabel + '</a></td>';
              html += '<td><span class="' + statusCls + '">' + runtime.status[a.status] + '</span></td>';
              if (a.status === 'pending') {
                html += '<td><div class="admin-actions"><button class="btn-approve" onclick="adminAction(\\'' + a.id + '\\',\\'approve\\')">' + runtime.admin.actions.approve + '</button><button class="btn-reject" onclick="adminAction(\\'' + a.id + '\\',\\'reject\\')">' + runtime.admin.actions.reject + '</button></div></td>';
              } else {
                html += '<td></td>';
              }
              html += '</tr>';
            });
            html += '</tbody></table></div>';
            adminTable.innerHTML = html;
          }

          window.adminAction = async function(id, action) {
            const res = await api('/' + id + '/' + action, { method: 'POST' });
            if (res.ok) {
              await loadApps();
              showToast(action === 'approve' ? runtime.admin.toasts.approved : runtime.admin.toasts.rejected);
            }
          };

          toggle.addEventListener('click', async function() {
            const newVal = !toggle.classList.contains('active');
            const res = await api('/settings', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json', 'Authorization': 'Bearer ' + token },
              body: JSON.stringify({ moderation_enabled: newVal }),
            });
            if (res.ok) {
              toggle.classList.toggle('active', newVal);
              showToast(newVal ? runtime.admin.toasts.moderationEnabled : runtime.admin.toasts.moderationDisabled);
            }
          });

          adminFilters.addEventListener('click', function(e) {
            if (!e.target.classList.contains('filter-tab')) return;
            adminFilters.querySelectorAll('.filter-tab').forEach(function(t){ t.classList.remove('active'); });
            e.target.classList.add('active');
            currentFilter = e.target.dataset.filter;
            renderTable();
          });

          function showToast(msg, isError) {
            const el = document.createElement('div');
            el.className = 'toast' + (isError ? ' error' : '');
            el.textContent = msg;
            document.body.appendChild(el);
            setTimeout(function(){ el.remove(); }, 3200);
          }
        })();
      `}} />
    </Layout>
  );
};
