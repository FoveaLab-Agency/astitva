import type { ReactNode } from 'react'

export function SectionEyebrow({ index, children }: { index: string; children: ReactNode }) {
  return (
    <p className="flex items-center gap-3 font-display text-xs font-medium uppercase tracking-[0.35em] text-cyan">
      <span className="text-muted-foreground">{index}</span>
      <span aria-hidden="true" className="h-px w-10 bg-gradient-to-r from-cyan to-violet" />
      {children}
    </p>
  )
}
