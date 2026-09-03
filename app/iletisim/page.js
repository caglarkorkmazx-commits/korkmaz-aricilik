'use client'

export default function IletisimPage() {
  const kisiler = [
    { name: 'Nihat Korkmaz', phone: '+90 535 707 7071', telLink: '+905357077071' },
    { name: 'Mustafa Korkmaz', phone: '+49 1512 3301 254', telLink: '+4915123301254' },
    { name: 'Tufan Korkmaz', phone: '+90 532 592 6869', telLink: '+905325926869' },
    { name: 'Çağlar Korkmaz', phone: '+90 535 846 82 99', telLink: '+905358468299' },
  ]

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 50px', boxSizing: 'border-box' }}>
        <span style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>İletişim</span>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginTop: '10px', marginBottom: '15px', wordBreak: 'break-word' }}>
          Bizimle İletişime Geçin
        </h1>
        <p style={{ color: '#888', fontSize: '15px' }}>
          Belfast ana arı siparişleri, paket arı talepleri ve Erzincan yayla balı fiyatları için doğrudan bize ulaşabilirsiniz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', maxWidth: '900px', margin: '0 auto', boxSizing: 'border-box' }}>
        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px', textAlign: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>📍</div>
          <h3 style={{ fontSize: '18px', color: '#f59e0b', margin: '0 0 8px 0' }}>Üretim Sahalarımız</h3>
          <p style={{ color: '#ccc', fontSize: '14px', margin: 0, lineHeight: '1.5' }}>
            Aydın / Nazilli <br />
            Erzincan / Çayırlı <br />
            Amasya
          </p>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px', textAlign: 'center', boxSizing: 'border-box' }}>
          <div style={{ fontSize: '30px', marginBottom: '10px' }}>📞</div>
          <h3 style={{ fontSize: '18px', color: '#f59e0b', margin: '0 0 15px 0' }}>Yetkililerimiz & İletişim</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {kisiler.map((kisi, index) => (
              <div key={index} style={{ borderBottom: index !== kisiler.length - 1 ? '1px solid #2a2a2a' : 'none', paddingBottom: index !== kisiler.length - 1 ? '12px' : '0' }}>
                <span style={{ display: 'block', color: '#eee', fontWeight: 'bold', fontSize: '14px', marginBottom: '2px' }}>{kisi.name}</span>
                <a href={`tel:${kisi.telLink}`} style={{ color: '#f59e0b', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px' }}>{kisi.phone}</a>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div style={{ textAlign: 'center', marginTop: '40px', boxSizing: 'border-box' }}>
        <a 
          href="https://wa.me/905358468299?text=Merhaba,%20Belfast%20ana%20arı%20satışı%20ve%20bal%20siparişi%20hakkında%20bilgi%20almak%20istiyorum." 
          target="_blank" 
          rel="noopener noreferrer" 
          style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: '#000', padding: '16px 36px', borderRadius: '8px', fontWeight: 'bold', textDecoration: 'none', fontSize: '16px', maxWidth: '100%', boxSizing: 'border-box' }}
        >
          💬 WhatsApp İle Doğrudan Yazın
        </a>
      </div>
    </main>
  )
}
