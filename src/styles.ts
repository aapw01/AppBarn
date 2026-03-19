export const css = `
@import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,600;0,9..40,700;1,9..40,400&family=Playfair+Display:wght@400;500;600;700&display=swap');

*,*::before,*::after{box-sizing:border-box;margin:0;padding:0}

:root {
  --font-display: 'Playfair Display', Georgia, serif;
  --font-body: 'DM Sans', -apple-system, BlinkMacSystemFont, sans-serif;

  --c-bg: #FAFAF8;
  --c-surface: #FFFFFF;
  --c-border: #E8E6E1;
  --c-border-light: #F0EEEA;
  --c-text: #1A1A18;
  --c-text-secondary: #6B6963;
  --c-text-muted: #9E9B94;
  --c-accent: #2C5F2D;
  --c-accent-light: #EBF3EB;
  --c-danger: #B44D4D;
  --c-danger-light: #FCEAEA;
  --c-tag-app: #3B6BC4;
  --c-tag-app-bg: #EDF2FC;
  --c-tag-system: #8B6914;
  --c-tag-system-bg: #FDF6E3;

  --radius: 6px;
  --shadow-sm: 0 1px 2px rgba(0,0,0,0.04);
  --shadow-md: 0 2px 8px rgba(0,0,0,0.06);
  --shadow-lg: 0 4px 24px rgba(0,0,0,0.08);
  --transition: 0.2s cubic-bezier(0.4,0,0.2,1);
}

html { font-size: 16px; -webkit-font-smoothing: antialiased; }
body {
  font-family: var(--font-body);
  background: var(--c-bg);
  color: var(--c-text);
  line-height: 1.6;
  min-height: 100vh;
}

a { color: inherit; text-decoration: none; }

/* ─── NAV ─── */
.nav {
  display: flex; align-items: center; justify-content: space-between;
  max-width: 1120px; margin: 0 auto; padding: 20px 32px;
}
.nav-brand {
  font-family: var(--font-display);
  font-size: 1.35rem; font-weight: 600;
  letter-spacing: -0.02em;
  color: var(--c-text);
}
.nav-brand span { color: var(--c-accent); }
.nav-links { display: flex; gap: 28px; align-items: center; }
.nav-links a {
  font-size: 0.875rem; font-weight: 500;
  color: var(--c-text-secondary);
  transition: color var(--transition);
  position: relative;
}
.nav-links a:hover { color: var(--c-text); }
.nav-links a.active { color: var(--c-text); }
.nav-links a.active::after {
  content: ''; position: absolute; left: 0; right: 0; bottom: -4px;
  height: 1.5px; background: var(--c-accent); border-radius: 1px;
}
.btn-submit {
  display: inline-flex; align-items: center; gap: 4px;
  padding: 6px 11px; border-radius: 5px;
  font-size: 0.76rem; font-weight: 600;
  background: #131313; color: #ffffff;
  transition: opacity var(--transition);
  border: 1px solid #131313; cursor: pointer;
  letter-spacing: 0.01em;
}
.nav-links .btn-submit {
  color: #ffffff;
}
.btn-submit:hover { opacity: 0.85; }

/* ─── HERO ─── */
.hero {
  max-width: 1120px; margin: 0 auto; padding: 38px 32px 20px;
  text-align: center;
}
.hero h1 {
  font-family: var(--font-display);
  font-size: 2.35rem; font-weight: 600;
  letter-spacing: -0.026em; line-height: 1.2;
  color: var(--c-text);
  margin-bottom: 10px;
}
.hero p {
  font-size: 0.98rem; color: var(--c-text-secondary);
  max-width: 580px; margin: 0 auto 22px;
  line-height: 1.58;
}
.hero-stats {
  display: flex; gap: 48px; justify-content: center;
  margin-top: 16px;
}
.hero-stat { text-align: center; }
.hero-stat-num {
  font-family: var(--font-display);
  font-size: 1.7rem; font-weight: 600;
  color: var(--c-text); line-height: 1.2;
}
.hero-stat-label {
  font-size: 0.72rem; color: var(--c-text-muted);
  text-transform: uppercase; letter-spacing: 0.08em;
  margin-top: 4px;
}
.hero-divider {
  width: 48px; height: 1px;
  background: var(--c-border);
  margin: 22px auto 0;
}

/* ─── SECTION ─── */
.section {
  max-width: 1120px; margin: 0 auto; padding: 40px 32px;
}
.section-header {
  display: flex; align-items: baseline; justify-content: space-between;
  margin-bottom: 20px;
}
.section-title {
  font-family: var(--font-display);
  font-size: 1.35rem; font-weight: 600;
  letter-spacing: -0.01em;
}
.section-link {
  font-size: 0.825rem; font-weight: 500;
  color: var(--c-accent);
  transition: opacity var(--transition);
}
.section-link:hover { opacity: 0.7; }

/* ─── FILTERS ─── */
.filters {
  display: flex; gap: 10px; align-items: center;
  flex-wrap: wrap; margin-bottom: 20px;
}
.filter-tab {
  padding: 6px 16px; border-radius: 100px;
  font-size: 0.8rem; font-weight: 500;
  background: transparent; color: var(--c-text-secondary);
  border: 1px solid var(--c-border);
  cursor: pointer; transition: all var(--transition);
}
.filter-tab:hover { border-color: var(--c-text-muted); }
.filter-tab.active {
  background: var(--c-text); color: var(--c-bg);
  border-color: var(--c-text);
}
.filter-search {
  margin-left: auto;
  padding: 7px 14px; border-radius: var(--radius);
  font-size: 0.825rem; font-family: var(--font-body);
  border: 1px solid var(--c-border); background: var(--c-surface);
  color: var(--c-text); outline: none; width: 200px;
  transition: border-color var(--transition);
}
.filter-search:focus { border-color: var(--c-text-muted); }
.filter-search::placeholder { color: var(--c-text-muted); }

/* ─── TABLE ─── */
.table-wrap {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 1px 2px rgba(18, 18, 18, 0.04), 0 8px 20px rgba(18, 18, 18, 0.03);
}
.table {
  width: 100%; border-collapse: collapse;
  font-size: 0.875rem;
}
.table thead { position: sticky; top: 0; z-index: 1; }
.table th {
  text-align: left; padding: 12px 16px;
  font-size: 0.75rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.06em;
  color: var(--c-text-muted);
  background: var(--c-bg);
  border-bottom: 1px solid var(--c-border);
  white-space: nowrap;
}
.table td {
  padding: 14px 16px;
  border-bottom: 1px solid var(--c-border-light);
  vertical-align: middle;
}
.table tbody tr { transition: background var(--transition); }
.table tbody tr:hover { background: #F7F7F5; }
.table tbody tr:last-child td { border-bottom: none; }

/* 首页展示：更贴近高级产品目录的卡片化表格 */
.home-showcase .table-wrap {
  background: linear-gradient(180deg, #ffffff 0%, #fcfcfb 100%);
}
.home-showcase .table {
  border-collapse: separate;
  border-spacing: 0 10px;
  margin-top: -10px;
}
.home-showcase .table thead th {
  background: transparent;
  border-bottom: none;
  padding: 2px 16px 4px;
}
.home-showcase .table tbody tr:hover {
  background: transparent;
}
.home-showcase .table tbody td {
  background: #ffffff;
  border-top: 1px solid #ece9e3;
  border-bottom: 1px solid #ece9e3;
  border-left: none;
  border-right: none;
}
.home-showcase .table tbody td:first-child {
  border-left: 1px solid #ece9e3;
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
}
.home-showcase .table tbody td:last-child {
  border-right: 1px solid #ece9e3;
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
}
.home-showcase .table tbody tr {
  transition: transform var(--transition), box-shadow var(--transition);
}
.home-showcase .table tbody tr:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(20, 20, 20, 0.06);
}

.td-name {
  display: flex; align-items: center; gap: 12px;
  font-weight: 500;
}
.td-icon {
  width: 36px; height: 36px; border-radius: 8px;
  object-fit: cover; background: var(--c-border-light);
  flex-shrink: 0;
}
.td-icon-placeholder {
  width: 36px; height: 36px; border-radius: 8px;
  background: var(--c-border-light);
  display: flex; align-items: center; justify-content: center;
  font-size: 0.9rem; flex-shrink: 0;
  color: var(--c-text-muted);
}
.td-desc {
  color: var(--c-text-secondary);
  max-width: 320px;
  overflow: hidden; text-overflow: ellipsis; white-space: nowrap;
}
.tag {
  display: inline-flex; align-items: center;
  padding: 3px 10px; border-radius: 100px;
  font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.tag-app { color: var(--c-tag-app); background: var(--c-tag-app-bg); }
.tag-system { color: var(--c-tag-system); background: var(--c-tag-system-bg); }

.td-link a {
  display: inline-flex; align-items: center; gap: 4px;
  font-size: 0.8rem; font-weight: 500;
  color: var(--c-accent);
  transition: opacity var(--transition);
}
.td-link a:hover { opacity: 0.7; }
.td-time { color: var(--c-text-muted); font-size: 0.8rem; white-space: nowrap; }

.table-empty {
  text-align: center; padding: 48px 16px;
  color: var(--c-text-muted); font-size: 0.9rem;
}

/* ─── FORM ─── */
.form-card {
  max-width: 560px; margin: 40px auto;
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 40px; box-shadow: var(--shadow-sm);
}
.form-card h2 {
  font-family: var(--font-display);
  font-size: 1.5rem; font-weight: 600;
  margin-bottom: 8px; letter-spacing: -0.02em;
}
.form-card p.subtitle {
  color: var(--c-text-secondary); font-size: 0.9rem;
  margin-bottom: 32px;
}
.form-group { margin-bottom: 20px; }
.form-label {
  display: block; font-size: 0.8rem; font-weight: 600;
  color: var(--c-text-secondary); margin-bottom: 6px;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.form-input, .form-textarea, .form-select {
  width: 100%; padding: 10px 14px;
  border: 1px solid var(--c-border); border-radius: var(--radius);
  font-size: 0.9rem; font-family: var(--font-body);
  color: var(--c-text); background: var(--c-bg);
  outline: none; transition: border-color var(--transition);
}
.form-input:focus, .form-textarea:focus, .form-select:focus {
  border-color: var(--c-text-muted);
}
.form-textarea { resize: vertical; min-height: 100px; }
.form-hint {
  font-size: 0.75rem; color: var(--c-text-muted); margin-top: 4px;
}
.form-file-label {
  display: flex; align-items: center; justify-content: center;
  gap: 8px; padding: 24px;
  border: 1.5px dashed var(--c-border); border-radius: var(--radius);
  cursor: pointer; color: var(--c-text-muted); font-size: 0.85rem;
  transition: all var(--transition);
}
.form-file-label:hover {
  border-color: var(--c-text-muted); color: var(--c-text-secondary);
}
.form-file-label input { display: none; }
.form-file-preview {
  margin-top: 12px; display: flex; align-items: center; gap: 12px;
}
.form-file-preview img {
  width: 48px; height: 48px; border-radius: 8px; object-fit: cover;
}
.form-file-preview .file-name {
  font-size: 0.8rem; color: var(--c-text-secondary);
}
.btn-primary {
  display: inline-flex; align-items: center; justify-content: center;
  width: 100%; padding: 12px 24px; border-radius: var(--radius);
  font-size: 0.9rem; font-weight: 600; font-family: var(--font-body);
  background: var(--c-text); color: var(--c-bg);
  border: none; cursor: pointer;
  transition: opacity var(--transition);
  margin-top: 8px;
}
.btn-primary:hover { opacity: 0.85; }
.btn-primary:disabled { opacity: 0.4; cursor: not-allowed; }

.form-type-tabs {
  display: flex; gap: 0; margin-bottom: 24px;
  border: 1px solid var(--c-border); border-radius: var(--radius);
  overflow: hidden;
}
.form-type-tab {
  flex: 1; padding: 10px; text-align: center;
  font-size: 0.85rem; font-weight: 500;
  cursor: pointer; border: none; background: var(--c-bg);
  color: var(--c-text-secondary);
  transition: all var(--transition);
}
.form-type-tab.active {
  background: var(--c-text); color: var(--c-bg);
}

/* ─── ADMIN ─── */
.admin-header {
  display: flex; align-items: center; justify-content: space-between;
  margin-bottom: 24px;
}
.admin-title {
  font-family: var(--font-display);
  font-size: 1.5rem; font-weight: 600;
  letter-spacing: -0.02em;
}
.toggle-wrap {
  display: flex; align-items: center; gap: 10px;
  font-size: 0.85rem; color: var(--c-text-secondary);
}
.toggle {
  position: relative; width: 44px; height: 24px;
  background: var(--c-border); border-radius: 12px;
  cursor: pointer; transition: background var(--transition);
  border: none;
}
.toggle.active { background: var(--c-accent); }
.toggle::after {
  content: ''; position: absolute;
  top: 3px; left: 3px;
  width: 18px; height: 18px;
  background: white; border-radius: 50%;
  transition: transform var(--transition);
  box-shadow: 0 1px 3px rgba(0,0,0,0.15);
}
.toggle.active::after { transform: translateX(20px); }

.admin-actions { display: flex; gap: 8px; }
.btn-approve, .btn-reject {
  padding: 5px 14px; border-radius: var(--radius);
  font-size: 0.75rem; font-weight: 600;
  border: none; cursor: pointer;
  transition: opacity var(--transition);
}
.btn-approve {
  background: var(--c-accent-light); color: var(--c-accent);
}
.btn-reject {
  background: var(--c-danger-light); color: var(--c-danger);
}
.btn-approve:hover, .btn-reject:hover { opacity: 0.8; }

.tag-status {
  display: inline-flex; padding: 3px 10px; border-radius: 100px;
  font-size: 0.7rem; font-weight: 600;
  text-transform: uppercase; letter-spacing: 0.04em;
}
.tag-pending { color: #9E7A1A; background: #FDF6E3; }
.tag-approved { color: var(--c-accent); background: var(--c-accent-light); }
.tag-rejected { color: var(--c-danger); background: var(--c-danger-light); }

/* ─── LOGIN MODAL ─── */
.login-overlay {
  position: fixed; inset: 0;
  background: rgba(0,0,0,0.25);
  display: flex; align-items: center; justify-content: center;
  z-index: 100; backdrop-filter: blur(4px);
}
.login-card {
  background: var(--c-surface);
  border: 1px solid var(--c-border);
  border-radius: var(--radius);
  padding: 40px; width: 360px;
  box-shadow: var(--shadow-lg);
  text-align: center;
}
.login-card h3 {
  font-family: var(--font-display);
  font-size: 1.2rem; font-weight: 600;
  margin-bottom: 8px;
}
.login-card p {
  font-size: 0.85rem; color: var(--c-text-secondary);
  margin-bottom: 20px;
}
.login-card .form-input { text-align: center; }
.login-card .btn-primary { margin-top: 12px; }
.login-error {
  color: var(--c-danger); font-size: 0.8rem;
  margin-top: 8px;
}

/* ─── TOAST ─── */
.toast {
  position: fixed; top: 24px; right: 24px;
  padding: 14px 20px; border-radius: var(--radius);
  background: var(--c-text); color: var(--c-bg);
  font-size: 0.85rem; font-weight: 500;
  box-shadow: var(--shadow-lg);
  animation: toast-in 0.3s ease, toast-out 0.3s ease 2.7s forwards;
  z-index: 200;
}
.toast.error { background: var(--c-danger); }
@keyframes toast-in { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
@keyframes toast-out { from { opacity: 1; } to { opacity: 0; transform: translateY(-8px); } }

/* ─── FOOTER ─── */
.footer {
  max-width: 1120px; margin: 0 auto;
  padding: 32px;
  border-top: 1px solid var(--c-border-light);
  text-align: center;
  font-size: 0.78rem; color: var(--c-text-muted);
  margin-top: 64px;
}

/* ─── RESPONSIVE ─── */
@media (max-width: 768px) {
  .nav { padding: 16px 20px; }
  .btn-submit { padding: 5px 8px; font-size: 0.7rem; }
  .hero { padding: 26px 20px 14px; }
  .hero h1 { font-size: 1.78rem; }
  .hero p { font-size: 0.9rem; margin-bottom: 16px; }
  .hero-stats { gap: 28px; }
  .section { padding: 28px 20px; }
  .form-card { margin: 24px 16px; padding: 28px 20px; }
  .table { font-size: 0.8rem; }
  .table th, .table td { padding: 10px 12px; }
  .td-desc { max-width: 180px; }
  .filter-search { width: 140px; }
  .filters { gap: 6px; }
}

/* ─── ANIMATIONS ─── */
@keyframes fade-up {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-in {
  animation: fade-up 0.5s ease both;
}
.delay-1 { animation-delay: 0.1s; }
.delay-2 { animation-delay: 0.2s; }
.delay-3 { animation-delay: 0.3s; }
`;
