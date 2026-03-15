import { Link } from 'react-router-dom'
import logoImg from '../assets/PRIMAL GAMING.jpeg'

function Footer() {
  const whatsappNumber = '254757255539'

  return (
    <footer className="footer">
      <div className="footer-top">

        {/* Brand Section */}
        <div className="footer-brand">
          <img src={logoImg} alt="Primal Gaming Hub" className="footer-logo" />
          <p className="footer-about">
            Primal Gaming Hub is your ultimate gaming destination in Nairobi.
            We offer the latest consoles, games, controllers, PCs and laptops
            at the best prices. Visit us or order via WhatsApp!
          </p>
          <div className="footer-payment">
            <span className="payment-badge">📱 M-Pesa</span>
            <span className="payment-badge">💵 Cash</span>
          </div>
        </div>

        {/* Quick Links */}
        <div className="footer-section">
          <h3 className="footer-heading">Quick Links</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">› Home</Link></li>
            <li><Link to="/cart" className="footer-link">› Shopping Cart</Link></li>
            <li>
              <a
                href={`https://wa.me/${whatsappNumber}`}
                target="_blank"
                rel="noreferrer"
                className="footer-link"
              >
                › Contact Us
              </a>
            </li>
          </ul>
        </div>

        {/* Categories */}
        <div className="footer-section">
          <h3 className="footer-heading">Top Categories</h3>
          <ul className="footer-links">
            <li><Link to="/" className="footer-link">› Consoles</Link></li>
            <li><Link to="/" className="footer-link">› Games</Link></li>
            <li><Link to="/" className="footer-link">› PCs &amp; Laptops</Link></li>
            <li><Link to="/" className="footer-link">› Controllers</Link></li>
          </ul>
        </div>

        {/* Contact */}
        <div className="footer-section">
          <h3 className="footer-heading">Contact Us</h3>
          <ul className="footer-links">
            <li className="footer-contact-item">
              📍 1st Floor Koinange St, Kenya House Complex, Nairobi
            </li>
            <li className="footer-contact-item">
              📞 <a href={`tel:+${whatsappNumber}`} className="footer-link">+254 757 255 539</a>
            </li>
            <li className="footer-contact-item">
              💬 <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noreferrer" className="footer-link">WhatsApp Us</a>
            </li>
          </ul>
          <div className="footer-social">
            <a
              href="https://www.instagram.com/primalgaminghub/"
              target="_blank"
              rel="noreferrer"
              className="social-btn instagram"
            >
              📸 Instagram
            </a>
            <a
              href={`https://wa.me/${whatsappNumber}`}
              target="_blank"
              rel="noreferrer"
              className="social-btn whatsapp"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Bar */}
      <div className="footer-bottom">
        <p>© 2026 Primal Gaming Hub — All Rights Reserved.</p>
      </div>
    </footer>
  )
}

export default Footer