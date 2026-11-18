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

Current verification results will be recorded after the production build and
browser review. Earlier branch screenshots and test counts do not prove this
new design. The actual Google Play package remains `com.floating.lyrics`.

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
