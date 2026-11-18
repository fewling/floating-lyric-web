import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SetupPage from "./page";

describe("setup guide visitor journey", () => {
  it("explains permission setup and reaching a lyrics window with a separate music app", () => {
    render(<SetupPage />);
    const guide = within(screen.getByRole("main"));
    expect(guide.getByRole("heading", { level: 1, name: /setup.*troubleshooting/i })).toBeVisible();
    expect(guide.getByText(/tap Grant Access.*Allow notification access/)).toBeVisible();
    expect(guide.getByText(/Allow display over other apps/)).toBeVisible();
    expect(guide.getByText(/Window Configs.*Show/)).toBeVisible();
    expect(guide.getByText(/media session/)).toBeVisible();
    expect(guide.getByText(/playback position/)).toBeVisible();
  });
  it("offers relevant troubleshooting and routes to LRC help, support, and the intended Android listing", () => {
    render(<SetupPage />);
    const guide = within(screen.getByRole("main"));
    expect(guide.getByRole("heading", { name: /missing lyrics/i })).toBeVisible();
    expect(guide.getByText(/matching.*recording/i)).toBeVisible();
    expect(guide.getByRole("heading", { name: /out of sync/i })).toBeVisible();
    expect(guide.getByRole("heading", { name: /background/i })).toBeVisible();
    expect(
      guide.getByText(/Reopen Floating Lyrics.*re-enable the notification listener/i),
    ).toBeVisible();
    expect(guide.getByRole("link", { name: /LRC import guide/i })).toHaveAttribute(
      "href",
      expect.stringMatching(/^\/lrc\/?$/),
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
      guide
        .getByRole("link", { name: /Install Floating Lyrics on Google Play/i })
        .getAttribute("href")!,
    );
    expect(store.hostname).toBe("play.google.com");
    expect(store.pathname).toBe("/store/apps/details");
    expect(store.searchParams.get("id")).toBe("com.floating.lyrics");
  });
});
