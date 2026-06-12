import { HeroDemo } from "@/components/hero-demo/HeroDemo";
import { Container } from "@/components/ui/Container";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";
import { hero } from "@/content/landing";

/**
 * Demo-led hero (spec §3): the live overlay demo IS the pitch. Server
 * component — HeroDemo is the only client island inside.
 *
 * Layout: two columns on lg (text left, demo right). On mobile the grid
 * stacks in DOM order — headline → demo → CTAs — so the demo stays near the
 * top of the fold; explicit col/row placements regroup the text column on lg.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* Accent glow backdrop, biased toward the demo column. */}
      <div
        aria-hidden
        className="bg-accent-soft pointer-events-none absolute -top-32 left-1/2 size-[40rem] -translate-x-1/3 rounded-full blur-3xl"
      />
      <Container className="py-24 sm:py-32">
        <div className="grid items-center gap-12 lg:grid-cols-[1.1fr_0.9fr] lg:gap-x-16 lg:gap-y-10">
          <div className="reveal lg:col-start-1 lg:row-start-1 lg:self-end">
            <h1 className="font-display text-4xl leading-[1.05] font-bold tracking-tight text-balance sm:text-5xl lg:text-6xl">
              {hero.headlineLead}{" "}
              <span className="text-accent [text-shadow:0_0_28px_color-mix(in_oklab,var(--accent)_45%,transparent)]">
                {hero.headlineAccent}
              </span>
            </h1>
            <p className="text-fg-muted mt-6 max-w-md text-lg text-pretty">{hero.subhead}</p>
          </div>
          <div className="relative lg:col-start-2 lg:row-span-2 lg:row-start-1">
            <div
              aria-hidden
              className="bg-accent-soft pointer-events-none absolute top-1/2 left-1/2 size-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl"
            />
            <div className="hero-float">
              <HeroDemo />
            </div>
          </div>
          <div className="reveal flex flex-wrap items-center gap-x-6 gap-y-4 lg:col-start-1 lg:row-start-2 lg:self-start">
            <GooglePlayBadge />
            <a
              href={hero.secondary.href}
              className="text-fg-muted hover:text-fg inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            >
              {hero.secondary.label}
              <span aria-hidden>↓</span>
            </a>
          </div>
        </div>
        {/* Sentinel for the sticky mobile CTA: StickyMobileCta (page.tsx passes
            sentinelId="hero-end") shows its bottom bar only once this line has
            scrolled out of view — i.e. once the hero's own Play badge is gone. */}
        <div id="hero-end" aria-hidden className="h-px w-full" />
      </Container>
    </section>
  );
}
