import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const links = [
  { path: '/',        label: 'Home'    },
  { path: '/gallery', label: 'Work'    },
  { path: '/skills',  label: 'Skills'  },
  { path: '/contact', label: 'Contact' },
]

export default function Navbar({ onNav }) {
  const location = useLocation()
  const active = location.pathname
  const [isOpen, setIsOpen] = useState(false)

  const handleNav = (path) => {
    setIsOpen(false)
    setTimeout(() => onNav(path), 400) // wait for menu to close before animating Iris Shutter
  }

  return (
    <>
      {/* ── Top Left Branding ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => onNav('/')}
        className="fixed top-8 left-8 z-[100] flex items-center gap-3 group pointer-events-auto mix-blend-difference"
      >
        <span className="font-sans font-bold text-sm tracking-[0.2em] text-light">
          DRAGON<span style={{ color: '#9200FF' }}>LASER</span>
        </span>
      </motion.button>

      {/* ── Top Right Menu Toggle ── */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        onClick={() => setIsOpen(true)}
        className="fixed top-8 right-8 z-[90] flex items-center gap-4 group pointer-events-auto mix-blend-difference"
      >
        <span className="font-mono text-xs tracking-widest text-light uppercase group-hover:text-[#9200FF] transition-colors">
          Menu
        </span>
        <div className="flex flex-col gap-[5px] items-end">
          <div className="w-8 h-px bg-light group-hover:bg-[#9200FF] transition-colors" />
          <div className="w-5 h-px bg-light group-hover:bg-[#9200FF] transition-colors" />
        </div>
      </motion.button>

      {/* ── Fullscreen Overlay Menu ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] flex flex-col justify-center px-8 md:px-24"
            style={{
              background: 'rgba(5, 2, 6, 0.95)',
              backdropFilter: 'blur(32px)',
            }}
          >
            {/* Close Button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-8 right-8 flex items-center gap-4 group"
            >
              <span className="font-mono text-xs tracking-widest text-light uppercase group-hover:text-[#9200FF] transition-colors">
                Close
              </span>
              <div className="relative w-8 h-8 flex items-center justify-center">
                <div className="absolute w-8 h-px bg-light group-hover:bg-[#9200FF] transition-colors rotate-45" />
                <div className="absolute w-8 h-px bg-light group-hover:bg-[#9200FF] transition-colors -rotate-45" />
              </div>
            </button>

            {/* Menu Links */}
            <div className="flex flex-col gap-6 md:gap-8">
              {links.map((l, i) => {
                const isActive = active === l.path
                return (
                  <motion.div
                    key={l.path}
                    initial={{ opacity: 0, y: 40 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 20 }}
                    transition={{ duration: 0.6, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                    className="overflow-hidden"
                  >
                    <button
                      onClick={() => handleNav(l.path)}
                      className="group flex items-center gap-8 text-left"
                    >
                      <span className="font-mono text-sm tracking-widest text-[#7A6882] opacity-50 group-hover:opacity-100 transition-opacity">
                        0{i + 1}
                      </span>
                      <span 
                        className="font-sans font-bold text-5xl md:text-8xl tracking-[-0.02em] transition-colors duration-500"
                        style={{ color: isActive ? '#9200FF' : '#EDE6F5' }}
                      >
                        {l.label}
                      </span>
                    </button>
                  </motion.div>
                )
              })}
            </div>

            {/* Optional Menu Footer Details */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.4 }}
              className="absolute bottom-8 left-8 right-8 flex justify-between font-mono text-[9px] tracking-[0.2em] uppercase text-[#7A6882]"
            >
              <span>VFX / Directing</span>
              <span>Available for 2026 Projects</span>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  )
}
