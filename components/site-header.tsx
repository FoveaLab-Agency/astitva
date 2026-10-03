const links = [
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#contact', label: 'Contact' },
]

export function SiteHeader() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-4 pt-4">
      <nav
        aria-label="Primary"
        className="glass mx-auto flex max-w-6xl items-center justify-between rounded-full px-5 py-3"
      >
        <a href="#top" className="flex items-center gap-2 font-display text-sm tracking-[0.35em] text-white">
          <span aria-hidden="true" className="h-2 w-2 rounded-full bg-cyan shadow-[0_0_12px_2px_oklch(0.84_0.14_205/0.8)]" />
          ASTITVA
        </a>
        <ul className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="text-xs uppercase tracking-[0.25em] text-muted-foreground transition-colors hover:text-cyan"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#contact"
          className="rounded-full border border-cyan/40 bg-cyan/10 px-4 py-2 text-xs font-medium uppercase tracking-[0.2em] text-cyan transition-colors hover:bg-cyan/20"
        >
          Register
        </a>
      </nav>
    </header>
  )
}
