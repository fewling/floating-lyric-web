# Enlarged-text layout verification

Issue [#18](https://github.com/fewling/floating-lyric-web/issues/18) corrects two
layout failures: navigation overlapping header controls and clipped appearance
examples. No interaction model, copy or project dependency changed.

## Method and regression evidence

The production-export browser seam was specified in the issue before tests were
written. The optional `scripts/check-enlarged-text.mjs` uses externally installed
Playwright and Chromium 159. Viewports use CSS pixels. Text enlargement overrides
the root font from 16px to 32px; this is a reproduction method, not native browser
zoom or device font testing. See README for running the harness.

Baseline `5638eed3aff99762f8a304393152adab65627792` reproduced the navigation
failure at 320px and 200% root text: the header ended at 122px, while the panel
started at 57px. A real touch at the trigger center left the menu open. The new
navigation guard failed before implementation with
`/ 320px 100%: panel clears full header` (the fixed offset also intruded into the
normal-size header).

After making navigation follow the rendered header, all 20 combinations of five
routes, widths 320/390 and root sizes 100%/200% passed. Checks cover full header
clearance, real trigger-center touch toggling, download/link pointer hit-testing,
no horizontal scrolling, visible keyboard focus, Escape focus restoration,
outside dismissal and page selection.

The appearance guard then failed before the appearance fix with
`320px 200%: complete example stays inside its illustration`. Changing fixed
heights to minimum heights and placing the caption in normal flow fixed vertical
clipping. Visual inspection additionally caught a long word extending beyond the
illustration at 320px/200%. Strengthening the guard from paragraph boxes to actual
rendered text ranges reproduced that failure before adding wrapping to the example
cards. All six combinations of widths 320/390/1280 and root sizes 100%/200% pass:
both transformed cards and their lyric text fit inside the illustration, with
separation above the caption. Illustration-only evidence captures hide the sticky
header during screenshots so it cannot obscure a multi-viewport illustration;
layout assertions run with the header present.

## Checks and limits

- Production export: passed.
- ESLint, TypeScript, formatting and all eight existing Vitest tests: passed.
- New production browser layout regression: passed, 20 navigation and six
  appearance combinations. Visual previews inspected at all six appearance sizes.
- Independent integration checks for no-JavaScript content/download/help routes,
  preferences and automated accessibility: pending integration verification.
- Native Chrome UI zoom was attempted independently but automation failed before
  a zoom level was confirmed. It remains unverified.
- No screen-reader session, physical device test, deployed-site review or WCAG
  conformance assessment was performed. Parent issue #3 release evidence remains
  outside this layout correction.

Browser screenshots and detailed run notes are kept outside the repository.
