// Run against the exported production site: node scripts/preview-export.mjs
// BROWSER_TOOLS=/tmp/floating-web-browser BASE_URL=http://127.0.0.1:4197 node scripts/check-demo.mjs
import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import assert from "node:assert/strict";
const require = createRequire(
  path.join(process.env.BROWSER_TOOLS || "/tmp/floating-web-browser", "package.json"),
);
const { chromium, webkit, firefox, devices } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const evidence = "docs/demo/evidence";
await mkdir(evidence, { recursive: true });
const cues = JSON.parse(await readFile("src/content/demo-cues.json", "utf8"));
let results = [];
if (process.env.ONLY) {
  try {
    results = JSON.parse(await readFile(`${evidence}/browser-results.json`, "utf8")).results.filter(
      (result) => !result.name.includes(process.env.ONLY),
    );
  } catch {
    /* First targeted run. */
  }
}
const configurations = [
  {
    name: "chrome-desktop",
    engine: chromium,
    launch: { channel: "chrome" },
    context: { viewport: { width: 1440, height: 1000 } },
  },
  {
    name: "firefox-desktop",
    engine: firefox,
    launch: {},
    context: { viewport: { width: 1366, height: 900 } },
  },
  {
    name: "webkit-desktop",
    engine: webkit,
    launch: {},
    context: { viewport: { width: 1440, height: 1000 } },
  },
  {
    name: "chrome-mobile-emulation",
    engine: chromium,
    launch: { channel: "chrome" },
    context: { ...devices["Pixel 7"], viewport: { width: 390, height: 844 } },
  },
  {
    name: "webkit-iphone-emulation",
    engine: webkit,
    launch: {},
    context: { ...devices["iPhone 13"], viewport: { width: 390, height: 844 } },
  },
  {
    name: "chrome-small-320",
    engine: chromium,
    launch: { channel: "chrome" },
    context: {
      viewport: { width: 320, height: 568 },
      hasTouch: true,
      isMobile: true,
      reducedMotion: "reduce",
    },
  },
];
if (process.env.ONLY)
  configurations.splice(
    0,
    configurations.length,
    ...configurations.filter((c) => c.name.includes(process.env.ONLY)),
  );
