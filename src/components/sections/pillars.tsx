import { home } from '@/content/en/home'

export function Pillars() {
  return (
    <section className="bg-surface py-20 lg:py-28">
      <div className="mx-auto grid w-full max-w-6xl gap-5 px-6 sm:px-8 lg:grid-cols-3">
        {home.pillars.map((pillar, i) => (
          <div
            key={pillar.title}
            // The tonal/canvas fills sit at ~1.14:1 against the surface band,
            // so every card carries a ring — the boundary never relies on
            // fill contrast alone.
            className={`rounded-[1.25rem] p-6 ring-1 ring-ink/8 ${
              i === 1 ? 'bg-tonal' : 'bg-canvas'
            }`}
          >
            <h2 className="font-display text-lg font-bold">{pillar.title}</h2>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              {pillar.detail}
            </p>
          </div>
        ))}
      </div>
    </section>
  )
}
