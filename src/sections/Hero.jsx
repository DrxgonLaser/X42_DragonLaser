import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const BG_IMAGES = [
  '/resources/Background/Glass Flower.webp',
  '/resources/Background/BONSAIIIIIIIIIII1.webp',
  '/resources/Background/Bot.webp',
  '/resources/Background/CBroadside_155.webp',
  '/resources/Background/Desktop.webp',
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
      className="relative min-h-screen overflow-hidden flex flex-col"
      style={{ background: '#070308' }}
    >
      {/* ── Full-bleed background ── */}
      <AnimatePresence mode="popLayout">
        <motion.div
          key={bgIndex}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.1 }}
          transition={{ duration: 2.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 z-0"
          style={{
            backgroundImage: `url("${BG_IMAGES[bgIndex]}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
      </AnimatePresence>

      {/* ── Minimal edge vignette ── */}
      <div
        className="absolute inset-0 z-[1] pointer-events-none"
        style={{
          background:
            'radial-gradient(circle at center, transparent 0%, rgba(7,3,8,0.4) 100%), ' +
            'linear-gradient(to bottom, rgba(7,3,8,0.6) 0%, transparent 20%, transparent 80%, rgba(7,3,8,0.8) 100%)',
        }}
      />

      {/* ── Top-Right Metadata ── */}
      <div className="absolute top-24 right-10 z-20 flex flex-col items-end pointer-events-none">
        <AnimatePresence mode="wait">
          <motion.div
            key={bgIndex}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 0.4, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="flex flex-col items-end"
          >
            <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#EDE6F5]">
              Scene // {String(bgIndex + 1).padStart(2, '0')}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* ── Main HUD Baseline ── */}
      <div className="mt-auto relative z-20 w-full px-10 pb-12 flex flex-col gap-6">
        
        {/* 1. Timeline Progress Bar (Minimalist) */}
        <div className="w-full flex flex-col gap-2">
          <div className="flex justify-end font-mono text-[9px] tracking-widest text-[#EDE6F5]/20 uppercase">
            <span>{String(bgIndex + 1).padStart(2, '0')} / {String(BG_IMAGES.length).padStart(2, '0')}</span>
          </div>
          <div className="h-[1px] w-full bg-white/5 relative overflow-hidden rounded-full">
             <motion.div 
               key={bgIndex}
               initial={{ width: '0%' }}
               animate={{ width: '100%' }}
               transition={{ duration: INTERVAL / 1000, ease: 'linear' }}
               className="absolute inset-y-0 left-0 bg-[#9200FF]/30"
             />
          </div>
        </div>

        {/* 2. Content & Actions Spread */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
          
          {/* Brand Lockup */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-col gap-2"
          >
            <h1
              className="font-sans font-bold leading-[0.9]"
              style={{ fontSize: 'clamp(3rem, 6vw, 6.5rem)', letterSpacing: '-0.04em', color: '#EDE6F5' }}
            >
              Dragon<span className="text-gradient">Laser</span>
            </h1>
            <p className="font-sans text-sm text-[#EDE6F5]/60 mt-1 tracking-wide">
              Digital/VFX artist and Compositor
            </p>
          </motion.div>

          {/* Action Hardware */}
          <div className="flex items-center gap-8 pointer-events-auto">
            {/* Secondary: Contact */}
            <button 
              onClick={() => navTo('/contact')}
              className="group relative font-mono text-[11px] tracking-[0.3em] uppercase text-[#EDE6F5]/70 hover:text-white transition-colors duration-300 py-2"
            >
              Contact
              <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#9200FF] group-hover:w-full transition-all duration-500 ease-out" />
            </button>

            {/* Primary: Explore Work */}
            <button 
              onClick={() => navTo('/gallery')}
              className="group relative flex items-center gap-6 px-10 py-5 bg-white/[0.03] border border-white/10 backdrop-blur-xl rounded-full overflow-hidden transition-all duration-500 hover:border-[#9200FF]/50"
            >
              {/* Hover background slide */}
              <div className="absolute inset-0 bg-[#9200FF] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500 ease-[0.16,1,0.3,1]" />
              
              <span className="relative z-10 font-bold font-sans text-xs tracking-[0.2em] uppercase transition-transform duration-500 group-hover:-translate-x-2">
                Explore Work
              </span>

              <svg 
                className="relative z-10 w-5 h-5 transition-transform duration-500 group-hover:translate-x-3" 
                viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>

        </div>
      </div>

    </section>
  )
}

