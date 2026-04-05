import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useCursor } from '../context/CursorContext'

const socials = [
  { label: 'YouTube', handle: 'DragonLaser VFX', href: 'https://www.youtube.com/channel/UCAiSJdRiV8rw9eDZH9V8piA', color: '#9200FF' },
]

export default function Contact() {
  const { enterElement, leaveElement } = useCursor()
  const [showForm, setShowForm] = useState(false)
  const [form, setForm]   = useState({ name: '', email: '', project: '', message: '' })
  const [sent, setSent]   = useState(false)

  const onChange = e => setForm({ ...form, [e.target.name]: e.target.value })
  const onSubmit = e => {
    e.preventDefault()
    
    // Constructing the direct mailto string with form encoding
    const subject = encodeURIComponent(`DragonLaser Project - ${form.project}`)
    const body = encodeURIComponent(
      `Name: ${form.name}\n` +
      `Email Reference: ${form.email}\n` +
      `Project Scope: ${form.project}\n\n` +
      `---------------------------------\n` +
      `Message:\n${form.message}`
    )
    
    window.location.href = `mailto:blendergobrrr@proton.me?subject=${subject}&body=${body}`
    
    setSent(true)
    setForm({ name: '', email: '', project: '', message: '' })
    setTimeout(() => { setSent(false); setShowForm(false); }, 4000)
  }

  return (
    <section id="contact" className="relative min-h-screen flex items-center justify-center p-6 overflow-hidden">
      
      {/* ── Massive Background Type ── */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.03]">
        <h1 
          className="font-sans font-black whitespace-nowrap text-light tracking-tighter"
          style={{ fontSize: 'min(40vw, 600px)', transform: 'translateY(-5%)' }}
        >
          HELLO
        </h1>
      </div>

      <div className="relative z-10 w-full max-w-7xl flex flex-col items-center text-center">
        
        {/* Main CTA Lockup */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center gap-6"
        >
          <p className="font-mono text-xs tracking-[0.3em] uppercase text-muted">Let's build a universe.</p>
          
          <h2 
            className="font-sans font-bold text-5xl md:text-8xl lg:text-[8rem] leading-[0.9] text-light tracking-tighter hover:text-electric transition-colors duration-500 cursor-none"
            onMouseEnter={() => enterElement('text', 'MAIL')}
            onMouseLeave={leaveElement}
            onClick={() => window.location.href = 'mailto:blendergobrrr@proton.me'}
          >
            SAY <br className="md:hidden" /> HELLO
          </h2>

          <div className="h-px w-24 bg-electric/30 mt-4 mb-2" />

          {!showForm && (
            <motion.button
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="btn-primary mt-4"
              onMouseEnter={() => enterElement('hover')}
              onMouseLeave={leaveElement}
              onClick={() => setShowForm(true)}
            >
              Start a Project
            </motion.button>
          )}

        </motion.div>

        {/* ── Sliding Ultra-Minimal Form ── */}
        <AnimatePresence>
          {showForm && (
            <motion.div
              initial={{ height: 0, opacity: 0, marginTop: 0 }}
              animate={{ height: 'auto', opacity: 1, marginTop: 40 }}
              exit={{ height: 0, opacity: 0, marginTop: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-2xl overflow-hidden"
            >
              <div 
                className="p-8 md:p-12 backdrop-blur-2xl bg-black/20 border border-white/5"
                style={{ boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}
              >
                {sent ? (
                  <motion.div
                    initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                    className="flex flex-col items-center justify-center py-12"
                  >
                    <svg className="w-12 h-12 text-electric mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <h3 className="font-sans text-2xl text-light tracking-widest font-bold">TRANSMISSION SENT</h3>
                    <p className="font-mono text-xs text-muted mt-2 tracking-widest">Expect a reply within 24-48 cycles.</p>
                  </motion.div>
                ) : (
                  <form onSubmit={onSubmit} className="flex flex-col gap-8 text-left">
                    <div className="flex justify-between items-center mb-4">
                      <h3 className="font-sans text-xl text-light font-bold tracking-widest">PROJECT DETAILS</h3>
                      <button 
                        type="button" 
                        onClick={() => setShowForm(false)}
                        onMouseEnter={() => enterElement('hover')}
                        onMouseLeave={leaveElement}
                        className="font-mono text-[10px] tracking-widest text-muted hover:text-light transition-colors uppercase"
                      >
                        [ Close ]
                      </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8">
                      {['name', 'email'].map(field => (
                        <div key={field} className="relative group">
                          <input
                            type={field === 'email' ? 'email' : 'text'}
                            name={field} value={form[field]} onChange={onChange} required
                            className="w-full bg-transparent border-b border-white/10 px-0 py-3 font-sans text-lg text-light focus:outline-none focus:border-electric transition-colors peer cursor-none"
                            onMouseEnter={() => enterElement('text', 'TYPE')}
                            onMouseLeave={leaveElement}
                            placeholder=" "
                          />
                          <label className="absolute left-0 top-3 font-mono text-xs tracking-widest text-muted uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-electric peer-valid:-top-4 peer-valid:text-[9px]">
                            {field}
                          </label>
                        </div>
                      ))}
                    </div>

                    <div className="relative group">
                      <input
                        type="text" name="project" value={form.project} onChange={onChange} required
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 font-sans text-lg text-light focus:outline-none focus:border-electric transition-colors peer cursor-none"
                        onMouseEnter={() => enterElement('text', 'TYPE')}
                        onMouseLeave={leaveElement}
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-3 font-mono text-xs tracking-widest text-muted uppercase transition-all duration-300 pointer-events-none peer-focus:-top-4 peer-focus:text-[9px] peer-focus:text-electric peer-valid:-top-4 peer-valid:text-[9px]">
                        Project Type & Budget
                      </label>
                    </div>

                    <div className="relative group pt-4">
                      <textarea
                        name="message" value={form.message} onChange={onChange} required rows={3}
                        className="w-full bg-transparent border-b border-white/10 px-0 py-3 font-sans text-lg text-light focus:outline-none focus:border-electric transition-colors peer resize-none cursor-none"
                        onMouseEnter={() => enterElement('text', 'TYPE')}
                        onMouseLeave={leaveElement}
                        placeholder=" "
                      />
                      <label className="absolute left-0 top-7 font-mono text-xs tracking-widest text-muted uppercase transition-all duration-300 pointer-events-none peer-focus:top-0 peer-focus:text-[9px] peer-focus:text-electric peer-valid:top-0 peer-valid:text-[9px]">
                        Message
                      </label>
                    </div>

                    <button 
                      type="submit" 
                      className="btn-primary w-full mt-4"
                      onMouseEnter={() => enterElement('hover')}
                      onMouseLeave={leaveElement}
                    >
                      Initialize Contact
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ── Footer Socials ── */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
          className="absolute bottom-8 inset-x-0 w-full px-8 flex flex-col md:flex-row items-center justify-between pointer-events-none"
        >
          <div className="flex gap-6 pointer-events-auto mix-blend-difference mb-4 md:mb-0">
            {socials.map(s => (
              <a 
                key={s.label} href={s.href} 
                className="font-mono text-[9px] tracking-widest uppercase text-light hover:text-electric transition-colors"
                onMouseEnter={() => enterElement('hover')}
                onMouseLeave={leaveElement}
              >
                {s.label}
              </a>
            ))}
          </div>

          <p className="font-mono text-[9px] tracking-[0.2em] uppercase text-muted">
            © 2026 DragonLaser
          </p>
        </motion.div>

      </div>
    </section>
  )
}
