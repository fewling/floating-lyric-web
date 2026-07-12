import type { FaqEntry } from '../types'

export const faq: readonly FaqEntry[] = [
  {
    id: 'really-free',
    question: 'Is Floating Lyrics free?',
    answer:
      'Yes. The overlay, auto-sync, online lyric search, .LRC import, and full customization are free. AI translation has a free daily allowance; a one-time Pro unlock removes the cap. No subscription, ever.',
  },
  {
    id: 'overlay-permission',
    question: 'Why does it need the "display over other apps" permission?',
    answer:
      'Android only lets an app draw on top of other apps with this permission — it is the mechanism that makes a floating overlay possible. You grant it once, with one tap.',
  },
  {
    id: 'any-player',
    question: 'Which music apps does it work with?',
    answer:
      "Anything that publishes an Android media session: Spotify, YouTube Music, Apple Music, Poweramp, local file players, browsers, and more. If your phone shows it as 'now playing', Floating Lyrics can follow it.",
  },
  {
    id: 'account',
    question: 'Do I need an account?',
    answer:
      'Not for the overlay, sync, search, or .LRC import. Signing in is only needed for AI translation, which uses an account to manage the free daily allowance.',
  },
  {
    id: 'spotify-free',
    question: 'Does it work with Spotify Free?',
    answer:
      'Yes. It reads the media session your phone already exposes, so it works the same on Spotify Free and Premium — and it never asks for your Spotify login.',
  },
  {
    id: 'lyric-sources',
    question: 'Where do the lyrics come from?',
    answer:
      'Two places: an online search across public lyric databases, and your own .LRC files imported from your device. You choose per song.',
  },
  {
    id: 'own-lyrics',
    question: 'Can I use my own lyric files?',
    answer:
      'Yes — import individual .LRC files or a whole folder, manage them in the app, and export a backup whenever you like.',
  },
  {
    id: 'languages',
    question: 'Which languages can it translate?',
    answer:
      'A wide range, powered by AI — built for K-pop, J-pop, anime, C-pop, Latin, and more. Translations appear right under the original line.',
  },
  {
    id: 'battery',
    question: 'Does it drain my battery?',
    answer:
      'The overlay is a small window that only updates while music is playing. When nothing plays, it idles.',
  },
  {
    id: 'privacy',
    question: 'Is my data private?',
    answer:
      'Your .LRC files stay on your device. No account is needed for the core app, and translation requests are processed only to return your translation — see the Privacy page for the full picture.',
  },
]
