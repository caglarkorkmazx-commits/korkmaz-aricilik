'use client'
import { useState, useEffect } from 'react'

export default function AdminPanel() {
  // Blog State'leri
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [blogs, setBlogs] = useState([])

  // Galeri Fotoğrafları State'leri
  const [photoTitle, setPhotoTitle] = useState('')
  const [photoTag, setPhotoTag] = useState('Üretim')
  const [photos, setPhotos] = useState([])

  // HERO SLIDER FOTOĞRAFLARI STATE'LERİ
  const [heroTitle, setHeroTitle] = useState('')
  const [heroUrl, setHeroUrl] = useState('')
  const [heroPhotos, setHeroPhotos] = useState([])

  const [message, setMessage] = useState('')

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('korkmaz_blogs')) || []
    const savedPhotos = JSON.parse(localStorage.getItem('korkmaz_photos')) || []
    const savedHero = JSON.parse(localStorage.getItem('korkmaz_hero_photos')) || []
    setBlogs(savedBlogs)
    setPhotos(savedPhotos)
    setHeroPhotos(savedHero)
  }, [])

  // Blog Ekle
  const handleAddBlog = (e) => {
    e.preventDefault()
    const newBlog = { id: Date.now(), title, excerpt, date: '19 Ağustos 2026' }
    const updated = [newBlog, ...blogs]
    setBlogs(updated)
    localStorage.setItem('korkmaz_blogs', JSON.stringify(updated))
    setMessage('Blog eklendi!')
    setTitle(''); setExcerpt('')
  }

  // Galeri Fotoğrafı Ekle
  const handleAddPhoto = (e) => {
    e.preventDefault()
    const newPhoto = { id: Date.now(), title: photoTitle, tag: photoTag }
    const updated = [newPhoto, ...photos]
    setPhotos(updated)
    localStorage.setItem('korkmaz_photos', JSON.stringify(updated))
    setMessage('Galeri fotoğrafı eklendi!')
    setPhotoTitle('')
  }

  const handleDeletePhoto = (id) => {
    const updated = photos.filter(p => p.id !== id)
    setPhotos(updated)
    localStorage.setItem('korkmaz_photos', JSON.stringify(updated))
  }

  // HERO SLIDER FOTOĞRAF EKLEME & SİLME
  const handleAddHeroPhoto = (e) => {
    e.preventDefault()
    const newHero = {
      id: Date.now(),
      title: heroTitle,
      url: heroUrl || 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80'
    }
    const updated = [...heroPhotos, newHero]
    setHeroPhotos(updated)
    localStorage.setItem('korkmaz_hero_photos', JSON.stringify(updated))
    setMessage('Hero Slider fotoğrafı eklendi!')
    setHeroTitle(''); setHeroUrl('')
  }

  const handleDeleteHeroPhoto = (id) => {
    const updated = heroPhotos.filter(h => h.id !== id)
    setHeroPhotos(updated)
    localStorage.setItem('korkmaz_hero_photos', JSON.stringify(updated))
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '750px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '30px' }}>
        
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h1 style={{ color: '#f59e0b', fontSize: '24px' }}>Korkmaz Arıcılık - Yönetim Paneli</h1>
          <a href="/" style={{ color: '#aaa', fontSize: '14px', textDecoration: 'none' }}>&larr; Siteye Dön</a>
        </div>

        {message && <p style={{ padding: '12px', background: '#222', color: '#f59e0b', borderRadius: '6px', border: '1px solid #444' }}>{message}</p>}

        {/* HERO SLIDER YÖNETİMİ */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#f59e0b' }}>Hero Slider Fotoğrafları (Akan Kısım)</h2>
          <form onSubmit={handleAddHeroPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '20px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#aaa' }}>Fotoğraf Başlığı / Etiketi</label>
              <input type="text" value={heroTitle} onChange={(e) => setHeroTitle(e.target.value)} required placeholder="Örn: Aydın Sahası Ana Arı Kontrolü" style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '5px', fontSize: '13px', color: '#aaa' }}>Görsel URL'si (Opsiyonel)</label>
              <input type="text" value={heroUrl} onChange={(e) => setHeroUrl(e.target.value)} placeholder="https://... (Boş bırakılırsa örnek resim atar)" style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            </div>
            <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#000', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>
              Hero Slider'a Fotoğraf Ekle
            </button>
          </form>

          <h3 style={{ fontSize: '14px', marginBottom: '10px', color: '#ccc' }}>Mevcut Slider Görselleri ({heroPhotos.length})</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', maxHeight: '180px', overflowY: 'auto' }}>
            {heroPhotos.map((item) => (
              <div key={item.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: '#222', padding: '8px 12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '13px' }}>{item.title}</span>
                <button onClick={() => handleDeleteHeroPhoto(item.id)} style={{ background: '#ef4444', color: '#fff', border: 'none', padding: '4px 8px', borderRadius: '4px', cursor: 'pointer', fontSize: '11px' }}>Sil</button>
              </div>
            ))}
            {heroPhotos.length === 0 && <p style={{ color: '#666', fontSize: '13px' }}>Slider için henüz özel görsel eklenmedi (Varsayılanlar gösteriliyor).</p>}
          </div>
        </div>

        {/* BLOG EKLEME */}
        <div style={{ background: '#1a1a1a', padding: '25px', borderRadius: '12px', border: '1px solid #333' }}>
          <h2 style={{ fontSize: '18px', marginBottom: '15px', color: '#fff' }}>Yeni Blog Ekle</h2>
          <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Blog Başlığı" required style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            <textarea value={excerpt} onChange={(e) => setExcerpt(e.target.value)} placeholder="Kısa Özet" required rows="2" style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }} />
            <button type="submit" style={{ backgroundColor: '#f59e0b', color: '#000', padding: '10px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}>Yayınla</button>
          </form>
        </div>

      </div>
    </div>
  )
}
