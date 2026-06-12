import type { IconName } from "@/components/ui/icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface Step {
  n: number;
  title: string;
  body: string;
}

export interface Feature {
  icon: IconName;
  title: string;
  body: string;
}

export interface FaqItem {
  q: string;
  a: string;
}

export type DemoLang = "EN" | "ES" | "JA" | "ZH";

export interface DemoLine {
  /** Original (Korean) lyric line — INVENTED text, never from a real song. */
  source: string;
  /** Pre-baked translations per target language. */
  translations: Record<DemoLang, string>;
  /** How long this line stays active, in ms. */
  durationMs: number;
}

export interface ProseLink {
  label: string;
  href: string; // internal ("/..."), mailto:, or https:
}

export interface ProseSection {
  heading: string;
  paragraphs: string[];
  /** Optional action links rendered as a list after the paragraphs. */
  links?: ProseLink[];
}

export interface ProsePage {
  title: string;
  updated?: string;
  sections: ProseSection[];
}
