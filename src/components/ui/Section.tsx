import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({
  id,
  children,
  className,
  containerClassName,
}: {
  id?: string;
  children: ReactNode;
  className?: string;
  containerClassName?: string;
}) {
  return (
    <section id={id} className={cn("scroll-mt-20 py-16 md:py-24", className)}>
      <Container className={containerClassName}>{children}</Container>
    </section>
  );
}
