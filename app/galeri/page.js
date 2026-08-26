'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export default function GaleriPage() {
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchPhotos = async () => {
      const { data } = await supabase.from('photos').select('*').order('id', { ascending: false })
      if (data && data.length > 0) setPhotos(data)
      setLoading(false)
    }
    fetchPhotos()
  }, [])

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh' }}>
      <div style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Fotoğraf Galerisi</h1>
        <p style={{ color: '#888' }}>Saha çalışmalarımız, kovan bakımları, ana arı üretimi ve bal hasadı kareleri.</p>
      </div>

      {loading ? (
        <div style={{ color: '#aaa' }}>Görseller yükleniyor...</div>
      ) : (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
          {photos.map((item) => (
            <div 
              key={item.id} 
              style={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333', 
                borderRadius: '12px', 
                height: '240px', 
                position: 'relative', 
                overflow: 'hidden',
                display: 'flex',
                alignItems: 'flex-end'
              }}
            >
              {item.url && (
                <img src={item.url} alt={item.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              )}
              <div style={{ position: 'relative', zIndex: 1, width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.9))', padding: '15px' }}>
                {item.tag && <span style={{ fontSize: '11px', color: '#f59e0b', textTransform: 'uppercase', fontWeight: 'bold', display: 'block' }}>{item.tag}</span>}
                <h3 style={{ fontSize: '14px', color: '#fff', margin: '3px 0 0 0' }}>{item.title}</h3>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  )
}
