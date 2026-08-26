'use client'

export default function HizmetlerimizPage() {
  const hizmetler = [
    {
      title: 'Belfast Ana Arı Satışı',
      icon: '🐝',
      desc: 'İlkbaharda Aydın-Nazilli, Antalya-Serik ve Amasya; yazın ise Erzincan Çayırlı’da yüksek performanslı Belfast ana arı satışı yapılmaktadır. F0 saf stoktan üretilen F1 Belfast analarımız yumurta verimi, oğul vermeme eğilimi ve uysallığı ile öne çıkar.',
      details: ['F0 Saf Hat Larva Transferi', 'Yüksek Yumurtlama Kapasitesi', 'Tüm İllere Özel Kargo Gönderimi']
    },
    {
      title: 'Damızlık Arı & Arı Satın Al',
      icon: '👑',
      desc: 'Kolonisini güçlendirmek ve ırk ıslahı yapmak isteyen arıcılarımız için F0 damızlık hatlar ve hazır güçlü koloni çözümleri sunuyoruz.',
      details: ['Irk Garantili Hatlar', 'Ön Sipariş İmkânı', 'Teknik Destek ve Danışmanlık']
    },
    {
      title: 'Paket & Kovanlı Arı Satışı',
      icon: '📦',
      desc: 'Aydın ve Amasya bölgelerinde özenle hazırlanan 5, 7 ve 9 çıtalı kovanlı arı veya özel nakliye kutularında paket arı satışı seçeneklerimiz mevcuttur.',
      details: ['Çıta Sayısı Garantili', 'Genç ve Verimli Analar', 'Toplu Alımlarda Nakliye Desteği']
    },
    {
      title: 'Erzincan Bal Satışı (Organik Doğal Bal)',
      icon: '🍯',
      desc: 'Erzincan Çayırlı yüksek yaylalarındaki el değmemiş bitki florasından elde ettiğimiz katkısız organik doğal bal çeşitlerimizi Eylül ayı itibarıyla sunuyoruz.',
      details: ['Süzme ve Karakovan Seçenekleri', 'Laboratuvar Analizli Saflık', 'Toptan ve Perakende Satış']
    }
  ]

  return (
    <main style={{ maxWidth: '1200px', margin: '0 auto', padding: '60px 20px', minHeight: '80vh' }}>
      <div style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto 50px' }}>
        <span style={{ fontSize: '13px', color: '#f59e0b', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 'bold' }}>Hizmetlerimiz</span>
        <h1 style={{ fontSize: '36px', fontWeight: 'bold', color: '#fff', marginTop: '10px', marginBottom: '15px' }}>
          Profosyonel Arıcılık Çözümleri
        </h1>
        <p style={{ color: '#aaa', fontSize: '16px', lineHeight: '1.6' }}>
          Yüksek verimli Belfast ırkı ana arı üretiminden Erzincan yaylalarının organik balına kadar tüm süreçlerde kalite ve güven sunuyoruz.
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '25px' }}>
        {hizmetler.map((item, index) => (
          <div key={index} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', padding: '30px', borderRadius: '12px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ fontSize: '40px', marginBottom: '15px' }}>{item.icon}</div>
              <h2 style={{ fontSize: '20px', color: '#f59e0b', marginBottom: '12px', fontWeight: 'bold' }}>{item.title}</h2>
              <p style={{ color: '#ccc', fontSize: '14px', lineHeight: '1.6', marginBottom: '20px' }}>{item.desc}</p>
              
              <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 25px 0', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {item.details.map((d, i) => (
                  <li key={i} style={{ fontSize: '13px', color: '#888', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ color: '#f59e0b' }}>✓</span> {d}
                  </li>
                ))}
              </ul>
            </div>

            <a
              href="https://wa.me/905358468299"
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: 'block', textAlign: 'center', backgroundColor: '#222', color: '#f59e0b', border: '1px solid #333', padding: '10px 15px', borderRadius: '8px', textDecoration: 'none', fontSize: '13px', fontWeight: 'bold' }}
            >
              Detaylı Bilgi & Sipariş &rarr;
            </a>
          </div>
        ))}
      </div>
    </main>
  )
}
