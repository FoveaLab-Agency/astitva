import { Reveal } from '@/components/cosmos/reveal'
import { SectionEyebrow } from '@/components/section-eyebrow'
import { EventOrbit } from './event-orbit'

export function EventsSection() {
  return (
    <section id="events" className="relative scroll-mt-20 overflow-hidden px-4 py-28 md:py-36">
      <Reveal className="mx-auto max-w-3xl text-center">
        <div className="flex justify-center">
          <SectionEyebrow index="02">The Multiverse</SectionEyebrow>
        </div>
        <h2 className="text-glow mt-5 font-display text-4xl tracking-[0.08em] text-white md:text-6xl">
          EXPLORE THE EVENTS
        </h2>
        <p className="mt-4 text-pretty font-display text-sm tracking-[0.2em] text-cyan md:text-base">
          {'“Choose your universe. Enter the challenge.”'}
        </p>
        <p className="mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Twenty plus worlds orbit the Astitva core. Hover or tap a planet to pause its orbit and reveal its mission.
        </p>
      </Reveal>

      <Reveal delay={200} className="mt-12 md:mt-16">
        <EventOrbit />
      </Reveal>
    </section>
  )
}
