import type { Metadata } from "next";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Prose } from "@/components/ui/Prose";
import { lrcContent } from "@/content/lrc";

export const metadata: Metadata = {
  title: "LRC import guide",
  description:
    "Import synchronized LRC files into Floating Lyrics on Android. Match track titles and artists, understand line timestamps, and use your own lyric collection.",
  alternates: { canonical: "/lrc/" },
};

export default function LrcPage() {
  return (
    <>
      <SiteHeader />
      <Prose {...lrcContent} />
      <SiteFooter />
    </>
  );
}
