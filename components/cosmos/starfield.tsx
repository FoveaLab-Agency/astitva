'use client'

import { useEffect, useRef } from 'react'

type Star = { x: number; y: number; depth: number; radius: number; phase: number; speed: number; color: string }
type Comet = { x: number; y: number; vx: number; vy: number; life: number; maxLife: number; length: number; hue: number }

const STAR_COLORS = ['255,255,255', '255,255,255', '255,255,255', '186,230,253', '196,181,253', '165,243,252']

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas?.getContext('2d')
    if (!canvas || !ctx) return

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let width = 0
    let height = 0
    let stars: Star[] = []
    const comets: Comet[] = []
    let frame = 0
    let pointerX = 0
    let pointerY = 0
    let easedX = 0
    let easedY = 0
    let nextCometAt = performance.now() + 1500

    const seed = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = window.innerWidth
      height = window.innerHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(1800, Math.floor((width * height) / 1000))
      stars = Array.from({ length: count }, () => {
        const depth = Math.random()
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          depth,
          radius: depth > 0.92 ? Math.random() * 1.1 + 0.9 : Math.random() * 0.7 + 0.2,
          phase: Math.random() * Math.PI * 2,
          speed: 0.4 + Math.random() * 1.8,
          color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
        }
      })
    }

    const spawnComet = () => {
      const fromTop = Math.random() > 0.35
      comets.push({
        x: fromTop ? width * (0.3 + Math.random() * 0.8) : width + 40,
        y: fromTop ? -40 : Math.random() * height * 0.5,
        vx: -(7 + Math.random() * 6),
        vy: 3.5 + Math.random() * 3,
        life: 0,
        maxLife: 90 + Math.random() * 60,
        length: 120 + Math.random() * 160,
        hue: [190, 265, 300][Math.floor(Math.random() * 3)],
      })
    }

    const draw = (time: number) => {
      ctx.clearRect(0, 0, width, height)
      easedX += (pointerX - easedX) * 0.04
      easedY += (pointerY - easedY) * 0.04
      const scroll = window.scrollY
      const t = time / 1000

      for (const star of stars) {
        const shiftX = easedX * star.depth * 18
        const shiftY = easedY * star.depth * 18 - scroll * star.depth * 0.12
        const x = (((star.x + shiftX) % width) + width) % width
        const y = (((star.y + shiftY) % height) + height) % height
        const twinkle = reduceMotion ? 0.8 : 0.55 + 0.45 * Math.sin(t * star.speed + star.phase)
        const alpha = (0.25 + star.depth * 0.75) * twinkle

        if (star.radius > 0.9) {
          ctx.beginPath()
          ctx.fillStyle = `rgba(${star.color},${alpha * 0.18})`
          ctx.arc(x, y, star.radius * 3.2, 0, Math.PI * 2)
          ctx.fill()
          ctx.beginPath()
          ctx.fillStyle = `rgba(${star.color},${alpha})`
          ctx.arc(x, y, star.radius, 0, Math.PI * 2)
          ctx.fill()
        } else {
          ctx.fillStyle = `rgba(${star.color},${alpha})`
          ctx.fillRect(x, y, star.radius * 1.6, star.radius * 1.6)
        }
      }

      if (time > nextCometAt) {
        spawnComet()
        nextCometAt = time + 2800 + Math.random() * 4500
      }

      for (let i = comets.length - 1; i >= 0; i--) {
        const comet = comets[i]
        comet.x += comet.vx
        comet.y += comet.vy
        comet.life++
        const fade = Math.sin((comet.life / comet.maxLife) * Math.PI)
        const magnitude = Math.hypot(comet.vx, comet.vy)
        const tailX = comet.x - (comet.vx / magnitude) * comet.length
        const tailY = comet.y - (comet.vy / magnitude) * comet.length
        const gradient = ctx.createLinearGradient(comet.x, comet.y, tailX, tailY)
        gradient.addColorStop(0, `hsla(${comet.hue},100%,90%,${0.95 * fade})`)
        gradient.addColorStop(0.25, `hsla(${comet.hue},100%,70%,${0.45 * fade})`)
        gradient.addColorStop(1, `hsla(${comet.hue},100%,60%,0)`)
        ctx.strokeStyle = gradient
        ctx.lineWidth = 1.6
        ctx.lineCap = 'round'
        ctx.beginPath()
        ctx.moveTo(comet.x, comet.y)
        ctx.lineTo(tailX, tailY)
        ctx.stroke()
        ctx.beginPath()
        ctx.fillStyle = `hsla(${comet.hue},100%,92%,${fade})`
        ctx.arc(comet.x, comet.y, 1.8, 0, Math.PI * 2)
        ctx.fill()
        if (comet.life >= comet.maxLife) comets.splice(i, 1)
      }

      frame = requestAnimationFrame(draw)
    }

    const onPointerMove = (event: PointerEvent) => {
      pointerX = (event.clientX / width - 0.5) * 2
      pointerY = (event.clientY / height - 0.5) * 2
    }

    seed()
    if (reduceMotion) {
      draw(0)
      cancelAnimationFrame(frame)
    } else {
      frame = requestAnimationFrame(draw)
      window.addEventListener('pointermove', onPointerMove, { passive: true })
    }

    const onResize = () => {
      seed()
      if (reduceMotion) {
        draw(0)
        cancelAnimationFrame(frame)
      }
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', onResize)
      window.removeEventListener('pointermove', onPointerMove)
    }
  }, [])

  return <canvas ref={canvasRef} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />
}
