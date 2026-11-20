# Floating Lyrics refinement review

20 November 2026. [Working prototype](http://127.0.0.1:4197) ·
[Matching visual review](http://127.0.0.1:4198) · [Offline review HTML](index.html).

This pass refines the existing overlay. The music, five routes, player ownership,
336×260 default window, 18px radius, 44px title/chrome strip, 48px playback row,
lock/crop/bubble/viewport behavior and explicit activation remain in place.

## Observations versus judgments

I used the running site at 1440×1000, 390×844 and 320×568, including idle, playing,
paused, seeking, held dragging, line changes and internal navigation. The setup and
privacy pages place real headings and dense body text behind the card. Dark and
light views are included. These are browser-engine mobile profiles, not phones.

| Before | After | Evidence or judgment |
|---|---|---|
| Centering the changing couplet moved the current lyric vertically. | Fit all supplied cues for the current geometry and reserve stable current/next rows. | Observed: the first-line top varied by 13.75px at 336/296px widths. The layout prototype and shipped refinement measure 0px settled drift. |
| Play/Pause was an unframed text glyph beside disabled chevrons; the range used browser-native artwork. | One SVG icon family, a 28px primary disc inside its original button, consistent 3px track, and an explicit “Seek to” preview. | Observed: glyph and slider shapes differed by platform; primary/secondary salience is a design judgment. Controls keep their original positions and hit-area allocation. |
| Resting and moving looked alike. A tested 7px touch drift became a drag. | Highlight the held edge/shadow, retain direct movement, and use 8px touch slop. Mouse remains 6px. | Observed: a real CDP 7px touch now activates Pause without moving; a 12px drag follows the pointer without activating Pause. No scale, momentum or position easing was added. |
| Underlying page text was visibly sharp through the tinted card. | Retain the mint color and 96% opacity, soften the backdrop by 8px. | Observed in matching busy-page captures: the competing text pattern is reduced. Preferring a frosted or matte material is still subjective. |
| Text changed with no visual continuity. | Adjacent natural cues get an opaque 8px/160ms settle; explicit seek, geometry interaction and reduced-motion changes stay immediate. | Smaller displacement is measurable; a reading-comfort advantage has not been established with participants. |

Typography remains system type. Current lyrics move from weight 650 to 600 with
slightly less tight tracking; next-line text remains smaller and more subdued.
The lighter weight, tighter 8px block gap and calmer control treatment are visual
judgments, shown in the comparison rather than presented as functional proof.
Fitting the whole recording also avoids per-line font changes in a constrained card.
At the tested enlarged-size/minimum-height combination, it chooses a stable 21px.
The final font size may still change when the visitor resizes the window or changes
the size preference; it no longer changes simply because a new cue wraps differently.

## Experiments and recommendations

[Original comparison data](experiments/results.json) ·
[Refined implementation measurements](verification.json).

1. **Centered couplet versus reserved rows.** Eight successive vocal cues were
   compared at card widths 336, 296 and 240px. Settled first-line drift fell from
   13.75/13.75/9.625px to zero. The final implementation additionally checks all 18
   cues, with no font changes or current-line overflow at these widths. Keep reserved
   rows: they address a measured distraction without enlarging the card.
2. **6, 8 and 12px touch thresholds.** An isolated pointer prototype tested 3, 5, 7
   and 12px movements with Chrome CDP touch events. Six pixels canceled the 7px tap;
   eight preserved it and still allowed the 12px drag. Twelve also preserved small
   drift but offers no benefit in these cases. Keep eight as a modest touch-only
   adjustment; this is bounded input evidence, not a physical dexterity study or
   proof of Flutter's exact device threshold. The production implementation was
   tested separately with real touch events.
3. **48px/300ms versus 8px/160ms lyric motion.** Browser prototypes used the same
   opaque content and easing. At 60ms, displacement was about 19.3px versus 2.5px.
   The shorter version had settled by the later sample. Keep the short version to
   minimize how much text moves; the two motion clips remain in the review for
   subjective comparison. The larger candidate is inspired by native source values,
   not a recording of the Android animation.
4. **Surface character.** The same paused cue over the same privacy-page content
   is shown as softened mint, solid mint and neutral charcoal. No new appearance
   choices were added to the product UI. Existing light/dark and opacity controls
   still work. The existing mint palette with softening is a reversible default,
   not an owner-approved visual identity.

## Android comparison and limits

The current source at `../flutter-floating-lyric`, commit
`08b56a967b70628b0dfa0f0451a8e569b83f7d0f`, supplies concrete references:

- `_overlay_chrome.dart`: 40px header targets, 12px semibold identity, restrained
  tune/close icons and reduced chrome emphasis.
- `_overlay_playback.dart`: single 48px playback dock, distinct curved edge grips,
  adaptive/disjoint targets and a highlighted primary transport action.
- `adaptive_lyric_view.dart`: line-change motion up to 48px over 300ms, disabled during
  geometry gestures, manual reading and reduced-motion operation.
- `overlay_geometry_handle.dart`: raw pan/resize ownership and button-drag suppression.

I also inspected the actual native capture
`docs/validation/lyrics-window-settings/apple-restored-reading.png` in the Android
repository. It shows the real tune/close icons and highlighted dock over Clock,
but is a historical preview-77 waiting view from a subsequently rejected adjustment
iteration. It is not evidence of the current playing typography, exact gesture feel,
or acceptance of that build. A read-only `android layout --device=emulator-5556`
found the main app's Music folders settings and no active lyric overlay. I did not
change that device's app state or use a personal phone for this review.

The website adapts the evidenced hierarchy rather than claiming an exact native
material or animation. Its backdrop filter softens **this document**, not another
Android application. Native cross-app window physics, current installed-build feel,
physical Android/iPhone comfort and human screen-reader acceptance remain unverified.
The previous demo differences, including its explicitly labeled pause-on-close,
remain documented in [the functional prototype record](../demo/verification.md).

## Verification and matched evidence

[Before manifest](before/states.json) · [After manifest](after/states.json).
There are 24 pairs: eight states at three viewports. Every pair has the same route,
lyric and window rectangle. Paused, seeking and held-drag views use the same 8.5s
position; live playing/line-change captures vary by a few milliseconds. Full-page
context accompanies the enlarged card comparison. Idle is unchanged.

- 72 browser journey assertions pass across installed Chrome, Firefox and WebKit,
  plus Chrome/Pixel, WebKit/iPhone and 320px Chrome profiles. All five routes,
  Back/Forward, pause/seek/resume, crop/reveal, movement/resizing, lock, modes,
  touch-through, page scrolling and mobile menus remain covered.
- Nine touch/failure checks pass, including outside-card swiping and audio retry.
- Six focused refinement checks pass: whole-recording fitting, natural/seek/reduced
  motion, actual touch tap versus drag, scoped axe A/AA scan and WebKit surface.
  Chrome and WebKit both compute the intended 8px backdrop filter.
- Build, TypeScript, ESLint and nine Vitest tests pass. A visual review also inspected
  matching phone captures and the rendered comparison gallery. Functional passing
  is compatibility evidence; it does not establish that the styling is successful.

Browser regressions are in `docs/demo/evidence/`; the focused record is
`verification.json`. The capture and experiment scripts are in `scripts/`.
The experimental pointer model is isolated from the product and is corroborated by
production touch checks. No participants or physical-device trials were performed.

## Owner choice still open

The review offers **A: softened mint**, **B: solid mint**, and **C: neutral charcoal**.
The palette, opacity recipe and degree of material softness remain aesthetic choices.
The default retains the existing mint direction. Outer proportions were deliberately
preserved: the stable reading layout solved the measured movement without adding
screen coverage. The shorter lyric motion is recommended for its smaller excursion;
you can compare it against the larger alternative in the review before approving
that visual rhythm.

## Subsequent settings simplification

The owner subsequently removed Lock, viewport fill, touch-through, theme controls,
the timeline toggle, the movement/resize section, download/provenance links, and the
panel heading/helper text. The timeline is always on. Current settings retain only
Done, Minimize to bubble, background opacity, lyric size and lyric timing. The visual
captures above document the preceding polish review and include controls since removed.

The owner then requested settings inside the overlay and a visible window on page
load. Settings now replaces the reading area in the same card; Done and playback
remain in the header/footer. The control area scrolls independently on small screens
and stays open across internal navigation. Fresh loads show paused lyrics without
requesting audio; Play remains an explicit visitor action.
