import { ArticlePage } from "@/components/ArticlePage";
import { lrcArticle } from "@/content/articles";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata(
  "/lrc",
  "Import LRC files into Floating Lyrics",
  lrcArticle.description,
);
export default function Page() {
  return <ArticlePage article={lrcArticle} />;
}
