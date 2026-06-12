import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { demoLines } from "@/content/demo";
import { LyricOverlay } from "./LyricOverlay";

describe("LyricOverlay", () => {
  it("shows the active source line and its EN translation by default", () => {
    render(<LyricOverlay activeIndex={0} />);
    expect(screen.getByText(demoLines[0].source)).toBeInTheDocument();
    expect(screen.getByText(demoLines[0].translations.EN)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "true");
  });

  it("tapping a chip swaps the translated line and aria-pressed", async () => {
    const user = userEvent.setup();
    render(<LyricOverlay activeIndex={0} />);
    await user.click(screen.getByRole("button", { name: "ES" }));
    expect(screen.getByText(demoLines[0].translations.ES)).toBeInTheDocument();
    expect(screen.queryByText(demoLines[0].translations.EN)).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: "ES" })).toHaveAttribute("aria-pressed", "true");
    expect(screen.getByRole("button", { name: "EN" })).toHaveAttribute("aria-pressed", "false");
  });
});
