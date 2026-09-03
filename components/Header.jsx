'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Header() {
  const pathname = usePathname()
  const [isOpen, setIsOpen] = useState(false) // Mobil menünün açık/kapalı durumu

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
      
      {/* Mobil uyum (Responsive) için CSS kısımları */}
      <style>{`
        .header-container {
          padding: 15px 40px;
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

        /* Ekran 768px'den küçükse (Mobil cihazlar) bu kurallar geçerli olur */
        @media (max-width: 768px) {
          .header-container {
            padding: 15px 20px; /* Mobilde yan boşlukları daralttık */
          }
          .desktop-nav {
            display: none; /* Mobilde yan yana menüyü gizle */
          }
          .mobile-menu-btn {
            display: block; /* Mobilde hamburger ikonunu göster */
          }
          .mobile-nav {
            display: flex;
            flex-direction: column;
            background-color: #121212;
            position: absolute;
            top: 65px; /* Menünün hemen altından başlasın */
            left: 0;
            width: 100%;
            border-bottom: 1px solid #222;
          }
          .mobile-nav-item {
            padding: 15px 20px;
            border-bottom: 1px solid #222;
            font-size: 16px;
          }
        }
      `}</style>

      <div className="header-container">
        {/* Logo */}
        <Link 
          href="/" 
          style={{ fontSize: '26px', fontWeight: 'bold', color: '#f59e0b', textDecoration: 'none' }}
          onClick={() => setIsOpen(false)}
        >
          K<span style={{ color: '#fff', fontSize: '18px', marginLeft: '3px' }}>ORKMAZ</span>
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

      {/* Mobil Açılır Navigasyon (Sadece buton tıklandığında görünür) */}
      {isOpen && (
        <nav className="mobile-nav">
          {navItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                className="mobile-nav-item"
                onClick={() => setIsOpen(false)} // Linke tıklayınca menü otomatik kapansın
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
