# Clarity through the interface

21 November 2026, Hong Kong. [Working site](http://127.0.0.1:4197) ·
[Before/after review](http://127.0.0.1:4199) · [Offline review](index.html).

Applied the requested [apple-design skill](/Users/felixwong/.agents/skills/apple-design/SKILL.md),
particularly Purpose, Familiarity, Grouping & mapping, Simplicity and direct feedback.
The existing palette and window material remain unchanged. No product features were added.

## What changed

| Before | After | What communicates now |
|---|---|---|
| A poetic headline, explanatory introduction and repeated synchronization story. | “Your lyrics. Over your apps.” beside the live demonstration. | The headline names the job; the window visibly occupies a layer above the illustrated activity and real website content. |
| A static lyric card inside the illustration plus the separate live window. | One actual lyric window, initially positioned over the illustration. | The demonstrated window is the one visitors can play, move, resize and take across routes. |
| “Show lyrics demo” brought an already visible window into focus without starting audio. The caption then told visitors to start music. | Play demo starts music in one action and changes to Pause demo. The floating player also has visible Play/Pause text. | Familiar controls and actual feedback replace the instruction. Keyboard focus stays on the hero control when its label changes. |
| A tune icon and an unexplained title bar. | Visible Settings label, a small conventional grip, and the existing held-state feedback. | The control names its destination. The grip suggests direct movement without adding a paragraph or new gesture. Touch discovery still needs visitors. |
| The audio/player relationship appeared in the hero, scene, story, FAQ and footer. | “Website demo audio” is attached to Play; “Uses your music player” is attached to the Android app action. “Web demo” stays on the floating window. | Source information appears where the visitor chooses between the demonstration and the app. These captions are also accessible descriptions. |
| Appearance illustrations, style instructions and homepage setup paragraphs repeated capabilities or guide content. | Existing inline settings demonstrate adjustment; compact setup/support links lead to the detailed routes. | The common path stays short. Detailed help remains available when sought. |
| A different fictional LRC song and several paragraphs about timing. | Small Hours LRC lines use the actual demo's 2s, 6s and 10s timestamps, plus one matching-recording sentence. | The timestamp-to-line relationship is visible; the recording requirement remains explicit. |
| QR handoff repeated near the hero and at the end, alongside multiple store explanations. | Direct app links remain prominent; one optional “Scan for your phone” disclosure holds the QR. | The default action is the app link, with the desktop-to-phone handoff revealed on intent. |

The [message decision table](message-decisions.md) records which messages were
shown, shortened, expressed through interaction, revealed on intent or removed.
Compatibility, missing-lyric and translation qualifications remain in concise FAQ
disclosures. The detailed setup, LRC, privacy and support content in
`src/content/articles.ts` was not edited.

## Inspection and experiments

I used the live site before and after at desktop 1440×1000, phone-profile 390×844
and small-profile 320×568, including idle, playing, seeking, activity switching,
inline settings and guide navigation. The review contains **18 matching image
pairs**: same route, viewport and task state, with real layout/scroll/anchor changes.
[Before records](before/states.json) · [After records](after/states.json).

**Main-action probe.** Before, the illustrated action was below the initial viewport
at each tested size (approximately y=1016, 841 and 940) and one click left audio at
0s, paused. After, the labeled Play action is initially visible and starts actual
audio in one click, with visible Pause feedback. This is an observed control-behavior
improvement, not a measured visitor-discovery improvement.
[Before probe](before/action-probe.json) · [Layout/action results](alternatives/results.json).

**Centered versus alongside.** Both short-copy layouts expose Play and Get the app.
The alongside desktop layout is recommended because the demonstration frame and its
illustration label fit together in the initial desktop viewport. The centered
alternative and alongside alternative are shown with identical copy and palette.
After the context strip moved above the illustration, it was also accessible in
the 390px initial view. At 320×568 it still needs scrolling; the main Play/app actions
and both source captions remain visible and unobscured. Preference for centered
versus alongside remains a visual choice, not a comprehension result.

**Obstruction probes.** A phone check found that the live card covered the original
context strip. It now sits outside the illustration. A 320px regression also found
that footer links could be trapped behind the lower card at the end of the page;
mobile footer scroll clearance lets these links rise above it. Existing movement,
resize, crop, minimize and keyboard behavior remain available.

**Copy-load measure.** Initially rendered main-content text fell from 506 to 143
whitespace-separated words/tokens on desktop, and 479 to 143 on phone profiles.
The browser's `main.innerText` was split on whitespace with disclosures closed;
the persistent live window is outside `main`. The measure includes labels and
example-file tokens and excludes closed FAQ answers. It measures reduced reading
load, not comprehension, conversion or user preference.

## What was tested, and what was not

There were **no recruited visitor participants**. No visitor observations were
provided during this pass. Findings come from my inspection and programmed tasks.
The scripts select known controls, so passing them cannot prove that a new visitor
will notice the same controls or build the intended mental model.

[Task probes](evidence/task-probes.json) cover installed Chrome at desktop, 390px
and 320px, plus WebKit at 390px. They check:

- No audio request before activation; one visible live window.
- Initially visible and unobscured Play/app controls and source captions.
- Keyboard Play/Pause on the same focused control, with actual audio and label feedback.
- Touch activation, activity switching without resetting the same audio element,
  inline settings and keyboard sliders, guide navigation, close and keyboard reopen.
- Whole-page automated WCAG A/AA checks in Chrome. These do not establish human
  screen-reader usability or universal accessibility.

The existing regression harness also covers all five routes and Back/Forward,
pause/resume, forward/backward seeking and matching cue indices, movement/resizing,
crop/reveal, bubble restore, mobile menus and audio error/retry. Browser profiles
emulate mobile engines on macOS; physical Android/iPhone behavior is unverified.

## Questions still needing visitors

A short uncoached test should ask a person unfamiliar with the product to:

1. Describe what they expect the Android app to do after seeing the first view.
2. Try the demonstration, stop it, then browse to setup while music is playing.
3. Find the Android app and say what they expect to produce sound after installation.

Observe first clicks, hesitation and recovery without pointing to controls. In
particular, test whether the source captions distinguish website audio from the
separate Android music player; whether the activity controls are understood as an
illustration; whether touch visitors discover dragging/resizing; and whether the
LRC example is understood as a file format rather than a browser import feature.
The 320px experience deserves separate observation because the demonstration
context controls require a scroll. No visitor success rate is claimed.

The centered/alongside layout alternatives are concrete visual options in the
review. The functional headline and restrained palette are the current defaults;
visual preference and the above comprehension questions remain open for owner
review and actual first-time visitors.
