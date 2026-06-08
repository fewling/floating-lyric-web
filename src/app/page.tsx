import { Faq } from "@/components/sections/Faq";
import { Fandoms } from "@/components/sections/Fandoms";
import { Features } from "@/components/sections/Features";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Pillars } from "@/components/sections/Pillars";
import { Pricing } from "@/components/sections/Pricing";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { softwareAppJsonLd } from "@/lib/structured-data";

export default function Home() {
  return (
    <>
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <Pillars />
        <HowItWorks />
        <Features />
        <Fandoms />
        <Pricing />
        <Faq />
      </main>
      <SiteFooter />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareAppJsonLd()) }}
      />
    </>
  );
}
