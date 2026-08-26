import Header from '../components/Header'

export const metadata = {
  title: 'Korkmaz Arıcılık - Belfast Ana Arı & Bal Satışı',
  description: 'Belfast ana arı satışı, organik doğal bal ve paket arı satın al hizmetleri.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#121212', color: '#ffffff', fontFamily: 'sans-serif' }}>
        {/* Header bileşenini en üste koyuyoruz */}
        <Header />
        
        {/* Sayfa içerikleri buraya yüklenecek */}
        {children}
      </body>
    </html>
  )
}
