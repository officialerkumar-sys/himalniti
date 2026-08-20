import type { Metadata } from 'next'
import './globals.css'
import Nav from '@/components/Nav'
import Footer from '@/components/Footer'
import { client } from '@/lib/sanity/client'
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
    return await client.fetch(siteSettingsQuery, {}, { next: { revalidate: 3600 } })
  } catch {
    return null
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const settings = await getSettings()

  return (
    <html lang="en">
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
