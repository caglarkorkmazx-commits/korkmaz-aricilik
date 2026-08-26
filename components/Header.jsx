'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
  const pathname = usePathname()

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
      <div style={{ padding: '15px 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Link href="/" style={{ fontSize: '26px', fontWeight: 'bold', color: '#f59e0b', textDecoration: 'none' }}>
          K<span style={{ color: '#fff', fontSize: '18px', marginLeft: '3px' }}>ORKMAZ</span>
        </Link>
        
        <nav style={{ display: 'flex', gap: '25px', fontSize: '14px', letterSpacing: '0.5px' }}>
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
      </div>
    </header>
  )
}
