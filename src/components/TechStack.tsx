import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  })
}

const stack = [
  { label: 'Frontend', value: 'Next.js 15' },
  { label: 'Backend', value: 'FastAPI' },
  { label: 'Database', value: 'Supabase' },
  { label: 'Vectors', value: 'pgvector' },
  { label: 'AI', value: 'GPT-4o' },
  { label: 'Commerce', value: 'InFlow' },
  { label: 'Hosting', value: 'Vercel + Railway' },
  { label: 'Revenue', value: '3% / tx' },
]

export default function TechStack() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="tech" ref={ref}>
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">Tech Stack</span>
          <h2>Lean & <span className="text-gradient">Modern</span></h2>
          <p>Launch cost ~$20-50/month. At 10K users ~$200-500/month.</p>
        </motion.header>
        <div className="tech-grid">
          {stack.map((s, i) => (
            <motion.div key={s.label} className="tech-card" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i + 1}>
              <span>{s.label}</span>
              <strong>{s.value}</strong>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
