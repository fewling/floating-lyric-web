import Link from 'next/link'
import { home } from '@/content/en/home'

export function ProofStrip() {
  return (
    <section
      id="works-with"
      className="mx-auto w-full max-w-6xl scroll-mt-24 px-6 pb-20 sm:px-8 lg:pb-24"
    >
      <h2 className="font-mono text-xs font-medium tracking-[0.2em] text-muted">
        WORKS WITH
      </h2>
      <ul className="mt-5 flex flex-wrap gap-3">
        {home.proofChips.map((chip) => (
          <li key={chip.slug}>
            <Link
              href={`/${chip.slug}`}
              className="block rounded-chip bg-surface px-4 py-2 text-sm font-medium ring-1 ring-ink/8 transition-shadow hover:ring-ink/25"
            >
              {chip.label}
            </Link>
          </li>
        ))}
      </ul>
    </section>
  )
}
