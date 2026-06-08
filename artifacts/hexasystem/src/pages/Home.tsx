import React from "react";
import { Link } from "react-router-dom";
import { useCms } from "../contexts/CmsContext";
import { useHeroPointer } from "../hooks";
import BookCallWidget from "../components/BookCallWidget";

export default function Home() {
  useHeroPointer();
  const { cms } = useCms();
  const { hero, brands, services, stats, projects, advantages, faqs } = cms;

  return (
    <>
      {/* ── HERO ── */}
      <section className="hero section-dark">
        <div className="hero-gradient-field" aria-hidden="true">
          <span className="hero-gradient-blob hero-gradient-blob-one" />
          <span className="hero-gradient-blob hero-gradient-blob-two" />
          <span className="hero-gradient-blob hero-gradient-blob-three" />
          <span className="hero-cursor-glow" />
        </div>
        <div className="hero-inner">
          <div className="hero-copy" data-reveal>
            <h1>
              <span>{hero.line1}</span>
              <strong>{hero.line2}</strong>
              <em>{hero.cursive}</em>
              <span>{hero.line3}</span>
            </h1>
            <p>{hero.body}</p>
            <div className="hero-actions">
              <Link className="button button-green" to="/book-call">
                {hero.cta1} <span className="button-arrow" aria-hidden="true" />
              </Link>
              <Link className="button button-ghost" to="/services">
                {hero.cta2}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── BRAND STRIP ── */}
      <section className="brand-strip" aria-label="Relied on by brands across the globe">
        <p data-reveal>Relied on by brands <span>across the globe</span></p>
        <div className="marquee" data-reveal>
          <div className="marquee-track">
            {[...brands, ...brands].map((b, i) => (
              <span className="brand-token" key={`${b.name}-${i}`}>
                <b>{b.letter}</b>{b.name}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── STATS ── */}
      <section className="section stats-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">Our Impact</p>
          <h2>Numbers That Speak</h2>
        </div>
        <div className="stat-grid">
          {stats.map((s) => (
            <div className="stat-card" data-reveal key={s.id}>
              <strong data-count={s.value}>0</strong>
              <span>{s.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section arsenal">
        <div className="section-heading" data-reveal>
          <p className="kicker">Services</p>
          <h2>What We Build</h2>
          <p className="section-sub">From AI chatbots to full automation pipelines — we handle every layer of your intelligent system.</p>
        </div>
        <div className="capability-list">
          {services.map((cap, index) => (
            <article className="capability-card" data-reveal key={cap.id}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{cap.title}</h3>
              <div className="card-detail">
                <p>{cap.text}</p>
                <p className="detail-extra">{cap.detail}</p>
                <div className="card-btn-wrapper">
                  <Link className="card-contact-btn" to="/contact">
                    Make It Happen <span className="arrow">→</span>
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
        <div className="section-cta" data-reveal>
          <Link className="button button-green" to="/services">
            View All Services <span className="button-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section className="section about-section">
        <div className="about-title" data-reveal>
          <p>We're</p>
          <h2>TheHexa<span>System</span></h2>
        </div>
        <div className="about-copy" data-reveal>
          <span className="hello">{cms.about.greeting}</span>
          <p>{cms.about.text1}</p>
          <p>{cms.about.text2}</p>
          <Link className="button button-green" to="/about" style={{ marginTop: "24px", display: "inline-flex" }}>
            Our Story <span className="button-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* ── ADVANTAGE ── */}
      <section className="section advantage-section">
        <div className="advantage-copy" data-reveal>
          <p className="kicker">Why Choose</p>
          <h2>The System?</h2>
          <span>Unfair Advantage</span>
          <p>We don't just implement tools; we create clearer workflows, faster response times, and scalable operations your team can trust.</p>
        </div>
        <div className="advantage-grid">
          {advantages.map((item) => (
            <div className="advantage-item" data-reveal key={item.id}>
              <span />{item.text}
            </div>
          ))}
        </div>
      </section>

      {/* ── PORTFOLIO ── */}
      <section className="section work-section section-dark">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">Our Work</p>
          <h2>Featured Projects</h2>
        </div>
        <div className="project-grid">
          {projects.map((project) => (
            <article className="project-card" data-reveal key={project.id}>
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
        <Link className="button button-green work-button" to="/portfolio" data-reveal>
          View All Projects <span className="button-arrow" aria-hidden="true" />
        </Link>
      </section>

      {/* ── BOOK A CALL ── */}
      <BookCallWidget />

      {/* ── FAQ ── */}
      <section className="section faq-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">You've Got Questions</p>
          <h2>We've Got Answers.</h2>
        </div>
        <HomeFaq faqs={faqs} />
        <div className="section-cta" data-reveal>
          <Link className="button button-green" to="/about">
            More Questions <span className="button-arrow" aria-hidden="true" />
          </Link>
        </div>
      </section>
    </>
  );
}

function HomeFaq({ faqs }: { faqs: { id: string; question: string; answer: string }[] }) {
  const [open, setOpen] = React.useState(0);
  return (
    <div className="faq-list">
      {faqs.map((faq, i) => (
        <article className="faq-item" data-reveal key={faq.id}>
          <button type="button" onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{faq.question}</span>
            <b>{open === i ? "-" : "+"}</b>
          </button>
          <p className={open === i ? "open" : ""}>{faq.answer}</p>
        </article>
      ))}
    </div>
  );
}
