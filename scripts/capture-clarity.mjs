import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium } = require("playwright");
const phase = process.env.PHASE || "before",
  dir = `docs/clarity/${phase}`;
await mkdir(dir, { recursive: true });
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const browser = await chromium.launch({ channel: "chrome" });
const records = [];
try {
  for (const viewport of [
    { width: 1440, height: 1000 },
    { width: 390, height: 844 },
    { width: 320, height: 568 },
  ]) {
    const name = viewport.width === 1440 ? "desktop" : `mobile-${viewport.width}`;
    const page = await browser.newPage({
      viewport,
      deviceScaleFactor: 1,
      hasTouch: viewport.width < 500,
      isMobile: viewport.width < 500,
      reducedMotion: "reduce",
    });
    await page.goto(base);
    await page.waitForTimeout(150);
    async function shot(state) {
      await page.screenshot({ path: `${dir}/${name}-${state}.png` });
      records.push(
        await page.evaluate(
          ({ name, state }) => ({
            name,
            state,
            route: location.pathname,
            viewport: { width: innerWidth, height: innerHeight },
            audioTime: document.querySelector("audio").currentTime,
            paused: document.querySelector("audio").paused,
            window: document.querySelector(".live-lyrics")?.getBoundingClientRect().toJSON(),
          }),
          { name, state },
        ),
      );
    }
    await shot("hero");
    const words = await page.locator("main").innerText();
    records.push({
      name,
      state: "copy-audit",
      visibleMainWords: words.trim().split(/\s+/).length,
      text: words,
      pageHeight: await page.evaluate(() => document.documentElement.scrollHeight),
    });
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.15);
    await shot("playing");
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    await page.locator("#experience").scrollIntoViewIfNeeded();
    await shot("experience");
    await page.locator(".library-band").scrollIntoViewIfNeeded();
    await shot("lyrics-file");
    await page.getByRole("button", { name: "Lyrics settings", exact: true }).click();
    await shot("settings");
    await page.getByRole("button", { name: "Done", exact: true }).click();
    await page.locator('.site-footer a[href="/setup/"]').click();
    await page.waitForURL("**/setup/");
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
    await shot("setup");
    await page.close();
  }
  await writeFile(`${dir}/states.json`, JSON.stringify(records, null, 2) + "\n");
  console.log(`Captured ${records.length} records in ${dir}`);
} finally {
  await browser.close();
}
