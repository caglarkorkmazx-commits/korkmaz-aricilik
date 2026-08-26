import { supabase } from '../lib/supabase'

export default async function sitemap() {
  const baseUrl = 'https://korkmazaricilik.com'

  // 1. Supabase'den dinamik blog yazılarını çek
  const { data: blogs } = await supabase
    .from('blogs')
    .select('id, updated_at, created_at')

  // Blog detay/yazı sayfalarının URL yapıları
  const blogUrls = (blogs || []).map((blog) => ({
    url: `${baseUrl}/blog/${blog.id}`,
    lastModified: new Date(blog.updated_at || blog.created_at || Date.now()),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  // 2. Sitedeki sabit (statik) sayfalar
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/hakkimizda`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/galeri`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/iletisim`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.5,
    },
  ]

  return [...staticPages, ...blogUrls]
}
