# Android overlay evidence and browser contract

Inspected before implementation, 20 November 2026. Android repository:
`../flutter-floating-lyric`, HEAD `08b56a9` (working source, not a verified installed build).
Website baseline: five routes (`/`, `/setup/`, `/lrc/`, `/privacy/`, `/support/`),
hero-only movable static card, no media element. Existing navigation uses Next Link.
Read installed Next 16.2.7 guides: layouts/pages, linking/navigation, server/client components.

## Checklist derived from actual source

| Interaction / state | Android evidence | Website prototype contract |
|---|---|---|
| Whole-card immediate movement; button drag cancels tap | `lib/apps/overlay/widgets/overlay_geometry_handle.dart`, `_widgets/_overlay_window.dart` | Pointer movement with small slop; no long press; keyboard/tap alternatives |
| Tap lyrics hides/reveals header and footer; crop keeps lyric rectangle fixed | `_overlay_window.dart`, `blocs/overlay_window/overlay_window_chrome.dart` | CSS crop; hidden controls removed from focus/hit testing; safe-edge correction on reveal |
| Two lower corner resize grips; opposite edge held | `_widgets/_overlay_playback.dart`, geometry handle | Independent width/height, both corners, keyboard alternatives; locked grips unavailable |
| Lock prevents movement/resize, playback remains usable | `_overlay_window.dart`, `overlay_window_geometry_gestures.dart` | Same boundary |
| Play/pause, previous/next capabilities, timeline | `_overlay_playback.dart`, `repos/playback/playback_repo.dart` | Local audio; previous/next disabled for one-track demo; seek preview commits on release |
| Reported playback drives lyrics, pending/error feedback | `_overlay_playback.dart`, `blocs/msg_to_main/msg_to_main_playback.dart` | HTML audio events and currentTime; no wall-clock lyric extrapolation |
| Minimize bubble; restore saved expanded rectangle; docking | `overlay_window_modes.dart`, `overlay_window_docking.dart` | Draggable restore bubble, edge docking; no claim of native fling/morph fidelity |
| Maximize then restore geometry | `overlay_window_modes.dart` | Website viewport only; header remains reachable |
| Ignore touch / touch through | `_overlay_window.dart` config guards | Pointer-through inside this document with separate recovery control |
| Appearance, opacity, font ceiling, progress and timing settings | `widgets/appearance_controls.dart`, `reading_controls.dart` | Reversible session-only subset |
| Waiting / searching / missing / error lyrics, held historical reading | `_OverlayContent` in `_overlay_window.dart` | Bundled timed lyrics; media loading/error/retry; no network search or historical reading |
| Close ends overlay; external player independent | `_overlay_chrome.dart` | Close pauses the demo and removes card; explicit reopen |

## Evidence limits established before implementation

No Android device session was inspected. Source and review specs sometimes describe
superseded layouts: the current source has a tune button opening adjustment controls,
not the older documented More menu. Exact physical gesture thresholds, native ACK
failures, TalkBack output, fling physics, safe areas, and installed-build behavior
remain unverified. This is a browser adaptation, not an exact app replica.

Browsers cannot overlay other applications, inspect arbitrary music apps or grant
Android notification/overlay permissions. Audio requires visitor activation and may
be suspended by mobile OS/background policies. Internal Next Link and same-document
history can retain one audio element; reload, new tab, external navigation and closing
the tab cannot promise continuity. No autoplay, cross-app or system fullscreen claim.
Real Android Chrome/iPhone Safari and screen reader testing require devices; engine
emulation is explicitly labeled as such in verification results.
