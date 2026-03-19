import type { FC } from 'hono/jsx';
import { Layout } from '../components/Layout';
import { AppTable } from '../components/AppTable';
import type { AppRecord } from '../types';

export const HomePage: FC<{
  apps: AppRecord[];
  stats: { approved: number; pending: number; total: number };
}> = ({ apps, stats }) => {
  const recent = apps.slice(0, 8);
  return (
    <Layout activePath="/">
      <section class="hero animate-in">
        <h1>Where Indie Meets&nbsp;Impact</h1>
        <p>
          Curated apps and system tools by independent developers.
          Discover quality products in one clean place.
        </p>
        <div class="hero-stats">
          <div class="hero-stat">
            <div class="hero-stat-num">{stats.approved}</div>
            <div class="hero-stat-label">Products</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">
              {apps.filter((a) => a.type === 'app').length}
            </div>
            <div class="hero-stat-label">Apps</div>
          </div>
          <div class="hero-stat">
            <div class="hero-stat-num">
              {apps.filter((a) => a.type === 'system').length}
            </div>
            <div class="hero-stat-label">System Tools</div>
          </div>
        </div>
        <div class="hero-divider" />
      </section>

      <section class="section animate-in delay-2">
        <div class="section-header">
          <h2 class="section-title">Featured Products</h2>
          <a href="/apps" class="section-link">Browse all →</a>
        </div>
        <div class="home-showcase">
          <AppTable apps={recent} />
        </div>
      </section>
    </Layout>
  );
};
