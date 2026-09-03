import Header from '../components/Header'
import Script from 'next/script'

export const metadata = {
  title: 'Korkmaz Arıcılık - Belfast Ana Arı & Bal Satışı',
  description: 'Belfast ana arı satışı, organik doğal bal ve paket arı satın al hizmetleri.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, padding: 0, backgroundColor: '#121212', color: '#ffffff', fontFamily: 'sans-serif' }}>
        {/* Google Analytics - body içerisinde en üstte yer alması en güvenlisidir */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-F3EVRQ8045"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3EVRQ8045');
          `}
        </Script>

        {/* Header bileşeni */}
        <Header />
        
        {/* Sayfa içerikleri */}
        {children}
      </body>
    </html>
  )
}
