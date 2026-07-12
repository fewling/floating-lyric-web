import type { Metadata, Viewport } from 'next'
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html
      lang="en"
      className={`${bricolage.variable} ${figtree.variable} ${jetbrains.variable} ${notoKr.variable}`}
    >
      <body>{children}</body>
    </html>
  )
}
