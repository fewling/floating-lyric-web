import { ImageResponse } from "next/og";
import { siteConfig } from "@/content/site";

/**
 * Shared 1200×630 social-card renderer for the OpenGraph and Twitter image
 * routes. On-brand: ink background, electric-green accent, the wordmark and the
 * site tagline. Kept in one place so both routes stay identical.
 *
 * Token hexes are inlined here intentionally: next/og renders with Satori, which
 * does not run Tailwind or read the @theme CSS variables. The values mirror
 * src/app/globals.css (--color-ink / --color-accent / --color-fg / -muted).
 */
const INK = "#0F1115";
const SURFACE = "#15171C";
const ACCENT = "#15E085";
const FG = "#F3F5F4";
const FG_MUTED = "#9AA4B2";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function renderOgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "96px",
          background: `radial-gradient(circle at 78% 20%, ${SURFACE} 0%, ${INK} 60%)`,
          color: FG,
          fontFamily: "sans-serif",
        }}
      >
        {/* Wordmark: app-icon-style green notehead chip + name */}
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "84px",
              height: "84px",
              borderRadius: "20px",
              background: "rgba(21, 224, 133, 0.14)",
            }}
          >
            {/* Play glyph as a simple triangle, matching the in-app icon accent */}
            <svg width="44" height="44" viewBox="0 0 24 24">
              <polygon points="6 4 20 12 6 20" fill={ACCENT} />
            </svg>
          </div>
          <span style={{ fontSize: "44px", fontWeight: 700, letterSpacing: "-0.02em" }}>
            {siteConfig.name}
          </span>
        </div>

        {/* Tagline */}
        <div
          style={{
            display: "flex",
            marginTop: "56px",
            fontSize: "76px",
            fontWeight: 700,
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            maxWidth: "900px",
          }}
        >
          Lyrics that float over any app —{" "}
          <span style={{ color: ACCENT }}>&nbsp;translated by AI.</span>
        </div>

        {/* Supporting line */}
        <div
          style={{
            display: "flex",
            marginTop: "40px",
            fontSize: "32px",
            color: FG_MUTED,
            maxWidth: "820px",
          }}
        >
          Synced to your music. On Spotify, YouTube Music, games — anything on Android.
        </div>
      </div>
    ),
    { ...size },
  );
}
