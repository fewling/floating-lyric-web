import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { privacyContent, privacyMetadata } from "@/content/privacy";

export const metadata = pageMetadata(
  "/privacy/",
  privacyMetadata.title,
  privacyMetadata.description,
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
