import { useEffect, useRef } from 'react'

const LASER_COLORS = ['#CC44FF', '#A030C0', '#EE88FF', '#882299', '#ffffff']

function rand(a, b) { return Math.random() * (b - a) + a }
function randInt(a, b) { return Math.floor(rand(a, b + 1)) }
function sidePoint(W, H) {
  const side = randInt(0, 3)
  if (side === 0) return { x: rand(0, W),   y: 0 }
  if (side === 1) return { x: W,             y: rand(0, H) }
  if (side === 2) return { x: rand(0, W),   y: H }
  return                  { x: 0,            y: rand(0, H) }
}

class Spark {
  constructor(x, y, angle) {
    this.x   = x; this.y = y
    const sp = rand(80, 200)
    const spread = rand(-0.4, 0.4)
    this.vx  = Math.cos(angle + spread) * sp
    this.vy  = Math.sin(angle + spread) * sp
    this.life  = 1
    this.decay = rand(1.5, 3.5)
    this.w     = rand(0.3, 1.0)
  }
  update(dt) {
    this.x += this.vx * dt
    this.y += this.vy * dt
    this.vy += 150 * dt     // gravity
    this.vx *= 0.95
    this.life -= this.decay * dt
  }
  get dead() { return this.life <= 0 }
  draw(ctx) {
    if (this.dead) return
    const px = this.x - this.vx * 0.05
    const py = this.y - this.vy * 0.05
    ctx.globalCompositeOperation = 'screen'
    ctx.globalAlpha = this.life * 0.8
    ctx.strokeStyle = '#CC44FF'
    ctx.lineWidth   = this.w
    ctx.lineCap     = 'round'

    ctx.beginPath()
    ctx.moveTo(this.x, this.y)
    ctx.lineTo(px, py)
    ctx.stroke()
  }
}

class Blaster {
  constructor(W, H) {
    this.src = sidePoint(W, H)
    const tgt = { x: rand(W * 0.2, W * 0.8), y: rand(H * 0.2, H * 0.8) }
    const dx = tgt.x - this.src.x, dy = tgt.y - this.src.y
    const dist = Math.max(Math.hypot(dx, dy), 1)
    
    this.dir = { x: dx/dist, y: dy/dist }
    this.angle = Math.atan2(this.dir.y, this.dir.x)
    
    this.speed = rand(3000, 6000) // Extremely fast
    this.length = rand(200, 600)  // Longer tail
    this.pos = { x: this.src.x, y: this.src.y }
    
    this.travelDist = 0
    this.maxDist = rand(dist * 0.8, dist * 1.5)
    
    this.color = LASER_COLORS[randInt(0, LASER_COLORS.length - 1)]
    this.coreW = rand(0.5, 1.2)
    
    this.sparks = []
    this.state = 'firing'
    this.age = 0
  }

  update(dt) {
    this.age += dt
    if (this.state === 'firing') {
      const step = this.speed * dt
      this.pos.x += this.dir.x * step
      this.pos.y += this.dir.y * step
      this.travelDist += step
      
      if (this.travelDist >= this.maxDist) {
        this.state = 'sparking'
        this.age = 0
        for (let i = 0; i < randInt(8, 15); i++) {
          this.sparks.push(new Spark(this.pos.x, this.pos.y, this.angle))
        }
      }
    } else {
      this.sparks.forEach(s => s.update(dt))
      this.sparks = this.sparks.filter(s => !s.dead)
    }
  }

  get dead() { return this.state === 'sparking' && this.sparks.length === 0 && this.age > 0.4 }

