import { expect, test } from 'vitest'
import { faq } from './faq'
import { home } from './home'

test('every FAQ teaser id exists in the canonical FAQ list', () => {
  const ids = new Set(faq.map((f) => f.id))
  for (const teaserId of home.faqTeaserIds) {
    expect(ids.has(teaserId), `unknown teaser id: ${teaserId}`).toBe(true)
  }
})
