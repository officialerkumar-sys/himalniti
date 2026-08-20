import { groq } from 'next-sanity'

export const allIndicatorsQuery = groq`
  *[_type == "indicator"] | order(category asc, name asc) {
    _id,
    name,
    category,
    status,
    currentValue,
    trend,
    updatedAt,
    note,
    "region": region->{ name, slug }
  }
`

export const indicatorsByRegionQuery = groq`
  *[_type == "indicator" && region->slug.current == $region] {
    _id,
    name,
    category,
    status,
    currentValue,
    trend,
    updatedAt,
    note
  }
`
