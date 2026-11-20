# Floating Lyrics — Website

A product-and-help website for the Floating Lyrics Android app. Built with Next.js
16 and React 19, exported as static HTML for Firebase Hosting.

## Run

```sh
pnpm install
pnpm dev
pnpm build
pnpm test
pnpm lint
pnpm typecheck
pnpm format:check
```

Product and guide copy lives in `src/content/`. The five routes are `/`, `/setup/`,
`/lrc/`, `/privacy/` and `/support/`. The interactive illustration now starts a site-wide audio and lyrics demo. The lyric window appears by default on every route. Press Play to start music. Drag the card, tap lyrics to crop/reveal controls,
or edit minimizing, opacity, lyric size and timing inside the window. The playback timeline
is always enabled. Dragging and keyboard movement/resizing remain available. The demo
is a browser adaptation, not a recording or exact replica of the Android app.

See [architecture](ARCHITECTURE.md) and [the Apple design rework](docs/apple-redesign.md)
for the current implementation and release checks.

## Working demo and verification

```sh
pnpm build
pnpm preview
```

Open http://127.0.0.1:4197 . Use this preview server for the exported site: it
supports the byte-range responses required for reliable audio seeking. `pnpm dev`
also works. A basic server without byte-range support may play but fail to seek.

Optional browser tools stay outside the repository:

```sh
npm install --prefix /tmp/floating-web-browser playwright
node /tmp/floating-web-browser/node_modules/playwright/cli.js install webkit firefox
node scripts/check-demo.mjs
node scripts/check-demo-touch.mjs
node scripts/check-demo-experiments.mjs
```

The harness uses installed Google Chrome on macOS plus Playwright Firefox/WebKit.
`BROWSER_TOOLS` and `BASE_URL` override the tool directory and preview origin.
Results and screenshots are in `docs/demo/evidence/`. Mobile profiles emulate browser
engines on macOS; they do not establish physical Android/iPhone compatibility.
See [verification and differences](docs/demo/verification.md) and the
[Android source checklist](docs/demo/android-contract.md).

Music, theme, opacity and invitation text are reversible defaults in
`src/content/demo.ts`; cues are in `src/content/demo-cues.json`. The bundled original
spoken-word track and matching LRC have a [provenance record](public/demo/README.md).
No deployment has been performed. Previous `check-experience`, `check-interactions`
and enlarged-text hero movement results are historical: their stage-bounded drag
handle was replaced by this site-wide card. Their unchanged page/menu checks may
still be useful, but the demo harnesses above are the current interaction checks.

## Overlay refinement review

[Matching before/after review](docs/polish/index.html) and
[observations, experiments and remaining style choices](docs/polish/report.md).
Run `node scripts/check-polish.mjs` against the preview for stable lyric slots,
natural versus seek/reduced-motion transitions, touch slop and surface checks.
The HTML review includes full-page context, motion clips and three material choices.
Serve it locally with `python3 -m http.server 4198 --bind 127.0.0.1 --directory docs/polish`.

## First-visit clarity review

[Matching before/after views](docs/clarity/index.html) ·
[Message decisions and evidence](docs/clarity/report.md). Run `pnpm test:clarity`
against the preview for source captions, keyboard/touch actions and guide continuity.
Serve the review with `python3 -m http.server 4199 --bind 127.0.0.1 --directory docs/clarity`.
The review distinguishes scripted tasks from visitor testing; no recruited visitor
participants were available. Earlier review captures are historical.
