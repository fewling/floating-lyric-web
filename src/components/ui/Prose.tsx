import Link from "next/link";
import { Container } from "@/components/ui/Container";
import type { ProseLink, ProsePage } from "@/types/content";

function ProseLinkItem({ label, href }: ProseLink) {
  const className =
    "text-accent underline underline-offset-2 focus-visible:ring-accent focus-visible:ring-offset-ink rounded focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none";
  return href.startsWith("/") ? (
    <Link href={href} className={className}>
      {label}
    </Link>
  ) : (
    <a href={href} className={className}>
      {label}
    </a>
  );
}

/** Shared narrow prose layout for /privacy and /support. */
export function Prose({ title, updated, sections }: ProsePage) {
  return (
    <main id="main" className="py-16 sm:py-24">
      <Container>
        <div className="mx-auto max-w-2xl">
          <h1 className="font-display text-3xl font-semibold">{title}</h1>
          {updated ? <p className="text-fg-muted mt-2 text-sm">Last updated: {updated}</p> : null}
          <div className="text-fg-muted mt-8 space-y-8 text-sm leading-relaxed">
            {sections.map((s) => (
              <section key={s.heading}>
                <h2 className="text-fg font-display text-lg font-semibold">{s.heading}</h2>
                {s.paragraphs.map((p) => (
                  <p key={p} className="mt-3">
                    {p}
                  </p>
                ))}
                {s.links?.length ? (
                  <ul className="mt-3 space-y-1">
                    {s.links.map((l) => (
                      <li key={l.href}>
                        <ProseLinkItem {...l} />
                      </li>
                    ))}
                  </ul>
                ) : null}
              </section>
            ))}
          </div>
        </div>
      </Container>
    </main>
  );
}
