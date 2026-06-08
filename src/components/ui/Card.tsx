import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export function Card({ children, className }: { children: ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        "bg-surface/60 rounded-2xl border border-white/10 p-6 backdrop-blur transition hover:border-white/20",
        className,
      )}
    >
      {children}
    </div>
  );
}
