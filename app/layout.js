export const metadata = {
  title: 'Korkmaz Arıcılık',
  description: 'Bilgi, Tecrübe ve Profesyonel Ana Arı Üretimi',
}

export default function RootLayout({ children }) {
  return (
    <html lang="tr">
      <body style={{ margin: 0, background: '#121212', color: '#fff', fontFamily: 'sans-serif' }}>
        {children}
      </body>
    </html>
  )
}
