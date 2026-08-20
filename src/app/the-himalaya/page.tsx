import { sanityFetch } from '@/lib/sanity/client'
import { allIndicatorsQuery } from '@/lib/sanity/queries/indicators'
import { regionsQuery } from '@/lib/sanity/queries/settings'
import IndicatorPanel from '@/components/IndicatorPanel'
import type { Indicator, HimalayaRegion } from '@/lib/types'
import type { Metadata } from 'next'

export const revalidate = 86400
export const metadata: Metadata = { title: 'The Himalaya' }

const TOURISM_PRESSURE_DATA = [
  { region: 'Spiti Valley', metric: 'Annual visitors (est.)', value: '90,000+', trend: 'Rising', note: '8× increase since 2012' },
  { region: 'Spiti Valley', metric: 'Registered homestays', value: '340', trend: 'Rising', note: '' },
  { region: 'Lahaul', metric: 'Annual visitors (est.)', value: '55,000', trend: 'Rising', note: 'Post-Atal Tunnel effect' },
  { region: 'Kinnaur', metric: 'Annual visitors (est.)', value: '1.2 million', trend: 'Rising', note: 'Including transit' },
  { region: 'Uttarakhand High Himalaya', metric: 'Trekking permits issued', value: '~80,000', trend: 'Stable', note: 'Regulated zone' },
  { region: 'Sikkim', metric: 'Restricted area permits', value: '22,000', trend: 'Rising', note: '' },
]

const REGIONAL_FOCUS = [
  { region: 'Spiti Valley', state: 'Himachal Pradesh', phase: 'Phase 1 — Active', keyIssue: 'Carrying capacity threshold; waste system capacity' },
  { region: 'Lahaul', state: 'Himachal Pradesh', phase: 'Phase 1 — Active', keyIssue: 'Atal Tunnel economic spill-over; seasonal labour displacement' },
  { region: 'Kinnaur', state: 'Himachal Pradesh', phase: 'Phase 2 — Planned', keyIssue: 'Transit vs. destination tourism economics' },
  { region: 'Nubra Valley', state: 'Ladakh (UT)', phase: 'Phase 2 — Planned', keyIssue: 'Remote area premium pricing; community revenue share' },
  { region: 'Chopta–Tungnath', state: 'Uttarakhand', phase: 'Phase 2 — Planned', keyIssue: 'Religious vs. recreational visitor flow management' },
]

async function getData() {
  const [indicators, regions] = await Promise.all([
    sanityFetch<Indicator[]>(allIndicatorsQuery, {}, { next: { revalidate: 86400 } }),
    sanityFetch<HimalayaRegion[]>(regionsQuery, {}, { next: { revalidate: 86400 } }),
  ])
  return { indicators: indicators ?? [], regions: regions ?? [] }
}

