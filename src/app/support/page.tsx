import { ArticlePage } from "@/components/ArticlePage";
import { supportArticle } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "/support",
  "Floating Lyrics support and account deletion",
  supportArticle.description,
);
export default function Page() {
  return <ArticlePage article={supportArticle} />;
}
