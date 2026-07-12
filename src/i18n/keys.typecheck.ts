// Compile-time tripwire: if message-key typing silently degrades to strings,
// the @ts-expect-error below becomes "unused" and `tsc --noEmit` fails loudly.
import type { useTranslations } from 'next-intl'

type NavT = ReturnType<typeof useTranslations<'nav'>>

declare const t: NavT

// @ts-expect-error 'not-a-real-key' must be rejected by typed message keys
t('not-a-real-key')
