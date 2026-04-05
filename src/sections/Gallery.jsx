import { useState, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

const IMAGES = [
  '/resources/Gallery/AI Spire 2.webp',
  '/resources/Gallery/AllWillFall1.webp',
  '/resources/Gallery/Aquifiers.webp',
  '/resources/Gallery/BONSAIIIIIIIIIII1.webp',
  '/resources/Gallery/BaleFire Pendant.webp',
  '/resources/Gallery/Beeple.webp',
  '/resources/Gallery/Beeple2.webp',
  '/resources/Gallery/BlackSwan.webp',
  '/resources/Gallery/Boat.webp',
  '/resources/Gallery/Bot.webp',
  '/resources/Gallery/Brix2.webp',
  '/resources/Gallery/CBroadside_155.webp',
  '/resources/Gallery/Captured Worlds.webp',
  '/resources/Gallery/Clouds V4.webp',
  '/resources/Gallery/Concrete1Finished.webp',
  '/resources/Gallery/ConcreteFinished.webp',
  '/resources/Gallery/Desktop.webp',
  '/resources/Gallery/Desktop1.webp',
  '/resources/Gallery/DissunP90Final.webp',
  '/resources/Gallery/DnDItems.webp',
  '/resources/Gallery/Exobourne Avatar deco.webp',
  '/resources/Gallery/Glass Flower.webp',
  '/resources/Gallery/GlassTree.webp',
  '/resources/Gallery/IsoCircuit.webp',
  '/resources/Gallery/JewelledSpider.webp',
  '/resources/Gallery/LadybugRealistic.webp',
  '/resources/Gallery/Lore Item.webp',
  '/resources/Gallery/LuxPoolside.webp',
  '/resources/Gallery/Paragon Sniper base.webp',
  '/resources/Gallery/Planet.webp',
  '/resources/Gallery/RandomInstanceColor.webp',
  '/resources/Gallery/Refraction3.webp',
  '/resources/Gallery/SKR MKII.webp',
  '/resources/Gallery/SigilRock.webp',
  '/resources/Gallery/Skele.webp',
  '/resources/Gallery/SnowSat.webp',
  '/resources/Gallery/Stylized Star Pendant.webp',
  '/resources/Gallery/Synthetic SKR MKI.webp',
  '/resources/Gallery/TentacleGeo Setup1.webp',
  '/resources/Gallery/TexBakeTut.webp',
  '/resources/Gallery/TickTock_Full_V1.webp',
  '/resources/Gallery/TraidDesktop.webp',
  '/resources/Gallery/Traid_Desktop_20002.webp',
  '/resources/Gallery/VolcanoPlanet1.webp',
  '/resources/Gallery/VoxelAnimBanner.webp',
]

const VIDEOS = [
  { src: '/resources/Gallery/CubePulseV20000-0130.mp4',  name: 'Cube Pulse' },
  { src: '/resources/Gallery/MapPath0000-0220.mp4',       name: 'Map Path' },
  { src: '/resources/Gallery/Particle Accelerator.mp4',   name: 'Particle Accelerator' },
]

const BASE_IMAGES = IMAGES.map(src => ({ src, name: src.split('/').pop().replace('.webp', ''), type: 'image' }))
const BASE_VIDEOS = VIDEOS.map(v => ({ ...v, type: 'video' }))

const ALL_ITEMS = [...BASE_IMAGES]
ALL_ITEMS.splice(2, 0, BASE_VIDEOS[0])
ALL_ITEMS.splice(5, 0, BASE_VIDEOS[1])
ALL_ITEMS.splice(8, 0, BASE_VIDEOS[2])

const fadeUp = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0, transition: { duration: 0.4, ease: 'easeOut' } } }

