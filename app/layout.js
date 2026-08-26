import Header from '../components/Header' // Header bileşenini çağırıyoruz

export const metadata = {
  title: 'Korkmaz Arıcılık - Belfast Ana Arı & Bal Satışı',
  description: 'Belfast ana arı satışı, organik doğal bal ve paket arı satın al hizmetleri.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#121212', color: '#ffffff', fontFamily: 'sans-serif' }}>
        {/* Header'ı buraya koyduğumuz için artık HER SAYFADA en üstte görünecek */}
        <Header />
        
        {/* children = O an hangi sayfadaysan onun içeriği buraya gelir */}
        {children}
      </body>
    </html>
  )
}
