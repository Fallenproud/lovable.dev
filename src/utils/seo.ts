export interface SEOConfig {
  title: string;
  description: string;
  canonical?: string;
  noIndex?: boolean;
  ogImage?: string;
}

export const defaultSEO: SEOConfig = {
  title: 'Lovable - Create apps and websites by chatting with AI',
  description: 'Create apps and websites by chatting with AI',
  ogImage: 'https://lovable.dev/og-image.png'
};

export function generateSitemap(): string {
  const baseUrl = 'https://lovable.dev';
  const routes = [
    { path: '/', priority: '1.0', changefreq: 'daily' },
    { path: '/pricing', priority: '0.8', changefreq: 'weekly' },
    { path: '/docs', priority: '0.8', changefreq: 'weekly' },
    { path: '/blog', priority: '0.7', changefreq: 'weekly' },
    { path: '/changelog', priority: '0.6', changefreq: 'weekly' },
    { path: '/integrations', priority: '0.6', changefreq: 'monthly' },
    { path: '/legal/terms', priority: '0.3', changefreq: 'yearly' },
    { path: '/legal/privacy', priority: '0.3', changefreq: 'yearly' },
  ];

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map(route => `  <url>
    <loc>${baseUrl}${route.path}</loc>
    <changefreq>${route.changefreq}</changefreq>
    <priority>${route.priority}</priority>
    <lastmod>${new Date().toISOString().split('T')[0]}</lastmod>
  </url>`).join('\n')}
</urlset>`;

  return sitemap;
}

export function generateRobotsTxt(): string {
  return `User-agent: *
Allow: /

Sitemap: https://lovable.dev/sitemap.xml`;
}
