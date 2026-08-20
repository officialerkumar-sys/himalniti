import { notFound } from 'next/navigation'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { researchBySlugQuery, relatedResearchQuery } from '@/lib/sanity/queries/research'
import ResearchCard from '@/components/ResearchCard'
import type { ResearchDetail, ResearchCard as ResearchCardType } from '@/lib/types'
import type { Metadata } from 'next'
import { PortableText } from 'next-sanity'

const CATEGORY_LABELS: Record<string, string> = {
  'white-paper': 'White Paper',
  'policy-brief': 'Policy Brief',
  'field-report': 'Field Report',
  'data-report': 'Data Report',
  'case-study': 'Case Study',
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const item = await client.fetch<ResearchDetail | null>(researchBySlugQuery, { slug })
  if (!item) return { title: 'Not Found' }
  return {
    title: item.title,
    description: item.abstract,
  }
}

export default async function ResearchDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const item = await client.fetch<ResearchDetail | null>(
    researchBySlugQuery,
    { slug },
    { cache: 'no-store' }
  )

  if (!item) notFound()

  const related = await client.fetch<ResearchCardType[]>(
    relatedResearchQuery,
    { slug, category: item.category },
    { next: { revalidate: 3600 } }
  )

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
            href="/research"
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
            ← Research Library
          </Link>

          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px', flexWrap: 'wrap' }}>
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
              <span
                style={{
                  fontSize: 'var(--font-size-caption)',
                  color: 'var(--color-text-muted)',
                }}
              >
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
              marginBottom: '20px',
            }}
          >
            {item.title}
          </h1>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '24px',
              flexWrap: 'wrap',
            }}
          >
            {item.authors && item.authors.length > 0 && (
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
                {item.authors.join(', ')}
              </p>
            )}
            {item.publishedAt && (
              <p style={{ fontSize: '14px', color: 'var(--color-text-muted)', margin: 0 }}>
                {new Date(item.publishedAt).toLocaleDateString('en-IN', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            )}
            {item.pdfUrl && (
              <a
                href={item.pdfUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  height: '36px',
                  padding: '0 18px',
                  backgroundColor: 'var(--color-accent)',
                  color: 'var(--color-dark)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-base)',
                  fontWeight: 600,
                  textDecoration: 'none',
                  borderRadius: 'var(--radius-card)',
                }}
              >
                ↓ Download PDF
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Key findings */}
      {item.keyFindings && item.keyFindings.length > 0 && (
        <div
          style={{
            padding: 'clamp(24px, 3vw, 40px) clamp(20px, 4vw, 48px)',
            backgroundColor: 'var(--color-green-light)',
            borderBottom: '1px solid var(--color-border)',
          }}
        >
          <div style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}>
            <p
              style={{
                fontSize: 'var(--font-size-caption)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-green)',
                fontWeight: 600,
                fontFamily: 'var(--font-base)',
                marginBottom: '16px',
              }}
            >
              Key Findings
            </p>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {item.keyFindings.map((finding, i) => (
                <li
                  key={i}
                  style={{
                    display: 'flex',
                    gap: '12px',
                    fontSize: '15px',
                    fontFamily: 'var(--font-base)',
                    color: 'var(--color-text)',
                    lineHeight: 1.6,
                  }}
                >
                  <span
                    style={{
                      color: 'var(--color-green)',
                      fontWeight: 700,
                      flexShrink: 0,
                      marginTop: '1px',
                    }}
                  >
                    {i + 1}.
                  </span>
                  {finding}
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* Abstract */}
      {item.abstract && (
        <div
          style={{
            padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 48px)',
            borderBottom: '1px solid var(--color-border)',
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
              Abstract
            </p>
            <p
              style={{
                fontSize: '17px',
                fontFamily: 'var(--font-base)',
                color: 'var(--color-text)',
                lineHeight: 1.8,
                margin: 0,
              }}
            >
              {item.abstract}
            </p>
          </div>
        </div>
      )}

      {/* Body */}
      {item.body && (
        <div
          style={{
            padding: 'clamp(32px, 4vw, 56px) clamp(20px, 4vw, 48px)',
          }}
        >
          <div
            style={{ maxWidth: 'var(--space-content-max)', margin: '0 auto' }}
            className="prose"
          >
            <PortableText value={item.body as Parameters<typeof PortableText>[0]['value']} />
          </div>
        </div>
      )}

      {/* Related research */}
      {related && related.length > 0 && (
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
              Related Research
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
              }}
            >
              {related.map((r) => (
                <ResearchCard key={r._id} item={r} />
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
