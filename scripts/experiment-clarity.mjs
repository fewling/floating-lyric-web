import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
export const splitCss = `@media(min-width:1000px){.hero{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,1.05fr);gap:40px;align-items:center;max-width:1280px;margin:auto;padding:52px 36px 56px}.hero-copy{margin:0;padding:0;text-align:left;min-width:0}.hero-copy h1{font-size:clamp(3rem,4.2vw,4.2rem)}.hero-actions{justify-content:flex-start}.experience-anchor{margin:0;padding:0;min-width:0;max-width:none}.product-stage{height:560px}}`;
await mkdir("docs/clarity/alternatives", { recursive: true });
const browser = await chromium.launch({ channel: "chrome" });
const results = [];
try {
  for (const variant of ["centered", "alongside"])
    for (const [width, height] of [
      [1440, 1000],
      [1366, 900],
      [390, 844],
      [320, 568],
    ]) {
      const p = await browser.newPage({
        viewport: { width, height },
        deviceScaleFactor: 1,
        hasTouch: width < 500,
        isMobile: width < 500,
        reducedMotion: "reduce",
      });
      await p.route("**/*.css", async (route) => {
        const response = await route.fetch();
        await route.fulfill({
          response,
          body:
            (await response.text()) +
            (variant === "alongside"
              ? splitCss
              : `@media(min-width:1000px){.hero{display:block;max-width:none;padding:52px 0 56px}.hero-copy{max-width:860px;margin:auto;padding:0 28px;text-align:center}.hero-copy h1{font-size:clamp(2.4rem,5.8vw,4.75rem)}.hero-actions{justify-content:center}.experience-anchor{margin:36px auto 0;padding:0 36px;max-width:1280px}.product-stage{height:480px}}`),
        });
      });
      await p.goto(base);
      await p.waitForTimeout(150);
      const observation = await p.evaluate(() => {
        function visibility(selector) {
          const el = document.querySelector(selector),
            r = el.getBoundingClientRect(),
            x = r.left + r.width / 2,
            y = r.top + r.height / 2;
          return {
            bounds: r.toJSON(),
            inFirstViewport: r.top >= 0 && r.bottom <= innerHeight,
            hit: el.contains(document.elementFromPoint(x, y)),
          };
        }
        return {
          heroPlay: visibility(".hero-actions .demo-start"),
          app: visibility(".hero-actions .download-button"),
          contexts: visibility(".context-tabs"),
          illustration: visibility(".product-stage"),
          illustrationLabel: visibility(".scene-provenance"),
          sourceCaptions: Array.from(document.querySelectorAll(".journey-action p")).map((el) => ({
            text: el.textContent,
            bounds: el.getBoundingClientRect().toJSON(),
          })),
        };
      });
      await p.screenshot({ path: `docs/clarity/alternatives/${variant}-${width}.png` });
      await p.getByRole("button", { name: "Play demo", exact: true }).click({ timeout: 5000 });
      await p.waitForFunction(() => document.querySelector("audio").currentTime > 0.15);
      const action = await p
        .locator("audio")
        .evaluate((a) => ({ paused: a.paused, time: a.currentTime }));
      const feedback = await p.getByRole("button", { name: "Pause demo", exact: true }).isVisible();
      results.push({
        variant,
        width,
        height,
        ...observation,
        oneClickAudio: action,
        visiblePauseFeedback: feedback,
      });
      await p.close();
    }
  await writeFile(
    "docs/clarity/alternatives/results.json",
    JSON.stringify(results, null, 2) + "\n",
  );
  console.log(
    results.map((r) => ({
      variant: r.variant,
      width: r.width,
      play: r.heroPlay.inFirstViewport && r.heroPlay.hit,
      app: r.app.inFirstViewport && r.app.hit,
      contexts: r.contexts.inFirstViewport && r.contexts.hit,
      startsAfterOneClick: !r.oneClickAudio.paused,
    })),
  );
} finally {
  await browser.close();
}
