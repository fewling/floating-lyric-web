import { expect, test } from 'vitest'
import { faq } from './faq'
import { home } from './home'
import { intentPages } from './intent'

test('every FAQ teaser id exists in the canonical FAQ list', () => {
  const ids = new Set(faq.map((f) => f.id))
  for (const teaserId of home.faqTeaserIds) {
    expect(ids.has(teaserId), `unknown teaser id: ${teaserId}`).toBe(true)
  }
})

test('every intent cross-link references an existing intent slug', () => {
  const slugs = new Set(intentPages.map((p) => p.slug))
  for (const page of intentPages) {
    for (const link of page.crossLinkSlugs) {
      expect(
        slugs.has(link),
        `${page.slug} links to unknown slug: ${link}`,
      ).toBe(true)
    }
    expect(page.crossLinkSlugs).not.toContain(page.slug)
  }
})
