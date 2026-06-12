import { demoTrack } from "@/content/demo";

/** Simulated "underlying app" — a generic video/music UI. Deliberately
 *  brandless: suggests "some other app", imitates no real product. */
export function FakeAppScreen() {
  return (
    <div className="bg-ink flex h-full flex-col">
      <div className="bg-surface-2 m-3 aspect-video rounded-lg" />
      <div className="space-y-2 px-3">
        <div className="bg-surface-2 h-3 w-3/4 rounded" />
        <div className="bg-surface-2 h-3 w-1/2 rounded" />
      </div>
      <div className="text-fg-muted mt-auto px-3 pb-4 text-[10px]">
        <div>▶ {demoTrack.title} — {demoTrack.artist}</div>
        <div>{demoTrack.caption}</div>
      </div>
    </div>
  );
}
