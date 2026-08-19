export default function Home() {
  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Üst Sarı Çizgi ve Header */}
      <div style={{ backgroundColor: '#f59e0b', height: '6px', width: '100%' }}></div>
      
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '20px 40px', borderBottom: '1px solid #222' }}>
        <div style={{ fontSize: '24px', fontWeight: 'bold', background: '#ffffff', color: '#121212', padding: '6px 12px', borderRadius: '4px' }}>
          K
        </div>
        <nav style={{ display: 'flex', gap: '24px', fontSize: '14px', color: '#ccc' }}>
          <span style={{ color: '#fff', cursor: 'pointer' }}>Anasayfa</span>
          <span style={{ cursor: 'pointer' }}>Hakkımızda</span>
          <span style={{ cursor: 'pointer' }}>Ana Arı Üretimi</span>
          <span style={{ cursor: 'pointer' }}>Teknik Bilgiler</span>
          <span style={{ cursor: 'pointer' }}>Galeri</span>
          <span style={{ cursor: 'pointer' }}>İletişim</span>
        </nav>
      </header>

      {/* Hero Bölümü */}
      <section style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '60px 40px', maxWidth: '1200px', margin: '0 auto', gap: '40px' }}>
        <div style={{ flex: 1 }}>
          <h1 style={{ fontSize: '42px', lineHeight: '1.2', marginBottom: '20px', fontWeight: 'bold' }}>
            Korkmaz Arıcılık: Bilgi, Tecrübe ve Profesyonel Ana Arı Üretimi.
          </h1>
          <p style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.5' }}>
            Koloni yönetimi, modern arıcılık teknikleri ve yüksek verimli ana arı üretimiyle sektöre değer katıyoruz.
          </p>
        </div>
        <div style={{ flex: 1, backgroundColor: '#1e1e1e', padding: '20px', borderRadius: '12px', border: '1px solid #333', textAlign: 'center' }}>
          <div style={{ backgroundColor: '#333', height: '220px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#777', marginBottom: '15px' }}>
            [ Arıcılık & Petek Görseli ]
          </div>
          <p style={{ fontSize: '14px', color: '#f59e0b', fontWeight: '600' }}>Profesyonel Arıcılık Çözümleri</p>
        </div>
      </section>

      {/* Kartlar Bölümü */}
      <section style={{ maxWidth: '1200px', margin: '0 auto', padding: '20px 40px 60px 40px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
        
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '10px' }}>Ana Arı Üretimi</h3>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px', lineHeight: '1.4' }}>Yüksek verimli ve sağlıklı ana arı yetiştirme yöntemlerimiz.</p>
          <span style={{ color: '#f59e0b', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Detaylı Bilgi &rarr;</span>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '10px' }}>Koloni Yönetimi</h3>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px', lineHeight: '1.4' }}>Güçlü ve sürdürülebilir koloniler için teknikler.</p>
          <span style={{ color: '#f59e0b', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Detaylı Bilgi &rarr;</span>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #2a2a2a', padding: '24px', borderRadius: '12px' }}>
          <h3 style={{ color: '#fff', fontSize: '18px', marginBottom: '10px' }}>Sezonluk Bakım</h3>
          <p style={{ color: '#aaa', fontSize: '14px', marginBottom: '20px', lineHeight: '1.4' }}>Yıl boyu arı sağlığı ve besleme programları.</p>
          <span style={{ color: '#f59e0b', fontSize: '14px', fontWeight: 'bold', cursor: 'pointer' }}>Detaylı Bilgi &rarr;</span>
        </div>

      </section>

      {/* Footer */}
      <footer style={{ borderTop: '1px solid #222', textAlign: 'center', padding: '30px', color: '#777', fontSize: '13px' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır.
      </footer>

    </div>
  );
}
