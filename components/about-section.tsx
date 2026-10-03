import Image from 'next/image'
import { GraduationCap, Users } from 'lucide-react'
import { Reveal } from '@/components/cosmos/reveal'
import { SectionEyebrow } from '@/components/section-eyebrow'

const stats = [
  { value: '20', label: 'Events' },
  { value: '3', label: 'Days' },
  { value: '5K+', label: 'Explorers' },
  { value: '50+', label: 'Colleges' },
]

const panels = [
  {
    icon: GraduationCap,
    title: 'About the College',
    body: 'Our college is a hub of academic rigour and creative freedom — home to a vibrant student community, award-winning faculty and a culture that celebrates curiosity. Replace this with your institution’s story and achievements.',
  },
  {
    icon: Users,
    title: 'Event Organizers',
    body: 'Astitva is crafted by a passionate team of student organizers, volunteers and faculty mentors who turn ambitious ideas into a seamless, unforgettable experience. Introduce your core team here.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image src="/images/nebula.png" alt="" fill sizes="100vw" className="object-cover opacity-35 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <SectionEyebrow index="01">About Astitva</SectionEyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl font-bold leading-tight text-white md:text-5xl">
            A festival discovered inside a <span className="text-cyan text-glow">living galaxy</span>.
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Astitva — meaning existence — is where thousands of minds converge to compete, create and collaborate. Across
            three days, twenty events pull talent into orbit: from code and circuits to stage, sound and story.
          </p>

          <dl className="mt-10 grid max-w-lg grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-l border-cyan/30 pl-3">
                <dt className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</dt>
                <dd className="font-display text-2xl font-bold text-white md:text-3xl">{stat.value}</dd>
              </div>
            ))}
          </dl>
        </Reveal>

        <div className="flex flex-col gap-5">
          {panels.map((panel, index) => (
            <Reveal key={panel.title} delay={150 * (index + 1)}>
              <article className="glass group relative overflow-hidden rounded-2xl p-6 transition-colors hover:border-cyan/30">
                <div
                  aria-hidden="true"
                  className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-violet/20 blur-3xl transition-opacity group-hover:opacity-100"
                />
                <div className="relative flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-cyan/30 bg-cyan/10 text-cyan">
                    <panel.icon aria-hidden="true" className="h-5 w-5" />
                  </span>
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-[0.2em] text-white">
                      {panel.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{panel.body}</p>
                  </div>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
