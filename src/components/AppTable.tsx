import type { FC } from 'hono/jsx';
import { getDateLocale, type Locale, type Messages } from '../i18n';
import type { AppRecord } from '../types';

const formatDate = (d: string, locale: Locale) => {
  const date = new Date(d + 'Z');
  return date.toLocaleDateString(getDateLocale(locale), { month: 'short', day: 'numeric', year: 'numeric' });
};

const linkIcon = (type: string) =>
  type === 'app'
    ? `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2z"/><path d="M2 12h20"/><path d="M12 2a15 15 0 0 1 4 10 15 15 0 0 1-4 10 15 15 0 0 1-4-10 15 15 0 0 1 4-10z"/></svg>`
    : `<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>`;

export const AppTable: FC<{
  apps: AppRecord[];
  locale: Locale;
  messages: Messages;
  showStatus?: boolean;
  adminActions?: boolean;
}> = ({ apps, locale, messages, showStatus, adminActions }) => {
  if (apps.length === 0) {
    return (
      <div class="table-wrap">
        <div class="table-empty">{messages.common.noItemsYet}</div>
      </div>
    );
  }

  return (
    <div class="table-wrap">
      <table class="table">
        <thead>
          <tr>
            <th>{messages.common.type}</th>
            <th>{messages.common.name}</th>
            <th>{messages.common.description}</th>
            <th>{messages.common.link}</th>
            <th>{messages.common.date}</th>
            {showStatus && <th>{messages.common.status}</th>}
            {adminActions && <th>{messages.common.actions}</th>}
          </tr>
        </thead>
        <tbody>
          {apps.map((app) => (
            <tr data-id={app.id}>
              <td>
                <span class={`tag tag-${app.type}`}>
                  {app.type === 'app' ? messages.common.app : messages.common.system}
                </span>
              </td>
              <td>
                <div class="td-name">
                  {app.image_key ? (
                    <img class="td-icon" src={`/api/images/${app.image_key}`} alt="" loading="lazy" />
                  ) : (
                    <div class="td-icon-placeholder">
                      {app.type === 'app' ? '📱' : '⚙️'}
                    </div>
                  )}
                  {app.name}
                </div>
              </td>
              <td class="td-desc">{app.description}</td>
              <td class="td-link">
                <a href={app.link} target="_blank" rel="noopener">
                  <span dangerouslySetInnerHTML={{ __html: linkIcon(app.type) }} />
                  {app.type === 'app' ? messages.common.appStore : messages.common.github}
                </a>
              </td>
              <td class="td-time">{formatDate(app.created_at, locale)}</td>
              {showStatus && (
                <td>
                  <span class={`tag-status tag-${app.status}`}>{messages.status[app.status]}</span>
                </td>
              )}
              {adminActions && app.status === 'pending' && (
                <td>
                  <div class="admin-actions">
                    <button class="btn-approve" onclick={`adminAction('${app.id}','approve')`}>{messages.admin.actions.approve}</button>
                    <button class="btn-reject" onclick={`adminAction('${app.id}','reject')`}>{messages.admin.actions.reject}</button>
                  </div>
                </td>
              )}
              {adminActions && app.status !== 'pending' && <td></td>}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
