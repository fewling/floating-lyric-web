import { fireEvent, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import Home from "@/app/page";
import { HeroDemo } from "./HeroDemo";

describe("Homepage demonstration", () => {
  const originalMatchMedia = window.matchMedia;
  afterEach(() => {
    window.matchMedia = originalMatchMedia;
  });

  it("labels the static illustration honestly and preserves the explanation and install route with reduced motion", () => {
    window.matchMedia = () => ({ matches: true }) as MediaQueryList;
    render(<Home />);
    expect(
      screen.getByRole("img", { name: "Illustration of a lyrics window over another app" }),
    ).toBeVisible();
    expect(screen.getByText("Illustration — not app footage")).toBeVisible();
    expect(
      screen.getByText(/highlighted lyric line follows the music app’s playback position/i),
    ).toBeVisible();
    expect(
      screen.getAllByRole("link", { name: /get floating lyrics on google play/i })[0],
    ).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.floating.lyrics");
  });
  it("keeps optional footage user-controlled with text and a still image if playback fails", () => {
    render(
      <HeroDemo
        media={{
          video: "/test-fixtures/demo.mp4",
          poster: "/test-fixtures/demo.jpg",
          width: 1080,
          height: 2340,
        }}
      />,
    );
    const demo = screen.getByLabelText("Floating Lyrics Android demonstration");
    expect(demo.tagName).toBe("VIDEO");
    expect(demo).toHaveAttribute("controls");
    expect((demo as HTMLVideoElement).muted).toBe(true);
    expect(demo).not.toHaveAttribute("autoplay");
    expect(demo).not.toHaveAttribute("loop");
    expect(demo).toHaveAttribute("preload", "none");
    expect(demo).toHaveAttribute("poster", "/test-fixtures/demo.jpg");
    fireEvent.error(demo);
    expect(screen.getByRole("link", { name: "View the still image" })).toHaveAttribute(
      "href",
      "/test-fixtures/demo.jpg",
    );
    expect(
      screen.getByText(/highlighted lyric line follows the music app’s playback position/i),
    ).toBeVisible();
  });
});
