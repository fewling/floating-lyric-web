import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/content/landing";

export function Features() {
  return (
    <Section id="features" className="bg-surface/30">
      <SectionHeading
        title="Everything you need to sing along"
        subtitle="A focused set of tools that do one thing brilliantly: keep the right lyrics in front of you."
      />
      <div className="mx-auto mt-12 grid max-w-5xl gap-4 sm:grid-cols-2">
        {features.map((feature) => (
          <Reveal key={feature.title}>
            <div className="bg-surface/85 border-edge rounded-2xl border p-6 backdrop-blur">
              <div className="text-accent mb-3">
                <Icon name={feature.icon} />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="text-fg-muted mt-1.5 text-sm">{feature.body}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
