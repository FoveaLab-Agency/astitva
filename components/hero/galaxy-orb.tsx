'use client'

import dynamic from 'next/dynamic'
import { type KeyboardEvent, type PointerEvent, useId, useRef, useState, useSyncExternalStore } from 'react'
import { Pause, Play, RotateCcw, RotateCw, Undo2, ZoomIn, ZoomOut } from 'lucide-react'
import type { GalaxyView } from './galaxy-scene'

const GalaxyScene = dynamic(() => import('./galaxy-scene'), { ssr: false })

const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)'
const MIN_ZOOM = 0.7
const MAX_ZOOM = 1.8
const MAX_PITCH = 0.9

function subscribeReducedMotion(onChange: () => void) {
  const mq = window.matchMedia(REDUCED_MOTION_QUERY)
  mq.addEventListener('change', onChange)
  return () => mq.removeEventListener('change', onChange)
}

const clamp = (n: number, min: number, max: number) => Math.min(max, Math.max(min, n))

export function GalaxyOrb() {
  const instructionsId = useId()
  const reducedMotion = useSyncExternalStore(
    subscribeReducedMotion,
    () => window.matchMedia(REDUCED_MOTION_QUERY).matches,
    () => false,
  )
  const [userPlaying, setUserPlaying] = useState<boolean | null>(null)
  const playing = userPlaying ?? !reducedMotion
  const [announcement, setAnnouncement] = useState('')

  const view = useRef<GalaxyView>({ yaw: 0, pitch: 0, zoom: 1, dragging: false })
  const drag = useRef<{ id: number; x: number; y: number } | null>(null)

  const announce = (message: string) => setAnnouncement(message)

  const rotate = (dYaw: number, dPitch = 0) => {
    view.current.yaw += dYaw
    view.current.pitch = clamp(view.current.pitch + dPitch, -MAX_PITCH, MAX_PITCH)
  }

  const zoomBy = (factor: number) => {
    const next = clamp(view.current.zoom * factor, MIN_ZOOM, MAX_ZOOM)
    view.current.zoom = next
    announce(`Zoom ${Math.round(next * 100)} percent`)
  }

  const reset = () => {
    view.current.yaw = 0
    view.current.pitch = 0
    view.current.zoom = 1
    announce('View reset')
  }

  const togglePlaying = () => {
    const next = !playing
    setUserPlaying(next)
    announce(next ? 'Galaxy animation playing' : 'Galaxy animation paused')
  }

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 0.5 : 0.2
    const actions: Record<string, () => void> = {
      ArrowLeft: () => rotate(-step),
      ArrowRight: () => rotate(step),
      ArrowUp: () => rotate(0, -step),
      ArrowDown: () => rotate(0, step),
      '+': () => zoomBy(1.15),
      '=': () => zoomBy(1.15),
      '-': () => zoomBy(1 / 1.15),
      ' ': togglePlaying,
      k: togglePlaying,
      r: reset,
      Home: reset,
    }
    const action = actions[e.key]
    if (!action) return
    e.preventDefault()
    action()
  }

  const onPointerDown = (e: PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return
    e.currentTarget.setPointerCapture(e.pointerId)
    drag.current = { id: e.pointerId, x: e.clientX, y: e.clientY }
    view.current.dragging = true
  }

  const onPointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const d = drag.current
    if (!d || d.id !== e.pointerId) return
    rotate((e.clientX - d.x) * 0.006, (e.clientY - d.y) * 0.004)
    d.x = e.clientX
    d.y = e.clientY
  }

  const endDrag = (e: PointerEvent<HTMLDivElement>) => {
    if (drag.current?.id !== e.pointerId) return
    drag.current = null
    view.current.dragging = false
  }

  return (
    <>
      <div className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[min(150vw,1100px)] -translate-x-1/2 -translate-y-[52%]">
        <div
          aria-hidden="true"
          className="animate-pulse-core absolute inset-[22%] rounded-full blur-3xl"
          style={{
            background:
              'radial-gradient(circle, oklch(0.62 0.22 290 / 0.35), oklch(0.84 0.14 205 / 0.12) 45%, transparent 70%)',
          }}
        />
        <div
          aria-hidden="true"
          className="absolute inset-0 [mask-image:radial-gradient(circle_at_center,black_45%,transparent_72%)]"
        >
          <GalaxyScene playing={playing} view={view} />
        </div>
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{ background: 'radial-gradient(circle at center, oklch(0.02 0.01 270 / 0.35) 0%, transparent 22%)' }}
        />

        <div
          role="img"
          aria-roledescription="interactive 3D galaxy"
          aria-label="A glowing spiral galaxy with violet and cyan arms rotating around a bright pink-white core."
          aria-describedby={instructionsId}
          tabIndex={0}
          onKeyDown={onKeyDown}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={endDrag}
          onPointerCancel={endDrag}
          className="pointer-events-auto absolute inset-[18%] cursor-grab touch-pan-y rounded-full outline-none transition-shadow active:cursor-grabbing focus-visible:shadow-[0_0_0_2px_oklch(0.84_0.14_205/0.7),0_0_40px_oklch(0.62_0.22_290/0.4)]"
        />
        <p id={instructionsId} className="sr-only">
          Drag or use the arrow keys to rotate. Plus and minus zoom, Space pauses or plays the animation, R resets the
          view.
        </p>
      </div>

      <div
        role="toolbar"
        aria-label="Galaxy controls"
        className="glass absolute bottom-6 right-6 z-20 flex items-center gap-1 rounded-full p-1.5"
      >
        <ControlButton label={playing ? 'Pause galaxy animation' : 'Play galaxy animation'} onClick={togglePlaying} pressed={!playing}>
          {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
        </ControlButton>
        <span aria-hidden="true" className="mx-0.5 h-5 w-px bg-white/15" />
        <ControlButton label="Rotate galaxy left" onClick={() => rotate(-0.4)}>
          <RotateCcw className="h-4 w-4" />
        </ControlButton>
        <ControlButton label="Rotate galaxy right" onClick={() => rotate(0.4)}>
          <RotateCw className="h-4 w-4" />
        </ControlButton>
        <ControlButton label="Zoom out" onClick={() => zoomBy(1 / 1.15)}>
          <ZoomOut className="h-4 w-4" />
        </ControlButton>
        <ControlButton label="Zoom in" onClick={() => zoomBy(1.15)}>
          <ZoomIn className="h-4 w-4" />
        </ControlButton>
        <ControlButton label="Reset galaxy view" onClick={reset}>
          <Undo2 className="h-4 w-4" />
        </ControlButton>
      </div>

      <p role="status" aria-live="polite" className="sr-only">
        {announcement}
      </p>
    </>
  )
}

function ControlButton({
  label,
  onClick,
  pressed,
  children,
}: {
  label: string
  onClick: () => void
  pressed?: boolean
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      aria-pressed={pressed}
      title={label}
      onClick={onClick}
      className="flex h-9 w-9 items-center justify-center rounded-full text-white/80 transition-colors hover:bg-white/10 hover:text-cyan focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan [&_svg]:pointer-events-none"
    >
      <span aria-hidden="true">{children}</span>
    </button>
  )
}
