'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Admin() {
  const [heroTitle, setHeroTitle] = useState('')
  const [heroUrl, setHeroUrl] = useState('')
  const [heroFile, setHeroFile] = useState(null)
  const [uploading, setUploading] = useState(false)
  const [heroPhotos, setHeroPhotos] = useState([])

  const [blogTitle, setBlogTitle] = useState('')
  const [blogExcerpt, setBlogExcerpt] = useState('')
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: hData } = await supabase.from('hero_photos').select('*').order('id', { ascending: false })
    const { data: bData } = await supabase.from('blogs').select('*').order('id', { ascending: false })

    if (hData) setHeroPhotos(hData)
    if (bData) setBlogs(bData)
  }

  const handleAddPhoto = async (e) => {
    e.preventDefault()
    if (!heroTitle) return alert('Lütfen bir başlık girin.')

    let finalImageUrl = heroUrl

    // Cihazdan dosya seçildiyse Supabase Storage'a yükle
    if (heroFile) {
      setUploading(true)
      const fileExt = heroFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `hero/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, heroFile)

      if (uploadError) {
        alert('Fotoğraf yüklenirken hata oluştu: ' + uploadError.message)
        setUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath)

      finalImageUrl = urlData.publicUrl
    }

    if (!finalImageUrl) {
      setUploading(false)
      return alert('Lütfen bir dosya seçin veya görsel URL\'si girin.')
    }

    // Veritabanına kaydet
    const { error } = await supabase.from('hero_photos').insert([
      { title: heroTitle, url: finalImageUrl }
    ])

    if (error) {
      alert('Veritabanına eklenirken hata: ' + error.message)
    } else {
      setHeroTitle('')
      setHeroUrl('')
      setHeroFile(null)
      const fileInput = document.getElementById('hero-file-input')
      if (fileInput) fileInput.value = ''
      fetchData()
    }
    setUploading(false)
  }

  const handleDeletePhoto = async (id) => {
    const { error } = await supabase.from('hero_photos').delete().eq('id', id)
    if (!error) fetchData()
  }

  const handleAddBlog = async (e) => {
    e.preventDefault()
    if (!blogTitle || !blogExcerpt) return alert('Tüm alanları doldurun.')

    const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    const { error } = await supabase.from('blogs').insert([
      { title: blogTitle, excerpt: blogExcerpt, date: dateStr }
    ])

    if (!error) {
      setBlogTitle('')
      setBlogExcerpt('')
      fetchData()
    }
  }

  const handleDeleteBlog = async (id) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (!error) fetchData()
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <header style={{ maxWidth: '800px', margin: '0 auto 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>Korkmaz Arıcılık - Canlı Yönetim Paneli</h1>
        <a href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>&larr; Siteye Dön</a>
      </header>

      <main style={{ maxWidth: '800px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        {/* HERO SLIDER FOTOĞRAFLARI */}
        <section style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '20px' }}>Hero Slider Fotoğrafları (Akan Kısım)</h2>
          
          <form onSubmit={handleAddPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              placeholder="Başlık / Etiket (Örn: Nazilli Sahası)"
              value={heroTitle}
              onChange={(e) => setHeroTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '6px' }}>Cihazdan Dosya Seçin:</label>
              <input
                id="hero-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setHeroFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#777', marginBottom: '4px' }}>Veya Dış Görsel URL'si (Opsiyonel):</label>
              <input
                type="text"
                placeholder="https://..."
                value={heroUrl}
                onChange={(e) => setHeroUrl(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '6px', color: '#aaa', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={uploading}
              style={{ backgroundColor: uploading ? '#b47808' : '#f59e0b', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: uploading ? 'wait' : 'pointer', fontSize: '14px', marginTop: '10px' }}
            >
              {uploading ? 'Fotoğraf Yükleniyor...' : 'Veritabanına Fotoğraf Ekle'}
            </button>
          </form>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>Kayıtlı Görseller ({heroPhotos.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {heroPhotos.map((photo) => (
                <div key={photo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '10px 15px', borderRadius: '6px', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={photo.url} alt={photo.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    <span style={{ fontSize: '14px' }}>{photo.title}</span>
                  </div>
                  <button onClick={() => handleDeletePhoto(photo.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* YENİ BLOG EKLE */}
        <section style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>Yeni Blog Ekle</h2>
          <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              placeholder="Blog Başlığı"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
            <textarea
              placeholder="Kısa özet"
              rows="3"
              value={blogExcerpt}
              onChange={(e) => setBlogExcerpt(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }}
            />
            <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '14px' }}>
              Yayınla
            </button>
          </form>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>Mevcut Bloglar ({blogs.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {blogs.map((blog) => (
                <div key={blog.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '10px 15px', borderRadius: '6px', border: '1px solid #333' }}>
                  <div>
                    <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{blog.title}</div>
                    <div style={{ fontSize: '12px', color: '#888' }}>{blog.date}</div>
                  </div>
                  <button onClick={() => handleDeleteBlog(blog.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  )
}
