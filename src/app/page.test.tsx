import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";

describe("Homepage install decision", () => {
  it("explains the music-app companion and line synchronization before installation", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(within(main).getByRole("heading", { level: 1 })).toHaveTextContent(
      /lyrics.*another app/i,
    );
    expect(main).toHaveTextContent(/your music app plays the audio/i);
    expect(main).toHaveTextContent(/current lyric line follows.*playback position/i);
    expect(main).toHaveTextContent(/not word-by-word karaoke/i);
    expect(main).toHaveTextContent(/notification access/i);
    expect(main).toHaveTextContent(/display over other apps/i);
    expect(main).toHaveTextContent(/media session/i);
    expect(main).toHaveTextContent(/lyrics.*not available for every track/i);
  });
  it("describes supporting options without unlimited translation or pricing promises", () => {
    render(<Home />);
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent(/LRC/);
    expect(main).toHaveTextContent(/customiz/i);
    const translation = within(main).getByRole("heading", {
      name: "Lyric translation",
    }).parentElement;
    expect(translation).toHaveTextContent(/verified account/i);
    expect(translation).toHaveTextContent(/supported app version/i);
    expect(translation).toHaveTextContent(/service availability/i);
    expect(translation).toHaveTextContent(/interface language/i);
    expect(main).not.toHaveTextContent(
      /free forever|unlimited|Pro unlock|any player|virtually any/i,
    );
  });
  it("takes listeners to the intended Google Play package with no campaign parameters", () => {
    render(<Home />);
    const links = screen.getAllByRole("link", { name: /get floating lyrics on google play/i });
    expect(links.length).toBeGreaterThan(0);
    for (const link of links) {
      expect(link).toHaveAttribute(
        "href",
        "https://play.google.com/store/apps/details?id=com.floating.lyrics",
      );
    }
  });
});
