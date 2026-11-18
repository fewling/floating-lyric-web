"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { SITE } from "@/content/site";

export function NavigationMenu() {
  const menu = useRef<HTMLDetailsElement>(null);
  const pathname = usePathname();
  useEffect(() => {
    if (menu.current) menu.current.open = false;
  }, [pathname]);
  function close() {
    if (menu.current) menu.current.open = false;
  }
  return (
    <details
      ref={menu}
      className="mobile-nav"
      onKeyDown={(event) => {
        if (event.key === "Escape" && menu.current?.open) {
          event.preventDefault();
          close();
          menu.current.querySelector("summary")?.focus();
        }
      }}
    >
      <summary aria-label={SITE.navigationLabel}>
        <span />
        <span />
      </summary>
      <nav aria-label={SITE.mobileNavigationLabel}>
        {SITE.nav.map((item) => (
          <Link href={item.href} key={item.href} onClick={close} onNavigate={close}>
            {item.label}
          </Link>
        ))}
      </nav>
    </details>
  );
}
