'use client'
import { useState, useEffect } from 'react'

export default function Home() {
  const [blogs, setBlogs] = useState([
    { date: '19 Ağustos 2026', title: 'Ana Arı Kabul Ettirme Yöntemleri ve Püf Noktaları', excerpt: 'Kolonide yeni ana arının sorunsuz kabul edilmesi için dikkat edilmesi gereken kritik adımlar...' },
    { date: '14 Ağustos 2026', title: 'Sezon Geçişlerinde Koloni Beslemesi Nasıl Yapılmalı?', excerpt: 'Arıların kışa güçlü ve sağlıklı hazırlanması için sonbahar bakım ve besleme stratejileri...' }
  ])

  const [photos, setPhotos] = useState([
    { id: 1, title: 'Ana Arı Kafesi', tag: 'Üretim' },
    { id: 2, title: 'Kovan Bakımı', tag: 'Saha' },
    { id: 3, title: 'Petek Dokusu', tag: 'Doğal' },
    { id: 4, title: 'Koloni Kontrolü', tag: 'Teknik' }
  ])

  useEffect(() => {
    const savedBlogs = JSON.parse(localStorage.getItem('korkmaz_blogs'))
    if (savedBlogs && savedBlogs.length > 0) {
      setBlogs(prev => [...savedBlogs, ...prev])
    }

    const savedPhotos = JSON.parse(localStorage.getItem('korkmaz_photos'))
    if (savedPhotos && savedPhotos.length > 0) {
      setPhotos(savedPhotos)
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
          {['Anasayfa', 'Hizmetlerimiz', 'Hakkımızda', 'Galeri', 'İletişim'].map((item) => (
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

      {/* HİZMETLERİMİZ BÖLÜMÜ */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '35px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Hizmetlerimiz</h2>
          <p style={{ color: '#888', fontSize: '15px' }}>Sektördeki tecrübemiz ve yüksek kalite standartlarımızla sunduğumuz çözümler.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          
          {/* Kutu 1 */}
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Ana Arı ( Kraliçe ) Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              İlkbaharda Aydın-Nazilli, Antalya-Serik ve Amasya; yazın ise Erzincan Çayırlı’da üretim yapmaktayız. Nisan 20 civarı başlayan satışlarımız Ekim ayına kadar sürer. Tüm ana arılarımız F0 (saf) stoktan larva transferiyle F1 olarak üretilir. Tamamı doğuma geçmiş, olgunlaşmış analardır. Türkiye’nin tüm ilçelerine şubeye teslim gönderim sağlanır.
            </p>
          </div>

          {/* Kutu 2 */}
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Damızlık Ana Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              F0 damızlık arılardan özel izole bölgelerde yetiştirilen yüksek kaliteli damızlık arı satışımız mevcuttur. Aynı zamanda işletmeler ve ıslah çalışmaları için F0 (saf) damızlık ana arı tedariki de sağlamaktayız.
            </p>
          </div>

          {/* Kutu 3 */}
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Paket & Kovanlı Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Aydın-Nazilli, Antalya-Serik ve Amasya bölgesinde üretilen kovanlı veya paket arı satışımız vardır. Alım alt limiti yoktur. Şehirlere nakliye konusunda destek olunur. Satışlar önceden sipariş usulüyle Nisan-Mayıs aylarında gerçekleşir. Yüklü siparişler için önceden iletişime geçilmesi gerekmektedir.
            </p>
          </div>

          {/* Kutu 4 */}
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Bal Üretimi
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Ana arı üretiminin doğal bir parçası olan yüksek kaliteli bal üretimimiz mevcuttur. Sahada elde ettiğimiz doğal ve katkısız ballarımızı genellikle Eylül ayı itibarıyla toptan olarak satışa sunmaktayız.
            </p>
          </div>

        </div>
      </section>

      {/* Galeri Bölümü */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Fotoğraf Galerisi</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Tesislerimizden ve saha çalışmalarımızdan görseller.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', height: '160px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '15px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#1e1e1e', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '12px' }}>
                [ Görsel ]
              </div>
              <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.75)', padding: '8px 12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '10px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>{photo.tag}</span>
                <h4 style={{ fontSize: '13px', color: '#fff', margin: 0 }}>{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bloglar Bölümü */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Arıcılık Blog & Teknik Notlar</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Admin panelinden eklenen güncel yazılar.</p>
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
