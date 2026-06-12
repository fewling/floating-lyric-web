import type { FaqItem, Feature, Step } from "@/types/content";

export const hero = {
  headlineLead: "Lyrics that float over",
  headlineAccent: "any app.",
  subhead:
    "Synced to whatever's playing, translated by AI. Spotify, YouTube Music, games — the words follow you everywhere.",
  secondary: { label: "How it works", href: "#how" },
} as const;

export const steps: Step[] = [
  {
    n: 1,
    title: "Install & open",
    body: "Grab Floating Lyrics from Google Play and open it.",
  },
  {
    n: 2,
    title: "Allow the overlay",
    body: "One tap grants the “display over other apps” permission.",
  },
  {
    n: 3,
    title: "Play any music",
    body: "Lyrics appear on top and sync automatically. Tap to translate.",
  },
];

export const features: Feature[] = [
  {
    icon: "sync",
    title: "Auto-sync with any player",
    body: "Reads Android’s media session, so it follows whatever’s playing without signing into anything.",
  },
  {
    icon: "search",
    title: "Find or bring your lyrics",
    body: "Search online for the track you’re hearing, or import your own .LRC files and keep them offline.",
  },
  {
    icon: "sparkles",
    title: "AI translation",
    body: "Turn any line into your language, instantly.",
  },
  {
    icon: "sliders",
    title: "Make it yours",
    body: "Customize fonts, colors, transparency, and alignment.",
  },
];

export const faq: FaqItem[] = [
  {
    q: "Is it free?",
    a: "Yes. The lyric overlay, auto-sync, search, and local LRC import are free forever. Unlimited AI translation is an optional one-time Pro unlock — no subscription.",
  },
  {
    q: "Does it work with Spotify or YouTube Music?",
    a: "Yes. It reads Android’s media session, so it syncs with virtually any music or video app without you logging into them.",
  },
  {
    q: "Do I need an account?",
    a: "No for everything core — the overlay, auto-sync, search, and LRC import work without sign-up. A free account is only needed for AI translation.",
  },
  {
    q: "Which languages can it translate?",
    a: "A wide range, powered by AI — great for K-pop, J-pop, Latin, anime, C-pop, Bollywood and more.",
  },
  {
    q: "Why does it need the overlay permission?",
    a: "Android requires the “display over other apps” permission to draw lyrics on top of your music app. It’s the only way an overlay can float.",
  },
  {
    q: "Is my data private?",
    a: "Your imported LRC files stay on your device. Translation requests are processed securely to return results — the app doesn’t build a profile of you.",
  },
];
