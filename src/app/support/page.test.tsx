import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SupportPage from "./page";

describe("Support and deletion journey", () => {
  it("offers actionable support and a deletion request through the published support email", () => {
    render(<SupportPage />);
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent(/Android version/i);
    expect(main).toHaveTextContent(/app version/i);
    const deletion = within(main).getByRole("heading", {
      name: /account.*data deletion/i,
    }).parentElement!;
    expect(deletion).toHaveTextContent(/request deletion/i);
    expect(deletion).toHaveTextContent(/address.*account/i);
    expect(deletion).toHaveTextContent(/password/i);
    expect(within(deletion).getByRole("link", { name: /email/i })).toHaveAttribute(
      "href",
      "mailto:floatinglyricsapp@gmail.com?subject=Floating%20Lyrics%20account%20and%20data%20deletion",
    );
    expect(main).not.toHaveTextContent(/within a few days|we'll delete it|automatic deletion/i);
    expect(within(main).getByRole("link", { name: /privacy/i })).toHaveAttribute(
      "href",
      "/privacy",
    );
  });
  it("helps visitors whose downloaded APK redirects to Google Play", () => {
    render(<SupportPage />);
    const main = screen.getByRole("main");
    expect(main).toHaveTextContent(/downloaded APK opens Google Play instead/i);
    expect(main).toHaveTextContent(/install from the store.*contact support/i);
    expect(
      within(main).getByRole("link", { name: /email floatinglyricsapp@gmail.com/i }),
    ).toHaveAttribute("href", "mailto:floatinglyricsapp@gmail.com");
  });
  it("keeps Google Play primary and offers an ordinary alternative release link", () => {
    render(<SupportPage />);
    const main = screen.getByRole("main");
    expect(
      within(main).getByRole("link", { name: "Get Floating Lyrics on Google Play" }),
    ).toHaveAttribute("href", "https://play.google.com/store/apps/details?id=com.floating.lyrics");
    expect(within(main).getByRole("link", { name: /GitHub releases/i })).toHaveAttribute(
      "href",
      "https://github.com/fewling/flutter-floating-lyric-releases/releases/latest",
    );
  });
});
