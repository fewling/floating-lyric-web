import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";
import { siteConfig } from "@/content/site";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-edge border-t">
      <Container className="flex flex-col gap-8 py-12 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <p className="font-display text-lg font-semibold">{siteConfig.name}</p>
          <p className="text-fg-muted mt-1 text-sm">{siteConfig.tagline}</p>
        </div>
        <div className="text-fg-muted flex flex-wrap items-center gap-6 text-sm">
          <nav aria-label="Footer" className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {siteConfig.footerNav.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-ink rounded transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              >
                {link.label}
              </Link>
            ))}
            <a
              href={siteConfig.github}
              className="hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-ink rounded transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          </nav>
          <GooglePlayBadge />
        </div>
      </Container>
      <Container className="text-fg-muted pb-8 text-xs">
        © {year} {siteConfig.name}.
      </Container>
    </footer>
  );
}
