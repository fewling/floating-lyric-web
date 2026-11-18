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
│   ├── robots.ts         # Static robots.txt
│   ├── privacy/page.tsx  # Privacy policy prose route
│   └── support/page.tsx  # Support & account-deletion prose route
├── components/
│   ├── hero-demo/        # Static illustration; optional verified Android footage
│   │   (HeroDemo)
│   ├── ui/               # Reusable, content-agnostic primitives
│   │   (Container, Section, SectionHeading, Reveal,
│   │    GooglePlayBadge, ThemeToggle, Prose, icons)
│   └── sections/         # Page sections, composed from ui/ + content
│       (SiteHeader, Hero, HowItWorks, Features,
│        Faq, SiteFooter, StickyMobileCta)
├── content/              # ALL copy lives here as typed data
│   ├── site.ts           # Global config (name, url, CTA links, nav)
│   ├── landing.ts        # Page copy (hero, steps, features, faq, …)
│   ├── demo.ts           # Demo media paths + accessible description
│   ├── privacy.ts        # Privacy policy sections
│   └── support.ts        # Support page sections
├── types/                # Shared content interfaces
└── lib/                  # Framework-agnostic helpers (cn, structured-data, theme)
```

### Page section order (landing)

`SiteHeader` → `Hero` (with static illustration or verified media) → `HowItWorks` → `Features` → `Faq` → `SiteFooter`

A `StickyMobileCta` floats above the fold after the hero scrolls out of view.

### Prose routes

- `/setup/` — Setup and troubleshooting; `src/content/setup.ts`.
- `/lrc/` — Synchronized lyric import; `src/content/lrc.ts`.

- `/privacy` — Privacy policy; content in `src/content/privacy.ts`.
- `/support` — Support & account-deletion; content in `src/content/support.ts`.

These routes use the `Prose` UI primitive for consistent typography.

### Hero-demo module (`src/components/hero-demo/`)

The `HeroDemo` server component currently presents a static, clearly labeled
illustration using original demo lyrics. It is not real app footage and does not
satisfy the launch requirement for a representative public-release recording.

An optional typed `DemoMedia` config in `src/content/demo.ts` can enable verified
local video and poster assets after capture. Every visitor, including reduced-motion
visitors, starts on the static poster. Playback is an explicit choice through native
controls: muted, no autoplay or loop, `preload="none"`, and reserved media dimensions.
The always-visible description conveys the essential experience without playback;
a still-image link is available when real media is configured. No missing media
paths are published. Native controls still need browser accessibility verification.

### Theming

Dual palette ("Night Player" dark / neutral light) via CSS custom properties
under `@theme inline` in `globals.css`. Runtime-switchable without a class
toggle:

- **Token definitions:** `:root, [data-theme="dark"]` and `[data-theme="light"]`
  blocks in `globals.css`; Tailwind utilities (`bg-ink`, `text-accent`, …)
  resolve through `var(--*)` so they react to the attribute at runtime.
- **Pre-hydration script:** `src/lib/theme.ts` exports an inline `<script>`
  snippet (`themeInit`) injected in `layout.tsx`. It reads `localStorage` and
  the OS color-scheme preference and sets `document.documentElement.dataset.theme`
  before first paint — no flash of wrong theme.
- **ThemeToggle:** `src/components/ui/ThemeToggle.tsx` uses `useSyncExternalStore`
  watching a `MutationObserver` on `data-theme`, so the button label stays
  consistent across concurrent renders. Writes both the attribute and
  `localStorage`.

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

- [ ] Owner confirms final origin. `src/content/site.ts` proposes the verified existing
      Firebase origin `https://floating-lyrics.web.app` (currently 404); `SITE_ORIGIN`
      overrides it at build time. No deployment is claimed.
- [ ] Verify Play URL is the real listing `com.floating.lyrics` (NOT name-collision
      `com.ai.lyrics.floating`).
- [x] `public/og.png` 1200×630 original typographic social card, with editable
      `public/design/social-card.svg`. Inspect previews live after deployment.
- [ ] Replace the labeled illustration with verified real Android footage and a
      matching poster; record public-release version and original lyric provenance.
      Manually review native controls with
      keyboard and screen reader, reduced motion, and blocked video. Playback is
      always opt-in; the original static illustration is visibly labeled.
- [ ] Official Google Play badge asset (current `public/google-play-badge.png` —
      verify it's the official artwork + usage rules).
- [ ] Privacy policy (`/privacy`) reviewed and signed off by the owner — it now
      makes specific factual claims (optional Firebase Auth accounts for AI
      translation, automatic LRCLIB queries with title/artist/album, Google Cloud +
      DeepSeek as AI providers, Crashlytics + Firebase Analytics diagnostics,
      account deletion by email). Verify each remains true at launch, then set the
      URL in Play Console.
- [ ] Decide on Firebase Analytics in the app: keep (disclosed in the policy) or
      disable collection — align the Play Data Safety form either way.
- [ ] Set `/support` as the Play Console support URL; it doubles as the public
      account-deletion link Play requires.
- [ ] Manual Lighthouse run against the LIVE Firebase URL (mobile):
      Performance/Accessibility/SEO ≥95. (Local pre-launch run already at
      100/100/100 a11y/BP/SEO, LCP 136 ms, CLS 0.)
- [ ] Post-launch sweep candidate: `icons.tsx` retains glyphs only deleted
      sections used (`layers`, `languages`, `shield`, `file`, `check`, `github`).

## Deploy (Firebase Hosting)

```bash
pnpm build                          # produces out/
firebase use <your-project>         # e.g. floating-lyrics
firebase deploy --only hosting
```

`firebase.json` serves `out/`. To avoid clashing with the app's existing Firebase
config, run this from THIS repo (it has no `.firebaserc`, so you pick the project
explicitly), or wire it as a named hosting target in the main project.

## Search and reporting

All five routes use canonical and social metadata, a complete sitemap, and shared
help discovery links. `scripts/check-search-output.mjs` checks exported HTML or a
served static preview; it is not evidence of live indexing. The maintained origin,
report-access gaps and 30/90-day owner review procedure are in
[`docs/discovery-and-reporting.md`](docs/discovery-and-reporting.md).
