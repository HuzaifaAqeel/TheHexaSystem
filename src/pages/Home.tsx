import React from "react";
import { Link } from "react-router-dom";
import { useCms } from "../contexts/CmsContext";
import { useHeroPointer } from "../hooks";
import BookCallWidget from "../components/BookCallWidget";

const leaks = [
  {
    title: "Missed Calls",
    text: "Your team is on a job. The phone rings. Nobody picks up. That caller dials your competitor.",
  },
  {
    title: "Slow Follow-Up",
    text: "A quote with no follow-up is a quote lost. Every hour of delay kills the deal.",
  },
  {
    title: "No-Shows",
    text: "Appointments with no reminders become empty slots in your day.",
  },
  {
    title: "Dead Old Leads",
    text: "Hundreds of past quotes sit untouched. Revenue you already paid for.",
  },
];

const recoveryRows = [
  { name: "Recover 30%", price: "+$7,500 / mo", result: "+15% revenue" },
  { name: "Recover 40%", price: "+$10,000 / mo", result: "+20% revenue" },
  { name: "Recover 50%", price: "+$12,500 / mo", result: "+25% revenue" },
];

const howItWorks = [
  {
    num: "01",
    title: "Step 1: Performance Marketing",
    desc: "Meta ads built to bring a steady flow of leads to your business.",
  },
  {
    num: "02",
    title: "Step 2: AI Automation",
    desc: "AI voice agent and follow-up. Every lead answered in seconds, day and night.",
  },
  {
    num: "=",
    title: "Booked Jobs",
    desc: "Step 1 brings the leads. Step 2 makes sure not one of them slips away.",
  },
];

const offerIncludes = [
  "Ads built and launched",
  "Landing page",
  "AI voice agent",
  "AI follow-up funnel",
  "GoHighLevel setup",
  "Tracking and reporting",
];

const offerTimeline = [
  { num: "01", title: "Days 1 to 5: Audit", desc: "We find the truth about your current ads and pipeline before we spend a dollar." },
  { num: "02", title: "Days 6 to 12: Ads Live", desc: "Campaigns and landing page go live and start bringing in leads." },
  { num: "03", title: "Days 13 to 20: AI Live", desc: "Voice agent and follow-up funnel go live. Every lead answered in seconds." },
  { num: "04", title: "Day 25: Handover", desc: "The full system is yours, running and tracked." },
];

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

      {/* ── PROBLEM ── */}
      <section className="section arsenal">
        <div className="section-heading" data-reveal>
          <p className="kicker">The Problem</p>
          <h2>Your Leads Are Leaking. Here Is Where.</h2>
          <p className="section-sub">You do not need more leads. You need to stop losing the ones you have.</p>
        </div>
        <div className="capability-list">
          {leaks.map((leak, index) => (
            <article className="capability-card" data-reveal key={leak.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{leak.title}</h3>
              <div className="card-detail">
                <p>{leak.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* ── THE MATH ── */}
      <section className="section pricing-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">The Math</p>
          <h2>What Missed Leads Cost You</h2>
          <p className="section-sub">50 missed leads a month x $500 average ticket = $25,000 a month walking out the door. Now watch what happens when the system recovers them.</p>
        </div>
        <div className="pricing-grid">
          {recoveryRows.map((row) => (
            <div className="pricing-card" data-reveal key={row.name}>
              <div className="pricing-header"><h3>{row.name}</h3><div className="pricing-price"><strong>{row.price}</strong></div><p>{row.result}</p></div>
              <Link className="button button-dark" to="/book-call">Recover My Leads <span className="button-arrow" aria-hidden="true" /></Link>
            </div>
          ))}
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="section process-section">
        <div className="section-heading centered" data-reveal><p className="kicker">How It Works</p><h2>Two Steps. One System. More Revenue.</h2></div>
        <div className="process-grid">
          {howItWorks.map(s => (
            <div className="process-step" data-reveal key={s.num}><div className="process-num">{s.num}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
          ))}
        </div>
      </section>

      {/* ── SERVICES OVERVIEW ── */}
      <section className="section arsenal">
        <div className="section-heading" data-reveal>
          <p className="kicker">Services</p>
          <h2>What We Build</h2>
          <p className="section-sub">Performance marketing brings the leads. AI automation answers every one of them.</p>
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

      {/* ── OFFER ── */}
      <section className="section pricing-section">
        <div className="section-heading centered" data-reveal>
          <p className="kicker">The Offer</p>
          <h2>$3,500 Setup. Everything Included.</h2>
          <p className="section-sub">We take on a limited number of builds each month.</p>
        </div>
        <div className="pricing-grid">
          <div className="pricing-card pricing-highlight" data-reveal>
            <div className="pricing-badge">Complete Build</div>
            <div className="pricing-header"><h3>Booked Jobs System</h3><div className="pricing-price"><strong>$3,500</strong><span>one-time setup</span></div><p>Ads plus AI, built for you and live in 25 days.</p></div>
            <ul className="pricing-features">{offerIncludes.map(f => <li key={f}><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
            <Link className="button button-green" to="/book-call">Book a Free Strategy Call <span className="button-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      {/* ── OFFER TIMELINE ── */}
      <section className="section process-section">
        <div className="section-heading centered" data-reveal><p className="kicker">Timeline</p><h2>Live In 25 Days</h2></div>
        <div className="process-grid">
          {offerTimeline.map(s => (
            <div className="process-step" data-reveal key={s.num}><div className="process-num">{s.num}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
          ))}
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
          <p>Ads bring the leads. AI answers every one of them. One connected system, so no lead slips away.</p>
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
