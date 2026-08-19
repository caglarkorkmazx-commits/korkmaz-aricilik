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
        <div style={{ width: '40px' }}></div> {/* Dengeleme için boşluk */}
      </header>

      {/* Hero / Fotoğraf Geçiş Alanı */}
      <section style={{ position: 'relative', height: '500px', display: 'flex', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
        {/* Buraya gelecekte bir background image slider gelecek */}
        <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#222', opacity: 0.6 }}></div>
        
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: '800px', padding: '0 20px' }}>
          <h1 style={{ fontSize: '56px', fontWeight: '800', marginBottom: '20px', lineHeight: '1.1' }}>
            Doğanın Kalbinden <br/> <span style={{ color: '#f59e0b' }}>Profesyonel Arıcılığa</span>
          </h1>
          <p style={{ fontSize: '18px', color: '#ddd', marginBottom: '30px' }}>Bilgi ve tecrübe ile en kaliteli ana arı üretimi.</p>
          <button style={{ backgroundColor: '#f59e0b', color: '#000', padding: '12px 30px', border: 'none', borderRadius: '5px', fontWeight: 'bold', cursor: 'pointer' }}>
            Keşfet
          </button>
        </div>
      </section>

      {/* Kartlar Bölümü (Koyu Tema Uyumlu) */}
      <section style={{ maxWidth: '1100px', margin: '-80px auto 60px auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', padding: '0 20px' }}>
        {[
          { title: 'Ana Arı Üretimi', desc: 'Yüksek verimli ve sağlıklı ana arı yetiştirme.' },
          { title: 'Koloni Yönetimi', desc: 'Sürdürülebilir koloniler için modern teknikler.' },
          { title: 'Sezonluk Bakım', desc: 'Yıl boyu süren profesyonel besleme.' }
        ].map((card, i) => (
          <div key={i} style={{ backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '15px', border: '1px solid #333', textAlign: 'center' }}>
            <h3 style={{ marginBottom: '15px' }}>{card.title}</h3>
            <p style={{ color: '#888', fontSize: '14px', marginBottom: '20px' }}>{card.desc}</p>
            <span style={{ color: '#f59e0b', cursor: 'pointer' }}>Detaylar &rarr;</span>
          </div>
        ))}
      </section>

      <footer style={{ textAlign: 'center', padding: '40px', color: '#444', fontSize: '12px' }}>
        &copy; 2026 Korkmaz Arıcılık. Tüm hakları saklıdır.
      </footer>
    </div>
  );
}
