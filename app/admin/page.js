'use client'
import { useState, useEffect } from 'react'

export default function AdminPanel() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState('')

  // Sayfa açıldığında kayıtlı blogları çekelim
  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('korkmaz_blogs')) || []
    setBlogs(savedBlogs)
  }, [])

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

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
        <h1 style={{ color: '#f59e0b', marginBottom: '20px', fontSize: '24px' }}>Korkmaz Arıcılık - Admin Paneli</h1>
        
        {message && <p style={{ padding: '10px', background: '#222', color: '#f59e0b', marginBottom: '15px', borderRadius: '6px' }}>{message}</p>}

        <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#aaa' }}>Blog Başlığı</label>
            <input 
              type="text" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
            />
          </div>

          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '14px', color: '#aaa' }}>Kısa Özet</label>
            <textarea 
              value={excerpt} 
              onChange={(e) => setExcerpt(e.target.value)} 
              required 
              rows="3"
              style={{ width: '100%', padding: '10px', background: '#222', border: '1px solid #444', color: '#fff', borderRadius: '6px' }}
            />
          </div>

          <button 
            type="submit" 
            style={{ backgroundColor: '#f59e0b', color: '#000', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Yazıyı Yayınla
          </button>
        </form>

        <a href="/" style={{ color: '#f59e0b', fontSize: '14px', textDecoration: 'none' }}>&larr; Ana Sayfaya Dön</a>
      </div>
    </div>
  )
}
