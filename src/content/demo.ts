import cues from "./demo-cues.json";

// Reversible editorial defaults. No preferences are persisted between visits.
export const demo = {
  title: "Small Hours",
  artist: "Floating Lyrics prototype",
  audio: "/demo/small-hours.mp3",
  duration: 68,
  theme: "dark",
  opacity: 96,
  fontSize: 22,
  invitation: "Try with music",
  cues,
};

export function cueAt(seconds: number) {
  return demo.cues.findLastIndex((cue) => cue.time <= seconds);
}
export function clock(seconds: number) {
  const value = Math.max(0, Math.floor(seconds));
  return `${Math.floor(value / 60)}:${String(value % 60).padStart(2, "0")}`;
}
