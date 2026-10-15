import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCms } from "../contexts/CmsContext";

const process_steps = [
  { num: "01", title: "Days 1 to 5: Audit", desc: "We find the truth about your current ads and pipeline before we spend one more dollar." },
  { num: "02", title: "Days 6 to 12: Ads Live", desc: "Campaigns and landing page go live and start bringing in a steady flow of leads." },
  { num: "03", title: "Days 13 to 20: AI Live", desc: "Voice agent and follow-up funnel go live. Every lead answered in seconds, day and night." },
  { num: "04", title: "Day 25: Handover", desc: "The full system is yours, running, tracked, and ready to book jobs." },
];

const audit_checks = [
  { num: "01", title: "Where Do Your Leads Land?", desc: "Your landing page, a phone call, a form, or straight into thin air?" },
  { num: "02", title: "Are They Qualified?", desc: "Or is junk traffic eating your budget every single day?" },
  { num: "03", title: "What Happens After the Click?", desc: "Who follows up, how fast, and how many never hear back?" },
];

const tech_stacks = [
  { category: "AI Models", items: ["GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3", "Mistral"] },
  { category: "Automation", items: ["Make.com", "n8n", "Zapier", "Retool", "Airtable"] },
  { category: "Voice AI", items: ["ElevenLabs", "Bland AI", "Vapi", "Twilio", "AssemblyAI"] },
  { category: "CRM & Sales", items: ["HubSpot", "Salesforce", "Apollo", "Instantly", "Clay"] },
  { category: "Platforms", items: ["Shopify", "WordPress", "Webflow", "Next.js", "React"] },
  { category: "Infrastructure", items: ["AWS", "GCP", "Supabase", "Pinecone", "Redis"] },
];

const offer_features = [
  "Ads built and launched",
  "Landing page",
  "AI voice agent",
  "AI follow-up funnel",
  "GoHighLevel setup",
  "Tracking and reporting",
];

export default function Services() {
  const { cms } = useCms();
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <>
      <section className="page-hero section-dark">
        <div className="page-hero-inner" data-reveal>
          <p className="kicker">Our Services</p>
          <h1>One System.<br />Every Leak, Closed.</h1>
          <p>Performance marketing brings the leads. AI automation answers every one of them. From audit to handover in 25 days.</p>
          <div className="hero-actions">
            <Link className="button button-green" to="/book-call">Book a Free Strategy Call <span className="button-arrow" aria-hidden="true" /></Link>
            <Link className="button button-ghost" to="/portfolio">See Our Work</Link>
          </div>
        </div>
      </section>

      <section className="section arsenal">
        <div className="section-heading" data-reveal>
          <p className="kicker">What We Build</p>
          <h2>Our Full Service Suite</h2>
          <p className="section-sub">Click any service to see full details.</p>
        </div>
        <div className="capability-list">
          {cms.services.map((cap) => (
            <article className={`capability-card${activeService === cap.id ? " expanded" : ""}`} data-reveal key={cap.id} onClick={() => setActiveService(activeService === cap.id ? null : cap.id)}>
              <span>{String(cms.services.indexOf(cap) + 1).padStart(2, "0")}</span>
              <h3>{cap.title}</h3>
              <div className="card-detail">
                <p>{cap.text}</p>
                <p className="detail-extra">{cap.detail}</p>
                <div className="service-extras">
                  <div className="service-deliverables"><h4>What's Included</h4><ul><li>Custom architecture scoped to your use case</li><li>Full integration with your existing tools</li><li>Testing, QA, and go-live support</li><li>Post-launch monitoring dashboard</li></ul></div>
                  <div className="service-timeline"><h4>Typical Timeline</h4><p>25 days from kickoff to handover</p></div>
                </div>
                <div className="card-btn-wrapper">
                  <Link className="card-contact-btn" to="/book-call">Make It Happen <span className="arrow">→</span></Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section process-section">
        <div className="section-heading centered" data-reveal><p className="kicker">How It Works</p><h2>From Kickoff to Handover in 25 Days</h2></div>
        <div className="process-grid">
          {process_steps.map(s => (
            <div className="process-step" data-reveal key={s.num}><div className="process-num">{s.num}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
          ))}
        </div>
      </section>

      <section className="section arsenal">
        <div className="section-heading" data-reveal>
          <p className="kicker">Already Running Ads?</p>
          <h2>Then We Start With an Audit.</h2>
          <p className="section-sub">Before we spend one more dollar, we find out the truth about your current ads. Then we plug in the AI system, so every dollar you already spend starts converting.</p>
        </div>
        <div className="capability-list">
          {audit_checks.map((check, index) => (
            <article className="capability-card" data-reveal key={check.title}>
              <span>{String(index + 1).padStart(2, "0")}</span>
              <h3>{check.title}</h3>
              <div className="card-detail">
                <p>{check.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section tech-section section-dark">
        <div className="section-heading centered" data-reveal><p className="kicker">Technology</p><h2>Built on the Best Tools</h2><p className="section-sub" style={{ color: "rgba(255,255,255,0.7)" }}>We choose the right tool for each job — not the trendiest one.</p></div>
        <div className="tech-grid">
          {tech_stacks.map(s => (
            <div className="tech-card" data-reveal key={s.category}><h4>{s.category}</h4><div className="tech-tags">{s.items.map(i => <span key={i}>{i}</span>)}</div></div>
          ))}
        </div>
      </section>

      <section className="section pricing-section">
        <div className="section-heading centered" data-reveal><p className="kicker">The Offer</p><h2>$3,500 Setup. Everything Included.</h2><p className="section-sub">One price. One system. We take on a limited number of builds each month.</p></div>
        <div className="pricing-grid">
          <div className="pricing-card pricing-highlight" data-reveal>
            <div className="pricing-badge">Complete Build</div>
            <div className="pricing-header"><h3>Booked Jobs System</h3><div className="pricing-price"><strong>$3,500</strong><span>one-time setup</span></div><p>Ads plus AI, built for you and live in 25 days.</p></div>
            <ul className="pricing-features">{offer_features.map(f => <li key={f}><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
            <Link className="button button-green" to="/book-call">Book a Free Strategy Call <span className="button-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>

      <section className="section cta-band section-dark">
        <div className="cta-band-inner" data-reveal>
          <p className="kicker">Ready?</p>
          <h2>Stop Losing the Leads<br />You Already Paid For</h2>
          <p>Book a free strategy call. We will show you exactly what the system would recover for your business.</p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: "32px" }}>
            <Link className="button button-green" to="/book-call">Book a Free Strategy Call <span className="button-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
