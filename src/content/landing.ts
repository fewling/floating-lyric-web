import type { FaqItem, Feature, Step } from "@/types/content";

export const hero = {
  headlineLead: "Keep lyrics visible",
  headlineAccent: "while using another app.",
  subhead:
    "Floating Lyrics is an Android companion: your music app plays the audio, while a lyrics window keeps the words in view. The current lyric line follows the music app’s playback position, not word-by-word karaoke.",
  secondary: { label: "How it works", href: "#how" },
} as const;

export const howItWorks = {
  eyebrow: "Before you install",
  title: "Your music app, with lyrics in view",
} as const;

export const steps: Step[] = [
  {
    n: 1,
    title: "Connect to playback",
    body: "Notification access lets Floating Lyrics detect the music app’s media session. Synchronization depends on the track information and playback position that app shares; compatibility varies.",
  },
  {
    n: 2,
    title: "Allow the lyrics window",
    body: "Android’s “display over other apps” permission lets the lyrics window stay visible while you use another app. Enable it in Android settings during setup.",
  },
  {
    n: 3,
    title: "Find matching lyrics",
    body: "Lyrics are not available for every track. Matching depends on track details and the recording; synchronized lyrics need timestamps that fit your version of the song.",
  },
];

export const featureIntro = {
  title: "More ways to read your lyrics",
  subtitle:
    "Bring your collection, choose your reading style, and explore lyric translation where available.",
} as const;

export const features: Feature[] = [
  {
    icon: "sync",
    title: "Follow the current line",
    body: "Synchronized lyrics use line timestamps and the music app’s playback position. Timing depends on the lyrics matching the recording you play.",
  },
  {
    icon: "search",
    title: "Bring your LRC collection",
    body: "LRC files pair lyric lines with timestamps. Use your own synchronized lyrics alongside the audio playing in your music app.",
  },
  {
    icon: "sparkles",
    title: "Lyric translation",
    body: "Translation renders lyric text in another language; it does not change the interface language. It requires sign-in with a verified account, a supported app version, and service availability. Check availability in the app.",
  },
  {
    icon: "sliders",
    title: "Customize your reading view",
    body: "Adjust lyric colours and background transparency to suit your reading view. For example, use light lyrics on an opaque background or green lyrics on a translucent background.",
  },
];

export const faq: FaqItem[] = [
  {
    q: "Does Floating Lyrics play music?",
    a: "Your music app plays the audio. Floating Lyrics is a companion that displays a lyrics window while you use another app.",
  },
  {
    q: "Will it work with my music app?",
    a: "It depends on the Android media session your music app exposes, including track details and playback position. Compatibility varies by music app and device; every player and track cannot be guaranteed.",
  },
  {
    q: "Why might lyrics be missing or out of time?",
    a: "A matching lyric file may be unavailable, or its timestamps may fit a different recording. Track details shared by your music app also affect matching. Live versions, remixes, and alternate releases can differ.",
  },
  {
    q: "What does lyric translation require?",
    a: "Where available, lyric translation requires sign-in with a verified account, a supported app version, and service availability. It translates lyric text rather than the app’s interface. Check the app for current access conditions.",
  },
  {
    q: "Why are Android permissions needed?",
    a: "Notification access connects Floating Lyrics to music playback information. Display over other apps allows the lyrics window to appear over another app. Android presents these permissions in settings during setup.",
  },
  {
    q: "Where can I check privacy and get help?",
    a: "Read the privacy policy for app and website practices, and visit Support for help and account-deletion information. Those pages are linked below.",
  },
];

export const customization = {
  title: "Choose a reading style",
  description:
    "Illustrations of lyric colour and background transparency, not app captures or settings screens. The words are original example lyrics; these are appearance examples, not preset names.",
  lyric: "We carry the morning home",
  examples: [
    { title: "Light lyrics, opaque background", translucent: false },
    { title: "Green lyrics, translucent background", translucent: true },
  ],
} as const;
