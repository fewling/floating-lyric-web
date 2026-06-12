import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { privacyContent } from "@/content/privacy";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Floating Lyrics handles your data: no account, on-device lyrics, no profiling.",
  alternates: { canonical: "/privacy/" },
};

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...privacyContent} />
      <SiteFooter />
    </>
  );
}
