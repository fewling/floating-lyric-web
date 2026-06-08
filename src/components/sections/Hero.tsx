import { Button } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";
import { PhoneMockup } from "@/components/ui/PhoneMockup";
import { Reveal } from "@/components/ui/Reveal";
import { hero } from "@/content/landing";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div
        className="bg-accent-soft pointer-events-none absolute -top-40 left-1/2 size-[40rem] -translate-x-1/2 rounded-full blur-3xl"
        aria-hidden
      />
      <Container className="grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
        <div>
          <p className="text-fg-muted mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
            Android • Free core, forever
          </p>
          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl">
            {hero.headlineLead} <span className="text-accent">{hero.headlineAccent}</span>
          </h1>
          <p className="text-fg-muted mt-5 max-w-md text-lg text-pretty">{hero.subhead}</p>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <GooglePlayBadge />
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
          {/* Sentinel for the sticky mobile CTA: sits just below the hero's Play
              badge so the persistent bottom bar only appears once this CTA has
              scrolled out of view (see StickyMobileCta). */}
          <div id="hero-end" aria-hidden className="h-px w-full" />
        </div>
        <Reveal className="md:justify-self-end">
          <PhoneMockup />
        </Reveal>
      </Container>
    </section>
  );
}
