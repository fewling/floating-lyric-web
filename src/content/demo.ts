import type { DemoLang, DemoLine } from "@/types/content";

export const demoLangs: readonly DemoLang[] = ["EN", "ES", "JA", "ZH"];

/** Invented lyric — written in-house for this demo. Do NOT replace with real song lines. */
export const demoLines: readonly DemoLine[] = [
  {
    source: "별빛처럼 내려와 줘",
    translations: {
      EN: "Come down to me like starlight",
      ES: "Baja hacia mí como la luz de las estrellas",
      JA: "星明かりのように降りてきて",
      ZH: "像星光一样降临到我身边",
    },
    durationMs: 4000,
  },
  {
    source: "네 목소리가 내 하루를 채워",
    translations: {
      EN: "Your voice fills up my day",
      ES: "Tu voz llena todo mi día",
      JA: "君の声が僕の一日を満たす",
      ZH: "你的声音填满我的一天",
    },
    durationMs: 4000,
  },
  {
    source: "이 노래만은 잊지 말아 줘",
    translations: {
      EN: "Just don't forget this song",
      ES: "Al menos, no olvides esta canción",
      JA: "この歌だけは忘れないで",
      ZH: "唯独别忘了这首歌",
    },
    durationMs: 4000,
  },
];

export const demoTrack = {
  appName: "Now playing",
  title: "Starlight (별빛)",
  artist: "Mirae",
  caption: "Synced via media session",
} as const;
