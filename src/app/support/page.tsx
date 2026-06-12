import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { supportContent } from "@/content/support";

export const metadata: Metadata = {
  title: "Support",
  description: "Get help with Floating Lyrics: contact email, bug reports, and FAQ.",
  alternates: { canonical: "/support/" },
};

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...supportContent} />
      <SiteFooter />
    </>
  );
}
