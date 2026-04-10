import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '../hooks/useInView'

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } }
}

export default function CTA() {
  const [ref, inView] = useInView()
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
    setTimeout(() => setSubmitted(false), 3500)
  }

  return (
    <section className="cta-section" id="cta" ref={ref}>
      <img src={`${import.meta.env.BASE_URL}swoosh.svg`} alt="" className="swoosh swoosh-cta" aria-hidden="true" />
      <div className="container">
        <motion.div className="cta-inner" variants={fadeUp} initial="hidden" animate={inView ? 'visible' : 'hidden'}>
          <motion.img
            src={`${import.meta.env.BASE_URL}mascot.png`}
            alt="Balance AI mascot"
            className="mascot mascot-cta"
            animate={{
              y: [0, -14, -10, 0],
              scale: [1, 1.06, 1.03, 1],
            }}
            transition={{
              duration: 2.5,
              ease: 'easeInOut',
              repeat: Infinity,
            }}
            whileHover={{ scale: 1.15, y: -20, transition: { duration: 0.3, type: 'spring' } }}
          />
          <h2>Ready to Build the Future of <span className="text-gradient">Wellness</span>?</h2>
          <p>The AI infrastructure is built. The product vision is clear. Let's bring science-backed wellness to everyone.</p>
          <form className="cta-form" onSubmit={handleSubmit}>
            <div className="input-row">
              <label htmlFor="cta-email" className="sr-only">Email address</label>
              <input id="cta-email" type="email" placeholder="Enter your email for early access" required />
              <button
                type="submit"
                className="btn btn-primary"
                style={submitted ? { background: 'linear-gradient(135deg, #6E79FF, #3FA0F5)' } : undefined}
              >
                {submitted ? 'Welcome aboard!' : 'Get Early Access'}
              </button>
            </div>
          </form>
          <p className="cta-fine">Free during beta &middot; No spam &middot; Cancel anytime</p>
        </motion.div>
      </div>
    </section>
  )
}
