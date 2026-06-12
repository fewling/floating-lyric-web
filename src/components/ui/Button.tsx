import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export type ButtonVariant = "primary" | "ghost";

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant;
  className?: string;
  /** When provided, renders an anchor; external URLs open in a new tab. */
  href?: string;
}

function classes(variant: ButtonVariant, className?: string): string {
  return cn(
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm font-medium transition focus-visible:ring-accent focus-visible:ring-offset-ink focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none md:text-base",
    variant === "primary"
      ? "bg-accent text-ink hover:-translate-y-0.5 hover:shadow-[0_0_28px_-6px_var(--accent)]"
      : "text-fg border border-white/15 hover:border-white/30 hover:bg-white/5",
    className,
  );
}

export function Button({ children, variant = "primary", className, href }: ButtonProps) {
  if (href) {
    const external = href.startsWith("http");
    return (
      <a
        href={href}
        className={classes(variant, className)}
        {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes(variant, className)}>
      {children}
    </button>
  );
}
