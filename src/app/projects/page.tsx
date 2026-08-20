import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { allProjectsQuery } from '@/lib/sanity/queries/projects'
import ProjectCard from '@/components/ProjectCard'
import type { ProjectCard as ProjectCardType } from '@/lib/types'

export const metadata = { title: 'Projects' }

const STATUS_FILTERS = [
  { value: '', label: 'All' },
  { value: 'active', label: 'Active' },
  { value: 'completed', label: 'Completed' },
  { value: 'forthcoming', label: 'Forthcoming' },
]

async function getProjects(): Promise<ProjectCardType[]> {
  try {
    return await client.fetch(allProjectsQuery, {}, { cache: 'no-store' })
  } catch {
    return []
  }
}

export default async function ProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string }>
}) {
  const params = await searchParams
  const projects = await getProjects()

  const filtered = projects.filter((p) => {
    if (params.status && p.status !== params.status) return false
    return true
  })

  return (
    <div style={{ backgroundColor: 'var(--color-bg)', minHeight: '100vh' }}>
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
            Field Work
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
            Projects
          </h1>

          {/* Status filter */}
          <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap', paddingBottom: '24px' }}>
            {STATUS_FILTERS.map((f) => (
              <Link
                key={f.value}
                href={f.value ? `/projects?status=${f.value}` : '/projects'}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  height: '32px',
                  padding: '0 14px',
                  border: '1px solid var(--color-border)',
                  borderRadius: 'var(--radius-card)',
                  fontSize: '13px',
                  fontFamily: 'var(--font-base)',
                  textDecoration: 'none',
                  backgroundColor:
                    (params.status ?? '') === f.value
                      ? 'var(--color-dark)'
                      : 'var(--color-bg)',
                  color:
                    (params.status ?? '') === f.value ? '#fff' : 'var(--color-text-muted)',
                  transition: 'all var(--transition-base)',
                }}
              >
                {f.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

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
          {filtered.length} project{filtered.length !== 1 ? 's' : ''}
        </p>

        {filtered.length === 0 ? (
          <p style={{ fontSize: '17px', color: 'var(--color-text-muted)' }}>
            No projects found.
          </p>
        ) : (
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
              gap: '24px',
            }}
          >
            {filtered.map((item) => (
              <ProjectCard key={item._id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
