import { client } from '@/lib/sanity/client'
import { allResearchQuery } from '@/lib/sanity/queries/research'
import { regionsQuery } from '@/lib/sanity/queries/settings'
import ResearchCard from '@/components/ResearchCard'
import type { ResearchCard as ResearchCardType, HimalayaRegion } from '@/lib/types'
import ResearchFilters from './ResearchFilters'

export const metadata = { title: 'Research' }

async function getData() {
  const [research, regions] = await Promise.all([
    client.fetch<ResearchCardType[]>(allResearchQuery, {}, { cache: 'no-store' }),
    client.fetch<HimalayaRegion[]>(regionsQuery, {}, { next: { revalidate: 3600 } }),
  ])
  return { research: research ?? [], regions: regions ?? [] }
}

export default async function ResearchPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; region?: string; year?: string; view?: string }>
}) {
  const params = await searchParams
  const { research, regions } = await getData()

  const categories = [
    { value: 'white-paper', label: 'White Paper' },
    { value: 'policy-brief', label: 'Policy Brief' },
    { value: 'field-report', label: 'Field Report' },
    { value: 'data-report', label: 'Data Report' },
    { value: 'case-study', label: 'Case Study' },
  ]

  const years = Array.from(
    new Set(research.map((r) => new Date(r.publishedAt).getFullYear()).filter(Boolean))
  ).sort((a, b) => b - a)

  const filtered = research.filter((r) => {
    if (params.category && r.category !== params.category) return false
    if (params.region && r.region?.slug?.current !== params.region) return false
    if (params.year && new Date(r.publishedAt).getFullYear().toString() !== params.year) return false
    return true
  })

  const isGrid = params.view === 'grid'

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
      {/* Page header */}
      <div
        style={{
          borderBottom: '1px solid var(--color-border)',
          padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px) 0',
        }}
      >
        <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
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
            Publications
          </p>
          <h1
            style={{
              fontSize: 'clamp(28px, 4vw, 44px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 700,
              color: 'var(--color-text)',
              marginBottom: '32px',
            }}
          >
            Research Library
          </h1>

          <ResearchFilters
            categories={categories}
            regions={regions}
            years={years.map(String)}
            currentCategory={params.category}
            currentRegion={params.region}
            currentYear={params.year}
            currentView={params.view}
          />
        </div>
      </div>

      {/* Results */}
      <div
        style={{
          maxWidth: 'var(--space-wide-max)',
          margin: '0 auto',
          padding: '40px clamp(20px, 4vw, 48px)',
        }}
      >
        <p
          style={{
            fontSize: '13px',
            color: 'var(--color-text-muted)',
            marginBottom: '24px',
            fontFamily: 'var(--font-base)',
          }}
        >
          {filtered.length} publication{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <p style={{ fontSize: '17px', color: 'var(--color-text-muted)' }}>
            No publications match the current filters.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: isGrid
                ? 'repeat(auto-fill, minmax(280px, 1fr))'
                : '1fr',
              gap: '16px',
            }}
          >
            {filtered.map((item) => (
              <ResearchCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
