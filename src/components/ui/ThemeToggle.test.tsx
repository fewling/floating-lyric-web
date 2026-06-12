import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it } from "vitest";
import { THEME_STORAGE_KEY, themeInit } from "@/lib/theme";
import { ThemeToggle } from "./ThemeToggle";

describe("ThemeToggle", () => {
  beforeEach(() => {
    localStorage.clear();
    document.documentElement.dataset.theme = "dark";
  });

  it("flips data-theme and persists the choice", async () => {
    const user = userEvent.setup();
    render(<ThemeToggle />);
    await user.click(screen.getByRole("button", { name: /switch to light theme/i }));
    expect(document.documentElement.dataset.theme).toBe("light");
    expect(localStorage.getItem("theme")).toBe("light");
    expect(
      await screen.findByRole("button", { name: /switch to dark theme/i }),
    ).toBeInTheDocument();
  });

  it("restores a persisted theme on a fresh mount (jsdom stand-in for reload)", () => {
    localStorage.setItem(THEME_STORAGE_KEY, "light");
    // run the real pre-hydration bootstrap from layout.tsx: localStorage -> data-theme
    eval(themeInit);
    render(<ThemeToggle />);
    // fresh mount reflects the persisted state: it offers the way back to dark
    expect(screen.getByRole("button", { name: /switch to dark theme/i })).toBeInTheDocument();
  });
});
