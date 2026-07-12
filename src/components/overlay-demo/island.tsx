'use client'

import { useEffect, useRef, useState } from 'react'
import { clampToBounds, lyricIndexAt } from './engine'
import { DEMO_DURATION_MS, DEMO_LINES } from './demo-track'
import {
  CARD_X,
  CARD_Y,
  OVERLAY_H,
  OVERLAY_W,
  PHONE_H,
  PHONE_W,
  SNAP_LINE_INDEX,
  Scene,
} from './snapshot'

const KEY_STEP = 8
/** The overlay card stays inside the phone's screen, not the bezel. */
const SCREEN_INSET = 10

const NUDGE: Record<string, readonly [number, number]> = {
  ArrowLeft: [-KEY_STEP, 0],
  ArrowRight: [KEY_STEP, 0],
  ArrowUp: [0, -KEY_STEP],
  ArrowDown: [0, KEY_STEP],
}

function clampToScreen(x: number, y: number) {
  const c = clampToBounds(
    x - SCREEN_INSET,
    y - SCREEN_INSET,
    { w: OVERLAY_W, h: OVERLAY_H },
    { w: PHONE_W - 2 * SCREEN_INSET, h: PHONE_H - 2 * SCREEN_INSET },
  )
  return { x: c.x + SCREEN_INSET, y: c.y + SCREEN_INSET }
}

export interface DemoLabels {
  regionLabel: string
  dragHandle: string
  translateToggle: string
}

export default function OverlayDemoIsland({ labels }: { labels: DemoLabels }) {
  const [pos, setPos] = useState({ x: CARD_X, y: CARD_Y })
  const [showTranslation, setShowTranslation] = useState(true)
  // Seeded with the exact moment the static snapshot depicts, so the island
  // continues seamlessly from the line already on screen.
  const [tMs, setTMs] = useState(DEMO_LINES[SNAP_LINE_INDEX].atMs)
  const [dragging, setDragging] = useState(false)
  const rootRef = useRef<HTMLDivElement>(null)
  const dragFrom = useRef<{
    id: number
    px: number
    py: number
    x: number
    y: number
  }>(null)
  // False on the very first client render so the line sweep never plays at
  // the snapshot-to-island swap; true on every render after mount.
  const hydratedRef = useRef(false)
  useEffect(() => {
    hydratedRef.current = true
  }, [])

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    const root = rootRef.current
    if (!root) return
    let raf = 0
    let last = 0
    let inView = false
    const tick = (now: number) => {
      if (last) setTMs((t) => (t + now - last) % DEMO_DURATION_MS)
      last = now
      raf = requestAnimationFrame(tick)
    }
    const start = () => {
      if (!raf && inView && !document.hidden) {
        last = 0
        raf = requestAnimationFrame(tick)
      }
    }
    const stop = () => {
      cancelAnimationFrame(raf)
      raf = 0
    }
    const io = new IntersectionObserver((entries) => {
      inView = entries[entries.length - 1].isIntersecting
      if (inView) start()
      else stop()
    })
    io.observe(root)
    const onVisibility = () => (document.hidden ? stop() : start())
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      stop()
      io.disconnect()
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [])

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    // Primary pointer + main button only: no right-click ghost-drags, no
    // second-finger delta mixing.
    if (e.button !== 0 || !e.isPrimary) return
    try {
      e.currentTarget.setPointerCapture(e.pointerId)
    } catch {
      // Synthetic or already-inactive pointer — drag still works, just
      // without capture.
    }
    dragFrom.current = {
      id: e.pointerId,
      px: e.clientX,
      py: e.clientY,
      x: pos.x,
      y: pos.y,
    }
    setDragging(true)
  }
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const f = dragFrom.current
    if (!f || e.pointerId !== f.id) return
    setPos(clampToScreen(f.x + e.clientX - f.px, f.y + e.clientY - f.py))
  }
  const endDrag = (e: React.PointerEvent<HTMLDivElement>) => {
    if (dragFrom.current && e.pointerId !== dragFrom.current.id) return
    dragFrom.current = null
    setDragging(false)
  }
  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const d = NUDGE[e.key]
    if (!d) return
    e.preventDefault()
    setPos((p) => clampToScreen(p.x + d[0], p.y + d[1]))
  }

  const idx = lyricIndexAt(tMs, DEMO_LINES, DEMO_DURATION_MS)
  const line = DEMO_LINES[idx]
  const sweep = hydratedRef.current

  return (
    <div
      ref={rootRef}
      role="group"
      aria-label={labels.regionLabel}
      data-testid="overlay-demo"
      style={{ width: PHONE_W, height: PHONE_H }}
      className="relative select-none"
    >
      <svg
        width={PHONE_W}
        height={PHONE_H}
        viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
        aria-hidden="true"
        className="block"
      >
        <Scene tMs={tMs} />
      </svg>
      <div
        data-testid="overlay-card"
        role="group"
        aria-label={labels.dragHandle}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={endDrag}
        onPointerCancel={endDrag}
        onKeyDown={onKeyDown}
        style={{
          width: OVERLAY_W,
          height: OVERLAY_H,
          transform: `translate3d(${pos.x}px, ${pos.y}px, 0)`,
        }}
        className={`absolute top-0 left-0 touch-none overflow-hidden rounded-2xl bg-black/55 pt-[12px] ring-1 ring-white/14 ring-inset focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-hilite ${
          dragging
            ? 'cursor-grabbing'
            : 'cursor-grab motion-safe:transition-transform motion-safe:duration-200 motion-safe:ease-out'
        }`}
      >
        <div
          key={idx}
          className={`mx-2 rounded-md text-center ${
            sweep
              ? 'motion-safe:transition-colors motion-safe:duration-700 starting:bg-hilite/10'
              : ''
          }`}
        >
          <p
            data-testid="line-kr"
            className="font-kr text-[11px] leading-4 whitespace-nowrap text-tonal/78"
          >
            {line.kr}
          </p>
          <p
            data-testid="line-en"
            className={`font-display mt-[2px] text-[11.5px] leading-5 font-bold tracking-[-0.01em] whitespace-nowrap text-hilite ${
              sweep
                ? 'motion-safe:transition-colors motion-safe:duration-700 starting:text-hilite/30'
                : ''
            } ${showTranslation ? '' : 'invisible'}`}
          >
            {line.en}
          </p>
        </div>
        <div className="mt-3 flex justify-center gap-2 font-mono text-[9px] text-tonal/85">
          <button
            type="button"
            data-testid="translate-toggle"
            aria-pressed={showTranslation}
            aria-label={labels.translateToggle}
            onPointerDown={(e) => e.stopPropagation()}
            onClick={() => setShowTranslation((v) => !v)}
            className={`flex h-5 w-[88px] cursor-pointer items-center justify-center rounded-full border border-white/12 bg-white/8 focus-visible:outline-2 focus-visible:outline-hilite motion-safe:transition-opacity ${
              showTranslation ? '' : 'opacity-55'
            }`}
          >
            文A translate
          </button>
          <span
            aria-hidden="true"
            className="flex h-5 w-[52px] items-center justify-center rounded-full border border-white/12 bg-white/8"
          >
            ⠿ drag
          </span>
        </div>
      </div>
    </div>
  )
}
