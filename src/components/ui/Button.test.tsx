import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./Button";

describe("Button", () => {
  it("renders an anchor when href is provided", () => {
    render(<Button href="https://example.com">Tap</Button>);
    const link = screen.getByRole("link", { name: "Tap" });
    expect(link).toHaveAttribute("href", "https://example.com");
    expect(link).toHaveAttribute("target", "_blank");
  });

  it("renders a button element without href", () => {
    render(<Button>Tap</Button>);
    expect(screen.getByRole("button", { name: "Tap" })).toBeInTheDocument();
  });
});
