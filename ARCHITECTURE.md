# Architecture

Static Next.js 16 App Router site with React 19 and a single CSS design system.
The site exports to `out/`. Firebase Hosting configuration is retained; no
website deployment is part of this rework.

## Presentation

- System typography with size-specific tracking, generous leading for prose,
  and a light editorial canvas.
- `SiteChrome` provides global navigation, app identity, download links and footer.
- `ProductScene` shows three illustrative activities behind the one live window.
  The hero Play/Pause action uses that same audio controller; there is no second
  static lyric player. Settings and playback have concise visible labels.
- `LyricsDemoProvider` lives in the root layout around all five routes. One HTML
  audio element and all overlay state survive Next Link navigation and history.
  The card uses viewport-relative pointer gestures, independent resize corners,
  keyboard movement/resizing, chrome cropping and a minimized restore bubble.
  The window is visible by default; music waits for Play. Settings replace the
  reading area inside the same card, with independently scrollable controls and
  persistent playback below. Settings retain opacity, lyric size and timing.
  The playback timeline is always on.
- Audio `currentTime` is the only lyric clock. Audio events plus animation frames
  sample that position; frames never extrapolate from wall time. Scrubbing previews
  a destination and commits once on release; keyboard changes commit immediately.
  Pause, seek, end/replay, loading, buffering and retry follow the real media element.
- Original procedural music and synthesized speech are bundled with matching cues
  and LRC. `src/content/demo.ts` owns reversible editorial defaults. No autoplay,
  preference persistence, external player integration or tracking is introduced.
- `ArticlePage` renders the four help/privacy/support routes with a table of
  contents and a shared reading layout. Its content comes from `content/articles.ts`.
- Product copy is in `content/home.ts`; global identity and destinations are in
  `content/site.ts`. Route metadata uses `lib/metadata.ts`.

## Accessibility

Semantic navigation and headings, a skip link, visible keyboard focus, native
FAQ disclosures and mobile navigation remain available without JavaScript.
Direct downloading does not depend on the interactive illustration or QR code.
The live card has no decorative movement; reset is immediate. Reduced
transparency and increased contrast receive more solid materials.

## Release boundaries

The configured Firebase origin is proposed, not a verified deployment. Real
public-release footage, licensed-device setup/import observations, operational
privacy/deletion reconciliation and final owner acceptance remain required.
The previous design was rejected; its approval and visual results do not apply
to this replacement. See `docs/apple-redesign.md` for current verification.

## Demo evidence

See [Android contract](docs/demo/android-contract.md) and
[prototype verification](docs/demo/verification.md) for current capabilities,
experiments, browser results and physical-device gaps. Earlier hero-window movement
harnesses describe the replaced illustration and are historical, not current demo checks.

## Overlay polish

The outer 336×260 default and 44/48px chrome remain unchanged. `DemoIcon` supplies
consistent native-style SVG glyphs. The reading view fits all bundled cues per
geometry and reserves stable current/next rows, rather than refitting each couplet.
Adjacent natural cues get a short opaque settle; seeking, geometry gestures and
reduced-motion updates remain immediate. Touch movement uses an 8px threshold;
mouse remains 6px. Gesture feedback changes the edge/shadow, never the pointer mapping.
The mint palette remains provisional; backdrop softening has solid fallbacks for
reduced transparency. See `docs/polish/report.md` for visual evidence and owner choices.

## First-visit clarity

The homepage prioritizes the live demo and Android app action. Adjacent accessible
descriptions distinguish website demo audio from the app using a music player.
Repeated story, appearance and setup prose is replaced by the actual interaction,
a matching timed-file example and links to unchanged detailed guides. The window
starts over the illustration on home, stays continuous across routes, and retains
keyboard focus on the hero playback control. Mobile footer clearance prevents
links from being trapped behind the card. See `docs/clarity/report.md` and its
matching review for the experiments and untested visitor-comprehension questions.
