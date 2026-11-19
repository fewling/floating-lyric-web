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
`/lrc/`, `/privacy/` and `/support/`. The main experience is an explicitly labeled
interactive illustration, not a recording of the Android app.

See [architecture](ARCHITECTURE.md) and [the Apple design rework](docs/apple-redesign.md)
for the current implementation and release checks.

## Enlarged-text browser regressions

The optional browser harness exercises the production export through its public
routes. Install its tools outside the project, build, and serve the export:

```sh
npm install --prefix /tmp/floating-web-browser playwright
npx --prefix /tmp/floating-web-browser playwright install chromium
pnpm build
python3 -m http.server 4198 --directory out
```

In another terminal, run with the installed browser executable:

```sh
BROWSER_TOOLS=/tmp/floating-web-browser \
CHROME_PATH=/absolute/path/to/chromium \
BASE_URL=http://127.0.0.1:4198 \
EVIDENCE_DIR=/tmp/floating-enlarged-text \
node scripts/check-enlarged-text.mjs
```

`CHROME_PATH` defaults to Google Chrome on macOS. `CHECK=navigation` or
`CHECK=appearance` selects one regression. The harness uses 100% and 200% root
font sizes to reproduce text enlargement; it does not simulate native device font
settings or establish browser zoom, screen-reader or physical-device compatibility.
See [the verification record](docs/enlarged-text-verification.md).
