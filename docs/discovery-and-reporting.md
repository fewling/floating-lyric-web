# Discovery and aggregate reporting handoff

Prepared 18 November 2026 for issue #10. This is a launch/review procedure, not a completed review. No website tracking, app instrumentation, scheduled automation, deployment, or Play configuration change is included.

## Origin and launch gates

The existing Firebase Hosting site `floating-lyrics` has the default origin `https://floating-lyrics.web.app`, confirmed through read-only Firebase site inventory on 18 November 2026. It currently returns 404. No deployed website or indexing is established. The former placeholder `floatinglyrics.app` did not resolve.

This build proposes the existing Firebase origin. The owner must approve the final origin before launch. For an approved custom origin, set `SITE_ORIGIN=https://approved.example` while building. It must be an HTTPS origin without paths, credentials, query parameters, or fragments. Canonicals, social metadata, sitemap and robots use the same build value. A static export requires a rebuild when it changes. If moving from an already published origin, separately review redirects and canonical migration.

Separate authorized launch actions: approve factual content and public-release evidence, choose the final origin, authorize deployment, then verify live HTTPS responses, metadata, social image, all five routes, crawling headers, sitemap and robots. Owner approval of current app behavior/guide steps and real demonstration evidence remains required; source inspection and an app launch blocked by Play licensing are not successful runtime verification. Only after deployment should the owner consider submitting the sitemap or requesting indexing in Search Console. These steps do not guarantee indexing, ranking, rich results or AI citations.

## Technical discovery surfaces

The five routes are `/`, `/setup/`, `/lrc/`, `/privacy/` and `/support/`. Shared footer links expose all five on every page; the header directly exposes setup and LRC help. Main explanations remain HTML text. Each route has its own title, description, canonical, Open Graph URL and social title/description, with a shared 1200×630 PNG card. The card is original typography, not a product screenshot; editable artwork is `public/design/social-card.svg`.

The homepage JSON-LD identifies Floating Lyrics as an Android multimedia application and points to the intended Play package `com.floating.lyrics`. It makes no pricing, rating, review, release-version or universal compatibility claim. Minimal truthful markup may not satisfy every enhanced search presentation's requirements; do not invent missing facts to qualify.

Verification after a production build:

```sh
NODE_OPTIONS=--no-experimental-webstorage npm run build -- --webpack
node scripts/check-search-output.mjs
python3 -m http.server 8760 --directory out
# In another terminal:
node scripts/check-search-output.mjs http://localhost:8760
```

The webpack flag accommodates this task's external `node_modules` symlink; a standard checkout can use the normal build command. The public-output checker independently checks literal page titles, intent-specific descriptions, canonical/social URLs, crawl settings, five-route footer discovery, sitemap membership, structured-data boundaries, and PNG dimensions. Browser accessibility, visual review, external destination checks and runtime app verification are separate evidence.

Prioritize useful Android lyrics-window and synchronized LRC-import answers. Google Search and its AI experiences share this useful public content. Do not create generic song pages or promise special GEO treatment.

## Reporting access and baseline

No Search Console property, Play Console reporting permission, aggregate export, baseline or real-user field dataset was reviewed in this task. Firebase Hosting read access does not establish access to either reporting product. Public store visibility does not grant Console reporting access. The owner should supply existing aggregate exports or grant the appropriate read access through a separately authorized action. Record unavailable or suppressed data as missing, never zero.

| Source                     | Owner action and useful evidence                                                                                                                                                                                                                                                               | Boundary                                                                                                                                               |
| -------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------ |
| Search Console             | Confirm a verified property for the final origin. Export the available Performance views by page/query, device, country and date, plus Page indexing, sitemap status, and URL Inspection for the five pages. Keep property, filters, reporting timezone and extraction date with every export. | Search clicks reach the website; they are not website store-link clicks or installs. Query omissions/thresholds and reporting delay limit comparisons. |
| Google Search AI reporting | Inspect the generative-AI performance views actually available to the property and retain their labels/filters separately from ordinary Search reports.                                                                                                                                        | Account access and data availability remain unknown; do not infer a distinct AI audience from a manual prompt.                                         |
| Play Console               | For `com.floating.lyrics`, obtain Store performance/Conversion analysis and Grow users/Statistics exports. Preserve metric names, date range, country, acquisition state and traffic-source filters.                                                                                           | Keep store-listing button intent, completed acquisition and device installation measures distinct. No website-to-install attribution is established.   |
| Existing support           | Owner summarizes recurring setup, lyric matching, synchronization, LRC and account questions without publishing personal information.                                                                                                                                                          | Anecdotes identify problems; they are not a representative first-use completion rate.                                                                  |

