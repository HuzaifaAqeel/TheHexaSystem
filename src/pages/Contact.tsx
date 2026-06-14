import React, { useEffect, useState } from "react";
import { useLocation, Link } from "react-router-dom";

const contact_methods = [
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
        <polyline points="22,6 12,13 2,6" />
      </svg>
    ),
    label: "Email",
    value: "hello@thehexasystem.com",
    sub: "We reply within 24 hours",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12 19.79 19.79 0 0 1 1.65 3.28 2 2 0 0 1 3.62 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.96a16 16 0 0 0 6.13 6.13l.96-1.18a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
      </svg>
    ),
    label: "Phone",
    value: "+1 (555) 012-3456",
    sub: "Mon–Fri, 9am–6pm EST",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
        <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
    label: "Location",
    value: "Remote-First Global Team",
    sub: "Serving clients worldwide",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" width="22" height="22" stroke="currentColor" strokeWidth="2" fill="none">
        <circle cx="12" cy="12" r="10" />
        <polyline points="12 6 12 12 16 14" />
      </svg>
    ),
    label: "Response Time",
    value: "Under 24 Hours",
    sub: "Average first reply time",
  },
];

const socials = [
  { label: "Twitter / X", handle: "@thehexasystem" },
  { label: "LinkedIn", handle: "TheHexaSystem" },
  { label: "Instagram", handle: "@thehexasystem" },
  { label: "GitHub", handle: "thehexasystem" },
];

export default function Contact() {
  const location = useLocation();
  const [projectText, setProjectText] = useState("");
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get("date");
    const time = params.get("time");
    if (date && time) {
      setProjectText(`I am confirming my strategy call for Jun ${date}, 2026 at ${time}.`);
    }
  }, [location.search]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero section-dark">
        <div className="page-hero-inner" data-reveal>
          <p className="kicker">Contact</p>
          <h1>Let's Start a<br />Conversation</h1>
          <p>
            Got a project in mind? Have a question? Want a second opinion on your
            current AI stack? We're here for all of it.
          </p>
          <div className="hero-actions">
            <Link className="button button-green" to="/book-call">
              Book a Call Instead <span className="button-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── CONTACT GRID ── */}
      <section className="section contact-section contact-full">
        <div className="contact-layout">
          {/* Form */}
          <div className="contact-copy" data-reveal>
            <span className="calligraphic-label">Get in touch</span>
            <p className="kicker">Send a Message</p>
            <h2>Tell Us About Your Project</h2>

            {submitted ? (
              <div className="contact-success">
                <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--green)" strokeWidth="2" fill="none">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                  <polyline points="22 4 12 14.01 9 11.01" />
                </svg>
                <h3>Message Sent!</h3>
                <p>We'll get back to you within 24 hours. In the meantime, feel free to book a call if you'd like to talk sooner.</p>
                <Link className="button button-green" to="/book-call" style={{ marginTop: "20px" }}>
                  Book a Call <span className="button-arrow" aria-hidden="true" />
                </Link>
              </div>
            ) : (
              <form className="signal-form contact-form-full" onSubmit={handleSubmit}>
                <div className="form-row">
                  <label>
                    <span>First Name</span>
                    <input name="firstname" type="text" placeholder="Alex" autoComplete="given-name" required />
                  </label>
                  <label>
                    <span>Last Name</span>
                    <input name="lastname" type="text" placeholder="Chen" autoComplete="family-name" required />
                  </label>
                </div>
                <label>
                  <span>Email Address</span>
                  <input name="email" type="email" placeholder="alex@company.com" autoComplete="email" required />
                </label>
                <label>
                  <span>Company (Optional)</span>
                  <input name="company" type="text" placeholder="Your company name" autoComplete="organization" />
                </label>
                <label>
                  <span>What Are You Looking to Build?</span>
                  <select name="service" required defaultValue="">
                    <option value="" disabled>Select a service...</option>
                    <option>AI Chatbot / Virtual Assistant</option>
                    <option>Business Automation / Workflow</option>
                    <option>AI Voice Agent</option>
                    <option>Custom AI on Our Data</option>
                    <option>Lead Generation Automation</option>
                    <option>Social Media AI</option>
                    <option>Web Development</option>
                    <option>Multiple / Not Sure Yet</option>
                  </select>
                </label>
                <label>
                  <span>Project Details</span>
                  <textarea
                    name="project"
                    rows={5}
                    placeholder="Tell us about your project, current challenges, timeline, and budget..."
                    value={projectText}
                    onChange={(e) => setProjectText(e.target.value)}
                    required
                  />
                </label>
                <label className="budget-label">
                  <span>Estimated Budget</span>
                  <div className="radio-group">
                    {["Under $2,500", "$2,500–$7,500", "$7,500–$20K", "$20K+", "Not Sure"].map((b) => (
                      <label key={b} className="radio-option">
                        <input type="radio" name="budget" value={b} />
                        <span>{b}</span>
                      </label>
                    ))}
                  </div>
                </label>
                <button className="button button-green" type="submit">
                  Send Message <span className="button-arrow" aria-hidden="true" />
                </button>
              </form>
            )}
          </div>

          {/* Info Sidebar */}
          <div className="contact-sidebar" data-reveal>
            <div className="contact-info-card">
              <h3>Contact Information</h3>
              <div className="contact-methods">
                {contact_methods.map((m) => (
                  <div className="contact-method" key={m.label}>
                    <div className="contact-method-icon">{m.icon}</div>
                    <div>
                      <strong>{m.value}</strong>
                      <span>{m.sub}</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="contact-social">
                <h4>Find Us Online</h4>
                {socials.map((s) => (
                  <div className="social-row" key={s.label}>
                    <span className="social-label">{s.label}</span>
                    <span className="social-handle">{s.handle}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="contact-cta-card">
              <h3>Prefer to Talk?</h3>
              <p>Book a free 30-minute strategy call instead. No obligation.</p>
              <Link className="button button-green" to="/book-call">
                Book a Call <span className="button-arrow" aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AVAILABILITY BAND ── */}
      <section className="section availability-band section-dark">
        <div className="availability-inner" data-reveal>
          <div className="availability-status">
            <div className="status-dot" />
            <span>Currently accepting new projects for Q3 2026</span>
          </div>
          <p>We typically have 2–3 project slots available per month. If you're ready to move, don't wait.</p>
          <Link className="button button-green" to="/book-call" style={{ marginTop: "20px" }}>
            Secure Your Slot <span className="button-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}
