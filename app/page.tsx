import { AboutSection } from '@/components/about-section'
import { CursorGlow } from '@/components/cosmos/cursor-glow'
import { NebulaBackdrop } from '@/components/cosmos/nebula-backdrop'
import { Starfield } from '@/components/cosmos/starfield'
import { EventsSection } from '@/components/events/events-section'
import { HeroSection } from '@/components/hero/hero-section'
import { SiteFooter } from '@/components/site-footer'
import { SiteHeader } from '@/components/site-header'

export default function Page() {
  return (
    <>
      <NebulaBackdrop />
      <Starfield />
      <CursorGlow />
      <SiteHeader />
      <main className="relative overflow-x-clip">
        <HeroSection />
        <AboutSection />
        <EventsSection />
      </main>
      <SiteFooter />
    </>
  )
}
