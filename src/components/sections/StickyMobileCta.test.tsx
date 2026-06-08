import { act, render, screen, waitFor } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { siteConfig } from "@/content/site";
import { StickyMobileCta } from "./StickyMobileCta";

/**
 * Capture the IntersectionObserver callback so tests can simulate the hero
 * entering/leaving the viewport. The global IO is stubbed in vitest.setup.ts
 * with no-op methods; here we override with one that records its callback.
 */
let observerCallback: IntersectionObserverCallback | null = null;
let observeSpy: ReturnType<typeof vi.fn>;
let disconnectSpy: ReturnType<typeof vi.fn>;

beforeEach(() => {
  observerCallback = null;
  observeSpy = vi.fn();
  disconnectSpy = vi.fn();
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(cb: IntersectionObserverCallback) {
        observerCallback = cb;
      }
      observe = observeSpy;
      unobserve = vi.fn();
      disconnect = disconnectSpy;
      takeRecords = vi.fn(() => []);
    },
  );
});

afterEach(() => {
  vi.unstubAllGlobals();
});

function emit(isIntersecting: boolean) {
  act(() => {
    observerCallback?.(
      [{ isIntersecting } as IntersectionObserverEntry],
      {} as IntersectionObserver,
    );
  });
}

describe("StickyMobileCta", () => {
  it("links to the Play Store and observes the hero sentinel", () => {
    const sentinel = document.createElement("div");
    sentinel.id = "hero-end";
    document.body.appendChild(sentinel);

    render(<StickyMobileCta sentinelId="hero-end" />);

    // Reveal the bar (hero out of view) so its link is in the a11y tree.
    emit(false);
    const link = screen.getByRole("link", { name: /google play/i });
    expect(link).toHaveAttribute("href", siteConfig.playStoreUrl);
    expect(observeSpy).toHaveBeenCalledWith(sentinel);

    sentinel.remove();
  });

  it("hides while the hero is in view and shows once it scrolls out", () => {
    const sentinel = document.createElement("div");
    sentinel.id = "hero-end";
    document.body.appendChild(sentinel);

    render(<StickyMobileCta sentinelId="hero-end" />);
    const bar = screen.getByTestId("sticky-mobile-cta");

    // Hero in view → hidden.
    emit(true);
    expect(bar).toHaveAttribute("aria-hidden", "true");
    expect(bar.className).toContain("translate-y-full");

    // Hero scrolled out → visible.
    emit(false);
    expect(bar).toHaveAttribute("aria-hidden", "false");
    expect(bar.className).toContain("translate-y-0");
    expect(bar.className).not.toContain("translate-y-full");

    sentinel.remove();
  });

  it("falls back to visible when the sentinel is missing", async () => {
    render(<StickyMobileCta sentinelId="does-not-exist" />);
    const bar = screen.getByTestId("sticky-mobile-cta");
    // Fallback visibility is scheduled on the next animation frame.
    await waitFor(() => expect(bar).toHaveAttribute("aria-hidden", "false"));
  });
});
