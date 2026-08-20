import TheoryDiagram from '@/components/TheoryDiagram'
import type { Metadata } from 'next'

export const metadata: Metadata = { title: 'Approach' }

const METHODOLOGY_POINTS = [
  {
    title: 'Mixed-method field research',
    body: 'Visitor flow surveys, structured interviews with local operators, household income assessments, and ecosystem transect data — collected in situ, not extrapolated from national datasets.',
  },
  {
    title: 'Economic carrying capacity modelling',
    body: 'We construct threshold models that link visitor volume to economic returns and ecological degradation, identifying the point at which additional footfall reduces, rather than increases, net economic value.',
  },
  {
    title: 'Distributional income mapping',
    body: 'Tourism expenditure analysis disaggregated by household type, supply chain tier, and residency status — to distinguish aggregate revenue from community-level economic benefit.',
  },
  {
    title: 'Policy translation protocols',
    body: 'Research outputs are structured for specific regulatory audiences: state tourism boards, district collectors, ministry working groups, and CSR programme managers. Recommendations are jurisdictional and costed.',
  },
]

export default function ApproachPage() {
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
            How we work
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
            Our Approach
          </h1>
          <p
            style={{
              fontSize: '19px',
              fontFamily: 'var(--font-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              maxWidth: '640px',
              margin: 0,
            }}
          >
            Himal Niti operates at the intersection of field economics, ecosystem science, and
            regulatory policy. Our work is grounded in primary data and designed to be acted upon
            by specific institutional audiences.
          </p>
        </div>
      </div>

      {/* Problem */}
      <section
        style={{
          padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '16px',
            }}
          >
            The Problem
          </p>
          <h2
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.25,
              marginBottom: '24px',
            }}
          >
            Tourism policy in mountain India lacks an economic evidence base.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
              Visitor caps, permit systems, and zone designations are typically set by administrative
              precedent or political judgment rather than by economic analysis. The result is policy
              that protects neither the ecosystem nor the livelihoods of communities within it.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
              The missing input is empirical: carrying capacity thresholds, distributional income
              maps, and elasticity data linking visitor volumes to ecological and economic outcomes.
              These are producible. Most tourism regions in the Indian Himalaya have never had them.
            </p>
          </div>
        </div>
      </section>

      {/* Theory of Change */}
      <section
        style={{
          padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
          backgroundColor: 'var(--color-bg-alt)',
          borderTop: '1px solid var(--color-border)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '16px',
            }}
          >
            Theory of Change
          </p>
          <h2
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.25,
              marginBottom: '40px',
              maxWidth: '560px',
            }}
          >
            From primary data to implementable policy.
          </h2>
          <TheoryDiagram />
        </div>
      </section>

      {/* Methodology */}
      <section
        style={{
          padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '16px',
            }}
          >
            Methodology
          </p>
          <h2
            style={{
              fontSize: 'clamp(22px, 3vw, 32px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.25,
              marginBottom: '40px',
            }}
          >
            How the research is produced.
          </h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
            {METHODOLOGY_POINTS.map((point, i) => (
              <div
                key={i}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '24px 1fr',
                  gap: '20px',
                  alignItems: 'start',
                }}
              >
                <span
                  style={{
                    fontSize: '11px',
                    fontWeight: 700,
                    color: 'var(--color-accent)',
                    marginTop: '4px',
                    fontFamily: 'var(--font-base)',
                  }}
                >
                  {String(i + 1).padStart(2, '0')}
                </span>
                <div>
                  <h3
                    style={{
                      fontSize: '17px',
                      fontFamily: 'var(--font-base)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      marginBottom: '8px',
                    }}
                  >
                    {point.title}
                  </h3>
                  <p
                    style={{
                      fontSize: '15px',
                      fontFamily: 'var(--font-base)',
                      color: 'var(--color-text-muted)',
                      lineHeight: 1.8,
                      margin: 0,
                    }}
                  >
                    {point.body}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
