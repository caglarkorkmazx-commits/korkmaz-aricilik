'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [blogs, setBlogs] = useState([
    { id: 1, date: '19 Ağustos 2026', title: 'Belfast Ana Arı Kabul Ettirme Yöntemleri ve Püf Noktaları', excerpt: 'Kolonide yeni Belfast ana arının sorunsuz kabul edilmesi için dikkat edilmesi gereken kritik adımlar ve bakımlar...' },
    { id: 2, date: '14 Ağustos 2026', title: 'Erzincan Yayla Balı ve Organik Doğal Bal Hasadı', excerpt: 'Erzincan Çayırlı bölgesinde üretilen organik doğal bal özelliklerimiz ve sezon geçişlerinde koloni besleme stratejileri...' }
  ])

  const [photos, setPhotos] = useState([
    { id: 1, title: 'Belfast Ana Arı Üretimi', tag: 'Üretim' },
    { id: 2, title: 'Kovan Bakımı & Arı Satışı', tag: 'Saha' },
    { id: 3, title: 'Organik Petek Dokusu', tag: 'Doğal' },
    { id: 4, title: 'Erzincan Bal Hasadı', tag: 'Teknik' }
  ])

  const [heroPhotos, setHeroPhotos] = useState([
    { id: 1, title: 'Aydın Nazilli Arıcılık Sahası', url: 'https://images.unsplash.com/photo-1587049352847-4a222e784d38?auto=format&fit=crop&w=600&q=80' },
    { id: 2, title: 'Belfast & Karniyol F0 Larva Transferi', url: 'https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?auto=format&fit=crop&w=600&q=80' },
    { id: 3, title: 'Erzincan Çayırlı Bal Satışı & Hasat', url: 'https://images.unsplash.com/photo-1473081556163-2a17de81fc97?auto=format&fit=crop&w=600&q=80' },
    { id: 4, title: 'Kovan Kontrolü & Damızlık Arı', url: 'https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80' },
    { id: 5, title: 'Paket Arı Satın Al & Hazırlık', url: 'https://images.unsplash.com/photo-1527661591475-527312dd65f5?auto=format&fit=crop&w=600&q=80' }
  ])

  const [slideIndex, setSlideIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  const [selectedBlog, setSelectedBlog] = useState(null)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const fetchSupabaseData = async () => {
      try {
        const { data: bData } = await supabase.from('blogs').select('*').order('id', { ascending: false })
        const { data: hData } = await supabase.from('hero_photos').select('*').order('id', { ascending: false })
        const { data: pData } = await supabase.from('photos').select('*').order('id', { ascending: false })

        if (bData && bData.length > 0) setBlogs(bData)
        if (hData && hData.length > 0) setHeroPhotos(hData)
        if (pData && pData.length > 0) setPhotos(pData)
      } catch (error) {
        console.error('Supabase veri çekme hatası:', error)
      }
    }

    fetchSupabaseData()
  }, [])

  const visibleCount = isMobile ? 1 : 3
  const maxIndex = Math.max(0, heroPhotos.length - visibleCount)

  useEffect(() => {
    if (slideIndex > maxIndex) {
      setSlideIndex(maxIndex)
    }
  }, [maxIndex, slideIndex])

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
    { name: 'Bloglar', href: '#blog' },
    { name: 'İletişim', href: '#iletisim' },
  ]

  const schemaData = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Korkmaz Arıcılık - Belfast Ana Arı & Bal Satışı",
    "description": "Belfast ana arı satışı, organik doğal bal, Erzincan bal satışı ve paket arı satın al hizmetleri. Aydın ve Erzincan sahalarımızla hizmetinizdeyiz.",
    "telephone": "+905358468299",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Aydın / Erzincan",
      "addressCountry": "TR"
    },
    "keywords": "belfast ana arı satışı, organik doğal bal, erzincan bal satışı, arı satın al, damızlık ana arı, paket arı satışı"
  }

  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', scrollBehavior: 'smooth' }}>
      
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <style jsx global>{`
        html { scroll-behavior: smooth; }
        .header-container {
          padding: 20px 60px;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .hero-title {
          font-size: 46px;
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
            font-size: 28px !important;
          }
          .slider-card {
            flex: 0 0 100%;
            height: 220px;
          }
        }
      `}</style>

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
        </div>
      </header>

      <section id="anasayfa" style={{ padding: '60px 20px 40px', textAlign: 'center', borderBottom: '1px solid #222', overflow: 'hidden' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto 40px' }}>
          <h1 className="hero-title" style={{ fontWeight: '800', marginBottom: '15px', lineHeight: '1.2' }}>
            Belfast Ana Arı Satışı & <br/> <span style={{ color: '#f59e0b' }}>Organik Doğal Bal Üretimi</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#aaa', lineHeight: '1.6', margin: 0 }}>
            Aydın ve Erzincan sahalarımızda yüksek verimli <strong>Belfast ana arı satışı</strong>, <strong>paket arı satın al</strong> imkanları ve katkısız <strong>Erzincan bal satışı</strong> ile Türkiye’nin her yerine güvenli gönderim sağlıyoruz.
          </p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
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

      <section id="hizmetlerimiz" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px' }}>
        <div style={{ marginBottom: '35px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '10px' }}>Hizmetlerimiz ve Ürünlerimiz</h2>
          <p style={{ color: '#888', fontSize: '15px' }}>Belfast ana arı yetiştiriciliği, paket arı satışı ve Erzincan yaylalarından doğal arı ürünleri.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Belfast Ana Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              İlkbaharda Aydın-Nazilli, Antalya-Serik ve Amasya; yazın ise Erzincan Çayırlı’da yüksek performanslı <strong>Belfast ana arı satışı</strong> yapılmaktadır. F0 saf stoktan üretilen F1 Belfast analarımız yumurta verimi ve sakinliği ile öne çıkar. Türkiye’nin tüm ilçelerine kargo teslimi yapılır.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Damızlık Arı & Arı Satın Al
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Kolonisini güçlendirmek isteyen arıcılar için F0 damızlık hatlar ve hazır koloni çözümleri sunuyoruz. Güvenilir kanallardan hızlıca <strong>arı satın al</strong> taleplerinizi Nisan-Mayıs döneminde ön sipariş ile karşılıyoruz.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Paket & Kovanlı Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Aydın ve Amasya bölgesinde üretilen 5, 7 ve 9 çıtalı kovanlı arı veya <strong>paket arı satışı</strong> seçeneklerimiz mevcuttur. Şehirlere nakliye desteğimizle toplu arı alımlarında avantaj sağlıyoruz.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Erzincan Bal Satışı (Organik Doğal Bal)
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Erzincan Çayırlı yüksek yaylalarından elde ettiğimiz <strong>organik doğal bal</strong> çeşitlerimizi Eylül ayı itibarıyla süzme ve petek olarak sunuyoruz. Toptan ve perakende <strong>Erzincan bal satışı</strong> için hemen iletişime geçebilirsiniz.
            </p>
          </div>
        </div>
      </section>

      <section id="hakkimizda" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px', borderTop: '1px solid #222' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '40px', alignItems: 'center' }}>
          <div>
            <span style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Hakkımızda</span>
            <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginTop: '8px', marginBottom: '20px' }}>Geleneksel Tecrübe, Modern Arıcılık</h2>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7', marginBottom: '15px' }}>
              Korkmaz Arıcılık olarak, yıllara dayanan gezginci arıcılık tecrübemizle en yüksek verimli <strong>Belfast ana arı</strong> üretimi yapıyoruz.
            </p>
            <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.7' }}>
              Ege'den Doğu Anadolu'ya uzanan sahalarımızda hem yüksek kaliteli F1/F0 damızlık yetiştiriyor hem de <strong>organik doğal bal</strong> üretimi ile arıcılık sektörüne katkı sağlıyoruz.
            </p>
          </div>
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold' }}>Neden Korkmaz Arıcılık?</h3>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '12px', color: '#ccc', fontSize: '14px' }}>
              <li>✓ <strong>Saf Belfast F0 Hatlar:</strong> Larva transferinde yüksek standartlı damızlık kullanımı.</li>
              <li>✓ <strong>Gezginci Saha Tecrübesi:</strong> Aydın, Antalya, Amasya ve Erzincan yaylaları.</li>
              <li>✓ <strong>Organik Doğal Bal Güvencesi:</strong> Katkısız Erzincan balı üretimi.</li>
              <li>✓ <strong>Güvenli Nakliye:</strong> Türkiye'nin her yerine özel şube teslim kargo.</li>
            </ul>
          </div>
        </div>
      </section>

      <section id="galeri" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px', borderTop: '1px solid #222' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Fotoğraf Galerisi</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Tesislerimizden, ana arı üretim alanlarımızdan ve bal hasadından görseller.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '15px' }}>
          {photos.map((photo) => (
            <div key={photo.id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '15px', position: 'relative', overflow: 'hidden' }}>
              {photo.url ? (
                <img src={photo.url} alt={photo.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }} />
              ) : (
                <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#1e1e1e', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '12px' }}>
                  [ Görsel ]
                </div>
              )}
              <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.75)', padding: '8px 12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '10px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>{photo.tag}</span>
                <h4 style={{ fontSize: '13px', color: '#fff', margin: 0 }}>{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section id="blog" style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', borderTop: '1px solid #222' }}>
        <div style={{ marginBottom: '25px' }}>
          <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Arıcılık Blog & Rehber</h2>
          <p style={{ color: '#888', fontSize: '14px' }}>Belfast ana arı bakımı ve koloni yönetimi üzerine teknik notlar.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {blogs.map((blog, i) => (
            <article 
              key={blog.id || i} 
              style={{ 
                backgroundColor: '#1a1a1a', 
                border: '1px solid #333', 
                borderRadius: '12px', 
                overflow: 'hidden', 
                display: 'flex', 
                flexDirection: 'column', 
                justify: 'space-between' 
              }}
            >
              {blog.image_url && (
                <img 
                  src={blog.image_url} 
                  alt={blog.title} 
                  style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                />
              )}
              <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: '12px', color: '#f59e0b', display: 'block', marginBottom: '8px' }}>{blog.date}</span>
                  <h3 style={{ fontSize: '17px', lineHeight: '1.4', marginBottom: '10px', color: '#fff', fontWeight: 'bold' }}>{blog.title}</h3>
                  <p style={{ 
                    fontSize: '13px', 
                    color: '#888', 
                    lineHeight: '1.6', 
                    marginBottom: '20px',
                    display: '-webkit-box',
                    WebkitLineClamp: 3,
                    WebkitBoxOrient: 'vertical',
                    overflow: 'hidden'
                  }}>
                    {blog.excerpt}
                  </p>
                </div>
                <button
                  onClick={() => setSelectedBlog(blog)}
                  style={{ background: 'none', border: 'none', color: '#f59e0b', fontSize: '13px', fontWeight: '600', cursor: 'pointer', textAlign: 'left', padding: 0 }}
                >
                  Devamını Oku &rarr;
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {selectedBlog && (
        <div style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.85)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: '20px' }}>
          <div style={{ backgroundColor: '#1e1e1e', maxWidth: '700px', width: '100%', maxHeight: '85vh', borderRadius: '12px', overflowY: 'auto', border: '1px solid #333', padding: '30px', position: 'relative' }}>
            <button
              onClick={() => setSelectedBlog(null)}
              style={{ position: 'absolute', top: '15px', right: '15px', background: '#333', color: '#fff', border: 'none', borderRadius: '50%', width: '32px', height: '32px', cursor: 'pointer', fontSize: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
            >
              ✕
            </button>

            {selectedBlog.image_url && (
              <img src={selectedBlog.image_url} alt={selectedBlog.title} style={{ width: '100%', maxHeight: '320px', objectFit: 'cover', borderRadius: '8px', marginBottom: '20px' }} />
            )}
            <span style={{ fontSize: '12px', color: '#f59e0b', display: 'block', marginBottom: '8px' }}>{selectedBlog.date}</span>
            <h2 style={{ fontSize: '22px', color: '#fff', marginBottom: '20px', lineHeight: '1.4' }}>{selectedBlog.title}</h2>
            <div style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.8', whiteSpace: 'pre-line' }}>
              {selectedBlog.excerpt}
            </div>
          </div>
        </div>
      )}

      <section id="iletisim" style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px', borderTop: '1px solid #222' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>İletişim</span>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginTop: '8px', marginBottom: '15px' }}>Sipariş ve Bilgi Alın</h2>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '35px' }}>Belfast ana arı satışı, paket arı siparişi ve organik Erzincan balı fiyatları için doğrudan ulaşabilirsiniz.</p>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '30px' }}>
            <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>📍</div>
              <h4 style={{ fontSize: '14px', color: '#f59e0b', margin: '0 0 5px 0' }}>Üretim Sahaları</h4>
              <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>Aydın & Nazilli / Erzincan Çayırlı</p>
            </div>
            <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '20px', borderRadius: '10px' }}>
              <div style={{ fontSize: '20px', marginBottom: '5px' }}>📞</div>
              <h4 style={{ fontSize: '14px', color: '#f59e0b', margin: '0 0 5px 0' }}>Telefon & WhatsApp</h4>
              <p style={{ fontSize: '13px', color: '#ccc', margin: 0 }}>
                <a href="tel:+905358468299" style={{ color: '#ccc', textDecoration: 'none' }}>+90 535 846 82 99</a>
              </p>
            </div>
          </div>

          <a 
            href="https://wa.me/905358468299?text=Merhaba,%20Belfast%20ana%20arı%20satışı,%20paket%20arı%20ve%20organik%20bal%20siparişi%20hakkında%20bilgi%20almak%20istiyorum." 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#000', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px', transition: '0.2s' }}
          >
            💬 WhatsApp İle İletişime Geç
          </a>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#555', fontSize: '13px', borderTop: '1px solid #222', marginTop: '40px' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır. | Belfast Ana Arı & Organik Bal Satışı
      </footer>
    </div>
  )
}
