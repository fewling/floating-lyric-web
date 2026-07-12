import type { Feature, Step } from '../types'

export const home = {
  h1: 'Floating lyrics over any app — synced, translated, in your words.',
  // Rendered with 'synced, translated' highlighted per the visual system.
  sub: 'Lyrics follow whatever you play — Spotify, YouTube Music, even games — floating on top and translating as you listen. Free, no account needed.',
  proofChips: [
    { label: 'over Spotify', slug: 'spotify-lyrics-overlay' },
    { label: 'over YouTube Music', slug: 'youtube-music-lyrics-overlay' },
    { label: 'over Apple Music', slug: 'apple-music-lyrics-overlay' },
    { label: 'while gaming', slug: 'lyrics-while-gaming' },
    { label: 'any player, really', slug: 'faq' },
  ],
  pillars: [
    {
      title: 'Works with any player',
      detail:
        "Reads Android's media session, so it follows whatever's playing. No login, no account linking.",
    },
    {
      title: 'Understand every song',
      detail:
        'AI translation while you listen. K-pop, J-pop, anime, Latin — read along and actually get it.',
    },
    {
      title: 'Yours & private',
      detail: 'No account required. Your own .LRC files stay on your device.',
    },
  ] satisfies Feature[],
  howItWorks: {
    heading: 'Floating in under a minute',
    steps: [
      { title: 'Install', detail: 'Grab Floating Lyrics from Google Play.' },
      {
        title: 'Allow the overlay',
        detail: 'One tap grants "display over other apps".',
      },
      { title: 'Play music', detail: 'Lyrics appear on top and stay in sync.' },
    ] satisfies Step[],
  },
  features: [
    {
      title: 'Auto-sync',
      detail: "Follows whatever's playing, second by second.",
    },
    {
      title: 'Online lyric search',
      detail: 'Find synced lyrics for the current track.',
    },
    {
      title: 'Your own .LRC files',
      detail:
        'Import single files or whole folders. Back up and restore your library.',
    },
    {
      title: 'AI translation',
      detail: 'Turn any line into your language while the song plays.',
    },
    {
      title: 'Make it yours',
      detail: 'Fonts, colors, transparency, position — and lock it in place.',
    },
    {
      title: 'Light on battery',
      detail: 'A small overlay that only works while music plays.',
    },
  ] satisfies Feature[],
  faqTeaserIds: ['overlay-permission', 'spotify-free', 'really-free'],
  ctaBand: { heading: 'Your music, finally in your words.' },
} as const
