import type { IntentPageContent } from '../../types'
import { appleMusic } from './apple-music'
import { gaming } from './gaming'
import { spotify } from './spotify'
import { youtubeMusic } from './youtube-music'

export const intentPages: readonly IntentPageContent[] = [
  spotify,
  youtubeMusic,
  appleMusic,
  gaming,
]

export function intentBySlug(slug: string): IntentPageContent {
  const page = intentPages.find((p) => p.slug === slug)
  if (!page) throw new Error(`Unknown intent page: ${slug}`)
  return page
}
