import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { faq } from '@/content/en/faq'
import { home } from '@/content/en/home'

export async function FaqTeaser() {
  const t = await getTranslations('nav')
  // faq.ts stays the single source; the teaser picks entries in
  // faqTeaserIds order.
  const entries = home.faqTeaserIds
    .map((id) => faq.find((entry) => entry.id === id))
    .filter((entry) => entry !== undefined)
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pb-20 sm:px-8 lg:pb-28">
      <h2 className="sr-only">{t('faq')}</h2>
      <div className="grid gap-4">
        {entries.map((entry) => (
          <details
            key={entry.id}
            className="group rounded-[1.25rem] bg-surface px-6 py-5 ring-1 ring-ink/8"
          >
            <summary className="flex cursor-pointer list-none items-baseline justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {entry.question}
              <span
                aria-hidden="true"
                className="shrink-0 font-display text-lg leading-none text-muted"
              >
                <span className="group-open:hidden">+</span>
                <span className="hidden group-open:inline">−</span>
              </span>
            </summary>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted">
              {entry.answer}
            </p>
          </details>
        ))}
      </div>
      <Link
        href="/faq"
        className="mt-8 inline-block text-sm underline underline-offset-4 transition-colors hover:text-muted"
      >
        All questions →
      </Link>
    </section>
  )
}
