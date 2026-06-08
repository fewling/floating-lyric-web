/**
 * Pure-CSS placeholder of the lyric overlay floating over a music app.
 * Swap for a real app screenshot before launch — real shots convert better.
 */
export function PhoneMockup() {
  return (
    <div className="relative mx-auto w-[270px]">
      <div className="bg-accent-soft absolute -inset-6 -z-10 rounded-[3rem] blur-2xl" aria-hidden />
      <div className="bg-surface rounded-[2.5rem] border border-white/10 p-3 shadow-2xl">
        <div className="from-surface-2 to-ink relative h-[540px] overflow-hidden rounded-[2rem] bg-linear-to-b">
          {/* faux now-playing bar */}
          <div className="text-fg-muted flex items-center gap-3 p-4 text-xs">
            <div className="size-9 rounded-md bg-white/10" />
            <div className="space-y-1">
              <div className="h-2 w-20 rounded bg-white/15" />
              <div className="h-2 w-14 rounded bg-white/10" />
            </div>
            <span className="ml-auto rounded-full bg-white/5 px-2 py-1">on Spotify</span>
          </div>

          {/* floating lyric overlay */}
          <div className="absolute inset-x-4 top-1/3 rounded-2xl border border-white/10 bg-black/50 p-4 backdrop-blur">
            <p className="text-fg-muted text-sm">너를 향한 마음</p>
            <p className="text-accent mt-2 text-base font-medium">My heart, turned toward you</p>
            <p className="text-fg-muted/60 mt-3 text-sm">다시 부르는 노래</p>
          </div>

          {/* faux progress */}
          <div className="absolute inset-x-6 bottom-6">
            <div className="h-1 w-full rounded-full bg-white/10">
              <div className="bg-accent h-1 w-1/3 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
