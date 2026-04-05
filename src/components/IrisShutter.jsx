import { useEffect, useRef } from 'react'

const N_BLADES   = 7
const CLOSE_MS   = 550
const OPEN_MS    = 550

export default function IrisShutter({ isActive, onMidpoint }) {
  const canvasRef = useRef(null)
  const rafRef    = useRef(null)
  const cbRef     = useRef(onMidpoint)
  cbRef.current   = onMidpoint

  useEffect(() => {
    if (!isActive) return
    const canvas = canvasRef.current
    if (!canvas) return

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const W = canvas.width, H = canvas.height
    const cx = W / 2, cy = H / 2
    const DIAG = Math.hypot(W, H)

    let startTime = null
    let midpointFired = false
    let phase = 'closing'

    function easeCubic(t) {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2
    }

    function drawBlades(ctx, progress) {
      ctx.clearRect(0, 0, W, H)

      for (let i = 0; i < N_BLADES; i++) {
        const baseAngle = (i * 2 * Math.PI) / N_BLADES
        const d = DIAG * 0.55 * (1 - progress)
        const rot = baseAngle + (1 - progress) * (Math.PI / 2)

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rot)

        // Blade gradient — deep black core, subtle steel edge
        const grad = ctx.createLinearGradient(0, d, 0, DIAG)
        grad.addColorStop(0,   'rgba(12, 6, 14, 0.98)')
        grad.addColorStop(0.3, 'rgba(8,  3,  9, 0.99)')
        grad.addColorStop(1,   'rgba(4,  1,  5, 1.00)')

        ctx.beginPath()
        ctx.moveTo(-DIAG, d)
        ctx.lineTo(DIAG,  d)
        ctx.lineTo(DIAG,  DIAG)
        ctx.lineTo(-DIAG, DIAG)
        ctx.closePath()
        ctx.fillStyle = grad
        ctx.fill()

        // Inner edge — thin sharp line, brighter as it closes
        const edgeAlpha = Math.min(progress * 1.4, 1)
        ctx.beginPath()
        ctx.moveTo(-DIAG, d)
        ctx.lineTo(DIAG,  d)
        ctx.strokeStyle = `rgba(180, 100, 220, ${edgeAlpha * 0.55})`
        ctx.lineWidth = 0.8
        ctx.stroke()

        // Outer subtle glow line
        ctx.beginPath()
        ctx.moveTo(-DIAG, d + 1)
        ctx.lineTo(DIAG,  d + 1)
        ctx.strokeStyle = `rgba(204, 68, 255, ${edgeAlpha * 0.18})`
        ctx.lineWidth = 3
        ctx.stroke()

        ctx.restore()
      }

      // Small centre flare when fully closed
      if (progress > 0.95) {
        const glowP = (progress - 0.95) / 0.05
        ctx.save()
        ctx.globalCompositeOperation = 'lighter'
        const r = 60 * glowP
        const grd = ctx.createRadialGradient(cx, cy, 0, cx, cy, r)
        grd.addColorStop(0, `rgba(204, 68, 255, ${0.25 * glowP})`)
        grd.addColorStop(1, 'transparent')
        ctx.fillStyle = grd
        ctx.beginPath()
        ctx.arc(cx, cy, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.restore()
      }
    }

    function tick(ts) {
      if (startTime === null) startTime = ts
      const elapsed = ts - startTime
      const ctx = canvas.getContext('2d')

      if (phase === 'closing') {
        const rawP = Math.min(elapsed / CLOSE_MS, 1)
        const progress = easeCubic(rawP)
        drawBlades(ctx, progress)

        if (rawP >= 1) {
          if (!midpointFired) {
            midpointFired = true
            cbRef.current?.()
          }
          phase = 'opening'
          startTime = ts
        }
      } else {
        const rawP = Math.min(elapsed / OPEN_MS, 1)
        const progress = 1 - Math.pow(rawP, 3) // ease-out cubic for opening
        drawBlades(ctx, progress)

        if (rawP >= 1) {
          ctx.clearRect(0, 0, canvas.width, canvas.height)
          window.removeEventListener('resize', resize)
          return
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    rafRef.current = requestAnimationFrame(tick)
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isActive])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        pointerEvents: isActive ? 'all' : 'none',
        display: isActive ? 'block' : 'none',
      }}
    />
  )
}
