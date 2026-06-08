import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

/**
 * Reveals children on scroll using CSS scroll-driven animations (no JS).
 * Degrades to fully-visible where unsupported or under prefers-reduced-motion,
 * so content is always present for crawlers and no-JS users. See globals.css.
 */
export function Reveal({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("reveal", className)}>{children}</div>;
}
