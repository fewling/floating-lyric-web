import { siteConfig } from "./site";
import type { ProsePage } from "@/types/content";

export const supportContent: ProsePage = {
  title: "Support",
  sections: [
    {
      heading: "Get help",
      paragraphs: [
        "Something not working? Email us and describe what happened — your Android version and a screenshot help a lot. You'll normally hear back within a few days.",
      ],
      links: [
        { label: `Email ${siteConfig.supportEmail}`, href: `mailto:${siteConfig.supportEmail}` },
      ],
    },
    {
      heading: "Bugs & feature requests",
      paragraphs: [
        "Found a bug or want a feature? File it on the public issue tracker so it can be triaged in the open.",
      ],
      links: [{ label: "Open the issue tracker", href: `${siteConfig.github}/issues` }],
    },
    {
      heading: "Account & data deletion",
      paragraphs: [
        "Want your account and its data gone? Email us from the address you signed up with and we'll delete it.",
      ],
      links: [
        { label: `Email ${siteConfig.supportEmail}`, href: `mailto:${siteConfig.supportEmail}` },
      ],
    },
    {
      heading: "Common questions",
      paragraphs: [
        "Pricing, supported music apps, the overlay permission, and privacy are all covered in the FAQ.",
      ],
      links: [{ label: "Read the FAQ", href: "/#faq" }],
    },
  ],
};
