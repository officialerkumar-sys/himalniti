import Link from 'next/link'
import type { ProjectCard as ProjectCardType } from '@/lib/types'

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: 'var(--color-green)', bg: 'var(--color-green-light)' },
  completed: { label: 'Completed', color: 'var(--color-text-muted)', bg: 'var(--color-bg-alt)' },
  forthcoming: { label: 'Forthcoming', color: 'var(--color-accent)', bg: '#F5EDD8' },
}

export default function ProjectCard({ item }: { item: ProjectCardType }) {
  const statusStyle = STATUS_STYLES[item.status] ?? STATUS_STYLES.active

  return (
    <article
      style={{
        border: '1px solid var(--color-border)',
        borderRadius: 'var(--radius-card)',
        backgroundColor: 'var(--color-bg)',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        <span
          style={{
            fontSize: 'var(--font-size-caption)',
            fontFamily: 'var(--font-base)',
            letterSpacing: '0.06em',
            textTransform: 'uppercase',
            color: statusStyle.color,
            backgroundColor: statusStyle.bg,
            padding: '2px 8px',
            borderRadius: '2px',
            fontWeight: 600,
          }}
        >
          {statusStyle.label}
        </span>
        {item.region && (
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            {item.region.name}
          </span>
        )}
      </div>

      <h3
        style={{
          fontSize: '17px',
          fontFamily: 'var(--font-base)',
          fontWeight: 600,
          color: 'var(--color-text)',
          margin: 0,
          lineHeight: 1.4,
        }}
      >
        <Link
          href={`/projects/${item.slug.current}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {item.title}
        </Link>
      </h3>

      {item.summary && (
        <p
          style={{
            fontSize: '14px',
            color: 'var(--color-text-muted)',
            lineHeight: 1.7,
            margin: 0,
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden',
          }}
        >
          {item.summary}
        </p>
      )}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 'auto',
          paddingTop: '12px',
          borderTop: '1px solid var(--color-border)',
        }}
      >
        {item.startDate && (
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            From {item.startDate}
          </span>
        )}
        <Link
          href={`/projects/${item.slug.current}`}
          style={{
            fontSize: '13px',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          View project →
        </Link>
      </div>
    </article>
  )
}
