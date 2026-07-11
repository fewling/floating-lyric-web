import { describe, expect, test } from 'vitest'
import { SITE_ORIGIN, canonical, playStoreUrl } from './site'

describe('playStoreUrl', () => {
  test('carries package id and full UTM convention', () => {
    const url = new URL(playStoreUrl('home'))
    expect(url.origin + url.pathname).toBe(
      'https://play.google.com/store/apps/details',
    )
    expect(url.searchParams.get('id')).toBe('com.floating.lyrics')
    expect(url.searchParams.get('utm_source')).toBe('website')
    expect(url.searchParams.get('utm_medium')).toBe('web')
    expect(url.searchParams.get('utm_campaign')).toBe('home')
  })

  test('uses the page slug as campaign', () => {
    expect(
      new URL(playStoreUrl('spotify-lyrics-overlay')).searchParams.get(
        'utm_campaign',
      ),
    ).toBe('spotify-lyrics-overlay')
  })
})

describe('canonical', () => {
  test('root', () => expect(canonical('/')).toBe(`${SITE_ORIGIN}/`))
  test('path', () => expect(canonical('/faq')).toBe(`${SITE_ORIGIN}/faq`))
})
