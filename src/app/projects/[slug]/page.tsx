import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { projectBySlugQuery } from '@/lib/sanity/queries/projects'
import ResearchCard from '@/components/ResearchCard'
import type { ProjectDetail } from '@/lib/types'
import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'

const STATUS_STYLES: Record<string, { label: string; color: string; bg: string }> = {
  active: { label: 'Active', color: 'var(--color-green)', bg: 'var(--color-green-light)' },
  completed: { label: 'Completed', color: 'var(--color-text-muted)', bg: 'var(--color-bg-alt)' },
  forthcoming: { label: 'Forthcoming', color: 'var(--color-accent)', bg: '#F5EDD8' },
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await client.fetch<ProjectDetail | null>(projectBySlugQuery, { slug })
  if (!item) return { title: 'Not Found' }
  return { title: item.title, description: item.summary }
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await client.fetch<ProjectDetail | null>(
    projectBySlugQuery,
    { slug },
    { cache: 'no-store' }
  )

  if (!item) notFound()

  const statusStyle = STATUS_STYLES[item.status] ?? STATUS_STYLES.active

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px) clamp(32px, 4vw, 48px)',
        }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          <Link
            href="/projects"
            style={{
              fontSize: '13px',
              color: 'var(--color-text-muted)',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '6px',
              marginBottom: '24px',
            }}
          >
            ← Projects
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
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
                {item.region.name}{item.region.state ? `, ${item.region.state}` : ''}
              </span>
            )}
          </div>

          <h1
            style={{
              fontSize: 'clamp(24px, 3.5vw, 40px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.2,
              marginBottom: '24px',
            }}
          >
            {item.title}
          </h1>

          {/* Meta grid */}
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
              gap: '16px',
              padding: '20px',
              backgroundColor: 'var(--color-bg-alt)',
              borderRadius: 'var(--radius-card)',
              border: '1px solid var(--color-border)',
            }}
          >
            {item.startDate && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                  Start
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 500 }}>
                  {item.startDate}
                </p>
              </div>
            )}
            {item.endDate && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                  End
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text)', fontWeight: 500 }}>
                  {item.endDate}
                </p>
              </div>
            )}
            {item.partners && item.partners.length > 0 && (
              <div>
                <p style={{ fontSize: '11px', color: 'var(--color-text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontWeight: 600, marginBottom: '4px' }}>
                  Partners
                </p>
                <p style={{ fontSize: '14px', color: 'var(--color-text)', lineHeight: 1.5 }}>
                  {item.partners.join(', ')}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Summary + body */}
      <div
        style={{ padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 48px)' }}
      >
        <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
          {item.summary && (
            <p
              style={{
                fontSize: '19px',
                fontFamily: 'var(--font-base)',
                color: 'var(--color-text)',
                lineHeight: 1.7,
                marginBottom: '32px',
                fontWeight: 400,
              }}
            >
              {item.summary}
            </p>
          )}
          {item.body && (
            <div className="prose">
              <PortableText value={item.body as Parameters<typeof PortableText>[0]['value']} />
            </div>
          )}
        </div>
      </div>

      {/* Research outputs */}
      {item.outputs && item.outputs.length > 0 && (
        <div
          style={{
            padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
            backgroundColor: 'var(--color-bg-alt)',
            borderTop: '1px solid var(--color-border)',
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
                marginBottom: '24px',
              }}
            >
              Research Outputs
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              {item.outputs.map((r) => (
                <ResearchCard key={r._id} item={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
