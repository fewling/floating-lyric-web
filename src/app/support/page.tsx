import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { supportContent, supportMetadata } from "@/content/support";

export const metadata = pageMetadata(
  "/support/",
  supportMetadata.title,
  supportMetadata.description,
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
