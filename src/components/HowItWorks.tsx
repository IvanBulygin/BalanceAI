import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

const steps = [
  { num: '01', title: 'Ask Anything About Longevity', desc: 'Our RAG-powered AI retrieves from 1,746 real sources via cosine similarity search, then cites specific papers with confidence scores. Every source graded A through F.', tags: ['RAG + GPT-4o', 'Cosine Similarity'] },
  { num: '02', title: 'Get a Personalized Plan', desc: 'After a quick onboarding quiz about your goals, current supplements, and diet, Balance AI creates a custom daily plan with scheduled reminders and dosage guidance.', tags: ['Custom Plans', 'Smart Dosing'] },
  { num: '03', title: 'Build the Habit, Level Up', desc: 'Earn XP for every supplement taken, article read, and quiz completed. Maintain streaks, unlock achievements, and climb from Beginner to Legend across 10 levels.', tags: ['10 Levels', 'Daily Streaks'] },
]

export default function HowItWorks() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="how-it-works" ref={ref}>
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">How It Works</span>
          <h2>Powered by <span className="text-gradient">Real Science</span></h2>
          <p>Every recommendation is backed by peer-reviewed research — not influencer marketing.</p>
        </motion.header>
        <div className="steps-grid">
          {steps.map((s, i) => (
            <motion.article key={s.num} className="step-card" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i + 1}>
              <div className="step-num">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
              <div className="step-visual">
                {s.tags.map(t => <div key={t} className="step-tag">{t}</div>)}
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
