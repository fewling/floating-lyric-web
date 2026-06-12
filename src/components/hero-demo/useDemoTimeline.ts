"use client";

import { useEffect, useState } from "react";

/** Cycles through demo lines on their per-line durations. `paused` freezes at
 *  the current index (line 0 when set before the first advance — the
 *  prefers-reduced-motion case). Index loops forever.
 *  Pass a referentially stable `lines` array; an inline literal restarts the
 *  active line's timer on every consumer render. */
export function useDemoTimeline(lines: ReadonlyArray<{ durationMs: number }>, paused: boolean): number {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (paused || lines.length === 0) return;
    const timer = setTimeout(
      () => setIndex((i) => (i + 1) % lines.length),
      lines[index]?.durationMs ?? 4000,
    );
    return () => clearTimeout(timer);
  }, [index, paused, lines]);

  return index;
}
