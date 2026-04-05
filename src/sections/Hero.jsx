import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BG_IMAGES = [
  '/resources/Background/BONSAIIIIIIIIIII1.webp',
  '/resources/Background/Bot.webp',
  '/resources/Background/CBroadside_155.webp',
  '/resources/Background/Desktop.webp',
  '/resources/Background/Glass Flower.webp',
  '/resources/Background/JewelledSpider.webp',
  '/resources/Background/LuxPoolside.webp',
  '/resources/Background/Planet.webp',
  '/resources/Background/SigilRock.webp',
  '/resources/Background/SnowSat.webp',
  '/resources/Background/TickTock_Full_V1.webp',
  '/resources/Background/Traid_Desktop_20002.webp',
  '/resources/Background/VolcanoPlanet1.webp',
  '/resources/Background/VoxelAnimBanner.webp',
]

const INTERVAL = 5500

export default function Hero() {
  const [bgIndex, setBgIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setBgIndex(i => (i + 1) % BG_IMAGES.length)
    }, INTERVAL)
    return () => clearInterval(id)
  }, [])

  const name = BG_IMAGES[bgIndex].split('/').pop().replace('.webp', '')

  const navTo = path => {
    window.history.pushState({}, '', path)
    window.dispatchEvent(new PopStateEvent('popstate'))
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen overflow-hidden"
      style={{ background: '#070308' }}
    >
      {/* ── Full-bleed background ── */}
      <AnimatePresence mode="sync">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 2, ease: 'easeInOut' }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("${BG_IMAGES[bgIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            filter: 'brightness(0.55)',
          }}
        />
      </AnimatePresence>

      {/* ── Minimal edge vignette — only on edges, not center ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'linear-gradient(to right,  rgba(7,3,8,0.82) 0%, rgba(7,3,8,0.0) 38%), ' +
            'linear-gradient(to top,    rgba(7,3,8,0.55) 0%, rgba(7,3,8,0.0) 35%)',
        }}
      />

      {/* ── Content: bottom-left, minimal ── */}
      <div className="absolute inset-0 z-10 flex flex-col justify-end pb-14 pl-12 pr-8 pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          className="flex flex-col gap-3 max-w-sm pointer-events-auto"
        >
          {/* Tag */}
          <span
            className="font-mono text-[10px] tracking-[0.2em] uppercase"
            style={{ color: '#9200FF' }}
          >
            VFX · 3D · Motion
          </span>

          {/* Name */}
          <h1
            className="font-sans font-bold leading-none"
            style={{ fontSize: 'clamp(2.8rem, 5vw, 5.5rem)', letterSpacing: '-0.03em', color: '#EDE6F5' }}
          >
            Dragon<span className="text-gradient">Laser</span>
          </h1>

          {/* One-liner */}
          <p
            className="font-sans text-sm leading-relaxed"
            style={{ color: 'rgba(200,185,215,0.75)', maxWidth: 280 }}
          >
            Cinematic VFX & digital art.
          </p>

          {/* CTAs */}
          <div className="flex gap-3 mt-1">
            <button onClick={() => navTo('/gallery')} className="btn-primary">
              Work
            </button>
            <button onClick={() => navTo('/contact')} className="btn-outline">
              Contact
            </button>
          </div>
        </motion.div>
      </div>

      {/* ── Dot nav — bottom center ── */}
      <div className="absolute bottom-7 left-1/2 -translate-x-1/2 z-10 flex gap-2 items-center">
        {BG_IMAGES.map((_, i) => (
          <button
            key={i}
            onClick={() => setBgIndex(i)}
            aria-label={`Scene ${i + 1}`}
            style={{
              width:  i === bgIndex ? 20 : 5,
              height: 5,
              borderRadius: 3,
              background: i === bgIndex ? '#9200FF' : 'rgba(255,255,255,0.2)',
              boxShadow: i === bgIndex ? '0 0 6px #9200FF' : 'none',
              transition: 'all 0.3s',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
        ))}
      </div>

      {/* ── Image name label — bottom right ── */}
      <AnimatePresence mode="wait">
        <motion.div
          key={name}
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.35 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1 }}
          className="absolute bottom-7 right-8 z-10 font-mono text-[9px] tracking-[0.18em] uppercase select-none"
          style={{ color: '#EDE6F5' }}
        >
          {name}
        </motion.div>
      </AnimatePresence>

    </section>
  )
}
