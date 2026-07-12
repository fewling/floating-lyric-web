import { describe, expect, test } from 'vitest'
import { clampToBounds, lyricIndexAt } from './engine'
import { DEMO_DURATION_MS, DEMO_LINES } from './demo-track'

describe('lyricIndexAt', () => {
  test('t=0 is the first line', () =>
    expect(lyricIndexAt(0, DEMO_LINES, DEMO_DURATION_MS)).toBe(0))
  test('mid-line time returns that line', () =>
    expect(lyricIndexAt(5_500, DEMO_LINES, DEMO_DURATION_MS)).toBe(1))
  test('exact boundary belongs to the new line', () =>
    expect(lyricIndexAt(8_000, DEMO_LINES, DEMO_DURATION_MS)).toBe(2))
  test('past the last timestamp holds the last line', () =>
    expect(lyricIndexAt(41_999, DEMO_LINES, DEMO_DURATION_MS)).toBe(
      DEMO_LINES.length - 1,
    ))
  test('wraps around the loop', () =>
    expect(
      lyricIndexAt(DEMO_DURATION_MS + 4_500, DEMO_LINES, DEMO_DURATION_MS),
    ).toBe(1))
})

describe('clampToBounds', () => {
  const overlay = { w: 100, h: 40 }
  const bounds = { w: 300, h: 500 }
  test('inside stays put', () =>
    expect(clampToBounds(50, 60, overlay, bounds)).toEqual({ x: 50, y: 60 }))
  test('negative clamps to 0', () =>
    expect(clampToBounds(-20, -5, overlay, bounds)).toEqual({ x: 0, y: 0 }))
  test('overflow clamps to max', () =>
    expect(clampToBounds(999, 999, overlay, bounds)).toEqual({
      x: 200,
      y: 460,
    }))
})
