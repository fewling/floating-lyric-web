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
      <Container className="grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <p className="text-fg-muted mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs">
            Android • Free core, forever
          </p>
          <h1 className="font-display text-4xl leading-[1.1] font-bold tracking-tight md:text-6xl">
            {hero.headlineLead} <span className="text-accent">{hero.headlineAccent}</span>
          </h1>
          <p className="text-fg-muted mt-6 max-w-xl text-lg">{hero.subhead}</p>
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <GooglePlayBadge />
            <Button href={hero.secondary.href} variant="ghost">
              {hero.secondary.label}
            </Button>
          </div>
        </div>
        <Reveal className="md:justify-self-end">
          <PhoneMockup />
        </Reveal>
      </Container>
    </section>
  );
}
