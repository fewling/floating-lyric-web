import type { IntentPageContent } from '../../types'

export const gaming: IntentPageContent = {
  slug: 'lyrics-while-gaming',
  metaTitle: 'See Lyrics While Gaming on Android — Floating Lyrics Overlay',
  metaDescription:
    'Keep synced song lyrics floating over your games on Android. Lock the overlay so it never steals a tap, tune its transparency, and sing along mid-match.',
  h1: 'Lyrics on top of your game — without stealing a single tap',
  intro: [
    'Music on, game open — and the lyrics are two app-switches away. Floating Lyrics keeps them in a compact overlay above your game, synced to whatever player is running in the background.',
    'Built for gaming: lock the overlay so touches pass straight through to the game, drop the transparency so it sits quietly over your HUD, and position it wherever it never blocks the action.',
  ],
  contextLabel: 'a game HUD',
  steps: [
    { title: 'Install Floating Lyrics', detail: 'From Google Play.' },
    { title: 'Allow the overlay', detail: 'One permission tap.' },
    {
      title: 'Start your music, open your game',
      detail:
        'The overlay floats above the game and stays in sync. Lock it to make it tap-proof.',
    },
  ],
  faqs: [
    {
      id: 'game-touch',
      question: "Won't it get in the way of my game?",
      answer:
        'Lock the overlay and every touch passes through it to the game. Combine that with transparency and it reads like a subtitle, not a window.',
    },
    {
      id: 'game-fullscreen',
      question: 'Does it show over fullscreen games?',
      answer:
        'Yes — the overlay permission lets it draw above fullscreen apps, games included.',
    },
    {
      id: 'game-performance',
      question: 'Will it cost me frames?',
      answer:
        'The overlay is a tiny window that repaints only when a lyric line changes — designed to be invisible to your frame rate.',
    },
  ],
  crossLinkSlugs: [
    'spotify-lyrics-overlay',
    'youtube-music-lyrics-overlay',
    'apple-music-lyrics-overlay',
  ],
}
