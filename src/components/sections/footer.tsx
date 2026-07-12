import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import { home } from '@/content/en/home'
import { intentPages } from '@/content/en/intent'
import { SITE_NAME } from '@/lib/site'
import { NoteMark } from './nav'

/**
 * Short link label for an intent page, taken from its proof chip ('over
 * Spotify' → 'Spotify') so the "Also works over" group label supplies the
 * preposition exactly once.
 */
function intentLabel(slug: string): string {
  const chip = home.proofChips.find((c) => c.slug === slug)
  return chip ? chip.label.replace(/^(over|while)\s+/, '') : slug
}

export async function Footer() {
  const t = await getTranslations()
  return (
    <footer className="border-t border-ink/10">
      <div className="mx-auto w-full max-w-6xl px-6 py-14 sm:px-8">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-center gap-2">
            <NoteMark />
            <span className="text-sm text-muted">{t('footer.tagline')}</span>
          </div>
          <div className="flex flex-col gap-8 text-sm sm:flex-row sm:gap-14">
            <div>
              <h2 className="font-mono text-xs font-medium tracking-[0.15em] text-muted uppercase">
                {t('footer.alsoWorksOver')}
              </h2>
              <ul className="mt-3 space-y-2">
                {intentPages.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/${page.slug}`}
                      className="text-muted transition-colors hover:text-ink"
                    >
                      {intentLabel(page.slug)}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/faq"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {t('nav.faq')}
                </Link>
              </li>
              <li>
                <Link
                  href="/privacy"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {t('footer.privacy')}
                </Link>
              </li>
              <li>
                <a
                  href="https://github.com/fewling/flutter-floating-lyric"
                  rel="noopener"
                  target="_blank"
                  className="text-muted transition-colors hover:text-ink"
                >
                  {t('footer.github')}
                </a>
              </li>
            </ul>
          </div>
        </div>
        <p className="mt-12 text-xs text-muted">
          © {new Date().getFullYear()} {SITE_NAME}
        </p>
      </div>
    </footer>
  )
}
