'use client'

import Image from 'next/image'
import { useEffect, useRef } from 'react'

const orbitParticles = [
  { size: '62%', duration: '38s', direction: 'normal', dots: 3 },
  { size: '82%', duration: '58s', direction: 'reverse', dots: 4 },
  { size: '100%', duration: '80s', direction: 'normal', dots: 5 },
]

export function GalaxyOrb() {
  const tiltRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = tiltRef.current
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    let frame = 0
    let tx = 0
    let ty = 0
    let x = 0
    let y = 0
    const onMove = (event: PointerEvent) => {
      tx = (event.clientX / window.innerWidth - 0.5) * 2
      ty = (event.clientY / window.innerHeight - 0.5) * 2
    }
    const tick = () => {
      x += (tx - x) * 0.05
      y += (ty - y) * 0.05
      el.style.transform = `rotateX(${64 - y * 6}deg) rotateZ(${x * 6}deg) translate3d(${x * -14}px, ${y * -10}px, 0)`
      frame = requestAnimationFrame(tick)
    }
    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(140vw,1000px)] -translate-x-1/2 -translate-y-[52%] [perspective:1400px]"
    >
      <div
        className="animate-pulse-core absolute inset-[18%] rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle, oklch(0.62 0.22 290 / 0.45), oklch(0.84 0.14 205 / 0.15) 45%, transparent 70%)' }}
      />
      <div ref={tiltRef} className="absolute inset-0 [transform-style:preserve-3d] [transform:rotateX(64deg)]">
        <div className="animate-spin-orbit absolute inset-[6%] [--orbit-duration:160s]">
          <Image
            src="/images/galaxy.png"
            alt=""
            fill
            priority
            sizes="(max-width: 768px) 140vw, 1000px"
            className="rounded-full object-cover opacity-90 mix-blend-screen"
          />
        </div>
        {orbitParticles.map((ring) => (
          <div
            key={ring.size}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{ width: ring.size, height: ring.size }}
          >
            <div className="absolute inset-0 rounded-full border border-cyan/10" />
            <div
              className="animate-spin-orbit absolute inset-0"
              style={{ '--orbit-duration': ring.duration, '--orbit-direction': ring.direction } as React.CSSProperties}
            >
              {Array.from({ length: ring.dots }).map((_, index) => (
                <div key={index} className="absolute inset-0" style={{ rotate: `${(360 / ring.dots) * index}deg` }}>
                  <span className="absolute left-1/2 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white shadow-[0_0_10px_3px_oklch(0.84_0.14_205/0.8)]" />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(circle at center, oklch(0.02 0.01 270 / 0.55) 0%, transparent 28%)' }}
      />
    </div>
  )
}
