import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
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
    fireEvent.click(screen.getByRole("button", { name: "Browsing" }));
    expect(screen.getByText("Follow your curiosity.")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Browsing" })).toHaveAttribute(
      "aria-pressed",
      "true",
    );
    fireEvent.click(screen.getByRole("button", { name: "Light" }));
    expect(screen.getByRole("button", { name: "Light" })).toHaveAttribute("aria-pressed", "true");
    expect(document.querySelector("audio,video")).toBeNull();
  });
  it("lets visitors move the window with taps and keeps it inside a resized stage", () => {
    let resized = () => {};
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: () => void) {
          resized = callback;
        }
        observe() {}
        disconnect() {}
      },
    );
    render(<Home />);
    const handle = screen.getByRole("button", { name: "Move Floating Lyrics window" });
    const panel = handle.parentElement!;
    const stage = panel.parentElement!;
    let width = 800;
    let panelHeight = 150;
    let controlsHeight = 44;
    vi.spyOn(stage.querySelector(".scene-controls")!, "getBoundingClientRect").mockImplementation(
      () => ({ height: controlsHeight }) as DOMRect,
    );
    vi.spyOn(stage, "getBoundingClientRect").mockImplementation(
      () => ({ left: 0, top: 0, width, height: 700 }) as DOMRect,
    );
    vi.spyOn(panel, "getBoundingClientRect").mockImplementation(
      () =>
        ({
          left: 200 + (parseFloat(panel.style.transform.slice(12)) || 0),
          top: 200,
          width: 250,
          height: panelHeight,
        }) as DOMRect,
    );
    fireEvent.click(screen.getByText("Move without dragging"));
    screen.getByText("Move without dragging").parentElement!.setAttribute("open", "");
    fireEvent.click(screen.getByRole("button", { name: "Move lyrics window right" }));
    expect(panel.style.transform).toBe("translate3d(20px, 0px, 0)");
    width = 320;
    resized();
    expect(panel.style.transform).toBe("translate3d(-142px, 0px, 0)");
    panelHeight = 445;
    controlsHeight = 160;
    resized();
    expect(stage.style.minHeight).toBe("663px");
    panelHeight = 150;
    controlsHeight = 44;
    resized();
    expect(stage.style.minHeight).toBe("252px");
  });
});
