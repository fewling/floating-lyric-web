// npm install --prefix /tmp/floating-web-browser playwright
// npm run dev -- --webpack --port 4196
// BASE_URL=http://127.0.0.1:4196 node scripts/check-interactions.mjs
// BROWSER_TOOLS and CHROME_PATH override the optional browser installation.
import { createRequire } from "node:module";
import path from "node:path";
import assert from "node:assert/strict";
import { mkdir } from "node:fs/promises";
const require = createRequire(
  path.join(process.env.BROWSER_TOOLS || "/tmp/floating-web-browser", "package.json"),
);
const { chromium } = require("playwright");
const browser = await chromium.launch({
  executablePath:
    process.env.CHROME_PATH || "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  headless: true,
});
const base = process.env.BASE_URL || "http://127.0.0.1:4196";
const only = process.env.CHECK;
async function journey(name, run) {
  if (only && only !== name) return;
  await run();
  console.log("PASS", name);
}
try {
  await journey("navigation", async () => {
    for (const width of [320, 390]) {
      const page = await browser.newPage({
        viewport: { width, height: 844 },
        reducedMotion: "reduce",
      });
      await page.goto(base);
      const trigger = page.getByLabel("Navigation menu", { exact: true });
      const menu = page.getByRole("navigation", { name: "Mobile", exact: true });
      const outside = page.getByRole("link", { name: "Explore the experience", exact: true });
      await trigger.click();
      await outside.click();
      assert.equal(await menu.isVisible(), false, "Outside action dismisses menu");
      assert.equal(new URL(page.url()).hash, "#experience", "Outside action still occurs");
      assert.equal(
        await trigger.evaluate((n) => n === document.activeElement),
        false,
        "Outside navigation does not restore trigger focus",
      );
      await trigger.click();
      const outsideButton = page.getByRole("button", { name: "Browsing", exact: true });
      await outsideButton.click();
      assert.equal(await menu.isVisible(), false);
      assert.equal(
        await outsideButton.getAttribute("aria-pressed"),
        "true",
        "Outside button still activates",
      );
      assert.equal(
        await outsideButton.evaluate((n) => n === document.activeElement),
        true,
        "Outside button focus is preserved",
      );
      await trigger.click();
      await trigger.focus();
      await page.keyboard.press("Shift+Tab");
      assert.equal(
        await trigger.evaluate((n) => n === document.activeElement),
        false,
        "Tab leaves the disclosure",
      );
      await page.keyboard.press("Escape");
      assert.equal(await menu.isVisible(), false, "Escape works outside disclosure");
      assert.equal(
        await trigger.evaluate((n) => n === document.activeElement),
        true,
        "Escape restores trigger focus",
      );
      await trigger.click();
      await outsideButton.focus();
      await page.keyboard.press("Enter");
      assert.equal(await menu.isVisible(), false, "Keyboard outside activation dismisses menu");
      await trigger.click();
      await menu.getByRole("link", { name: "Setup", exact: true }).focus();
      await page.keyboard.press("Escape");
      assert.equal(await menu.isVisible(), false, "Escape works inside disclosure");
      await trigger.click();
      await trigger.click();
      assert.equal(await menu.isVisible(), false, "Trigger still toggles");
      await trigger.click();
      await menu.getByRole("link", { name: "Setup", exact: true }).click();
      await page.waitForURL("**/setup/");
      assert.equal(await menu.isVisible(), false, "Selection dismisses menu");
      await page.waitForFunction(() => document.activeElement?.tagName === "MAIN");
      await page.close();
    }
  });
  await journey("reset", async () => {
    for (const reducedMotion of ["reduce", "no-preference"]) {
      const page = await browser.newPage({
        viewport: { width: 1440, height: 1000 },
        reducedMotion,
      });
      await page.goto(base);
      const handle = page.getByRole("button", { name: "Move Floating Lyrics window" });
      await handle.scrollIntoViewIfNeeded();
      const origin = await handle.boundingBox();
      const x = origin.x + 28,
        y = origin.y + 18;
      await page.mouse.move(x, y);
      await page.mouse.down();
      await page.mouse.move(x + 120, y + 60);
      const moved = await handle.boundingBox();
      assert.ok(
        Math.abs(moved.x - origin.x - 120) < 1 && Math.abs(moved.y - origin.y - 60) < 1,
        "Drag retains grab offset",
      );
      await page.keyboard.press("Home");
      await page.mouse.move(x + 121, y + 61);
      await page.waitForTimeout(1100);
      const reset = await handle.boundingBox();
      assert.ok(
        Math.abs(reset.x - origin.x) < 1 && Math.abs(reset.y - origin.y) < 1,
        "Held movement after Home cannot restore stale displacement",
      );
      await page.mouse.up();
      await handle.focus();
      await page.keyboard.press("ArrowRight");
      await page.keyboard.press("ArrowDown");
      await page.keyboard.press("Home");
      await page.keyboard.press("Home");
      await page.waitForTimeout(40);
      const presented = await handle.boundingBox();
      await page.mouse.move(presented.x + 30, presented.y + 18);
      await page.mouse.down();
      const grabbed = await handle.boundingBox();
      await page.mouse.move(presented.x + 50, presented.y + 28);
      const interrupted = await handle.boundingBox();
      assert.ok(
        Math.abs(interrupted.x - grabbed.x - 20) < 1 &&
          Math.abs(interrupted.y - grabbed.y - 10) < 1,
        "New grab interrupts reset from presented position",
      );
      await page.mouse.up();
      await page.close();
    }
  });

  await journey("mixed-movement", async () => {
    const page = await browser.newPage({
      viewport: { width: 1440, height: 1000 },
      reducedMotion: "reduce",
    });
    await page.goto(base);
    const handle = page.getByRole("button", { name: "Move Floating Lyrics window" });
    await handle.scrollIntoViewIfNeeded();
    const box = await handle.boundingBox();
    await page.mouse.move(box.x + 30, box.y + 18);
    await page.mouse.down();
    await page.mouse.move(box.x + 50, box.y + 18);
    await page.keyboard.press("ArrowLeft");
    const shifted = await handle.boundingBox();
    await page.mouse.move(box.x + 51, box.y + 18);
    const after = await handle.boundingBox();
    assert.ok(Math.abs(after.x - shifted.x) < 2, "Held movement cannot undo keyboard shift");
    await page.mouse.up();
    await page.close();
  });

  await journey("touch", async () => {
    for (const reducedMotion of ["reduce", "no-preference"]) {
      const page = await browser.newPage({
        viewport: { width: 390, height: 844 },
        hasTouch: true,
        isMobile: true,
        reducedMotion,
      });
      await page.goto(base);
      const handle = page.getByRole("button", { name: "Move Floating Lyrics window" });
      await handle.scrollIntoViewIfNeeded();
      const session = await page.context().newCDPSession(page);
      const appearance = () =>
        handle.evaluate((n) => ({
          background: getComputedStyle(n).backgroundColor,
          color: getComputedStyle(n).color,
          shadow: getComputedStyle(n).boxShadow,
        }));
      const rest = await appearance();
      for (const ending of ["touchEnd", "touchCancel", "lostCapture"]) {
        const box = await handle.boundingBox();
        await handle.evaluate((n) => {
          window.testPointerDown = new Promise((resolve) =>
            n.addEventListener("pointerdown", (e) => resolve(e.pointerId), { once: true }),
          );
        });
        await session.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x: box.x + 30, y: box.y + 18 }],
        });
        const pointerId = await page.evaluate(() =>
          Promise.race([
            window.testPointerDown,
            new Promise((_, reject) =>
              setTimeout(() => reject(new Error("No touch pointerdown received")), 3000),
            ),
          ]),
        );
        assert.notDeepEqual(
          await appearance(),
          rest,
          "Touch-down has immediate visible static feedback",
        );
        const held = await handle.boundingBox();
        assert.ok(
          Math.abs(held.x - box.x) < 1 && Math.abs(held.y - box.y) < 1,
          "Pressed feedback does not move the window",
        );
        if (ending === "lostCapture") {
          // Establish capture before losing it; pending capture alone has no loss event.
          await session.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x: box.x + 10, y: box.y - 2 }],
          });
          await handle.evaluate((n, id) => n.releasePointerCapture(id), pointerId);
          await session.send("Input.dispatchTouchEvent", {
            type: "touchMove",
            touchPoints: [{ x: box.x + 9, y: box.y - 2 }],
          });
          await page.waitForFunction(
            ([element, background]) => getComputedStyle(element).backgroundColor === background,
            [await handle.elementHandle(), rest.background],
          );
          assert.deepEqual(await appearance(), rest, "Capture loss clears feedback before release");
          await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        } else await session.send("Input.dispatchTouchEvent", { type: ending, touchPoints: [] });
        assert.deepEqual(await appearance(), rest, `${ending} clears feedback`);
      }
      const box = await handle.boundingBox();
      await session.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: box.x + 30, y: box.y + 18 }],
      });
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: box.x + 10, y: box.y - 2 }],
      });
      const next = await handle.boundingBox();
      assert.ok(
        Math.abs(next.x - box.x + 20) < 1 && Math.abs(next.y - box.y + 20) < 1,
        "Fresh touch drag works after interruption",
      );
      await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      for (const interruption of ["Home", "resize"]) {
        const box = await handle.boundingBox();
        await session.send("Input.dispatchTouchEvent", {
          type: "touchStart",
          touchPoints: [{ x: box.x + 30, y: box.y + 18 }],
        });
        assert.notDeepEqual(await appearance(), rest);
        if (interruption === "Home") await page.keyboard.press("Home");
        else {
          await page.setViewportSize({ width: 320, height: 844 });
          await page.waitForTimeout(80);
        }
        assert.deepEqual(await appearance(), rest, `${interruption} ends pressed feedback`);
        await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
        await page.setViewportSize({ width: 390, height: 844 });
        await page.waitForTimeout(1100);
        await handle.scrollIntoViewIfNeeded();
      }
      // Focused visual evidence uses public controls and actual touch events.
      if (process.env.EVIDENCE_DIR && reducedMotion === "reduce") {
        await mkdir(process.env.EVIDENCE_DIR, { recursive: true });
        for (const theme of ["Dark", "Light"]) {
          await page.getByRole("button", { name: theme, exact: true }).click();
          await handle.scrollIntoViewIfNeeded();
          await page.waitForTimeout(200);
          const prefix = `${process.env.EVIDENCE_DIR}/touch-${theme.toLowerCase()}`;
          await handle.screenshot({ path: `${prefix}-before.png` });
          const box = await handle.boundingBox();
          await session.send("Input.dispatchTouchEvent", {
            type: "touchStart",
            touchPoints: [{ x: box.x + 30, y: box.y + 18 }],
          });
          await handle.screenshot({ path: `${prefix}-held.png` });
          await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
          await handle.screenshot({ path: `${prefix}-after.png` });
        }
      }
      await page.close();
    }
  });
} finally {
  await browser.close();
}