export default async function TheHimalayaPage() {
  const { indicators, regions } = await getData()

  return (
    <div style={{ backgroundColor: 'var(--color-bg)' }}>
      {/* Header */}
      <div style={{ borderBottom: '1px solid var(--color-border)', padding: 'clamp(40px, 6vw, 72px) clamp(20px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-accent)', fontWeight: 600, fontFamily: 'var(--font-base)', marginBottom: '12px' }}>
            Field Context
          </p>
          <h1 style={{ fontSize: 'clamp(28px, 4vw, 44px)', fontFamily: 'var(--font-base)', fontWeight: 700, color: 'var(--color-text)', marginBottom: '20px' }}>
            The Himalaya
          </h1>
          <p style={{ fontSize: '19px', fontFamily: 'var(--font-base)', color: 'var(--color-text-muted)', lineHeight: 1.8, maxWidth: '640px', margin: 0 }}>
            Himal Niti works across the Indian Himalayan range — from Himachal Pradesh and
            Ladakh to Uttarakhand and Sikkim. The data below tracks ecosystem and economic
            indicators across active research zones. Updated every 24 hours.
          </p>
        </div>
      </div>

      {/* Ecosystem indicators */}
      <section style={{ padding: 'var(--space-section) clamp(20px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, fontFamily: 'var(--font-base)', marginBottom: '24px' }}>
            Ecosystem &amp; Economic Indicators
          </p>
          {indicators.length > 0 ? (
            <IndicatorPanel indicators={indicators} />
          ) : (
            <p style={{ fontSize: '15px', color: 'var(--color-text-muted)' }}>
              Indicator data will appear here once added in the CMS.
            </p>
          )}
        </div>
      </section>

      {/* Tourism pressure */}
      <section style={{ padding: 'var(--space-section) clamp(20px, 4vw, 48px)', backgroundColor: 'var(--color-bg-alt)', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, fontFamily: 'var(--font-base)', marginBottom: '24px' }}>
            Tourism Pressure Data
          </p>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 2fr', backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)', padding: '12px 16px' }}>
              {['Region', 'Metric', 'Value', 'Trend', 'Note'].map((h) => (
                <span key={h} style={{ fontSize: '11px', fontFamily: 'var(--font-base)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{h}</span>
              ))}
            </div>
            {TOURISM_PRESSURE_DATA.map((row, i) => (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1.5fr 1fr 1fr 2fr', padding: '14px 16px', borderBottom: i < TOURISM_PRESSURE_DATA.length - 1 ? '1px solid var(--color-border)' : 'none', alignItems: 'start' }}>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-base)', color: 'var(--color-text)', fontWeight: 500 }}>{row.region}</span>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-base)', color: 'var(--color-text-muted)' }}>{row.metric}</span>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-base)', color: 'var(--color-text)', fontWeight: 600 }}>{row.value}</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-base)', color: row.trend === 'Rising' ? '#C0392B' : row.trend === 'Stable' ? 'var(--color-text-muted)' : 'var(--color-green)' }}>{row.trend}</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-base)', color: 'var(--color-text-muted)' }}>{row.note}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Regional focus */}
      <section style={{ padding: 'var(--space-section) clamp(20px, 4vw, 48px)' }}>
        <div style={{ maxWidth: 'var(--space-wide-max)', margin: '0 auto' }}>
          <p style={{ fontSize: 'var(--font-size-caption)', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-text-muted)', fontWeight: 600, fontFamily: 'var(--font-base)', marginBottom: '24px' }}>
            Regional Focus
          </p>
          <div style={{ border: '1px solid var(--color-border)', borderRadius: 'var(--radius-card)', overflow: 'hidden', backgroundColor: 'var(--color-bg)' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 2fr', padding: '12px 16px', backgroundColor: 'var(--color-bg-alt)', borderBottom: '1px solid var(--color-border)' }}>
              {['Region', 'State', 'Phase', 'Key Issue'].map((h) => (
                <span key={h} style={{ fontSize: '11px', fontFamily: 'var(--font-base)', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-text-muted)' }}>{h}</span>
              ))}
            </div>
            {(regions.length > 0 ? regions.map((r, i) => ({ region: r.name, state: r.state, phase: r.phase === 'phase-1' ? 'Phase 1 — Active' : 'Phase 2 — Planned', keyIssue: '—', isActive: r.phase === 'phase-1', id: r._id, last: i === regions.length - 1 })) : REGIONAL_FOCUS.map((r, i) => ({ ...r, isActive: r.phase.includes('Active'), id: String(i), last: i === REGIONAL_FOCUS.length - 1 }))).map((row) => (
              <div key={row.id} style={{ display: 'grid', gridTemplateColumns: '1.5fr 1fr 1fr 2fr', padding: '14px 16px', borderBottom: row.last ? 'none' : '1px solid var(--color-border)', alignItems: 'start' }}>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-base)', color: 'var(--color-text)', fontWeight: 500 }}>{row.region}</span>
                <span style={{ fontSize: '14px', fontFamily: 'var(--font-base)', color: 'var(--color-text-muted)' }}>{row.state}</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-base)', color: row.isActive ? 'var(--color-green)' : 'var(--color-text-muted)', fontWeight: 500 }}>{row.phase}</span>
                <span style={{ fontSize: '13px', fontFamily: 'var(--font-base)', color: 'var(--color-text-muted)', lineHeight: 1.6 }}>{row.keyIssue}</span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
