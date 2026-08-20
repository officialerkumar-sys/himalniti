import { createClient } from 'next-sanity'

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET ?? 'production',
  apiVersion: '2024-01-01',
  useCdn: process.env.NODE_ENV === 'production',
})

type CacheOptions =
  | { cache: RequestCache; next?: never }
  | { next: { revalidate?: number | false; tags?: string[] }; cache?: never }

export async function sanityFetch<T>(
  query: string,
  params: Record<string, unknown> = {},
  cacheOptions: CacheOptions = { next: { revalidate: 3600 } }
): Promise<T> {
  const fetchOptions = 'cache' in cacheOptions && cacheOptions.cache
    ? { cache: cacheOptions.cache }
    : { next: (cacheOptions as { next: { revalidate?: number | false } }).next }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (client as any).fetch(query, params, fetchOptions) as Promise<T>
}
