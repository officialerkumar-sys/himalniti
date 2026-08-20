'use client'

import { useRouter, usePathname, useSearchParams } from 'next/navigation'
import { useCallback } from 'react'
import type { HimalayaRegion } from '@/lib/types'

interface Props {
  categories: { value: string; label: string }[]
  regions: HimalayaRegion[]
  years: string[]
  currentCategory?: string
  currentRegion?: string
  currentYear?: string
  currentView?: string
}

const SELECT_STYLE: React.CSSProperties = {
  height: '36px',
  padding: '0 32px 0 12px',
  border: '1px solid var(--color-border)',
  borderRadius: 'var(--radius-card)',
  backgroundColor: 'var(--color-bg)',
  color: 'var(--color-text)',
  fontSize: '13px',
  fontFamily: 'var(--font-base)',
  appearance: 'none',
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%23748090' stroke-width='1.5' fill='none' stroke-linecap='round'/%3E%3C/svg%3E\")",
  backgroundRepeat: 'no-repeat',
  backgroundPosition: 'right 10px center',
  cursor: 'pointer',
}

export default function ResearchFilters({
  categories,
  regions,
  years,
  currentCategory,
  currentRegion,
  currentYear,
  currentView,
}: Props) {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const updateParam = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value) {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      router.push(`${pathname}?${params.toString()}`)
    },
    [router, pathname, searchParams]
  )

  return (
    <div
      style={{
        display: 'flex',
        gap: '12px',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingBottom: '24px',
      }}
    >
      <select
        value={currentCategory ?? ''}
        onChange={(e) => updateParam('category', e.target.value)}
        style={SELECT_STYLE}
        aria-label="Filter by category"
      >
        <option value="">All categories</option>
        {categories.map((c) => (
          <option key={c.value} value={c.value}>
            {c.label}
          </option>
        ))}
      </select>

      <select
        value={currentRegion ?? ''}
        onChange={(e) => updateParam('region', e.target.value)}
        style={SELECT_STYLE}
        aria-label="Filter by region"
      >
        <option value="">All regions</option>
        {regions.map((r) => (
          <option key={r._id} value={r.slug.current}>
            {r.name}
          </option>
        ))}
      </select>

      <select
        value={currentYear ?? ''}
        onChange={(e) => updateParam('year', e.target.value)}
        style={SELECT_STYLE}
        aria-label="Filter by year"
      >
        <option value="">All years</option>
        {years.map((y) => (
          <option key={y} value={y}>
            {y}
          </option>
        ))}
      </select>

      <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
        {[
          { value: '', label: '☰ List' },
          { value: 'grid', label: '⊞ Grid' },
        ].map((v) => (
          <button
            key={v.value}
            onClick={() => updateParam('view', v.value)}
            style={{
              height: '36px',
              padding: '0 14px',
              border: '1px solid var(--color-border)',
              borderRadius: 'var(--radius-card)',
              backgroundColor:
                (currentView ?? '') === v.value ? 'var(--color-dark)' : 'var(--color-bg)',
              color:
                (currentView ?? '') === v.value ? '#fff' : 'var(--color-text-muted)',
              fontSize: '12px',
              fontFamily: 'var(--font-base)',
              cursor: 'pointer',
              transition: 'all var(--transition-base)',
            }}
          >
            {v.label}
          </button>
        ))}
      </div>
    </div>
  )
}
