import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { steps } from "@/content/landing";

export function HowItWorks() {
  return (
    <Section id="how">
      <SectionHeading
        eyebrow="How it works"
        title="From install to floating lyrics in under a minute"
      />
      <div className="mt-12 grid gap-8 md:grid-cols-3">
        {steps.map((step) => (
          <Reveal key={step.n}>
            <div>
              <span className="font-display text-accent/55 text-5xl font-bold">
                {String(step.n).padStart(2, "0")}
              </span>
              <h3 className="font-display mt-2 text-xl font-semibold">{step.title}</h3>
              <p className="text-fg-muted mt-2">{step.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
