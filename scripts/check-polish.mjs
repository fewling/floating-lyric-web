import { createRequire } from "node:module";
import { readFile, writeFile, mkdir } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium, webkit } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const cues = JSON.parse(await readFile("src/content/demo-cues.json", "utf8"));
const report = { date: new Date().toISOString(), reading: [], checks: [], materials: [] };
await mkdir("docs/polish/alternatives", { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const setRange = async (locator, value) =>
  locator.evaluate((el, value) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(
      el,
      String(value),
    );
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
try {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  const page = await context.newPage();
  await page.goto(base + "/setup/");
  await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
  await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
  await page.getByRole("button", { name: "Pause demo music", exact: true }).tap();
  const slider = page.getByRole("slider", { name: "Seek demo music" });
  for (const width of [336, 296, 240]) {
    await page
      .locator(".live-lyrics")
      .evaluate((el, width) => (el.style.width = `${width}px`), width);
    await page.waitForTimeout(60);
    const samples = [];
    for (const cue of cues) {
      await setRange(slider, cue.time + 0.01);
      await page.waitForTimeout(25);
      samples.push(
        await page.locator(".demo-current-line").evaluate((el) => ({
          top: el.getBoundingClientRect().top,
          font: getComputedStyle(el).fontSize,
          overflow: el.scrollHeight > el.clientHeight + 1,
        })),
      );
    }
    const drift = Math.max(...samples.map((s) => s.top)) - Math.min(...samples.map((s) => s.top));
    assert.ok(drift < 0.1);
    assert.equal(new Set(samples.map((s) => s.font)).size, 1);
    assert.equal(
      samples.some((s) => s.overflow),
      false,
    );
    report.reading.push({ width, topRange: drift, samples });
  }
  report.checks.push(
    "Current lyric anchor and font stay stable for every cue at 336, 296 and 240px card widths",
  );
  await page.locator(".live-lyrics").evaluate((el) => (el.style.width = "336px"));
  await setRange(slider, 9.4);
  await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
  await page.waitForFunction(
    () => document.querySelector(".demo-current-line").dataset.cue === "3",
  );
  const motion = await page.locator(".demo-current-line").evaluate((el) =>
    el.getAnimations().map((a) => ({
      duration: a.effect.getTiming().duration,
      transform: getComputedStyle(el).transform,
    })),
  );
  assert.equal(motion.length, 1);
  assert.equal(motion[0].duration, 160);
  report.motion = motion;
  await page.waitForTimeout(220);
  assert.equal(
    await page.locator(".demo-current-line").evaluate((el) => el.getAnimations().length),
    0,
  );
  await setRange(slider, 14.01);
  await page.waitForTimeout(40);
  assert.equal(
    await page.locator(".demo-current-line").evaluate((el) => el.getAnimations().length),
    0,
  );
  report.checks.push(
    "Natural cue gets one 160ms settle; explicit adjacent seek updates immediately",
  );
  await page.getByRole("button", { name: "Pause demo music", exact: true }).tap();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await setRange(slider, 9.4);
  await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
  await page.waitForFunction(
    () => document.querySelector(".demo-current-line").dataset.cue === "3",
  );
  assert.equal(
    await page.locator(".demo-current-line").evaluate((el) => el.getAnimations().length),
    0,
  );
  report.checks.push("Reduced-motion natural cue updates without animation");
  await page.emulateMedia({ reducedMotion: "no-preference" });
  const session = await context.newCDPSession(page),
    panel = page.locator(".live-lyrics");
  let play = await page.locator(".demo-play").boundingBox();
  const before = await panel.boundingBox();
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: play.x + 10, y: play.y + 20 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: play.x + 17, y: play.y + 20 }],
  });
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  assert.equal(await page.locator("audio").evaluate((a) => a.paused), true);
  assert.deepEqual(await panel.boundingBox(), before);
  await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
  play = await page.locator(".demo-play").boundingBox();
  await session.send("Input.dispatchTouchEvent", {
    type: "touchStart",
    touchPoints: [{ x: play.x + 10, y: play.y + 20 }],
  });
  await session.send("Input.dispatchTouchEvent", {
    type: "touchMove",
    touchPoints: [{ x: play.x - 2, y: play.y + 20 }],
  });
  assert.equal(await panel.getAttribute("data-gesture"), "move");
  assert.ok(Math.abs((await panel.boundingBox()).x - before.x + 12) < 1);
  await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
  await page.waitForFunction(
    () => !document.querySelector(".live-lyrics").hasAttribute("data-gesture"),
    null,
    { timeout: 2000 },
  );
  assert.equal(await panel.getAttribute("data-gesture"), null);
  assert.equal(await page.locator("audio").evaluate((a) => a.paused), false);
  report.checks.push(
    "Real CDP touch: 7px jitter taps without moving; 12px drag follows pointer and cancels button action",
  );
  await page.getByRole("button", { name: "Pause demo music", exact: true }).tap();
  await setRange(slider, 8.5);
  await page.locator(".demo-title").focus();
  await page.keyboard.press("Home");
  await page.locator(".demo-title").blur();
  await page.locator('.site-footer a[href="/privacy/"]').click();
  await page.waitForURL("**/privacy/");
  await page.evaluate(() => window.scrollTo({ top: 240, behavior: "instant" }));
  await page.waitForTimeout(100);
  const variants = [
    { name: "mint-frosted", blur: "8px", background: "rgb(28 40 37 / 96%)", color: "#b8ecd0" },
    { name: "mint-matte", blur: "0px", background: "rgb(28 40 37)", color: "#b8ecd0" },
    { name: "neutral-charcoal", blur: "0px", background: "rgb(38 40 43)", color: "#eceeeb" },
  ];
  for (const variant of variants) {
    await panel.evaluate((el, v) => {
      el.style.setProperty("--demo-surface-blur", v.blur);
      el.style.backgroundColor = v.background;
      el.style.color = v.color;
    }, variant);
    await page.screenshot({ path: `docs/polish/alternatives/${variant.name}.png` });
    report.materials.push({
      ...variant,
      actualBlur: await panel.evaluate((el) => getComputedStyle(el).backdropFilter),
    });
  }
  assert.equal(report.materials[0].actualBlur, "blur(8px)");
  await page.addScriptTag({
    path: `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/node_modules/axe-core/axe.min.js`,
  });
  const axe = await page.evaluate(() =>
    axe.run(
      { include: [[".live-lyrics"], [".demo-launcher"]] },
      { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } },
    ),
  );
  report.accessibility = axe.violations.map((v) => ({
    id: v.id,
    nodes: v.nodes.map((n) => n.target),
  }));
  assert.deepEqual(report.accessibility, []);
  report.checks.push("Scoped axe WCAG A/AA scan reports no violations");
  await context.close();
} finally {
  await browser.close();
}
const safari = await webkit.launch();
try {
  const p = await safari.newPage({ viewport: { width: 390, height: 844 } });
  await p.goto(base + "/setup/");
  await p.getByRole("button", { name: "Play demo music", exact: true }).click();
  const blur = await p
    .locator(".live-lyrics")
    .evaluate((el) => getComputedStyle(el).backdropFilter);
  assert.equal(blur, "blur(8px)");
  report.checks.push("WebKit computes the intended 8px backdrop blur");
} finally {
  await safari.close();
}
await writeFile("docs/polish/verification.json", JSON.stringify(report, null, 2) + "\n");
console.log(JSON.stringify(report, null, 2));
