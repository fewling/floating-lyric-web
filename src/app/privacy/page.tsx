import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { privacyContent } from "@/content/privacy";

export const metadata = pageMetadata(
  "/privacy/",
  "Privacy Policy",
  "Read the Floating Lyrics app privacy policy, website storage information, and how to contact support about personal data.",
);

export default function PrivacyPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...privacyContent} />
      <SiteFooter />
    </>
  );
}
