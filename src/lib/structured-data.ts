import { siteConfig } from "@/content/site";

/**
 * JSON-LD for the app, injected on the home page so search engines and
 * social cards understand this is an Android application.
 * https://schema.org/SoftwareApplication
 */
export function softwareAppJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: siteConfig.name,
    operatingSystem: "Android",
    applicationCategory: "MultimediaApplication",
    description: siteConfig.description,
    url: siteConfig.url,
    downloadUrl: siteConfig.playStoreUrl,
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
  } as const;
}
