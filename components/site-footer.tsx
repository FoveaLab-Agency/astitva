import { ArrowRight, Mail, MapPin, Phone } from 'lucide-react'
import { MagneticButton } from '@/components/cosmos/magnetic-button'
import { Reveal } from '@/components/cosmos/reveal'

const contacts = [
  { icon: Mail, label: 'Email', value: 'astitva@kleslingarajcollege.edu.in', href: 'mailto:astitva@kleslingarajcollege.edu.in' },
  { icon: Phone, label: 'Phone', value: '+91 00000 00000', href: 'tel:+910000000000' },
  { icon: MapPin, label: 'Venue', value: 'Lingaraj College, Belagavi', href: '#contact' },
]

export function SiteFooter() {
  return (
    <footer id="contact" className="relative scroll-mt-20 px-6 pb-10 pt-24">
      <Reveal className="glass relative mx-auto max-w-5xl overflow-hidden rounded-3xl px-6 py-14 text-center md:px-12">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute -top-32 left-1/2 h-64 w-[80%] -translate-x-1/2 rounded-full bg-violet/25 blur-3xl"
        />
        <p className="relative font-display text-xs uppercase tracking-[0.35em] text-cyan">03 — Join the Orbit</p>
        <h2 className="relative mt-4 text-balance font-display text-3xl text-white md:text-5xl">
          Your Universe is waiting.
        </h2>
        <p className="relative mx-auto mt-4 max-w-md text-sm text-muted-foreground">
          Registrations are open. Gather your crew and prepare for launch.
        </p>
        <div className="relative mt-8 flex justify-center">
          <MagneticButton href="https://astitva-emrgencebeyondexistence-portal.bolt.host/">
            <span className="flex items-center gap-3">
              REGISTER NOW <ArrowRight aria-hidden="true" className="h-4 w-4" />
            </span>
          </MagneticButton>
        </div>

        <ul className="relative mt-12 grid gap-4 text-left sm:grid-cols-3">
          {contacts.map((contact) => (
            <li key={contact.label}>
              <a
                href={contact.href}
                className="flex items-center gap-3 rounded-xl border border-border bg-abyss/40 p-4 transition-colors hover:border-cyan/40"
              >
                <contact.icon aria-hidden="true" className="h-4 w-4 shrink-0 text-cyan" />
                <span>
                  <span className="block text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
                    {contact.label}
                  </span>
                  <span className="block text-sm text-white">{contact.value}</span>
                </span>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <div className="mx-auto mt-10 flex max-w-5xl flex-col items-center justify-between gap-3 text-xs text-muted-foreground sm:flex-row">
        <p className="font-display tracking-[0.3em] text-white/80">ASTITVA</p>
        <p>© 2026 Astitva. Crafted among the stars.</p>
      </div>
    </footer>
  )
}
