import Header from '../components/Header'
import Script from 'next/script'

export const metadata = {
  title: 'Korkmaz Arıcılık - Belfast Ana Arı & Bal Satışı',
  description: 'Belfast ana arı satışı, organik doğal bal ve paket arı satın al hizmetleri.',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <head>
        {/* Google Analytics */}
        <Script
          strategy="lazyOnload"
          src="https://www.googletagmanager.com/gtag/js?id=G-F3EVRQ8045"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-F3EVRQ8045');
          `}
        </Script>
      </head>
      <body style={{ margin: 0, padding: 0, backgroundColor: '#121212', color: '#ffffff', fontFamily: 'sans-serif' }}>
        {/* Header bileşenini en üste koyuyoruz */}
        <Header />
        
        {/* Sayfa içerikleri buraya yüklenecek */}
        {children}
      </body>
    </html>
  )
}
