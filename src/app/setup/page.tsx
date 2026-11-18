import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { setupContent, setupMetadata } from "@/content/setup";

export const metadata = pageMetadata("/setup/", setupMetadata.title, setupMetadata.description);

export default function SetupPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...setupContent} />
      <SiteFooter />
    </>
  );
}
