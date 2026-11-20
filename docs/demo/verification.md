# Site-wide lyrics prototype

20 November 2026. Review at **http://127.0.0.1:4197** while the preview server is
running. Recreate with `pnpm build && pnpm preview`. No deployment was performed.
Click **Try with music**. The same invitation is available on every route.

## Delivered behavior

One bundled 68-second original spoken-word music track, matching line-timed cues
and downloadable LRC. Speech onsets and cue timestamps come from the same generator;
no external song recording is bundled. See [track provenance](../../public/demo/README.md).

The player and overlay live in the shared root layout. Internal Next Link navigation
and Back/Forward retain the same audio element, playback position, window position,
appearance and lock state. No audio downloads or plays before explicit activation.
The media element's `currentTime` drives lyrics; rendering frames only sample that
clock. A scrub previews its destination and seeks once on release. Pause, backwards
seeks, resume, replay, buffering and explicit error/retry states use actual media events.

Whole-card dragging includes buttons and cancels their taps after movement. Tapping
lyrics crops/reveals controls without reflowing lyrics. Two corner grips resize;
keyboard and single-tap controls offer alternatives. Lock protects geometry while
retaining playback. Bubble, viewport fill/restore, theme, opacity, text size, lyric
clock offset, timeline visibility and document-only touch-through are available.
Touch-through makes the card inert and leaves a separate recovery button accessible.

## Browser evidence

[Raw browser results](evidence/browser-results.json) contain 12 journey assertions
for each of six configurations (72 passed, no page JavaScript errors):

| Engine / profile | Size | Scope |
|---|---|---|
| Installed Google Chrome | 1440 × 1000 | Desktop browser |
| Playwright Firefox | 1366 × 900 | Desktop engine |
| Playwright WebKit | 1440 × 1000 | Desktop engine; not branded Safari |
| Chrome / Pixel profile | 390 × 844 | Android viewport and touch emulation on macOS |
| WebKit / iPhone profile | 390 × 844 | iPhone viewport and touch emulation on macOS |
| Chrome, reduced motion | 320 × 568 | Small viewport and touch emulation |

Every configuration follows `/setup/ → /lrc/ → /privacy/ → /support/ → /`, then
Back/Forward, with `sameAudio: true`, advancing media time and matching cue indices.
For example, desktop Chrome observed 0.862 → 1.382 → 1.957 → 2.791 → 3.767 seconds
across those routes, without restarting. A paused seek to 18.25s displayed cue 5,
“The pages turn, the music stays”; seeking backwards to 3.25s displayed cue 1,
“The city settles into blue.” These are line-level checks, not acoustic latency or
word-level karaoke measurements. Each boundary is also checked by unit tests.

The journeys cover keyboard seeking/movement/resizing, hidden controls leaving the
focus tree, button-drag suppression, timeline gesture ownership, lock, saved geometry,
light appearance surviving navigation, touch-through hit testing/recovery, page
scrolling, mobile menu links, end/replay and closing with focus restoration.
Mobile WebKit does not expose mouse wheel input: that profile uses keyboard page
scrolling and separate emulated touch-tap checks instead.

[Touch and failure results](evidence/touch-results.json) record Chrome CDP touch body
drag, crop/reveal taps, corner resize, timeline seek, outside-card swipe, pointer
cancellation/capture loss/resize interruption, Escape focus restoration, 320px text
fitting and blocked-audio retry. WebKit's public Playwright touch API supports taps;
continuous WebKit touch drags/swipes were not verified. A scoped axe WCAG A/AA scan
of the card, open settings and launcher at 320px reported no violations; this does
not establish screen-reader behavior.

Screenshots: [desktop](evidence/chrome-desktop.jpg),
[phone profile](evidence/webkit-iphone-emulation.jpg),
[small touch viewport](evidence/touch-small-320.jpg).

Checks: production static build, TypeScript, ESLint and nine Vitest tests pass.
The browser and touch harnesses use real HTML media playback, not a mocked audio clock.
The build emits the environment's Node `module.register()` deprecation notice.

## Experiments and recommendations

[Recorded experiments](evidence/experiments.json):

- Crop versus layout removal: cropping retained the lyric region at y=700, h=168;
  removing chrome from layout moved it to y=656, h=260. Keep cropping.
- Release-only versus continuous seeking: one drag produced 1 versus 10 media seek
  events (0 versus 9 before release). Keep destination preview and one final seek.
- Tap versus drag: 3px jitter still activated Pause; a 12px button drag moved the
  card without pausing. Keep the small movement threshold and delayed capture.
- Document navigation resets the session and remains paused; internal navigation
  retains the audio. Keep the root player and Next Link navigation.
- Python's basic static file server did not provide a usable seek range in this
  environment. The included byte-range preview server supports seeking. Deployment
  must preserve byte-range media responses; production hosting was not tested.

## Remaining differences and owner choices

The [source checklist](android-contract.md) identifies evidence paths and which
Android states are outside this prototype. No installed Android build was exercised.

- Website viewport only; no system overlay, external player discovery/control,
  notification access, cross-app behavior, lock-screen or background-audio guarantee.
- No Android fling physics/native bubble morph, native geometry acknowledgement or
  recovery behavior. Bubble docks on release; viewport fill leaves site navigation
  and the recovery button accessible. Browser minimum width is 240px, compared with
  the native 160px layout. Hidden chrome is a document clip rather than a native crop.
- One known local recording: Previous/Next remain visible and disabled. No live lyric
  search/loading failures, translation, historical held reading or account settings.
- Settings are a nonmodal website panel with a session-only subset of native settings.
  Close explicitly pauses demo music; Android Close removes its overlay while the
  separate music app can continue. This difference is labeled in the close control.
- Refresh, external navigation and new tabs start separate sessions. Mobile OS audio
  interruption, physical Android Chrome/iPhone Safari, VoiceOver/TalkBack and actual
  browser text enlargement remain unverified. Engine/device profiles are not devices.

Music, dark/light initial appearance, opacity, text size and invitation wording/placement
remain provisional owner choices. Defaults are in `src/content/demo.ts`; invitation
placements are `ProductScene` and the persistent launcher in `LyricsDemo`. Nothing is
persisted between visits. The original synthesized track is a test fixture, not an
assumed final music selection.
