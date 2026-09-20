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
          padding: 10px 40px;
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
            padding: 10px 15px;
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
            height: 60px !important;
          }
          .logo-text {
            font-size: 16px !important;
          }
        }
      `}</style>

      <div className="header-container">
        {/* Büyütülmüş Logo Görseli + Yanında Okunabilir Yazı */}
        <Link 
          href="/" 
          style={{ display: 'flex', alignItems: 'center', gap: '12px', textDecoration: 'none' }}
          onClick={() => setIsOpen(false)}
        >
          <img 
            src="/logo.png" 
            alt="Korkmaz Arıcılık Logo" 
            className="logo-img"
            style={{ height: '85px', width: 'auto', objectFit: 'contain' }} 
          />
          <span className="logo-text" style={{ fontSize: '22px', fontWeight: '800', color: '#f59e0b', letterSpacing: '1px' }}>
            KORKMAZ <span style={{ color: '#ffffff', fontWeight: '600' }}>ARICILIK</span>
          </span>
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
