"use client";

import { useEffect, useState } from "react";
import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";

/**
 * Persistent conversion CTA for mobile. This is an Android app, so most traffic
 * is on phones where the sticky header drops the Play badge (`hidden sm:...`).
 *
 * - Mobile only (`sm:hidden`); on ≥640px the header badge is always visible.
 * - The sentinel (id="hero-end") sits below the entire hero grid. On mobile the
 *   hero CTA row is below the fold at load, so the sentinel is also below the
 *   fold — meaning this bar is VISIBLE FROM PAGE LOAD (the in-flow badge is not
 *   yet visible). The bar hides once the user scrolls the in-flow badge into
 *   view (sentinel becomes intersecting). This is the intended behavior: the bar
 *   ensures the Play CTA is always one tap away on the initial screen.
 * - Respects prefers-reduced-motion: no slide transition, just show/hide.
 * - Does not cover content permanently — sits in normal stacking below the
 *   header; page padding is unaffected.
 */
export function StickyMobileCta({ sentinelId }: { sentinelId: string }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const sentinel = document.getElementById(sentinelId);
    if (!sentinel || typeof IntersectionObserver === "undefined") {
      // Fallback: if we cannot observe, show the CTA so it is always reachable.
      // Deferred to the next frame so it is not a synchronous effect-body update.
      const raf = requestAnimationFrame(() => setVisible(true));
      return () => cancelAnimationFrame(raf);
    }

    const observer = new IntersectionObserver(([entry]) => setVisible(!entry.isIntersecting), {
      rootMargin: "0px",
      threshold: 0,
    });
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [sentinelId]);

  return (
    <div
      data-testid="sticky-mobile-cta"
      aria-hidden={!visible}
      inert={!visible}
      className={[
        "bg-ink/85 border-edge fixed inset-x-0 bottom-0 z-40 border-t p-3 backdrop-blur sm:hidden",
        "motion-safe:transition-transform motion-safe:duration-300",
        visible ? "translate-y-0" : "pointer-events-none translate-y-full opacity-0",
      ].join(" ")}
    >
      <GooglePlayBadge className="h-12 w-full" />
    </div>
  );
}
