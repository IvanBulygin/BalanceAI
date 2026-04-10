export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-inner">
        <img src={`${import.meta.env.BASE_URL}mascot-meditate.svg`} alt="Balance AI mascot" className="mascot mascot-footer" />
        <a href="#" className="logo">
          <img src={`${import.meta.env.BASE_URL}logo.png`} alt="Balance AI" className="logo-img" />
        </a>
        <p className="footer-tagline">your wellness buddy</p>
        <p className="footer-copy">&copy; 2026 Balance AI. All rights reserved.</p>
      </div>
    </footer>
  )
}
