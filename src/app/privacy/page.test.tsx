import { render, screen, within } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import PrivacyPage from "./page";

describe("Privacy information", () => {
  it("distinguishes website storage from the app policy linked by Google Play", () => {
    render(<PrivacyPage />);
    const main = screen.getByRole("main");
    expect(within(main).getByRole("link", { name: /app privacy policy/i })).toHaveAttribute(
      "href",
      "https://www.freeprivacypolicy.com/live/07b620af-c36c-429e-85ab-f2e666a94135",
    );
    expect(main).toHaveTextContent(/static pages/i);
    expect(main).toHaveTextContent(/no analytics scripts/i);
    expect(main).toHaveTextContent(/theme preference.*local storage/i);
    expect(main).not.toHaveTextContent(
      /never uploaded|never include your lyrics|no data collected/i,
    );
    expect(within(main).getByRole("link", { name: /account.*deletion/i })).toHaveAttribute(
      "href",
      "/support",
    );
  });
});
