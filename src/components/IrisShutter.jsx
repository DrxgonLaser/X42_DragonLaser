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

    // Generate physical carbon-fiber/titanium micro-weave texture
    const texCanvas = document.createElement('canvas')
    texCanvas.width = 6
    texCanvas.height = 6
    const tCtx = texCanvas.getContext('2d')
    tCtx.fillStyle = 'rgba(0,0,0,0.4)'
    tCtx.fillRect(0,0,3,3)
    tCtx.fillRect(3,3,3,3)
    tCtx.fillStyle = 'rgba(255,255,255,0.05)'
    tCtx.fillRect(3,0,3,3)
    tCtx.fillRect(0,3,3,3)

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

      const weavePattern = ctx.createPattern(texCanvas, 'repeat')

      // Mathematically perfect geometric N-gon aperture
      // The hole snaps shut exponentially, twisting 90 degrees
      const r = DIAG * 0.75 * Math.pow((1 - progress), 2)
      const rotPhase = progress * Math.PI * 0.5 

      ctx.save()
      ctx.translate(cx, cy)

      for (let i = 0; i <= N_BLADES; i++) {
        const a1 = (i * 2 * Math.PI) / N_BLADES
        const a2 = ((i + 1) * 2 * Math.PI) / N_BLADES
        
        // Inner vertices (twisting)
        const inA = { x: Math.cos(a1 + rotPhase) * r, y: Math.sin(a1 + rotPhase) * r }
        const inB = { x: Math.cos(a2 + rotPhase) * r, y: Math.sin(a2 + rotPhase) * r }
        
        // Outer vertices (locked identically to screen bounds)
        const outC = { x: Math.cos(a2) * DIAG, y: Math.sin(a2) * DIAG }
        const outD = { x: Math.cos(a1) * DIAG, y: Math.sin(a1) * DIAG }
        
        // 1. Draw perfectly symmetric interlocking quad mesh
        ctx.beginPath()
        ctx.moveTo(inA.x, inA.y)
        ctx.lineTo(inB.x, inB.y)
        ctx.lineTo(outC.x, outC.y)
        ctx.lineTo(outD.x, outD.y)
        ctx.closePath()

        // 2. High-fidelity glass gradient
        const grad = ctx.createLinearGradient(inA.x, inA.y, outD.x, outD.y)
        grad.addColorStop(0, '#020005') // Absolute black core
        grad.addColorStop(0.5, '#0b001a')
        grad.addColorStop(1, '#1d0033') // Violet structural bevel
        ctx.fillStyle = grad
        
        // Apply heavy 3D volumetric drop shadow to make blades physically POP over each other
        ctx.shadowColor = 'rgba(0, 0, 0, 0.95)'
        ctx.shadowBlur = 40
        ctx.shadowOffsetX = Math.cos(a2 + Math.PI/2) * 15
        ctx.shadowOffsetY = Math.sin(a2 + Math.PI/2) * 15

        ctx.globalAlpha = 1
        ctx.globalCompositeOperation = 'source-over'
        ctx.fill()

        // Apply geometric carbon fiber texture directly onto the blade face over the gradient
        ctx.globalCompositeOperation = 'lighten'
        ctx.fillStyle = weavePattern
        // We set local transform so the carbon grain follows the rotation angle of the blade!
        ctx.save()
        ctx.translate(inA.x, inA.y) // pivot on the inner vertex point
        ctx.rotate(a1 + rotPhase)
        ctx.fill()
        ctx.restore()
        
        ctx.globalCompositeOperation = 'source-over'
        
        // Remove shadow for the strokes
        ctx.shadowColor = 'transparent'
        ctx.shadowBlur = 0
        ctx.shadowOffsetX = 0
        ctx.shadowOffsetY = 0

        // 3. Draw structural wireframe framework (The Beveled Edge)
        ctx.globalCompositeOperation = 'screen'
        
        // Intense Leading Edge Bevel Highlight
        ctx.beginPath()
        ctx.moveTo(inA.x, inA.y)
        ctx.lineTo(outD.x, outD.y)
        // Hard inner core 1px slice
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 1
        ctx.globalAlpha = 0.8
        ctx.stroke()
        // Outer neon bleed
        ctx.strokeStyle = '#9200FF'
        ctx.lineWidth = 2 + (progress * 4) 
        ctx.globalAlpha = 0.6
        ctx.stroke()

        // Inner polygon hole (Aperture Laser Ring)
        ctx.beginPath()
        ctx.moveTo(inA.x, inA.y)
        ctx.lineTo(inB.x, inB.y)
        ctx.strokeStyle = '#ffffff'
        ctx.lineWidth = 2 + (progress * 5)
        ctx.globalAlpha = 0.95
        ctx.stroke()
      }
      ctx.restore()

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
