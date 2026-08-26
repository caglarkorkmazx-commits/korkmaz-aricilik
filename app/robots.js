export default function robots() {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/admin/', // Admin panelini indekslemeye kapattık
    },
    sitemap: 'https://korkmazaricilik.com/sitemap.xml',
  }
}
