import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

const SKILLS = [
  { name: '3D Modelling & Rendering', desc: 'Crafting high-fidelity hard-surface models, organic sculpts, and exact physically accurate ray-traced lighting.' },
  { name: 'VFX & Simulation', desc: 'Engineering complex volumetric pyrotechnics, fluid dynamics, and rigid-body destruction mechanics.' },
  { name: 'Texturing & Materials', desc: 'Authoring procedural mathematical node-graphs and painting hyper-realistic PBR surface shaders.' },
  { name: 'Environment / Terrain', desc: 'Generating massive-scale geological topologies and populating ecologically accurate biomes.' },
  { name: 'Compositing', desc: 'Integrating multi-pass CG renders into raw plates with flawless optical matching and temporal color grading.' },
]

const TOOLS = [
  { name: 'Blender', icon: 'https://cdn.simpleicons.org/blender/white', desc: 'Primary 3D modeling, asset creation, and animation suite.' },
  { name: 'Unreal Engine', icon: 'https://cdn.simpleicons.org/unrealengine/white', desc: 'Real-time 3D environment creation and cinematic rendering.' },
  { name: 'Embergen', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M12 2c0 0-4 4-4 9s4 9 4 9 6-4 6-9-6-9-6-9zm0 15c-1.66 0-3-1.34-3-3s3-6 3-6 3 4.34 3 6-1.34 3-3 3z'/%3E%3C/svg%3E", desc: 'Real-time volumetric fluid, smoke, and fire simulations.' },
  { name: 'Gaea', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M14 6l-3.75 5 2.85 3.8-1.6 1.2C9.8 13.75 7 10 7 10l-6 8h22L14 6z'/%3E%3C/svg%3E", desc: 'Advanced procedural terrain generation and thermal erosion.' },
  { name: 'Substance Designer', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19 3v4h-2V5h-2V3h4zM5 5v2H3V3h4v2H5zm14 14v-2h2v4h-4v-2h2zM5 19v-2h2v2H3v-4h2v2zM15 9h-6v6h6V9z'/%3E%3C/svg%3E", desc: 'Procedural node-based material authoring and texturing.' },
  { name: 'Substance Painter', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M19.14,7.5A2.86,2.86,0,0,1,15,4.86L6.5,13.36,5,19l5.64-1.5ZM5.5,18.5l-.36-.36.71-2.61,2.26,2.26Z'/%3E%3C/svg%3E", desc: 'Advanced 3D model painting, masking, and surface detailing.' },
  { name: 'Photoshop', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='5' y='5' width='90' height='90' rx='20' fill='none' stroke='white' stroke-width='8'/%3E%3Ctext x='50' y='54' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='45' fill='white'%3EPs%3C/text%3E%3C/svg%3E", desc: 'Digital painting, matte creation, and image compositing.' },
  { name: 'Premiere Pro', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect x='5' y='5' width='90' height='90' rx='20' fill='none' stroke='white' stroke-width='8'/%3E%3Ctext x='50' y='54' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-weight='bold' font-size='45' fill='white'%3EPr%3C/text%3E%3C/svg%3E", desc: 'Non-linear video editing, sequence assembly, and timing.' },
  { name: 'JSplacement', icon: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='white'%3E%3Cpath d='M3 3h8v8H3zm10 0h8v4h-8zm0 6h4v12h-4zm6 0h2v12h-2zM3 13h8v8H3z'/%3E%3C/svg%3E", desc: 'Procedural highly-detailed greeble texture generation.' },
]

function ToolItem({ tool, enterElement, leaveElement }) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div 
      className="relative flex items-center justify-center cursor-none"
      onMouseEnter={() => { setIsHovered(true); enterElement('hover') }}
      onMouseLeave={() => { setIsHovered(false); leaveElement() }}
    >
      <span 
        className="px-4 py-2 font-mono text-[10px] tracking-widest uppercase text-light border border-white/10 rounded-full hover:border-[#9200FF] transition-all duration-300 backdrop-blur-md"
        style={{ background: 'rgba(255,255,255,0.02)', color: isHovered ? '#9200FF' : '' }}
      >
        {tool.name}
      </span>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 5, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute bottom-full mb-3 left-1/2 -translate-x-1/2 w-64 p-4 rounded bg-[#0a0012]/95 border border-white/10 backdrop-blur-xl shadow-2xl pointer-events-none z-50 flex items-start gap-4"
          >
            <img 
              src={tool.icon} 
              alt={tool.name} 
              className="w-8 h-8 object-contain shrink-0"
              onError={(e) => e.target.style.display = 'none'}
            />
            <div className="flex flex-col gap-1 text-left">
              <span className="font-mono text-[10px] tracking-widest uppercase text-[#9200FF]">{tool.name}</span>
              <p className="font-sans text-[11px] leading-relaxed text-[#EDE6F5] m-0" style={{ color: '#EDE6F5' }}>{tool.desc}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

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
        <div className="flex-1 flex flex-col justify-center items-start space-y-8 md:space-y-4 lg:space-y-6 w-full">
          {SKILLS.map((skill, idx) => (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: idx * 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="relative group w-full flex flex-col items-start lg:flex-row lg:justify-between lg:items-center cursor-none text-left"
              onMouseEnter={() => enterElement('hover')}
              onMouseLeave={leaveElement}
            >
              <h3 
                className="font-sans font-bold text-left text-2xl md:text-4xl lg:text-[3.2rem] xl:text-[3.8rem] leading-[1.2] lg:leading-[1.1] transition-all duration-500 text-light opacity-60 group-hover:opacity-100 group-hover:translate-x-4 w-fit"
                style={{ letterSpacing: '-0.03em' }}
              >
                <span className="font-mono text-sm md:text-lg text-[#9200FF] tracking-widest mr-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  0{idx + 1}
                </span>
                {skill.name}
              </h3>
              
              {/* Editorial Description Panel (Right Aligned) */}
              <div className="opacity-0 group-hover:opacity-100 transition-all duration-500 lg:-translate-x-4 group-hover:translate-x-0 w-full lg:w-80 lg:text-right mt-2 lg:mt-0 pointer-events-none hidden md:block">
                <p className="font-sans text-xs leading-relaxed text-[#EDE6F5]/80">{skill.desc}</p>
              </div>

              {/* Decorative line underneath that expands on hover */}
              <div 
                className="absolute -bottom-1 left-0 h-[2px] bg-[#9200FF] origin-left block lg:hidden group-hover:md:block"
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
              <ToolItem 
                key={tool.name} 
                tool={tool} 
                enterElement={enterElement} 
                leaveElement={leaveElement} 
              />
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  )
}
