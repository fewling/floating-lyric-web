import { siteConfig } from "./site";
import type { ProsePage } from "@/types/content";

export const privacyContent: ProsePage = {
  title: "Privacy Policy",
  updated: "2026-06-12",
  sections: [
    {
      heading: "Accounts are optional",
      paragraphs: [
        "The core app — floating overlay, auto-sync, lyric search, and LRC import — works without sign-up. Creating an account (email and password) is only needed for AI translation; we store your email for sign-in and a per-account usage counter for rate limiting. We don't build advertising or interest profiles.",
      ],
    },
    {
      heading: "Your lyrics stay on your device",
      paragraphs: [
        "Imported .LRC files are stored locally on your device and never uploaded.",
        "To detect what's playing, the app reads Android's media session on-device. When no matching local lyric exists, the app automatically queries the public LRCLIB service (lrclib.net) with the track's title, artist and album to find synced lyrics.",
      ],
    },
    {
      heading: "AI translation requests",
      paragraphs: [
        "When you translate a lyric line, the line text is sent securely to our AI providers — Google Cloud services (via Firebase) and DeepSeek — to return the result. We keep a per-account usage counter for rate limiting — not the lyrics you translate. Translation requests aren't used to build a profile of you.",
      ],
    },
    {
      heading: "Diagnostics",
      paragraphs: [
        "The app uses Firebase Crashlytics to receive crash reports and Firebase Analytics for aggregate usage statistics. These reports include device information and never include your lyrics or music library.",
      ],
    },
    {
      heading: "This website",
      paragraphs: [
        "This site serves static pages, sets no tracking cookies, and runs no analytics scripts.",
      ],
    },
    {
      heading: "Children",
      paragraphs: [
        "Floating Lyrics is not directed at children under 13 and we do not knowingly collect their data.",
      ],
    },
    {
      heading: "Changes to this policy",
      paragraphs: [
        "We'll update this page when the policy changes and revise the 'Last updated' date above.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: [
        "Questions about this policy? Email us:",
        "You can also ask us to delete your account and its data.",
      ],
      links: [{ label: siteConfig.supportEmail, href: `mailto:${siteConfig.supportEmail}` }],
    },
  ],
};
