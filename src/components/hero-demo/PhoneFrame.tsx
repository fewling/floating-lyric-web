import type { ReactNode } from "react";

/** Android phone shell. `screen` is the swappable slot: today FakeAppScreen +
 *  LyricOverlay; later a muted looping <video> of the real overlay (spec §3).
 *  Keep this file free of demo logic so the swap never touches siblings.
 *  IMPORTANT: only the decorative `screen` is aria-hidden. The overlay holds
 *  real interactive buttons (chips) and MUST stay in the accessibility tree —
 *  aria-hidden on an ancestor of focusable elements fails Lighthouse's
 *  aria-hidden-focus audit and breaks spec §6's keyboard requirement. */
export function PhoneFrame({ screen, overlay }: { screen: ReactNode; overlay?: ReactNode }) {
  return (
    <div className="border-edge bg-surface-2 relative mx-auto aspect-[9/19] w-full max-w-[300px] overflow-hidden rounded-[2rem] border shadow-2xl">
      <div className="absolute inset-[3px] overflow-hidden rounded-[1.8rem]">
        <div aria-hidden className="h-full">
          {screen}
        </div>
        {overlay ? <div className="absolute inset-x-2 top-10">{overlay}</div> : null}
      </div>
    </div>
  );
}
