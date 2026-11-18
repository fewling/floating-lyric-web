import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { hero } from "@/content/landing";
import { siteConfig } from "@/content/site";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline lead and the accent phrase", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent(hero.headlineLead);
    expect(heading).toHaveTextContent(hero.headlineAccent);
  });

  it("links the primary CTA to the Play Store listing", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    expect(links.some((link) => link.getAttribute("href") === siteConfig.playStoreUrl)).toBe(true);
  });

  it("keeps the sticky-CTA sentinel element in the hero", () => {
    render(<Hero />);
    // StickyMobileCta observes this id; page.tsx passes sentinelId="hero-end".
    expect(document.getElementById("hero-end")).toBeInTheDocument();
  });

  it("demo precedes the Play CTA in document order (mobile-first DOM layout)", () => {
    render(<Hero />);
    // On the default (mobile) layout the demo renders before the CTA row in
    // DOM order so it stays near the top of the fold when the grid stacks.
    const demoText = screen.getByRole("img", {
      name: "Illustration of a lyrics window over another app",
    });
    const playLink = screen
      .getAllByRole("link")
      .find((link) => link.getAttribute("href") === siteConfig.playStoreUrl);
    if (!playLink) throw new Error("Play Store link not found");
    expect(
      demoText.compareDocumentPosition(playLink) & Node.DOCUMENT_POSITION_FOLLOWING,
    ).toBeTruthy();
  });
});
