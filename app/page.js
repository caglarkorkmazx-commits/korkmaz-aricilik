'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [blogs, setBlogs] = useState([
    { date: '19 Ağustos 2026', title: 'Ana Arı Kabul Ettirme Yöntemleri ve Püf Noktaları', excerpt: 'Kolonide yeni ana arının sorunsuz kabul edilmesi için dikkat edilmesi gereken kritik adımlar...' },
    { date: '14 Ağustos 2026', title: 'Sezon Geçişlerinde Koloni Beslemesi Nasıl Yapılmalı?', excerpt: 'Arıların kışa güçlü ve sağlıklı hazırlanması için sonbahar bakım ve besleme stratejileri...' }
  ])

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('korkmaz_blogs'))
    if (savedBlogs && savedBlogs.length > 0) {
      setBlogs(prev => [...savedBlogs, ...prev])
    }
  }, [])

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header */}
      <header style={{ padding: '30px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222' }}>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', cursor: 'pointer' }}>
          K<span style={{color: '#fff', fontSize: '18px', marginLeft: '5px'}}>ORKMAZ</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '30px', fontSize: '14px', letterSpacing: '1px' }}>
          {['Anasayfa', 'Hakkımızda', 'Ana Arı Üretimi', 'Galeri', 'İletişim'].map((item) => (
            <span key={item} style={{ cursor: 'pointer', transition: '0.3s', color: item === 'Anasayfa' ? '#f59e0b' : '#aaa' }}>
              {item}
            </span>
          ))}
        </nav>
        <a href="/admin" style={{ backgroundColor: '#222', border: '1px solid #444', color: '#f59e0b', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: '600' }}>
          Admin Paneli
        </a>
      </header>

      {/* Hero */}
      <section style={{ padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
            Doğanın Kalbinden <br/> <span style={{ color: '#f59e0b' }}>Profesyonel Arıcılığa</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '30px', lineHeight: '1.6' }}>
            Bilgi ve tecrübe ile en kaliteli ana arı üretimi. Koloni yönetimi ve modern arıcılık çözümleriyle sektöre değer katıyoruz.
          </p>
        </div>
      </section>

      {/* Bloglar */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Arıcılık Blog & Teknik Notlar</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Admin panelinden eklenen güncel yazılar aşağıda listelenmektedir.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {blogs.map((blog, i) => (
            <div key={i} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#f59e0b', display: 'block', marginBottom: '10px' }}>{blog.date}</span>
                <h3 style={{ fontSize: '17px', lineHeight: '1.4', marginBottom: '12px', color: '#fff' }}>{blog.title}</h3>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.5', marginBottom: '20px' }}>{blog.excerpt}</p>
              </div>
              <span style={{ color: '#fff', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Devamını Oku &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#555', fontSize: '13px', borderTop: '1px solid #222', marginTop: '80px' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
