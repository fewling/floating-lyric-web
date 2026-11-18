import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { supportContent } from "@/content/support";

export const metadata = pageMetadata(
  "/support/",
  "Support and account deletion",
  "Get help with Floating Lyrics, request account and personal data deletion by email, and find official download options.",
);

export default function SupportPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...supportContent} />
      <SiteFooter />
    </>
  );
}
