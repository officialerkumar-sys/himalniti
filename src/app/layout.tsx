import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { sanityFetch } from '@/lib/sanity/client'
import { siteSettingsQuery } from '@/lib/sanity/queries/settings'
import type { SiteSettings } from '@/lib/types'

export const metadata: Metadata = {
  title: {
    default: 'Himal Niti — Sustainable Tourism Economics',
    template: '%s | Himal Niti',
  },
  description:
    'Research and policy organisation for sustainable tourism economics in the Indian Himalaya.',
}

async function getSettings(): Promise<SiteSettings | null> {
  try {
    return await sanityFetch<SiteSettings>(siteSettingsQuery, {}, { next: { revalidate: 3600 } })
  } catch {
    return null
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Nav />
        <main style={{ flex: 1, paddingTop: '60px' }}>{children}</main>
        <Footer
          contactEmail={settings?.contactEmail}
          linkedinUrl={settings?.linkedinUrl}
          eklahimalUrl={settings?.eklahimalUrl}
        />
      </body>
    </html>
  )
}
