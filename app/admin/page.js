'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'

export default function AdminPanel() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [blogs, setBlogs] = useState([])

  const [heroTitle, setHeroTitle] = useState('')
  const [heroUrl, setHeroUrl] = useState('')
  const [heroPhotos, setHeroPhotos] = useState([])

  const [message, setMessage] = useState('')

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: bData } = await supabase.from('blogs').select('*').order('id', { ascending: false })
    const { data: hData } = await supabase.from('hero_photos').select('*').order('id', { ascending: false })

    if (bData) setBlogs(bData)
    if (hData) setHeroPhotos(hData)
  }

  // Hero Slider Fotoğraf Ekle / Sil
  const handleAddHeroPhoto = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('hero_photos').insert([
      { title: heroTitle, url: heroUrl || 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80' }
    ])
    if (!error) {
      setMessage('Hero Slider fotoğrafı veritabanına eklendi!')
      setHeroTitle(''); setHeroUrl('')
      fetchData()
    }
  }

  const handleDeleteHeroPhoto = async (id) => {
    await supabase.from('hero_photos').delete().eq('id', id)
    fetchData()
  }

  // Blog Ekle / Sil
  const handleAddBlog = async (e) => {
    e.preventDefault()
    const { error } = await supabase.from('blogs').insert([{ title, excerpt }])
    if (!error) {
      setMessage('Blog yazısı veritabanına eklendi!')
      setTitle(''); setExcerpt('')
      fetchData()
    }
  }

  const handleDeleteBlog = async (id) => {
    await supabase.from('blogs').delete().eq('id', id)
    fetchData()
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#f59e0b', fontSize: '24px' }}>Korkmaz Arıcılık - Canlı Yönetim Paneli</h1>
          <a href="/" style={{ color: '#aaa', fontSize: '14px', textDecoration: 'none' }}>&larr; Siteye Dön</a>
        </div>

        {message && <p style={{ padding: '12px', background: '#222', color: '#f59e0b', borderRadius: '6px', border: '1px solid #444' }}>{message}</p>}

        {/* HERO SLIDER YÖNETİMİ */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#f59e0b' }}>Hero Slider Fotoğrafları (Akan Kısım)</h2>
          <form onSubmit={handleAddHeroPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} required placeholder="Başlık / Etiket (Örn: Nazilli Sahası)" style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            <input type="text" value={heroUrl} onChange={(e) => setHeroUrl(e.target.value)} placeholder="Görsel URL'si (Opsiyonel)" style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#000', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Veritabanına Fotoğraf Ekle
            </button>
          </form>

          <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#ccc' }}>Kayıtlı Görseller ({heroPhotos.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {heroPhotos.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '8px 12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px' }}>{item.title}</span>
                <button onClick={() => handleDeleteHeroPhoto(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Sil</button>
              </div>
            ))}
          </div>
        </div>

        {/* BLOG YÖNETİMİ */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#fff' }}>Yeni Blog Ekle</h2>
          <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Başlığı" required style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Kısa Özet" required rows="2" style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#000', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Yayınla</button>
          </form>

          <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#ccc' }}>Mevcut Bloglar ({blogs.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {blogs.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '8px 12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px' }}>{item.title}</span>
                <button onClick={() => handleDeleteBlog(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Sil</button>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}
