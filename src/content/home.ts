export const home = {
  seoTitle: "Floating Lyrics — Stay in the song",
  seoDescription:
    "Keep synchronized lyrics visible while using another Android app. Bring LRC files, explore window styles, and learn how to get started.",
  helpLink: "Get more help",

  eyebrow: "Floating Lyrics for Android",
  title: ["Stay in the song.", "Keep doing your thing."],
  intro:
    "Your music plays. The words stay with you. Keep synchronized lyrics in view while you read, browse, or go about your day.",
  download: "Get it on Google Play",
  explore: "Explore the experience",
  requirements: "Requires notification access and permission to display over other apps.",
  requirementsLink: "See setup guide",
  scene: {
    label: "An interactive illustration of a lyrics window over another app",
    notice: "Interactive illustration. Original example lyrics, not app footage.",
    hint: "A little window. A little more freedom.",
    help: "Drag the lyrics window to move it. Or focus its handle and use the arrow keys. Home resets its position.",
    move: "Move illustrative lyrics window",
    reset: "Reset lyrics window position",
    themes: "Lyrics window appearance",
    light: "Light",
    dark: "Dark",
    contextLabel: "Choose an illustrative app context",
    contexts: ["Reading", "Browsing", "Listening"],
    windowTitle: "Floating Lyrics",
    lines: ["The world can wait a little", "Somewhere in the quiet,", "I find a little light."],
    appLabels: ["Journal", "Discover", "Your music"],
    leftNote: ["Your music.", "Still playing."],
    rightNote: ["Your words.", "Right here."],
    track: "A Little Light",

    artist: "Original demo lyrics",
    context: [
      {
        eyebrow: "A quiet moment",
        title: "Room to breathe.",
        text: "Small rituals. A slower morning. A little space for the things you love.",
      },
      {
        eyebrow: "Saved for later",
        title: "Follow your curiosity.",
        text: "Places to go. Things to make. Ideas that stay with you.",
      },
      {
        eyebrow: "Now playing",
        title: "A Little Light",
        text: "Original demo lyrics · Your music app plays the audio",
      },
    ],
  },
  story: {
    eyebrow: "Your music. Your space.",
    title: "The soundtrack stays.\nSo do the words.",
    text: "Floating Lyrics is a companion to your music app, not a music player. With matching timed lyrics, the highlighted line follows the playback position your music app shares.",
    note: "Line-by-line synchronization. Not word-by-word karaoke.",
  },
  library: {
    eyebrow: "Made for your collection",
    title: "Bring your own words.",
    text: "Have synchronized LRC files? Bring them along. Match your lyrics to the recording you love, then keep reading while your music app handles the sound.",
    link: "Explore LRC import",
    filename: "A Little Light.lrc",
    footer: "Plain text. Perfect timing.",
    lines: [
      "[00:00.00] The world can wait a little",
      "[00:05.00] Somewhere in the quiet,",
      "[00:10.00] I find a little light.",
    ],
    label: "Original example LRC text",
  },
  personal: {
    eyebrow: "Easy on the eyes",
    title: "Find your kind of quiet.",
    text: "Change lyric colours and background transparency to make a little space that feels like yours. Try the light and dark treatments in the illustration above.",
    link: "Try the window styles",
    label: "Illustrative colour and transparency treatments",
    light: "Light lyrics · translucent background",
    dark: "Green lyrics · dark background",
    caption: "Appearance illustrations · original lyrics",
    lines: ["Somewhere in the quiet,", "I find a little light."],
  },
  translation: {
    title: "A different language.\nThe same feeling.",
    text: "Lyric translation is available where supported. It requires a verified account, a supported app version, and service availability. It translates the lyrics, not the app interface.",
    link: "Questions about translation?",
  },
  setup: {
    eyebrow: "Before your first song",
    title: "A little setup.\nThen you’re in your flow.",
    link: "Read the setup guide",
    steps: [
      {
        title: "Connect to your music.",
        text: "Notification access lets Floating Lyrics read the music app’s track information and playback position.",
      },
      {
        title: "Make room for the words.",
        text: "Display-over-other-apps permission lets the lyrics window stay visible when you switch apps.",
      },
      {
        title: "Find the right match.",
        text: "Use lyrics timed for your recording. Availability and music-app compatibility vary by track and device.",
      },
    ],
  },
  faqTitle: "A few things to know.",
  faqs: [
    {
      q: "Does Floating Lyrics play my music?",
      a: "No. Keep using your music app for audio. Floating Lyrics is an Android companion that displays a lyrics window over another app.",
    },
    {
      q: "Will it work with my music app?",
      a: "It depends on the track information and playback position the music app shares through Android’s media session. Compatibility varies by app and device; not every player or track is guaranteed.",
    },
    {
      q: "What if lyrics are missing or out of sync?",
      a: "A matching lyric may not be available, or the timestamps may belong to another recording. Live versions, remixes, and shorter edits can have different timings. The setup guide includes troubleshooting, and you can bring your own synchronized LRC files.",
    },
    {
      q: "What does translation require?",
      a: "Where available, lyric translation needs sign-in with a verified account, a supported app version, and service availability. Check the installed app for current access. Lyric translation is separate from interface language.",
    },
    {
      q: "Where can I get help or request account deletion?",
      a: "Visit Support for the published support email and account or personal-data deletion request instructions. Privacy information is linked there too.",
    },
  ],
  final: {
    title: "Give your lyrics\na little room.",
    text: "For the songs that go wherever you do.",
    scan: "On your computer?",
    scanText: "Scan to open Floating Lyrics on Google Play.",
    qrAlt: "QR code for the Floating Lyrics Google Play listing",
    direct: "Open Google Play",
  },
} as const;
