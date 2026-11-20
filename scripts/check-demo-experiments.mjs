import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium } = require("playwright");
const browser = await chromium.launch({ channel: "chrome", headless: true });
const page = await browser.newPage({ viewport: { width: 1440, height: 1000 } });
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const results = { date: new Date().toISOString() };
try {
  await page.goto(base);
  await page.getByRole("button", { name: "Play demo music", exact: true }).click();
  await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
  await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
  const body = page.locator(".demo-lyric-body");
  const before = await body.boundingBox();
  await body.click();
  const cropped = await body.boundingBox();
  const reflowed = await page.locator(".live-lyrics").evaluate((card) => {
    card.style.clipPath = "none";
    const header = card.querySelector(".demo-titlebar"),
      footer = card.querySelector(".demo-transport");
    header.style.display = "none";
    footer.style.display = "none";
    const r = card.querySelector(".demo-lyric-body").getBoundingClientRect();
    header.style.display = "";
    footer.style.display = "";
    card.style.clipPath = "inset(44px 0 48px round 18px)";
    return { y: r.y, height: r.height };
  });
  results.crop = {
    expanded: before,
    cropped,
    reflowed,
    recommendation:
      "Crop measured chrome rather than removing it from layout: the lyric area retains its exact screen rectangle.",
  };
  assert.equal(before.y, cropped.y);
  assert.equal(before.height, cropped.height);
  assert.notEqual(reflowed.height, before.height);
  await body.click();
  const slider = page.getByRole("slider", { name: "Seek demo music" });
  await page.evaluate(() => {
    window.seekCount = 0;
    document.querySelector("audio").addEventListener("seeking", () => window.seekCount++);
  });
  async function scrub() {
    const b = await slider.boundingBox();
    await page.mouse.move(b.x + 10, b.y + 10);
    await page.mouse.down();
    for (let i = 1; i <= 8; i++) {
      await page.mouse.move(b.x + 10 + ((b.width - 20) * i) / 8, b.y + 10);
      await page.waitForTimeout(50);
    }
    const during = await page.evaluate(() => window.seekCount);
    await page.mouse.up();
    await page.waitForTimeout(150);
    return { during, after: await page.evaluate(() => window.seekCount) };
  }
  const releaseCommit = await scrub();
  await slider.evaluate((el) => {
    window.seekCount = 0;
    window.continuousSeek = () => {
      document.querySelector("audio").currentTime = Number(el.value);
    };
    el.addEventListener("input", window.continuousSeek);
  });
  const continuousCommit = await scrub();
  await slider.evaluate((el) => el.removeEventListener("input", window.continuousSeek));
  results.seeking = {
    releaseCommit,
    continuousCommit,
    recommendation:
      "Preview while dragging and seek once on release; keyboard changes seek immediately. This avoids repeatedly interrupting media decoding.",
  };
  assert.equal(releaseCommit.during, 0);
  assert.equal(releaseCommit.after, 1);
  assert.ok(continuousCommit.during > 1);
  // Small finger/mouse jitter should still activate a button; deliberate dragging should cancel it.
  await page.getByRole("button", { name: "Play demo music", exact: true }).click();
  let button = await page
    .getByRole("button", { name: "Pause demo music", exact: true })
    .boundingBox();
  await page.mouse.move(button.x + 15, button.y + 20);
  await page.mouse.down();
  await page.mouse.move(button.x + 18, button.y + 20);
  await page.mouse.up();
  const jitterPaused = await page.locator("audio").evaluate((a) => a.paused);
  assert.equal(jitterPaused, true);
  await page.getByRole("button", { name: "Play demo music", exact: true }).click();
  button = await page.getByRole("button", { name: "Pause demo music", exact: true }).boundingBox();
  await page.mouse.move(button.x + 15, button.y + 20);
  await page.mouse.down();
  await page.mouse.move(button.x + 3, button.y + 20, { steps: 3 });
  await page.mouse.up();
  const dragPaused = await page.locator("audio").evaluate((a) => a.paused);
  assert.equal(dragPaused, false);
  results.gestureSlop = {
    jitterPixels: 3,
    jitterPaused,
    dragPixels: 12,
    dragPaused,
    recommendation:
      "Use a small movement threshold before capturing the pointer: minor tap jitter activates controls; a deliberate button drag moves without activating.",
  };
  await page.goto(base + "/setup/");
  results.hardNavigation = {
    paused: await page.locator("audio").evaluate((a) => a.paused),
    overlayCount: await page.locator(".live-lyrics").count(),
    recommendation:
      "Keep the one audio element in the shared root layout and use Next Link. A document navigation intentionally starts a new paused session.",
  };
  assert.equal(results.hardNavigation.paused, true);
  assert.equal(results.hardNavigation.overlayCount, 1);
  console.log(JSON.stringify(results, null, 2));
  await writeFile("docs/demo/evidence/experiments.json", JSON.stringify(results, null, 2) + "\n");
} finally {
  await browser.close();
}
