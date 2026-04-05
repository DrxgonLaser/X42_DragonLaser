import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const PARTICLE_COUNT = 60

function randomBetween(a, b) {
  return Math.random() * (b - a) + a
}

function Particle({ id }) {
  const styles = {
    left: `${randomBetween(0, 100)}%`,
    top: `${randomBetween(0, 100)}%`,
    '--delay': `${randomBetween(0, 5)}s`,
    '--duration': `${randomBetween(4, 12)}s`,
    '--size': `${randomBetween(1, 3)}px`,
    '--color': ['#00fff7', '#bf00ff', '#ff0080', '#ff6600', '#00ff88'][Math.floor(Math.random() * 5)],
  }

  return (
    <div
      className="absolute rounded-full pointer-events-none"
      style={{
        ...styles,
        width: 'var(--size)',
        height: 'var(--size)',
        background: 'var(--color)',
        boxShadow: '0 0 6px var(--color), 0 0 12px var(--color)',
        animation: `floatParticle var(--duration) var(--delay) infinite ease-in-out alternate`,
      }}
    />
  )
}

export default function ParticlesBackground() {
  return (
    <>
      <style>{`
        @keyframes floatParticle {
          0%   { transform: translate(0, 0) scale(1); opacity: 0.2; }
          50%  { opacity: 0.9; }
          100% { transform: translate(${Math.random() > 0.5 ? '' : '-'}${Math.floor(randomBetween(20,80))}px, -${Math.floor(randomBetween(40,120))}px) scale(1.5); opacity: 0.1; }
        }
      `}</style>
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        {Array.from({ length: PARTICLE_COUNT }).map((_, i) => (
          <Particle key={i} id={i} />
        ))}
        {/* Grid overlay */}
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(0,255,247,0.03) 1px, transparent 1px),
              linear-gradient(90deg, rgba(0,255,247,0.03) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px',
          }}
        />
        {/* Radial vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 40%, rgba(5,5,15,0.8) 100%)',
          }}
        />
      </div>
    </>
  )
}
