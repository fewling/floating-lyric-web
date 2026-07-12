import type { DemoLine } from './demo-track'

export function lyricIndexAt(
  tMs: number,
  lines: readonly DemoLine[],
  durationMs: number,
): number {
  const t = ((tMs % durationMs) + durationMs) % durationMs
  let idx = 0
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].atMs <= t) idx = i
  }
  return idx
}

export function clampToBounds(
  x: number,
  y: number,
  overlay: { w: number; h: number },
  bounds: { w: number; h: number },
): { x: number; y: number } {
  return {
    x: Math.min(Math.max(0, x), Math.max(0, bounds.w - overlay.w)),
    y: Math.min(Math.max(0, y), Math.max(0, bounds.h - overlay.h)),
  }
}
