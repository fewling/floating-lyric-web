import type { Metadata } from 'next'
import { CtaBand } from '@/components/sections/cta-band'
import { FaqTeaser } from '@/components/sections/faq-teaser'
import { FeatureGrid } from '@/components/sections/feature-grid'
import { Footer } from '@/components/sections/footer'
import { Hero } from '@/components/sections/hero'
import { HowItWorks } from '@/components/sections/how-it-works'
import { Nav } from '@/components/sections/nav'
import { Pillars } from '@/components/sections/pillars'
import { ProofStrip } from '@/components/sections/proof-strip'
import { canonical } from '@/lib/site'

export const metadata: Metadata = {
  alternates: {
    canonical: canonical('/'),
    languages: { en: canonical('/'), 'x-default': canonical('/') },
  },
}

const CAMPAIGN = 'home'

export default function HomePage() {
  return (
    <>
      <Nav campaign={CAMPAIGN} />
      <main id="main">
        <Hero campaign={CAMPAIGN} />
        <ProofStrip />
        <Pillars />
        <HowItWorks />
        <FeatureGrid />
        <FaqTeaser />
        <CtaBand campaign={CAMPAIGN} />
      </main>
      <Footer />
    </>
  )
}
