import Link from 'next/link'
import type { ResearchCard as ResearchCardType } from '@/lib/types'

const CATEGORY_LABELS: Record<string, string> = {
  'white-paper': 'White Paper',
  'policy-brief': 'Policy Brief',
  'field-report': 'Field Report',
  'data-report': 'Data Report',
  'case-study': 'Case Study',
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-IN', { year: 'numeric', month: 'long' })
}

export default function ResearchCard({ item }: { item: ResearchCardType }) {
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
        transition: 'border-color var(--transition-base)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
        {item.category && (
          <span
            style={{
              fontSize: 'var(--font-size-caption)',
              fontFamily: 'var(--font-base)',
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              fontWeight: 600,
            }}
          >
            {CATEGORY_LABELS[item.category] ?? item.category}
          </span>
        )}
        {item.region && (
          <span style={{ fontSize: 'var(--font-size-caption)', color: 'var(--color-text-muted)' }}>
            · {item.region.name}
          </span>
        )}
        {item.hasPdf && (
          <span
            style={{
              fontSize: 'var(--font-size-caption)',
              color: 'var(--color-green)',
              marginLeft: 'auto',
              fontWeight: 500,
            }}
          >
            PDF
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
          href={`/research/${item.slug.current}`}
          style={{ color: 'inherit', textDecoration: 'none' }}
        >
          {item.title}
        </Link>
      </h3>

      {item.abstract && (
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
          {item.abstract}
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
        {item.publishedAt && (
          <span style={{ fontSize: '12px', color: 'var(--color-text-muted)' }}>
            {formatDate(item.publishedAt)}
          </span>
        )}
        <Link
          href={`/research/${item.slug.current}`}
          style={{
            fontSize: '13px',
            color: 'var(--color-accent)',
            textDecoration: 'none',
            fontWeight: 500,
          }}
        >
          Read →
        </Link>
      </div>
    </article>
  )
}
