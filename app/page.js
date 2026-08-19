export default function Home() {
  return (
    <div style={{ backgroundColor: '#121212', color: '#ffffff', minHeight: '100vh', fontFamily: 'sans-serif' }}>
      
      {/* Header Alanı */}
      <header style={{ padding: '30px 60px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #222' }}>
        <div style={{ fontSize: '28px', fontWeight: 'bold', color: '#f59e0b', cursor: 'pointer' }}>
          K<span style={{color: '#fff', fontSize: '18px', marginLeft: '5px'}}>ORKMAZ</span>
        </div>
        
        <nav style={{ display: 'flex', gap: '30px', fontSize: '14px', letterSpacing: '1px' }}>
          {['Anasayfa', 'Hakkımızda', 'Ana Arı Üretimi', 'Blog', 'Galeri', 'İletişim'].map((item) => (
            <span key={item} style={{ cursor: 'pointer', transition: '0.3s', color: item === 'Anasayfa' ? '#f59e0b' : '#aaa' }}>
              {item}
            </span>
          ))}
        </nav>
        <div style={{ width: '40px' }}></div>
      </header>

      {/* Hero / Ana Karşılama Alanı */}
      <section style={{ padding: '80px 20px', textAlign: 'center', borderBottom: '1px solid #222' }}>
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

      {/* 3'lü Bilgi Kartları */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '25px', padding: '0 20px' }}>
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

      {/* GALERİ BÖLÜMÜ */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Fotoğraf Galerisi</h2>
            <p style={{ color: '#888', fontSize: '14px' }}>Üretim tesisimizden, kovanlarımızdan ve sahadan kareler.</p>
          </div>
          <span style={{ color: '#f59e0b', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>Tümünü Gör &rarr;</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '15px' }}>
          {[
            { title: 'Ana Arı Kafesi', tag: 'Üretim' },
            { title: 'Kovan Bakımı', tag: 'Saha' },
            { title: 'Petek Dokusu', tag: 'Doğal' },
            { title: 'Koloni Kontrolü', tag: 'Teknik' }
          ].map((photo, index) => (
            <div key={index} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '12px', height: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '15px', position: 'relative', overflow: 'hidden' }}>
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: '#1e1e1e', zIndex: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#555', fontSize: '13px' }}>
                [ Fotoğraf {index + 1} ]
              </div>
              <div style={{ position: 'relative', zIndex: 1, background: 'rgba(0,0,0,0.7)', padding: '8px 12px', borderRadius: '6px' }}>
                <span style={{ fontSize: '10px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', display: 'block', marginBottom: '2px' }}>{photo.tag}</span>
                <h4 style={{ fontSize: '13px', color: '#fff', margin: 0 }}>{photo.title}</h4>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BLOG & TEKNİK NOTLAR BÖLÜMÜ */}
      <section style={{ maxWidth: '1100px', margin: '60px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '25px' }}>
          <div>
            <h2 style={{ fontSize: '26px', fontWeight: 'bold', marginBottom: '8px' }}>Arıcılık Blog & Teknik Notlar</h2>
            <p style={{ color: '#888', fontSize: '14px' }}>Verimli üretim ve koloni sağlığı üzerine güncel yazılar.</p>
          </div>
          <span style={{ color: '#f59e0b', cursor: 'pointer', fontSize: '14px', fontWeight: 'bold' }}>Tüm Yazılar &rarr;</span>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px' }}>
          {[
            { date: '19 Ağustos 2026', title: 'Ana Arı Kabul Ettirme Yöntemleri ve Püf Noktaları', excerpt: 'Kolonide yeni ana arının sorunsuz kabul edilmesi için dikkat edilmesi gereken kritik adımlar...' },
            { date: '14 Ağustos 2026', title: 'Sezon Geçişlerinde Koloni Beslemesi Nasıl Yapılmalı?', excerpt: 'Arıların kışa güçlü ve sağlıklı hazırlanması için sonbahar bakım ve besleme stratejileri...' },
            { date: '10 Ağustos 2026', title: 'Modern Arıcılıkta Kovan Yerleşimi ve Çevre Seçimi', excerpt: 'Doğru merada konumlandırılan kovanların bal verimine ve koloni gelişimine doğrudan etkileri...' }
          ].map((blog, i) => (
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
