"use client";

import { useState } from "react";
import { demoLangs, demoLines } from "@/content/demo";
import type { DemoLang } from "@/types/content";

/** The floating lyric card: active source line (line-level highlight only),
 *  translated line beneath, and target-language chips. Chips are real buttons
 *  and stay interactive in every fallback mode. */
export function LyricOverlay({ activeIndex }: { activeIndex: number }) {
  const [lang, setLang] = useState<DemoLang>("EN");
  const line = demoLines[activeIndex] ?? demoLines[0];

  return (
    <div className="border-edge bg-surface/85 rounded-xl border p-3 shadow-lg backdrop-blur">
      <p className="text-accent text-sm font-semibold" lang="ko">
        {line.source}
      </p>
      <p className="text-fg-muted mt-1 text-xs">{line.translations[lang]}</p>
      <div className="mt-2 flex gap-1" role="group" aria-label="Translation language">
        {demoLangs.map((l) => (
          <button
            key={l}
            type="button"
            aria-pressed={l === lang}
            onClick={() => setLang(l)}
            className={
              l === lang
                ? "bg-accent text-ink rounded-full px-2 py-0.5 text-[10px] font-semibold"
                : "bg-surface-2 text-fg-muted hover:text-fg rounded-full px-2 py-0.5 text-[10px]"
            }
          >
            {l}
          </button>
        ))}
      </div>
    </div>
  );
}
