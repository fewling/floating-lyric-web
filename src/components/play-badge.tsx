import Image from 'next/image'
import { playStoreUrl } from '@/lib/site'
import badge from '../../public/google-play-badge.png'

export function PlayBadge({
  campaign,
  alt,
}: {
  campaign: string
  alt: string
}) {
  return (
    <a href={playStoreUrl(campaign)} rel="noopener">
      <Image src={badge} alt={alt} height={56} className="h-14 w-auto" />
    </a>
  )
}

export function PlayPill({
  campaign,
  label,
}: {
  campaign: string
  label: string
}) {
  return (
    <a
      href={playStoreUrl(campaign)}
      rel="noopener"
      className="rounded-chip bg-ink px-4 py-2.5 text-sm font-medium whitespace-nowrap text-canvas transition-opacity hover:opacity-85 sm:px-5"
    >
      {label}
    </a>
  )
}
