import { useRef, useCallback, useState } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'

import Navbar           from './components/Navbar'
import LaserBackground  from './components/LaserBackground'
import IrisShutter      from './components/IrisShutter'
import PageTransition   from './components/PageTransition'
import IntroAnimation   from './components/IntroAnimation'

import Hero    from './sections/Hero'
import Gallery from './sections/Gallery'
import Skills  from './sections/Skills'
import Contact from './sections/Contact'

import { CursorProvider } from './context/CursorContext'

function Layout() {
  const location = useLocation()
  const isHero = location.pathname === '/'

  const [shutterActive, setShutterActive] = useState(false)
  const pendingPath = useRef(null)
  const transitioning = useRef(false)

  const handleNav = useCallback((path) => {
    if (path === location.pathname || transitioning.current) return
    pendingPath.current = path
    transitioning.current = true
    setShutterActive(true)
  }, [location.pathname])

  const onMidpoint = useCallback(() => {
    // Navigate happens via IrisShutter midpoint — we imperatively push history
    if (pendingPath.current) {
      window.history.pushState({}, '', pendingPath.current)
      window.dispatchEvent(new PopStateEvent('popstate'))
    }
    setTimeout(() => {
      setShutterActive(false)
      transitioning.current = false
      pendingPath.current = null
    }, 650)
  }, [])

  return (
    <div className="app-root" style={{ background: '#070308', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Laser BG only on non-hero pages */}
      {!isHero && <LaserBackground />}

      <Navbar active={location.pathname} onNav={handleNav} />
      <IrisShutter isActive={shutterActive} onMidpoint={onMidpoint} />

      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"         element={<PageTransition><Hero /></PageTransition>} />
          <Route path="/gallery"  element={<PageTransition><Gallery /></PageTransition>} />
          <Route path="/skills"   element={<PageTransition><Skills /></PageTransition>} />
          <Route path="/contact"  element={<PageTransition><Contact /></PageTransition>} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}

export default function App() {
  const [showIntro, setShowIntro] = useState(() => !sessionStorage.getItem('introPlayed'))

  const handleIntroComplete = () => {
    sessionStorage.setItem('introPlayed', 'true')
    setShowIntro(false)
  }

  return (
    <CursorProvider>
      {showIntro && <IntroAnimation onComplete={handleIntroComplete} />}
      <BrowserRouter>
        <Layout />
      </BrowserRouter>
    </CursorProvider>
  )
}
