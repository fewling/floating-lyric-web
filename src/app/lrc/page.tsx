import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { lrcContent, lrcMetadata } from "@/content/lrc";

export const metadata = pageMetadata("/lrc/", lrcMetadata.title, lrcMetadata.description);

export default function LrcPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...lrcContent} />
      <SiteFooter />
    </>
  );
}
