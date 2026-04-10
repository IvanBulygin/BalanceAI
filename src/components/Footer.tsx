import { motion } from 'framer-motion'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <motion.img
          src={`${import.meta.env.BASE_URL}mascot.png`}
          alt="Balance AI mascot"
          className="mascot mascot-footer"
          animate={{
            rotate: [0, 5, -5, 0],
          }}
          transition={{
            duration: 3,
            ease: 'easeInOut',
            repeat: Infinity,
          }}
          whileHover={{ scale: 1.2, rotate: 15, transition: { duration: 0.3, type: 'spring' } }}
        />
        <a href="#" className="logo">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Balance AI" className="logo-img" />
        </a>
        <p className="footer-tagline">your wellness buddy</p>
        <p className="footer-copy">&copy; 2026 Balance AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
