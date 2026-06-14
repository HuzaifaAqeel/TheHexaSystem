import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { useScrollEffects } from "./hooks";
import "./styles.css";

import { CmsProvider } from "./contexts/CmsContext";
import { AuthProvider } from "./contexts/AuthContext";
import AdminApp from "./admin/AdminApp";

import Home from "./pages/Home";
import Services from "./pages/Services";
import Portfolio from "./pages/Portfolio";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BookCall from "./pages/BookCall";

function Layout({ children }: { children: React.ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const activePath = location.pathname;

  useScrollEffects();

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="site-bg" aria-hidden="true" />
      <button className="menu-scrim" type="button" aria-label="Close menu" onClick={closeMenu} />
      <header className="topbar">
        <nav className="nav-pill" aria-label="Primary navigation">
          <Link className="brand" to="/" onClick={closeMenu}>
            <img src="/logo.png" alt="TheHexaSystem" className="brand-logo" />
          </Link>
          <button className="menu-button" type="button" aria-label="Toggle menu" aria-expanded={menuOpen} onClick={() => setMenuOpen((v) => !v)}>
            <span /><span /><span />
          </button>
          <div className="nav-links">
            <Link className={activePath === "/" ? "active" : ""} to="/" onClick={closeMenu}>Home</Link>
            <Link className={activePath === "/services" ? "active" : ""} to="/services" onClick={closeMenu}>Services</Link>
            <Link className={activePath === "/about" ? "active" : ""} to="/about" onClick={closeMenu}>About</Link>
            <Link className={activePath === "/portfolio" ? "active" : ""} to="/portfolio" onClick={closeMenu}>Portfolio</Link>
            <Link className={activePath === "/contact" ? "active" : ""} to="/contact" onClick={closeMenu}>Contact</Link>
          </div>
          <Link className="signin" to="/book-call" onClick={closeMenu}>
            Book Strategy Call <span className="nav-arrow" aria-hidden="true" />
          </Link>
        </nav>
      </header>

      <main>{children}</main>

      <footer className="footer section-dark">
        <div className="footer-grid">
          <div className="footer-brand-card">
            <h2 className="brand-heading">HEXASYSTEM</h2>
            <div className="brand-card-content">
              <h3>INTELLIGENT SYSTEMS THAT<br />TRANSFORM YOUR BUSINESS.</h3>
              <div className="brand-card-bottom">
                <span className="stay-connected">Stay connected!</span>
                <div className="socials" aria-label="Stay connected">
                  <a href="#" aria-label="Email"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg></a>
                  <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path></svg></a>
                  <a href="#" aria-label="GitHub"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg></a>
                  <a href="#" aria-label="LinkedIn"><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path><rect x="2" y="9" width="4" height="12"></rect><circle cx="4" cy="4" r="2"></circle></svg></a>
                </div>
              </div>
            </div>
          </div>
          <div className="footer-links">
            <div>
              <h3 className="calligraphic-heading">Services</h3>
              <Link to="/services">AI CHATBOTS</Link>
              <Link to="/services">VOICE AGENTS</Link>
              <Link to="/services">AUTOMATION</Link>
              <Link to="/services">LEAD GENERATION</Link>
              <Link to="/services">WEB DEVELOPMENT</Link>
            </div>
            <div>
              <h3 className="calligraphic-heading">Company</h3>
              <Link to="/about">ABOUT</Link>
              <Link to="/portfolio">PORTFOLIO</Link>
              <Link to="/contact">CONTACT</Link>
              <Link to="/admin">ADMIN</Link>
            </div>
          </div>
          <div className="footer-newsletter">
            <div className="footer-logo-wrapper">
              <img src="/logo.png" alt="TheHexaSystem" className="brand-logo footer-logo" />
              <span className="get-started-text">Get started! <span className="arrow">↗</span></span>
            </div>
            <div className="newsletter-content">
              <p className="kicker-small">ai moves fast.</p>
              <h2>stay ahead with thehexasystem.</h2>
              <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
                <input type="email" placeholder="ENTER EMAIL ADDRESS" aria-label="Email address" required />
                <button className="button button-lime" type="submit">SUBSCRIBE</button>
              </form>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="copyright">© 2026 THEHEXASYSTEM. ALL RIGHTS RESERVED.</p>
        </div>
        <div className="footer-giant-text">HEXASYSTEM</div>
      </footer>
    </>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <CmsProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/admin" element={<AdminApp />} />
            <Route path="*" element={
              <Layout>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/services" element={<Services />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/portfolio" element={<Portfolio />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/book-call" element={<BookCall />} />
                </Routes>
              </Layout>
            } />
          </Routes>
        </BrowserRouter>
      </CmsProvider>
    </AuthProvider>
  );
}
