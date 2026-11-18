import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import LrcPage from "./page";

describe("LRC guide visitor journey", () => {
  it("explains a timed file and guides importing it for music played in another app", () => {
    render(<LrcPage />);
    const guide = within(screen.getByRole("main"));
    expect(guide.getByRole("heading", { level: 1, name: /LRC import guide/i })).toBeVisible();
    expect(guide.getByText(/music app plays the audio/i)).toBeVisible();
    expect(guide.getByText(/\[00:05.00\]/)).toBeVisible();
    expect(guide.getByText(/Import Lyrics.*Import/)).toBeVisible();
    expect(guide.getByText(/Title - Artist.lrc/)).toBeVisible();
    expect(guide.getByText(/\[ti:.*\[ar:/)).toBeVisible();
    expect(guide.getByText(/Window Configs.*Show/)).toBeVisible();
  });
  it("offers an original timed example and routes to setup, support, and the intended store listing", () => {
    render(<LrcPage />);
    const guide = within(screen.getByRole("main"));
    expect(guide.getByRole("link", { name: /Download.*example.*LRC/i })).toHaveAttribute(
      "href",
      "/examples/First%20Light%20-%20Floating%20Lyrics.lrc",
    );
    expect(guide.getByText(/original.*practice.*audio/i)).toBeVisible();
    expect(guide.getByRole("link", { name: /setup and troubleshooting/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/setup\/?$/),
    );
    expect(guide.getByRole("link", { name: /Contact support/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/support\/?$/),
    );
    expect(guide.getByRole("link", { name: /About Floating Lyrics/i })).toHaveAttribute(
      "href",
      "/",
    );
    const store = new URL(
      guide.getByRole("link", { name: /Install.*Google Play/i }).getAttribute("href")!,
    );
    expect(store.hostname).toBe("play.google.com");
    expect(store.pathname).toBe("/store/apps/details");
    expect(store.searchParams.get("id")).toBe("com.floating.lyrics");
  });
});
