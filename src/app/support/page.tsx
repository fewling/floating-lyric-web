import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { supportContent } from "@/content/support";

export const metadata: Metadata = {
  title: "Support and account deletion",
  description:
    "Get help with Floating Lyrics, request account and personal data deletion by email, and find official download options.",
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
