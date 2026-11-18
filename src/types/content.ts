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

/** Verified local Android capture, never synthetic footage. */
export interface DemoMedia {
  video: string;
  poster: string;
  width: number;
  height: number;
}
