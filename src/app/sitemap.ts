import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Emit a static sitemap.xml during `output: export`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: siteConfig.url,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteConfig.url}/privacy/`,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${siteConfig.url}/support/`,
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];
}
