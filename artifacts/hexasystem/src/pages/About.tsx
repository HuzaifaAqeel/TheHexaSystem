import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCms } from "../contexts/CmsContext";

const values = [
  { icon: "⚡", title: "Speed Over Perfection", desc: "We ship working systems fast, then iterate. A live imperfect system beats a perfect system that never launches." },
  { icon: "🔬", title: "Signal Over Noise", desc: "We cut through the AI hype and focus on what actually moves the needle for your business today." },
  { icon: "🏗️", title: "Systems Thinking", desc: "We don't build features — we build systems that compound. Every component connects to create exponential output." },
  { icon: "🤝", title: "Partnership, Not Vendor", desc: "We treat every client as a long-term partner. Your success is our success — not a one-time transaction." },
];

const milestones = [
  { year: "2022", event: "Founded with a mission to make AI automation accessible to every business." },
  { year: "2023", event: "Deployed first 50 AI chatbot systems. Expanded into voice AI and lead generation." },
  { year: "2024", event: "Crossed 150 projects. Launched enterprise packages for larger organizations." },
  { year: "2025", event: "200+ projects deployed. Built proprietary fine-tuning pipeline for client-specific AI models." },
  { year: "2026", event: "Expanding globally. Now serving clients across North America, Europe, and Southeast Asia." },
];

export default function About() {
  const { cms } = useCms();
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <section className="page-hero section-dark">
        <div className="page-hero-inner" data-reveal>
          <p className="kicker">About Us</p>
          <h1>We're the Team That<br />Makes AI Actually Work</h1>
          <p>Not the AI hype company. Not the agency that outsources everything. We're the engineers, architects, and automation specialists who stay until the system ships and performs.</p>
        </div>
      </section>

      <section className="section about-section">
        <div className="about-title" data-reveal><p>We're</p><h2>TheHexa<span>System</span></h2></div>
        <div className="about-copy" data-reveal>
          <span className="hello">{cms.about.greeting}</span>
          <p>{cms.about.text1}</p>
          <p>{cms.about.text2}</p>
        </div>
        <div className="stat-grid">
          {cms.stats.map(s => (
            <div className="stat-card" data-reveal key={s.id}>
              <strong data-count={s.value}>0</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="section values-section">
        <div className="section-heading centered" data-reveal><p className="kicker">What Drives Us</p><h2>Our Core Values</h2></div>
        <div className="values-grid">
          {values.map(v => (
            <div className="value-card" data-reveal key={v.title}><div className="value-icon">{v.icon}</div><h3>{v.title}</h3><p>{v.desc}</p></div>
          ))}
        </div>
      </section>

      <section className="section team-section section-dark">
        <div className="section-heading centered" data-reveal><p className="kicker">The People</p><h2>Meet the Team</h2></div>
        <div className="team-grid">
          {cms.team.map(m => (
            <div className="team-card" data-reveal key={m.id}>
              <div className="team-avatar" style={{ background: `${m.color}22`, border: `2px solid ${m.color}44` }}><span style={{ color: m.color }}>{m.initials}</span></div>
              <h3>{m.name}</h3>
              <p className="team-role">{m.role}</p>
              <p className="team-bio">{m.bio}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="section timeline-section">
        <div className="section-heading" data-reveal><p className="kicker">Our Journey</p><h2>How We Got Here</h2></div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`} data-reveal key={m.year}>
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-dot" />
              <div className="timeline-content"><p>{m.event}</p></div>
            </div>
          ))}
        </div>
      </section>

      <section className="section advantage-section">
        <div className="advantage-copy" data-reveal>
          <p className="kicker">Why Choose</p><h2>The System?</h2><span>Unfair Advantage</span>
          <p>We don't just implement tools; we create clearer workflows, faster response times, and scalable operations your team can trust.</p>
        </div>
        <div className="advantage-grid">
          {cms.advantages.map(item => (
            <div className="advantage-item" data-reveal key={item.id}><span />{item.text}</div>
          ))}
        </div>
      </section>

      <section className="section faq-section">
        <div className="section-heading centered" data-reveal><p className="kicker">You've Got Questions</p><h2>We've Got Answers.</h2></div>
        <div className="faq-list">
          {cms.faqs.map((faq, i) => (
            <article className="faq-item" data-reveal key={faq.id}>
              <button type="button" onClick={() => setOpenFaq(openFaq === i ? -1 : i)}><span>{faq.question}</span><b>{openFaq === i ? "-" : "+"}</b></button>
              <p className={openFaq === i ? "open" : ""}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section cta-band section-dark">
        <div className="cta-band-inner" data-reveal>
          <p className="kicker">Let's Work Together</p>
          <h2>Ready to Meet<br />Your New AI Team?</h2>
          <p>Book a free strategy call with our team. We'll listen, map, and tell you exactly what's possible.</p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: "32px" }}>
            <Link className="button button-green" to="/book-call">Book Free Call <span className="button-arrow" aria-hidden="true" /></Link>
            <Link className="button button-ghost" to="/contact">Send a Message</Link>
          </div>
        </div>
      </section>
    </>
  );
}
