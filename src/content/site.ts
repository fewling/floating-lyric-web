import type { NavLink } from "@/types/content";

/**
 * Global site configuration. Update `url` to the real domain before deploying,
 * and confirm `playStoreUrl` points to YOUR listing (there is a name-collision
 * app at com.ai.lyrics.floating).
 */
export const siteConfig = {
  name: "Floating Lyrics",
  url: "https://floatinglyrics.app",
  tagline: "Keep lyrics visible while using another app.",
  description:
    "Keep synchronized lyrics visible in a lyrics window while using another Android app. Learn about permissions, compatibility, and bringing your LRC collection.",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.floating.lyrics",
  github: "https://github.com/fewling/flutter-floating-lyric",
  supportEmail: "floatinglyricsapp@gmail.com",
  nav: [
    { label: "How it works", href: "/#how" },
    { label: "Features", href: "/#features" },
    { label: "FAQ", href: "/#faq" },
  ] satisfies NavLink[],
} as const;
