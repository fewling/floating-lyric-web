import { Card } from "@/components/ui/Card";
import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { pillars } from "@/content/landing";

export function Pillars() {
  return (
    <Section className="py-12 md:py-16">
      <div className="grid gap-6 md:grid-cols-3">
        {pillars.map((pillar) => (
          <Reveal key={pillar.title}>
            <Card className="h-full">
              <div className="bg-accent/10 text-accent mb-4 grid size-12 place-items-center rounded-xl">
                <Icon name={pillar.icon} />
              </div>
              <h3 className="font-display text-xl font-semibold">{pillar.title}</h3>
              <p className="text-fg-muted mt-2">{pillar.body}</p>
            </Card>
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
