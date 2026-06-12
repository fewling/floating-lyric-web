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
  playStoreUrl:
    "https://play.google.com/store/apps/details?id=com.floating.lyrics&utm_source=website&utm_medium=landing",
  github: "https://github.com/fewling/flutter-floating-lyric",
  supportEmail: "blueinnotaiwan@gmail.com",
  nav: [
    { label: "How it works", href: "#how" },
    { label: "Features", href: "#features" },
    { label: "FAQ", href: "#faq" },
  ] satisfies NavLink[],
} as const;
