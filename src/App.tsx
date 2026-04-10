import Nav from './components/Nav'
import Hero from './components/Hero'
import Loop from './components/Loop'
import HowItWorks from './components/HowItWorks'
import Features from './components/Features'
import Compare from './components/Compare'
import Built from './components/Built'
import TechStack from './components/TechStack'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      {/* Animated gradient mesh background */}
      <div className="gradient-mesh" aria-hidden="true">
        <div className="mesh-blob mesh-blob--1" />
        <div className="mesh-blob mesh-blob--2" />
        <div className="mesh-blob mesh-blob--3" />
      </div>
      <div className="grain-overlay" aria-hidden="true" />

      <Nav />
      <Hero />
      <Loop />
      <HowItWorks />
      <Features />
      <Compare />
      <Built />
      <TechStack />
      <CTA />
      <Footer />
    </>
  )
}
