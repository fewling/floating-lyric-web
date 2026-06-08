import type { IconName } from "@/components/ui/icons";

export interface NavLink {
  label: string;
  href: string;
}

export interface Pillar {
  icon: IconName;
  title: string;
  body: string;
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

export interface PricingTier {
  name: string;
  price: string;
  tagline: string;
  features: string[];
  highlight?: boolean;
}

export interface FaqItem {
  q: string;
  a: string;
}
