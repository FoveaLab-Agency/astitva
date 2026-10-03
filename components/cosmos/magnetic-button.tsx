'use client'

import { useRef, type ReactNode } from 'react'
import { cn } from '@/lib/utils'

type MagneticButtonProps = {
  href: string
  children: ReactNode
  className?: string
}

export function MagneticButton({ href, children, className }: MagneticButtonProps) {
  const ref = useRef<HTMLAnchorElement>(null)

  const onPointerMove = (event: React.PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current
    if (!el || event.pointerType !== 'mouse') return
    const rect = el.getBoundingClientRect()
    const dx = event.clientX - (rect.left + rect.width / 2)
    const dy = event.clientY - (rect.top + rect.height / 2)
    el.style.transform = `translate(${dx * 0.25}px, ${dy * 0.35}px) scale(1.04)`
    el.style.setProperty('--glow-x', `${event.clientX - rect.left}px`)
    el.style.setProperty('--glow-y', `${event.clientY - rect.top}px`)
  }

  const reset = () => {
    if (ref.current) ref.current.style.transform = ''
  }

  return (
    <a
      ref={ref}
      href={href}
      onPointerMove={onPointerMove}
      onPointerLeave={reset}
      className={cn(
        'group relative inline-flex items-center gap-3 overflow-hidden rounded-full px-8 py-4 font-display text-sm font-semibold tracking-[0.3em] text-white transition-[transform,box-shadow] duration-300 ease-out',
        'glass border-cyan/40 shadow-[0_0_30px_-6px_oklch(0.84_0.14_205/0.6),0_0_60px_-20px_oklch(0.62_0.22_290/0.8)]',
        'hover:shadow-[0_0_45px_-4px_oklch(0.84_0.14_205/0.9),0_0_90px_-10px_oklch(0.62_0.22_290/0.9)] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan',
        className,
      )}
    >
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background:
            'radial-gradient(160px circle at var(--glow-x, 50%) var(--glow-y, 50%), oklch(0.84 0.14 205 / 0.35), transparent 70%)',
        }}
      />
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-cyan/15 via-violet/20 to-magenta/15"
      />
      <span className="relative">{children}</span>
    </a>
  )
}
