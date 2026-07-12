import { getTranslations } from 'next-intl/server'
import { PlayBadge } from '@/components/play-badge'
import { home } from '@/content/en/home'

/**
 * The accent slice of home.ctaBand.heading. Derived by splitting the content
 * string so the rendered heading always equals it textually. Hilite text is
 * permitted here because the band is dark (ink), where it passes contrast.
 */
const ACCENT = 'in your words'

export async function CtaBand({ campaign }: { campaign: string }) {
  const t = await getTranslations('cta')
  const [before, after] = home.ctaBand.heading.split(ACCENT)
  return (
    <section className="px-6 pb-20 sm:px-8 lg:pb-28">
      <div className="mx-auto max-w-6xl rounded-[1.75rem] bg-ink p-12 text-center lg:p-16">
        <h2 className="font-display text-3xl font-extrabold tracking-tight text-balance text-canvas">
          {before}
          <span className="text-hilite">{ACCENT}</span>
          {after}
        </h2>
        <div className="mt-8 flex justify-center">
          <PlayBadge campaign={campaign} alt={t('playBadgeAlt')} />
        </div>
      </div>
    </section>
  )
}
