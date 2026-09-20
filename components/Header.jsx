'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { name: 'Anasayfa', href: '/' },
    { name: 'Hizmetlerimiz', href: '/hizmetlerimiz' },
    { name: 'Hakkımızda', href: '/hakkimizda' },
    { name: 'Galeri', href: '/galeri' },
    { name: 'Bloglar', href: '/blog' },
    { name: 'İletişim', href: '/iletisim' },
  ]

  return (
    <header style={{ position: 'sticky', top: 0, zIndex: 100, backgroundColor: 'rgba(18, 18, 18, 0.95)', backdropFilter: 'blur(8px)', borderBottom: '1px solid #222' }}>
      
      <style>{`
        .header-container {
          padding: 10px 40px; /* Dikey boşluğu büyüyen logoya göre dengeledik */
          display: flex;
          align-items: center;
          justify-content: space-between;
        }
        .desktop-nav {
          display: flex;
          gap: 25px;
          font-size: 14px;
          letter-spacing: 0.5px;
        }
        .mobile-menu-btn {
          display: none;
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
        }
        .mobile-nav {
          display: none;
        }

        @media (max-width: 768px) {
          .header-container {
            padding: 10px 20px;
          }
          .desktop-nav {
            display: none;
          }
          .mobile-menu-btn {
            display: block;
          }
          .mobile-nav {
            display: flex;
            flex-direction: column;
            background-color: #121212;
            position: absolute;
            top: 75px;
            left: 0;
            width: 100%;
            border-bottom: 1px solid #222;
          }
          .mobile-nav-item {
            padding: 15px 20px;
            border-bottom: 1px solid #222;
            font-size: 16px;
          }
          .logo-img {
            height: 50px !important; /* Mobilde taşma yapmaması için biraz dengeledik */
          }
        }
      `}</style>

      <div className="header-container">
        {/* Büyütülmüş Logo Görseli */}
        <Link 
          href="/" 
          style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}
          onClick={() => setIsOpen(false)}
        >
          <img 
            src="/logo.png" 
            alt="Korkmaz Arıcılık" 
            className="logo-img"
            style={{ height: '65px', width: 'auto', objectFit: 'contain' }} 
          />
        </Link>
        
        {/* Masaüstü Navigasyon */}
        <nav className="desktop-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                style={{
                  textDecoration: 'none',
                  color: isActive ? '#f59e0b' : '#aaa',
                  fontWeight: isActive ? '700' : '500',
                  transition: '0.2s'
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>

        {/* Mobil Hamburger Butonu */}
        <button className="mobile-menu-btn" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Mobil Açılır Navigasyon */}
      {isOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="mobile-nav-item"
                onClick={() => setIsOpen(false)}
                style={{
                  textDecoration: 'none',
                  color: isActive ? '#f59e0b' : '#aaa',
                  fontWeight: isActive ? '700' : '500',
                }}
              >
                {item.name}
              </Link>
            )
          })}
        </nav>
      )}
    </header>
  )
}
