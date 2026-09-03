'use client'

export default function HakkimizdaPage() {
  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '50px', alignItems: 'center', boxSizing: 'border-box' }}>
        <div style={{ boxSizing: 'border-box' }}>
          <span style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Hakkımızda</span>
          <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginTop: '10px', marginBottom: '20px', wordBreak: 'break-word' }}>
            Geleneksel Tecrübe, Modern Arıcılık
          </h1>
          <p style={{ color: '#ccc', fontSize: '15px', lineHeight: '1.8', marginBottom: '15px' }}>
            <strong>Korkmaz Arıcılık</strong> olarak yıllardır sürdürdüğümüz gezginci arıcılık faaliyetlerimizle Türkiye'nin farklı iklim ve floralarında yüksek kaliteli üretim yapıyoruz.
          </p>
          <p style={{ color: '#aaa', fontSize: '14px', lineHeight: '1.8', marginBottom: '15px' }}>
            İlkbaharda Aydın-Nazilli, Antalya ve Amasya sahalarımızda başlayan sezonumuzu, yaz aylarında Erzincan Çayırlı yaylalarında sürdürüyoruz. Ana hedefimiz; koloni verimliliğini artıran uysal ve yüksek yumurtlama kapasitesine sahip <strong>Belfast F1 ana arılar ve koloniler</strong> yetiştirmek ve yüksek yaylalarda ürettiğimiz balı tüketicilerimizle buluşturmaktır.
          </p>
        </div>

        <div style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '35px', borderRadius: '12px', boxSizing: 'border-box' }}>
          <h2 style={{ fontSize: '22px', color: '#f59e0b', marginBottom: '20px', fontWeight: 'bold', wordBreak: 'break-word' }}>Neden Korkmaz Arıcılık?</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div>
              <h3 style={{ fontSize: '16px', color: '#fff', margin: '0 0 5px 0' }}>📍 Geniş Saha Ağı</h3>
              <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Aydın, Antalya, Amasya ve Erzincan yaylalarında iklime uygun üretim.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', color: '#fff', margin: '0 0 5px 0' }}>👑 Güvenilir Belfast Genetiği</h3>
              <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Saf F0 damızlık stoklardan düzenli larva transferi.</p>
            </div>
            <div>
              <h3 style={{ fontSize: '16px', color: '#fff', margin: '0 0 5px 0' }}>🚚 Güvenli Kargo ve Teslimat</h3>
              <p style={{ fontSize: '13px', color: '#888', margin: 0 }}>Ana arı taşıma kutuları ile Türkiye'nin her iline sağlıklı sevkiyat.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}
