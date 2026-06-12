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
│   ├── hero-demo/        # Code-built interactive demo (see §Hero-demo module)
│   │   (useDemoTimeline, PhoneFrame, LyricOverlay, FakeAppScreen, HeroDemo)
│   ├── ui/               # Reusable, content-agnostic primitives
│   │   (Container, Section, SectionHeading, Reveal,
│   │    GooglePlayBadge, ThemeToggle, Prose, icons)
│   └── sections/         # Page sections, composed from ui/ + content
│       (SiteHeader, Hero, HowItWorks, Features,
│        Faq, SiteFooter, StickyMobileCta)
├── content/              # ALL copy lives here as typed data
│   ├── site.ts           # Global config (name, url, CTA links, nav)
│   ├── landing.ts        # Page copy (hero, steps, features, faq, …)
│   ├── demo.ts           # Demo timeline data (lines, translations, track)
│   ├── privacy.ts        # Privacy policy sections
│   └── support.ts        # Support page sections
├── types/                # Shared content interfaces
└── lib/                  # Framework-agnostic helpers (cn, structured-data, theme)
```

### Page section order (landing)

`SiteHeader` → `Hero` (with code-built demo) → `HowItWorks` → `Features` → `Faq` → `SiteFooter`

A `StickyMobileCta` floats above the fold after the hero scrolls out of view.

### Prose routes

- `/privacy` — Privacy policy; content in `src/content/privacy.ts`.
- `/support` — Support & account-deletion; content in `src/content/support.ts`.

Both routes use the `Prose` UI primitive for consistent typography.

### Hero-demo module (`src/components/hero-demo/`)

A self-contained interactive demo that renders a simulated Android phone in the
hero without any external media assets.

| File              | Role                                                                                                                                                                                                      |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `useDemoTimeline` | Engine — cycles `activeIndex` through demo lines on per-line `durationMs`; respects `paused` flag (frozen when `prefers-reduced-motion` is set).                                                          |
| `PhoneFrame`      | Shell — phone chrome with a swappable `screen` slot and optional `overlay` slot. Today the slots hold `FakeAppScreen` + `LyricOverlay`; the swap path for a real video is explicit in the source comment. |
| `FakeAppScreen`   | Decorative background (`aria-hidden`) simulating a music player UI.                                                                                                                                       |
| `LyricOverlay`    | Overlay — floating lyric card with the active source line, translated line, and target-language chip buttons. Chips are real interactive buttons that stay in the accessibility tree.                     |
| `HeroDemo`        | Composition root — wires `useDemoTimeline` + `usePrefersReducedMotion` (via `useSyncExternalStore`) into `PhoneFrame`.                                                                                    |

Demo content (invented lyric lines, translations, track metadata) lives in
`src/content/demo.ts`; updating copy never touches JSX.

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

- [ ] Real domain in `src/content/site.ts` (placeholder `floatinglyrics.app`).
- [ ] Verify Play URL is the real listing `com.floating.lyrics` (NOT name-collision
      `com.ai.lyrics.floating`).
- [ ] Create `public/og.png` 1200×630, dark theme (metadata already points at it;
      link previews show no image until it exists).
- [ ] Record real overlay footage — portrait ≥1080×2340 (19.5:9, matching the
      frame's aspect), 10–20 s loop-friendly, clean status bar,
      recognizable-but-brandless underlying app, non-English lyric with visible
      translation — and swap into `PhoneFrame`'s `screen` slot as a muted looping
      `playsinline` video, removing the simulated overlay layer. (This also resolves
      the WCAG 2.2.2 note below.)
- [ ] WCAG 2.2.2 note: the code-built demo auto-cycles lyrics >5 s with no
      in-page pause control; OS reduced-motion freezes it, but an explicit pause
      affordance is the strict reading. Resolves itself when the video swap lands
      (videos get native controls/pause) — if launching with the simulation,
      consider a small pause button on the demo.
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
      sections used (`layers`, `languages`, `shield`).

## Deploy (Firebase Hosting)

```bash
pnpm build                          # produces out/
firebase use <your-project>         # e.g. floating-lyrics
firebase deploy --only hosting
```

`firebase.json` serves `out/`. To avoid clashing with the app's existing Firebase
config, run this from THIS repo (it has no `.firebaserc`, so you pick the project
explicitly), or wire it as a named hosting target in the main project.
