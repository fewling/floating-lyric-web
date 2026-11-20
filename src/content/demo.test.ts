import { describe, expect, it } from "vitest";
import { readFileSync } from "node:fs";
import { cueAt, demo } from "./demo";

describe("bundled recording and lyrics", () => {
  it("switches only at recorded cue boundaries, including backwards seeks", () => {
    expect(cueAt(0)).toBe(0);
    for (const [index, cue] of demo.cues.entries()) {
      expect(cueAt(cue.time)).toBe(index);
      if (index > 0) expect(cueAt(cue.time - 0.001)).toBe(index - 1);
    }
    expect(cueAt(63)).toBe(16);
    expect(cueAt(3)).toBe(1);
  });
  it("ships exactly the same timestamps and text in its downloadable LRC", () => {
    const lrc = readFileSync("public/demo/small-hours.lrc", "utf8");
    const parsed = [...lrc.matchAll(/\[(\d+):(\d+)\.(\d+)\](.+)/g)].map((match) => ({
      time: Number(match[1]) * 60 + Number(match[2]) + Number(match[3]) / 1000,
      text: match[4],
    }));
    expect(parsed).toEqual(demo.cues);
    expect(readFileSync("public/demo/small-hours.mp3").byteLength).toBeGreaterThan(100000);
  });
});
