import type { NavLink } from "@/types/content";

/**
 * Global site configuration. Update `url` to the real domain before deploying,
 * and confirm `playStoreUrl` points to YOUR listing (there is a name-collision
 * app at com.ai.lyrics.floating).
 */
export const siteConfig = {
  name: "Floating Lyrics",
  url: "https://floatinglyrics.app",
  tagline: "Lyrics that float over any app.",
  description:
    "See synced, AI-translated song lyrics in a floating overlay on top of any app on Android — Spotify, YouTube Music, games, anything. Free core, no account, low battery.",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.floating.lyrics",
  github: "https://github.com/fewling/flutter-floating-lyric",
  nav: [
    { label: "Features", href: "#features" },
    { label: "How it works", href: "#how" },
    { label: "Pricing", href: "#pricing" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavLink[],
} as const;
