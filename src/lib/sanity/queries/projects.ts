import { groq } from 'next-sanity'

export const allProjectsQuery = groq`
  *[_type == "project"] | order(startDate desc) {
    _id,
    title,
    slug,
    status,
    startDate,
    endDate,
    summary,
    featured,
    "region": region->{ name, slug },
    "coverImageUrl": coverImage.asset->url
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    status,
    startDate,
    endDate,
    summary,
    body,
    partners,
    "region": region->{ name, state, slug },
    "coverImageUrl": coverImage.asset->url,
    "outputs": outputs[]->{ _id, title, slug, category, publishedAt, abstract }
  }
`

export const featuredProjectQuery = groq`
  *[_type == "project" && featured == true] | order(startDate desc)[0] {
    _id,
    title,
    slug,
    status,
    summary,
    "region": region->{ name }
  }
`
