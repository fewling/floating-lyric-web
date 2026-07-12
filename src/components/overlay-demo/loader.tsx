'use client'

import dynamic from 'next/dynamic'
import { DemoSnapshot } from './snapshot'
import type { DemoLabels } from './island'

// ssr: false gives the island its own lazy chunk; the server (and the client,
// until that chunk arrives) renders the pure-vector snapshot in its place.
const OverlayDemoIsland = dynamic(() => import('./island'), {
  ssr: false,
  loading: () => <DemoSnapshot />,
})

export function OverlayDemoLoader({ labels }: { labels: DemoLabels }) {
  return <OverlayDemoIsland labels={labels} />
}
