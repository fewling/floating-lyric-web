import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Home from "./page";
import userEvent from "@testing-library/user-event";

describe("Homepage Android download journey", () => {
  it("offers a scannable handoff alongside an ordinary Google Play link", () => {
    render(<Home />);
    expect(
      screen.getByRole("img", { name: "QR code for Floating Lyrics on Google Play" }),
    ).toBeInTheDocument();
    expect(screen.getByText(/scan with your Android phone/i)).toBeInTheDocument();
    const storeLink = screen.getByRole("link", { name: "Open Floating Lyrics on Google Play" });
    const destination = new URL(storeLink.getAttribute("href")!);
    expect(destination.origin).toBe("https://play.google.com");
    expect(destination.pathname).toBe("/store/apps/details");
    expect(destination.searchParams.get("id")).toBe("com.floating.lyrics");
  });

  it("lets an Android visitor follow a direct store link without using the QR", async () => {
    const user = userEvent.setup();
    render(<Home />);
    const directLinks = screen.getAllByRole("link", { name: "Get Floating Lyrics on Google Play" });
    const link = directLinks[0];
    expect(link).toHaveAttribute("href", expect.stringContaining("id=com.floating.lyrics"));
    link.focus();
    expect(link).toHaveFocus();
    // Prevent external navigation while exercising the ordinary keyboard link.
    let activated = false;
    link.addEventListener("click", (event) => {
      event.preventDefault();
      activated = true;
    });
    await user.keyboard("{Enter}");
    expect(activated).toBe(true);
  });
});
