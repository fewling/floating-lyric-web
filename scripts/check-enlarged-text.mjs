// Build and serve out/ first; see README.md for the optional external browser tools.
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import path from "node:path";
import { mkdir } from "node:fs/promises";
const require = createRequire(
  path.join(process.env.BROWSER_TOOLS || "/tmp/floating-web-browser", "package.json"),
);
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const base = process.env.BASE_URL || "http://127.0.0.1:4198";
const evidence = process.env.EVIDENCE_DIR;
if (evidence) await mkdir(evidence, { recursive: true });
const routes = ["/", "/setup/", "/lrc/", "/privacy/", "/support/"];
async function open(page, route, scale) {
  assert.equal((await page.goto(base + route)).status(), 200);
  await page.evaluate((value) => {
    document.documentElement.style.fontSize = `${16 * value}px`;
  }, scale);
  await page.evaluate(() => document.fonts.ready);
  // Wait for the public interactive illustration to hydrate before activating controls.
  if (route === "/") await page.getByRole("button", { name: "Browsing", exact: true }).click();
}
async function centerReceivesPointer(locator) {
  return locator.evaluate((node) => {
    const box = node.getBoundingClientRect();
    return node.contains(document.elementFromPoint(box.x + box.width / 2, box.y + box.height / 2));
  });
}
async function visibleFocus(locator) {
  assert.equal(
    await locator.evaluate((node) => {
      const style = getComputedStyle(node);
      return (
        node === document.activeElement &&
        style.outlineStyle !== "none" &&
        parseFloat(style.outlineWidth) >= 2
      );
    }),
    true,
    "Keyboard focus is visibly outlined",
  );
}
try {
  if (!process.env.CHECK || process.env.CHECK === "navigation") {
    for (const width of [320, 390])
      for (const scale of [1, 2])
        for (const route of routes) {
          const page = await browser.newPage({
            viewport: { width, height: 844 },
            reducedMotion: "reduce",
            hasTouch: true,
          });
          await open(page, route, scale);
          const trigger = page.getByLabel("Navigation menu", { exact: true });
          const menu = page.getByRole("navigation", { name: "Mobile", exact: true });
          const download = page.getByRole("banner").getByRole("link", { name: "Get the app" });
          await trigger.tap();
          assert.equal(await menu.isVisible(), true);
          const panel = await menu.boundingBox();
          const header = await page.getByRole("banner").boundingBox();
          assert.ok(
            panel.y >= header.y + header.height - 1,
            `${route} ${width}px ${scale * 100}%: panel clears full header`,
          );
          assert.equal(
            await centerReceivesPointer(trigger),
            true,
            "Trigger center receives pointer input",
          );
          assert.equal(
            await centerReceivesPointer(download),
            true,
            "Download remains reachable with menu open",
          );
          for (const link of await menu.getByRole("link").all()) {
            const box = await link.boundingBox();
            assert.ok(
              box.x >= 0 && box.x + box.width <= width,
              "Every navigation link fits horizontally",
            );
            assert.equal(
              await centerReceivesPointer(link),
              true,
              "Each link receives pointer input",
            );
          }
          assert.equal(
            await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
            false,
            "No horizontal scrolling",
          );
          if (evidence && route === "/")
            await page.screenshot({ path: `${evidence}/navigation-${width}-${scale}.png` });
          await trigger.tap();
          assert.equal(await menu.isVisible(), false, "Tapping trigger center dismisses menu");
          await trigger.focus();
          await page.keyboard.press("Enter");
          await visibleFocus(trigger);
          await page.keyboard.press("Tab");
          await visibleFocus(menu.getByRole("link").first());
          await page.keyboard.press("Escape");
          assert.equal(await menu.isVisible(), false, "Escape dismisses menu");
          await visibleFocus(trigger);
          await page.keyboard.press("Enter");
          // The header brand is an outside action available on every route.
          await page
            .getByRole("banner")
            .getByRole("link", { name: "Floating Lyrics", exact: true })
            .click();
          assert.equal(await menu.isVisible(), false, "Outside activation dismisses menu");
          await trigger.click();
          const target = new URL(page.url()).pathname === "/setup/" ? "LRC guide" : "Setup";
          await menu.getByRole("link", { name: target, exact: true }).click();
          await page.waitForURL(target === "Setup" ? "**/setup/" : "**/lrc/");
          assert.equal(await menu.isVisible(), false, "Page selection dismisses menu");
          await page.close();
          console.log(`PASS navigation ${route} ${width}px ${scale * 100}%`);
        }
  }
  if (!process.env.CHECK || process.env.CHECK === "appearance") {
    for (const width of [320, 390, 1280])
      for (const scale of [1, 2]) {
        const page = await browser.newPage({
          viewport: { width, height: 1000 },
          reducedMotion: "reduce",
        });
        await open(page, "/", scale);
        const illustration = page.getByRole("img", {
          name: "Illustrative colour and transparency treatments",
          exact: true,
        });
        const caption = illustration.getByText("Appearance illustrations · original lyrics", {
          exact: true,
        });
        // Measure the public rendered illustration, including transformed card edges.
        // DOM-only tests cannot detect clipping by an ancestor or caption overlap.
        const layout = await illustration.evaluate((node) => {
          const frame = node.getBoundingClientRect().toJSON();
          const caption = [...node.children]
            .find((child) => child.textContent === "Appearance illustrations · original lyrics")
            .getBoundingClientRect()
            .toJSON();
          const cards = [...node.children]
            .filter((child) => child.querySelector("p"))
            .map((card) => ({
              box: card.getBoundingClientRect().toJSON(),
              lines: [...card.querySelectorAll("p")].flatMap((line) => {
                const range = document.createRange();
                range.selectNodeContents(line);
                return [...range.getClientRects()].map((rect) => rect.toJSON());
              }),
            }));
          return { frame, caption, cards };
        });
        assert.equal(layout.cards.length, 2, "Both example cards are present");
        for (const { box, lines } of layout.cards) {
          for (const visible of [box, ...lines]) {
            assert.ok(
              visible.top >= layout.frame.top - 1 &&
                visible.bottom <= layout.frame.bottom + 1 &&
                visible.left >= layout.frame.left - 1 &&
                visible.right <= layout.frame.right + 1,
              `${width}px ${scale * 100}%: complete example stays inside its illustration`,
            );
          }
          assert.ok(box.bottom + 8 <= layout.caption.top, "Caption is separated from each example");
        }
        for (const [index, card] of layout.cards.entries()) {
          const other = layout.cards[1 - index].box;
          for (const line of card.lines) {
            assert.ok(
              line.bottom <= other.top ||
                line.top >= other.bottom ||
                line.right <= other.left ||
                line.left >= other.right,
              "Lyrics do not collide with the other example card",
            );
          }
        }
        assert.ok(
          layout.caption.bottom <= layout.frame.bottom,
          "Caption stays within illustration",
        );
        await caption.scrollIntoViewIfNeeded();
        // Oversized illustration screenshots span several viewports. Hide only the
        // sticky header during capture so it cannot obscure the illustration.
        if (evidence)
          await illustration.screenshot({
            path: `${evidence}/appearance-${width}-${scale}.png`,
            style: "header { visibility: hidden; }",
          });
        console.log(`PASS appearance ${width}px ${scale * 100}%`);
        await page.close();
      }
  }
} finally {
  await browser.close();
}
