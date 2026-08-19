'use client'
import { useState, useEffect } from 'react'

export default function AdminPanel() {
  // Blog State'leri
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [blogs, setBlogs] = useState([])

  // Fotoğraf State'leri
  const [photoTitle, setPhotoTitle] = useState('')
  const [photoTag, setPhotoTag] = useState('Üretim')
  const [photos, setPhotos] = useState([])

  const [message, setMessage] = useState('')

  // Sayfa açıldığında kayıtlı verileri çekelim
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('korkmaz_blogs')) || []
    const savedPhotos = JSON.parse(localStorage.getItem('korkmaz_photos')) || []
    setBlogs(savedBlogs)
    setPhotos(savedPhotos)
  }, [])

  // Blog Ekleme
  const handleAddBlog = (e) => {
    e.preventDefault()
    const newBlog = {
      id: Date.now(),
      title,
      excerpt,
      date: '19 Ağustos 2026'
    }
    const updatedBlogs = [newBlog, ...blogs]
    setBlogs(updatedBlogs)
    localStorage.setItem('korkmaz_blogs', JSON.stringify(updatedBlogs))
    setMessage('Blog yazısı başarıyla eklendi!')
    setTitle('')
    setExcerpt('')
  }

  // Fotoğraf Ekleme
  const handleAddPhoto = (e) => {
    e.preventDefault()
    const newPhoto = {
      id: Date.now(),
      title: photoTitle,
      tag: photoTag
    }
    const updatedPhotos = [newPhoto, ...photos]
    setPhotos(updatedPhotos)
    localStorage.setItem('korkmaz_photos', JSON.stringify(updatedPhotos))
    setMessage('Fotoğraf başarıyla eklendi!')
    setPhotoTitle('')
  }

  // Fotoğraf Silme
  const handleDeletePhoto = (id) => {
    const updatedPhotos = photos.filter(p => p.id !== id)
    setPhotos(updatedPhotos)
    localStorage.setItem('korkmaz_photos', JSON.stringify(updatedPhotos))
    setMessage('Fotoğraf silindi.')
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#f59e0b', fontSize: '24px' }}>Korkmaz Arıcılık - Yönetim Paneli</h1>
          <a href="/" style={{ color: '#aaa', fontSize: '14px', textDecoration: 'none' }}>&larr; Siteye Dön</a>
        </div>

        {message && <p style={{ padding: '12px', background: '#222', color: '#f59e0b', borderRadius: '6px', border: '1px solid #444' }}>{message}</p>}

        {/* 1. KISIM: BLOG EKLEME */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#fff' }}>Yeni Blog Ekle</h2>
          <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#aaa' }}>Blog Başlığı</label>
              <input 
                type="text" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
                style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#aaa' }}>Kısa Özet / İçerik</label>
              <textarea 
                value={excerpt} 
                onChange={(e) => setExcerpt(e.target.value)} 
                required 
                rows="2"
                style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#000', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Blog Yayınla
            </button>
          </form>
        </div>

        {/* 2. KISIM: FOTOĞRAF EKLEME VE YÖNETİMİ */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#fff' }}>Fotoğraf Ekle</h2>
          <form onSubmit={handleAddPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#aaa' }}>Fotoğraf Adı / Açıklaması</label>
              <input 
                type="text" 
                value={photoTitle} 
                onChange={(e) => setPhotoTitle(e.target.value)} 
                required 
                placeholder="Örn: Yeni Sezon Çıtaları"
                style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#aaa' }}>Kategori / Etiket</label>
              <select 
                value={photoTag} 
                onChange={(e) => setPhotoTag(e.target.value)}
                style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
              >
                <option value="Üretim">Üretim</option>
                <option value="Saha">Saha</option>
                <option value="Doğal">Doğal</option>
                <option value="Teknik">Teknik</option>
              </select>
            </div>
            <button type="submit" style={{ backgroundColor: '#3b82f6', color: '#fff', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Fotoğraf Ekle
            </button>
          </form>

          {/* Eklenen Fotoğrafları Listeleme ve Silme */}
          <h3 style={{ fontSize: '15px', marginBottom: '10px', color: '#ccc' }}>Mevcut Fotoğraflar ({photos.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '200px', overflowY: 'auto' }}>
            {photos.map((p) => (
              <div key={p.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '8px 12px', borderRadius: '6px', border: '1px solid #333' }}>
                <div>
                  <span style={{ color: '#f59e0b', fontSize: '12px', marginRight: '8px' }}>[{p.tag}]</span>
                  <span style={{ fontSize: '14px' }}>{p.title}</span>
                </div>
                <button 
                  onClick={() => handleDeletePhoto(p.id)} 
                  style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}
                >
                  Sil
                </button>
              </div>
            ))}
            {photos.length === 0 && <p style={{ color: '#666', fontSize: '13px' }}>Henüz eklenen fotoğraf yok.</p>}
          </div>

        </div>

      </div>
    </div>
  )
}
