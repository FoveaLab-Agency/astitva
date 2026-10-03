export function NebulaBackdrop() {
  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-void">
      <div
        className="animate-nebula absolute -left-1/4 -top-1/4 h-[80vmax] w-[80vmax] rounded-full opacity-25 blur-3xl"
        style={{ background: 'radial-gradient(circle, oklch(0.3 0.16 285 / 0.5), transparent 65%)' }}
      />
      <div
        className="animate-nebula absolute -bottom-1/3 -right-1/4 h-[75vmax] w-[75vmax] rounded-full opacity-20 blur-3xl [animation-delay:-14s] [animation-duration:52s]"
        style={{ background: 'radial-gradient(circle, oklch(0.32 0.12 220 / 0.45), transparent 65%)' }}
      />
      <div
        className="animate-nebula absolute left-1/3 top-1/2 h-[50vmax] w-[50vmax] rounded-full opacity-10 blur-3xl [animation-delay:-25s] [animation-duration:64s]"
        style={{ background: 'radial-gradient(circle, oklch(0.38 0.2 330 / 0.4), transparent 65%)' }}
      />
      <div
        className="absolute inset-0"
        style={{ background: 'radial-gradient(ellipse at center, transparent 25%, #000105 90%)' }}
      />
    </div>
  )
}
