import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { useDemoTimeline } from "./useDemoTimeline";

const lines = [{ durationMs: 1000 }, { durationMs: 2000 }, { durationMs: 1000 }];

describe("useDemoTimeline", () => {
  beforeEach(() => vi.useFakeTimers());
  afterEach(() => vi.useRealTimers());

  it("starts at line 0 and advances per line duration, looping", () => {
    const { result } = renderHook(() => useDemoTimeline(lines, false));
    expect(result.current).toBe(0);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe(1);
    act(() => vi.advanceTimersByTime(2000));
    expect(result.current).toBe(2);
    act(() => vi.advanceTimersByTime(1000));
    expect(result.current).toBe(0); // loops
  });

  it("stays static when paused (reduced motion)", () => {
    const { result } = renderHook(() => useDemoTimeline(lines, true));
    act(() => vi.advanceTimersByTime(10_000));
    expect(result.current).toBe(0);
  });
});
