import { pageMetadata } from "@/lib/metadata";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { lrcContent } from "@/content/lrc";

export const metadata = pageMetadata(
  "/lrc/",
  "LRC import guide",
  "Import synchronized LRC files into Floating Lyrics on Android. Match track titles and artists, understand line timestamps, and use your own lyric collection.",
);

export default function LrcPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...lrcContent} />
      <SiteFooter />
    </>
  );
}
