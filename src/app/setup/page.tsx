import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { setupContent } from "@/content/setup";

export const metadata = pageMetadata(
  "/setup/",
  "Setup & troubleshooting",
  "Set up Floating Lyrics on Android: notification access, display over other apps, music detection, missing lyrics, synchronization, and background help.",
);

export default function SetupPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...setupContent} />
      <SiteFooter />
    </>
  );
}
