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
  const [isMobile, setIsMobile] = useState(false)

  // Mobil Ekran Kontrolü
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  // Supabase Verilerini Çekme (Hata Korumalı)
  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: bData } = await supabase.from('blogs').select('*').order('id', { ascending: false })
        const { data: hData } = await supabase.from('hero_photos').select('*').order('id', { ascending: false })

        if (bData && bData.length > 0) setBlogs(bData)
        if (hData && hData.length > 0) setHeroPhotos(hData)
      } catch (error) {
        console.error('Supabase veri çekme hatası:', error)
      }
    }

    fetchSupabaseData()
  }, [])

  // Slider Dinamik Limit Kontrolü
  const visibleCount = isMobile ? 1 : 3
  const maxIndex = Math.max(0, heroPhotos.length - visibleCount)

  // Ekran Değiştiğinde Index Taşmasını Önleme
  useEffect(() => {
    if (slideIndex > maxIndex) {
      setSlideIndex(maxIndex)
    }
  }, [maxIndex, slideIndex])

  // Otomatik Slider Akışı (Her 3.5 saniyede bir)
  useEffect(() => {
    if (heroPhotos.length <= visibleCount) return
    const timer = setInterval(() => {
      setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
    }, 3500)
    return () => clearInterval(timer)
  }, [heroPhotos.length, maxIndex, visibleCount])

  const nextSlide = () => {
    setSlideIndex((prev) => (prev >= maxIndex ? 0 : prev + 1))
  }

  const prevSlide = () => {
    setSlideIndex((prev) => (prev <= 0 ? maxIndex : prev - 1))
  }

  const navItems = [
    { name: 'Anasayfa', href: '#anasayfa' },
    { name: 'Hizmetlerimiz', href: '#hizmetlerimiz' },
    { name: 'Hakkımızda', href: '#hakkimizda' },
    { name: 'Galeri', href: '#galeri' },
    { name: 'İletişim', href: '#iletisim' },
  ]

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', scrollBehavior: 'smooth' }}>
      
      {/* Mobil ve Duyarlı Görünüm İçi Özel CSS */}
      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .header-container {
          padding: 20px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-title {
          font-size: 48px;
        }
        .slider-track {
          display: flex;
          gap: 20px;
          transition: transform 0.6s cubic-bezier(0.25, 1, 0.5, 1);
        }
        .slider-card {
          flex: 0 0 calc((100% - 40px) / 3);
          height: 240px;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 15px 20px;
            flex-direction: column;
            gap: 15px;
          }
          .nav-container {
            flex-wrap: wrap;
            justify-content: center;
            gap: 15px !important;
          }
          .hero-title {
            font-size: 30px !important;
          }
          .slider-card {
            flex: 0 0 100%;
            height: 220px;
          }
        }
      `}</style>

      {/* Header / Navigasyon */}
      <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #222' }}>
        <div className="header-container">
          <a href="#anasayfa" style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
            K<span style={{ color: '#fff', fontSize: '18px', marginLeft: '5px' }}>ORKMAZ</span>
          </a>
          
          <nav className="nav-container" style={{ display: 'flex', gap: '30px', fontSize: '14px', letterSpacing: '1px' }}>
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: item.name === 'Anasayfa' ? '#f59e0b' : '#aaa',
                  transition: '0.3s',
                  fontWeight: '500'
                }}
              >
                {item.name}
              </a>
            ))}
          </nav>

          <a href="/admin" style={{ backgroundColor: '#222', border: '1px solid #444', color: '#f59e0b', padding: '8px 16px', borderRadius: '6px', fontSize: '13px', textDecoration: 'none', fontWeight: '600' }}>
            Admin Paneli
          </a>
        </div>
      </header>

      {/* HERO SECTION + AKAN FOTOĞRAF SLIDER */}
      <section id="anasayfa" style={{ padding: '60px 20px 40px', textAlign: 'center', borderBottom: '1px solid #222', overflow: 'hidden' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto 40px' }}>
          <h1 className="hero-title" style={{ fontWeight: '800', marginBottom: '15px', lineHeight: '1.2' }}>
            Doğanın Kalbinden <br/> <span style={{ color: '#f59e0b' }}>Profesyonel Arıcılığa</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#aaa', lineHeight: '1.6', margin: 0 }}>
            Bilgi ve tecrübe ile en kaliteli ana arı üretimi. Koloni yönetimi ve modern arıcılık çözümleriyle sektöre değer katıyoruz.
          </p>
        </div>

        {/* SLIDER ALANI */}
        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          
          {/* Sol / Sağ Ok Butonları */}
          {heroPhotos.length > visibleCount && (
            <>
              <button 
                onClick={prevSlide} 
                aria-label="Önceki Fotoğraf"
                style={{ position: 'absolute', left: '5px', top: '45%', zIndex: 10, background: 'rgba(0,0,0,0.75)', color: '#f59e0b', border: '1px solid #444', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px' }}
              >
                &#10094;
              </button>
              <button 
                onClick={nextSlide} 
                aria-label="Sonraki Fotoğraf"
                style={{ position: 'absolute', right: '5px', top: '45%', zIndex: 10, background: 'rgba(0,0,0,0.75)', color: '#f59e0b', border: '1px solid #444', borderRadius: '50%', width: '40px', height: '40px', cursor: 'pointer', fontSize: '18px' }}
              >
                &#10095;
              </button>
            </>
          )}

          {/* Slider Penceresi */}
          <div style={{ overflow: 'hidden', width: '100%', borderRadius: '12px' }}>
            <div 
              className="slider-track"
              style={{
                transform: `translateX(-${slideIndex * (isMobile ? 100 : 33.333 + 0.66)}%)`
              }}
            >
              {heroPhotos.map((item) => (
                <div 
                  key={item.id} 
                  className="slider-card"
                  style={{
                    borderRadius: '12px',
                    backgroundImage: `url(${item.url})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    border: '1px solid #333',
                    position: 'relative',
                    overflow: 'hidden',
                    display: 'flex',
                    alignItems: 'flex-end'
                  }}
                >
                  <div style={{ width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '14px', textAlign: 'left' }}>
                    <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 'bold' }}>{item.title}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HİZMETLERİMİZ BÖLÜMÜ */}
      <section id="hizmetlerimiz" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px' }}>
        <div style={{ marginBottom: '35px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Hizmetlerimiz</h2>
          <p style={{ color: '#888', fontSize: '15px' }}>Sektördeki tecrübemiz ve yüksek kalite standartlarımızla sunduğumuz çözümler.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          
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

      {/* HAKKIMIZDA BÖLÜMÜ */}
      <section id="hakkimizda" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px', borderTop: '1px solid #222' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Hakkımızda</span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginTop: '8px', marginBottom: '20px' }}>Geleneksel Tecrübe, Modern Arıcılık</h2>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7', marginBottom: '15px' }}>
              Korkmaz Arıcılık olarak, yıllara dayanan saha tecrübemiz ve gezginci arıcılık anlayışımızla en yüksek verime sahip ırkların üretimini gerçekleştiriyoruz.
            </p>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7' }}>
              İlkbahardan sonbahara kadar Ege'den Doğu Anadolu'ya uzanan sahalarımızda hem yüksek kaliteli F1/F0 ana arı yetiştiriciliği yapıyor hem de saf bal üretimlerimizi sürdürüyoruz.
            </p>
          </div>
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold' }}>Neden Korkmaz Arıcılık?</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: '#ccc', fontSize: '14px' }}>
              <li>✓ <strong>Saf F0 Hatlar:</strong> Larva transferinde kontrollü damızlık kullanımı.</li>
              <li>✓ <strong>Gezginci Saha Tecrübesi:</strong> Aydın, Antalya, Amasya ve Erzincan lokasyonları.</li>
              <li>✓ <strong>Güvenli Nakliye:</strong> Türkiye'nin her yerine kargo ve şube teslimi.</li>
              <li>✓ <strong>Sipariş Güvencesi:</strong> Müşteri memnuniyeti odaklı üretim ve teslimat.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* GALERİ BÖLÜMÜ */}
      <section id="galeri" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px', borderTop: '1px solid #222' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Fotoğraf Galerisi</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Tesislerimizden ve saha çalışmalarımızdan görseller.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '15px', position: 'relative', overflow: 'hidden' }}>
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

      {/* BLOGLAR BÖLÜMÜ */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', borderTop: '1px solid #222' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Arıcılık Blog & Teknik Notlar</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Admin panelinden eklenen güncel yazılar.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '20px' }}>
          {blogs.map((blog, i) => (
            <div key={blog.id || i} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <span style={{ fontSize: '12px', color: '#f59e0b', display: 'block', marginBottom: '10px' }}>{blog.date}</span>
                <h3 style={{ fontSize: '17px', lineHeight: '1.4', marginBottom: '12px', color: '#fff' }}>{blog.title}</h3>
                <p style={{ fontSize: '13px', color: '#888', lineHeight: '1.5', marginBottom: '20px' }}>{blog.excerpt}</p>
              </div>
              <span style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600', cursor: 'pointer' }}>Devamını Oku &rarr;</span>
            </div>
          ))}
        </div>
      </section>

      {/* İLETİŞİM BÖLÜMÜ */}
      <section id="iletisim" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px', borderTop: '1px solid #222' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>İletişim</span>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginTop: '8px', marginBottom: '15px' }}>Sipariş ve Bilgi Alın</h2>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '35px' }}>Ana arı, kovanlı arı ve toptan bal siparişleriniz için bizimle doğrudan iletişime geçebilirsiniz.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>📍</div>
              <h4 style={{ fontSize: '14px', color: '#f59e0b', margin: '0 0 5px 0' }}>Saha Konumu</h4>
              <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>Aydın & Nazilli / Türkiye</p>
            </div>
            <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>📞</div>
              <h4 style={{ fontSize: '14px', color: '#f59e0b', margin: '0 0 5px 0' }}>Telefon</h4>
              <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>+90 (5XX) XXX XX XX</p>
            </div>
          </div>

          <a 
            href="https://wa.me/905000000000?text=Merhaba,%20ana%20ar%C4%B1%20ve%20arıc%C4%B1l%C4%B1k%20%C3%BCr%C3%BCnleri%20hakk%C4%B1nda%20bilgi%20almak%20istiyorum." 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#000', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px', transition: '0.2s' }}
          >
            💬 WhatsApp İle İletişime Geç
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#555', fontSize: '13px', borderTop: '1px solid #222', marginTop: '40px' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır.
      </footer>
    </div>
  )
}
