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

test('intent slugs are unique', () => {
  expect(new Set(intentPages.map((p) => p.slug)).size).toBe(intentPages.length)
})

test('slugs are valid URL segments and UTM values', () => {
  for (const page of intentPages) {
    expect(page.slug).toMatch(/^[a-z0-9-]+$/)
  }
})

test('per-page FAQ ids are unique within their page', () => {
  for (const page of intentPages) {
    expect(new Set(page.faqs.map((f) => f.id)).size).toBe(page.faqs.length)
  }
})

test('every proof chip slug resolves to an intent page or the faq page', () => {
  const valid = new Set([...intentPages.map((p) => p.slug), 'faq'])
  for (const chip of home.proofChips) {
    expect(valid.has(chip.slug), `unknown chip slug: ${chip.slug}`).toBe(true)
  }
})
