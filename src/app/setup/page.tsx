import { ArticlePage } from "@/components/ArticlePage";
import { setupArticle } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "/setup",
  "Set up Floating Lyrics on Android",
  setupArticle.description,
);
export default function SetupPage() {
  return <ArticlePage article={setupArticle} />;
}
