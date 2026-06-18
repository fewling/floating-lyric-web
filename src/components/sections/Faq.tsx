import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/landing";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading title="Questions, answered" />
      <div className="bg-surface/30 divide-edge border-edge mx-auto mt-12 max-w-3xl divide-y rounded-2xl border">
        {faq.map((item) => (
          <details key={item.q} className="group p-6">
            <summary className="focus-visible:ring-accent focus-visible:ring-offset-surface flex cursor-pointer list-none items-center justify-between gap-4 rounded font-medium focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none">
              {item.q}
              <Icon
                name="chevron"
                className="text-fg-muted size-5 shrink-0 transition group-open:rotate-180"
              />
            </summary>
            <p className="text-fg-muted mt-3">{item.a}</p>
          </details>
        ))}
      </div>
    </Section>
  );
}
