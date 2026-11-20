import { createRequire } from "node:module";
import { mkdir, readFile, writeFile } from "node:fs/promises";
const require = createRequire(
  `${process.env.BROWSER_TOOLS || "/tmp/floating-web-browser"}/package.json`,
);
const { chromium } = require("playwright");
const base = process.env.BASE_URL || "http://127.0.0.1:4197";
const cues = JSON.parse(await readFile("src/content/demo-cues.json", "utf8"));
const dir = process.env.POLISH_EXPERIMENT_DIR || "docs/polish/experiments";
await mkdir(dir, { recursive: true });
const browser = await chromium.launch({ channel: "chrome", headless: true });
const report = { date: new Date().toISOString(), reading: [], drag: [], motion: [] };
const setRange = async (locator, value) =>
  locator.evaluate((el, value) => {
    Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value").set.call(
      el,
      String(value),
    );
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, value);
try {
  for (const width of [336, 296, 240]) {
    const page = await browser.newPage({ viewport: { width: 390, height: 844 } });
    await page.goto(base + "/setup/");
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    await page
      .locator(".live-lyrics")
      .evaluate((el, width) => (el.style.width = `${width}px`), width);
    // Reconstruct the original reading rules so the comparison remains runnable after refinement.
    await page.locator(".demo-lyric-body").evaluate((body) => {
      Object.assign(body.style, {
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "center",
        padding: "12px 20px",
        gap: "12px",
        fontSize: "22px",
      });
      Object.assign(body.querySelector(".demo-current-line").style, {
        fontWeight: "650",
        letterSpacing: "-.025em",
      });
      body.querySelector(".demo-next-line").style.lineHeight = "1.25";
    });
    const slider = page.getByRole("slider", { name: "Seek demo music" }),
      samples = [];
    for (const cue of cues.slice(1, 9)) {
      await setRange(slider, cue.time + 0.1);
      await page.waitForTimeout(40);
      samples.push(
        await page.locator(".demo-current-line").evaluate((el) => ({
          top: el.getBoundingClientRect().top,
          font: getComputedStyle(el).fontSize,
        })),
      );
    }
    report.reading.push({
      variant: "centered current+next",
      width,
      topRange: Math.max(...samples.map((s) => s.top)) - Math.min(...samples.map((s) => s.top)),
      samples,
    });
    // Prototype reserved reading slots; measure every supplied line, rather than one current couplet.
    await page.evaluate((cues) => {
      const body = document.querySelector(".demo-lyric-body");
      body.style.display = "grid";
      body.style.alignContent = "center";
      body.style.justifyContent = "stretch";
      body.style.padding = "14px 20px";
      body.style.gap = "8px";
      let size = 22,
        current = 0,
        next = 0;
      const probe = document.createElement("div");
      probe.style.cssText = `position:absolute;visibility:hidden;width:${body.clientWidth - 40}px;pointer-events:none;left:0;top:0`;
      for (const kind of ["current", "next"])
        for (const cue of cues) {
          const span = document.createElement("span");
          span.className = `demo-${kind}-line`;
          span.textContent = cue.text;
          probe.append(span);
        }
      body.append(probe);
      for (; size >= 14; size--) {
        body.style.fontSize = `${size}px`;
        current = Math.max(
          ...Array.from(probe.children)
            .slice(0, cues.length)
            .map((n) => n.scrollHeight),
        );
        next = Math.max(
          ...Array.from(probe.children)
            .slice(cues.length)
            .map((n) => n.scrollHeight),
        );
        if (current + next + 36 <= body.clientHeight) break;
      }
      body.style.fontSize = `${size}px`;
      body.style.gridTemplateRows = `${current}px ${next}px`;
      probe.remove();
      body.dataset.experimentSize = String(size);
    }, cues);
    const fixed = [];
    for (const cue of cues.slice(1, 9)) {
      await setRange(slider, cue.time + 0.1);
      await page.waitForTimeout(40);
      fixed.push(
        await page.locator(".demo-current-line").evaluate((el) => ({
          top: el.getBoundingClientRect().top,
          font: getComputedStyle(el).fontSize,
        })),
      );
    }
    const drift = Math.max(...fixed.map((s) => s.top)) - Math.min(...fixed.map((s) => s.top));
    report.reading.push({
      variant: "track-fitted reserved slots",
      width,
      topRange: drift,
      samples: fixed,
    });
    await page.close();
  }
  // Isolate thresholds in a browser prototype using the same pointer semantics and real CDP touch input.
  for (const threshold of [6, 8, 12]) {
    const page = await browser.newPage({
      viewport: { width: 390, height: 844 },
      hasTouch: true,
      isMobile: true,
    });
    await page.goto(base + "/setup/");
    await page.getByRole("button", { name: "Play demo music", exact: true }).tap();
    await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
    await page.getByRole("button", { name: "Pause demo music", exact: true }).tap();
    await page.evaluate((threshold) => {
      const panel = document.querySelector(".live-lyrics");
      window.dragTrial = { clicks: 0, moves: 0 };
      let down = null,
        moved = false;
      panel.addEventListener(
        "pointerdown",
        (e) => {
          e.stopImmediatePropagation();
          down = { x: e.clientX, y: e.clientY, id: e.pointerId };
          moved = false;
        },
        true,
      );
      panel.addEventListener(
        "pointermove",
        (e) => {
          e.stopImmediatePropagation();
          if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) >= threshold) {
            moved = true;
            window.dragTrial.moves++;
          }
        },
        true,
      );
      panel.addEventListener(
        "pointerup",
        (e) => {
          e.stopImmediatePropagation();
          down = null;
        },
        true,
      );
      panel.addEventListener(
        "click",
        (e) => {
          e.stopImmediatePropagation();
          e.preventDefault();
          if (!moved) window.dragTrial.clicks++;
        },
        true,
      );
    }, threshold);
    const session = await page.context().newCDPSession(page);
    const p = await page.locator(".demo-play").boundingBox();
    for (const jitter of [3, 5, 7, 12]) {
      await page.evaluate(() => {
        window.dragTrial = { clicks: 0, moves: 0 };
      });
      await session.send("Input.dispatchTouchEvent", {
        type: "touchStart",
        touchPoints: [{ x: p.x + 10, y: p.y + 20 }],
      });
      await session.send("Input.dispatchTouchEvent", {
        type: "touchMove",
        touchPoints: [{ x: p.x + 10 + jitter, y: p.y + 20 }],
      });
      await session.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
      report.drag.push({ threshold, jitter, ...(await page.evaluate(() => window.dragTrial)) });
    }
    await page.close();
  }
  for (const candidate of [
    { name: "native-distance", distance: 48, duration: 300 },
    { name: "short-settle", distance: 8, duration: 160 },
  ]) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      recordVideo: { dir, size: { width: 390, height: 844 } },
    });
    const page = await context.newPage();
    await page.goto(base + "/setup/");
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForFunction(() => document.querySelector("audio").currentTime > 0.1);
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    await setRange(page.getByRole("slider", { name: "Seek demo music" }), 9.7);
    await page.evaluate((candidate) => {
      window.motionSamples = [];
      const el = document.querySelector(".demo-current-line");
      new MutationObserver(() => {
        if (document.querySelector("audio").paused) return;
        const nodes = [el, document.querySelector(".demo-next-line")];
        nodes.map((n) =>
          n.animate(
            [{ transform: `translateY(${candidate.distance}px)` }, { transform: "translateY(0)" }],
            { duration: candidate.duration, easing: "cubic-bezier(.22,1,.36,1)" },
          ),
        );
        setTimeout(
          () => window.motionSamples.push({ at: 60, transform: getComputedStyle(el).transform }),
          60,
        );
        setTimeout(
          () => window.motionSamples.push({ at: 180, transform: getComputedStyle(el).transform }),
          180,
        );
      }).observe(el, { attributes: true, attributeFilter: ["data-cue"] });
    }, candidate);
    await page.getByRole("button", { name: "Play demo music", exact: true }).click();
    await page.waitForTimeout(1300);
    report.motion.push({ ...candidate, samples: await page.evaluate(() => window.motionSamples) });
    await page.getByRole("button", { name: "Pause demo music", exact: true }).click();
    await context.close();
    await page.video().saveAs(`${dir}/${candidate.name}.webm`);
  }
  await writeFile(`${dir}/results.json`, JSON.stringify(report, null, 2) + "\n");
  console.log(JSON.stringify(report, null, 2));
} finally {
  await browser.close();
}
