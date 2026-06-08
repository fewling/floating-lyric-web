import { renderOgImage, size, contentType } from "./og-image";

// Pre-render at build time for `output: export` (no server at runtime).
export const dynamic = "force-static";

export const alt = "Floating Lyrics — lyrics that float over any app, translated by AI.";
export { size, contentType };

export default function OpengraphImage() {
  return renderOgImage();
}
