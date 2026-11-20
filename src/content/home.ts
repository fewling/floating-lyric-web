export const home = {
  seoTitle: "Floating Lyrics for Android — Synced Lyrics Over Other Apps",
  seoDescription:
    "Keep synchronized lyrics over your Android apps. Try the website demo, then get Floating Lyrics on Google Play.",
  eyebrow: "Floating Lyrics for Android",
  title: ["Your lyrics.", "Over your apps."],
  download: "Get the app",
  scene: {
    label: "Illustration of an Android phone; the live demo lyrics float over this website",
    contextLabel: "Choose an illustrative app context",
    contexts: ["Reading", "Browsing", "Listening"],
    appLabels: ["Journal", "Discover", "Your music"],
    context: [
      { eyebrow: "Today", title: "Room to breathe.", text: "A slower morning." },
      { eyebrow: "Saved", title: "Follow your curiosity.", text: "Places to go. Things to make." },
      { eyebrow: "Music player", title: "Small Hours", text: "Floating Lyrics prototype" },
    ],
  },
  library: {
    eyebrow: "Timed lyrics",
    title: "Bring your own words.",
    text: "Import an LRC timed for your recording.",
    link: "LRC import guide",
    filename: "Small Hours.lrc",
    footer: "Small Hours · matching demo timestamps",
    lines: [
      "[00:02.00] The city settles into blue",
      "[00:06.00] A little light comes drifting through",
      "[00:10.00] We take the long way home tonight",
    ],
    label: "Timed lyric example matching the Small Hours demo: a timestamp beside each line",
  },
  guides: [
    {
      href: "/setup/",
      title: "Set up on Android",
      detail: "Permissions, players & lyric matching",
    },
    { href: "/support/", title: "Get help", detail: "Support & account requests" },
  ],
  faqTitle: "Before you install",
  faqs: [
    {
      q: "Does the app play music?",
      a: "Your music player supplies the audio on Android. This website plays its own demo track.",
    },
    {
      q: "Will it work with my player?",
      a: "It depends on the track information and playback position your player shares. Compatibility varies by player, track and device.",
    },
    {
      q: "Missing lyrics or wrong timing?",
      a: "Use lyrics for the same recording. Live versions and remixes can have different timings. The setup and LRC guides cover matching and troubleshooting.",
    },
    {
      q: "Is lyric translation available?",
      a: "Where supported, translation needs a verified account, a supported app version and service availability. It translates lyrics, not the app interface. Check the installed app for access.",
    },
  ],
  helpLink: "Support & account deletion",
  final: {
    title: "Take it to Android.",
    scan: "Scan for Google Play",
    scanText: "Android app",
    qrAlt: "QR code for the Floating Lyrics Google Play listing",
    direct: "Open Google Play",
  },
};
