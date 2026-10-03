import { ArrowRight } from 'lucide-react'
import { MagneticButton } from '@/components/cosmos/magnetic-button'
import { GalaxyOrb } from './galaxy-orb'

export function HeroSection() {
  return (
    <section
      id="top"
      className="relative flex min-h-svh flex-col items-center justify-center overflow-hidden px-6 pb-20 pt-32 text-center"
    >
      <div className="pointer-events-none relative z-10 flex flex-col items-center [&_a]:pointer-events-auto">
        <p className="glass mb-8 rounded-full px-4 py-1.5 text-[11px] uppercase tracking-[0.35em] text-cyan">
          College Fest · 2026 Edition
        </p>

        <h1 className="text-glow font-display text-6xl tracking-[0.12em] text-white sm:text-8xl md:text-9xl lg:text-[10rem] lg:leading-none">
          ASTITVA
        </h1>

        <p className="mt-6 text-balance font-display text-base tracking-[0.15em] text-cyan sm:text-xl">
          {'“Where Ideas Collide, Imagination Comes Alive.”'}
        </p>

        <p className="mt-6 max-w-xl text-pretty leading-relaxed text-white/85 [text-shadow:0_1px_12px_rgb(2_3_10/0.95),0_0_2px_rgb(2_3_10)]">
          A convergence of creativity, technology, culture, competition and innovation — where every student finds a
          universe of their own.
        </p>

        <div className="mt-[min(26vh,14rem)] flex flex-col items-center gap-6">
          <MagneticButton href="#events">
            <span className="flex items-center gap-3">
              EXPLORE ASTITVA
              <ArrowRight aria-hidden="true" className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </MagneticButton>
          <dl className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs uppercase tracking-[0.25em] text-muted-foreground">
            <div className="flex gap-2">
              <dt className="sr-only">Dates</dt>
              <dd>Mar 20 — 22</dd>
            </div>
            <div className="flex gap-2">
              <dt className="sr-only">Events</dt>
              <dd>20 Events</dd>
            </div>
            <div className="flex gap-2">
              <dt className="sr-only">Venue</dt>
              <dd>Main Campus</dd>
            </div>
          </dl>
        </div>
      </div>

      <GalaxyOrb />
    </section>
  )
}
