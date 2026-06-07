import React, { useState } from "react";
import { Link } from "react-router-dom";
import { stats, advantages, faqs } from "../data";

const values = [
  {
    icon: "⚡",
    title: "Speed Over Perfection",
    desc: "We ship working systems fast, then iterate. A live imperfect system beats a perfect system that never launches.",
  },
  {
    icon: "🔬",
    title: "Signal Over Noise",
    desc: "We cut through the AI hype and focus on what actually moves the needle for your business today.",
  },
  {
    icon: "🏗️",
    title: "Systems Thinking",
    desc: "We don't build features — we build systems that compound. Every component connects to create exponential output.",
  },
  {
    icon: "🤝",
    title: "Partnership, Not Vendor",
    desc: "We treat every client as a long-term partner. Your success is our success — not a one-time transaction.",
  },
];

const team_members = [
  {
    initials: "AK",
    name: "Alex Kiran",
    role: "Founder & AI Architect",
    bio: "Former ML engineer at a Fortune 500. Built AI systems that process millions of transactions daily. Obsessed with elegant automation.",
    color: "#adff35",
  },
  {
    initials: "SM",
    name: "Sofia Mendez",
    role: "Head of Automation",
    bio: "3+ years designing end-to-end automation pipelines for e-commerce, SaaS, and healthcare clients across 12 countries.",
    color: "#58e86a",
  },
  {
    initials: "RJ",
    name: "Rayan Jin",
    role: "Lead Voice AI Engineer",
    bio: "Voice AI specialist who has deployed hundreds of conversational agents. Previously built NLU systems for telecom giants.",
    color: "#b8ff5e",
  },
  {
    initials: "TN",
    name: "Tara Noel",
    role: "Web & Integration Specialist",
    bio: "Full-stack developer with a knack for connecting disparate systems. If there's an API, Tara has built on top of it.",
    color: "#7fff45",
  },
];

const milestones = [
  { year: "2022", event: "Founded with a mission to make AI automation accessible to every business." },
  { year: "2023", event: "Deployed first 50 AI chatbot systems. Expanded into voice AI and lead generation." },
  { year: "2024", event: "Crossed 150 projects. Launched enterprise packages for larger organizations." },
  { year: "2025", event: "200+ projects deployed. Built proprietary fine-tuning pipeline for client-specific AI models." },
  { year: "2026", event: "Expanding globally. Now serving clients across North America, Europe, and Southeast Asia." },
];

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero section-dark">
        <div className="page-hero-inner" data-reveal>
          <p className="kicker">About Us</p>
          <h1>We're the Team That<br />Makes AI Actually Work</h1>
          <p>
            Not the AI hype company. Not the agency that outsources everything. We're the engineers,
            architects, and automation specialists who stay until the system ships and performs.
          </p>
        </div>
      </section>

      {/* ── WHO WE ARE ── */}
      <section className="section about-section">
        <div className="about-title" data-reveal>
          <p>We're</p>
          <h2>TheHexa<span>System</span></h2>
        </div>
        <div className="about-copy" data-reveal>
          <span className="hello">Hello!</span>
          <p>
            We operate at the intersection of design, data, and deep learning. We don't just build
            software; we architect intelligent systems that multiply human capability and accelerate
            business growth.
          </p>
          <p>
            Founded in 2022 with a single conviction: that AI-powered automation shouldn't be reserved
            for billion-dollar companies. Every business — regardless of size — deserves access to
            systems that work tirelessly, scale infinitely, and never complain.
          </p>
          <p>In a world cluttered with noise, we deliver pure signal.</p>
        </div>
        <div className="stat-grid">
          {stats.map(([value, label]) => (
            <div className="stat-card" data-reveal key={label}>
              <strong data-count={value}>0</strong>
              <span>{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── VALUES ── */}
      <section className="section values-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">What Drives Us</p>
          <h2>Our Core Values</h2>
        </div>
        <div className="values-grid">
          {values.map((v) => (
            <div className="value-card" data-reveal key={v.title}>
              <div className="value-icon">{v.icon}</div>
              <h3>{v.title}</h3>
              <p>{v.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="section team-section section-dark">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">The People</p>
          <h2>Meet the Team</h2>
        </div>
        <div className="team-grid">
          {team_members.map((member) => (
            <div className="team-card" data-reveal key={member.name}>
              <div className="team-avatar" style={{ background: `${member.color}22`, border: `2px solid ${member.color}44` }}>
                <span style={{ color: member.color }}>{member.initials}</span>
              </div>
              <h3>{member.name}</h3>
              <p className="team-role">{member.role}</p>
              <p className="team-bio">{member.bio}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── TIMELINE ── */}
      <section className="section timeline-section">
        <div className="section-heading" data-reveal>
          <p className="kicker">Our Journey</p>
          <h2>How We Got Here</h2>
        </div>
        <div className="timeline">
          {milestones.map((m, i) => (
            <div className={`timeline-item ${i % 2 === 0 ? "left" : "right"}`} data-reveal key={m.year}>
              <div className="timeline-year">{m.year}</div>
              <div className="timeline-dot" />
              <div className="timeline-content">
                <p>{m.event}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── ADVANTAGES ── */}
      <section className="section advantage-section">
        <div className="advantage-copy" data-reveal>
          <p className="kicker">Why Choose</p>
          <h2>The System?</h2>
          <span>Unfair Advantage</span>
          <p>
            We don't just implement tools; we create clearer workflows, faster response times,
            and scalable operations your team can trust.
          </p>
        </div>
        <div className="advantage-grid">
          {advantages.map((item) => (
            <div className="advantage-item" data-reveal key={item}>
              <span />{item}
            </div>
          ))}
        </div>
      </section>

      {/* ── FAQ ── */}
      <section className="section faq-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">You've Got Questions</p>
          <h2>We've Got Answers.</h2>
        </div>
        <div className="faq-list">
          {faqs.map((faq, index) => (
            <article className="faq-item" data-reveal key={faq.question}>
              <button type="button" onClick={() => setOpenFaq(openFaq === index ? -1 : index)}>
                <span>{faq.question}</span>
                <b>{openFaq === index ? "-" : "+"}</b>
              </button>
              <p className={openFaq === index ? "open" : ""}>{faq.answer}</p>
            </article>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-band section-dark">
        <div className="cta-band-inner" data-reveal>
          <p className="kicker">Let's Work Together</p>
          <h2>Ready to Meet<br />Your New AI Team?</h2>
          <p>Book a free strategy call with our team. We'll listen, map, and tell you exactly what's possible.</p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: "32px" }}>
            <Link className="button button-green" to="/book-call">
              Book Free Call <span className="button-arrow" aria-hidden="true" />
            </Link>
            <Link className="button button-ghost" to="/contact">
              Send a Message
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
