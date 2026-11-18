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
