export interface FaqEntry {
  id: string // stable anchor, e.g. 'overlay-permission'
  question: string
  answer: string
}

export interface Step {
  title: string
  detail: string
}

export interface Feature {
  title: string
  detail: string
}

export interface IntentPageContent {
  slug: string // route segment, also the utm_campaign
  metaTitle: string
  metaDescription: string
  h1: string
  intro: string[] // paragraphs
  contextLabel: string // backdrop label in the static demo snapshot, e.g. 'game HUD'
  steps: Step[]
  faqs: FaqEntry[] // page-specific; rendered on the page, NOT in FAQPage JSON-LD
  crossLinkSlugs: string[] // sibling intent pages
}
