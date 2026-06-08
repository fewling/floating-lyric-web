import { Icon } from "./icons";

/**
 * Stand-in hero visual: the lyric overlay floating OVER a recognizable music
 * player. The background is a faux "now playing" surface (album art, track row,
 * scrubber, transport controls) so the "over anything" claim reads instantly,
 * with the translated-lyric card layered on top.
 *
 * NOTE: This is a placeholder. DESIGN.md calls for a real screenshot of the
 * overlay on top of an actual app (Spotify / YouTube Music / a game). Swap the
 * faux player below for a real shot when one is supplied — real shots convert
 * better. Until then this gives a clearly app-like surface behind the overlay.
 */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px]">
      <div className="bg-accent-soft absolute -inset-6 -z-10 rounded-[3rem] blur-2xl" aria-hidden />
      <div className="bg-surface rounded-[2.5rem] border border-white/10 p-3 shadow-2xl">
        <div className="from-surface-2 to-ink relative h-[540px] overflow-hidden rounded-[2rem] bg-linear-to-b">
          {/* ── Faux music player behind the overlay ───────────────────── */}
          <div aria-hidden className="flex h-full flex-col">
            {/* top bar: collapse chevron + "Now playing" + source chip */}
            <div className="text-fg-muted flex items-center gap-3 px-4 pt-5 pb-3 text-xs">
              <Icon name="chevron" className="size-4 rotate-180" />
              <span className="font-medium tracking-wide uppercase">Now playing</span>
              <span className="ml-auto rounded-full bg-white/5 px-2 py-1 text-[0.65rem]">
                on Spotify
              </span>
            </div>

            {/* album art block */}
            <div className="px-6">
              <div className="from-accent/25 to-surface-2 relative aspect-square w-full overflow-hidden rounded-2xl bg-linear-to-br ring-1 ring-white/10">
                <div className="bg-accent/20 absolute -right-6 -bottom-6 size-24 rounded-full blur-2xl" />
                <Icon
                  name="play"
                  className="text-fg/15 absolute top-1/2 left-1/2 size-16 -translate-x-1/2 -translate-y-1/2"
                />
              </div>
            </div>

            {/* track title + artist row */}
            <div className="px-6 pt-5">
              <div className="h-3 w-36 rounded bg-white/20" />
              <div className="mt-2 h-2.5 w-24 rounded bg-white/10" />
            </div>

            {/* scrubber + timestamps */}
            <div className="px-6 pt-5">
              <div className="h-1 w-full rounded-full bg-white/10">
                <div className="bg-accent h-1 w-2/5 rounded-full" />
              </div>
              <div className="text-fg-muted/70 mt-2 flex justify-between text-[0.6rem]">
                <span>1:24</span>
                <span>3:30</span>
              </div>
            </div>

            {/* transport controls */}
            <div className="text-fg/80 mt-auto flex items-center justify-center gap-7 pb-7">
              <span className="size-5 rounded-sm bg-white/15" />
              <span className="bg-fg/90 grid size-12 place-items-center rounded-full">
                <Icon name="play" className="text-ink size-5" />
              </span>
              <span className="size-5 rounded-sm bg-white/15" />
            </div>
          </div>

          {/* ── Floating translated-lyric overlay, layered on top ──────── */}
          <div className="absolute inset-x-4 top-[30%] rounded-2xl border border-white/10 bg-black/55 p-4 shadow-lg backdrop-blur">
            <p className="text-fg-muted text-sm">너를 향한 마음</p>
            <p className="text-accent mt-2 text-base font-medium">My heart, turned toward you</p>
            <p className="text-fg-muted/60 mt-3 text-sm">다시 부르는 노래</p>
          </div>
        </div>
      </div>
    </div>
  );
}
