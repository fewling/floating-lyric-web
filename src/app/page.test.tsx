import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";

describe("Product experience", () => {
  it("gives listeners a direct, correct Play route and honest product context", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Stay in the song.");
    for (const link of screen.getAllByRole("link", { name: /Google Play/i })) {
      expect(link).toHaveAttribute(
        "href",
        "https://play.google.com/store/apps/details?id=com.floating.lyrics",
      );
    }
    expect(screen.getByText(/companion to your music app, not a music player/)).toBeInTheDocument();
    expect(screen.getByText(/not app footage/)).toBeInTheDocument();
    expect(
      new URL(
        screen.getByRole("link", { name: "Read the setup guide" }).getAttribute("href")!,
        "https://example.test",
      ).pathname.replace(/\/$/, ""),
    ).toBe("/setup");
  });
  it("lets visitors change app context and window appearance without starting playback", () => {
    render(<Home />);
    fireEvent.click(screen.getByRole("button", { name: "Browsing", exact: true }));
    expect(screen.getByRole("heading", { name: "Follow your curiosity." })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Browsing", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Light", exact: true }));
    expect(screen.getByRole("button", { name: "Light", exact: true })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    expect(document.querySelector("audio,video")).toBeNull();
  });
});
