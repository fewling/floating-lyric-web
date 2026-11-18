import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Faq } from "./Faq";

describe("Faq", () => {
  it("answers compatibility questions without guaranteeing every music app", () => {
    render(<Faq />);
    const question = screen.getByText("Will it work with my music app?");
    expect(question.closest("details")).toHaveTextContent(/compatibility varies/i);
    expect(question.closest("details")).toHaveTextContent(/playback position/i);
  });

  it("expands and collapses via the native details state", () => {
    render(<Faq />);
    const summary = screen.getByText("Does Floating Lyrics play music?").closest("summary");
    const details = summary?.closest("details");
    if (!summary || !details) throw new Error("FAQ markup must be <details><summary>");
    expect(details.open).toBe(false);
    fireEvent.click(summary);
    expect(details.open).toBe(true);
    fireEvent.click(summary);
    expect(details.open).toBe(false);
  });
});
