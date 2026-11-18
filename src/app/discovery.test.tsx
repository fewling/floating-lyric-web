import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import Setup from "./setup/page";
import Lrc from "./lrc/page";
import Privacy from "./privacy/page";
import Support from "./support/page";

describe("Public help discovery", () => {
  it.each([
    ["homepage", Home],
    ["setup", Setup],
    ["LRC", Lrc],
    ["privacy", Privacy],
    ["support", Support],
  ])("lets a visitor find every launch page from %s", (_, Page) => {
    render(<Page />);
    const footer = within(screen.getByRole("navigation", { name: "Footer" }));
    for (const [name, href] of [
      ["Home", "/"],
      ["Setup & troubleshooting", "/setup/"],
      ["LRC import guide", "/lrc/"],
      ["Privacy", "/privacy/"],
      ["Support", "/support/"],
    ]) {
      const link = footer.getByRole("link", { name });
      expect(
        new URL(link.getAttribute("href")!, "https://example.test").pathname.replace(/\/$/, ""),
      ).toBe(href.replace(/\/$/, ""));
    }
  });
});
