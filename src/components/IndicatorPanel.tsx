import type { Indicator } from '@/lib/types'

const STATUS_CONFIG = {
  stable: { label: 'Stable', color: 'var(--color-green)', dot: '#3D6B50' },
  'at-risk': { label: 'At Risk', color: 'var(--color-accent)', dot: '#B89048' },
  critical: { label: 'Critical', color: '#C0392B', dot: '#C0392B' },
}

const TREND_CONFIG = {
  improving: { symbol: '↑', color: 'var(--color-green)' },
  stable: { symbol: '→', color: 'var(--color-text-muted)' },
  declining: { symbol: '↓', color: '#C0392B' },
}

const CATEGORY_LABELS: Record<string, string> = {
  ecosystem: 'Ecosystem',
  'tourism-pressure': 'Tourism Pressure',
  economic: 'Economic',
  social: 'Social',
}

function groupByCategory(indicators: Indicator[]) {
  return indicators.reduce<Record<string, Indicator[]>>((acc, ind) => {
    const key = ind.category
    if (!acc[key]) acc[key] = []
    acc[key].push(ind)
    return acc
  }, {})
}

export default function IndicatorPanel({ indicators }: { indicators: Indicator[] }) {
  const grouped = groupByCategory(indicators)

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      {Object.entries(grouped).map(([category, items]) => (
        <div key={category}>
          <h3
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-text-muted)',
              marginBottom: '16px',
            }}
          >
            {CATEGORY_LABELS[category] ?? category}
          </h3>
          <div
            style={{
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              overflow: 'hidden',
            }}
          >
            {items.map((ind, idx) => {
              const statusConf = STATUS_CONFIG[ind.status] ?? STATUS_CONFIG.stable
              const trendConf = TREND_CONFIG[ind.trend] ?? TREND_CONFIG.stable
              return (
                <div
                  key={ind._id}
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr auto auto auto',
                    gap: '16px',
                    alignItems: 'center',
                    padding: '16px 20px',
                    backgroundColor: 'var(--color-bg)',
                    borderBottom: idx < items.length - 1 ? '1px solid var(--color-border)' : 'none',
                  }}
                >
                  <div>
                    <p
                      style={{
                        fontSize: '14px',
                        fontFamily: 'var(--font-base)',
                        fontWeight: 500,
                        color: 'var(--color-text)',
                        margin: '0 0 2px',
                      }}
                    >
                      {ind.name}
                    </p>
                    {ind.note && (
                      <p
                        style={{
                          fontSize: '12px',
                          color: 'var(--color-text-muted)',
                          margin: 0,
                          lineHeight: 1.5,
                        }}
                      >
                        {ind.note}
                      </p>
                    )}
                  </div>

                  <span
                    style={{
                      fontSize: '14px',
                      fontFamily: 'var(--font-base)',
                      fontWeight: 600,
                      color: 'var(--color-text)',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {ind.currentValue}
                  </span>

                  <span
                    style={{
                      fontSize: '16px',
                      color: trendConf.color,
                      fontWeight: 700,
                      lineHeight: 1,
                    }}
                    title={ind.trend}
                  >
                    {trendConf.symbol}
                  </span>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <span
                      style={{
                        width: '8px',
                        height: '8px',
                        borderRadius: '50%',
                        backgroundColor: statusConf.dot,
                        display: 'inline-block',
                        flexShrink: 0,
                      }}
                    />
                    <span
                      style={{
                        fontSize: '11px',
                        fontFamily: 'var(--font-base)',
                        color: statusConf.color,
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {statusConf.label}
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      ))}
    </div>
  )
}
