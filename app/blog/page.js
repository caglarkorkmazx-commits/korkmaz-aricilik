'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../../lib/supabase'

export default function BlogListPage() {
  const DEFAULT_IMAGE = 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80'
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    const fetchBlogs = async () => {
      const { data } = await supabase.from('blogs').select('*').order('id', { ascending: false })
      if (data) setBlogs(data)
    }
    fetchBlogs()
  }, [])

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh' }}>
      <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Arıcılık Blog & Rehber</h1>
      <p style={{ color: '#888', marginBottom: '40px' }}>Belfast ana arı bakımı, koloni yönetimi ve doğal bal üretimi üzerine teknik makaleler.</p>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '25px' }}>
        {blogs.map((blog) => (
          <article key={blog.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
            <div style={{ width: '100%', height: '200px', backgroundColor: '#222' }}>
              <img src={blog.image_url || DEFAULT_IMAGE} alt={blog.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            </div>

            <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#f59e0b', display: 'block', marginBottom: '8px' }}>{blog.date}</span>
                <h2 style={{ fontSize: '18px', color: '#fff', fontWeight: 'bold', marginBottom: '10px', lineHeight: '1.4' }}>{blog.title}</h2>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.6', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {blog.excerpt}
                </p>
              </div>

              {/* Devamını Oku butonu ilgili blog detay sayfasına yönlendirir */}
              <Link 
                href={`/blog/${blog.id}`} 
                style={{ color: '#f59e0b', fontSize: '14px', fontWeight: 'bold', textDecoration: 'none', display: 'inline-block' }}
              >
                Devamını Oku &rarr;
              </Link>
            </div>
          </article>
        ))}
      </div>
    </main>
  )
}
