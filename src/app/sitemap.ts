import type { MetadataRoute } from "next";
import { SITE } from "@/content/site";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return ["/", "/setup/", "/lrc/", "/privacy/", "/support/"].map((path) => ({
    url: SITE.url + path,
  }));
}
