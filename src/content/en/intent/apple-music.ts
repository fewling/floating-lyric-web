import type { IntentPageContent } from '../../types'

export const appleMusic: IntentPageContent = {
  slug: 'apple-music-lyrics-overlay',
  metaTitle: 'Apple Music Lyrics Overlay for Android — Floating & Translated',
  metaDescription:
    'Float synced lyrics over Apple Music on Android and translate them as you listen. Keep the words visible in any app, free and without an account.',
  h1: 'Lyrics over Apple Music on Android — floating and translated',
  intro: [
    "Apple Music's in-app lyrics are beautiful — and trapped in the app. On Android, Floating Lyrics lifts the words into an overlay that stays on top while you text, browse, or play, synced to every line.",
    "And when the song is in a language you don't speak yet, one tap adds an AI translation beneath the original — so you understand it, not just hear it.",
  ],
  contextLabel: 'Apple Music in the background',
  steps: [
    { title: 'Install Floating Lyrics', detail: 'From Google Play.' },
    {
      title: 'Allow the overlay',
      detail: 'Grant "display over other apps" once.',
    },
    {
      title: 'Play in Apple Music',
      detail: 'The overlay tracks the media session and stays in sync.',
    },
  ],
  faqs: [
    {
      id: 'am-android',
      question: 'Does this need an Apple device?',
      answer:
        'No — this is for the Apple Music app on Android. Floating Lyrics is an Android app and reads the media session Apple Music publishes there.',
    },
    {
      id: 'am-lossless',
      question: 'Does it interfere with playback quality?',
      answer:
        'Not at all. It never touches the audio stream — it only reads track metadata and position to stay in sync.',
    },
    {
      id: 'am-login',
      question: 'Does it need my Apple ID?',
      answer: 'No. It never connects to your Apple account.',
    },
  ],
  crossLinkSlugs: [
    'spotify-lyrics-overlay',
    'youtube-music-lyrics-overlay',
    'lyrics-while-gaming',
  ],
}
