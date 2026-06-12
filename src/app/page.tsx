import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { StickyMobileCta } from "@/components/sections/StickyMobileCta";
import { softwareAppJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <HowItWorks />
        <Features />
        <Faq />
      </main>
      <SiteFooter />
      <StickyMobileCta sentinelId="hero-end" />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd()) }}
      />
    </>
  );
}
