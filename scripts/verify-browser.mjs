/** Optional public-route acceptance harness; tooling stays outside application dependencies.
 * npm install --prefix /tmp/floating-web-browser playwright @axe-core/playwright
 * BROWSER_TOOLS=/tmp/floating-web-browser node scripts/verify-browser.mjs
 * Serve the production out/ directory at BASE_URL (default http://127.0.0.1:4173).
 */
import assert from "node:assert/strict";
import { createRequire } from "node:module";
import { writeFile, mkdir } from "node:fs/promises";
import path from "node:path";
const require = createRequire(
  path.join(process.env.BROWSER_TOOLS || "/tmp/floating-web-browser", "package.json"),
);
const { chromium } = require("playwright");
const AxeBuilder = require("@axe-core/playwright").default;
const base = process.env.BASE_URL || "http://127.0.0.1:4173";
const output = process.env.EVIDENCE_DIR || "/tmp/floating-web-evidence/browser";
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const results = {
  date: new Date().toISOString(),
  base,
  browser: browser.version(),
  routes: [],
  journeys: [],
  requests: [],
  errors: [],
};
const pages = ["/", "/setup/", "/lrc/", "/privacy/", "/support/"];
try {
  for (const width of process.env.JOURNEY_ONLY ? [] : [320, 360, 768, 1440]) {
    for (const colorScheme of ["dark", "light"]) {
      const context = await browser.newContext({
        viewport: { width, height: 900 },
        colorScheme,
        reducedMotion: "reduce",
      });
      const page = await context.newPage();
      page.setDefaultTimeout(10000);
      page.setDefaultNavigationTimeout(15000);
      page.on("request", (r) => results.requests.push(r.url()));
      page.on("pageerror", (e) => results.errors.push(String(e)));
      for (const route of pages) {
        const response = await page.goto(base + route);
        assert.equal(response.status(), 200, route);
        await page.locator("h1").waitFor();
        assert.equal(await page.locator("h1").count(), 1);
        assert.equal(await page.locator("main").count(), 1);
        assert.ok(await page.locator('link[rel="canonical"]').getAttribute("href"));
        const overflow = await page.evaluate(
          () => document.documentElement.scrollWidth > innerWidth,
        );
        assert.equal(overflow, false, `${route} overflow at ${width}`);
        const axe = await new AxeBuilder({ page })
          .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
          .analyze();
        results.routes.push({
          route,
          width,
          colorScheme,
          h1: await page.locator("h1").innerText(),
          incomplete: axe.incomplete.map((v) => ({
            id: v.id,
            nodes: v.nodes.map((n) => ({
              target: n.target,
              html: n.html,
              reason: n.failureSummary,
            })),
          })),
          contrastPassedNodes: axe.passes.find((v) => v.id === "color-contrast")?.nodes.length || 0,
          violations: axe.violations.map((v) => ({
            id: v.id,
            impact: v.impact,
            nodes: v.nodes.map((n) => n.target),
          })),
        });
        await page.screenshot({
          path: `${output}/${route === "/" ? "home" : route.replaceAll("/", "")}-${width}-${colorScheme}.png`,
          fullPage: true,
        });
        // Public download contract independent of shared configuration.
        for (const href of await page
          .locator('a[href*="play.google.com"]')
          .evaluateAll((as) => as.map((a) => a.href))) {
          const url = new URL(href);
          assert.equal(url.hostname, "play.google.com");
          assert.equal(url.pathname, "/store/apps/details");
          assert.equal(url.searchParams.get("id"), "com.floating.lyrics");
        }
      }
      await context.close();
    }
  }
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  page.setDefaultTimeout(10000);
  page.setDefaultNavigationTimeout(15000);
  await page.goto(base);
  await page.waitForLoadState("networkidle");
  await page.keyboard.press("Tab");
  assert.equal(await page.locator(":focus").innerText(), "Skip to content");
  const focusRing = await page.locator(":focus").evaluate((el) => {
    const s = getComputedStyle(el);
    return { outline: s.outlineStyle, shadow: s.boxShadow };
  });
  results.keyboardFocus = focusRing;
  assert.notEqual(focusRing.shadow, "none");
  await page.keyboard.press("Enter");
  assert.equal(new URL(page.url()).hash, "#main");
  await page.keyboard.press("Tab");
  const skipNext = await page.locator(":focus").evaluate((el) => ({
    name: el.getAttribute("aria-label") || el.textContent,
    inMain: !!el.closest("main"),
  }));
  results.skipNext = skipNext;
  assert.equal(
    skipNext.inMain,
    true,
    "skip link bypasses header in sequential keyboard navigation",
  );
  await page.getByRole("button", { name: "Toggle menu" }).focus();
  await page.keyboard.press("Enter");
  await page.getByRole("link", { name: "Setup help", exact: true }).first().focus();
  await page.keyboard.press("Enter");
  console.log("Setup navigation:", page.url());
  await page.waitForURL("**/setup/");
  await page.getByRole("link", { name: "Read the LRC import guide" }).click();
  await page.waitForURL("**/lrc/");
  const sample = page.locator('a[href$=".lrc"]').first();
  const sampleResponse = await context.request.get(
    new URL(await sample.getAttribute("href"), base).href,
  );
  assert.equal(sampleResponse.status(), 200);
  assert.match(await sampleResponse.text(), /\[00:05\.00\]/);
  const sampleDownloadEvent = page
    .waitForEvent("download", { timeout: 5000 })
    .catch(() => undefined);
  await sample.click();
  const sampleDownload = await sampleDownloadEvent;
  results.sampleClick = {
    urlAfterClick: page.url(),
    download: sampleDownload
      ? { filename: sampleDownload.suggestedFilename(), failure: await sampleDownload.failure() }
      : null,
  };
  if (sampleDownload) assert.equal(await sampleDownload.failure(), null);
  else {
    assert.match(decodeURIComponent(page.url()), /First Light - Floating Lyrics\.lrc$/);
    assert.match(await page.locator("body").innerText(), /\[00:05\.00\]/);
  }
  await page.goto(base + "/lrc/");
  await page
    .getByRole("link", { name: /support/i })
    .first()
    .click();
  await page.waitForURL("**/support/");
  assert.equal(
    await page
      .getByRole("link", { name: "Email an account and data deletion request" })
      .getAttribute("href"),
    "mailto:floatinglyricsapp@gmail.com?subject=Floating%20Lyrics%20account%20and%20data%20deletion",
  );
  await page.getByRole("link", { name: "Read privacy information" }).click();
  await page.waitForURL("**/privacy/");
  results.journeys.push(
    "Keyboard skip, mobile menu, setup → LRC sample HTTP → support/deletion mailto → privacy",
  );
  await page.goto(base);
  const summary = page.locator("summary").first();
  await summary.focus();
  await page.keyboard.press("Enter");
  assert.equal(await summary.evaluate((el) => el.parentElement.open), true);
  const summaryFocus = await summary.evaluate((el) => getComputedStyle(el).boxShadow);
  assert.notEqual(summaryFocus, "none");
  results.keyboardFocus = { ...results.keyboardFocus, faqRing: summaryFocus };
  await page.keyboard.press("Space");
  assert.equal(await summary.evaluate((el) => el.parentElement.open), false);
  const store = page.locator('main a[aria-label="Get Floating Lyrics on Google Play"]').first();
  let openedStore;
  await context.route("https://play.google.com/**", async (route) => {
    openedStore = route.request().url();
    await route.fulfill({
      status: 200,
      contentType: "text/html",
      body: "<h1>External destination intercepted for acceptance check</h1>",
    });
  });
  await store.focus();
  const popupEvent = page.waitForEvent("popup");
  await page.keyboard.press("Enter");
  const popup = await popupEvent;
  await popup.waitForLoadState();
  assert.equal(openedStore, "https://play.google.com/store/apps/details?id=com.floating.lyrics");
  await popup.close();
  results.journeys.push(
    "Mobile direct Play badge keyboard activation opens the correct intercepted external destination; FAQ Enter/Space toggles with visible focus ring",
  );
  assert.equal(await page.locator("video, audio").count(), 0);
  await page.waitForTimeout(500); // Let interaction-triggered CSS transitions settle.
  const running = await page.evaluate(
    () => document.getAnimations().filter((a) => a.playState === "running").length,
  );
  assert.equal(running, 0, "reduced motion has no running animations");
  results.journeys.push("Reduced motion: no video/audio and no running animation");
  await page.getByRole("button", { name: /Switch to/ }).click();
  results.storage = await page.evaluate(() => ({
    cookies: document.cookie,
    localStorage: { ...localStorage },
    sessionStorage: { ...sessionStorage },
  }));
  assert.equal(results.storage.cookies, "");
  for (const route of ["/setup/", "/lrc/", "/privacy/", "/support/"]) {
    await page.goto(base + route);
    await page.waitForLoadState("networkidle");
    await page.keyboard.press("Tab");
    assert.equal(await page.locator(":focus").innerText(), "Skip to content");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    assert.equal(
      await page.locator(":focus").evaluate((el) => !!el.closest("main")),
      true,
      route + " skip bypasses header",
    );
  }
  results.journeys.push(
    "All four prose route skip links bypass header and next Tab reaches main content link",
  );
  await context.close();
  const nojs = await browser.newContext({
    javaScriptEnabled: false,
    viewport: { width: 1440, height: 900 },
  });
  const staticPage = await nojs.newPage();
  for (const route of pages) {
    await staticPage.goto(base + route);
    assert.ok((await staticPage.locator("main").innerText()).length > 200);
    assert.ok(await staticPage.locator('footer a[href="/support/"]').count());
  }
  await staticPage.goto(base);
  assert.ok(
    await staticPage
      .locator('a[href="https://play.google.com/store/apps/details?id=com.floating.lyrics"]')
      .count(),
  );
  assert.equal(await staticPage.locator('img[src*="google-play-qr"]').isVisible(), true);
  results.journeys.push(
    "JavaScript disabled: all five explanations, footer help and desktop QR/direct Play link remain available",
  );
  await nojs.close();
  results.externalRequests = [...new Set(results.requests)].filter(
    (u) => new URL(u).origin !== base,
  );
  assert.deepEqual(results.externalRequests, [], "passive browsing makes no third-party requests");
  assert.deepEqual(results.errors, []);
  assert.equal(results.routes.flatMap((r) => r.violations).length, 0, "axe violations");
} catch (error) {
  results.failure = String(error.stack || error);
  process.exitCode = 1;
} finally {
  await browser.close();
  results.requests = [...new Set(results.requests)];
  await writeFile(`${output}/results.json`, JSON.stringify(results, null, 2));
  console.log(
    JSON.stringify(
      { ...results, requests: results.requests.length, routes: results.routes.length },
      null,
      2,
    ),
  );
}
