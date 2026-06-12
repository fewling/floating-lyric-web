"use client";

import Link from "next/link";
import { useState } from "react";
import { Container } from "@/components/ui/Container";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";
import { Icon } from "@/components/ui/icons";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { siteConfig } from "@/content/site";

export function SiteHeader() {
  const [open, setOpen] = useState(false);

  return (
    <header className="bg-ink/70 border-edge sticky top-0 z-50 border-b backdrop-blur">
      <a
        href="#main"
        className="focus-visible:ring-accent focus-visible:ring-offset-ink bg-ink sr-only absolute top-4 left-4 z-50 rounded px-3 py-1.5 text-sm font-medium focus:not-sr-only focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
      >
        Skip to content
      </a>
      <Container className="flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="font-display focus-visible:ring-accent focus-visible:ring-offset-ink flex items-center gap-2 rounded text-lg font-semibold focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
        >
          <span className="bg-accent/15 text-accent grid size-8 place-items-center rounded-lg">
            <Icon name="play" className="size-4" />
          </span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-fg-muted hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-ink rounded text-sm transition focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />
          <GooglePlayBadge className="hidden sm:inline-flex" />
          <button
            type="button"
            className="text-fg focus-visible:ring-accent focus-visible:ring-offset-ink border-edge grid size-11 place-items-center rounded-lg border focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:hidden"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <Icon name={open ? "close" : "menu"} className="size-5" />
          </button>
        </div>
      </Container>

      {open && (
        <Container className="flex flex-col gap-1 pb-4 md:hidden">
          {siteConfig.nav.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-fg-muted hover:text-fg focus-visible:ring-accent focus-visible:ring-offset-ink hover:bg-fg/5 rounded-lg px-2 py-2 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
            >
              {link.label}
            </a>
          ))}
          <GooglePlayBadge className="mt-2 w-full sm:hidden" />
        </Container>
      )}
    </header>
  );
}
