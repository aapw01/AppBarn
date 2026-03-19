import { getBrandIconSvg } from '../brand';
import type { FC, PropsWithChildren } from 'hono/jsx';
import { css } from '../styles';
import { getHtmlLang, LOCALE_COOKIE_NAME, type Locale, type Messages } from '../i18n';

type LayoutProps = PropsWithChildren<{
  title?: string;
  activePath?: string;
  stats?: { approved: number; apps: number; websites: number; system: number };
  locale: Locale;
  messages: Messages;
}>;

export const Layout: FC<LayoutProps> = ({ title, activePath, stats, locale, messages, children }) => {
  const pageTitle = title ? `${title} — AppBarn` : messages.meta.defaultTitle;
  return (
    <html lang={getHtmlLang(locale)}>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#2C5F2D" />
        <link rel="icon" href="/favicon.svg" type="image/svg+xml" />
        <link rel="shortcut icon" href="/favicon.svg" />
        <title>{pageTitle}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <nav class="nav">
          <a href="/" class="nav-brand">
            <span
              class="nav-brand-mark"
              aria-hidden="true"
              dangerouslySetInnerHTML={{ __html: getBrandIconSvg({ size: 34, idPrefix: 'appbarn-nav' }) }}
            />
            <span class="nav-brand-wordmark">App<span>Barn</span></span>
          </a>
          {stats && (
            <div class="nav-stats">
              <button type="button" class="nav-stat-btn active" data-filter="all" aria-pressed="true">
                <span class="nav-stat"><strong>{stats.approved}</strong> {messages.nav.products}</span>
              </button>
              <span class="nav-stat-sep" />
              <button type="button" class="nav-stat-btn" data-filter="app" aria-pressed="false">
                <span class="nav-stat"><strong>{stats.apps}</strong> {messages.nav.apps}</span>
              </button>
              <span class="nav-stat-sep" />
              <button type="button" class="nav-stat-btn" data-filter="website" aria-pressed="false">
                <span class="nav-stat"><strong>{stats.websites}</strong> {messages.nav.websites}</span>
              </button>
              <span class="nav-stat-sep" />
              <button type="button" class="nav-stat-btn" data-filter="system" aria-pressed="false">
                <span class="nav-stat"><strong>{stats.system}</strong> {messages.nav.tools}</span>
              </button>
            </div>
          )}
          <div class="nav-links">
            <a href="/" class={activePath === '/' ? 'active' : ''}>{messages.nav.home}</a>
            <a href="/apps" class={activePath === '/apps' ? 'active' : ''}>{messages.nav.browse}</a>
            <a href="/submit" class="btn-submit">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              {messages.nav.submit}
            </a>
          </div>
        </nav>
        {children}
        <footer class="footer">
          {messages.footer.tagline}
        </footer>
        <div class="locale-switcher" data-current-locale={locale}>
          <button type="button" class="locale-trigger" aria-haspopup="true" aria-expanded="false">
            <span>{messages.common.localeShort[locale]}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
          <div class="locale-menu">
            <div class="locale-menu-label">{messages.common.language}</div>
            <div class="locale-switcher-actions">
              <button
                type="button"
                class={locale === 'en' ? 'locale-switcher-btn active' : 'locale-switcher-btn'}
                data-locale="en"
                title={messages.common.localeName.en}
              >
                {messages.common.localeShort.en}
              </button>
              <button
                type="button"
                class={locale === 'zh' ? 'locale-switcher-btn active' : 'locale-switcher-btn'}
                data-locale="zh"
                title={messages.common.localeName.zh}
              >
                {messages.common.localeShort.zh}
              </button>
            </div>
          </div>
        </div>
        <script dangerouslySetInnerHTML={{ __html: `
          (function(){
            const switcher = document.querySelector('.locale-switcher');
            if (!switcher) return;
            const trigger = switcher.querySelector('.locale-trigger');
            const currentLocale = switcher.getAttribute('data-current-locale');
            function closeMenu() {
              switcher.classList.remove('open');
              if (trigger) trigger.setAttribute('aria-expanded', 'false');
            }
            if (trigger) {
              trigger.addEventListener('click', function(event) {
                event.stopPropagation();
                const shouldOpen = !switcher.classList.contains('open');
                switcher.classList.toggle('open', shouldOpen);
                trigger.setAttribute('aria-expanded', shouldOpen ? 'true' : 'false');
              });
            }
            switcher.querySelectorAll('[data-locale]').forEach(function(button) {
              button.addEventListener('click', function() {
                const nextLocale = button.getAttribute('data-locale');
                if (!nextLocale || nextLocale === currentLocale) return;
                document.cookie = '${LOCALE_COOKIE_NAME}=' + encodeURIComponent(nextLocale) + '; path=/; max-age=31536000; samesite=lax';
                window.location.reload();
              });
            });
            document.addEventListener('click', function(event) {
              if (!switcher.contains(event.target)) closeMenu();
            });
            document.addEventListener('keydown', function(event) {
              if (event.key === 'Escape') closeMenu();
            });
          })();
        ` }} />
      </body>
    </html>
  );
};
