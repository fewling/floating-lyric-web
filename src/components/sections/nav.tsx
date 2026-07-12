import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { PlayPill } from '@/components/play-badge'
import { SITE_NAME } from '@/lib/site'

/** The app's note mark (see src/app/icon.svg), inlined so it inherits theme tokens. */
export function NoteMark({ size = 20 }: { size?: number }) {
  return (
    <svg
      viewBox="0 0 32 32"
      width={size}
      height={size}
      aria-hidden="true"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle cx="12" cy="22" r="6" fill="var(--color-note)" />
      <rect
        x="16"
        y="4"
        width="2.4"
        height="19"
        rx="1.2"
        fill="var(--color-ink)"
      />
      <path
        d="M18.4 4c5.5 1 8 5.8 6.4 11.2-1.2-2.8-3.7-4.6-6.4-5.2z"
        fill="var(--color-ink)"
      />
    </svg>
  )
}

export async function Nav({ campaign }: { campaign: string }) {
  const t = await getTranslations('nav')
  return (
    <header className="sticky top-0 z-50 border-b border-ink/10 bg-canvas/90 backdrop-blur">
      <nav className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 sm:px-8">
        <Link href="/" className="flex items-center gap-2">
          <NoteMark />
          <span className="font-display text-lg font-bold">{SITE_NAME}</span>
        </Link>
        <div className="flex items-center gap-5 sm:gap-7">
          <Link
            href="/#features"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            {t('features')}
          </Link>
          <Link
            href="/#works-with"
            className="hidden text-sm text-muted transition-colors hover:text-ink sm:block"
          >
            {t('worksWith')}
          </Link>
          <Link
            href="/faq"
            className="text-sm text-muted transition-colors hover:text-ink"
          >
            {t('faq')}
          </Link>
          <PlayPill campaign={campaign} label={t('getApp')} />
        </div>
      </nav>
    </header>
  )
}
