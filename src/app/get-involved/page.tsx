import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Get Involved' }

const PATHWAYS = [
  {
    label: 'CSR Partners',
    borderColor: 'var(--color-accent)',
    title: 'Corporate Social Responsibility',
    body: 'Himal Niti accepts CSR funding from corporations with operations or supply chain exposure in the Indian Himalaya. Funded research is published independently under Himal Niti authorship. Partners receive early access to findings, facilitated briefings with state-level regulators, and named acknowledgement in publications. We do not accept restrictions on research conclusions.',
    points: [
      'Multi-year programme funding for a named research region',
      'Commissioned baseline studies within existing scope',
      'Policy briefing facilitation for corporate sustainability teams',
    ],
    cta: { label: 'Discuss a partnership', href: 'mailto:hello@himalniti.org' },
  },
  {
    label: 'Tourism Operators',
    borderColor: 'var(--color-green)',
    title: 'Operators & Industry Bodies',
    body: 'Tour operators, hotel groups, and trekking associations working in our research zones can engage as data partners and early adopters of our carrying capacity frameworks. Operators who share anonymous visitor flow data contribute to the research base that benefits the sector as a whole.',
    points: [
      'Data partnership agreements for aggregated visitor flow data',
      'Access to carrying capacity models before public release',
      'Participation in regional operator working groups',
    ],
    cta: { label: 'Register interest', href: 'mailto:hello@himalniti.org' },
  },
  {
    label: 'Researchers',
    borderColor: 'var(--color-navy)',
    title: 'Academic & Policy Researchers',
    body: 'Himal Niti collaborates with university departments, government research institutions, and independent researchers working on Himalayan economics, ecology, and governance. We share cleaned datasets, co-author publications, and provide field access for affiliated researchers.',
    points: [
      'Access to primary field datasets under data sharing agreements',
      'Co-authorship on publications using Himal Niti field data',
      'Field access and logistics support for affiliated research',
    ],
    cta: { label: 'Propose a collaboration', href: 'mailto:hello@himalniti.org' },
  },
]

export default function GetInvolvedPage() {
  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '12px',
            }}
          >
            Engage with us
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '20px',
            }}
          >
            Get Involved
          </h1>
          <p
            style={{
              fontSize: '19px',
              fontFamily: 'var(--font-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              maxWidth: '600px',
              margin: 0,
            }}
          >
            Himal Niti is funded through CSR partnerships and consulting engagements — not
            public donations. We work with corporations, operators, and researchers who have
            a direct interest in the economic health of Himalayan tourism.
          </p>
        </div>
      </div>

      {/* Pathway panels */}
      <section
        style={{
          padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto', display: 'flex', flexDirection: 'column', gap: '32px' }}>
          {PATHWAYS.map((pathway) => (
            <div
              key={pathway.label}
              style={{
                borderLeft: `3px solid ${pathway.borderColor}`,
                paddingLeft: '28px',
                paddingTop: '8px',
                paddingBottom: '8px',
              }}
            >
              <p
                style={{
                  fontSize: 'var(--font-size-caption)',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: pathway.borderColor,
                  fontWeight: 600,
                  fontFamily: 'var(--font-base)',
                  marginBottom: '8px',
                }}
              >
                {pathway.label}
              </p>
              <h2
                style={{
                  fontSize: '22px',
                  fontFamily: 'var(--font-base)',
                  fontWeight: 600,
                  color: 'var(--color-text)',
                  marginBottom: '16px',
                }}
              >
                {pathway.title}
              </h2>
              <p
                style={{
                  fontSize: '15px',
                  fontFamily: 'var(--font-base)',
                  color: 'var(--color-text-muted)',
                  lineHeight: 1.8,
                  marginBottom: '20px',
                  maxWidth: '600px',
                }}
              >
                {pathway.body}
              </p>
              <ul
                style={{
                  listStyle: 'none',
                  padding: 0,
                  margin: '0 0 24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '8px',
                }}
              >
                {pathway.points.map((point, i) => (
                  <li
                    key={i}
                    style={{
                      fontSize: '14px',
                      fontFamily: 'var(--font-base)',
                      color: 'var(--color-text)',
                      display: 'flex',
                      gap: '10px',
                      alignItems: 'flex-start',
                    }}
                  >
                    <span style={{ color: pathway.borderColor, flexShrink: 0, marginTop: '3px' }}>—</span>
                    {point}
                  </li>
                ))}
              </ul>
              <a
                href={pathway.cta.href}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '40px',
                  padding: '0 20px',
                  border: `1px solid ${pathway.borderColor}`,
                  borderRadius: 'var(--radius-card)',
                  color: pathway.borderColor,
                  fontSize: '13px',
                  fontFamily: 'var(--font-base)',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'all var(--transition-base)',
                }}
              >
                {pathway.cta.label} →
              </a>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}
