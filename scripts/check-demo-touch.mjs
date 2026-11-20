import { createRequire } from "node:module";
import { writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium, webkit, devices } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const results = { date: new Date().toISOString(), checks: [], geometry: [] };
const browser = await chromium.launch({ channel: "chrome", headless: true });
try {
  const context = await browser.newContext({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  const session = await context.newCDPSession(page);
  const touch = async (type, x, y) =>
    session.send("Input.dispatchTouchEvent", {
      type,
      touchPoints: type === "touchEnd" || type === "touchCancel" ? [] : [{ x, y }],
    });
  await page.goto(base + "/setup/");
  await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
  await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
  const panel = page.locator(".live-lyrics"),
    body = page.locator(".demo-lyric-body");
  const r = await panel.boundingBox(),
    b = await body.boundingBox();
  const scroll = await page.evaluate(() => scrollY);
  await touch("touchStart", b.x + 50, b.y + 40);
  await touch("touchMove", b.x + 30, b.y + 10);
  await touch("touchEnd");
  const moved = await panel.boundingBox();
  assert.ok(Math.abs(moved.y - r.y + 30) < 1);
  assert.equal(await panel.getAttribute("data-chrome"), "true");
  assert.equal(await page.evaluate(() => scrollY), scroll);
  results.checks.push("CDP touch body drag moves without scrolling page or hiding controls");
  for (const ending of ["touchCancel", "lostCapture", "resize"]) {
    const b = await body.boundingBox();
    await touch("touchStart", b.x + 50, b.y + 40);
    await touch("touchMove", b.x + 40, b.y + 30);
    if (ending === "touchCancel") await touch("touchCancel");
    else if (ending === "lostCapture") {
      await panel.evaluate((n) => {
        for (let id = 1; id < 200; id++) if (n.hasPointerCapture(id)) n.releasePointerCapture(id);
      });
      await touch("touchMove", b.x + 39, b.y + 29);
      await touch("touchEnd");
    } else {
      await page.setViewportSize({ width: 320, height: 568 });
      await touch("touchEnd");
      await page.setViewportSize({ width: 390, height: 844 });
    }
    assert.equal(await panel.getAttribute("data-chrome"), "true");
  }
  results.checks.push(
    "Touch cancellation, capture loss, and viewport interruption leave a usable card",
  );
  await body.tap();
  assert.equal(await panel.getAttribute("data-chrome"), "false");
  await body.tap();
  assert.equal(await panel.getAttribute("data-chrome"), "true");
  const grip = await page
    .getByRole("button", { name: "Resize lyrics from left. Use arrow keys." })
    .boundingBox();
  const before = await panel.boundingBox();
  await touch("touchStart", grip.x + 12, grip.y + 24);
  await touch("touchMove", grip.x + 32, grip.y + 4);
  await touch("touchEnd");
  const after = await panel.boundingBox();
  assert.ok(Math.abs(before.x + before.width - after.x - after.width) < 1);
  assert.ok(after.width < before.width);
  results.checks.push("Touch tap crops/reveals; left-corner touch resize preserves opposite edge");
  const timeline = page.getByRole("slider", { name: "Seek demo music" }),
    t = await timeline.boundingBox();
  const prior = await panel.boundingBox();
  await touch("touchStart", t.x + t.width * 0.2, t.y + 14);
  await touch("touchMove", t.x + t.width * 0.7, t.y + 14);
  await touch("touchEnd");
  await page.waitForTimeout(100);
  const audio = await page.locator("audio").evaluate((a) => a.currentTime);
  assert.ok(audio > 30);
  assert.deepEqual(await panel.boundingBox(), prior);
  results.checks.push("Touch seeking changes audio time without moving the card");
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await touch("touchStart", 20, 400);
  for (let y = 380; y >= 180; y -= 25) {
    await touch("touchMove", 20, y);
    await page.waitForTimeout(15);
  }
  await touch("touchEnd");
  await page.waitForTimeout(150);
  assert.ok((await page.evaluate(() => scrollY)) > 0);
  results.checks.push("Touch swipe outside card scrolls page normally");
  await page.getByRole("button", { name: "Lyrics settings", exact: true }).tap();
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByRole("button", { name: "Lyrics settings", exact: true })
      .evaluate((n) => n === document.activeElement),
    true,
  );
  await page.getByLabel("Navigation menu", { exact: true }).tap();
  await page.keyboard.press("Escape");
  assert.equal(
    await page
      .getByLabel("Navigation menu", { exact: true })
      .evaluate((n) => n === document.activeElement),
    true,
  );
  results.checks.push("Settings and navigation Escape restore focus independently");
  await page.setViewportSize({ width: 320, height: 568 });
  await page.getByRole("button", { name: "Lyrics settings", exact: true }).tap();
  await page.getByLabel("Lyric size").evaluate((el) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(el, "32");
    el.dispatchEvent(new Event("input", { bubbles: true }));
  });
  await page.getByRole("button", { name: "Done", exact: true }).tap();
  await page.getByRole("button", { name: "Resize lyrics from left. Use arrow keys." }).focus();
  await page.keyboard.press("ArrowRight");
  await page.getByRole("button", { name: "Resize lyrics from right. Use arrow keys." }).focus();
  await page.keyboard.press("ArrowUp");
  await page.waitForTimeout(100);
  const fit = await body.evaluate((n) => ({
    available: n.clientHeight,
    content: Array.from(n.children).reduce((s, c) => s + c.scrollHeight, 0) + 36,
    font: getComputedStyle(n).fontSize,
    width: n.clientWidth,
  }));
  results.geometry.push(fit);
  assert.ok(fit.content <= fit.available);
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
  results.checks.push("320px viewport and maximum lyric size fit within the resized card");
  await page.screenshot({
    path: "docs/demo/evidence/touch-small-320.jpg",
    type: "jpeg",
    quality: 80,
  });
  await page.getByRole("button", { name: "Close lyrics demo and pause music" }).tap();
  // Actual media network failure, not a mocked audio element.
  const failureContext = await browser.newContext({
    ...devices["Pixel 7"],
    viewport: { width: 390, height: 844 },
  });
  const failure = await failureContext.newPage();
  let reject = true;
  await failure.route("**/demo/small-hours.mp3", (route) =>
    reject ? route.abort() : route.continue(),
  );
  await failure.goto(base + "/support/");
  await failure.getByRole("button", { name: "Play demo music", exact: true }).tap();
  await failure.getByText("Music couldn’t play.").waitFor();
  reject = false;
  await failure
    .locator(".demo-media-notice")
    .getByRole("button", { name: "Retry demo music", exact: true })
    .tap();
  await failure.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
  await failure.getByRole("button", { name: "Close lyrics demo and pause music" }).tap();
  assert.equal(await failure.locator("audio").evaluate((a) => a.paused), true);
  results.checks.push("Blocked audio gives visible error; explicit retry succeeds; Close pauses");
  await failureContext.close();
  await context.close();
} finally {
  await browser.close();
}
const safari = await webkit.launch({ headless: true });
try {
  const context = await safari.newContext({
    ...devices["iPhone 13"],
    viewport: { width: 390, height: 844 },
  });
  const page = await context.newPage();
  await page.goto(base + "/lrc/");
  await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
  await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
  await page.locator(".demo-lyric-body").tap();
  assert.equal(await page.locator(".live-lyrics").getAttribute("data-chrome"), "false");
  await page.locator(".demo-lyric-body").tap();
  await page.getByRole("button", { name: "Pause demo music", exact: true }).tap();
  assert.equal(await page.locator("audio").evaluate((a) => a.paused), true);
  results.checks.push(
    "iPhone WebKit emulation: actual emulated touch taps start, crop, reveal and pause",
  );
  await context.close();
} finally {
  await safari.close();
}
results.limitations = [
  "Engine emulation on macOS, not physical Android/iPhone hardware. WebKit touch swipes and continuous touch drags unavailable in the public Playwright API; Chrome CDP touch drag/swipe tested.",
];
await writeFile("docs/demo/evidence/touch-results.json", JSON.stringify(results, null, 2) + "\n");
console.log(JSON.stringify(results, null, 2));
