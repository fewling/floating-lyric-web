import { getTranslations } from 'next-intl/server'
import { OverlayDemoLoader } from '@/components/overlay-demo/loader'
import { PlayBadge } from '@/components/play-badge'
import { home } from '@/content/en/home'
import { HIGHLIGHT } from './copy-slices'

// Splitting the content string (instead of hardcoding the surrounding copy)
// guarantees the rendered h1 always equals home.h1 textually — screen
// readers read it as one uninterrupted sentence. Guarded by
// content-integrity.test.ts.
export { HIGHLIGHT }

export async function Hero({ campaign }: { campaign: string }) {
  const t = await getTranslations()
  const [before, after] = home.h1.split(HIGHLIGHT)
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-14 pb-20 sm:px-8 lg:pt-24 lg:pb-28">
      <div className="grid items-center gap-16 lg:grid-cols-[1fr_auto] lg:gap-20">
        <div>
          <h1 className="font-display text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl">
            {before}
            <span className="rounded-lg bg-hilite box-decoration-clone px-2">
              {HIGHLIGHT}
            </span>
            {after}
          </h1>
          <p className="mt-6 max-w-md text-lg text-muted">{home.sub}</p>
          <div className="mt-10 flex flex-wrap items-center gap-6">
            <PlayBadge campaign={campaign} alt={t('cta.playBadgeAlt')} />
            <a
              href="#demo"
              className="text-sm underline underline-offset-4 transition-colors hover:text-muted"
            >
              {t('cta.tryDemo')} <span aria-hidden="true">↓</span>
            </a>
          </div>
        </div>
        <div
          id="demo"
          className="relative scroll-mt-24 justify-self-center lg:justify-self-end"
        >
          <OverlayDemoLoader
            labels={{
              regionLabel: t('demo.regionLabel'),
              dragHandle: t('demo.dragHandle'),
              translateToggle: t('demo.translateToggle'),
            }}
          />
          <span
            aria-hidden="true"
            className="absolute -top-3 -right-4 rotate-[-4deg] rounded-chip bg-hilite px-3 py-1 text-xs font-bold text-ink"
          >
            {t('demo.liveBadge')}
          </span>
        </div>
      </div>
    </section>
  )
}
