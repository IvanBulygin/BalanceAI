import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

const rows = [
  ['AI Chat', 'Generic, no citations', '-', '-', 'Cited, evidence-graded'],
  ['Research', 'Hallucination risk', 'Yes (paid)', '-', 'Free, AI-summarized'],
  ['Personalization', 'No user profile', '-', 'Basic', 'Goals + progressive profiling'],
  ['Reminders', '-', '-', 'Basic', 'Push + schedule'],
  ['Gamification', '-', '-', 'Basic', 'Full Duolingo model'],
  ['Commerce', '-', 'Affiliate links', '-', 'In-app checkout'],
  ['Mobile App', '-', '-', 'Native', 'PWA (installable)'],
]

export default function Compare() {
  const [ref, inView] = useInView()

  return (
    <section className="section" id="compare" ref={ref}>
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">Market Position</span>
          <h2>How We <span className="text-gradient">Stack Up</span></h2>
          <p>Balance AI is the only platform combining cited AI, gamification, and commerce.</p>
        </motion.header>
        <motion.div className="table-wrap" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
          <table className="compare-table">
            <thead>
              <tr>
                <th>Feature</th><th>ChatGPT</th><th>Examine.com</th><th>MyFitnessPal</th><th className="col-hl">Balance AI</th>
              </tr>
            </thead>
            <tbody>
              {rows.map(([feature, gpt, exam, mfp, bal]) => (
                <tr key={feature}>
                  <td>{feature}</td>
                  <td className={gpt === '-' || gpt.includes('no') || gpt.includes('Generic') || gpt.includes('Hallucination') || gpt.includes('No') ? 'muted' : ''}>{gpt}</td>
                  <td className={exam === '-' ? 'muted' : ''}>{exam}</td>
                  <td className={mfp === '-' ? 'muted' : ''}>{mfp}</td>
                  <td className="col-hl highlight">{bal}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  )
}
