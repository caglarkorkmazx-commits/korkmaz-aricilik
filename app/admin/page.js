'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function Admin() {
  // Hero Slider State
  const [heroTitle, setHeroTitle] = useState('')
  const [heroUrl, setHeroUrl] = useState('')
  const [heroFile, setHeroFile] = useState(null)
  const [heroUploading, setHeroUploading] = useState(false)
  const [heroPhotos, setHeroPhotos] = useState([])

  // Galeri Fotoğrafları State
  const [photoTitle, setPhotoTitle] = useState('')
  const [photoTag, setPhotoTag] = useState('Üretim')
  const [photoUrl, setPhotoUrl] = useState('')
  const [photoFile, setPhotoFile] = useState(null)
  const [photoUploading, setPhotoUploading] = useState(false)
  const [photos, setPhotos] = useState([])

  // Blog State
  const [blogTitle, setBlogTitle] = useState('')
  const [blogExcerpt, setBlogExcerpt] = useState('')
  const [blogUrl, setBlogUrl] = useState('')
  const [blogFile, setBlogFile] = useState(null)
  const [blogUploading, setBlogUploading] = useState(false)
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    const { data: hData } = await supabase.from('hero_photos').select('*').order('id', { ascending: false })
    const { data: pData } = await supabase.from('photos').select('*').order('id', { ascending: false })
    const { data: bData } = await supabase.from('blogs').select('*').order('id', { ascending: false })

    if (hData) setHeroPhotos(hData)
    if (pData) setPhotos(pData)
    if (bData) setBlogs(bData)
  }

  // Hero Fotoğraf Ekleme
  const handleAddHeroPhoto = async (e) => {
    e.preventDefault()
    if (!heroTitle) return alert('Lütfen bir başlık girin.')

    let finalImageUrl = heroUrl

    if (heroFile) {
      setHeroUploading(true)
      const fileExt = heroFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `hero/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, heroFile)

      if (uploadError) {
        alert('Hero fotoğrafı yüklenirken hata oluştu: ' + uploadError.message)
        setHeroUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath)

      finalImageUrl = urlData.publicUrl
    }

    if (!finalImageUrl) {
      setHeroUploading(false)
      return alert('Lütfen bir dosya seçin veya görsel URL\'si girin.')
    }

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
    setHeroUploading(false)
  }

  const handleDeleteHeroPhoto = async (id) => {
    const { error } = await supabase.from('hero_photos').delete().eq('id', id)
    if (!error) fetchData()
  }

  // Galeri Fotoğrafı Ekleme
  const handleAddGalleryPhoto = async (e) => {
    e.preventDefault()
    if (!photoTitle) return alert('Lütfen bir görsel başlığı girin.')

    let finalImageUrl = photoUrl

    if (photoFile) {
      setPhotoUploading(true)
      const fileExt = photoFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `gallery/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, photoFile)

      if (uploadError) {
        alert('Galeri fotoğrafı yüklenirken hata: ' + uploadError.message)
        setPhotoUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath)

      finalImageUrl = urlData.publicUrl
    }

    const { error } = await supabase.from('photos').insert([
      { title: photoTitle, tag: photoTag, url: finalImageUrl }
    ])

    if (error) {
      alert('Galeriye eklenirken hata: ' + error.message)
    } else {
      setPhotoTitle('')
      setPhotoUrl('')
      setPhotoFile(null)
      const fileInput = document.getElementById('gallery-file-input')
      if (fileInput) fileInput.value = ''
      fetchData()
    }
    setPhotoUploading(false)
  }

  const handleDeleteGalleryPhoto = async (id) => {
    const { error } = await supabase.from('photos').delete().eq('id', id)
    if (!error) fetchData()
  }

  // Blog Ekleme
  const handleAddBlog = async (e) => {
    e.preventDefault()
    if (!blogTitle || !blogExcerpt) return alert('Başlık ve özet alanlarını doldurun.')

    setBlogUploading(true)
    let finalImageUrl = blogUrl

    // 1. Cihazdan dosya yüklendiyse Supabase Storage'a at
    if (blogFile) {
      const fileExt = blogFile.name.split('.').pop()
      const fileName = `${Date.now()}.${fileExt}`
      const filePath = `blog/${fileName}`

      const { error: uploadError } = await supabase.storage
        .from('hero-images')
        .upload(filePath, blogFile)

      if (uploadError) {
        alert('Blog görseli yüklenirken hata: ' + uploadError.message)
        setBlogUploading(false)
        return
      }

      const { data: urlData } = supabase.storage
        .from('hero-images')
        .getPublicUrl(filePath)

      finalImageUrl = urlData.publicUrl
    }

    // 2. Eğer dosya seçilmediyse ve dış URL girilmediyse, başlığı otomatik görsel olarak oluştur
    if (!finalImageUrl) {
      const formattedTitle = encodeURIComponent(blogTitle)
      finalImageUrl = `https://placehold.co/800x450/1a1a1a/f59e0b?text=${formattedTitle}`
    }

    const dateStr = new Date().toLocaleDateString('tr-TR', { day: 'numeric', month: 'long', year: 'numeric' })
    const { error } = await supabase.from('blogs').insert([
      { title: blogTitle, excerpt: blogExcerpt, date: dateStr, image_url: finalImageUrl }
    ])

    if (!error) {
      setBlogTitle('')
      setBlogExcerpt('')
      setBlogUrl('')
      setBlogFile(null)
      const fileInput = document.getElementById('blog-file-input')
      if (fileInput) fileInput.value = ''
      fetchData()
    } else {
      alert('Blog eklenirken hata: ' + error.message)
    }
    setBlogUploading(false)
  }

  const handleDeleteBlog = async (id) => {
    const { error } = await supabase.from('blogs').delete().eq('id', id)
    if (!error) fetchData()
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', padding: '40px 20px' }}>
      <header style={{ maxWidth: '850px', margin: '0 auto 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 style={{ fontSize: '24px', fontWeight: 'bold', color: '#f59e0b' }}>Korkmaz Arıcılık - Canlı Yönetim Paneli</h1>
        <a href="/" style={{ color: '#aaa', textDecoration: 'none', fontSize: '14px' }}>&larr; Siteye Dön</a>
      </header>

      <main style={{ maxWidth: '850px', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '35px' }}>
        
        {/* 1. HERO SLIDER FOTOĞRAFLARI */}
        <section style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '20px' }}>1. Hero Slider Fotoğrafları (Üst Kayar Görseller)</h2>
          
          <form onSubmit={handleAddHeroPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              placeholder="Başlık / Etiket (Örn: Nazilli Arıcılık Sahası)"
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
              disabled={heroUploading}
              style={{ backgroundColor: heroUploading ? '#b47808' : '#f59e0b', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: heroUploading ? 'wait' : 'pointer', fontSize: '14px', marginTop: '10px' }}
            >
              {heroUploading ? 'Fotoğraf Yükleniyor...' : 'Slider\'a Fotoğraf Ekle'}
            </button>
          </form>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>Kayıtlı Slider Görselleri ({heroPhotos.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {heroPhotos.map((photo) => (
                <div key={photo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '10px 15px', borderRadius: '6px', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <img src={photo.url} alt={photo.title} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                    <span style={{ fontSize: '14px' }}>{photo.title}</span>
                  </div>
                  <button onClick={() => handleDeleteHeroPhoto(photo.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 2. FOTOĞRAF GALERİSİ */}
        <section style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#f59e0b', marginBottom: '20px' }}>2. Fotoğraf Galerisi</h2>
          
          <form onSubmit={handleAddGalleryPhoto} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <div style={{ display: 'flex', gap: '10px' }}>
              <input
                type="text"
                placeholder="Görsel Başlığı (Örn: Belfast Ana Arı Üretimi)"
                value={photoTitle}
                onChange={(e) => setPhotoTitle(e.target.value)}
                style={{ flex: 2, padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none' }}
              />
              <select
                value={photoTag}
                onChange={(e) => setPhotoTag(e.target.value)}
                style={{ flex: 1, padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none' }}
              >
                <option value="Üretim">Üretim</option>
                <option value="Saha">Saha</option>
                <option value="Doğal">Doğal</option>
                <option value="Teknik">Teknik</option>
                <option value="Hasat">Hasat</option>
              </select>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '6px' }}>Cihazdan Dosya Seçin:</label>
              <input
                id="gallery-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setPhotoFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#777', marginBottom: '4px' }}>Veya Dış Görsel URL'si (Opsiyonel):</label>
              <input
                type="text"
                placeholder="https://..."
                value={photoUrl}
                onChange={(e) => setPhotoUrl(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '6px', color: '#aaa', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <button
              type="submit"
              disabled={photoUploading}
              style={{ backgroundColor: photoUploading ? '#b47808' : '#f59e0b', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: photoUploading ? 'wait' : 'pointer', fontSize: '14px', marginTop: '10px' }}
            >
              {photoUploading ? 'Galeriye Yükleniyor...' : 'Galeriye Fotoğraf Ekle'}
            </button>
          </form>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>Galerideki Fotoğraflar ({photos.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {photos.map((photo) => (
                <div key={photo.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '10px 15px', borderRadius: '6px', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {photo.url ? (
                      <img src={photo.url} alt={photo.title} style={{ width: '45px', height: '45px', objectFit: 'cover', borderRadius: '4px' }} />
                    ) : (
                      <div style={{ width: '45px', height: '45px', backgroundColor: '#333', borderRadius: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', color: '#888' }}>Yok</div>
                    )}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{photo.title}</div>
                      <span style={{ fontSize: '11px', color: '#f59e0b' }}>[{photo.tag}]</span>
                    </div>
                  </div>
                  <button onClick={() => handleDeleteGalleryPhoto(photo.id)} style={{ backgroundColor: '#dc2626', color: '#fff', border: 'none', padding: '6px 12px', borderRadius: '4px', cursor: 'pointer', fontSize: '12px' }}>Sil</button>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 3. BLOG REHBER YAZILARI */}
        <section style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', padding: '25px' }}>
          <h2 style={{ fontSize: '18px', fontWeight: 'bold', color: '#fff', marginBottom: '20px' }}>3. Arıcılık Blog & Rehber Yazıları</h2>
          
          <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <input
              type="text"
              placeholder="Blog Başlığı"
              value={blogTitle}
              onChange={(e) => setBlogTitle(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none' }}
            />
            <textarea
              placeholder="Kısa özet / Metin"
              rows="3"
              value={blogExcerpt}
              onChange={(e) => setBlogExcerpt(e.target.value)}
              style={{ width: '100%', padding: '12px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '14px', outline: 'none', resize: 'vertical' }}
            />

            <div>
              <label style={{ display: 'block', fontSize: '13px', color: '#aaa', marginBottom: '6px' }}>Cihazdan Blog Görseli Seçin (Opsiyonel):</label>
              <input
                id="blog-file-input"
                type="file"
                accept="image/*"
                onChange={(e) => setBlogFile(e.target.files[0])}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #444', borderRadius: '6px', color: '#fff', fontSize: '13px' }}
              />
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '12px', color: '#777', marginBottom: '4px' }}>Veya Dış Görsel URL'si (Opsiyonel):</label>
              <input
                type="text"
                placeholder="https://..."
                value={blogUrl}
                onChange={(e) => setBlogUrl(e.target.value)}
                style={{ width: '100%', padding: '10px', backgroundColor: '#222', border: '1px solid #333', borderRadius: '6px', color: '#aaa', fontSize: '13px', outline: 'none' }}
              />
            </div>

            <button 
              type="submit" 
              disabled={blogUploading}
              style={{ backgroundColor: blogUploading ? '#b47808' : '#f59e0b', color: '#000', border: 'none', padding: '12px', borderRadius: '6px', fontWeight: 'bold', cursor: blogUploading ? 'wait' : 'pointer', fontSize: '14px', marginTop: '10px' }}
            >
              {blogUploading ? 'Blog Yayınlanıyor...' : 'Blog Yazısını Yayınla'}
            </button>
          </form>

          <div style={{ marginTop: '25px' }}>
            <h3 style={{ fontSize: '14px', color: '#aaa', marginBottom: '10px' }}>Mevcut Bloglar ({blogs.length})</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {blogs.map((blog) => (
                <div key={blog.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: '#222', padding: '10px 15px', borderRadius: '6px', border: '1px solid #333' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    {blog.image_url && (
                      <img src={blog.image_url} alt={blog.title} style={{ width: '50px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                    )}
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 'bold' }}>{blog.title}</div>
                      <div style={{ fontSize: '12px', color: '#888' }}>{blog.date}</div>
                    </div>
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
