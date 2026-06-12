import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import { demoLines } from "@/content/demo";
import { HeroDemo } from "./HeroDemo";

function mockReducedMotion(matches: boolean) {
  vi.stubGlobal(
    "matchMedia",
    vi.fn().mockReturnValue({
      matches,
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
    }),
  );
}

describe("HeroDemo", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.useRealTimers(); // even if an assertion failed mid-test
  });

  it("renders line 0 and its translation on first paint (no-JS/SSR baseline)", () => {
    mockReducedMotion(false);
    render(<HeroDemo />);
    expect(screen.getByText(demoLines[0].source)).toBeInTheDocument();
    expect(screen.getByText(demoLines[0].translations.EN)).toBeInTheDocument();
  });

  it("stays on line 0 under prefers-reduced-motion, with chips still functional (spec §3)", () => {
    mockReducedMotion(true);
    vi.useFakeTimers();
    render(<HeroDemo />);
    vi.advanceTimersByTime(15_000);
    expect(screen.getByText(demoLines[0].source)).toBeInTheDocument();
    // fireEvent (not user-event) to avoid fake-timer interplay
    fireEvent.click(screen.getByRole("button", { name: "ES" }));
    expect(screen.getByText(demoLines[0].translations.ES)).toBeInTheDocument();
  });

  it("keeps chips outside any aria-hidden ancestor (PhoneFrame contract)", () => {
    mockReducedMotion(false);
    render(<HeroDemo />);
    const chip = screen.getByRole("button", { name: "EN" }); // getByRole excludes aria-hidden subtrees
    expect(chip.closest("[aria-hidden]")).toBeNull();
  });
});
