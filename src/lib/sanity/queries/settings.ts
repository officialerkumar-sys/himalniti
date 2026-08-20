import { groq } from 'next-sanity'

export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    tagline,
    missionStatement,
    contactEmail,
    linkedinUrl,
    eklahimalUrl,
    keyStats,
    "featuredResearch": featuredResearch->{ _id, title, slug, category, abstract, publishedAt, "region": region->{ name } },
    "featuredProject": featuredProject->{ _id, title, slug, status, summary, "region": region->{ name } }
  }
`

export const teamMembersQuery = groq`
  *[_type == "teamMember"] | order(isFounder desc, order asc) {
    _id,
    name,
    role,
    bio,
    isFounder,
    linkedinUrl,
    order,
    "photoUrl": photo.asset->url
  }
`

export const regionsQuery = groq`
  *[_type == "himalayaRegion"] | order(name asc) {
    _id,
    name,
    slug,
    state,
    country,
    altitudeRange,
    phase
  }
`
