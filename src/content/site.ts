import type { NavLink } from "@/types/content";

/** Existing Firebase Hosting origin; owner must approve it before deployment.
 * Set SITE_ORIGIN at build time for an approved custom origin.
 */
const origin = new URL(process.env.SITE_ORIGIN || "https://floating-lyrics.web.app");
if (
  origin.protocol !== "https:" ||
  origin.pathname !== "/" ||
  origin.search ||
  origin.hash ||
  origin.username ||
  origin.password
) {
  throw new Error("SITE_ORIGIN must be an HTTPS origin without a path, query, or credentials");
}

export const siteConfig = {
  name: "Floating Lyrics",
  url: origin.origin,
  tagline: "Keep lyrics visible while using another app.",
  description:
    "Keep synchronized lyrics visible in a lyrics window while using another Android app. Learn about permissions, compatibility, and bringing your LRC collection.",
  socialImageAlt:
    "Floating Lyrics. Keep lyrics visible while using another app. Android lyrics window and LRC import guides.",
  playStoreUrl: "https://play.google.com/store/apps/details?id=com.floating.lyrics",
  github: "https://github.com/fewling/flutter-floating-lyric",
  supportEmail: "floatinglyricsapp@gmail.com",
  nav: [
    { label: "How it works", href: "/#how" },
    { label: "Setup help", href: "/setup/" },
    { label: "LRC guide", href: "/lrc/" },
  ] satisfies NavLink[],
  footerNav: [
    { label: "Home", href: "/" },
    { label: "Setup & troubleshooting", href: "/setup/" },
    { label: "LRC import guide", href: "/lrc/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Support", href: "/support/" },
  ] satisfies NavLink[],
} as const;
