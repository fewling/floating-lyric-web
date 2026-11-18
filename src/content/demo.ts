import type { DemoMedia } from "@/types/content";

/** Set only after real public-release footage and its poster are verified. */
export const demoMedia: DemoMedia | undefined = undefined;

export const demo = {
  label: "Floating Lyrics Android demonstration",
  illustrationLabel: "Illustration of a lyrics window over another app",
  illustrationNotice: "Illustration — not app footage",
  caption: "A lyrics window, over another app",
  description:
    "The highlighted lyric line follows the music app’s playback position while the lyrics window stays visible over another app. Your music app plays the audio.",
  controls:
    "Play when you’re ready. The demonstration starts muted and stays still until you choose to play it.",
  stillImage: "View the still image",
  fallback: "Video unavailable? The description below explains the same experience.",
  illustration: {
    app: "Your music app",
    track: "Morning Window",
    artist: "Original demo lyrics",
    window: "Lyrics window",
    lines: [
      "Morning light across the room",
      "Open windows welcome the day",
      "Words beside the things we do",
    ],
  },
} as const;
