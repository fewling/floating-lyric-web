import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { features } from "@/content/landing";

export function Features() {
  return (
    <Section id="features" className="bg-surface/30">
      <SectionHeading
        eyebrow="Features"
        title="Everything you need to sing along"
        subtitle="A focused set of tools that do one thing brilliantly: keep the right lyrics in front of you."
      />
      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <Reveal key={feature.title}>
            <Card className="h-full">
              <div className="text-accent mb-3">
                <Icon name={feature.icon} />
              </div>
              <h3 className="font-display text-lg font-semibold">{feature.title}</h3>
              <p className="text-fg-muted mt-1.5 text-sm">{feature.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
