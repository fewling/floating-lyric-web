import { Card } from "@/components/ui/Card";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";
import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { pricing } from "@/content/landing";
import { cn } from "@/lib/cn";

export function Pricing() {
  return (
    <Section id="pricing">
      <SectionHeading
        eyebrow="Pricing"
        title="Free to use. Pay once for unlimited AI."
        subtitle={pricing.note}
      />
      <div className="mx-auto mt-12 grid max-w-3xl gap-6 md:grid-cols-2">
        {pricing.tiers.map((tier) => (
          <Card
            key={tier.name}
            className={cn("flex flex-col", tier.highlight && "border-accent/40 bg-accent-soft")}
          >
            <div className="flex items-baseline justify-between">
              <h3 className="font-display text-xl font-semibold">{tier.name}</h3>
              {tier.highlight && (
                <span className="bg-accent text-ink rounded-full px-2.5 py-0.5 text-xs font-semibold">
                  Pro
                </span>
              )}
            </div>
            <p className="font-display mt-4 text-3xl font-bold">{tier.price}</p>
            <p className="text-fg-muted mt-1 text-sm">{tier.tagline}</p>
            <ul className="mt-6 space-y-2 text-sm">
              {tier.features.map((feature) => (
                <li key={feature} className="flex items-start gap-2">
                  <Icon name="check" className="text-accent mt-0.5 size-4 shrink-0" />
                  <span className="text-fg-muted">{feature}</span>
                </li>
              ))}
            </ul>
            <div className="mt-6">
              <GooglePlayBadge variant={tier.highlight ? "primary" : "ghost"} className="w-full" />
            </div>
          </Card>
        ))}
      </div>
    </Section>
  );
}
