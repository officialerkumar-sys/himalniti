import { groq } from 'next-sanity'

export const allResearchQuery = groq`
  *[_type == "research"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    publishedAt,
    category,
    abstract,
    keyFindings,
    authors,
    tags,
    featured,
    "region": region->{ name, slug },
    "hasPdf": defined(pdfFile)
  }
`

export const researchBySlugQuery = groq`
  *[_type == "research" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    publishedAt,
    authors,
    category,
    abstract,
    body,
    keyFindings,
    tags,
    "region": region->{ name, state },
    "pdfUrl": pdfFile.asset->url,
    "coverImageUrl": coverImage.asset->url
  }
`

export const featuredResearchQuery = groq`
  *[_type == "research" && featured == true] | order(publishedAt desc)[0] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    abstract,
    "region": region->{ name },
    "hasPdf": defined(pdfFile)
  }
`

export const relatedResearchQuery = groq`
  *[_type == "research" && slug.current != $slug && category == $category] | order(publishedAt desc)[0..1] {
    _id,
    title,
    slug,
    publishedAt,
    category,
    abstract,
    "region": region->{ name },
    "hasPdf": defined(pdfFile)
  }
`
