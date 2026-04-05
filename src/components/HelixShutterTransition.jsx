import { useEffect, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

/**
 * HelixShutterTransition
 * Renders a 6-blade camera shutter that spins open/closes with a helix DNA twist effect
 */
export default function HelixShutterTransition({ isActive, onComplete }) {
  const blades = 8

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  }

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {isActive && (
        <motion.div
          key="shutter"
          className="fixed inset-0 z-[9999] flex items-center justify-center overflow-hidden"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          transition={{ duration: 0.2 }}
        >
          {/* Dark background */}
          <motion.div
            className="absolute inset-0 bg-[#05050f]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          />

          {/* Shutter blades */}
          {Array.from({ length: blades }).map((_, i) => {
            const angle = (360 / blades) * i
            return (
              <motion.div
                key={i}
                className="absolute inset-0"
                style={{
                  background: `conic-gradient(from ${angle}deg at 50% 50%, 
                    #05050f ${360 / blades / 2}deg, 
                    transparent ${360 / blades / 2}deg)`,
                  transformOrigin: '50% 50%',
                }}
                initial={{ rotate: angle, scaleX: 0, opacity: 0 }}
                animate={{
                  rotate: [angle, angle + 90, angle + 180, angle + 180],
                  scaleX: [0, 1.1, 1, 1],
                  opacity: [0, 1, 1, 1],
                }}
                exit={{
                  rotate: [angle + 180, angle + 270, angle + 360],
                  scaleX: [1, 1.1, 0],
                  opacity: [1, 1, 0],
                }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.025,
                  ease: [0.4, 0, 0.2, 1],
                }}
              />
            )
          })}

          {/* Helix center ring */}
          <motion.div
            className="absolute z-10"
            initial={{ scale: 0, rotate: 0, opacity: 0 }}
            animate={{ scale: [0, 1.5, 1], rotate: 720, opacity: [0, 1, 1] }}
            exit={{ scale: [1, 1.5, 0], rotate: 1440, opacity: [1, 1, 0] }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <div className="relative w-32 h-32 flex items-center justify-center">
              {/* Outer ring */}
              <motion.div
                className="absolute w-32 h-32 rounded-full"
                style={{
                  border: '3px solid transparent',
                  background: 'linear-gradient(#05050f,#05050f) padding-box, linear-gradient(90deg,#00fff7,#bf00ff,#ff0080) border-box',
                }}
                animate={{ rotate: 360 }}
                transition={{ duration: 0.8, repeat: Infinity, ease: 'linear' }}
              />
              {/* Middle ring */}
              <motion.div
                className="absolute w-20 h-20 rounded-full"
                style={{
                  border: '2px solid transparent',
                  background: 'linear-gradient(#05050f,#05050f) padding-box, linear-gradient(270deg,#ff6600,#ff0080,#00fff7) border-box',
                }}
                animate={{ rotate: -360 }}
                transition={{ duration: 0.6, repeat: Infinity, ease: 'linear' }}
              />
              {/* Inner core */}
              <motion.div
                className="w-8 h-8 rounded-full"
                style={{
                  background: 'radial-gradient(circle, #ffffff, #00fff7, transparent)',
                  boxShadow: '0 0 20px #00fff7, 0 0 40px #bf00ff',
                }}
                animate={{ scale: [1, 1.4, 1] }}
                transition={{ duration: 0.4, repeat: Infinity }}
              />
            </div>
          </motion.div>

          {/* Helix DNA double spiral lines */}
          {Array.from({ length: 6 }).map((_, i) => (
            <motion.div
              key={`helix-${i}`}
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `linear-gradient(${60 * i}deg, 
                  transparent 45%, 
                  rgba(0,255,247,0.15) 50%, 
                  transparent 55%)`,
              }}
              initial={{ scaleY: 0, opacity: 0 }}
              animate={{
                scaleY: [0, 1, 1],
                opacity: [0, 0.6, 0],
                rotate: [60 * i, 60 * i + 360],
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.7,
                delay: i * 0.04,
                ease: 'easeInOut',
              }}
            />
          ))}
        </motion.div>
      )}
    </AnimatePresence>
  )
}