function LightboxModal({ item, onClose, onPrev, onNext }) {
  const { enterElement, leaveElement } = useCursor()

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-8"
      style={{ background: 'rgba(5,2,6,0.98)' }}
      onClick={onClose}
      onMouseEnter={() => enterElement('text', 'CLOSE')}
      onMouseLeave={leaveElement}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0, y: 20 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.95, opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[90vw] md:max-w-7xl h-full flex flex-col items-center justify-center pointer-events-none"
      >
        <div 
          className="relative w-full flex-1 flex flex-col items-center justify-center pointer-events-auto"
          onClick={e => e.stopPropagation()}
          onMouseEnter={leaveElement}
        >
          {item.type === 'video' ? (
            <video
              src={item.src} autoPlay loop muted playsInline controls
              className="w-full h-full max-h-[85vh] object-contain"
            />
          ) : (
            <img
              src={item.src} alt={item.name}
              className="w-full h-full max-h-[85vh] object-contain"
            />
          )}

          {/* Minimal Controls */}
          <div className="absolute top-1/2 -translate-y-1/2 inset-x-0 flex justify-between px-4 sm:px-0 sm:-mx-16 mix-blend-difference">
            <button 
              onClick={onPrev} 
              onMouseEnter={() => enterElement('hover')}
              onMouseLeave={leaveElement}
              className="text-light hover:text-[#CC44FF] font-mono text-sm tracking-widest uppercase transition-colors"
            >
              PREV
            </button>
            <button 
              onClick={onNext} 
              onMouseEnter={() => enterElement('hover')}
              onMouseLeave={leaveElement}
              className="text-light hover:text-[#CC44FF] font-mono text-sm tracking-widest uppercase transition-colors"
            >
              NEXT
            </button>
          </div>
        </div>

        {/* Info footer */}
        <div className="absolute bottom-8 right-8 mix-blend-difference pointer-events-none text-right">
          <p className="font-sans text-xs sm:text-base font-bold text-light uppercase tracking-widest">{item.name}</p>
          <p className="font-mono text-[9px] tracking-[0.2em] uppercase mt-1" style={{ color: '#CC44FF' }}>
            {item.type === 'video' ? 'Motion Graphic' : 'Still Render'}
          </p>
        </div>
      </motion.div>
    </motion.div>
  )
}

export default function Gallery() {
  const [lightboxIdx, setLightboxIdx] = useState(null)
  const { enterElement, leaveElement } = useCursor()

  const open  = useCallback(i => { setLightboxIdx(i); leaveElement(); }, [leaveElement])
  const close = useCallback(() => { setLightboxIdx(null); leaveElement(); }, [leaveElement])
  const prev  = useCallback(() => setLightboxIdx(i => (i - 1 + ALL_ITEMS.length) % ALL_ITEMS.length), [])
  const next  = useCallback(() => setLightboxIdx(i => (i + 1) % ALL_ITEMS.length), [])

  const lightboxItem = lightboxIdx !== null ? ALL_ITEMS[lightboxIdx] : null

  return (
    <section id="gallery" className="relative min-h-screen py-28 px-6" style={{ zIndex: 1 }}>
      <div className="max-w-7xl mx-auto space-y-16">

        {/* Header */}
        <motion.div
          initial="hidden" animate="show"
          variants={{ show: { transition: { staggerChildren: 0.08 } } }}
          className="space-y-4 max-w-xl"
        >
          <motion.h2
            variants={fadeUp}
            className="font-sans font-bold text-5xl text-light"
            style={{ letterSpacing: '-0.02em' }}
          >
            The <span className="text-gradient">Showcase</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="divider w-16" />
          <motion.p variants={fadeUp} className="font-sans text-sm leading-loose" style={{ color: '#7A6882' }}>
            VFX · 3D renders · Motion graphics · Cinematic work
          </motion.p>
        </motion.div>

        {/* Sibling Dimming Masonry Grid */}
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 group/list pt-4 pb-24">
          {ALL_ITEMS.map((item, idx) => (
            <motion.div
              key={item.src}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: Math.min(idx * 0.03, 1), ease: [0.16, 1, 0.3, 1] }}
              className="group relative break-inside-avoid mb-4 cursor-none overflow-hidden transition-all duration-500 hover:!opacity-100 group-hover/list:opacity-40"
              style={{
                border: '1px solid rgba(255,255,255,0.03)',
                background: 'rgba(15,6,18,0.4)',
              }}
              onClick={() => open(idx)}
              onMouseEnter={() => enterElement('text', item.type === 'video' ? 'PLAY' : 'VIEW')}
              onMouseLeave={leaveElement}
            >
              {item.type === 'video' ? (
                <video
                  src={item.src} muted loop playsInline autoPlay
                  className="w-full object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ display: 'block' }}
                />
              ) : (
                <img
                  src={item.src} alt={item.name}
                  loading="lazy"
                  className="w-full object-cover block transition-transform duration-700 ease-out group-hover:scale-105"
                  style={{ display: 'block' }}
                />
              )}

              {/* Hover overlay data */}
              <div
                className="absolute inset-0 flex flex-col items-start justify-end p-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-screen pointer-events-none"
                style={{ background: 'linear-gradient(to top, rgba(12,6,15,0.9) 0%, transparent 50%)' }}
              >
                <p className="font-sans text-[10px] font-bold text-light uppercase tracking-widest">{item.name}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightboxItem && (
          <LightboxModal
            item={lightboxItem}
            onClose={close}
            onPrev={prev}
            onNext={next}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
