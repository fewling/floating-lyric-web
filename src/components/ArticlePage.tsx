import type { Article, ArticleText } from "@/content/articles";

function InlineText({ text }: { text: ArticleText }) {
  if (typeof text === "string") return text;
  return text.map((part, index) =>
    typeof part === "string" ? part : <strong key={index}>{part.emphasis}</strong>,
  );
}

export function ArticlePage({ article }: { article: Article }) {
  return (
    <main id="main" tabIndex={-1}>
      <header className="article-hero">
        <p className="eyebrow">{article.eyebrow}</p>
        <h1>{article.title}</h1>
        <p className="article-intro">{article.intro}</p>
      </header>
      <div className="article-columns">
        <nav className="article-toc" aria-label="On this page">
          <p>On this page</p>
          <ul>
            {article.sections.map((section) => (
              <li key={section.id}>
                <a href={`#${section.id}`}>{section.title}</a>
              </li>
            ))}
          </ul>
        </nav>
        <article className="article-body" aria-label={article.title}>
          {article.notice && (
            <aside className="article-note">
              <p>{article.notice}</p>
            </aside>
          )}
          {article.sections.map((section) => (
            <section
              className="article-section"
              id={section.id}
              key={section.id}
              aria-labelledby={`${section.id}-title`}
            >
              <h2 id={`${section.id}-title`}>{section.title}</h2>
              {section.paragraphs?.map((paragraph, index) => (
                <p key={index}>
                  <InlineText text={paragraph} />
                </p>
              ))}
              {section.steps && (
                <ol>
                  {section.steps.map((step, index) => (
                    <li key={index}>
                      <InlineText text={step} />
                    </li>
                  ))}
                </ol>
              )}
              {section.items && (
                <ul>
                  {section.items.map((item, index) => (
                    <li key={index}>
                      <InlineText text={item} />
                    </li>
                  ))}
                </ul>
              )}
              {section.code && (
                <pre>
                  <code>{section.code}</code>
                </pre>
              )}
              {section.links && (
                <div className="article-links">
                  {section.links.map((link) => (
                    <a key={link.href} href={link.href} download={link.download || undefined}>
                      {link.label}
                      <span aria-hidden="true"> {link.download ? "↓" : "→"}</span>
                    </a>
                  ))}
                </div>
              )}
            </section>
          ))}
        </article>
      </div>
    </main>
  );
}
