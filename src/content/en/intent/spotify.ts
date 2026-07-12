import type { IntentPageContent } from '../../types'

export const spotify: IntentPageContent = {
  slug: 'spotify-lyrics-overlay',
  metaTitle: 'Spotify Lyrics Overlay for Android — See Lyrics Over Spotify',
  metaDescription:
    'Show floating, synced lyrics on top of Spotify on Android — even while you chat or browse. Works with Spotify Free, no Spotify login, with instant AI translation.',
  h1: 'See lyrics over Spotify — floating, synced, translated',
  intro: [
    "Spotify's own lyrics live inside the app: switch to your messages, your browser, or a game, and they're gone. Floating Lyrics puts the words in a small overlay that stays on top of everything, synced line by line to whatever Spotify is playing.",
    "It works by reading Android's media session — the same 'now playing' info your lock screen uses. That means no Spotify login, no account linking, and it behaves identically on Free and Premium.",
  ],
  contextLabel: 'Spotify playing in the background',
  steps: [
    {
      title: 'Install Floating Lyrics',
      detail: 'From Google Play — it takes seconds.',
    },
    {
      title: 'Allow the overlay',
      detail: 'One tap for "display over other apps".',
    },
    {
      title: 'Press play in Spotify',
      detail: 'The overlay picks up the track and syncs automatically.',
    },
  ],
  faqs: [
    {
      id: 'spotify-free-tier',
      question: 'Does it work with Spotify Free?',
      answer:
        'Yes — the media session is identical on Free and Premium, so lyrics sync the same way on both.',
    },
    {
      id: 'spotify-login',
      question: 'Do I have to connect my Spotify account?',
      answer:
        'No. Floating Lyrics never touches your Spotify account; it only reads what your phone reports as playing.',
    },
    {
      id: 'spotify-missing-lyrics',
      question: 'What if a song has no lyrics in Spotify?',
      answer:
        "Floating Lyrics doesn't use Spotify's lyrics at all — search online sources in the app or import your own .LRC file, and the overlay shows those instead.",
    },
  ],
  crossLinkSlugs: [
    'youtube-music-lyrics-overlay',
    'apple-music-lyrics-overlay',
    'lyrics-while-gaming',
  ],
}
