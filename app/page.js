'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { supabase } from '../lib/supabase'

export default function Home() {
  const [blogs, setBlogs] = useState([])
  const [photos, setPhotos] = useState([])
  const [heroPhotos, setHeroPhotos] = useState([])
  
  const [isLoading, setIsLoading] = useState(true)

  const [slideIndex, setSlideIndex] = useState(0)
  const [isMobile, setIsMobile] = useState(false)

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
      } finally {
        setIsLoading(false)
      }
    }

    fetchSupabaseData()
  }, [])

  const visibleCount = isMobile ? 1 : 3
  const maxIndex = Math.max(0, heroPhotos.length > 0 ? heroPhotos.length - visibleCount : 0)

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
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif', overflowX: 'hidden', width: '100%', maxWidth: '100%', boxSizing: 'border-box' }}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <style jsx global>{`
        body {
          overflow-x: hidden !important;
          max-width: 100% !important;
          margin: 0;
          padding: 0;
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
        .skeleton-loader {
          background: linear-gradient(90deg, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%);
          background-size: 200% 100%;
          animation: loading 1.5s infinite;
          border-radius: 12px;
        }
        @keyframes loading {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }

        @media (max-width: 768px) {
          .hero-title {
            font-size: 28px !important;
          }
          .slider-card {
            flex: 0 0 100%;
            height: 220px;
          }
        }
      `}</style>

      {/* Hero Alanı */}
      <section style={{ padding: '60px 20px 40px', textAlign: 'center', borderBottom: '1px solid #222', overflow: 'hidden', boxSizing: 'border-box' }}>
        <div style={{ maxWidth: '850px', margin: '0 auto 40px' }}>
          <h1 className="hero-title" style={{ fontWeight: '800', marginBottom: '15px', lineHeight: '1.2', wordBreak: 'break-word' }}>
            Belfast Ana Arı Satışı & <br/> <span style={{ color: '#f59e0b' }}>Organik Doğal Bal Üretimi</span>
          </h1>
          <p style={{ fontSize: '16px', color: '#aaa', lineHeight: '1.6', margin: 0 }}>
            Aydın ve Erzincan sahalarımızda yüksek verimli <strong>Belfast ana arı satışı</strong>, <strong>paket arı satın al</strong> imkanları ve katkısız <strong>Erzincan bal satışı</strong> ile Türkiye’nin her yerine güvenli gönderim sağlıyoruz.
          </p>
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', position: 'relative' }}>
          {heroPhotos.length > visibleCount && !isLoading && (
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
            {isLoading ? (
              <div className="skeleton-loader" style={{ height: isMobile ? '220px' : '240px', width: '100%' }}></div>
            ) : (
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
                      backgroundPosition: 'top center',
                      border: '1px solid #333',
                      position: 'relative',
                      overflow: 'hidden',
                      display: 'flex',
                      alignItems: 'flex-end',
                      boxSizing: 'border-box'
                    }}
                  >
                    <div style={{ width: '100%', background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', padding: '14px', textAlign: 'left', boxSizing: 'border-box' }}>
                      <span style={{ fontSize: '13px', color: '#f59e0b', fontWeight: 'bold' }}>{item.title}</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Hizmetler Önizleme */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px 40px', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '35px', textAlign: 'center' }}>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginBottom: '10px', wordBreak: 'break-word' }}>Hizmetlerimiz ve Ürünlerimiz</h2>
          <p style={{ color: '#888', fontSize: '15px' }}>Belfast ana arı yetiştiriciliği, paket arı satışı ve Erzincan yaylalarından doğal arı ürünleri.</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '20px' }}>
          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Belfast Ana Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              İlkbaharda Aydın-Nazilli, Antalya-Serik ve Amasya; yazın ise Erzincan Çayırlı’da yüksek performanslı <strong>Belfast ana arı satışı</strong> yapılmaktadır.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Damızlık Arı & Arı Satın Al
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Kolonisini güçlendirmek isteyen arıcılar için F0 damızlık hatlar ve hazır koloni çözümleri sunuyoruz.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Paket & Kovanlı Arı Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Aydın ve Amasya bölgesinde üretilen 5, 7 ve 9 çıtalı kovanlı arı veya <strong>paket arı satışı</strong> seçeneklerimiz mevcuttur.
            </p>
          </div>

          <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '25px', borderRadius: '12px', display: 'flex', flexDirection: 'column', boxSizing: 'border-box' }}>
            <h3 style={{ fontSize: '18px', color: '#f59e0b', marginBottom: '15px', fontWeight: 'bold', borderBottom: '1px solid #2b2b2b', paddingBottom: '10px' }}>
              Erzincan Bal Satışı
            </h3>
            <p style={{ color: '#aaa', fontSize: '13px', lineHeight: '1.6', margin: 0 }}>
              Erzincan Çayırlı yüksek yaylalarından elde ettiğimiz <strong>organik doğal bal</strong> çeşitlerimizi Eylül ayı itibarıyla sunuyoruz.
            </p>
          </div>
        </div>
      </section>

      {/* Bloglar Önizleme */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', borderTop: '1px solid #222', boxSizing: 'border-box' }}>
        <div style={{ marginBottom: '25px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px', wordBreak: 'break-word' }}>Arıcılık Blog & Rehber</h2>
            <p style={{ color: '#888', fontSize: '14px', margin: 0 }}>Belfast ana arı bakımı ve koloni yönetimi üzerine teknik notlar.</p>
          </div>
          <Link href="/blog" style={{ color: '#f59e0b', textDecoration: 'none', fontSize: '14px', fontWeight: 'bold' }}>
            Tüm Yazıları Gör &rarr;
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '24px' }}>
          {isLoading ? (
            [1, 2, 3].map(i => (
              <div key={i} className="skeleton-loader" style={{ height: '360px', width: '100%' }}></div>
            ))
          ) : (
            blogs.slice(0, 3).map((blog, i) => (
              <article 
                key={blog.id || i} 
                style={{ 
                  backgroundColor: '#1a1a1a', 
                  border: '1px solid #333', 
                  borderRadius: '12px', 
                  overflow: 'hidden', 
                  display: 'flex', 
                  flexDirection: 'column', 
                  justifyContent: 'space-between',
                  boxSizing: 'border-box'
                }}
              >
                {blog.image_url && (
                  <img 
                    src={blog.image_url} 
                    alt={blog.title} 
                    style={{ width: '100%', height: '180px', objectFit: 'cover' }} 
                  />
                )}
                <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
                  <div>
                    <span style={{ fontSize: '12px', color: '#f59e0b', display: 'block', marginBottom: '8px' }}>{blog.date}</span>
                    <h3 style={{ fontSize: '17px', lineHeight: '1.4', marginBottom: '10px', color: '#fff', fontWeight: 'bold', wordBreak: 'break-word' }}>{blog.title}</h3>
                    <p style={{ 
                      fontSize: '13px', 
                      color: '#888', 
                      lineHeight: '1.6', 
                      marginBottom: '20px',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      wordBreak: 'break-word'
                    }}>
                      {blog.excerpt}
                    </p>
                  </div>
                  <Link 
                    href={`/blog/${blog.id}`}
                    style={{ color: '#f59e0b', fontSize: '13px', fontWeight: '600', textDecoration: 'none' }}
                  >
                    Devamını Oku &rarr;
                  </Link>
                </div>
              </article>
            ))
          )}
        </div>
      </section>

      {/* İletişim */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '80px 20px', borderTop: '1px solid #222', boxSizing: 'border-box' }}>
        <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
          <span style={{ fontSize: '12px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>İletişim</span>
          <h2 style={{ fontSize: '32px', fontWeight: 'bold', color: '#fff', marginTop: '8px', marginBottom: '15px', wordBreak: 'break-word' }}>Sipariş ve Bilgi Alın</h2>
          <p style={{ color: '#888', fontSize: '15px', marginBottom: '35px' }}>Belfast ana arı satışı, paket arı siparişi ve organik Erzincan balı fiyatları için doğrudan ulaşabilirsiniz.</p>
          
          <a 
            href="https://wa.me/905358468299?text=Merhaba,%20Belfast%20ana%20arı%20satışı,%20paket%20arı%20ve%20organik%20bal%20siparişi%20hakkında%20bilgi%20almak%20istiyorum." 
            target="_blank" 
            rel="noopener noreferrer" 
            style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#000', padding: '14px 32px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '15px', maxWidth: '100%', boxSizing: 'border-box' }}
          >
            💬 WhatsApp İle İletişime Geç
          </a>
        </div>
      </section>

      <footer style={{ textAlign: 'center', padding: '40px 20px', color: '#555', fontSize: '13px', borderTop: '1px solid #222', marginTop: '40px', boxSizing: 'border-box' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır. | Belfast Ana Arı & Organik Bal Satışı
      </footer>
    </div>
  )
}
