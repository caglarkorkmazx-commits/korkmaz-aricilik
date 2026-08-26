'use client'

export default function IletisimPage() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px' }}>
        <span style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>İletişim</span>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginTop: '10px', marginBottom: '15px' }}>
          Bizimle İletişime Geçin
        </h1>
        <p style={{ color: '#888', fontSize: '15px' }}>
          Belfast ana arı siparişleri, paket arı talepleri ve Erzincan yayla balı fiyatları için doğrudan bize ulaşabilirsiniz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '900px', margin: '0 auto' }}>
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>📍</div>
          <h3 style={{ fontSize: '18px', color: '#f59e0b', margin: '0 0 8px 0' }}>Üretim Sahalarımız</h3>
          <p style={{ color: '#ccc', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
            Aydın / Nazilli <br />
            Erzincan / Çayırlı
          </p>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px', textAlign: 'center' }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>📞</div>
          <h3 style={{ fontSize: '18px', color: '#f59e0b', margin: '0 0 8px 0' }}>Telefon</h3>
          <p style={{ color: '#ccc', fontSize: '14px', margin: 0 }}>
            <a href="tel:+905358468299" style={{ color: '#fff', textDecoration: 'none', fontWeight: 'bold' }}>+90 535 846 82 99</a>
          </p>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px' }}>
        <a 
          href="https://wa.me/905358468299?text=Merhaba,%20Belfast%20ana%20arı%20satışı%20ve%20bal%20siparişi%20hakkında%20bilgi%20almak%20istiyorum." 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#000', padding: '16px 36px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px' }}
        >
          💬 WhatsApp İle Doğrudan Yazın
        </a>
      </div>
    </main>
  )
}
