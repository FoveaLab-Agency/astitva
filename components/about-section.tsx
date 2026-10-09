import Image from 'next/image'
import { GraduationCap, Users } from 'lucide-react'
import { Reveal } from '@/components/cosmos/reveal'
import { SectionEyebrow } from '@/components/section-eyebrow'

const stats = [
  { value: '20+', label: 'Events' },
  { value: '2', label: 'Days' },
  { value: '2K+', label: 'Explorers' },
  { value: '25+', label: 'Colleges' },
]

const panels = [
  {
    icon: GraduationCap,
    title: 'About the College',
    body: 'The Lingaraj College has a rich heritage and a glorious past. It has been rendering yeoman service in the field of education and has produced many great luminaries in various walks of life. The Lingaraj College - The majestic stone masonary structure designed in European style with landscape garden to its grace not only echoes the glorious history of the college but also provides an ideal setting of academic pursuits. Every brick and every room of Lingaraj College is an amalgamation of the values of Truth, Love, Service and Sacrifice' - ideology that the K. L. E. Society stands for. For those who have not heard of or seen Lingaraj College, an interesting experience awaits them when they come and see it. It is this experience that gives the learners in the college, a rare joy which they can hardly forget. Such a compulsion, perhaps, made the people unofficially crown Lingaraj College as the mother of colleges in North Karnataka.  ',
  },
  {
    icon: Users,
    title: 'Event Organizers',
    body: 'Astitva is crafted by a passionate team of student organizers, volunteers and faculty mentors who turn ambitious ideas into a seamless, unforgettable experience.',
  },
]

export function AboutSection() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-28 md:py-36">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
        <Image src="/images/nebula.png" alt="" fill sizes="100vw" className="object-cover opacity-20 mix-blend-screen" />
        <div className="absolute inset-0 bg-gradient-to-b from-void via-transparent to-void" />
      </div>

      <div className="mx-auto grid max-w-6xl gap-16 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <Reveal>
          <SectionEyebrow index="01">About Astitva</SectionEyebrow>
          <h2 className="mt-5 text-balance font-display text-3xl leading-tight text-white md:text-5xl">
            A festival discovered inside a <span className="text-cyan text-glow">living galaxy</span>.
          </h2>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-muted-foreground">
            Astitva — meaning existence — is where thousands of minds converge to compete, create and collaborate. Across
            two days, twenty plus events pull talent into orbit: from imagination & creativity to stage.
          </p>

          <dl className="mt-10 grid max-w-lg grid-cols-4 gap-4">
            {stats.map((stat) => (
              <div key={stat.label} className="flex flex-col-reverse border-l border-cyan/30 pl-3">
                <dt className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">{stat.label}</dt>
                <dd className="font-display text-2xl text-white md:text-3xl">{stat.value}</dd>
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
                    <h3 className="font-display text-sm uppercase tracking-[0.2em] text-white">
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