Google documents generative-AI reporting within Search Console; verify the current views in the actual property before using them. [Google Search Central, June 2026](https://developers.google.com/search/blog/2026/06/gen-ai-performance-reports).

Google's current Play documentation distinguishes listing Install/Open/Pre-register clicks and CTR from completed acquisitions, which remain in Grow users/Statistics and downloadable reports. Legacy acquisition-based exports can differ from current listing-click reports. Preserve those definitions rather than combining them into one conversion rate. [Play Console reporting documentation](https://support.google.com/googleplay/android-developer/answer/9859173?hl=en).

The desired outcome is a first working synchronized lyrics window. Neither search clicks nor store acquisitions prove that outcome. This scope adds no method to measure it reliably, and no tracking parameters are added to the primary Play URL.

## 30-day review after actual launch

The owner records the real launch date and performs this review around launch +30 days; no calendar event has been created. Check deployed routes, redirects, canonical origin, metadata, card loading and crawl directives. Inspect indexing and sitemap reports where access exists. Review mobile reading, download/QR, setup, LRC and support journeys; reconcile recurring support questions with the shipped app version. Recheck any changed release claims and guides. Document access gaps and technical fixes with evidence and a responsible owner.

Record available aggregate data, but treat a small or delayed sample as insufficient. Indexing eligibility is a technical finding; traffic growth is a separate observation.

## 90-day baseline and decisions

Around actual launch +90 days, compare available complete periods of equal length, retaining filters and noting app releases, store changes, seasonality and report definition changes. Separate branded queries from Android-overlay and LRC-help intents. Compare page/query demand and recurring user problems, not just totals. Review aggregate Play traffic and acquisitions alongside Search observations without attributing changes to the website. If available, assess field performance at the 75th percentile; laboratory scores do not substitute for field data.

Only after recording baseline volume, uncertainty and an actionable problem should the owner choose numerical targets and a next review date. Examples of evidence-led work are repairing failed indexing, clarifying an observed setup problem or improving the LRC answer for a recurring query. Recurring publishing is not a requirement.

## Dated AI-answer observation protocol

No ChatGPT or Perplexity accuracy/citation samples have been collected. At each review, use both products with a clean conversation and record the exact date/time/timezone, product/model if exposed, search/browse mode, account state, language/locale and exact prompt. Retain the full response, source URLs and screenshot/export locally. Suggested fixed prompts:

- “What does Floating Lyrics for Android do, and does it play music?”
- “How do I set up Floating Lyrics to show lyrics while using another app?”
- “How can I import synchronized LRC files into Floating Lyrics?”

For each response mark whether it identifies the intended app, gets permissions/product boundaries right, invents a price or universal compatibility, and cites the correct site/guide or Play package. Compare against the recorded public-release evidence, flag uncertain claims for owner review, and distinguish a cited source from an inference. Repeat on a later date to expose variability; retain unsuccessful or absent citations too. Samples describe those particular answers, not citation share, ranking, acquisition impact or proof that an edit caused a change.

Use an empty observation record until a real run exists:

| Observed at   | Product/model/mode/locale | Exact prompt and retained answer | Accuracy findings | Cited URLs | Limits/follow-up                                                  |
| ------------- | ------------------------- | -------------------------------- | ----------------- | ---------- | ----------------------------------------------------------------- |
| Not collected | —                         | —                                | —                 | —          | Run after launch or explicitly record a prelaunch sample as such. |
