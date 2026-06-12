import { siteConfig } from "@/content/site";
import { cn } from "@/lib/cn";

// Official "Get it on Google Play" badge (generic English web badge), fetched
// from Google's brand asset host into public/. The transparent margin baked
// into the PNG provides the guideline-mandated clear space; the asset's native
// 646×250 ratio is preserved via `h-auto`, and the minimum height keeps it
// above Google's legibility floor (~40px tall).
const BADGE_SRC = "/google-play-badge.png";
const BADGE_RATIO = "646 / 250";

/**
 * Primary conversion CTA, rendering the official Google Play badge.
 *
 * Use `className` to control layout/size (e.g. `w-full` inside a card,
 * responsive visibility utilities).
 */
export function GooglePlayBadge({ className }: { className?: string }) {
  const external = siteConfig.playStoreUrl.startsWith("http");
  return (
    <a
      href={siteConfig.playStoreUrl}
      aria-label="Get Floating Lyrics on Google Play"
      className={cn(
        "focus-visible:ring-accent focus-visible:ring-offset-ink inline-flex h-[52px] items-center justify-center rounded-lg transition hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none",
        className,
      )}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- static brand asset; Image optimization is disabled for export. */}
      <img
        src={BADGE_SRC}
        alt="Get it on Google Play"
        width={646}
        height={250}
        className="h-full w-auto object-contain"
        style={{ aspectRatio: BADGE_RATIO }}
        decoding="async"
      />
    </a>
  );
}
