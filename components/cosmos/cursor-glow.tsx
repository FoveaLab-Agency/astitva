'use client'

import { useEffect, useRef } from 'react'

export function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    if (!glow || !window.matchMedia('(pointer: fine)').matches) return

    let targetX = window.innerWidth / 2
    let targetY = window.innerHeight / 2
    let x = targetX
    let y = targetY
    let frame = 0

    const onMove = (event: PointerEvent) => {
      targetX = event.clientX
      targetY = event.clientY
      glow.style.opacity = '1'
    }

    const tick = () => {
      x += (targetX - x) * 0.12
      y += (targetY - y) * 0.12
      glow.style.transform = `translate3d(${x - 250}px, ${y - 250}px, 0)`
      frame = requestAnimationFrame(tick)
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    frame = requestAnimationFrame(tick)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('pointermove', onMove)
    }
  }, [])

  return (
    <div
      ref={glowRef}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-0 h-[500px] w-[500px] rounded-full opacity-0 mix-blend-screen transition-opacity duration-700"
      style={{ background: 'radial-gradient(circle, oklch(0.62 0.22 290 / 0.14), oklch(0.84 0.14 205 / 0.05) 40%, transparent 70%)' }}
    />
  )
}
