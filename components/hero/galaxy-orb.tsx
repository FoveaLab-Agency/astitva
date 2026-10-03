'use client'

import dynamic from 'next/dynamic'

const GalaxyScene = dynamic(() => import('./galaxy-scene'), { ssr: false })

export function GalaxyOrb() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(150vw,1100px)] -translate-x-1/2 -translate-y-[52%]"
    >
      <div
        className="animate-pulse-core absolute inset-[22%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, oklch(0.62 0.22 290 / 0.35), oklch(0.84 0.14 205 / 0.12) 45%, transparent 70%)' }}
      />
      <div className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_45%,transparent_72%)]">
        <GalaxyScene />
      </div>
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, oklch(0.02 0.01 270 / 0.35) 0%, transparent 22%)' }}
      />
    </div>
  )
}
