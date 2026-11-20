import type { Metadata, Viewport } from "next";
import "./globals.css";
import { home } from "@/content/home";
import { SITE } from "@/content/site";
import { pageMetadata } from "@/lib/metadata";
import { LyricsDemoProvider } from "@/components/LyricsDemo";
import { Header, Footer } from "@/components/SiteChrome";
export const metadata: Metadata = {
  ...pageMetadata("/", home.seoTitle, home.seoDescription),
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
        <LyricsDemoProvider>
          <Header />
          {children}
          <Footer />
        </LyricsDemoProvider>
      </body>
    </html>
  );
}
