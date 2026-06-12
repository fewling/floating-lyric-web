import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { faq } from "@/content/landing";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("renders all six questions", () => {
    render(<Faq />);
    for (const item of faq) {
      expect(screen.getByText(item.q)).toBeInTheDocument();
    }
  });

  it("expands and collapses via the native details state", () => {
    render(<Faq />);
    const summary = screen.getByText(faq[0].q).closest("summary");
    const details = summary?.closest("details");
    if (!summary || !details) throw new Error("FAQ markup must be <details><summary>");
    expect(details.open).toBe(false);
    fireEvent.click(summary);
    expect(details.open).toBe(true);
    fireEvent.click(summary);
    expect(details.open).toBe(false);
  });
});
