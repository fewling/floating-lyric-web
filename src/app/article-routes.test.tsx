import { expect, test } from "vitest";
import { render, screen } from "@testing-library/react";
import SetupPage from "./setup/page";

test("setup explains both Android permissions and offers the import guide", () => {
  render(<SetupPage />);
  expect(
    screen.getByRole("heading", { level: 1, name: "Your first lyrics window." }),
  ).toBeInTheDocument();
  expect(screen.getByText(/notification access.*music app/i)).toBeInTheDocument();
  expect(screen.getByText(/display over other apps.*lyrics window/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: "Import your LRC files" })).toHaveAttribute(
    "href",
    "/lrc",
  );
});

test("LRC readers can download an original timed example and find matching guidance", async () => {
  const { default: LrcPage } = await import("./lrc/page");
  render(<LrcPage />);
  expect(screen.getByRole("link", { name: "Download the original LRC example" })).toHaveAttribute(
    "download",
  );
  expect(screen.getByRole("link", { name: "Download the original LRC example" })).toHaveAttribute(
    "href",
    "/samples/Small Hours - Floating Lyrics.lrc",
  );
  expect(screen.getByText(/exact recording/)).toBeInTheDocument();
});

test("privacy readers can reach the policy linked from the actual Play listing", async () => {
  const { default: PrivacyPage } = await import("./privacy/page");
  render(<PrivacyPage />);
  expect(screen.getByRole("link", { name: "Read the app privacy policy" })).toHaveAttribute(
    "href",
    "https://www.freeprivacypolicy.com/live/07b620af-c36c-429e-85ab-f2e666a94135",
  );
});

test("account holders can email deletion requests to the current public support address", async () => {
  const { default: SupportPage } = await import("./support/page");
  render(<SupportPage />);
  expect(screen.getByRole("link", { name: "Email an account deletion request" })).toHaveAttribute(
    "href",
    "mailto:floatinglyricsapp@gmail.com?subject=Floating%20Lyrics%20account%20deletion",
  );
  expect(
    screen.getByText(/from the email address associated with that account/),
  ).toBeInTheDocument();
});
