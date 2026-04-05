import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const projects = [
  { id:1, title:'Nebula Storm',      cat:'Film VFX',         desc:'Hyper-realistic space nebula sequence for an indie sci-fi feature using Houdini fluid dynamics.',    tags:['Houdini','Nuke','VFX'],          color:'#9200FF' },
  { id:2, title:'Chromatic Pulse',   cat:'Motion Graphics',  desc:'Reactive brand identity reveal for a global tech company — pulse animations synced to audio data.', tags:['After Effects','Cinema 4D'],     color:'#9200FF' },
  { id:3, title:'Dragon Fire VFX',   cat:'Game Cinematic',   desc:'Real-time fire & smoke for an AAA game cinematic trailer using Niagara particle systems.',           tags:['Unreal Engine','Niagara'],       color:'#9200FF' },
  { id:4, title:'Neon Metropolis',   cat:'Digital Art',      desc:'Procedurally generated cyberpunk cityscape with volumetric atmospheric lighting.',                   tags:['Blender','Cycles'],             color:'#9200FF' },
  { id:5, title:'Quantum Glitch',    cat:'Experimental',     desc:'Generative data-driven art installation exploring chaos theory via real-time GLSL shaders.',         tags:['TouchDesigner','GLSL'],         color:'#9200FF' },
  { id:6, title:'Eclipse Sequence',  cat:'Commercial VFX',   desc:'Award-winning VFX sequence blending practical photography with digital environments.',               tags:['Nuke','DaVinci'],               color:'#9200FF' },
]

const card = {
  hidden: { opacity:0, y:20 },
  show:   { opacity:1, y:0, transition:{ duration:0.45, ease:'easeOut' } },
  exit:   { opacity:0, scale:0.95, transition:{ duration:0.25 } },
}

const fadeUp = { hidden:{opacity:0,y:20}, show:{opacity:1,y:0,transition:{duration:0.5}} }

export default function Projects() {
  const [filter, setFilter] = useState('All')
  const cats = ['All', ...new Set(projects.map(p => p.cat))]
  const shown = filter === 'All' ? projects : projects.filter(p => p.cat === filter)

  return (
    <section id="projects" className="relative py-32">
      <div className="max-w-5xl mx-auto px-8 space-y-12">

        <motion.div initial="hidden" whileInView="show" viewport={{once:true}}
          variants={{ show:{ transition:{ staggerChildren:0.09 } } }}
          className="space-y-4"
        >
          <motion.p variants={fadeUp} className="tag">/ Selected Work</motion.p>
          <motion.h2 variants={fadeUp}
            className="font-sans font-bold text-4xl text-light" style={{ letterSpacing:'-0.02em' }}>
            The <span className="text-gradient">Portfolio</span>
          </motion.h2>
          <motion.div variants={fadeUp} className="divider w-16" />
        </motion.div>

        {/* Filters */}
        <motion.div initial={{ opacity:0 }} whileInView={{ opacity:1 }}
          viewport={{once:true}} transition={{ delay:0.2 }}
          className="flex flex-wrap gap-2"
        >
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              className="font-mono text-xs tracking-widest uppercase px-3 py-1.5 border transition-colors duration-200"
              style={{
                borderColor: filter === c ? '#9200FF' : '#1D0033',
                color:        filter === c ? '#9200FF' : '#7A6882',
                background:   filter === c ? 'rgba(204,68,255,0.07)' : 'transparent',
              }}
            >{c}</button>
          ))}
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          <AnimatePresence mode="popLayout">
            {shown.map(p => (
              <motion.div key={p.id} layout variants={card} initial="hidden" animate="show" exit="exit"
                className="card p-6 space-y-4 group"
                style={{ transition: 'border-color 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.borderColor = p.color + '66'}
                onMouseLeave={e => e.currentTarget.style.borderColor = 'rgba(56,23,58,0.6)'}
              >
                <div style={{ color: p.color }} className="font-mono text-xs tracking-widest uppercase">{p.cat}</div>
                <h3 className="font-sans font-semibold text-lg text-light leading-snug">{p.title}</h3>
                <p className="font-sans text-sm leading-relaxed" style={{ color: '#7A6882' }}>{p.desc}</p>
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {p.tags.map(t => (
                    <span key={t} className="font-mono text-xs px-2 py-0.5 border border-[#1D0033] text-[#4D3A52]">{t}</span>
                  ))}
                </div>
                {/* Bottom accent */}
                <div className="h-px w-0 group-hover:w-full transition-all duration-500"
                  style={{ background: `linear-gradient(90deg, ${p.color}, transparent)` }} />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

      </div>
    </section>
  )
}
