import { Icon } from "@/components/ui/icons";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { customization, featureIntro, features } from "@/content/landing";

export function Features() {
  return (
    <Section id="features" className="bg-surface/30">
      <SectionHeading title={featureIntro.title} subtitle={featureIntro.subtitle} />
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
      <div className="mx-auto mt-10 max-w-5xl">
        <h3 className="font-display text-xl font-semibold">{customization.title}</h3>
        <p className="text-fg-muted mt-2 max-w-3xl text-sm">{customization.description}</p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          {customization.examples.map((example) => (
            <figure key={example.title} aria-label={example.title}>
              <div className="bg-surface-2 border-edge rounded-2xl border p-5 sm:p-7">
                <p
                  className={
                    example.translucent
                      ? "bg-example-bg/70 text-example-green rounded-xl p-5 text-lg font-medium"
                      : "bg-example-bg text-example-light rounded-xl p-5 text-lg font-medium"
                  }
                >
                  {customization.lyric}
                </p>
              </div>
              <figcaption className="text-fg-muted mt-2 text-sm">{example.title}</figcaption>
            </figure>
          ))}
        </div>
      </div>
    </Section>
  );
}
