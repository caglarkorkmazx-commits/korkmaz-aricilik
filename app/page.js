'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [blogs, setBlogs] = useState([
    { id: 1, date: '19 Ağustos 2026', title: 'Ana Arı Kabul Ettirme Yöntemleri ve Püf Noktaları', excerpt: 'Kolonide yeni ana arının sorunsuz kabul edilmesi için dikkat edilmesi gereken kritik adımlar...' },
    { id: 2, date: '14 Ağustos 2026', title: 'Sezon Geçişlerinde Koloni Beslemesi Nasıl Yapılmalı?', excerpt: 'Arıların kışa güçlü ve sağlıklı hazırlanması için sonbahar bakım ve besleme stratejileri...' }
  ])

  const [photos, setPhotos] = useState([
    { id: 1, title: 'Ana Arı Kafesi', tag: 'Üretim' },
    { id: 2, title: 'Kovan Bakımı', tag: 'Saha' },
    { id: 3, title: 'Petek Dokusu', tag: 'Doğal' },
    { id: 4, title: 'Koloni Kontrolü', tag: 'Teknik' }
  ])

  // Hero Slider Fotoğrafları
  const [heroPhotos, setHeroPhotos] = useState([
    { id: 1, title: 'Aydın Nazilli Sahası', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'F0 Larva Transferi', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Erzincan Çayırlı Hasadı', url: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Kovan Kontrolü & Islah', url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Paket Arı Hazırlığı', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80' }
  ])

  const [slideIndex, setSlideIndex] = useState(0)

  // Supabase Verilerini Çekme
  useEffect(() => {
    const fetchSupabaseData = async () => {
      const { data: bData } = await supabase.from('blogs').select('*').order('id', { ascending: false })
      const { data: hData } = await supabase.from('hero_photos').select('*').order('id', { ascending: false })

      if (bData && bData.length > 0) setBlogs(bData)
      if (hData && hData.length > 0) setHeroPhotos(hData)
    }

    fetchSupabaseData()
  }, [])

  // Otomatik Slider Akışı (Her 3.5 saniyede bir kayar)
  useEffect(() => {
    if (heroPhotos.length <= 3) return
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev + 1) % (heroPhotos.length - 2))
    }, 3500)
    return () => clearInterval(timer)
  }, [heroPhotos])

  const nextSlide = () => {
    if (slideIndex < heroPhotos.length - 3) setSlideIndex(slideIndex + 1)
    else setSlideIndex(0)
  }

  const prevSlide = () => {
    if (slideIndex > 0) setSlideIndex(slideIndex - 1)
    else setSlideIndex(heroPhotos.length - 3)
  }

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

      {/* HERO SECTION + 3'LÜ AKAN FOTOĞRAF SLIDER */}
      <section style={{ padding: '60px 20px 40px', textAlign: 'center', borderBottom: '1px solid #222', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <h1 style={{ fontSize: '48px', fontWeight: '800', marginBottom: '15px', lineHeight: '1.2' }}>
            Doğanın Kalbinden <br/> <span style={{ color: '#f59e0b' }}>Profesyonel Arıcılığa</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#aaa', lineHeight: '1.6', margin: 0 }}>
            Bilgi ve tecrübe ile en kaliteli ana arı üretimi. Koloni yönetimi ve modern arıcılık çözümleriyle sektöre değer katıyoruz.
          </p>
        </div>

        {/* 3'LÜ SLIDER ALANI */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          
          {/* Sol / Sağ Ok Butonları */}
          <button onClick={prevSlide} style={{ position: 'absolute', left: '-15px', top: '45%', zIndex: 10, background: 'rgba(0,0,0,0.7)', color: '#f59e0b', border: '1px solid #444', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px' }}>&#10094;</button>
          <button onClick={nextSlide} style={{ position: 'absolute', right: '-15px', top: '45%', zIndex: 10, background: 'rgba(0,0,0,0.7)', color: '#f59e0b', border: '1px solid #444', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px' }}>&#10095;</button>

          {/* Slider Penceresi */}
          <div style={{ overflow: 'hidden', width: '100%' }}>
            <div style={{
              display: 'flex',
              gap: '20px',
              transition: 'transform 0.6s ease-in-out',
              transform: `translateX(-${slideIndex * (100 / 3 + 1.33)}%)`
            }}>
              {heroPhotos.map((item) => (
                <div key={item.id} style={{
                  flex: '0 0 calc(33.333% - 14px)',
                  height: '220px',
                  borderRadius: '12px',
                  backgroundImage: `url(${item.url})`,
                  backgroundSize: 'cover',
                  backgroundPosition: 'center',
                  border: '1px solid #333',
                  position: 'relative',
                  overflow: 'hidden',
                  display: 'flex',
                  alignItems: 'flex-end'
                }}>
                  <div style={{ width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '12px', textAlign: 'left' }}>
                    <span style={{ fontSize: '12px', color: '#f59e0b', fontWeight: 'bold' }}>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HİZMETLERİMİZ BÖLÜMÜ */}
      <section style={{ maxWidth: '1200px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ marginBottom: '35px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Hizmetlerimiz</h2>
          <p style={{ color: '#888', fontSize: '15px' }}>Sektördeki tecrübemiz ve yüksek kalite standartlarımızla sunduğumuz çözümler.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '20px' }}>
          
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Ana Arı ( kraliçe ) Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              İlkbaharda Aydın-Nazilli, Antalya-Serik ve Amasya; yazın ise Erzincan Çayırlı’da üretim yapmaktayız. Nisan 20 civarı başlayan satışlarımız Ekim ayına kadar sürer. Tüm ana arılarımız F0 (saf) stoktan larva transferiyle F1 olarak üretilir. Tamamı doğuma geçmiş, olgunlaşmış analardır. Türkiye’nin tüm ilçelerine şubeye teslim gönderim sağlanır.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Damızlık Ana Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              F0 damızlık arılardan özel izole bölgelerde yetiştirilen yüksek kaliteli damızlık arı satışımız mevcuttur. Aynı zamanda işletmeler ve ıslah çalışmaları için F0 (saf) damızlık ana arı tedariki de sağlamaktayız.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Paket & Kovanlı Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Aydın-Nazilli, Antalya-Serik ve Amasya bölgesinde üretilen kovanlı veya paket arı satışımız vardır. Alım alt limiti yoktur. Şehirlere nakliye konusunda destek olunur. Satışlar önceden sipariş usulüyle Nisan-Mayıs aylarında gerçekleşir. Yüklü siparişler için önceden iletişime geçilmesi gerekmektedir.
            </p>
          </div>

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
            <div key={blog.id || i} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
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
