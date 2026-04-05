import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function IntroAnimation({ onComplete }) {
  const [isFadingOut, setIsFadingOut] = useState(false)

  // Safety fallback in case the video fails to load, is blocked, or stalls.
  // Assumes the video is reasonably short; if longer, this could be adjusted. 
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isFadingOut) startFadeOut()
    }, 15000)
    return () => clearTimeout(timer)
  }, [isFadingOut])

  const startFadeOut = () => {
    setIsFadingOut(true)
    setTimeout(() => {
      onComplete()
    }, 800) // Allow Framer Motion exit animation to finish
  }

  return (
    <AnimatePresence>
      {!isFadingOut && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeInOut" }}
          className="fixed inset-0 z-[9999] bg-[#070308] flex items-center justify-center pointer-events-auto"
        >
          <video
            src="/resources/Intro/Dragon_Laser_Logo_Animation.mp4"
            autoPlay
            muted
            playsInline
            onEnded={startFadeOut}
            onError={startFadeOut} // immediately close on error
            className="w-full h-full object-cover lg:object-contain object-center"
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
