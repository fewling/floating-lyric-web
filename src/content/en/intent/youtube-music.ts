import type { IntentPageContent } from '../../types'

export const youtubeMusic: IntentPageContent = {
  slug: 'youtube-music-lyrics-overlay',
  metaTitle: 'YouTube Music Lyrics Overlay for Android — Synced & Translated',
  metaDescription:
    'Keep synced lyrics floating over YouTube Music on Android while you use other apps. Line-by-line sync and instant AI translation, free and without an account.',
  h1: 'Lyrics over YouTube Music — always visible, always in sync',
  intro: [
    'YouTube Music keeps its lyrics on the Now Playing screen — useful right up until you open another app. Floating Lyrics moves the words into an overlay that stays visible over everything, following each line as the song plays.',
    "For music in languages you're still learning, tap a line and read the AI translation right under the original — perfect for the K-pop and J-pop catalogs YouTube Music is so good at surfacing.",
  ],
  contextLabel: 'YouTube Music in the background',
  steps: [
    { title: 'Install Floating Lyrics', detail: 'From Google Play.' },
    { title: 'Allow the overlay', detail: 'A single Android permission tap.' },
    {
      title: 'Play anything in YouTube Music',
      detail: 'The overlay follows the media session and syncs.',
    },
  ],
  faqs: [
    {
      id: 'ytm-background',
      question: 'Does it work when YouTube Music is in the background?',
      answer:
        'The overlay follows whatever is actually playing. Note that background playback itself is a YouTube Music Premium feature — if playback stops when you leave the app, the lyrics pause with it.',
    },
    {
      id: 'ytm-videos',
      question: 'Does it work with music videos too?',
      answer:
        'Yes — if the video publishes a media session with title and artist, the overlay can find and sync lyrics for it.',
    },
    {
      id: 'ytm-account',
      question: 'Does it need my Google account?',
      answer:
        'No. It reads the media session only and never connects to your Google account.',
    },
  ],
  crossLinkSlugs: [
    'spotify-lyrics-overlay',
    'apple-music-lyrics-overlay',
    'lyrics-while-gaming',
  ],
}
