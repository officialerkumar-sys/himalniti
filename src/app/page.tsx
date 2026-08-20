import Link from 'next/link'
import { sanityFetch } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries/settings'
import StatPanel from '@/components/StatPanel'
import ResearchCard from '@/components/ResearchCard'
import ProjectCard from '@/components/ProjectCard'
import type { SiteSettings } from '@/lib/types'

export const revalidate = 3600

async function getSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings>(siteSettingsQuery)
  } catch {
    return null
  }
}

export default async function HomePage() {
  const settings = await getSettings()

  return (
    <>
      {/* Band 1: Split hero */}
      <section
        style={{
          minHeight: 'calc(100vh - 60px)',
          display: 'grid',
          gridTemplateColumns: '58fr 42fr',
          backgroundColor: 'var(--color-bg)',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: 'clamp(48px, 8vw, 96px) clamp(24px, 5vw, 72px)',
          }}
        >
          <p
            style={{
              fontSize: 'var(--font-size-caption)',
              fontFamily: 'var(--font-base)',
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              fontWeight: 600,
              marginBottom: '24px',
            }}
          >
            Section 8 Non-Profit · Indian Himalaya
          </p>

          <h1
            style={{
              fontSize: 'var(--font-size-display)',
              fontFamily: 'var(--font-base)',
              fontWeight: 700,
              color: 'var(--color-text)',
              lineHeight: 1.1,
              marginBottom: '24px',
              maxWidth: '560px',
            }}
          >
            {settings?.tagline ?? 'Economics-led research for a sustainable Himalayan future'}
          </h1>

          <p
            style={{
              fontSize: '17px',
              fontFamily: 'var(--font-base)',
              color: 'var(--color-text-muted)',
              lineHeight: 1.8,
              maxWidth: '480px',
              marginBottom: '40px',
            }}
          >
            {settings?.missionStatement ??
              'Himal Niti produces field research, economic models, and policy briefs that help governments and operators manage tourism in the Indian Himalaya without degrading the ecosystems it depends on.'}
          </p>

          <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
            <Link
              href="/research"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '44px',
                padding: '0 24px',
                backgroundColor: 'var(--color-accent)',
                color: 'var(--color-dark)',
                fontSize: '14px',
                fontFamily: 'var(--font-base)',
                fontWeight: 600,
                letterSpacing: '0.04em',
                textDecoration: 'none',
                borderRadius: 'var(--radius-card)',
              }}
            >
              Explore Research
            </Link>
            <Link
              href="/get-involved"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '44px',
                padding: '0 24px',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text)',
                fontSize: '14px',
                fontFamily: 'var(--font-base)',
                fontWeight: 500,
                textDecoration: 'none',
                borderRadius: 'var(--radius-card)',
              }}
            >
              Get Involved
            </Link>
          </div>
        </div>

        <div
          style={{
            backgroundColor: 'var(--color-bg-alt)',
            position: 'relative',
            overflow: 'hidden',
            minHeight: '400px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              position: 'absolute',
              inset: 0,
              backgroundImage:
                'repeating-linear-gradient(0deg, transparent, transparent 39px, var(--color-border) 39px, var(--color-border) 40px), repeating-linear-gradient(90deg, transparent, transparent 39px, var(--color-border) 39px, var(--color-border) 40px)',
              opacity: 0.4,
            }}
          />
          <p
            style={{
              position: 'relative',
              zIndex: 1,
              fontSize: '11px',
              color: 'var(--color-text-muted)',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              fontFamily: 'var(--font-base)',
            }}
          >
            Landscape photograph
          </p>
        </div>
      </section>

      {/* Band 2: Key statistics */}
      {settings?.keyStats && settings.keyStats.length > 0 && (
        <StatPanel stats={settings.keyStats} />
      )}

      {/* Band 3: Problem statement */}
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
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-accent)',
              fontWeight: 600,
              fontFamily: 'var(--font-base)',
              marginBottom: '24px',
            }}
          >
            The Problem
          </p>
          <h2
            style={{
              fontSize: 'clamp(22px, 3.5vw, 36px)',
              fontFamily: 'var(--font-base)',
              fontWeight: 600,
              color: 'var(--color-text)',
              lineHeight: 1.25,
              marginBottom: '32px',
            }}
          >
            Tourism is the primary economic driver of the Indian Himalaya — and its primary ecological threat.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '32px' }}>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
              Annual visitor volumes to mountain districts have grown faster than the infrastructure or governance
              frameworks designed to absorb them. The result is concentrated economic benefit at the trailhead,
              degraded ecosystems further in, and communities that bear the costs without proportionate returns.
            </p>
            <p style={{ fontSize: '17px', color: 'var(--color-text-muted)', lineHeight: 1.8, margin: 0 }}>
              Policy responses have tended to be binary — permit freezes or unconstrained access — because regulators
              lack the economic and ecological data to calibrate intermediate positions. Himal Niti exists to produce
              that data and translate it into workable policy instruments.
            </p>
          </div>
        </div>
      </section>

      {/* Band 4: Featured cards */}
      {(settings?.featuredResearch || settings?.featuredProject) && (
        <section
          style={{
            padding: 'var(--space-section) clamp(20px, 4vw, 48px)',
            backgroundColor: 'var(--color-bg-alt)',
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
                marginBottom: '24px',
              }}
            >
              Featured Work
            </p>
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
                gap: '24px',
              }}
            >
              {settings.featuredResearch && (
                <ResearchCard item={settings.featuredResearch} />
              )}
              {settings.featuredProject && (
                <ProjectCard item={settings.featuredProject} />
              )}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
