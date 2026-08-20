const stages = [
  {
    number: '01',
    title: 'Field Research',
    description:
      'Primary data collection in target regions — visitor surveys, operator interviews, ecosystem transects, economic baselines.',
    color: 'var(--color-accent)',
  },
  {
    number: '02',
    title: 'Economic Modelling',
    description:
      'Carrying capacity thresholds, tourism multiplier analysis, and distributional income mapping from field data.',
    color: 'var(--color-green)',
  },
  {
    number: '03',
    title: 'Policy Translation',
    description:
      'White papers and briefs structured for government bodies, state tourism boards, and CSR programme directors.',
    color: 'var(--color-navy)',
  },
]

export default function TheoryDiagram() {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
        gap: 0,
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        overflow: 'hidden',
      }}
    >
      {stages.map((stage, idx) => (
        <div
          key={stage.number}
          style={{
            padding: '32px 28px',
            backgroundColor: 'var(--color-bg)',
            borderRight: idx < stages.length - 1 ? '1px solid var(--color-border)' : 'none',
            position: 'relative',
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              backgroundColor: stage.color,
            }}
          />
          <p
            style={{
              fontSize: '11px',
              fontFamily: 'var(--font-base)',
              fontWeight: 700,
              letterSpacing: '0.12em',
              color: stage.color,
              margin: '0 0 16px',
              textTransform: 'uppercase',
            }}
          >
            Stage {stage.number}
          </p>
          <h3
            style={{
              fontSize: '18px',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              color: 'var(--color-text)',
              margin: '0 0 12px',
            }}
          >
            {stage.title}
          </h3>
          <p
            style={{
              fontSize: '14px',
              fontFamily: 'var(--font-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {stage.description}
          </p>
          {idx < stages.length - 1 && (
            <span
              style={{
                position: 'absolute',
                right: '-14px',
                top: '50%',
                transform: 'translateY(-50%)',
                fontSize: '20px',
                color: 'var(--color-border)',
                zIndex: 2,
                pointerEvents: 'none',
              }}
            >
              →
            </span>
          )}
        </div>
      ))}
    </div>
  )
}
