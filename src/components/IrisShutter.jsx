import { useEffect, useRef } from 'react'

const N_BLADES   = 12
const CLOSE_MS   = 650
const OPEN_MS    = 600

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

    // Pre-calculate the cyber-grid texture once
    const patCanvas = document.createElement('canvas')
    patCanvas.width = 24
    patCanvas.height = 24
    const pCtx = patCanvas.getContext('2d')
    pCtx.fillStyle = '#0a0012' // Super deep base
    pCtx.fillRect(0,0,24,24)
    // Micro wireframe
    pCtx.fillStyle = 'rgba(74, 0, 128, 0.15)'
    pCtx.fillRect(0, 0, 1, 24)
    pCtx.fillRect(0, 0, 24, 1)
    // Intersection glowing diode
    pCtx.fillStyle = 'rgba(138, 0, 255, 0.3)'
    pCtx.fillRect(0, 0, 2, 2)

    let startTime = null
    let midpointFired = false
    let phase = 'closing'

    function easeCubic(t) {
      // Upgraded to extremely intense Expo easing for a mechanical "snap"
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t)
    }

    function drawBlades(ctx, progress) {
      // Clear with slight trailing ghost alpha
      ctx.globalCompositeOperation = 'source-over'
      ctx.clearRect(0, 0, W, H)

      const techPattern = ctx.createPattern(patCanvas, 'repeat')

      for (let i = 0; i < N_BLADES; i++) {
        const baseAngle = (i * 2 * Math.PI) / N_BLADES
        // The distance d scales down as progress approaches 1
        const d = DIAG * 0.55 * (1 - progress)
        const rot = baseAngle + (1 - progress) * (Math.PI / 1.5) // Increased rotation torque

        ctx.save()
        ctx.translate(cx, cy)
        ctx.rotate(rot)

        // Generate blade path
        ctx.beginPath()
        ctx.moveTo(-DIAG, d)
        ctx.lineTo(DIAG,  d)
        ctx.lineTo(DIAG,  DIAG)
        ctx.lineTo(-DIAG, DIAG)
        ctx.closePath()

        // Apply grid texture fill with parallax (matrix reset so pattern doesn't rotate)
        ctx.save()
        ctx.setTransform(1, 0, 0, 1, 0, 0)
        ctx.fillStyle = techPattern
        ctx.globalAlpha = 0.98
        ctx.fill()
        ctx.restore()

        // Inner glowing laser edge
        // The "laser" runs along the exact closing lip (-DIAG, d) to (DIAG, d)
        ctx.beginPath()
        ctx.moveTo(-DIAG, d)
        ctx.lineTo(DIAG,  d)
        
        ctx.globalCompositeOperation = 'screen'
        
        // Intense optical bloom core
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1
        ctx.globalAlpha = Math.min(progress * 1.5, 1)
        ctx.stroke()
        
        // Outer magenta/purple neon spread
        ctx.strokeStyle = '#9200FF'
        ctx.lineWidth = 4 + (progress * 6)
        ctx.globalAlpha = Math.min(progress * 0.8, 0.8)
        ctx.stroke()

        // Ultra wide faint background glow
        ctx.strokeStyle = '#4A0080'
        ctx.lineWidth = 15 + (progress * 10)
        ctx.globalAlpha = Math.min(progress * 0.3, 0.3)
        ctx.stroke()

        ctx.restore()
      }

      // Singularity Flash at the exact center when blades converge
      if (progress > 0.85) {
        const glowP = (progress - 0.85) / 0.15
        ctx.save()
        ctx.translate(cx, cy)
        ctx.globalCompositeOperation = 'screen'
        
        const r = DIAG * 0.4 * glowP
        const grd = ctx.createRadialGradient(0, 0, 0, 0, 0, r)
        grd.addColorStop(0, `rgba(255, 255, 255, ${glowP})`)
        grd.addColorStop(0.1, `rgba(181, 0, 255, ${glowP * 0.8})`)
        grd.addColorStop(0.5, `rgba(138, 0, 255, ${glowP * 0.3})`)
        grd.addColorStop(1, 'transparent')
        
        ctx.fillStyle = grd
        // Add a slight rotation to the singularity burst
        ctx.rotate(progress * Math.PI)
        
        // Extremely thin, razor-sharp starburst effect
        ctx.beginPath()
        ctx.ellipse(0, 0, r, r * 0.015, 0, 0, Math.PI * 2)
        ctx.ellipse(0, 0, r * 0.015, r, 0, 0, Math.PI * 2)
        ctx.fill()
        
        // Core expanding circle (much smaller, tighter core)
        ctx.beginPath()
        ctx.arc(0, 0, r * 0.08, 0, Math.PI * 2)
        ctx.fill()
        
        ctx.restore()
      }
    }

    function tick(ts) {
      if (startTime === null) startTime = ts
      const elapsed = ts - startTime
      const ctx = canvas.getContext('2d', { alpha: true })

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
