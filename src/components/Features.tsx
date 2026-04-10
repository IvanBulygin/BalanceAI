import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

const features = [
  {
    size: 'large', accent: '#E918DA', tag: 'Working MVP', tagClass: 'tag-done',
    title: 'RAG-Powered AI Chat',
    desc: 'Every answer retrieves from 1,746 real sources, cites specific papers with confidence scores and medical disclaimers.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>,
  },
  {
    size: '', accent: '#6E79FF', tag: 'Working MVP', tagClass: 'tag-done',
    title: 'Evidence Grading (A-F)',
    desc: 'Every source scored by study type, journal credibility, and recency. Transparent quality grades.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
  },
  {
    size: '', accent: '#3FA0F5', tag: 'Phase 3', tagClass: 'tag-planned',
    title: 'Duolingo-Style Gamification',
    desc: 'XP for every action, 10 levels, daily streaks with freezes, achievement badges, and level-up celebrations.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg>,
  },
  {
    size: 'wide', accent: '#8EDFF7', tag: 'Phase 4', tagClass: 'tag-planned',
    title: 'In-App Commerce via InFlow',
    desc: 'Curated supplement shop personalized to each user. InFlow handles payment and fulfillment. Revenue: 3% per transaction — no inventory risk.',
    icon: <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="1" y="4" width="22" height="16" rx="2" ry="2" /><path d="M1 10h22" /></svg>,
  },
]

export default function Features() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="features" ref={ref}>
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">Features</span>
          <h2>Why <span className="text-gradient">Balance AI</span> Wins</h2>
          <p>A unique combination no competitor offers: science-backed AI + habit gamification + frictionless commerce.</p>
        </motion.header>
        <div className="bento-grid">
          {features.map((f, i) => (
            <motion.article
              key={f.title}
              className={`bento-card${f.size ? ` bento-card--${f.size}` : ''}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <div className="bento-icon" style={{ '--accent': f.accent } as React.CSSProperties}>{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <span className={`feature-tag ${f.tagClass}`}>{f.tag}</span>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
