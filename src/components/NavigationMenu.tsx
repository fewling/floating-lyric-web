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
  useEffect(() => {
    function dismissOutside(event: Event) {
      const disclosure = menu.current;
      if (disclosure?.open && event.target instanceof Node && !disclosure.contains(event.target)) {
        disclosure.open = false;
      }
    }
    function escape(event: globalThis.KeyboardEvent) {
      if (event.key === "Escape" && menu.current?.open) {
        event.preventDefault();
        close();
        menu.current.querySelector("summary")?.focus();
      }
    }
    document.addEventListener("pointerdown", dismissOutside);
    // Also cover keyboard/assistive-technology activation without a pointer.
    document.addEventListener("click", dismissOutside);
    document.addEventListener("keydown", escape);
    return () => {
      document.removeEventListener("pointerdown", dismissOutside);
      document.removeEventListener("click", dismissOutside);
      document.removeEventListener("keydown", escape);
    };
  }, []);
  return (
    <details ref={menu} className="mobile-nav">
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
