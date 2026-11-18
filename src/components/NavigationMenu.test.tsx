import { render, screen, fireEvent } from "@testing-library/react";
import { expect, it } from "vitest";
import { Header } from "./SiteChrome";

it("closes mobile navigation on selection and Escape returns focus to its summary", () => {
  render(<Header />);
  const summary = screen.getByLabelText("Navigation menu");
  const menu = summary.parentElement as HTMLDetailsElement;
  menu.open = true;
  const link = screen.getAllByRole("link", { name: "Setup" })[1];
  link.addEventListener("click", (event) => event.preventDefault());
  fireEvent.click(link);
  expect(menu.open).toBe(false);
  menu.open = true;
  fireEvent.keyDown(menu, { key: "Escape" });
  expect(menu.open).toBe(false);
  expect(summary).toHaveFocus();
});
