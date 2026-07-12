/**
 * Copy slices that section components split out of content strings for
 * styling. Plain TS (no JSX) so the content-integrity tests can import them
 * (Vitest deliberately never imports .tsx — see vitest.config.ts). The
 * guards in src/content/en/content-integrity.test.ts fail loudly when a
 * copy edit breaks a split, instead of silently corrupting the rendered h1.
 */

/** Slice of home.h1 highlighted in the hero. */
export const HIGHLIGHT = 'synced, translated,'

/** Slice of home.ctaBand.heading accented inside the dark CTA band. */
export const ACCENT = 'in your words'

/** The home.features title whose card carries the bilingual-pair motif. */
export const BILINGUAL_CARD_TITLE = 'AI translation'
