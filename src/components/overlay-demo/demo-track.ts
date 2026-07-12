export interface DemoLine {
  atMs: number
  kr: string
  en: string
}

export const DEMO_TRACK_TITLE = 'midnight bloom — demo track'

export const DEMO_DURATION_MS = 42_000

/** Original lines written for this demo. Not from any real song. */
export const DEMO_LINES: readonly DemoLine[] = [
  {
    atMs: 0,
    kr: '조용한 밤, 너의 목소리가 들려',
    en: 'in the quiet night, I hear your voice',
  },
  {
    atMs: 4_000,
    kr: '창밖의 불빛이 하나둘 꺼지고',
    en: 'the lights outside fade one by one',
  },
  { atMs: 8_000, kr: '우리만의 노래가 시작돼', en: 'our own song begins' },
  {
    atMs: 12_000,
    kr: '말하지 못한 마음을 멜로디에 실어',
    en: 'my unspoken heart rides this melody',
  },
  {
    atMs: 16_500,
    kr: '별빛 아래 다시 만나는 날까지',
    en: 'until we meet again under starlight',
  },
  {
    atMs: 21_000,
    kr: '이 노래가 너에게 닿기를',
    en: 'may this song reach you',
  },
  {
    atMs: 25_000,
    kr: '같은 하늘 아래 함께 불러',
    en: 'sing it with me under the same sky',
  },
  {
    atMs: 29_500,
    kr: '새벽이 와도 멈추지 않아',
    en: "even when dawn comes, we don't stop",
  },
  {
    atMs: 34_000,
    kr: '너의 언어로, 나의 언어로',
    en: 'in your words, in my words',
  },
  { atMs: 38_000, kr: '마침내 이해할 수 있어', en: 'at last, I understand' },
]

/** Every unique character across the Korean lines — drives the font subset. */
export const DEMO_KR_GLYPHS = Array.from(
  new Set(DEMO_LINES.flatMap((l) => [...l.kr])),
).join('')
