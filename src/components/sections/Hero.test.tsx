import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the headline", () => {
    render(<Hero />);
    const heading = screen.getByRole("heading", { level: 1 });
    expect(heading).toHaveTextContent("Lyrics that float over any app");
  });

  it("links the primary CTA to the Play Store listing", () => {
    render(<Hero />);
    const links = screen.getAllByRole("link");
    expect(links.some((link) => link.getAttribute("href") === siteConfig.playStoreUrl)).toBe(true);
  });
});
