import { motion } from 'framer-motion'

const stats = [
  { v: '7+',  l: 'Years' },
  { v: '150+',l: 'Projects' },
  { v: '40+', l: 'Clients' },
]

const fadeUp = { hidden:{opacity:0,y:24}, show:{opacity:1,y:0,transition:{duration:0.55,ease:'easeOut'}} }

export default function About() {
  return (
    <section id="about" className="relative min-h-screen flex items-center py-32">
      <div className="max-w-5xl mx-auto px-8 grid md:grid-cols-2 gap-20 items-center w-full">

        {/* Left */}
        <motion.div initial="hidden" whileInView="show" viewport={{once:true}}
          variants={{ show: { transition: { staggerChildren: 0.1 } } }}
          className="space-y-7"
        >
          <motion.p variants={fadeUp} className="tag">/ About</motion.p>

          <motion.h2 variants={fadeUp}
            className="font-sans font-bold text-4xl text-light leading-tight"
            style={{ letterSpacing: '-0.02em' }}
          >
            Digital<br /><span className="text-gradient">Alchemist</span>
          </motion.h2>

          <motion.div variants={fadeUp} className="divider w-16" />

          <motion.p variants={fadeUp}
            className="font-sans text-base leading-loose"
            style={{ color: '#7A6882' }}
          >
            I'm DragonLazer — a VFX artist who transforms raw ideas into breathtaking
            visual experiences. Deep passion for the intersection of art and technology,
            conjuring digital worlds that captivate and inspire.
          </motion.p>

          <motion.p variants={fadeUp}
            className="font-sans text-sm leading-loose"
            style={{ color: '#4D3A52' }}
          >
            My work spans film VFX, brand campaigns, game cinematics, and experimental
            digital art. Every project is a new universe to build.
          </motion.p>

          {/* Stats */}
          <motion.div variants={fadeUp} className="flex gap-8 pt-2">
            {stats.map(s => (
              <div key={s.l}>
                <p className="font-sans font-bold text-2xl text-gradient">{s.v}</p>
                <p className="tag mt-0.5">{s.l}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Right: minimal avatar ring */}
        <motion.div
          initial={{ opacity:0, scale:0.9 }}
          whileInView={{ opacity:1, scale:1 }}
          viewport={{ once:true }}
          transition={{ duration:0.7 }}
          className="flex justify-center"
        >
          <div className="relative w-64 h-64 flex items-center justify-center">
            {/* Outer ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 12, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0 rounded-full"
              style={{ border: '1px solid', borderColor: '#38173A' }}
            />
            {/* Inner ring */}
            <motion.div
              animate={{ rotate: -360 }}
              transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-8 rounded-full"
              style={{ border: '1px solid', borderColor: '#6A1F78' }}
            />
            {/* Center content */}
            <div className="relative z-10 flex flex-col items-center gap-1">
              <img src="/Lazer.png" alt="DragonLazer"
                className="w-16 h-16 object-contain"
                style={{ filter: 'drop-shadow(0 0 14px rgba(204,68,255,0.6))' }}
              />
              <span className="tag" style={{ color: '#6A1F78' }}>DL</span>
            </div>
            {/* Orbiting dot */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              className="absolute inset-0"
            >
              <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full"
                style={{ background: '#CC44FF', boxShadow: '0 0 8px #CC44FF' }}
              />
            </motion.div>
          </div>
        </motion.div>

      </div>
    </section>
  )
}
