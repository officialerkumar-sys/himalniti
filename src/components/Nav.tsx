'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const navLinks = [
  { label: 'Work', href: '/projects' },
  { label: 'Research', href: '/research' },
  { label: 'Approach', href: '/approach' },
  { label: 'The Himalaya', href: '/the-himalaya' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'About', href: '/about' },
]

export default function Nav() {
  const pathname = usePathname()

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: '60px',
        backgroundColor: 'var(--color-dark)',
        borderBottom: '1px solid rgba(255,255,255,0.06)',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: 'clamp(20px, 4vw, 48px)',
        paddingRight: 'clamp(20px, 4vw, 48px)',
      }}
    >
      <Link
        href="/"
        style={{
          color: 'var(--color-accent)',
          fontFamily: 'var(--font-base)',
          fontSize: '15px',
          fontWeight: 600,
          letterSpacing: '0.12em',
          textDecoration: 'none',
          textTransform: 'uppercase',
          flexShrink: 0,
        }}
      >
        Himal Niti
      </Link>

      <div style={{ flex: 1 }} />

      <ul
        style={{
          display: 'flex',
          gap: 'clamp(16px, 2.5vw, 32px)',
          listStyle: 'none',
          margin: 0,
          padding: 0,
        }}
      >
        {navLinks.map((link) => {
          const active = pathname === link.href || pathname.startsWith(link.href + '/')
          return (
            <li key={link.href}>
              <Link
                href={link.href}
                style={{
                  color: active ? 'var(--color-accent)' : '#E2EAF0',
                  fontSize: 'var(--font-size-nav)',
                  fontFamily: 'var(--font-base)',
                  textDecoration: 'none',
                  fontWeight: 400,
                  letterSpacing: '0.02em',
                  transition: 'color var(--transition-base)',
                  whiteSpace: 'nowrap',
                }}
                onMouseEnter={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = 'var(--color-accent)'
                }}
                onMouseLeave={(e) => {
                  if (!active) (e.currentTarget as HTMLElement).style.color = '#E2EAF0'
                }}
              >
                {link.label}
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}
