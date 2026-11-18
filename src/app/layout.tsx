import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { Header, Footer } from "@/components/SiteChrome";
export const metadata: Metadata = {
  ...pageMetadata(
    "/",
    "Floating Lyrics — Stay in the song",
    "Keep synchronized lyrics visible while using another Android app. Bring LRC files, explore window styles, and learn how to get started.",
  ),
  metadataBase: new URL(SITE.url),
  applicationName: SITE.name,
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#fafaf8" };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
