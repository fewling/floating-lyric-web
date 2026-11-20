import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import Home from "./page";
import { LyricsDemoProvider } from "@/components/LyricsDemo";

// Actual playback and gestures are tested against browser media engines in check-demo.mjs.
describe("Product experience", () => {
  it("keeps the Play route and distinguishes the browser demo from Android", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent("Your lyrics.");
    for (const link of screen.getAllByRole("link", { name: /Get the app/ })) {
      expect(link).toHaveAttribute(
        "href",
        "https://play.google.com/store/apps/details?id=com.floating.lyrics",
      );
    }
    expect(screen.getByText("Website demo audio")).toBeInTheDocument();
    expect(screen.getByText("Uses your music player")).toBeInTheDocument();
    expect(screen.getByText("Android illustration")).toBeInTheDocument();
    expect(
      screen
        .getByRole("link", { name: /Set up on Android/ })
        .getAttribute("href")
        ?.replace(/\/$/, ""),
    ).toBe("/setup");
  });
  it("shows the lyric window by default without autoplay", () => {
    render(
      <LyricsDemoProvider>
        <Home />
      </LyricsDemoProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Browsing" }));
    expect(screen.getByText("Follow your curiosity.")).toBeInTheDocument();
    const audio = document.querySelector("audio");
    expect(audio).toHaveAttribute("preload", "none");
    expect(audio).not.toHaveAttribute("autoplay");
    expect(screen.getByRole("region", { name: "Floating lyrics demo" })).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Play demo music" })).toBeInTheDocument();
  });
});
