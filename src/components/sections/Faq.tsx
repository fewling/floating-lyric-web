import { Icon } from "@/components/ui/icons";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { faq } from "@/content/landing";

export function Faq() {
  return (
    <Section id="faq">
      <SectionHeading eyebrow="FAQ" title="Questions, answered" />
      <div className="bg-surface/30 mx-auto mt-12 max-w-3xl divide-y divide-white/10 rounded-2xl border border-white/10">
        {faq.map((item) => (
          <details key={item.q} className="group p-6">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-medium">
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
