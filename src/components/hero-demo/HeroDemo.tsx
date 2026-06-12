"use client";

import { useSyncExternalStore } from "react";
import { demoLines } from "@/content/demo";
import { FakeAppScreen } from "./FakeAppScreen";
import { LyricOverlay } from "./LyricOverlay";
import { PhoneFrame } from "./PhoneFrame";
import { useDemoTimeline } from "./useDemoTimeline";

// Module-level media query reference — created once, never on every render.
function getMediaQuery(): MediaQueryList | null {
  if (typeof window === "undefined" || typeof window.matchMedia !== "function") return null;
  return window.matchMedia("(prefers-reduced-motion: reduce)");
}

function subscribe(onChange: () => void): () => void {
  const mq = getMediaQuery();
  if (!mq) return () => {};
  mq.addEventListener("change", onChange);
  return () => mq.removeEventListener("change", onChange);
}

function getSnapshot(): boolean {
  return getMediaQuery()?.matches ?? false;
}

function getServerSnapshot(): boolean {
  return false;
}

/** Returns true when the user has opted into reduced motion. Uses
 *  useSyncExternalStore so React's concurrent renderer sees a consistent
 *  snapshot — no setState-in-effect lint warning, no tearing. */
function usePrefersReducedMotion(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}

/** The hero centerpiece. Server-renders line 0 (no-JS fallback shows a valid
 *  static frame); the timeline only advances client-side when motion is OK. */
export function HeroDemo() {
  const reduced = usePrefersReducedMotion();
  const activeIndex = useDemoTimeline(demoLines, reduced);

  return <PhoneFrame screen={<FakeAppScreen />} overlay={<LyricOverlay activeIndex={activeIndex} />} />;
}
