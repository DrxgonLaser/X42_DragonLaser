import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

export default function CustomCursor() {
  const { cursorVariant, cursorText } = useCursor()
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })

  useEffect(() => {
    const updateMousePosition = e => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }
    window.addEventListener('mousemove', updateMousePosition)
    return () => window.removeEventListener('mousemove', updateMousePosition)
  }, [])

  const variants = {
    default: {
      height: 12,
      width: 12,
      x: mousePosition.x - 6,
      y: mousePosition.y - 6,
      backgroundColor: '#9200FF',
      mixBlendMode: 'screen'
    },
    hover: {
      height: 48,
      width: 48,
      x: mousePosition.x - 24,
      y: mousePosition.y - 24,
      backgroundColor: 'rgba(204, 68, 255, 0.1)',
      border: '1px solid #9200FF',
      backdropFilter: 'blur(2px)'
    },
    text: {
      height: 72,
      width: 72,
      x: mousePosition.x - 36,
      y: mousePosition.y - 36,
      backgroundColor: 'rgba(7, 3, 8, 0.9)',
      border: '1px solid rgba(204, 68, 255, 0.3)',
      color: '#9200FF',
      fontSize: '10px'
    }
  }

  // Hide custom cursor on small devices
  if (typeof window !== 'undefined' && window.innerWidth < 768) return null

  return (
    <motion.div
      variants={variants}
      animate={cursorVariant}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.5 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: 9999,
        pointerEvents: 'none',
        borderRadius: '50%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
      }}
    >
      <AnimatePresence>
        {cursorVariant === 'text' && (
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            className="font-mono tracking-widest uppercase"
          >
            {cursorText}
          </motion.span>
        )}
      </AnimatePresence>
    </motion.div>
  )
}
