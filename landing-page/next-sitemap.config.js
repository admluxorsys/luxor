const locales = ['en', 'es', 'fr', 'pt', 'de', 'zh', 'ja', 'ru'];
const sections = [
    '',
    '/integrations',
    '/coming-soon',
    '/community',
    '/excelsior',
    '/intelligent-glasses',
    '/lux-origin',
    '/luxor',
    '/luxor-pay',
    '/roadmap',
    '/stablecoin',
    '/team'
];

/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://byluxor.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false, // Single sitemap file as per user instructions
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/admin/'],
      },
    ],
  },
  exclude: ['/api/*', '/admin/*'],
  additionalPaths: async (config) => {
    const paths = [];
    
    for (const locale of locales) {
        for (const section of sections) {
            const path = `/${locale}${section}`;
            paths.push(await config.transform(config, path));
        }
    }
    
    // Also include root paths if needed (usually Next.js handles redirects, but sitemap should be explicit)
    // Actually, next-intl usually redirects / to /defaultLocale
    
    return paths;
  },
}
