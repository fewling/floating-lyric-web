import { siteConfig } from "./site";
import type { ProsePage } from "@/types/content";

export const supportContent: ProsePage = {
  title: "Support and account deletion",
  sections: [
    {
      heading: "Download Floating Lyrics",
      paragraphs: [
        "Google Play is the primary way to install Floating Lyrics and receive updates. If you need an alternative download, the public GitHub releases page provides Android APK files and release notes.",
      ],
      links: [
        { label: "Get Floating Lyrics on Google Play", href: siteConfig.playStoreUrl },
        {
          label: "Alternative download: GitHub releases",
          href: "https://github.com/fewling/flutter-floating-lyric-releases/releases/latest",
        },
      ],
    },
    {
      heading: "Get help",
      paragraphs: [
        "Email support and describe what happened, what you expected, and how to reproduce the problem. Include your phone model, Android version, Floating Lyrics app version, and the music app you were using.",
        "A screenshot can help explain a lyrics window or setup problem. Remove personal information from screenshots before sending them. Do not send passwords.",
      ],
      links: [
        { label: `Email ${siteConfig.supportEmail}`, href: `mailto:${siteConfig.supportEmail}` },
      ],
    },
    {
      heading: "Account and data deletion",
      paragraphs: [
        "To request deletion of your Floating Lyrics account and associated personal data, email support with the subject ‘Floating Lyrics account and data deletion’. Send the request from the email address associated with your account so support can identify it. If you cannot access that address, explain that in your message.",
        "State that you want your account and associated personal data deleted. Do not include your password. You can also contact support to request deletion of personal data if you do not have an app account.",
        "For information about personal data and retention, read the app privacy policy linked from our privacy page.",
      ],
      links: [
        {
          label: "Email an account and data deletion request",
          href: `mailto:${siteConfig.supportEmail}?subject=Floating%20Lyrics%20account%20and%20data%20deletion`,
        },
        { label: "Read privacy information", href: "/privacy/" },
      ],
    },
    {
      heading: "Common questions",
      paragraphs: [
        "The FAQ explains permissions, music-app compatibility, lyric availability, and translation conditions. Floating Lyrics displays lyrics while your music app plays the audio.",
      ],
      links: [{ label: "Read the FAQ", href: "/#faq" }],
    },
  ],
};
