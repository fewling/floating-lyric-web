import Link from "next/link";
import { home } from "@/content/home";
import { SITE } from "@/content/site";
import { Arrow, AppIcon, Download, QrHandoff } from "@/components/SiteChrome";
import { ProductScene } from "@/components/ProductScene";
import { DemoStart } from "@/components/LyricsDemo";

export default function Home() {
  return (
    <main id="main" tabIndex={-1}>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow">{home.eyebrow}</p>
          <h1>
            {home.title[0]}
            <br />
            <span>{home.title[1]}</span>
          </h1>
          <div className="hero-actions">
            <div className="journey-action">
              <DemoStart descriptionId="demo-audio-source" />
              <p id="demo-audio-source">Website demo audio</p>
            </div>
            <div className="journey-action">
              <Download descriptionId="app-audio-source" />
              <p id="app-audio-source">Uses your music player</p>
            </div>
          </div>
        </div>
        <ProductScene />
      </section>
      <section className="library-band section-wrap">
        <div className="library-copy">
          <p className="eyebrow">{home.library.eyebrow}</p>
          <h2>{home.library.title}</h2>
          <p>{home.library.text}</p>
          <Link className="text-link" href="/lrc/">
            {home.library.link}
            <Arrow />
          </Link>
        </div>
        <div className="file-stage" role="img" aria-label={home.library.label}>
          <div className="file-paper">
            <div className="file-title">
              <span className="file-icon" aria-hidden="true">
                ♫
              </span>
              {home.library.filename}
              <span className="file-type">LRC</span>
            </div>
            <div className="file-lines">
              {home.library.lines.map((line, i) => (
                <p key={line} className={i === 1 ? "file-highlight" : ""}>
                  <span>{line.slice(0, 10)}</span>
                  {line.slice(10)}
                </p>
              ))}
            </div>
            <div className="file-bottom">
              <span>{home.library.footer}</span>
            </div>
          </div>
        </div>
      </section>
      <nav className="journey-guides section-wrap" aria-label="App guides">
        {home.guides.map((guide) => (
          <Link key={guide.href} href={guide.href}>
            <div>
              <h2>{guide.title}</h2>
              <p>{guide.detail}</p>
            </div>
            <Arrow />
          </Link>
        ))}
      </nav>
      <section className="faq-section section-wrap" id="questions">
        <h2>{home.faqTitle}</h2>
        <div className="faq-list">
          {home.faqs.map((faq) => (
            <details key={faq.q}>
              <summary>
                {faq.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{faq.a}</p>
            </details>
          ))}
          <Link href="/support/" className="text-link">
            {home.helpLink}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="final-download" id="download">
        <AppIcon size={64} />
        <h2>{home.final.title}</h2>
        <Download />
        <details className="download-handoff">
          <summary>Scan for your phone</summary>
          <QrHandoff />
        </details>
      </section>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            name: SITE.name,
            operatingSystem: "Android",
            applicationCategory: "MultimediaApplication",
            url: SITE.url,
            downloadUrl: SITE.play,
            description: SITE.description,
          }),
        }}
      />
    </main>
  );
}
