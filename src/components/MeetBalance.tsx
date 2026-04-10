import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

const mascots = [
  { id: 'meditate', img: 'mascot-meditate.svg', title: 'Center', desc: 'Start calm. Mindful nudges guide your morning routine.' },
  { id: 'play', img: 'mascot-play.svg', title: 'Move', desc: 'Stay active. Playful streaks keep every day in motion.' },
  { id: 'celebrate', img: 'mascot-celebrate.svg', title: 'Celebrate', desc: 'Level up. Every streak, badge and habit earned is a win.' },
]

export default function MeetBalance() {
  const [ref, inView] = useInView()

  return (
    <section className="section meet-section" id="meet" ref={ref}>
      <img src={`${import.meta.env.BASE_URL}swoosh.svg`} alt="" className="swoosh swoosh-meet" aria-hidden="true" />
      <div className="container">
        <motion.header className="section-header" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
          <span className="label">Meet Balance</span>
          <h2>Your <span className="text-gradient">Wellness Buddy</span></h2>
          <p>One companion for every moment — calm mornings, active days, big wins.</p>
        </motion.header>
        <div className="meet-grid">
          {mascots.map((m, i) => (
            <motion.article key={m.id} className={`meet-card meet-card--${m.id}`} variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={i + 1}>
              <div className="meet-visual">
                <img src={`${import.meta.env.BASE_URL}${m.img}`} alt={`Balance ${m.id}`} className="meet-mascot" />
              </div>
              <strong>{m.title}</strong>
              <p>{m.desc}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  )
}
