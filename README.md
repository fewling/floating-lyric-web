# Floating Lyrics — Website

Marketing site for the **Floating Lyrics** Android app
(lyrics that float over any app, synced to your music, translated by AI).

Static Next.js site, exported to plain HTML, hosted on Firebase Hosting.

## Quick start

```bash
pnpm install
pnpm dev          # http://localhost:3000
```

## Scripts

| Script           | Does                    |
| ---------------- | ----------------------- |
| `pnpm dev`       | Local dev server        |
| `pnpm build`     | Static export → `out/`  |
| `pnpm typecheck` | `tsc --noEmit`          |
| `pnpm lint`      | ESLint                  |
| `pnpm test`      | Vitest (unit/component) |
| `pnpm format`    | Prettier write          |

## Editing content

All copy lives in **`src/content/`** as typed data — edit there, not in JSX.
See [ARCHITECTURE.md](ARCHITECTURE.md) for structure, conventions, the
pre-launch checklist, and deploy steps.

## Design source

Visual identity and tokens come from
`../flutter-floating-lyric/docs/marketing-site/DESIGN.md`. OpenDesign is used for
visual exploration; this repo is the production implementation.

## Part of the Floating Lyric system

This repo is one of several that make up Floating Lyric:

- 📱 App — [flutter-floating-lyric](https://github.com/fewling/flutter-floating-lyric)
- 🌐 Landing — [floating-lyric-web](https://github.com/fewling/floating-lyric-web)  ← this repo
- 🔥 Firebase backend — [flutter-floating-lyric-firebase-cloud-function](https://github.com/fewling/flutter-floating-lyric-firebase-cloud-function)
- 🌱 Spring Boot backend — [floating-lyric-spring-boot](https://github.com/fewling/floating-lyric-spring-boot)
- 📄 API contract — [flutter-floating-lyric-openapi](https://github.com/fewling/flutter-floating-lyric-openapi)
- 📦 Generated DTOs — [flutter-floating-lyric-pkg-generated-openapi](https://github.com/fewling/flutter-floating-lyric-pkg-generated-openapi)

📋 Work across all repos is tracked on the [Floating Lyric — Product board](https://github.com/users/fewling/projects/2).
