import Header from '../components/Header'
import Script from 'next/script'

export const metadata = {
  title: 'Korkmaz Arıcılık - Islahlı Belfast Ana Arı & Doğal Bal Üretimi',
  description: 'Korkmaz Arıcılık resmi web sitesi. Aydın ve Erzincan sahalarımızda ıslahlı Belfast ana arı yetiştiriciliği ve Erzincan yayla balı üretimi.',
  icons: {
    icon: '/icon.png',
    shortcut: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }) {
  // Google'ın markayı ve arama sonuçlarındaki logosunu algılaması için JSON-LD Şeması
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Korkmaz Arıcılık',
    'url': 'https://korkmazaricilik.com',
    'logo': 'https://korkmazaricilik.com/icon.png',
  }

  return (
    <html lang="tr">
      <head>
        {/* Google Arama Logosu İçin Yapısal Veri */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body style={{ 
        margin: 0, 
        padding: 0, 
        overflowX: 'hidden', /* Sağa kaymayı kesin olarak engeller */
        maxWidth: '100vw',   /* Ekran genişliğini sınırlandırır */
        backgroundColor: '#121212', 
        color: '#ffffff', 
        fontFamily: 'sans-serif' 
      }}>
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
