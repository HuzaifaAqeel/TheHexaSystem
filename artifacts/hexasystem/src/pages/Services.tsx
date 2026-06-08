import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCms } from "../contexts/CmsContext";

const process_steps = [
  { num: "01", title: "Discovery Call", desc: "We start with a free 30-minute call to understand your business, goals, and current bottlenecks. No pitching — just listening." },
  { num: "02", title: "System Design", desc: "Our engineers map out the full architecture: data flows, integrations, AI models, and automation triggers tailored to your stack." },
  { num: "03", title: "Build & Integrate", desc: "We build, test, and integrate the system into your existing tools. Typically 2–4 weeks from strategy to live deployment." },
  { num: "04", title: "Monitor & Optimize", desc: "Post-launch, we monitor performance, tune prompts and workflows, and ensure your system gets smarter over time." },
];

const tech_stacks = [
  { category: "AI Models", items: ["GPT-4o", "Claude 3.5", "Gemini Pro", "Llama 3", "Mistral"] },
  { category: "Automation", items: ["Make.com", "n8n", "Zapier", "Retool", "Airtable"] },
  { category: "Voice AI", items: ["ElevenLabs", "Bland AI", "Vapi", "Twilio", "AssemblyAI"] },
  { category: "CRM & Sales", items: ["HubSpot", "Salesforce", "Apollo", "Instantly", "Clay"] },
  { category: "Platforms", items: ["Shopify", "WordPress", "Webflow", "Next.js", "React"] },
  { category: "Infrastructure", items: ["AWS", "GCP", "Supabase", "Pinecone", "Redis"] },
];

const pricing_tiers = [
  { name: "Starter", price: "$2,500", period: "one-time", desc: "Perfect for small businesses ready to automate their first workflow.", features: ["1 AI chatbot or automation workflow", "Integration with up to 3 tools", "30-day post-launch support", "Performance dashboard", "1 revision round"], highlight: false, cta: "Get Started" },
  { name: "Growth", price: "$6,500", period: "one-time", desc: "For growing teams that need a complete AI-powered system.", features: ["Up to 3 AI agents or automations", "Unlimited tool integrations", "Custom knowledge base", "Voice agent included", "90-day support & optimization", "Priority build queue"], highlight: true, cta: "Most Popular" },
  { name: "Enterprise", price: "Custom", period: "contact us", desc: "Full-scale intelligent systems for enterprises at any size.", features: ["Unlimited AI agents & pipelines", "Dedicated project manager", "Custom AI model training", "White-label options", "12-month SLA", "On-site workshops"], highlight: false, cta: "Book a Call" },
];

export default function Services() {
  const { cms } = useCms();
  const [activeService, setActiveService] = useState<string | null>(null);

  return (
    <>
      <section className="page-hero section-dark">
        <div className="page-hero-inner" data-reveal>
          <p className="kicker">Our Services</p>
          <h1>Everything You Need<br />to Run on AI</h1>
          <p>From a single chatbot to a full autonomous business system — we design, build, and maintain the AI infrastructure that puts you ahead of the competition.</p>
          <div className="hero-actions">
            <Link className="button button-green" to="/book-call">Start a Project <span className="button-arrow" aria-hidden="true" /></Link>
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
                  <div className="service-timeline"><h4>Typical Timeline</h4><p>2–4 weeks from kickoff to deployment</p></div>
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
        <div className="section-heading centered" data-reveal><p className="kicker">How It Works</p><h2>From Idea to Live System</h2></div>
        <div className="process-grid">
          {process_steps.map(s => (
            <div className="process-step" data-reveal key={s.num}><div className="process-num">{s.num}</div><h3>{s.title}</h3><p>{s.desc}</p></div>
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
        <div className="section-heading centered" data-reveal><p className="kicker">Pricing</p><h2>Simple, Transparent Pricing</h2><p className="section-sub">No hidden fees. No retainers unless you want one.</p></div>
        <div className="pricing-grid">
          {pricing_tiers.map(t => (
            <div className={`pricing-card${t.highlight ? " pricing-highlight" : ""}`} data-reveal key={t.name}>
              {t.highlight && <div className="pricing-badge">Most Popular</div>}
              <div className="pricing-header"><h3>{t.name}</h3><div className="pricing-price"><strong>{t.price}</strong><span>{t.period}</span></div><p>{t.desc}</p></div>
              <ul className="pricing-features">{t.features.map(f => <li key={f}><svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><polyline points="20 6 9 17 4 12" /></svg>{f}</li>)}</ul>
              <Link className={`button${t.highlight ? " button-green" : " button-dark"}`} to="/book-call">{t.cta} <span className="button-arrow" aria-hidden="true" /></Link>
            </div>
          ))}
        </div>
      </section>

      <section className="section cta-band section-dark">
        <div className="cta-band-inner" data-reveal>
          <p className="kicker">Ready?</p>
          <h2>Start Your First<br />AI Project Today</h2>
          <p>Book a free discovery call. We'll map out exactly what to build and how long it takes.</p>
          <div className="hero-actions" style={{ justifyContent: "center", marginTop: "32px" }}>
            <Link className="button button-green" to="/book-call">Book Free Call <span className="button-arrow" aria-hidden="true" /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
