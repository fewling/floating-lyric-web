# Architecture

Static Next.js 16 App Router site with React 19 and a single CSS design system.
The site exports to `out/`. Firebase Hosting configuration is retained; no
website deployment is part of this rework.

## Presentation

- System typography with size-specific tracking, generous leading for prose,
  and a light editorial canvas.
- `SiteChrome` provides global navigation, app identity, download links and footer.
- `ProductScene` is the homepage's only interactive product island. It demonstrates
  a lyrics window over three illustrative app contexts. Pointer capture tracks
  the grab offset; movement is bounded by the actual stage and panel geometry.
  Arrow keys move the window, Home resets it. Reset uses a critically damped
  animation from the current position and is immediately interruptible by a grab.
- Scene controls choose app context and window appearance. There is no autonomous
  movement, audio, video playback, scroll hijacking or tracking.
- `ArticlePage` renders the four help/privacy/support routes with a table of
  contents and a shared reading layout. Its content comes from `content/articles.ts`.
- Product copy is in `content/home.ts`; global identity and destinations are in
  `content/site.ts`. Route metadata uses `lib/metadata.ts`.

## Accessibility

Semantic navigation and headings, a skip link, visible keyboard focus, native
FAQ disclosures and mobile navigation remain available without JavaScript.
Direct downloading does not depend on the interactive illustration or QR code.
Reduced motion disables transitions and makes window reset immediate. Reduced
transparency and increased contrast receive more solid materials.

## Release boundaries

The configured Firebase origin is proposed, not a verified deployment. Real
public-release footage, licensed-device setup/import observations, operational
privacy/deletion reconciliation and final owner acceptance remain required.
The previous design was rejected; its approval and visual results do not apply
to this replacement. See `docs/apple-redesign.md` for current verification.
