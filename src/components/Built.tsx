import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.05, duration: 0.5, ease: [0.4, 0, 0.2, 1] }
  })
}

const CheckIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="m9 11 3 3L22 4" /></svg>
)

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10" /><path d="M12 6v6l4 2" /></svg>
)

const items = [
  { done: true, badge: 'Done', title: 'AI Knowledge Base', desc: '1,746 sources from PubMed + Examine.com' },
  { done: true, badge: 'Done', title: 'RAG Chat + Citations', desc: 'GPT-4o, cosine similarity, confidence scores' },
  { done: true, badge: 'Done', title: 'Evidence Grading', desc: 'Gravity scoring: study type, journal, recency' },
  { done: true, badge: 'Done', title: 'Research Library', desc: 'Search + filtering by 6 categories' },
  { done: true, badge: 'Done', title: 'Web App', desc: 'Next.js 15 + React 19, FastAPI backend' },
  { done: true, badge: 'Done', title: 'Data Pipeline', desc: 'Automated ingestion + background processing' },
  { done: false, badge: 'Phase 1', title: 'Auth + Onboarding', desc: 'Supabase auth, progressive profiling' },
  { done: false, badge: 'Phase 2', title: 'PWA + Push', desc: 'Installable app, iOS/Android/desktop' },
  { done: false, badge: 'Phase 3', title: 'Gamification', desc: 'XP, streaks, levels, badges, reminders' },
  { done: false, badge: 'Phase 4', title: 'Commerce', desc: 'InFlow checkout, order tracking, recs' },
]

export default function Built() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="built" ref={ref}>
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">Current Status</span>
          <h2>What's Already <span className="text-gradient">Built</span></h2>
          <p>The hardest parts — AI infrastructure, knowledge base, RAG pipeline, scoring engine — are working today.</p>
        </motion.header>
        <div className="built-grid">
          {items.map((item, i) => (
            <motion.div
              key={item.title}
              className={`built-card ${item.done ? 'built-done' : 'built-planned'}`}
              variants={fadeUp}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              custom={i + 1}
            >
              <span className="built-badge">
                {item.done ? <CheckIcon /> : <ClockIcon />} {item.badge}
              </span>
              <h4>{item.title}</h4>
              <p>{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
