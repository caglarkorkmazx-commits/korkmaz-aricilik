export default function Home() {
  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header Alanı */}
      <header style={{ padding: '30px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222' }}>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', cursor: 'pointer' }}>
          K<span style={{color: '#fff', fontSize: '18px', marginLeft: '5px'}}>ORKMAZ</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '30px', fontSize: '14px', letterSpacing: '1px' }}>
          {['Anasayfa', 'Hakkımızda', 'Ana Arı Üretimi', 'Teknik Bilgiler', 'Galeri', 'İletişim'].map((item) => (
            <span key={item} style={{ cursor: 'pointer', transition: '0.3s', color: item === 'Anasayfa' ? '#f59e0b' : '#aaa' }}>
              {item}
            </span>
          ))}
        </nav>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Hero / Ana Karşılama Alanı */}
      <section style={{ position: 'relative', padding: '80px 20px', textAlign: 'center', overflow: 'hidden', borderBottom: '1px solid #222' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h1 style={{ fontSize: '52px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.2' }}>
            Doğanın Kalbinden <br/> <span style={{ color: '#f59e0b' }}>Profesyonel Arıcılığa</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#aaa', marginBottom: '30px', lineHeight: '1.6' }}>
            Bilgi ve tecrübe ile en kaliteli ana arı üretimi. Koloni yönetimi ve modern arıcılık çözümleriyle sektöre değer katıyoruz.
          </p>
          <button style={{ backgroundColor: '#f59e0b', color: '#000', padding: '14px 32px', border: 'none', borderRadius: '6px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
            Ürün ve Hizmetleri Keşfet
          </button>
        </div>
      </section>

      {/* YENİ: Fotoğraf Vitrini Bölümü (Siteyi dolduran galeri önizlemesi) */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
          <div>
            <h2 style={{ fontSize: '24px', fontWeight: 'bold', marginBottom: '8px' }}>Üretimden Kareler</h2>
            <p style={{ color: '#888', fontSize: '14px' }}>Arıcılık tesisimizden ve ana arı üretim süreçlerimizden görseller.</p>
          </div>
          <span style={{ color: '#f59e0b', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>Tüm Galeri &rarr;</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { title: 'Ana Arı Kafesi', sub: 'Özenle Seçilmiş Üretim' },
            { title: 'Kovan Kontrolü', sub: 'Düzenli Bakım ve Takip' },
            { title: 'Petek Dokusu', sub: 'Doğal ve Sağlıklı Gelişim' }
          ].map((photo, index) => (
            <div key={index} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', overflow: 'hidden', height: '220px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '20px', position: 'relative' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#222', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444', fontSize: '14px' }}>
                [ Görsel {index + 1} ]
              </div>
              <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.6)', padding: '10px 14px', borderRadius: '8px', backdropFilter: 'blur(4px)' }}>
                <h4 style={{ fontSize: '15px', color: '#fff', marginBottom: '4px' }}>{photo.title}</h4>
                <p style={{ fontSize: '12px', color: '#aaa', margin: 0 }}>{photo.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3'lü Bilgi Kartları Bölümü */}
      <section style={{ maxWidth: '1100px', margin: '0 auto 60px auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', padding: '0 20px' }}>
        {[
          { title: 'Ana Arı Üretimi', desc: 'Yüksek verimli ve sağlıklı ana arı yetiştirme yöntemleri.' },
          { title: 'Koloni Yönetimi', desc: 'Güçlü ve sürdürülebilir koloniler için modern teknikler.' },
          { title: 'Sezonluk Bakım', desc: 'Yıl boyu süren arı sağlığı ve besleme programları.' }
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '15px', border: '1px solid #333' }}>
            <h3 style={{ marginBottom: '12px', fontSize: '18px' }}>{card.title}</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px', lineHeight: '1.5' }}>{card.desc}</p>
            <span style={{ color: '#f59e0b', cursor: 'pointer', fontSize: '14px', fontWeight: '600' }}>Detaylar &rarr;</span>
          </div>
        ))}
      </section>

      {/* Footer */}
      <footer style={{ textAlign: 'center', padding: '40px', color: '#555', fontSize: '13px', borderTop: '1px solid #222' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
