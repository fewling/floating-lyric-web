# Message decisions before implementation

Main journey: understand floating lyrics → try website audio → find the Android app.
Detailed setup, privacy, support and LRC routes retain their instructions.

| Important message | Decision | Interface evidence / remaining text |
|---|---|---|
| Lyrics sit over another activity | Demonstrate, shorten | Live movable window over the phone illustration and actual site; a functional headline. Remove the repeated story section and static duplicate lyric card. |
| Lyrics follow playback | Demonstrate | Real audio, current/next line and seek timeline. Remove prose describing the synchronization already visible. |
| Website plays audio; Android accompanies another player | Keep concise and explicit | Map “Website audio” to Play demo and “Uses your music player” to the Android app action. Keep an optional FAQ clarification. This cannot reliably be conveyed by animation. |
| Start music | Familiar labeled action | Play demo / Pause demo in the hero and a visible Play/Pause label in the persistent player. One action, no instructional paragraph. |
| Move/resize/settings | Affordance and feedback | Existing drag/resize behavior, visible grip, labeled Settings, held-state feedback; preserve accessible names and keyboard controls. Discoverability still needs visitors. |
| Find Android app | Hierarchy | Get the app stays in navigation and hero; Google Play destination is explicit. One QR handoff near the download section. |
| Bring matching timed lyrics | Visual + short label | Small Hours LRC with timestamps matching the bundled track, one sentence and LRC guide link. |
| Appearance can be adjusted | Interaction | Existing inline settings; remove the redundant explanatory section and static theme examples. |
| Android permissions / matching / troubleshooting | Reveal on intent | Concise setup link/cards, existing detailed setup route and FAQ disclosures. |
| Translation and compatibility limitations | Reveal on intent | Retain qualifications in FAQ/support; do not turn them into unsupported broad promises. |
| Demo isn't Android footage | Short visible provenance | “Illustration” by the phone; “Web demo” on the actual window. |

No visitor participants have been recruited. Scripted action probes and first-fold
geometry tests establish reachability and mechanics, not human comprehension.
