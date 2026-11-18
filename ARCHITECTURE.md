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
│   ├── setup/page.tsx    # Setup and troubleshooting guide
│   ├── lrc/page.tsx      # Synchronized LRC import guide
│   ├── privacy/page.tsx  # App-policy link + website privacy
│   └── support/page.tsx  # Support & account-deletion prose route
├── components/
│   ├── hero-demo/        # Static illustration; optional verified Android footage
│   │   (HeroDemo)
│   ├── ui/               # Reusable, content-agnostic primitives
│   │   (Container, Section, SectionHeading, Reveal,
│   │    GooglePlayBadge, ThemeToggle, Prose, icons)
│   └── sections/         # Page sections, composed from ui/ + content
│       (SiteHeader, Hero, HowItWorks, Features,
│        Faq, Download, SiteFooter, StickyMobileCta)
├── content/              # ALL copy lives here as typed data
│   ├── site.ts           # Global config (name, url, CTA links, nav)
│   ├── landing.ts        # Page copy (hero, steps, features, faq, …)
│   ├── demo.ts           # Demo media paths + accessible description
│   ├── download.ts       # Android/desktop QR handoff copy
│   ├── setup.ts          # Candidate setup/troubleshooting steps
│   ├── lrc.ts            # Candidate LRC import guide
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
- `/privacy/` — Linked app policy and separate website privacy; `src/content/privacy.ts`.
- `/support/` — Support, alternative download and deletion request instructions; `src/content/support.ts`.

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

The criterion-level evidence, reproducible checks and unresolved gates are maintained
in [`docs/verification/launch-review.md`](docs/verification/launch-review.md).

- Obtain owner approval of factual content and public-release behavior. Setup and
  LRC steps are source-guided candidates until observed on a licensed public release.
  The official v6.9.0 build 64 APK installed successfully in the isolated emulator,
  but its launch licensing check redirected to Play and exited; source inspection
  does not prove runtime behavior.
- Replace the labeled static illustration with original/cleared real Android footage
  and a poster. Verify synchronization fidelity, native controls, keyboard/screen
  reader, reduced-motion and blocked-video alternatives after integration.
- Keep Play package `com.floating.lyrics`. QR software decoding and public listing
  identity were checked; an actual phone-camera scan remains required.
- Review the separate website privacy statement and linked app policy. Reconcile
  actual release/backend collection with the older policy and Play Data Safety;
  validate support ownership and the operational deletion procedure. No automated
  deletion API or guaranteed retention/response time is implemented by this site.
- Approve the final origin. `site.ts` proposes the confirmed existing Firebase origin
  `https://floating-lyrics.web.app`, currently 404; `SITE_ORIGIN` overrides it at build
  time. Social artwork exists (`public/og.png`, editable `public/design/social-card.svg`).
  Neither metadata nor artwork establishes a working deployed preview/indexing.
- Complete human accessibility review, including actual screen-reader operation,
  and separately authorized live HTTPS/mobile/network smoke checks after deployment.
  Local lab metrics do not establish 75th-percentile field Core Web Vitals.
- Verify aggregate report access and follow the 30/90-day reporting procedure after
  an actual launch. No tracking, new app instrumentation or scheduling is included.

## Deploy (Firebase Hosting)

Only after separate owner authorization and the recorded launch gates are resolved:

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
