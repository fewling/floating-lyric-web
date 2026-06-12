import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { siteConfig } from "@/content/site";
import { SiteFooter } from "./SiteFooter";

describe("SiteFooter", () => {
  it("renders privacy, support, GitHub, the Play badge, and copyright", () => {
    render(<SiteFooter />);
    expect(screen.getByRole("link", { name: "Privacy" })).toHaveAttribute("href", "/privacy");
    expect(screen.getByRole("link", { name: "Support" })).toHaveAttribute("href", "/support");
    const github = screen.getByRole("link", { name: "GitHub" });
    expect(github).toHaveAttribute("href", siteConfig.github);
    expect(github).toHaveAttribute("target", "_blank");
    expect(github.getAttribute("rel")).toContain("noreferrer");
    expect(screen.getByRole("link", { name: /google play/i })).toHaveAttribute(
      "href",
      siteConfig.playStoreUrl,
    );
    expect(screen.getByText(new RegExp(`© \\d{4} ${siteConfig.name}\\.`))).toBeInTheDocument();
  });
});
