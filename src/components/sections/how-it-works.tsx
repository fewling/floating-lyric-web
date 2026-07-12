import { home } from '@/content/en/home'

export function HowItWorks() {
  const { heading, steps } = home.howItWorks
  return (
    <section className="mx-auto w-full max-w-6xl px-6 py-20 sm:px-8 lg:py-28">
      <h2 className="font-display text-3xl font-extrabold tracking-tight">
        {heading}
      </h2>
      <ol className="mt-10 grid gap-8 sm:grid-cols-3 sm:gap-6">
        {steps.map((step, i) => (
          <li key={step.title} className="flex gap-4">
            {/* The <ol> already numbers the steps for assistive tech. */}
            <span
              aria-hidden="true"
              className="grid h-7 w-7 shrink-0 place-items-center rounded-chip bg-hilite font-bold text-ink"
            >
              {i + 1}
            </span>
            <div>
              <h3 className="font-semibold">{step.title}</h3>
              <p className="mt-1 text-sm text-muted">{step.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </section>
  )
}
