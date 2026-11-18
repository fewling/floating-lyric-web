import type { Metadata } from "next";
import { SITE } from "@/content/site";
export function pageMetadata(path: string, title: string, description: string): Metadata {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      url: path,
      title,
      description,
      siteName: SITE.name,
      images: [
        {
          url: "/og.png",
          width: 1200,
          height: 630,
          alt: SITE.socialAlt,
        },
      ],
    },
    twitter: { card: "summary_large_image", title, description, images: ["/og.png"] },
  };
}