async function setRange(locator, value) {
  await locator.evaluate((el, value) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(
      el,
      String(value),
    );
    el.dispatchEvent(new Event("input", { bubbles: true }));
    el.dispatchEvent(new Event("change", { bubbles: true }));
  }, value);
}
const near = (a, b, message) => assert.ok(Math.abs(a - b) < 1.1, `${message}: ${a} vs ${b}`);
for (const config of configurations) {
  const result = { name: config.name, checks: [], continuity: [], sync: [], errors: [] };
  let browser;
  try {
    browser = await config.engine.launch({ headless: true, ...config.launch });
    const context = await browser.newContext(config.context);
    const page = await context.newPage();
    page.on("pageerror", (e) => result.errors.push(e.message));
    const audioRequests = [];
    page.on("request", (r) => {
      if (r.url().includes(".mp3")) audioRequests.push(r.url());
    });
    const check = async (name, run) => {
      await run();
      result.checks.push(name);
      console.log("PASS", config.name, name);
    };
    const sample = () =>
      page.evaluate(() => {
        const a = document.querySelector("audio");
        const c = document.querySelector(".demo-current-line");
        return {
          route: location.pathname,
          time: a.currentTime,
          paused: a.paused,
          duration: a.duration,
          cue: Number(c?.getAttribute("data-cue")),
          text: c?.textContent,
          sameAudio: a === window.demoAudio,
          playback: document.querySelector(".live-lyrics")?.getAttribute("data-playback"),
        };
      });
    const verifySync = async () => {
      // Media and React commit on different frame phases; sample again at a crossed boundary.
      let s = await sample();
      for (let attempt = 0; attempt < 4; attempt++) {
        if (s.cue === cues.findLastIndex((c) => c.time <= s.time)) break;
        await page.waitForTimeout(30);
        s = await sample();
      }
      assert.equal(
        s.cue,
        cues.findLastIndex((c) => c.time <= s.time),
        `cue matches audio time ${s.time}`,
      );
      result.sync.push(s);
      return s;
    };
    await page.goto(base);
    await check("No autoplay or audio download before action", async () => {
      await page.waitForTimeout(300);
      assert.equal((await sample()).paused, true);
      assert.equal(audioRequests.length, 0);
      assert.equal(await page.locator(".live-lyrics").count(), 1);
    });
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForFunction(
      () =>
        !document.querySelector("audio").paused &&
        document.querySelector("audio").currentTime > 0.15,
    );
    await page.evaluate(() => {
      window.demoAudio = document.querySelector("audio");
      window.demoEvents = [];
      for (const name of ["play", "pause", "seeking", "seeked", "ended", "error", "waiting"])
        window.demoAudio.addEventListener(name, () =>
          window.demoEvents.push({
            event: name,
            time: window.demoAudio.currentTime,
            route: location.pathname,
          }),
        );
    });
    await check("All five routes retain the same playing audio and geometry", async () => {
      const original = await page.locator(".live-lyrics").boundingBox();
      for (const route of ["/setup/", "/lrc/", "/privacy/", "/support/", "/"]) {
        const before = await sample();
        const link = page.locator(
          route === "/" ? ".site-footer .wordmark" : `.site-footer a[href="${route}"]`,
        );
        await link.click();
        await page.waitForURL(base.replace(/\/$/, "") + route);
        await page.waitForTimeout(180);
        const s = await verifySync();
        assert.equal(s.sameAudio, true);
        assert.equal(s.paused, false);
        assert.ok(s.time >= before.time);
        result.continuity.push(s);
        const box = await page.locator(".live-lyrics").boundingBox();
        near(box.x, original.x, "x persists");
        near(box.y, original.y, "y persists");
      }
      await page.goBack();
      await page.waitForURL("**/support/");
      assert.equal((await sample()).sameAudio, true);
      await page.goForward();
      await page.waitForURL(base + "/");
    });
    const panel = page.locator(".live-lyrics");
    const timeline = page.getByRole("slider", { name: "Seek demo music" });
    await check("Pause freezes time; keyboard seeking and resume follow real audio", async () => {
      await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
      const s = await sample();
      await page.waitForTimeout(350);
      near((await sample()).time, s.time, "paused position");
      await setRange(timeline, 18.25);
      await verifySync();
      near((await sample()).time, 18.25, "paused seek");
      await setRange(timeline, 3.25);
      await verifySync();
      near((await sample()).time, 3.25, "backward seek");
      await timeline.focus();
      await page.keyboard.press("ArrowRight");
      assert.ok((await sample()).time > 3.25);
      await page.getByRole("button", { name: "Play demo music", exact: true }).click();
      await page.waitForTimeout(300);
      assert.ok((await sample()).time > 3.4);
    });
    await check(
      "Body drag moves card without toggling controls; button drag does not pause",
      async () => {
        const body = await page.locator(".demo-lyric-body").boundingBox();
        const before = await panel.boundingBox();
        await page.mouse.move(body.x + 50, body.y + 30);
        await page.mouse.down();
        await page.mouse.move(body.x + 20, body.y + 5, { steps: 5 });
        await page.mouse.up();
        const after = await panel.boundingBox();
        near(after.x, Math.max(12, before.x - 30), "body movement x");
        near(after.y, before.y - 25, "body movement y");
        assert.equal(await panel.getAttribute("data-chrome"), "true");
        const play = await page
          .getByRole("button", { name: "Pause demo music", exact: true })
          .boundingBox();
        await page.mouse.move(play.x + 10, play.y + 20);
        await page.mouse.down();
        await page.mouse.move(play.x - 10, play.y + 5, { steps: 3 });
        await page.mouse.up();
        assert.equal((await sample()).paused, false);
      },
    );
    await check("Timeline drag previews and commits without moving the card", async () => {
      const before = await panel.boundingBox();
      const slider = await timeline.boundingBox();
      await page.mouse.move(slider.x + slider.width * 0.2, slider.y + slider.height / 2);
      await page.mouse.down();
      await page.mouse.move(slider.x + slider.width * 0.6, slider.y + slider.height / 2, {
        steps: 5,
      });
      const actual = await sample();
      assert.ok(
        Math.abs(Number(await timeline.inputValue()) - actual.time) > 2,
        "preview distinct from actual position",
      );
      await page.mouse.up();
      await page.waitForTimeout(100);
      assert.ok((await sample()).time > 30);
      const after = await panel.boundingBox();
      near(before.x, after.x, "seek x");
      near(before.y, after.y, "seek y");
      await verifySync();
    });
    await check(
      "Crop and reveal preserve lyric bounds and remove hidden controls from focus",
      async () => {
        const body = page.locator(".demo-lyric-body");
        const before = await body.boundingBox();
        await body.click();
        assert.equal(await panel.getAttribute("data-chrome"), "false");
        const after = await body.boundingBox();
        near(before.y, after.y, "crop lyric y");
        near(before.height, after.height, "crop lyric height");
        assert.equal(
          await page.getByRole("button", { name: "Pause demo music", exact: true }).count(),
          0,
        );
        await page.keyboard.press("Tab");
        assert.notEqual(
          await page.evaluate(() => document.activeElement?.closest(".demo-transport") !== null),
          true,
        );
        await page.getByRole("button", { name: "Show lyric controls" }).click();
        const restored = await body.boundingBox();
        near(restored.y, before.y, "reveal lyric y");
        near(restored.height, before.height, "reveal lyric height");
      },
    );
    await check("Both corner resizing and keyboard movement stay bounded", async () => {
      const left = page.getByRole("button", { name: "Resize lyrics from left. Use arrow keys." });
      const before = await panel.boundingBox();
      await left.focus();
      await page.keyboard.press("ArrowRight");
      const after = await panel.boundingBox();
      near(before.x + before.width, after.x + after.width, "left resize opposite edge");
      const right = page.getByRole("button", { name: "Resize lyrics from right. Use arrow keys." });
      await right.focus();
      await page.keyboard.press("ArrowDown");
      const taller = await panel.boundingBox();
      assert.ok(taller.height >= after.height);
      await page
        .getByRole("button", { name: "Move lyrics window. Arrow keys move; Home resets." })
        .focus();
      await page.keyboard.press("ArrowUp");
      const moved = await panel.boundingBox();
      near(moved.y, taller.y - 20, "keyboard move");
      await page.keyboard.press("Home");
      const reset = await panel.boundingBox();
      assert.ok(
        reset.x >= 0 && reset.y >= 80 && reset.x + reset.width <= config.context.viewport.width + 1,
      );
    });
    async function settings() {
      await page.getByRole("button", { name: "Lyrics settings", exact: true }).click();
    }
    await check("Settings and the timeline persist across navigation", async () => {
      await settings();
      await setRange(page.getByLabel("Background opacity"), 90);
      await page.getByRole("button", { name: "Done", exact: true }).click();
      await page.locator('.site-footer a[href="/privacy/"]').click();
      await page.waitForURL("**/privacy/");
      assert.equal(await timeline.isVisible(), true);
      await settings();
      assert.equal(await page.getByLabel("Background opacity").inputValue(), "90");
      await page.getByRole("button", { name: "Done", exact: true }).click();
    });
    await check("Bubble restores original geometry and keeps playback", async () => {
      const before = await panel.boundingBox();
      await settings();
      await page.getByRole("button", { name: "Minimize to bubble" }).click();
      const bubble = await panel.boundingBox();
      near(bubble.width, 48, "bubble size");
      await page.getByRole("button", { name: "Restore lyrics window" }).click();
      const restored = await panel.boundingBox();
      near(restored.width, before.width, "restored width");
      near(restored.x, before.x, "restored x");
    });
    await check("Wheel scrolling and mobile menus remain operable", async () => {
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
      await page.waitForFunction(() => scrollY === 0);
      if (config.engine === webkit && config.context.isMobile) {
        await page.locator("main").focus();
        await page.keyboard.press("PageDown");
      } else {
        await page.mouse.move(config.context.viewport.width / 2, 300);
        await page.mouse.wheel(0, 350);
      }
      await page.waitForFunction(() => scrollY > 0);
      if (config.context.viewport.width < 800) {
        await page.getByLabel("Navigation menu", { exact: true }).click();
        await page
          .getByRole("navigation", { name: "Mobile", exact: true })
          .getByRole("link", { name: "Setup", exact: true })
          .click();
        await page.waitForURL("**/setup/");
        assert.equal(await page.locator(".mobile-nav").getAttribute("open"), null);
        assert.equal((await sample()).sameAudio, true);
      }
      assert.equal(
        await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
        false,
      );
    });
    await check("End and replay; close pauses; restart is explicit", async () => {
      await setRange(timeline, 67.8);
      await page.waitForFunction(() => document.querySelector("audio").ended);
      await page.getByRole("button", { name: "Replay demo music", exact: true }).click();
      await page.waitForFunction(
        () =>
          document.querySelector("audio").currentTime > 0.1 &&
          !document.querySelector("audio").paused,
      );
      assert.ok((await sample()).time < 3);
      await verifySync();
      await page.screenshot({ path: `${evidence}/${config.name}.jpg`, type: "jpeg", quality: 80 });
      await page.getByRole("button", { name: "Close lyrics demo and pause music" }).click();
      assert.equal((await sample()).paused, true);
      assert.equal(await panel.count(), 0);
      assert.equal(
        await page.locator(".demo-launcher").evaluate((n) => n === document.activeElement),
        true,
      );
    });
    result.events = await page.evaluate(() => window.demoEvents);
    assert.deepEqual(result.errors, []);
    result.status = "passed";
    await context.close();
  } catch (e) {
    result.status = "failed";
    result.failure = String(e.stack || e);
    console.error("FAIL", config.name, result.failure);
  } finally {
    await browser?.close();
    results.push(result);
    await writeFile(
      `${evidence}/browser-results.json`,
      JSON.stringify({ date: new Date().toISOString(), base, results }, null, 2) + "\n",
    );
  }
}
if (results.some((r) => r.status !== "passed")) process.exitCode = 1;
