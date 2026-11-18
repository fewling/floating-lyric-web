import { ArticlePage } from "@/components/ArticlePage";
import { privacyArticle } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "/privacy",
  "Floating Lyrics privacy",
  privacyArticle.description,
);
export default function Page() {
  return <ArticlePage article={privacyArticle} />;
}
