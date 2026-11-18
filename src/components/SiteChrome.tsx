import Link from "next/link";
import Image from "next/image";
import { SITE } from "@/content/site";
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
          Get the app <Arrow diagonal />
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
        <p className="footer-note">An Android companion. Your music app plays the audio.</p>
      </div>
    </footer>
  );
}
export function Download({ className = "" }: { className?: string }) {
  return (
    <a className={`download-button pressable ${className}`} href={SITE.play}>
      <svg viewBox="0 0 22 24" aria-hidden="true">
        <path
          fill="currentColor"
          d="m2 1 12 11L2 23zm13 12 4 2-4 3-5-4zm0-2-5-1 5-4 4 3zM4 1l9 8-3 2zm0 22 6-10 3 2z"
        />
      </svg>
      Get it on Google Play <Arrow diagonal />
    </a>
  );
}
