import { siteConfig } from "./site";
import type { ProsePage } from "@/types/content";

export const privacyContent: ProsePage = {
  title: "Privacy",
  updated: "2026-11-18",
  sections: [
    {
      heading: "Floating Lyrics app",
      paragraphs: [
        "The Android app has its own privacy policy. Read the app privacy policy linked from the Floating Lyrics Google Play listing for information about personal data, usage data, retention, and your deletion rights. That policy was last updated on October 10, 2022.",
        "This website's privacy information describes this website. It does not replace the app privacy policy or mean that the app's online features process no data.",
      ],
      links: [
        {
          label: "Read the app privacy policy",
          href: "https://www.freeprivacypolicy.com/live/07b620af-c36c-429e-85ab-f2e666a94135",
        },
        { label: "Floating Lyrics on Google Play", href: siteConfig.playStoreUrl },
      ],
    },
    {
      heading: "This website",
      paragraphs: [
        "This website serves static pages. It has no analytics scripts, advertising trackers, or tracking cookies.",
        "When you choose a light or dark theme, your browser saves that theme preference in local storage on your device. This lets the site remember your choice when you return. You can remove it by clearing this site's browser data.",
        "Your browser connects to the website's hosting service to load its pages and files. The absence of website analytics does not mean those network requests contain no technical information, such as your IP address.",
      ],
    },
    {
      heading: "External links and email",
      paragraphs: [
        "Google Play, GitHub, and the app privacy policy open on other websites. Their own privacy practices apply when you visit them.",
        "If you email support, your email address and the information you choose to send are included in your message. Avoid sending passwords or unrelated personal information.",
      ],
    },
    {
      heading: "Privacy questions and deletion requests",
      paragraphs: [
        "Contact support with questions about your information. To request deletion of an app account or associated personal data, follow the instructions on the support page.",
      ],
      links: [
        { label: `Email ${siteConfig.supportEmail}`, href: `mailto:${siteConfig.supportEmail}` },
        { label: "Account and data deletion instructions", href: "/support/" },
      ],
    },
  ],
};
