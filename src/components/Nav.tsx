import { useState, useEffect } from 'react'

export default function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    setMobileOpen(false)
  }

  return (
    <nav className={`nav${scrolled ? ' nav--scrolled' : ''}`}>
      <div className="nav-inner">
        <a href="#" className="logo" aria-label="Balance AI Home">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Balance AI" className="logo-img" />
        </a>
        <div className={`nav-links${mobileOpen ? ' open' : ''}`}>
          <a onClick={() => scrollTo('meet')}>Meet Balance</a>
          <a onClick={() => scrollTo('how-it-works')}>How It Works</a>
          <a onClick={() => scrollTo('features')}>Features</a>
          <a onClick={() => scrollTo('compare')}>Compare</a>
          <a onClick={() => scrollTo('built')}>Status</a>
          <a onClick={() => scrollTo('cta')} className="nav-cta">Get Early Access</a>
        </div>
        <button className="nav-toggle" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">
          <span /><span /><span />
        </button>
      </div>
    </nav>
  )
}