  draw(ctx) {
    if (this.state === 'firing') {
      const tailX = this.pos.x - this.dir.x * this.length
      const tailY = this.pos.y - this.dir.y * this.length

      let alpha = 1
      if (this.travelDist < this.length) alpha = this.travelDist / this.length
      
      ctx.globalCompositeOperation = 'screen'
      ctx.lineCap = 'round'

      // Optimized Glow (Overlapping strokes instead of shadowBlur)
      ctx.beginPath()
      ctx.moveTo(this.pos.x, this.pos.y)
      ctx.lineTo(tailX, tailY)
      
      ctx.strokeStyle = this.color
      ctx.lineWidth = this.coreW * 8
      ctx.globalAlpha = alpha * 0.15
      ctx.stroke()

      ctx.lineWidth = this.coreW * 2
      ctx.globalAlpha = alpha * 0.5
      ctx.stroke()

      ctx.strokeStyle = '#ffffff'
      ctx.lineWidth = this.coreW * 0.5
      ctx.globalAlpha = alpha * 0.9
      ctx.stroke()

    } else {
      // Sleek impact ring
      if (this.age < 0.3) {
        const p = this.age / 0.3
        const r = p * 150
        ctx.globalCompositeOperation = 'screen'
        ctx.beginPath()
        ctx.arc(this.pos.x, this.pos.y, Math.max(0.1, r), 0, Math.PI * 2)
        ctx.strokeStyle = this.color
        ctx.lineWidth = 1.5 + (1 - p) * 2
        ctx.globalAlpha = (1 - p) * 0.4
        ctx.stroke()
      }
      this.sparks.forEach(s => s.draw(ctx))
    }
  }
}

class Dust {
  constructor(W, H) {
    this.x = rand(0, W); this.y = rand(0, H)
    this.vx = rand(-2, 2); this.vy = rand(-5, -1)
    this.r  = rand(0.5, 1.2)
    this.alpha = rand(0.05, 0.25)
    this.W = W; this.H = H
  }
  update(dt) {
    this.x += this.vx * dt
    this.y += this.vy * dt
    if (this.y < -5) this.y = this.H + 5
    if (this.x < -5) this.x = this.W + 5
    if (this.x > this.W + 5) this.x = -5
  }
  draw(ctx) {
    ctx.globalAlpha = this.alpha
    ctx.fillStyle   = '#7A6882'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2)
    ctx.fill()
  }
}

export default function LaserBackground() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const W = canvas.width  = window.innerWidth
    const H = canvas.height = window.innerHeight
    const ctx = canvas.getContext('2d', { alpha: false }) // Optimization: opaque canvas

    ctx.fillStyle = '#070308'
    ctx.fillRect(0, 0, W, H)

    const dust     = Array.from({ length: 40 }, () => new Dust(W, H))
    const blasters = []
    let nextLaser  = rand(0.5, 1.5)
    let lastTime   = performance.now()
    let rafId

    function frame(now) {
      const dt = Math.min((now - lastTime) / 1000, 0.05)
      lastTime  = now

      ctx.globalCompositeOperation = 'source-over'
      ctx.globalAlpha = 1
      ctx.fillStyle   = 'rgba(7, 3, 8, 0.15)' // slightly harder fade for cleaner tails
      ctx.fillRect(0, 0, W, H)

      dust.forEach(d => { d.update(dt); d.draw(ctx) })

      nextLaser -= dt
      if (nextLaser <= 0) {
        blasters.push(new Blaster(W, H))
        nextLaser = rand(1.0, 3.0) // slightly reduced frequency for cleaner look
      }

      blasters.forEach(b => b.update(dt))
      blasters.forEach(b => b.draw(ctx))
      
      for (let i = blasters.length - 1; i >= 0; i--) {
        if (blasters[i].dead) blasters.splice(i, 1)
      }

      rafId = requestAnimationFrame(frame)
    }

    rafId = requestAnimationFrame(frame)

    let timeoutId
    const resize = () => {
      clearTimeout(timeoutId)
      timeoutId = setTimeout(() => {
        canvas.width = window.innerWidth
        canvas.height = window.innerHeight
        ctx.fillStyle = '#070308'
        ctx.fillRect(0, 0, window.innerWidth, window.innerHeight)
      }, 100)
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(rafId)
      clearTimeout(timeoutId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 0,
        pointerEvents: 'none',
        width: '100%', 
        height: '100%'
      }}
    />
  )
}
