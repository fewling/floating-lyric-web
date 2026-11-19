// Optional browser check: install playwright and @axe-core/playwright outside the app.
// npm install --prefix /tmp/floating-web-browser playwright @axe-core/playwright
// BASE_URL=http://127.0.0.1:4174 node scripts/check-experience.mjs
import { createRequire } from "node:module";
import path from "node:path";
import { mkdir, readFile, writeFile } from "node:fs/promises";
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
const guideExpectations = {
  "/setup/": {
    tasks: [
      ["Permissions", "permissions"],
      ["Show the lyrics window", "playback"],
      ["Troubleshooting", "troubleshooting"],
      ["Appearance", "appearance"],
    ],
    stepCount: 3,
    controlLabels: [
      "Grant Access",
      "Allow notification access",
      "Allow display over other apps",
      "Done",
      "Window Configs",
      "Show",
    ],
  },
  "/lrc/": {
    tasks: [
      ["LRC format", "format"],
      ["LRC example", "example"],
      ["Import LRC files", "import"],
      ["Match lyrics to a recording", "matching"],
    ],
    stepCount: 4,
    controlLabels: ["Import Lyrics", "Import"],
  },
};
// Playwright's ARIA snapshot omits native DisclosureTriangle state. Read the
// browser's accessibility tree so this checks what assistive technology receives.
async function phoneInstallExpanded(page) {
  const session = await page.context().newCDPSession(page);
  try {
    const { nodes } = await session.send("Accessibility.getFullAXTree");
    const disclosure = nodes.find(
      (node) =>
        node.name?.value === "Install on your phone" && node.role?.value === "DisclosureTriangle",
    );
    assert.ok(disclosure, "Phone install exposes a native disclosure control");
    return disclosure.properties.find((property) => property.name === "expanded")?.value.value;
  } finally {
    await session.detach();
  }
}
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
      if (route === "/") {
        const hero = page.getByRole("heading", { level: 1 }).locator("..");
        const play = hero.getByRole("link", { name: "Get it on Google Play" });
        assert.equal(
          await play.getAttribute("href"),
          "https://play.google.com/store/apps/details?id=com.floating.lyrics",
          "Hero Play stays direct at every viewport",
        );
        if (width > 760) {
          const install = hero.getByText("Install on your phone", { exact: true });
          assert.equal(await install.count(), 1, "Desktop hero offers phone installation");
          const initial = await install.boundingBox();
          assert.ok(
            initial.y < 1000 && (await page.evaluate(() => scrollY === 0)),
            "Phone handoff is available without scrolling",
          );
          assert.equal(await phoneInstallExpanded(page), false);
          await install.focus();
          const focus = await install.evaluate((node) => ({
            style: getComputedStyle(node).outlineStyle,
            width: parseFloat(getComputedStyle(node).outlineWidth),
          }));
          assert.notEqual(focus.style, "none");
          assert.ok(focus.width >= 2, "Disclosure has visible keyboard focus");
          await page.keyboard.press("Enter");
          assert.equal(await phoneInstallExpanded(page), true, "Disclosure exposes expanded state");
          const handoff = hero.getByRole("group", { name: "Install on your phone" });
          const qr = handoff.getByRole("img", {
            name: "QR code for the Floating Lyrics Google Play listing",
          });
          assert.equal(await qr.isVisible(), true);
          assert.equal(new URL(await qr.getAttribute("src"), base).pathname, "/google-play-qr.png");
          assert.ok((await qr.boundingBox()).width >= 144, "QR remains legible");
          const card = await handoff.boundingBox();
          assert.ok(
            card.x >= 0 && card.x + card.width <= width && card.y + card.height <= 1000,
            "Expanded handoff fits in the initial viewport",
          );
          assert.equal(
            await page.evaluate(() => document.documentElement.scrollWidth > innerWidth),
            false,
            "Open handoff introduces no horizontal overflow",
          );
          const ordinaryLink = handoff.getByRole("link", { name: "Open Google Play" });
          assert.equal(
            await ordinaryLink.getAttribute("href"),
            "https://play.google.com/store/apps/details?id=com.floating.lyrics",
          );
          assert.ok(
            await handoff
              .getByText("Scan to open Floating Lyrics on Google Play.", { exact: true })
              .count(),
          );
          await page.keyboard.press("Tab");
          assert.equal(
            await ordinaryLink.evaluate((node) => node === document.activeElement),
            true,
            "Ordinary Play link is keyboard reachable",
          );
          await page.screenshot({ path: `${dir}/hero-handoff-${width}.png` });
          await page.keyboard.press("Shift+Tab");
          await page.keyboard.press("Space");
          assert.equal(await phoneInstallExpanded(page), false, "Keyboard collapses phone handoff");
          assert.equal(await ordinaryLink.isVisible(), false);
          await page.keyboard.press("Tab");
          assert.equal(
            await hero
              .getByRole("link", { name: "Explore the experience" })
              .evaluate((node) => node === document.activeElement),
            true,
            "Focus leaves collapsed handoff predictably",
          );
        }
      }
      if (route === "/setup/" || route === "/lrc/") {
        const { tasks, stepCount, controlLabels } = guideExpectations[route];
        for (const [name, anchor] of tasks) {
          const link = page
            .getByRole("navigation", { name: "On this page" })
            .getByRole("link", { name, exact: true });
          assert.equal(await link.getAttribute("href"), `#${anchor}`);
          await link.click();
          assert.equal(new URL(page.url()).hash, `#${anchor}`);
          const section = page.getByRole("region", { name, exact: true });
          assert.equal(await section.getAttribute("id"), anchor);
          const heading = await section.getByRole("heading", { name, exact: true }).boundingBox();
          const header = await page.getByRole("banner").boundingBox();
          assert.ok(
            heading.y >= header.y + header.height && heading.y < 1000,
            `${name} lands in view below the header at ${width}px`,
          );
        }
        if (route === "/lrc/") {
          const sample = page.getByRole("link", { name: "Download the original LRC example" });
          const downloaded = page.waitForEvent("download");
          await sample.click();
          const download = await downloaded;
          assert.equal(download.suggestedFilename(), "Small Hours - Floating Lyrics.lrc");
          const text = await readFile(await download.path(), "utf8");
          assert.ok(
            text.startsWith("[ti:Small Hours]\n[ar:Floating Lyrics]\n[00:00.000]"),
            "Download preserves the original timed LRC sample",
          );
        }
        await page.evaluate(() => scrollTo(0, 0));
        const sequence = page.locator("article ol");
        assert.equal(await sequence.getByRole("listitem").count(), stepCount);
        const markers = await sequence.getByRole("listitem").evaluateAll((items) =>
          items.map((item) => ({
            display: getComputedStyle(item).display,
            style: getComputedStyle(item).listStyleType,
            color: getComputedStyle(item, "::marker").color,
            size: parseFloat(getComputedStyle(item, "::marker").fontSize),
          })),
        );
        for (const marker of markers) {
          assert.equal(marker.display, "list-item", "Instructions expose visible list markers");
          assert.equal(marker.style, "decimal", "Instructions show sequential decimal markers");
          assert.notEqual(marker.color, "rgba(0, 0, 0, 0)");
          assert.ok(marker.size >= 14, "Markers remain legible");
        }
        for (const label of controlLabels) {
          const control = page
            .locator("article strong")
            .filter({ hasText: new RegExp(`^${label}$`) });
          assert.ok(await control.count(), `${label} is emphasized`);
          assert.ok(
            await control
              .first()
              .evaluate((node) => Number(getComputedStyle(node).fontWeight) >= 600),
          );
        }
        if (route === "/setup/") {
          const symptoms = [
            "No music detected",
            "No lyrics window",
            "Wrong or missing lyrics",
            "Lyrics ahead or behind",
            "Stops in the background",
          ];
          for (const symptom of symptoms) {
            const lead = page
              .locator("article li strong")
              .filter({ hasText: new RegExp(`^${symptom}:$`) });
            assert.equal(await lead.count(), 1, `${symptom} has a distinct lead-in`);
            assert.ok(
              await lead.evaluate(
                (node) =>
                  Number(getComputedStyle(node).fontWeight) >
                  Number(getComputedStyle(node.parentElement).fontWeight),
              ),
            );
            assert.ok(
              await lead.evaluate(
                (node) => node.parentElement.textContent.length > node.textContent.length + 30,
              ),
              "Symptom stays grouped with its explanation",
            );
          }
        }
      }
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
      if (width === 1440 || width === 390 || width === 320)
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
  const android = await browser.newContext({
    viewport: { width: 390, height: 844 },
    isMobile: true,
    hasTouch: true,
    userAgent:
      "Mozilla/5.0 (Linux; Android 15; Pixel 9) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Mobile Safari/537.36",
  });
  const phone = await android.newPage();
  await phone.goto(base + "/");
  const androidHero = phone.getByRole("heading", { level: 1 }).locator("..");
  const androidPlay = androidHero.getByRole("link", { name: "Get it on Google Play" });
  assert.equal(await androidPlay.isVisible(), true);
  assert.equal(
    await androidPlay.getAttribute("href"),
    "https://play.google.com/store/apps/details?id=com.floating.lyrics",
    "Android visitors retain direct Play access",
  );
  assert.equal(
    await androidHero.getByText("Install on your phone", { exact: true }).isVisible(),
    false,
  );
  assert.equal(phone.url(), base + "/", "Android visitors are not redirected");
  await android.close();
  await writeFile(dir + "/results.json", JSON.stringify(results, null, 2));
  assert.equal(results.flatMap((x) => x.violations).length, 0, "No axe violations");
  console.log(
    "Verified",
    results.length,
    "routes/widths, guide steps and task navigation, LRC download, desktop phone handoff, direct Android Play access, and existing product interactions",
  );
} finally {
  await writeFile(dir + "/results.json", JSON.stringify(results, null, 2));
  await browser.close();
}
