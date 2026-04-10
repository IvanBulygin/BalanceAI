import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

const steps = [
  { num: '01', title: 'Learn', desc: 'AI chat with cited research', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8" /><path d="m21 21-4.3-4.3" /></svg> },
  { num: '02', title: 'Personalize', desc: 'Matched to your goals', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" /><circle cx="12" cy="7" r="4" /></svg> },
  { num: '03', title: 'Purchase', desc: 'In-app checkout via InFlow', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg> },
  { num: '04', title: 'Remind', desc: 'Push notifications + schedule', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" /><path d="M13.73 21a2 2 0 0 1-3.46 0" /></svg> },
  { num: '05', title: 'Track', desc: 'Daily checklist + XP', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" /><path d="m9 11 3 3L22 4" /></svg> },
  { num: '06', title: 'Level Up', desc: 'Streaks, badges, reorder', icon: <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" /></svg> },
]

export default function Loop() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="loop" ref={ref}>
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">The Complete Loop</span>
          <h2>From Discovery to <span className="text-gradient">Daily Habit</span></h2>
          <p>Most supplement apps do one thing. Balance AI closes the entire loop — no competitor offers this journey.</p>
        </motion.header>
        <div className="loop-track">
          {steps.map((s, i) => (
            <motion.div key={s.num} className="loop-card" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i + 1}>
              <div className="loop-num">{s.num}</div>
              <div className="loop-icon">{s.icon}</div>
              <strong>{s.title}</strong>
              <span>{s.desc}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
