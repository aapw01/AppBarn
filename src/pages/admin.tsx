import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';

export const AdminPage: FC = () => {
  return (
    <Layout title="Admin">
      <section class="section" id="adminSection" style="display:none">
        <div class="admin-header">
          <h2 class="admin-title">Admin Dashboard</h2>
          <div class="toggle-wrap">
            <span>Moderation</span>
            <button class="toggle" id="moderationToggle" title="Toggle moderation"></button>
          </div>
        </div>

        <div class="filters" id="adminFilters">
          <button class="filter-tab active" data-filter="pending">Pending</button>
          <button class="filter-tab" data-filter="approved">Approved</button>
          <button class="filter-tab" data-filter="rejected">Rejected</button>
          <button class="filter-tab" data-filter="all">All</button>
        </div>

        <div id="adminTable"></div>
      </section>

      <div class="login-overlay" id="loginOverlay">
        <div class="login-card">
          <h3>Admin Access</h3>
          <p>Enter the admin token to continue.</p>
          <input class="form-input" type="password" id="tokenInput" placeholder="Admin token" />
          <button class="btn-primary" id="loginBtn">Enter</button>
          <div class="login-error" id="loginError" style="display:none"></div>
        </div>
      </div>

      <script dangerouslySetInnerHTML={{ __html: `
        (function(){
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
                loginError.textContent = 'Invalid token.';
                loginError.style.display = 'block';
                return;
              }
              const data = await res.json();
              toggle.classList.toggle('active', data.moderation_enabled);
              overlay.style.display = 'none';
              section.style.display = 'block';
              await loadApps();
            } catch (e) {
              loginError.textContent = 'Connection error.';
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
              adminTable.innerHTML = '<div class="table-wrap"><div class="table-empty">No items in this category.</div></div>';
              return;
            }

            let html = '<div class="table-wrap"><table class="table"><thead><tr><th>Type</th><th>Name</th><th>Description</th><th>Link</th><th>Status</th><th>Actions</th></tr></thead><tbody>';
            filtered.forEach(function(a) {
              const tagCls = a.type === 'app' ? 'tag-app' : 'tag-system';
              const tagLabel = a.type === 'app' ? 'App' : 'System';
              const linkLabel = a.type === 'app' ? 'App Store' : 'GitHub';
              const icon = a.image_key
                ? '<img class="td-icon" src="/api/images/' + a.image_key + '" alt="" loading="lazy"/>'
                : '<div class="td-icon-placeholder">' + (a.type === 'app' ? '📱' : '⚙️') + '</div>';
              const statusCls = 'tag-status tag-' + a.status;
              html += '<tr data-id="' + a.id + '">';
              html += '<td><span class="tag ' + tagCls + '">' + tagLabel + '</span></td>';
              html += '<td><div class="td-name">' + icon + a.name + '</div></td>';
              html += '<td class="td-desc">' + a.description + '</td>';
              html += '<td class="td-link"><a href="' + a.link + '" target="_blank" rel="noopener">' + linkLabel + '</a></td>';
              html += '<td><span class="' + statusCls + '">' + a.status + '</span></td>';
              if (a.status === 'pending') {
                html += '<td><div class="admin-actions"><button class="btn-approve" onclick="adminAction(\\'' + a.id + '\\',\\'approve\\')">Approve</button><button class="btn-reject" onclick="adminAction(\\'' + a.id + '\\',\\'reject\\')">Reject</button></div></td>';
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
              showToast(action === 'approve' ? 'Approved!' : 'Rejected.');
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
              showToast(newVal ? 'Moderation enabled' : 'Moderation disabled — submissions go live instantly');
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
