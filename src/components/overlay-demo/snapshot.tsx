import { useId } from 'react'
import { DEMO_DURATION_MS, DEMO_LINES, DEMO_TRACK_TITLE } from './demo-track'

export const PHONE_W = 280
export const PHONE_H = 560

/*
 * Shared seam constants. The static snapshot and the live island must agree
 * on these exactly, or the placeholder-to-island swap becomes visible.
 */
/** The frozen moment the snapshot depicts — the island hydrates from the same line. */
export const SNAP_LINE_INDEX = 4
export const CARD_X = 24
export const CARD_Y = 180
export const OVERLAY_W = 232
export const OVERLAY_H = 96

const SNAP_LINE = DEMO_LINES[SNAP_LINE_INDEX]

function trackTime(tMs: number): string {
  const s = Math.floor(tMs / 1000)
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`
}

/**
 * Phone chrome + music-player backdrop as raw SVG nodes. Rendered by both the
 * static snapshot and the live island, so the placeholder-to-island swap is
 * pixel-identical everywhere except the overlay card. Pure vector — no
 * <image>, no filters — so it can never become an LCP candidate.
 */
export function Scene({
  contextLabel,
  tMs = SNAP_LINE.atMs,
}: {
  contextLabel?: string
  tMs?: number
}) {
  // Several snapshots can share a page (intent pages), so the gradient id
  // must be unique per instance. useId output is sanitized for url(#...) use.
  const glowId = `demo-glow-${useId().replace(/[^a-zA-Z0-9_-]/g, '')}`
  const t = tMs % DEMO_DURATION_MS
  const barW = Math.round(232 * (t / DEMO_DURATION_MS))
  return (
    <>
      <defs>
        <radialGradient id={glowId}>
          <stop offset="0" stopColor="#22C55E" stopOpacity=".14" />
          <stop offset="1" stopColor="#22C55E" stopOpacity="0" />
        </radialGradient>
      </defs>
      {/* device body + bezel highlight */}
      <rect width="280" height="560" rx="36" fill="#1A231D" />
      <rect
        x="1"
        y="1"
        width="278"
        height="558"
        rx="35"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".07"
      />
      {/* screen */}
      <rect
        x="10"
        y="10"
        width="260"
        height="540"
        rx="28"
        fill="#000000"
        opacity=".3"
      />
      <circle cx="140" cy="452" r="150" fill={`url(#${glowId})`} />
      {/* status bar + punch-hole camera */}
      <text
        x="28"
        y="30"
        fontSize="9"
        className="font-mono"
        fill="#FFFFFF"
        fillOpacity=".5"
      >
        23:42
      </text>
      <circle cx="140" cy="26" r="4" fill="#000000" opacity=".8" />
      <rect
        x="234"
        y="21.5"
        width="15"
        height="8"
        rx="2.5"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".45"
      />
      <rect
        x="236"
        y="23.5"
        width="8"
        height="4"
        rx="1"
        fill="#FFFFFF"
        fillOpacity=".7"
      />
      <rect
        x="250"
        y="24"
        width="2"
        height="3"
        rx="1"
        fill="#FFFFFF"
        fillOpacity=".45"
      />
      {/* album art with a beamed eighth-note glyph */}
      <rect
        x="40"
        y="64"
        width="200"
        height="200"
        rx="20"
        fill="#DFE8D4"
        fillOpacity=".12"
      />
      <g transform="translate(140 148) scale(2.4)">
        <path
          d="M-4.3 7 V-9.5 M11.7 3.5 V-13"
          stroke="#22C55E"
          strokeOpacity=".85"
          strokeWidth="2"
          fill="none"
        />
        <g fill="#22C55E" fillOpacity=".85">
          <path d="M-4.3 -9.5 L11.7 -13 L11.7 -9 L-4.3 -5.5 Z" />
          <ellipse cx="-8.5" cy="7" rx="4.4" ry="3.3" />
          <ellipse cx="7.5" cy="3.5" rx="4.4" ry="3.3" />
        </g>
      </g>
      {/* now-playing caption + track title */}
      <text
        x="24"
        y="362"
        fontSize="9"
        letterSpacing="1.5"
        className="font-mono"
        fill="#DFE8D4"
        fillOpacity=".6"
      >
        {contextLabel ?? 'NOW PLAYING'}
      </text>
      <text
        x="24"
        y="382"
        fontSize="13"
        fontWeight="600"
        className="font-body"
        fill="#FFFFFF"
        fillOpacity=".92"
      >
        {DEMO_TRACK_TITLE}
      </text>
      {/* progress */}
      <rect
        x="24"
        y="398"
        width="232"
        height="4"
        rx="2"
        fill="#FFFFFF"
        fillOpacity=".15"
      />
      <rect x="24" y="398" width={barW} height="4" rx="2" fill="#22C55E" />
      <circle cx={24 + barW} cy="400" r="4.5" fill="#FFFFFF" />
      <text
        x="24"
        y="418"
        fontSize="8"
        className="font-mono"
        fill="#DFE8D4"
        fillOpacity=".55"
      >
        {trackTime(t)}
      </text>
      <text
        x="256"
        y="418"
        fontSize="8"
        textAnchor="end"
        className="font-mono"
        fill="#DFE8D4"
        fillOpacity=".55"
      >
        {trackTime(DEMO_DURATION_MS)}
      </text>
      {/* transport controls */}
      <g fill="#FFFFFF" fillOpacity=".75">
        <path d="M98 444 L87 452 L98 460 Z" />
        <rect x="83.5" y="444" width="2.5" height="16" rx="1" />
        <path d="M182 444 L193 452 L182 460 Z" />
        <rect x="194" y="444" width="2.5" height="16" rx="1" />
      </g>
      <circle cx="140" cy="452" r="22" fill="#C9F4A9" />
      <path d="M134.5 443.5 L151 452 L134.5 460.5 Z" fill="#1A231D" />
      {/* home indicator */}
      <rect
        x="112"
        y="534"
        width="56"
        height="4"
        rx="2"
        fill="#FFFFFF"
        fillOpacity=".25"
      />
    </>
  )
}

