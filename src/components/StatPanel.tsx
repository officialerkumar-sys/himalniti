import type { KeyStat } from '@/lib/types'

export default function StatPanel({ stats }: { stats: KeyStat[] }) {
  return (
    <section
      style={{
        backgroundColor: 'var(--color-bg-alt)',
        padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
      }}
    >
      <div
        style={{
          maxWidth: 'var(--space-wide-max)',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: `repeat(${Math.min(stats.length, 3)}, 1fr)`,
          gap: '2px',
        }}
      >
        {stats.map((stat, i) => (
          <div
            key={i}
            style={{
              padding: 'clamp(28px, 4vw, 48px)',
              textAlign: 'center',
              borderRight: i < stats.length - 1 ? '1px solid var(--color-border)' : 'none',
            }}
          >
            <p
              style={{
                fontSize: 'clamp(36px, 5vw, 56px)',
                fontFamily: 'var(--font-base)',
                fontWeight: 700,
                color: stat.color === 'green' ? 'var(--color-green)' : 'var(--color-accent)',
                margin: '0 0 8px',
                lineHeight: 1,
              }}
            >
              {stat.figure}
            </p>
            <p
              style={{
                fontSize: '13px',
                fontFamily: 'var(--font-base)',
                color: 'var(--color-text-muted)',
                margin: 0,
                letterSpacing: '0.04em',
                lineHeight: 1.5,
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
