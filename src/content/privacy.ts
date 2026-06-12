import { siteConfig } from "./site";
import type { ProsePage } from "@/types/content";

export const privacyContent: ProsePage = {
  title: "Privacy Policy",
  updated: "2026-06-11",
  sections: [
    {
      heading: "No account, no profile",
      paragraphs: [
        "Floating Lyrics works without sign-up. We do not collect names, emails, or identifiers, and we do not build a profile of you.",
      ],
    },
    {
      heading: "Your lyrics stay on your device",
      paragraphs: [
        "Imported .LRC files are stored locally on your device and never uploaded.",
        "To detect what's playing, the app reads Android's media session on-device. Track metadata is not transmitted except as part of a lyric search or translation request you trigger.",
      ],
    },
    {
      heading: "AI translation requests",
      paragraphs: [
        "When you translate a lyric line, the line text is sent securely to our translation provider to return the result. Requests are not used to identify or profile you.",
      ],
    },
    {
      heading: "This website",
      paragraphs: [
        "This site serves static pages, sets no tracking cookies, and runs no analytics scripts.",
      ],
    },
    {
      heading: "Contact",
      paragraphs: ["Questions about this policy? Email us:"],
      links: [{ label: siteConfig.supportEmail, href: `mailto:${siteConfig.supportEmail}` }],
    },
  ],
};
