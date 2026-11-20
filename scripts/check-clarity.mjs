import { createRequire } from "node:module";
import { mkdir, writeFile } from "node:fs/promises";
import assert from "node:assert/strict";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium, webkit } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
await mkdir("docs/clarity/evidence", { recursive: true });
const results = [];
for (const [engine, width, height] of [
  [chromium, 1440, 1000],
  [chromium, 390, 844],
  [chromium, 320, 568],
  [webkit, 390, 844],
]) {
  const browser = await engine.launch(engine === chromium ? { channel: "chrome" } : {});
  const result = { engine: engine.name(), width, height, checks: [] };
  try {
    const page = await browser.newPage({
      viewport: { width, height },
      hasTouch: width < 500,
      isMobile: width < 500,
      reducedMotion: "reduce",
    });
    let mediaRequests = 0;
    page.on("request", (r) => {
      if (r.url().includes(".mp3")) mediaRequests++;
    });
    await page.goto(base);
    await page.waitForTimeout(150);
    assert.equal(await page.locator(".live-lyrics").count(), 1);
    assert.equal(mediaRequests, 0);
    result.checks.push("One visible live window; no audio request before activation");
    const play = page.getByRole("button", { name: "Play demo", exact: true }),
      app = page.locator(".hero-actions .download-button");
    for (const control of [play, app]) {
      assert.equal(
        await control.evaluate((el) => {
          const r = el.getBoundingClientRect();
          return (
            r.top >= 0 &&
            r.bottom <= innerHeight &&
            el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2))
          );
        }),
        true,
      );
    }
    const captions = await page.locator(".journey-action p").evaluateAll((nodes) =>
      nodes.map((el) => {
        const r = el.getBoundingClientRect();
        return {
          text: el.textContent,
          inView: r.top >= 0 && r.bottom <= innerHeight,
          hit: el.contains(document.elementFromPoint(r.x + r.width / 2, r.y + r.height / 2)),
        };
      }),
    );
    assert.ok(captions.every((c) => c.inView && c.hit));
    result.sourceCaptions = captions;
    assert.equal(
      await app.getAttribute("href"),
      "https://play.google.com/store/apps/details?id=com.floating.lyrics",
    );
    result.checks.push(
      "Play, app link and both source captions are visible and unobscured in the initial viewport",
    );
    await play.focus();
    await page.keyboard.press("Space");
    await page.waitForFunction(
      () =>
        !document.querySelector("audio").paused &&
        document.querySelector("audio").currentTime > 0.15,
    );
    assert.equal(
      await page
        .getByRole("button", { name: "Pause demo", exact: true })
        .evaluate((el) => el === document.activeElement),
      true,
    );
    await page.keyboard.press("Space");
    assert.equal(await page.locator("audio").evaluate((a) => a.paused), true);
    result.checks.push(
      "Keyboard Play/Pause works from the same focused control with visible label feedback",
    );
    if (width < 500) await page.getByRole("button", { name: "Play demo", exact: true }).tap();
    else await page.getByRole("button", { name: "Play demo", exact: true }).click();
    await page.waitForFunction(() => !document.querySelector("audio").paused);
    await page.evaluate(() => (window.testClarityAudio = document.querySelector("audio")));
    const time = await page.locator("audio").evaluate((a) => a.currentTime);
    await page
      .getByRole("button", { name: "Browsing", exact: true })
      .evaluate((el) => el.scrollIntoView({ block: "center", behavior: "instant" }));
    if (width < 500) await page.getByRole("button", { name: "Browsing", exact: true }).tap();
    else await page.getByRole("button", { name: "Browsing", exact: true }).click();
    assert.equal(
      await page
        .getByRole("button", { name: "Browsing", exact: true })
        .getAttribute("aria-pressed"),
      "true",
    );
    assert.equal(
      await page
        .locator("audio")
        .evaluate((a) => a === window.testClarityAudio && !a.paused && a.currentTime >= 0),
      true,
    );
    assert.ok((await page.locator("audio").evaluate((a) => a.currentTime)) >= time);
    result.checks.push("Changing the illustrated activity leaves the same audio playing");
    await page.getByRole("button", { name: "Lyrics settings", exact: true }).click();
    assert.equal(
      await page.locator(".demo-settings").evaluate((el) => el.closest(".live-lyrics") !== null),
      true,
    );
    await page.getByLabel("Background opacity").focus();
    const opacity = Number(await page.getByLabel("Background opacity").inputValue());
    await page.keyboard.press("ArrowLeft");
    assert.equal(Number(await page.getByLabel("Background opacity").inputValue()), opacity - 1);
    await page.getByRole("button", { name: "Done", exact: true }).click();
    result.checks.push("Labeled Settings opens inline; keyboard sliders update actual state");
    await page.locator('.site-footer a[href="/setup/"]').click();
    await page.waitForURL("**/setup/");
    assert.equal(
      await page.locator("audio").evaluate((a) => a === window.testClarityAudio && !a.paused),
      true,
    );
    await page.getByRole("button", { name: "Close lyrics demo and pause music" }).click();
    assert.equal(await page.locator("audio").evaluate((a) => a.paused), true);
    await page.locator(".demo-launcher").press("Enter");
    await page.waitForFunction(() => !document.querySelector("audio").paused);
    result.checks.push(
      "Guide navigation retains playback; close and keyboard reopen remain available",
    );
    if (engine === chromium) {
      await page.goto(base);
      await page.addScriptTag({
        path: `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/node_modules/axe-core/axe.min.js`,
      });
      const audit = await page.evaluate(() =>
        axe.run(document, { runOnly: { type: "tag", values: ["wcag2a", "wcag2aa", "wcag21aa"] } }),
      );
      result.axe = audit.violations.map((v) => ({
        id: v.id,
        nodes: v.nodes.map((n) => ({ target: n.target, summary: n.failureSummary })),
      }));
      assert.deepEqual(result.axe, []);
      result.checks.push("Whole-page scoped WCAG A/AA automated scan has no violations");
    }
    result.status = "passed";
    await page.close();
  } catch (error) {
    result.status = "failed";
    result.failure = String(error.stack || error);
    console.error(result.failure);
  } finally {
    await browser.close();
    results.push(result);
    await writeFile(
      "docs/clarity/evidence/task-probes.json",
      JSON.stringify(
        {
          date: new Date().toISOString(),
          evidenceType: "Scripted tasks and interface inspection; no visitor participants",
          results,
        },
        null,
        2,
      ) + "\n",
    );
  }
}
console.log(
  results.map((r) => ({
    engine: r.engine,
    width: r.width,
    status: r.status,
    checks: r.checks.length,
  })),
);
if (results.some((r) => r.status !== "passed")) process.exitCode = 1;
