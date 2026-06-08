import type { FaqItem, Feature, Pillar, PricingTier, Step } from "@/types/content";

export const hero = {
  headlineLead: "Lyrics that float over any app — synced to your music,",
  headlineAccent: "translated by AI.",
  subhead:
    "Synced lyrics float on top of Spotify, YouTube Music, games — anything. They translate instantly, so you finally understand the song you love.",
  secondary: { label: "See how it works", href: "#how" },
} as const;

export const pillars: Pillar[] = [
  {
    icon: "layers",
    title: "Over anything",
    body: "Lyrics stay on top of Spotify, YouTube Music, games, your browser — any app, no switching back and forth.",
  },
  {
    icon: "languages",
    title: "Understand any language",
    body: "Instant AI translation while you listen. K-pop, J-pop, Latin, anime — read along and actually get it.",
  },
  {
    icon: "shield",
    title: "Yours & private",
    body: "Bring your own .LRC files, no account required, light on battery. Your lyrics, your way.",
  },
];

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
    title: "Online lyric search",
    body: "Find lyrics for the track you’re listening to.",
  },
  {
    icon: "file",
    title: "Local LRC import",
    body: "Load and manage your own synced lyric files offline.",
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

export const fandoms: string[] = [
  "POV: you finally understand your bias’s lyrics — line by line.",
  "Anime openings hit different when you can read along.",
  "Sing the Spanish chorus AND know what it means.",
];

export const pricing: { note: string; tiers: PricingTier[] } = {
  note: "The whole experience is free. Pro just removes the daily cap on AI translation — one payment, yours for good.",
  tiers: [
    {
      name: "Free",
      price: "Free",
      tagline: "Everything you need, forever.",
      features: [
        "Floating lyric overlay",
        "Auto-sync with any app",
        "Online lyric search",
        "Local LRC import",
        "Full customization",
      ],
    },
    {
      name: "Pro",
      price: "One-time",
      tagline: "Unlimited AI translation. No subscription, ever.",
      highlight: true,
      features: [
        "Everything in Free",
        "Unlimited AI translation",
        "No daily translation cap",
        "Support ongoing development",
      ],
    },
  ],
};

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
    a: "No. The core app works with no sign-up.",
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
    a: "No account is required and your imported LRC files stay on your device. Translation requests are processed securely to return results — the app doesn’t build a profile of you.",
  },
];
