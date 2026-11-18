import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/content/site";
import { home } from "@/content/home";
export function AppIcon({ size = 28 }: { size?: number }) {
  return <Image src="/app-icon.png" width={size} height={size} alt="" className="app-icon" />;
}
export function Arrow({ diagonal = false }: { diagonal?: boolean }) {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7">
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
export function Header() {
  return (
    <header className="site-header">
      <div className="nav-inner">
        <Link href="/" className="wordmark">
          <AppIcon />
          <span>{SITE.name}</span>
        </Link>
        <nav aria-label="Main" className="desktop-nav">
          {SITE.nav.map((x) => (
            <Link href={x.href} key={x.href}>
              {x.label}
            </Link>
          ))}
        </nav>
        <a className="nav-download pressable" href={SITE.play}>
          {SITE.downloadLabel} <Arrow diagonal />
        </a>
        <details className="mobile-nav">
          <summary aria-label="Navigation menu">
            <span />
            <span />
          </summary>
          <nav aria-label="Mobile">
            {SITE.nav.map((x) => (
              <Link href={x.href} key={x.href}>
                {x.label}
              </Link>
            ))}
          </nav>
        </details>
      </div>
    </header>
  );
}
export function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <Link href="/" className="wordmark">
          <AppIcon size={24} />
          {SITE.name}
        </Link>
        <nav aria-label="Footer">
          {SITE.footer.map((x) => (
            <Link href={x.href} key={x.href}>
              {x.label}
            </Link>
          ))}
        </nav>
        <p>© {new Date().getFullYear()} Floating Lyrics</p>
        <p className="footer-note">{SITE.footerNote}</p>
      </div>
    </footer>
  );
}
export function Download({ className = "" }: { className?: string }) {
  return (
    <a className={`download-button pressable ${className}`} href={SITE.play}>
      <svg viewBox="0 0 20 22" aria-hidden="true">
        <path fill="#59a8fb" d="M2 1.4 11.8 11 2 20.6Z" />
        <path fill="#72d9a1" d="m2 1.4 12.4 7.2-2.6 2.4Z" />
        <path fill="#ff7b80" d="m11.8 11 2.6 2.4L2 20.6Z" />
        <path fill="#ffd26b" d="m14.4 8.6 4 2.3v.2l-4 2.3-2.6-2.4Z" />
      </svg>
      {home.download} <Arrow diagonal />
    </a>
  );
}
