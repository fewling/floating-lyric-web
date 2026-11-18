import { demo, demoMedia } from "@/content/demo";
import type { DemoMedia } from "@/types/content";

/** Every motion preference starts static. Verified footage can be supplied
 * after capture; native controls make playback an explicit choice. */
export function HeroDemo({ media = demoMedia }: { media?: DemoMedia }) {
  return (
    <figure className="relative mx-auto max-w-[320px]">
      {media ? (
        <video
          aria-label={demo.label}
          aria-describedby="demo-description demo-controls"
          className="border-edge bg-surface-2 focus-visible:ring-accent block w-full rounded-[2rem] border shadow-2xl focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          style={{ aspectRatio: `${media.width} / ${media.height}` }}
          width={media.width}
          height={media.height}
          controls
          muted
          playsInline
          preload="none"
          poster={media.poster}
        >
          <source src={media.video} type="video/mp4" />
          {demo.fallback}
        </video>
      ) : (
        <div
          role="img"
          aria-label={demo.illustrationLabel}
          className="border-edge bg-surface-2 relative aspect-[9/16] overflow-hidden rounded-[2rem] border p-5 shadow-2xl"
        >
          <div aria-hidden="true" className="flex h-full flex-col">
            <p className="text-fg-muted mt-3 text-center text-xs font-semibold tracking-widest uppercase">
              {demo.illustration.app}
            </p>
            <div className="border-edge bg-ink/95 mt-7 space-y-4 rounded-xl border p-5 shadow-xl">
              <p className="text-fg-muted text-xs">{demo.illustration.window}</p>
              <p className="text-fg-muted text-sm">{demo.illustration.lines[0]}</p>
              <p className="text-accent text-lg leading-snug font-semibold">
                {demo.illustration.lines[1]}
              </p>
              <p className="text-fg-muted text-sm">{demo.illustration.lines[2]}</p>
            </div>
            <div className="mt-auto space-y-3 pb-6 text-center">
              <div className="bg-accent-soft mx-auto grid size-14 place-items-center rounded-2xl text-3xl">
                ♪
              </div>
              <p className="font-semibold">{demo.illustration.track}</p>
              <p className="text-fg-muted text-xs">{demo.illustration.artist}</p>
              <div className="bg-edge mx-auto h-1 w-3/4 rounded-full">
                <div className="bg-accent h-1 w-1/3 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      )}
      <figcaption className="mt-5 space-y-2 text-sm leading-relaxed">
        <p className="font-semibold">{media ? demo.caption : demo.illustrationNotice}</p>
        <p id="demo-description" className="text-fg-muted">
          {demo.description}
        </p>
        {media ? (
          <>
            <p id="demo-controls" className="text-fg-muted">
              {demo.controls}
            </p>
            <a
              href={media.poster}
              className="text-accent focus-visible:ring-accent inline-block rounded underline underline-offset-4 focus-visible:ring-2 focus-visible:outline-none"
            >
              {demo.stillImage}
            </a>
          </>
        ) : null}
      </figcaption>
    </figure>
  );
}
