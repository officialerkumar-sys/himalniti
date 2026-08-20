export interface Region {
  name: string
  slug: { current: string }
  state?: string
}

export interface ResearchCard {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  category: string
  abstract: string
  keyFindings?: string[]
  authors?: string[]
  tags?: string[]
  featured?: boolean
  region?: { name: string; slug?: { current: string } }
  hasPdf?: boolean
}

export interface ResearchDetail {
  _id: string
  title: string
  slug: { current: string }
  publishedAt: string
  category: string
  abstract: string
  keyFindings?: string[]
  authors?: string[]
  tags?: string[]
  featured?: boolean
  body?: unknown[]
  region?: { name: string; state?: string }
  pdfUrl?: string
  coverImageUrl?: string
}

export interface ProjectCard {
  _id: string
  title: string
  slug: { current: string }
  status: 'active' | 'completed' | 'forthcoming'
  startDate?: string
  endDate?: string
  summary: string
  featured?: boolean
  region?: { name: string; slug?: { current: string } }
  coverImageUrl?: string
}

export interface ProjectDetail {
  _id: string
  title: string
  slug: { current: string }
  status: 'active' | 'completed' | 'forthcoming'
  startDate?: string
  endDate?: string
  summary: string
  featured?: boolean
  body?: unknown[]
  partners?: string[]
  region?: { name: string; state?: string; slug?: { current: string } }
  coverImageUrl?: string
  outputs?: ResearchCard[]
}

export interface Indicator {
  _id: string
  name: string
  category: 'ecosystem' | 'tourism-pressure' | 'economic' | 'social'
  status: 'stable' | 'at-risk' | 'critical'
  currentValue: string
  trend: 'improving' | 'stable' | 'declining'
  updatedAt: string
  note?: string
  region?: { name: string; slug: { current: string } }
}

export interface KeyStat {
  figure: string
  label: string
  color: 'accent' | 'green'
}

export interface SiteSettings {
  tagline?: string
  missionStatement?: string
  contactEmail?: string
  linkedinUrl?: string
  eklahimalUrl?: string
  keyStats?: KeyStat[]
  featuredResearch?: ResearchCard
  featuredProject?: ProjectCard
}

export interface TeamMember {
  _id: string
  name: string
  role: string
  bio: string
  isFounder: boolean
  linkedinUrl?: string
  order: number
  photoUrl?: string
}

export interface HimalayaRegion {
  _id: string
  name: string
  slug: { current: string }
  state: string
  country: string
  altitudeRange?: string
  phase: 'phase-1' | 'phase-2'
}
