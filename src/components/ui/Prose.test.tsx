import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import type { ProsePage } from "@/types/content";
import { Prose } from "./Prose";

const fixture: ProsePage = {
  title: "Test Page",
  sections: [
    {
      heading: "Section A",
      paragraphs: ["Hello world."],
      links: [
        { label: "Internal", href: "/x" },
        { label: "External", href: "https://example.com" },
      ],
    },
  ],
};

describe("Prose", () => {
  it("renders title, headings, paragraphs, and links", () => {
    render(<Prose {...fixture} />);
    expect(screen.getByRole("heading", { level: 1, name: "Test Page" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { level: 2, name: "Section A" })).toBeInTheDocument();
    expect(screen.getByText("Hello world.")).toBeInTheDocument();
    expect(screen.queryByText(/Last updated/)).not.toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Internal" })).toHaveAttribute("href", "/x");
    const external = screen.getByRole("link", { name: "External" });
    expect(external).toHaveAttribute("target", "_blank");
    expect(external.getAttribute("rel")).toContain("noreferrer");
  });
});
