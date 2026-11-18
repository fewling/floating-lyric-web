import type { Metadata } from "next";
import { siteConfig } from "@/content/site";

const images = [
  {
    url: "/og.png",
    width: 1200,
    height: 630,
    alt: "Floating Lyrics. Keep lyrics visible while using another app. Android lyrics window and LRC import guides.",
  },
];

/** Explicit social fields avoid inheriting the homepage card on help routes. */
export function pageMetadata(path: string, title: string, description: string): Metadata {
  const socialTitle = path === "/" ? title : `${title} - ${siteConfig.name}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      siteName: siteConfig.name,
      title: socialTitle,
      description,
      images,
    },
    twitter: { card: "summary_large_image", title: socialTitle, description, images },
  };
}
