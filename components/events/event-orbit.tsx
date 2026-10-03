'use client'

import { useEffect, useState } from 'react'
import { ArrowUpRight, X } from 'lucide-react'
import { events, type AstitvaEvent } from '@/lib/events'
import { cn } from '@/lib/utils'

type Ring = { radius: number; duration: number; direction: 'normal' | 'reverse'; items: AstitvaEvent[] }

const rings: Ring[] = [
  { radius: 21, duration: 90, direction: 'normal', items: events.slice(0, 5) },
  { radius: 33, duration: 140, direction: 'reverse', items: events.slice(5, 12) },
  { radius: 46, duration: 200, direction: 'normal', items: events.slice(12, 20) },
]

const ringHues = ['oklch(0.84 0.14 205)', 'oklch(0.62 0.22 290)', 'oklch(0.68 0.26 330)']

export function EventOrbit() {
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const activeId = hoveredId ?? selectedId
  const active = events.find((event) => event.id === activeId) ?? null
  const selected = events.find((event) => event.id === selectedId) ?? null

  useEffect(() => {
    const onKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedId(null)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="flex flex-col items-center">
      <div className="@container relative mx-auto aspect-square w-full max-w-[min(920px,94svh)]">
        <div
          aria-hidden="true"
          className="absolute inset-[8%] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, oklch(0.45 0.2 285 / 0.35), transparent 70%)' }}
        />

        {rings.map((ring, ringIndex) => (
          <OrbitPath key={ring.radius} radius={ring.radius} hue={ringHues[ringIndex]} index={ringIndex} />
        ))}

        <OrbitCore active={active} />

        {rings.map((ring, ringIndex) => (
          <div
            key={ring.radius}
            className="orbit-ring animate-spin-orbit pointer-events-none absolute inset-0"
            style={
              {
                '--orbit-duration': `${ring.duration}s`,
                '--orbit-direction': ring.direction,
                '--counter-direction': ring.direction === 'normal' ? 'reverse' : 'normal',
              } as React.CSSProperties
            }
          >
            {ring.items.map((event, index) => {
              const angle = (360 / ring.items.length) * index + ringIndex * 22
              return (
                <div
                  key={event.id}
                  className="absolute left-1/2 top-1/2"
                  style={{ transform: `rotate(${angle}deg) translateX(${ring.radius}cqw) rotate(${-angle}deg)` }}
                >
                  <div className="animate-counter-orbit">
                    <OrbitNode
                      event={event}
                      hue={ringHues[ringIndex]}
                      bobDelay={-(index * 1.3 + ringIndex)}
                      isActive={activeId === event.id}
                      isSelected={selectedId === event.id}
                      onHover={setHoveredId}
                      onSelect={(id) => setSelectedId((current) => (current === id ? null : id))}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        ))}
      </div>

      <div aria-live="polite" className="mt-8 w-full max-w-xl md:hidden">
        {selected ? (
          <EventDetailCard event={selected} onClose={() => setSelectedId(null)} />
        ) : (
          <p className="text-center text-xs uppercase tracking-[0.25em] text-muted-foreground">
            Tap a planet to reveal its event
          </p>
        )}
      </div>
    </div>
  )
}

function OrbitPath({ radius, hue, index }: { radius: number; hue: string; index: number }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{ width: `${radius * 2}cqw`, height: `${radius * 2}cqw` }}
    >
      <div
        className="absolute inset-0 rounded-full border border-dashed opacity-25"
        style={{ borderColor: hue }}
      />
      <div
        className="animate-spin-orbit absolute inset-0"
        style={
          {
            '--orbit-duration': `${24 + index * 10}s`,
            '--orbit-direction': index % 2 ? 'reverse' : 'normal',
          } as React.CSSProperties
        }
      >
        {[0, 120, 240].map((rotation) => (
          <div key={rotation} className="absolute inset-0" style={{ rotate: `${rotation}deg` }}>
            <span
              className="absolute left-1/2 top-0 h-1 w-1 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
              style={{ boxShadow: `0 0 8px 2px ${hue}` }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}

function OrbitCore({ active }: { active: AstitvaEvent | null }) {
  return (
    <div className="pointer-events-none absolute left-1/2 top-1/2 flex aspect-square w-[24cqw] -translate-x-1/2 -translate-y-1/2 items-center justify-center">
      <span aria-hidden="true" className="animate-ripple absolute inset-0 rounded-full border border-cyan/40" />
      <span
        aria-hidden="true"
        className="animate-ripple absolute inset-0 rounded-full border border-violet/40 [animation-delay:-2s]"
      />
      <div
        aria-hidden="true"
        className="animate-pulse-core absolute inset-[8%] rounded-full"
        style={{
          background:
            'radial-gradient(circle at 40% 35%, oklch(0.95 0.05 210 / 0.9), oklch(0.7 0.18 260 / 0.55) 25%, oklch(0.35 0.2 290 / 0.6) 55%, oklch(0.1 0.05 280 / 0.9) 80%)',
          boxShadow: '0 0 80px 10px oklch(0.62 0.22 290 / 0.45), 0 0 140px 30px oklch(0.84 0.14 205 / 0.15)',
        }}
      />
      <div className="relative flex max-w-[19cqw] flex-col items-center text-center">
        {active ? (
          <div key={active.id} className="animate-in fade-in zoom-in-95 duration-300">
            <p className="font-display text-[1.3cqw] tracking-[0.2em] text-cyan">
              {active.number} · {active.category}
            </p>
            <p className="mt-[0.6cqw] font-display text-[2.4cqw] font-bold leading-tight text-white">{active.name}</p>
            <p className="mt-[0.6cqw] hidden text-[1.25cqw] leading-snug text-white/80 @min-[560px]:block">
              {active.description}
            </p>
          </div>
        ) : (
          <p className="text-glow font-display text-[3.2cqw] font-black tracking-[0.2em] text-white">ASTITVA</p>
        )}
      </div>
    </div>
  )
}

type OrbitNodeProps = {
  event: AstitvaEvent
  hue: string
  bobDelay: number
  isActive: boolean
  isSelected: boolean
  onHover: (id: string | null) => void
  onSelect: (id: string) => void
}

function OrbitNode({ event, hue, bobDelay, isActive, isSelected, onHover, onSelect }: OrbitNodeProps) {
  const Icon = event.icon
  return (
    <div className="animate-bob" style={{ animationDelay: `${bobDelay}s` }}>
      <button
        type="button"
        data-selected={isSelected}
        aria-pressed={isSelected}
        aria-label={`${event.number}: ${event.name} — ${event.category}. ${event.description}`}
        onPointerEnter={(e) => e.pointerType === 'mouse' && onHover(event.id)}
        onPointerLeave={() => onHover(null)}
        onFocus={() => onHover(event.id)}
        onBlur={() => onHover(null)}
        onClick={() => onSelect(event.id)}
        className={cn(
          'orbit-node pointer-events-auto relative flex aspect-square w-[10.5cqw] min-w-10 max-w-28 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full text-white transition-all duration-500 ease-out',
          'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-cyan',
          isActive ? 'scale-125' : 'scale-100',
        )}
        style={{
          background: 'radial-gradient(circle at 35% 30%, oklch(0.3 0.06 270 / 0.85), oklch(0.1 0.04 270 / 0.9) 70%)',
          border: `1px solid color-mix(in oklch, ${hue} ${isActive ? 90 : 45}%, transparent)`,
          boxShadow: isActive
            ? `0 0 0 6px color-mix(in oklch, ${hue} 12%, transparent), 0 0 40px 6px color-mix(in oklch, ${hue} 55%, transparent), inset 0 0 24px color-mix(in oklch, ${hue} 35%, transparent)`
            : `0 0 18px -2px color-mix(in oklch, ${hue} 40%, transparent), inset 0 0 14px color-mix(in oklch, ${hue} 18%, transparent)`,
        }}
      >
        <span className="font-display text-[9px] tracking-[0.2em] text-white/60 @min-[560px]:text-[1.05cqw]">
          {event.number}
        </span>
        <Icon
          aria-hidden="true"
          className="my-[0.4cqw] hidden h-[2.6cqw] w-[2.6cqw] @min-[480px]:block"
          style={{ color: hue }}
        />
        <span className="hidden font-display text-[1.15cqw] font-semibold tracking-wider @min-[640px]:block">
          {event.name}
        </span>
      </button>
    </div>
  )
}

function EventDetailCard({ event, onClose }: { event: AstitvaEvent; onClose: () => void }) {
  const Icon = event.icon
  return (
    <article className="glass animate-in fade-in slide-in-from-bottom-2 relative rounded-2xl p-5 duration-300">
      <button
        type="button"
        onClick={onClose}
        aria-label="Close event details"
        className="absolute right-3 top-3 rounded-full p-1.5 text-muted-foreground transition-colors hover:text-white"
      >
        <X className="h-4 w-4" />
      </button>
      <div className="flex items-center gap-4">
        <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border border-cyan/40 bg-cyan/10 text-cyan">
          <Icon aria-hidden="true" className="h-5 w-5" />
        </span>
        <div>
          <p className="font-display text-[10px] uppercase tracking-[0.3em] text-cyan">
            {event.number} · {event.category}
          </p>
          <h3 className="font-display text-lg font-bold text-white">{event.name}</h3>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{event.description}</p>
      <a
        href="#contact"
        className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-[0.2em] text-cyan"
      >
        Register <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
      </a>
    </article>
  )
}
