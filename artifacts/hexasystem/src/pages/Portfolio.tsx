import React, { useState } from "react";
import { Link } from "react-router-dom";
import { projects } from "../data";

const all_projects = [
  ...projects,
  {
    category: "Business Automation",
    title: "Full-Stack Operations Automation",
    text: "Automated 18 internal workflows for a B2B SaaS company — from onboarding sequences to invoice generation and Slack reporting. Saved 200+ hours per month across the operations team.",
    client: "FlowStack Inc.",
    result: "200+ hours/month saved",
  },
  {
    category: "Social Media AI",
    title: "AI Content Engine for D2C Brand",
    text: "Built an AI content pipeline that generates, schedules, and posts brand-aligned content across Instagram, TikTok, and LinkedIn. Includes trend analysis and auto-response for DMs.",
    client: "Vibe Collective",
    result: "5x content output, 40% follower growth",
  },
  {
    category: "Custom AI",
    title: "Private Knowledge AI for Legal Firm",
    text: "Deployed a private RAG-based AI assistant trained on the firm's internal documents, case history, and legal templates. Cuts document review time by 60% with zero data leaving their servers.",
    client: "Harmon & Associates",
    result: "60% faster document review",
  },
];

const categories = ["All", "AI Chatbots", "Voice Agents", "Lead Generation", "Business Automation", "Social Media AI", "Custom AI"];

const testimonials = [
  {
    quote: "TheHexaSystem built us an AI that handles 85% of our customer support — in 3 weeks. We went from 2 full-time agents to none. Unbelievable ROI.",
    author: "Marcus Chen",
    company: "VortexCommerce",
    result: "70% reduction in support costs",
  },
  {
    quote: "Our voice agent handles 500+ calls per day without breaking a sweat. Patients love it. The clinic saves $40K/year in staffing.",
    author: "Dr. Priya Nair",
    company: "MedFlow Clinics",
    result: "500+ calls automated daily",
  },
  {
    quote: "Lead gen went from manual prospecting to fully automated. We're booking 3x more qualified calls with half the effort.",
    author: "Jordan Blake",
    company: "NexaTech Solutions",
    result: "3x qualified leads per month",
  },
];

export default function Portfolio() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? all_projects
    : all_projects.filter((p) => p.category === activeCategory);

  return (
    <>
      {/* ── PAGE HERO ── */}
      <section className="page-hero section-dark">
        <div className="page-hero-inner" data-reveal>
          <p className="kicker">Portfolio</p>
          <h1>Real Systems.<br />Real Results.</h1>
          <p>
            Every project we take on is a commitment to measurable outcomes. Here's what
            we've built for businesses like yours.
          </p>
          <div className="hero-actions">
            <Link className="button button-green" to="/book-call">
              Start Your Project <span className="button-arrow" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      {/* ── FILTER + PROJECTS ── */}
      <section className="section work-section section-dark">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">Our Work</p>
          <h2>Featured Projects</h2>
        </div>

        <div className="portfolio-filters" data-reveal>
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              className={`filter-btn ${activeCategory === cat ? "active" : ""}`}
              onClick={() => setActiveCategory(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="project-grid">
          {filtered.map((project) => (
            <article className="project-card" data-reveal key={project.title}>
              <div className="project-screen" aria-hidden="true">
                <span /><span /><span /><div />
              </div>
              <p className="project-category">{project.category}</p>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              <div className="project-footer">
                <strong>{project.client}</strong>
                <span>Result: {project.result}</span>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="section testimonials-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">Client Stories</p>
          <h2>What Clients Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <div className="testimonial-card" data-reveal key={t.author}>
              <div className="testimonial-quote">
                <svg viewBox="0 0 40 32" width="40" height="32" fill="none">
                  <path d="M0 32V20C0 13.5 2.5 8.5 7.5 5S17.5 1 22 0v6c-3 0.5-5.5 1.8-7.5 4S12 16 12 20h8v12H0Zm22 0V20c0-6.5 2.5-11.5 7.5-15S39.5 1 44 0v6c-3 0.5-5.5 1.8-7.5 4S34 16 34 20h8v12H22Z" fill="var(--lime)" fillOpacity="0.25"/>
                </svg>
              </div>
              <p className="testimonial-text">"{t.quote}"</p>
              <div className="testimonial-author">
                <div className="testimonial-avatar">
                  {t.author.split(" ").map((n) => n[0]).join("")}
                </div>
                <div>
                  <strong>{t.author}</strong>
                  <span>{t.company}</span>
                </div>
                <div className="testimonial-result">{t.result}</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ── RESULTS BAND ── */}
      <section className="section results-band section-dark">
        <div className="results-grid" data-reveal>
          <div className="result-stat">
            <strong>200+</strong>
            <span>Projects Delivered</span>
          </div>
          <div className="result-stat">
            <strong>98%</strong>
            <span>Client Retention</span>
          </div>
          <div className="result-stat">
            <strong>$12M+</strong>
            <span>Client Revenue Generated</span>
          </div>
          <div className="result-stat">
            <strong>500K+</strong>
            <span>Hours Automated</span>
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="section cta-band" style={{ background: "var(--paper)" }}>
        <div className="cta-band-inner" data-reveal>
          <p className="kicker">Be Next</p>
          <h2>Your Business Could Be<br />Our Next Case Study</h2>
          <p>Book a free call and let's figure out exactly what to build for you.</p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: "32px" }}>
            <Link className="button button-green" to="/book-call">
              Book Free Call <span className="button-arrow" aria-hidden="true" />
            </Link>
            <Link className="button button-ghost" to="/contact">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
