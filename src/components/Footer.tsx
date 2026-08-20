import Link from 'next/link'

interface FooterProps {
  eklahimalUrl?: string
  contactEmail?: string
  linkedinUrl?: string
}

export default function Footer({ eklahimalUrl, contactEmail, linkedinUrl }: FooterProps) {
  return (
    <footer
      style={{
        backgroundColor: 'var(--color-dark)',
        color: '#E2EAF0',
        padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)',
        fontFamily: 'var(--font-base)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--space-wide-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '40px',
        }}
      >
        <div>
          <p
            style={{
              color: 'var(--color-accent)',
              fontSize: '15px',
              fontWeight: 600,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              marginBottom: '12px',
            }}
          >
            Himal Niti
          </p>
          <p style={{ fontSize: '13px', color: '#8A97A8', lineHeight: 1.7, maxWidth: '260px' }}>
            Research and policy for sustainable tourism economics in the Indian Himalaya.
          </p>
          <p style={{ fontSize: '12px', color: '#5A6472', marginTop: '16px' }}>
            Section 8 Non-Profit Organisation
          </p>
        </div>

        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5A6472',
              marginBottom: '16px',
            }}
          >
            Work
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'Projects', href: '/projects' },
              { label: 'Research', href: '/research' },
              { label: 'Approach', href: '/approach' },
              { label: 'The Himalaya', href: '/the-himalaya' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ color: '#8A97A8', fontSize: '13px', textDecoration: 'none' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5A6472',
              marginBottom: '16px',
            }}
          >
            Organisation
          </p>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {[
              { label: 'About', href: '/about' },
              { label: 'Get Involved', href: '/get-involved' },
            ].map((l) => (
              <li key={l.href}>
                <Link
                  href={l.href}
                  style={{ color: '#8A97A8', fontSize: '13px', textDecoration: 'none' }}
                >
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <p
            style={{
              fontSize: '11px',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: '#5A6472',
              marginBottom: '16px',
            }}
          >
            Connect
          </p>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {contactEmail && (
              <a
                href={`mailto:${contactEmail}`}
                style={{ color: '#8A97A8', fontSize: '13px', textDecoration: 'none' }}
              >
                {contactEmail}
              </a>
            )}
            {linkedinUrl && (
              <a
                href={linkedinUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#8A97A8', fontSize: '13px', textDecoration: 'none' }}
              >
                LinkedIn
              </a>
            )}
            {eklahimalUrl && (
              <a
                href={eklahimalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: 'var(--color-accent)', fontSize: '13px', textDecoration: 'none' }}
              >
                Eklahimal →
              </a>
            )}
          </div>
        </div>
      </div>

      <div
        style={{
          maxWidth: 'var(--space-wide-max)',
          margin: '48px auto 0',
          paddingTop: '24px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '12px',
        }}
      >
        <p style={{ fontSize: '12px', color: '#5A6472', margin: 0 }}>
          © {new Date().getFullYear()} Himal Niti. All rights reserved.
        </p>
        <p style={{ fontSize: '12px', color: '#5A6472', margin: 0 }}>
          Indian Himalaya · Sustainable Tourism Economics
        </p>
      </div>
    </footer>
  )
}
