import type { Metadata, Viewport } from 'next'
import { getTranslations } from 'next-intl/server'
import { bricolage, figtree, jetbrains, notoKr } from './fonts'
import { SITE_NAME, SITE_ORIGIN } from '@/lib/site'
import './globals.css'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: {
    default:
      'Floating Lyrics — Lyrics Overlay for Android, Synced & Translated',
    template: `%s — ${SITE_NAME}`,
  },
  description:
    'Floating Lyrics shows synced lyrics in a floating overlay on top of Spotify, YouTube Music, games, and any Android app — with instant AI translation. Free, no account.',
}

export const viewport: Viewport = { themeColor: '#f4f3ec' }

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const t = await getTranslations('nav')
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable} ${notoKr.variable}`}
    >
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-100 focus:rounded-chip focus:bg-ink focus:px-4 focus:py-2 focus:text-sm focus:font-medium focus:text-canvas focus:outline-2 focus:outline-offset-2 focus:outline-hilite"
        >
          {t('skipToContent')}
        </a>
        {children}
      </body>
    </html>
  )
}
