export const SITE = {
  name: "Floating Lyrics",
  downloadLabel: "Get the app",
  footerNote: "An Android companion. Your music app plays the audio.",
  description:
    "An Android companion that keeps synchronized lyrics visible while you use another app.",
  socialAlt: "Floating Lyrics. Stay in the song. Keep doing your thing.",

  url: "https://floating-lyrics.web.app",
  play: "https://play.google.com/store/apps/details?id=com.floating.lyrics",
  support: "floatinglyricsapp@gmail.com",
  nav: [
    { label: "Overview", href: "/" },
    { label: "Setup", href: "/setup/" },
    { label: "LRC guide", href: "/lrc/" },
  ],
  footer: [
    { label: "Setup guide", href: "/setup/" },
    { label: "LRC import", href: "/lrc/" },
    { label: "Privacy", href: "/privacy/" },
    { label: "Support & account deletion", href: "/support/" },
  ],
} as const;
