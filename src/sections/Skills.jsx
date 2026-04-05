import { motion } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

const SKILLS = [
  '3D Modelling & Rendering',
  'VFX & Simulation',
  'Texturing & Materials',
  'Environment / Terrain',
  'Compositing & Edit',
  'Motion & Cinematics',
]

const TOOLS = [
  'Blender', 'Unreal Engine', 'Embergen', 'Gaea', 
  'Substance Designer', 'Substance Painter', 
  'Photoshop', 'Premiere Pro', 'JSplacement'
]

export default function Skills() {
  const { enterElement, leaveElement } = useCursor()

  return (
    <section id="skills" className="relative min-h-screen pt-32 pb-16 px-6 overflow-hidden flex flex-col justify-between">
      


      <div className="max-w-7xl mx-auto w-full relative z-10 flex-1 flex flex-col">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 md:mb-24"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted mb-4 hidden md:block">Discipline Overview</p>
          <h2 className="font-sans font-bold text-4xl md:text-7xl text-light tracking-tighter leading-none">
            Proficiencies
          </h2>
        </motion.div>

        {/* ── Massive Layered Skills ── */}
        <div className="flex-1 flex flex-col justify-center space-y-2 md:space-y-0">
          {SKILLS.map((skill, idx) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-fit cursor-none"
              onMouseEnter={() => enterElement('hover')}
              onMouseLeave={leaveElement}
            >
              <h3 
                className="font-sans font-bold text-3xl md:text-6xl lg:text-[5.5rem] leading-[1.1] transition-all duration-500 text-light opacity-60 group-hover:opacity-100 group-hover:translate-x-4"
                style={{ letterSpacing: '-0.03em' }}
              >
                <span className="font-mono text-sm md:text-lg text-electric tracking-widest mr-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  0{idx + 1}
                </span>
                {skill}
              </h3>
              {/* Decorative line underneath that expands on hover */}
              <div 
                className="absolute -bottom-1 left-0 h-[2px] bg-electric origin-left block md:hidden group-hover:md:block"
                style={{ width: 0, transition: 'width 0.4s ease-out', border: 'none' }}
              />
            </motion.div>
          ))}
        </div>

        {/* ── Footer Tools Grid ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 md:mt-0 pt-16 border-t border-white/5 flex flex-col md:flex-row justify-between items-start md:items-end gap-8"
        >
          <div className="max-w-xs">
            <h4 className="font-mono text-[10px] tracking-[0.2em] uppercase text-electric mb-2">Software Stack</h4>
            <p className="font-sans text-xs text-muted leading-relaxed">
              Industrial standard tools deployed for world-building, compositing, and dynamic FX generation.
            </p>
          </div>

          <div className="flex flex-wrap gap-2 md:max-w-3xl justify-start md:justify-end">
            {TOOLS.map(tool => (
              <span 
                key={tool}
                onMouseEnter={() => enterElement('hover')}
                onMouseLeave={leaveElement}
                className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-light border border-white/10 rounded-full hover:border-[#CC44FF] hover:text-[#CC44FF] transition-all duration-300 backdrop-blur-md cursor-none"
                style={{ background: 'rgba(255,255,255,0.02)' }}
              >
                {tool}
              </span>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}
