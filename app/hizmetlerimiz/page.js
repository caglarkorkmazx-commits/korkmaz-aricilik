'use client'

export default function HizmetlerimizPage() {
  const hizmetler = [
    {
      title: 'Belfast Ana Arı Satışı',
      icon: '🐝',
      desc: 'İlkbaharda Aydın-Nazilli, Antalya-Serik ve Amasya; yazın ise Erzincan Çayırlı’da yüksek performanslı Belfast ana arı üretimi yapılmaktadır. Üretilen analar F0 saf (Elde Dölleme) Analardan üretilen F1 analardır. Yüksek verim, oğul vermeme eğilimi ve uysallığı ile öne çıkar.',
      details: [
        'F0 Saf Hat Larva Transferi',
        'Yüksek Yumurtlama Kapasitesi',
        'Tüm İllere Özel Kargo Gönderim',
        'Özel paketleme ile kargo ölümleri minimum seviyede'
      ]
    },
    {
      title: 'Damızlık Arı & Arı Satın Al',
      icon: '👑',
      desc: 'Irk ıslahını kendisi yapmak isteyen arıcılarımız için F0 damızlık ana ve koloni olarak damızlık çözümleri sunuyoruz.',
      details: [
        'Irk Garantili Hatlar',
        'Ön Sipariş İmkânı',
        'Teknik Destek ve Danışmanlık'
      ]
    },
    {
      title: 'Paket & Kovanlı Arı Satışı',
      icon: '📦',
      desc: 'Aydın, Antalya ve Amasya bölgelerinde özenle hazırlanan ve bu illerden teslim 5-7 çıtalı kovanlı-kovansız arı seçeneklerimiz mevcuttur. (Ankara’ya nisan ayı sonu olmak üzere yılda bir kez teslim yapılmaktadır.)',
      details: [
        'Çıta ve yavru Sayısı Garantili',
        'Tamamı bir yaşında denenmiş verimli Analar',
        'Toplu Alımlarda Nakliye ve fiyatlandırma Desteği'
      ]
    },
    {
      title: 'Erzincan Bal Satışı (Organik Doğal Bal)',
      icon: '🍯',
      desc: 'Erzincan Çayırlı yüksek yaylalarındaki el değmemiş bitki florasından elde ettiğimiz bal çeşitlerimizi Eylül ayı itibarıyla sunuyoruz.',
      details: [
        'Petek ve Karakovan Seçenekleri',
        'Yüksek kapasitede',
        'Toptan ve Perakende Satış'
      ]
    }
  ]

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh', overflowX: 'hidden', boxSizing: 'border-box' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px', boxSizing: 'border-box' }}>
        <span style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Hizmetlerimiz</span>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginTop: '10px', marginBottom: '15px', wordBreak: 'break-word' }}>
          Profosyonel Arıcılık Çözümleri
        </h1>
        <p style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.6' }}>
          Yüksek verimli Belfast ırkı ana arı üretiminden Erzincan yaylalarının organik balına kadar tüm süreçlerde kalite ve güven sunuyoruz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px', boxSizing: 'border-box' }}>
        {hizmetler.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', boxSizing: 'border-box' }}>
            <div style={{ boxSizing: 'border-box' }}>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{item.icon}</div>
              <h2 style={{ fontSize: '20px', color: '#f59e0b', marginBottom: '12px', fontWeight: 'bold', wordBreak: 'break-word' }}>{item.title}</h2>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px', wordBreak: 'break-word' }}>{item.desc}</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.details.map((d, i) => (
                  <li key={i} style={{ fontSize: '13px', color: '#888', display: 'flex', alignItems: 'flex-start', gap: '8px', wordBreak: 'break-word' }}>
                    <span style={{ color: '#f59e0b', flexShrink: 0 }}>✓</span> <span>{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://wa.me/905358468299"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', backgroundColor: '#222', color: '#f59e0b', border: '1px solid #333', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold', boxSizing: 'border-box' }}
            >
              Detaylı Bilgi & Sipariş &rarr;
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
