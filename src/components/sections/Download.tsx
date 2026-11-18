import { GooglePlayBadge } from "@/components/ui/GooglePlayBadge";
import { download } from "@/content/download";
import { siteConfig } from "@/content/site";

/** Static handoff: every device has a direct link; larger screens also get a QR. */
export function Download() {
  return (
    <div className="w-full space-y-5">
      <div>
        <GooglePlayBadge />
        <p className="text-fg-muted mt-1 text-sm">{download.phoneHint}</p>
      </div>
      <div className="border-edge hidden items-center gap-4 rounded-xl border p-4 sm:flex">
        {/* eslint-disable-next-line @next/next/no-img-element -- local QR retains a white quiet zone and fixed dimensions in static export. */}
        <img
          src={download.qr.src}
          alt={download.qr.alt}
          width={180}
          height={180}
          className="size-[180px] shrink-0 rounded bg-white"
          decoding="async"
        />
        <div className="min-w-0 space-y-2 text-sm">
          <p className="font-semibold">{download.desktopTitle}</p>
          <p className="text-fg-muted">{download.desktopHint}</p>
          <a
            href={siteConfig.playStoreUrl}
            className="text-accent focus-visible:ring-accent focus-visible:ring-offset-ink inline-block rounded underline underline-offset-4 focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:outline-none"
          >
            {download.linkLabel}
          </a>
        </div>
      </div>
    </div>
  );
}
