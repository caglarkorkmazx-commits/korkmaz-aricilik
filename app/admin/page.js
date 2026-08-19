'use client'
import { useState } from 'react'
import { supabase } from '../../utils/supabase'

export default function AdminPanel() {
  const [title, setTitle] = useState('')
  const [excerpt, setExcerpt] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')

  const handleAddBlog = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage('')

    const { error } = await supabase
      .from('blogs')
      .insert([{ title, excerpt, date: '19 Ağustos 2026' }])

    setLoading(false)
    if (error) {
      setMessage('Hata oluştu: ' + error.message)
    } else {
      setMessage('Blog yazısı başarıyla eklendi!')
      setTitle('')
      setExcerpt('')
    }
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#fff', minHeight: '100vh', padding: '40px', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '600px', margin: '0 auto', background: '#1a1a1a', padding: '30px', borderRadius: '12px', border: '1px solid #333' }}>
        <h1 style={{ color: '#f59e0b', marginBottom: '20px', fontSize: '24px' }}>Korkmaz Arıcılık - Admin Paneli</h1>
        
        {message && <p style={{ padding: '10px', background: '#222', color: '#f59e0b', marginBottom: '15px', borderRadius: '6px' }}>{message}</p>}

        <form onSubmit={handleAddBlog} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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
            disabled={loading}
            style={{ backgroundColor: '#f59e0b', color: '#000', padding: '12px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            {loading ? 'Ekleniyor...' : 'Yazıyı Yayınla'}
          </button>
        </form>
      </div>
    </div>
  )
}
