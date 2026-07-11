export const SITE_ORIGIN =
  process.env.NEXT_PUBLIC_SITE_ORIGIN ?? 'https://floatinglyrics.app'

export const PLAY_PACKAGE_ID = 'com.floating.lyrics'

export const SITE_NAME = 'Floating Lyrics'

/** Every Play link on the site goes through this. campaign = page slug; landing page uses 'home'. */
export function playStoreUrl(campaign: string): string {
  const params = new URLSearchParams({
    id: PLAY_PACKAGE_ID,
    utm_source: 'website',
    utm_medium: 'web',
    utm_campaign: campaign,
  })
  return `https://play.google.com/store/apps/details?${params.toString()}`
}

export function canonical(path: string): string {
  return path === '/' ? `${SITE_ORIGIN}/` : `${SITE_ORIGIN}${path}`
}
