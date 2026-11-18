// Optional browser check: install playwright and @axe-core/playwright outside the app.
// npm install --prefix /tmp/floating-web-browser playwright @axe-core/playwright
// BASE_URL=http://127.0.0.1:4174 node scripts/check-experience.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  path.join(process.env.BROWSER_TOOLS || "/tmp/floating-web-browser", "package.json"),
);
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const base = (process.env.BASE_URL || "http://127.0.0.1:4174").replace(/\/$/, "");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const dir = process.env.EVIDENCE_DIR || "/tmp/floating-apple-browser-check";
await mkdir(dir, { recursive: true });
const results = [];
try {
  for (const width of [1440, 768, 390, 320]) {
    const context = await browser.newContext({
      viewport: { width, height: 1000 },
      reducedMotion: "reduce",
    });
    const page = await context.newPage();
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    for (const route of ["/", "/setup/", "/lrc/", "/privacy/", "/support/"]) {
      const r = await page.goto(base + route);
      assert.equal(r.status(), 200);
      await page.evaluate(() => document.fonts.ready);
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
        route + " overflow " + width,
      );
      const axe = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
        .analyze();
      results.push({
        width,
        route,
        violations: axe.violations.map((v) => ({
          id: v.id,
          impact: v.impact,
          nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
        })),
      });
      if (width === 1440 || width === 390)
        await page.screenshot({
          path:
            dir + "/" + (route === "/" ? "home" : route.replaceAll("/", "")) + "-" + width + ".png",
          fullPage: true,
        });
    }
    await page.goto(base + "/");
    const panel = page.locator(".floating-window"),
      frame = page.locator(".product-stage");
    const handle = page.getByRole("button", { name: "Move Floating Lyrics window" });
    await handle.scrollIntoViewIfNeeded();
    await handle.focus();
    const local = async () => {
      const p = await panel.boundingBox(),
        f = await frame.boundingBox();
      return { x: p.x - f.x, y: p.y - f.y };
    };
    const before = await local();
    await page.keyboard.press("ArrowUp");
    const after = await local();
    assert.ok(after.y < before.y - 10, "Arrow key moves window");
    await page.getByRole("button", { name: "Reset lyrics window position" }).click();
    const reset = await local();
    assert.ok(Math.abs(reset.y - before.y) < 1, "Reduced motion reset instant");
    const h = await handle.boundingBox();
    await page.mouse.move(h.x + h.width / 2, h.y + h.height / 2);
    await page.mouse.down();
    await page.mouse.move(h.x - 300, h.y + 80, { steps: 10 });
    await page.mouse.up();
    const moved = await panel.boundingBox(),
      bounds = await frame.boundingBox();
    assert.ok(moved.x >= bounds.x + 11, "Drag stays within bounds");
    assert.ok(moved.x + moved.width <= bounds.x + bounds.width - 11, "Right drag bound");
    await page.getByRole("button", { name: "Browsing", exact: true }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Browsing", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    assert.ok(await page.getByText("Follow your curiosity.", { exact: true }).count());
    await page.getByRole("button", { name: "Light", exact: true }).click();
    assert.equal(
      await page.getByRole("button", { name: "Light", exact: true }).getAttribute("aria-pressed"),
      "true",
    );
    assert.equal(await page.locator("video,audio").count(), 0);

    await page.getByText("Move without dragging", { exact: true }).click();
    const tapBefore = await local();
    await page.getByRole("button", { name: "Move lyrics window up" }).click();
    const tapAfter = await local();
    assert.ok(tapAfter.y < tapBefore.y - 10, "Tap moves without dragging");
    const target = await handle.boundingBox();
    await page.mouse.move(target.x + 30, target.y + 15);
    await page.mouse.down();
    await page.mouse.move(-1000, 300, { steps: 5 });
    await page.mouse.up();
    await page.setViewportSize({ width: 320, height: 850 });
    await page.waitForTimeout(80);
    let edge = await panel.boundingBox(),
      stageBox = await frame.boundingBox();
    assert.ok(
      edge.x >= stageBox.x + 11 && edge.x + edge.width <= stageBox.x + stageBox.width - 11,
      "Resize preserves full handle",
    );
    const menu = page.locator(".mobile-nav");
    await menu.locator("summary").click();
    await menu.getByRole("link", { name: "Setup", exact: true }).click();
    await page.waitForURL("**/setup/");
    assert.equal(await menu.getAttribute("open"), null, "Menu closes on route selection");
    await menu.locator("summary").click();
    await page.keyboard.press("Escape");
    assert.equal(await menu.getAttribute("open"), null);
    assert.equal(await menu.locator("summary").evaluate((n) => n === document.activeElement), true);
    await page.goto(base + "/");
    await page.evaluate(() => (document.documentElement.style.fontSize = "200%"));
    await page.waitForTimeout(100);
    assert.equal(
      await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
      false,
      "200% text overflow",
    );
    const controls = await page.locator(".scene-controls").boundingBox();
    stageBox = await frame.boundingBox();
    assert.ok(
      controls.x >= stageBox.x && controls.x + controls.width <= stageBox.x + stageBox.width,
      "200% text controls bounded",
    );
    const bigPanel = await panel.boundingBox();
    assert.ok(
      bigPanel.y + bigPanel.height <= controls.y - 16,
      "200% text panel and toolbar remain separate",
    );
    assert.deepEqual(errors, []);
    await context.close();
  }
  await writeFile(dir + "/results.json", JSON.stringify(results, null, 2));
  assert.equal(results.flatMap((x) => x.violations).length, 0, "No axe violations");
  console.log(
    "Verified",
    results.length,
    "routes/widths and direct manipulation, keyboard, reset, context and appearance interactions",
  );
} finally {
  await writeFile(dir + "/results.json", JSON.stringify(results, null, 2));
  await browser.close();
}
