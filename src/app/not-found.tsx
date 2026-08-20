import Link from 'next/link'

export default function NotFound() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px 20px',
        textAlign: 'center',
        fontFamily: 'var(--font-base)',
      }}
    >
      <p
        style={{
          fontSize: 'var(--font-size-caption)',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'var(--color-accent)',
          fontWeight: 600,
          marginBottom: '12px',
        }}
      >
        404
      </p>
      <h1
        style={{
          fontSize: 'clamp(24px, 4vw, 40px)',
          fontWeight: 700,
          color: 'var(--color-text)',
          marginBottom: '16px',
        }}
      >
        Page not found
      </h1>
      <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', marginBottom: '32px' }}>
        The page you are looking for does not exist.
      </p>
      <Link
        href="/"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          height: '44px',
          padding: '0 24px',
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-card)',
          color: 'var(--color-text)',
          fontSize: '14px',
          fontWeight: 500,
          textDecoration: 'none',
        }}
      >
        Return home
      </Link>
    </div>
  )
}
