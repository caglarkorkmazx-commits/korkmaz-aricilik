'use client'
import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import Link from 'next/link'
import { supabase } from '../../../lib/supabase'

export default function BlogDetailPage() {
  const { id } = useParams()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBlog = async () => {
      const { data } = await supabase.from('blogs').select('*').eq('id', id).single()
      if (data) setBlog(data)
      setLoading(false)
    }
    if (id) fetchBlog()
  }, [id])

  if (loading) return <div style={{ color: '#fff', padding: '100px', textAlign: 'center' }}>İçerik yükleniyor...</div>
  if (!blog) return <div style={{ color: '#fff', padding: '100px', textAlign: 'center' }}>Yazı bulunamadı.</div>

  return (
    <main style={{ maxWidth: '800px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh' }}>
      <Link href="/blog" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '14px', display: 'inline-block', marginBottom: '25px' }}>
        &larr; Tüm Bloglara Dön
      </Link>

      <span style={{ fontSize: '13px', color: '#f59e0b', display: 'block', marginBottom: '10px' }}>{blog.date}</span>
      <h1 style={{ fontSize: '32px', color: '#fff', fontWeight: 'bold', marginBottom: '20px', lineHeight: '1.3' }}>{blog.title}</h1>

      {blog.image_url && (
        <img src={blog.image_url} alt={blog.title} style={{ width: '100%', maxHeight: '420px', objectFit: 'cover', borderRadius: '12px', marginBottom: '30px', border: '1px solid #333' }} />
      )}

      <div style={{ color: '#ccc', fontSize: '16px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
        {blog.content || blog.excerpt}
      </div>
    </main>
  )
}
