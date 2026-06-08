import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { fandoms } from "@/content/landing";

export function Fandoms() {
  return (
    <Section>
      <SectionHeading
        eyebrow="Made for fandoms"
        title="The song hits different when you understand it"
      />
      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {fandoms.map((quote) => (
          <Reveal key={quote}>
            <figure className="from-surface/60 to-surface-2/40 h-full rounded-2xl border border-white/10 bg-linear-to-b p-6">
              <blockquote className="font-display text-lg">“{quote}”</blockquote>
            </figure>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
