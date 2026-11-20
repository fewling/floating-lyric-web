import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const phase = process.env.PHASE || "before";
const directory = `docs/polish/${phase}`;
await mkdir(directory, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = [];
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
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
  ]) {
    const name = viewport.width === 1440 ? "desktop" : `mobile-${viewport.width}`;
    const context = await browser.newContext({
      viewport,
      deviceScaleFactor: 1,
      hasTouch: viewport.width < 500,
      isMobile: viewport.width < 500,
    });
    const page = await context.newPage();
    await page.goto(base + "/setup/");
    await page.evaluate(() => document.fonts.ready);
    async function shot(state) {
      await page.screenshot({ path: `${directory}/${name}-${state}.png` });
      report.push(
        await page.evaluate(
          ({ name, state }) => {
            const a = document.querySelector("audio"),
              card = document.querySelector(".live-lyrics"),
              line = document.querySelector(".demo-current-line");
            return {
              name,
              state,
              time: a.currentTime,
              paused: a.paused,
              route: location.pathname,
              card: card?.getBoundingClientRect().toJSON(),
              lyric: line?.textContent,
              lyricRect: line?.getBoundingClientRect().toJSON(),
              font: line && getComputedStyle(line).fontSize,
            };
          },
          { name, state },
        ),
      );
    }
    await shot("idle");
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    const slider = page.getByRole("slider", { name: "Seek demo music" });
    await setRange(slider, 8.5);
    await page.waitForTimeout(150);
    await shot("paused");
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForTimeout(100);
    await shot("playing");
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    await setRange(slider, 8.5);
    const s = await slider.boundingBox();
    await page.mouse.move(s.x + s.width * 0.2, s.y + s.height / 2);
    await page.mouse.down();
    await page.mouse.move(s.x + s.width * 0.7, s.y + s.height / 2, { steps: 4 });
    await shot("seeking");
    await page.mouse.up();
    await setRange(slider, 8.5);
    const title = await page.locator(".demo-title").boundingBox();
    await page.mouse.move(title.x + 30, title.y + 20);
    await page.mouse.down();
    await page.mouse.move(title.x + 6, title.y + 2, { steps: 4 });
    await shot("dragging");
    await page.mouse.up();
    await page.locator(".demo-title").focus();
    await page.keyboard.press("Home");
    await page.locator(".demo-title").blur();
    // Observe actual natural lyric changes, not just paused replacements.
    await setRange(slider, 9.75);
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForTimeout(420);
    await shot("line-change");
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    await setRange(slider, 8.5);
    await page.locator('.site-footer a[href="/privacy/"]').click();
    await page.waitForURL("**/privacy/");
    await page.evaluate(() => window.scrollTo({ top: 240, behavior: "instant" }));
    await page.waitForTimeout(200);
    await shot("navigation");
    // Theme controls were removed after the original review; only capture them on older builds.
    const light = page.getByRole("button", { name: "Light", exact: true });
    await page.getByRole("button", { name: "Lyrics settings", exact: true }).click();
    if (await light.count()) {
      await light.click();
      await page.getByRole("button", { name: "Done", exact: true }).click();
      await shot("light");
    }
    await context.close();
  }
  await writeFile(`${directory}/states.json`, JSON.stringify(report, null, 2) + "\n");
  console.log(`Captured ${report.length} matching states in ${directory}`);
} finally {
  await browser.close();
}
