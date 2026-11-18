# Apple design rework

18 November 2026. The owner rejected the previous presentation and requested a
fresh rework using `apple-design`, with no need to extend the old work. This
branch starts from `dfabf54` and replaces the former presentation and component
structure. Prior visual approval is absent; the rejected design is not accepted.

## Direction

A quiet, light product page with system typography, deliberate scale and spacing,
a spacious interactive product scene, and editorial feature bands. Translucency
is reserved for functional floating surfaces. The app's existing icon and green
lyric accent preserve identity without making every section a branded card.

Interaction follows the Apple design skill: immediate press feedback, direct
pointer tracking, interruptible critically damped reset, keyboard equivalents,
and solid/static alternatives for accessibility preferences. Nothing moves until
the visitor acts. The phone uses an Android-style camera cutout. The illustration
is explicitly identified; original lyric text and drawn scenery do not pretend
to be public-release footage.

## Verification

Tested application source: `0344eadd94eb92b9860114199fd25445b6e3ad1f`.
Local review: http://127.0.0.1:4174. This is a copy of the static production
export, not a deployment. All 70 copied files are pinned by SHA-256 in the
external build manifest. Subsequent review-document commits do not change the
application. Earlier rejected-branch screenshots and test counts are not used
as proof of this replacement.

[Desktop](review/desktop.png) · [Mobile](review/mobile.png)

- Normal `npm run build` (Turbopack), TypeScript, lint and format checks pass.
- Eight visitor/component tests pass. The optional browser harness is
  `scripts/check-experience.mjs` (external Playwright/axe tooling; configuration
  is described at the top of the file). The new regression checks failed before
  the resize/menu/tap/geometry fixes and passed afterward.
- [Twenty route/width browser audits](review/browser-results.json): five routes at
  320, 390, 768 and 1440 CSS pixels; zero axe WCAG A/AA violations, no page overflow
  or JavaScript errors. Direct drag, keyboard movement, reset, app contexts,
  window appearance, tap movement, resize recovery, menu selection and Escape
  focus were exercised in the actual browser.
- Ten additional route/width checks at 200% text pass. [Measured scene geometry](review/large-text-geometry.json)
  keeps a 20–22px window/toolbar gap at enlarged text after resize, reset and drag;
  the scene contracts again when text size is restored.
- [Additional journeys](review/journeys.json): original LRC file actually downloads;
  five-route Play links identify literal package `com.floating.lyrics`; no-JavaScript
  explanations/download/help routes work. Passive browsing makes no third-party
  requests. Reduced motion/transparency and increased contrast use solid materials.
- Exported QR independently decoded using OpenCV and ZXing at 144px display size
  and native 540px. A physical phone scan remains a separate check.
- Built and served pages have the five correct canonical URLs and social metadata.
  The 1200×630 social PNG loads. No ratings, price, compatibility or release claims
  are fabricated in structured data.

### Mobile laboratory results

Lighthouse 13.6.0, installed headless Chrome 157, local static server, mobile
simulation with 150ms RTT, 1638.4kbps throughput and 4× CPU slowdown. These are
laboratory samples, not field Core Web Vitals or a WCAG conformance certificate.

| Final route | Performance / Accessibility / Best practices / SEO | LCP    | CLS | TBT    |
| ----------- | -------------------------------------------------- | ------ | --- | ------ |
| Home        | 100 / 100 / 100 / 100                              | 1.054s | 0   | 25ms   |
| Setup       | 100 / 100 / 100 / 100                              | 1.052s | 0   | 30ms   |
| LRC         | 100 / 100 / 100 / 100                              | 1.052s | 0   | 30ms   |
| Privacy     | 100 / 100 / 100 / 100                              | 1.052s | 0   | 32.5ms |
| Support     | 100 / 100 / 100 / 100                              | 1.053s | 0   | 31ms   |

[Final measurements](review/performance-final.json) and [initial measurements](review/performance-initial.json)
are retained. The initial homepage run at `86aa2cb` scored 70 performance and
98 accessibility, with TBT 2952ms dominated by an unattributable native/browser
main-thread task. Script evaluation was about 216ms. Its blocking cause is
unknown; the later passing run is not proof that a particular code change
fixed that spike. Lighthouse also found two real accessibility issues: an
illustrative heading that skipped a level and a drag-handle name that omitted
its visible label. Both were corrected, then the final build was checked again.
No field INP result was obtained. Recheck performance after real footage and
on the separately authorized production host.

### Assets and review

The app icon was retrieved from the intended public Play listing on 18 November
2026, using its [published image](https://play-lh.googleusercontent.com/DfzNKUVVvjjntOzCA-9lA10KD-bLZ6I7TYP1bVTAGt5036zGroJ3Uj3mt1WlZbgXU0GAnIgnDanKGCKvban2fA=s0-br30); the 512px blue icon replaces the 72px source icon. The mark is not redesigned. All handset scenery, lyric text and
LRC example text in this site are original illustrations. They are not Android
release captures. Both design/spec and standards reviews found their earlier
issues resolved; actual owner approval of this rework is still pending.

## Still required for launch

- Licensed public-release setup, LRC import/matching/synchronization and translation
  observations. The previously downloaded official v6.9.0 APK installed but its
  licensing check redirected the clean emulator to Play; the QA build is not evidence.
- Representative real Android footage with original/cleared lyrics and a static
  equivalent. The interactive illustration does not satisfy the real-footage gate.
- Physical QR scan, actual screen-reader narration review, owner content/privacy/
  deletion accuracy approval and final production-origin choice.
- Separately authorized deployment/live checks and reporting access. No website
  tracking, app instrumentation, store changes or scheduling is introduced.

Source-guided help copy remains a candidate until release observations confirm
it. No final owner acceptance of this replacement is recorded.

## Review corrections

The interactive illustration now reclamps its presented position when the stage,
window, or controls resize. A secondary native disclosure offers 44px tap controls
for movement, alongside the visible drag hint and described keyboard commands.
Mobile navigation remains a server-rendered native disclosure with a small client
boundary that closes it on link selection and Escape. Text uses relative font
sizes; the scene toolbar wraps when text grows.

Public setup language now names Window Configs > Show, switches to another app,
and explains the APK-to-Play redirect without bypass instructions. The pinned
6.9 source supports the Window Configs, Show and notification-listener recovery
labels; installed public-release observations remain a launch gate. Source
verification belongs in this handoff rather than visitor-facing instructions.

## Owner review cadence after an authorized launch

At launch +30 days, check the five deployed routes, download/help/deletion links,
QR handoff, crawl directives, canonical origin, sitemap/indexing status and mobile
reading/interaction problems. Reconcile any changed app-release behavior with
setup and LRC guidance. Record the reviewer, date, version and unresolved facts.

At launch +90 days, review available Search Console page/query/device/date views
and aggregate Play Console reports. Keep source metric definitions, filters,
date ranges and access gaps. Search clicks, store-listing interactions, installs
and a first working lyrics window are distinct; this website adds no instrumentation
that connects them. Missing reports are unknown, not zero. Choose numerical
growth targets only after a defensible baseline.

After launch, collect dated ChatGPT and Perplexity samples for what the app does,
how permissions work, and how to import LRC. Retain the exact prompt, answer,
product/mode/locale, citations and factual errors against the observed app version.
Samples are observations, not stable ranking or citation guarantees. No reports,
AI-answer samples or future reviews have been fabricated, and no automation or
separate implementation estimate was created.
