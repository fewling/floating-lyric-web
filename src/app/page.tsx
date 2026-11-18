import Link from "next/link";
import { home } from "@/content/home";
import { SITE } from "@/content/site";
import { Arrow, AppIcon, Download, QrHandoff } from "@/components/SiteChrome";
import { ProductScene } from "@/components/ProductScene";
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
          <p className="hero-intro">{home.intro}</p>
          <div className="hero-actions">
            <Download />
            <details className="phone-install" aria-label="Install on your phone">
              <summary>Install on your phone</summary>
              <QrHandoff />
            </details>
            <a className="text-link" href="#experience">
              {home.explore}
              <span aria-hidden="true">↓</span>
            </a>
          </div>
          <p className="permission-note">
            {home.requirements} <Link href="/setup/">{home.requirementsLink}</Link>
          </p>
        </div>
        <ProductScene />
      </section>
      <section className="story section-wrap">
        <p className="eyebrow">{home.story.eyebrow}</p>
        <div className="story-grid">
          <h2>{home.story.title}</h2>
          <div>
            <p className="large-body">{home.story.text}</p>
            <p className="fine-print">{home.story.note}</p>
          </div>
        </div>
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
              <span className="file-icon">♫</span>
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
              <span aria-hidden="true">↗</span>
            </div>
          </div>
        </div>
      </section>
      <section className="personal-band section-wrap">
        <div className="personal-art" role="img" aria-label={home.personal.label}>
          <div className="sample-window sample-light">
            <span className="sample-label">{home.personal.light}</span>
            <p>
              {home.personal.lines[0]}
              <br />
              {home.personal.lines[1]}
            </p>
          </div>
          <div className="sample-window sample-dark">
            <span className="sample-label">{home.personal.dark}</span>
            <p>
              {home.personal.lines[0]}
              <br />
              {home.personal.lines[1]}
            </p>
          </div>
          <span className="art-caption">{home.personal.caption}</span>
        </div>
        <div className="personal-copy">
          <p className="eyebrow">{home.personal.eyebrow}</p>
          <h2>{home.personal.title}</h2>
          <p>{home.personal.text}</p>
          <a className="text-link" href="#experience">
            {home.personal.link}
            <Arrow />
          </a>
          <div className="translation-note">
            <h3>{home.translation.title}</h3>
            <p>{home.translation.text}</p>
            <a href="#questions">
              {home.translation.link} <span aria-hidden="true">↗</span>
            </a>
          </div>
        </div>
      </section>
      <section className="setup-section section-wrap">
        <div className="section-heading">
          <p className="eyebrow">{home.setup.eyebrow}</p>
          <h2>{home.setup.title}</h2>
          <Link className="text-link" href="/setup/">
            {home.setup.link}
            <Arrow />
          </Link>
        </div>
        <ol className="setup-steps">
          {home.setup.steps.map((step, i) => (
            <li key={step.title}>
              <span className="step-number">0{i + 1}</span>
              <h3>{step.title}</h3>
              <p>{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
      <section className="faq-section section-wrap" id="questions">
        <h2>{home.faqTitle}</h2>
        <div className="faq-list">
          {home.faqs.map((f) => (
            <details key={f.q}>
              <summary>
                {f.q}
                <span aria-hidden="true">+</span>
              </summary>
              <p>{f.a}</p>
            </details>
          ))}
          <Link href="/support/" className="text-link">
            {home.helpLink}
            <Arrow />
          </Link>
        </div>
      </section>
      <section className="final-download" id="download">
        <AppIcon size={72} />
        <h2>{home.final.title}</h2>
        <p>{home.final.text}</p>
        <Download />
        <QrHandoff />
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