/**
 * Static, server-rendered stand-in for the live demo. Pure vector so it adds
 * no LCP candidate; same footprint as the island (PHONE_W x PHONE_H) so the
 * swap causes zero layout shift.
 */
export function DemoSnapshot({
  contextLabel,
  label = 'Preview of the floating lyrics overlay above a music player',
}: {
  contextLabel?: string
  label?: string
}) {
  const cardCenterX = CARD_X + OVERLAY_W / 2
  return (
    <svg
      width={PHONE_W}
      height={PHONE_H}
      viewBox={`0 0 ${PHONE_W} ${PHONE_H}`}
      role="img"
      aria-label={label}
      className="block"
    >
      <Scene contextLabel={contextLabel} />
      {/* overlay card — frozen at the line + position the island hydrates with */}
      <rect
        x={CARD_X}
        y={CARD_Y}
        width={OVERLAY_W}
        height={OVERLAY_H}
        rx="16"
        fill="#000000"
        opacity=".55"
      />
      <rect
        x={CARD_X + 0.5}
        y={CARD_Y + 0.5}
        width={OVERLAY_W - 1}
        height={OVERLAY_H - 1}
        rx="15.5"
        fill="none"
        stroke="#FFFFFF"
        strokeOpacity=".14"
      />
      <text
        x={cardCenterX}
        y="205"
        textAnchor="middle"
        fontSize="11"
        className="font-kr"
        fill="#DFE8D4"
        fillOpacity=".78"
      >
        {SNAP_LINE.kr}
      </text>
      <text
        x={cardCenterX}
        y="224"
        textAnchor="middle"
        fontSize="11.5"
        fontWeight="700"
        letterSpacing="-.115"
        className="font-display"
        fill="#C9F4A9"
      >
        {SNAP_LINE.en}
      </text>
      <g className="font-mono" fontSize="9">
        <rect
          x="66"
          y="242"
          width="88"
          height="20"
          rx="10"
          fill="#FFFFFF"
          fillOpacity=".08"
          stroke="#FFFFFF"
          strokeOpacity=".12"
        />
        <text
          x="110"
          y="255"
          textAnchor="middle"
          fill="#DFE8D4"
          fillOpacity=".85"
        >
          文A translate
        </text>
        <rect
          x="162"
          y="242"
          width="52"
          height="20"
          rx="10"
          fill="#FFFFFF"
          fillOpacity=".08"
          stroke="#FFFFFF"
          strokeOpacity=".12"
        />
        <text
          x="188"
          y="255"
          textAnchor="middle"
          fill="#DFE8D4"
          fillOpacity=".85"
        >
          ⠿ drag
        </text>
      </g>
    </svg>
  )
}
