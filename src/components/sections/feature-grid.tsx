import { getTranslations } from 'next-intl/server'
import { home } from '@/content/en/home'

/** The card that carries the site's recurring bilingual-pair motif. */
const BILINGUAL_CARD_TITLE = 'AI translation'

export async function FeatureGrid() {
  const t = await getTranslations('nav')
  return (
    <section
      id="features"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-20 sm:px-8 lg:pb-28"
    >
      <h2 className="sr-only">{t('features')}</h2>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {home.features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-[1.25rem] bg-surface p-5 ring-1 ring-ink/8"
          >
            <h3 className="font-semibold">{feature.title}</h3>
            <p className="mt-1.5 text-sm text-muted">{feature.detail}</p>
            {feature.title === BILINGUAL_CARD_TITLE && (
              <p className="mt-4 border-t border-ink/8 pt-3">
                <span lang="ko" className="block font-kr text-xs text-muted">
                  마침내 이해할 수 있어
                </span>
                <span className="mt-0.5 block font-display text-xs font-bold text-ink">
                  at last, I understand
                </span>
              </p>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}
