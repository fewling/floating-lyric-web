import {
  Bricolage_Grotesque,
  Figtree,
  JetBrains_Mono,
  Noto_Sans_KR,
} from 'next/font/google'

export const bricolage = Bricolage_Grotesque({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-bricolage',
})

export const figtree = Figtree({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-figtree',
})

export const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400'],
  variable: '--font-jetbrains',
})

// next/font options are extracted by a compile-time SWC transform and must
// be literal values, so we can't pass DEMO_KR_GLYPHS as `text:` here. Google
// serves Noto Sans KR as ~100 unicode-range slices; browsers only download
// the few-KB slices covering the glyphs actually used on the page (our 10
// demo lines). This is an accepted deviation from an earlier "text-subset"
// idea — do not attempt the `text:` option.
export const notoKr = Noto_Sans_KR({
  weight: ['400', '600'],
  subsets: [],
  preload: false,
  variable: '--font-noto-kr',
})
