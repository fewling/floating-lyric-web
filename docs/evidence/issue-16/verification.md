# Issue 16 interaction regression evidence

Baseline: `c498d12de4f157816a94cde2b37d3daa0cd40eb3`.
Fix: `fb07606` on `fix/issue-16-implementation`.

The rendered homepage is the test seam. Tests use browser input and visible geometry,
computed presentation, native disclosure visibility and focus; they do not inspect
React state or drag refs. Browser tools follow the existing optional harness convention:

```sh
npm install --prefix /tmp/floating-web-browser playwright
npm run build
python3 -m http.server 4197 --directory out
# In another terminal:
BASE_URL=http://localhost:4197 EVIDENCE_DIR=docs/evidence/issue-16 node scripts/check-interactions.mjs
```

`BROWSER_TOOLS` overrides `/tmp/floating-web-browser`; `CHROME_PATH` overrides the
local Google Chrome executable. `CHECK=navigation`, `reset`, `mixed-movement` or
`touch` runs one journey. No browser dependency is required for the site build.

Before each implementation slice, its new browser test failed on the previous
behavior: outside navigation stayed open; held movement after Home restored the
old displacement; touch-down left the rendered handle unchanged. A fourth test
reproduced the same stale-origin problem after an arrow key during a held drag.
Red logs are retained in `/tmp/fl16-evidence` during this review session.

The production static export passed all four journeys. Navigation covers 320px and
390px, outside link/button action, preserved button focus, keyboard outside
activation, Escape after Tab leaves the disclosure, Escape inside, trigger toggle,
and route selection with destination main focus. Drag journeys cover normal and
reduced motion, preserved grab offset, Home with the pointer held, repeated Home,
a fresh grab interrupting reset, and mixed keyboard/pointer movement.

Touch uses actual Chromium CDP touch input at 390px. It checks immediate static
feedback before movement, release, cancellation, established capture loss before
release, fresh drag recovery, Home and narrow resize cleanup, with normal and
reduced motion. Capture-loss assertions allow the browser to deliver its pending
event and render the resulting presentation before checking it.

Reset and programmatic movement end the current drag and release live capture.
Further movement of that held pointer is ignored until a fresh grab. This avoids
restoring stale displacement. Secondary/non-primary pointers cannot replace the
active drag. The static tint has no added transition; light and dark treatments
are shown by the six compact handle captures beside this record.

Project validation passed: 8 existing Vitest tests, TypeScript, ESLint, Prettier,
and the production static export build. Existing broader experience checks are
run separately during integration review.

This is desktop Chromium touch emulation. Physical touch-device acceptance is
pending; no device-level or assistive-technology acceptance is claimed.
