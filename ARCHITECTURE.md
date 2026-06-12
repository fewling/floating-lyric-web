# Architecture

A static marketing site for the **Floating Lyrics** Android app. Built for SEO,
performance, and maintainability — content is data, components are dumb, and the
whole thing exports to static HTML.

## Stack

| Concern   | Choice                                              |
| --------- | --------------------------------------------------- |
| Framework | Next.js 16 (App Router), `output: export`           |
| Language  | TypeScript (strict)                                 |
| Styling   | Tailwind CSS v4 (CSS-first `@theme`)                |
| Fonts     | `next/font` — Inter (body), Space Grotesk (display) |
| Tests     | Vitest + Testing Library (jsdom)                    |
| Quality   | ESLint (next), Prettier                             |
| Hosting   | Firebase Hosting (`out/`)                           |

## Layers

```
src/
├── app/                  # Routing + composition only (thin)
│   ├── layout.tsx        # <html>, fonts, global metadata, viewport
│   ├── page.tsx          # Composes sections in order + JSON-LD
│   ├── globals.css       # Design tokens (@theme) + base styles + reveal anim
│   ├── sitemap.ts        # Static sitemap.xml
│   └── robots.ts         # Static robots.txt
├── components/
│   ├── ui/               # Reusable, content-agnostic primitives
│   │   (Button, Card, Container, Section, SectionHeading,
│   │    Reveal, GooglePlayBadge, PhoneMockup, icons)
│   └── sections/         # Page sections, composed from ui/ + content
│       (SiteHeader, Hero, Pillars, HowItWorks, Features,
│        Fandoms, Pricing, Faq, SiteFooter)
├── content/              # ALL copy lives here as typed data
│   ├── site.ts           # Global config (name, url, CTA links, nav)
│   └── landing.ts        # Page copy (hero, pillars, steps, …)
├── types/                # Shared content interfaces
└── lib/                  # Framework-agnostic helpers (cn, structured-data)
```

### Rules of the road

1. **Content/presentation separation.** No marketing copy in components — it
   lives in `src/content/*` as typed objects. Editing copy never touches JSX.
2. **`ui/` is dumb, `sections/` is smart.** `ui/` primitives know nothing about
   the product; `sections/` wire content into primitives.
3. **Tokens are the single source of color/spacing.** Defined once in
   `globals.css` `@theme`; consumed as Tailwind utilities (`bg-ink`, `text-accent`).
   They mirror `../flutter-floating-lyric/docs/marketing-site/DESIGN.md`.
4. **Accessibility first.** Semantic landmarks, focus-visible rings, `<details>`
   for the FAQ (works without JS), and motion gated behind
   `prefers-reduced-motion`.
5. **Keep `app/` thin.** Routing and composition only.

## Adding a section

1. Add typed copy to `src/content/landing.ts` (extend a type in `src/types/content.ts`).
2. Create `src/components/sections/MySection.tsx` using `ui/` primitives + the content.
3. Drop it into `src/app/page.tsx`.

## Commands

```bash
pnpm dev          # local dev server
pnpm typecheck    # tsc --noEmit
pnpm lint         # eslint
pnpm test         # vitest run
pnpm build        # static export → out/
pnpm format       # prettier --write .
```

## Before launch

- Set `siteConfig.url` (`src/content/site.ts`) to the real domain.
- Confirm `siteConfig.playStoreUrl` points to YOUR listing (`com.floating.lyrics`),
  not the name-collision app `com.ai.lyrics.floating`.
- Add `public/og.png` (1200×630) for social cards.
- Replace `PhoneMockup` with a real overlay screenshot.
- Swap `GooglePlayBadge` for the official Google Play badge asset.

## Deploy (Firebase Hosting)

```bash
pnpm build                          # produces out/
firebase use <your-project>         # e.g. floating-lyrics
firebase deploy --only hosting
```

`firebase.json` serves `out/`. To avoid clashing with the app's existing Firebase
config, run this from THIS repo (it has no `.firebaserc`, so you pick the project
explicitly), or wire it as a named hosting target in the main project.
