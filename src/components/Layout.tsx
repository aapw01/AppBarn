import type { FC, PropsWithChildren } from 'hono/jsx';
import { css } from '../styles';

type LayoutProps = PropsWithChildren<{
  title?: string;
  activePath?: string;
}>;

export const Layout: FC<LayoutProps> = ({ title, activePath, children }) => {
  const pageTitle = title ? `${title} — AppBarn` : 'AppBarn — Indie Dev Showcase';
  return (
    <html lang="zh-CN">
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>{pageTitle}</title>
        <style dangerouslySetInnerHTML={{ __html: css }} />
      </head>
      <body>
        <nav class="nav">
          <a href="/" class="nav-brand">App<span>Barn</span></a>
          <div class="nav-links">
            <a href="/" class={activePath === '/' ? 'active' : ''}>Home</a>
            <a href="/apps" class={activePath === '/apps' ? 'active' : ''}>Browse</a>
            <a href="/submit" class="btn-submit">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
              Submit
            </a>
          </div>
        </nav>
        {children}
        <footer class="footer">
          AppBarn — A curated showcase of indie apps &amp; system tools.
        </footer>
      </body>
    </html>
  );
};
