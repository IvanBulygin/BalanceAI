import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'
import { useAnimatedCounter } from '../hooks/useAnimatedCounter'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }
  })
}

function StatCard({ target, label }: { target: number; label: string }) {
  const [ref, inView] = useInView({ threshold: 0.5 })
  const value = useAnimatedCounter(target, inView)
  return (
    <div className="stat-card" ref={ref}>
      <strong>{target >= 100 ? Math.floor(value).toLocaleString() : value.toFixed(1)}</strong>
      <span>{label}</span>
    </div>
  )
}

export default function Hero() {
  const [ref, inView] = useInView()

  return (
    <section className="hero" id="hero">
      <div className="container hero-grid" ref={ref}>
        <div className="hero-text">
          <motion.span className="badge" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={0}>
            <span className="badge-dot" />
            Personalized Longevity Platform
          </motion.span>
          <motion.h1 variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={1}>
            Science-Backed<br /><span className="text-gradient">Supplement Guidance</span><br />You Can Trust
          </motion.h1>
          <motion.p className="hero-desc" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={2}>
            1,746 peer-reviewed studies. AI-powered personalization. Duolingo-style habits. One complete loop from discovery to daily routine.
          </motion.p>
          <motion.div className="hero-actions" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={3}>
            <a href="#cta" className="btn btn-primary">
              Get Early Access
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14" /><path d="m12 5 7 7-7 7" /></svg>
            </a>
            <a href="#how-it-works" className="btn btn-glass">See How It Works</a>
          </motion.div>
        </div>
        <motion.div className="hero-visual" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={4}>
          <img src={`${import.meta.env.BASE_URL}swoosh.svg`} alt="" className="swoosh swoosh-hero" aria-hidden="true" />
          <motion.img
            src={`${import.meta.env.BASE_URL}mascot.png`}
            alt="Balance AI mascot"
            className="mascot mascot-hero"
            animate={{
              y: [0, -18, 0],
              rotate: [-3, 3, -3],
              scale: [1, 1.04, 1],
            }}
            transition={{
              duration: 4,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            whileHover={{ scale: 1.12, rotate: 8, transition: { duration: 0.3 } }}
          />
          <div className="phone-mockup">
            <div className="phone-notch" />
            <div className="phone-screen">
              <div className="phone-header"><span>Your AI Research Assistant</span><strong>Balance AI</strong></div>
              <div className="phone-chat">
                <div className="chat-bubble chat-user">What's the best evidence for Vitamin D and immunity?</div>
                <div className="chat-bubble chat-ai">
                  <p>Based on 23 peer-reviewed studies, Vitamin D (1000-4000 IU/day) shows <strong>strong evidence</strong> for immune support...</p>
                  <div className="citation"><span className="grade grade-a">A</span> Martineau et al. - BMJ 2017</div>
                  <div className="citation"><span className="grade grade-b">B</span> Jolliffe et al. - Lancet 2021</div>
                </div>
              </div>
              <div className="phone-action">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="21" r="1" /><circle cx="20" cy="21" r="1" /><path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" /></svg>
                Shop Vitamin D
              </div>
            </div>
          </div>
          <div className="phone-glow" aria-hidden="true" />
        </motion.div>
      </div>

      <motion.div className="stats-bar" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'} custom={5}>
        <div className="container">
          <div className="stats-grid">
            <StatCard target={1746} label="Scientific Sources" />
            <StatCard target={2207} label="AI-Indexed Chunks" />
            <StatCard target={43} label="Supplements Covered" />
            <div className="stat-card">
              <strong className="stat-text">A-F</strong>
              <span>Evidence Grading</span>
            </div>
          </div>
        </div>
      </motion.div>
    </section>
  )
}
