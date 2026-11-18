import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";

// Emit a static sitemap.xml during `output: export`.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/setup/", "/lrc/", "/privacy/", "/support/"].map((path) => ({
    url: `${siteConfig.url}${path}`,
  }));
}
