import React, { useState } from "react";
import { stats, advantages, faqs } from "../data";

export default function About() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <>
      <section className="section about-section">
        <div className="about-title" data-reveal>
          <p>We're</p>
          <h2>
            TheHexa
            <span>System</span>
          </h2>
        </div>
        <div className="about-copy" data-reveal>
          <span className="hello">Hello!</span>
          <p>
            We operate at the intersection of design, data, and deep learning. We don't just build software; we architect intelligent systems that multiply human capability and accelerate business growth.
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

      <section className="section advantage-section">
        <div className="advantage-copy" data-reveal>
          <p className="kicker">Why Choose</p>
          <h2>The System?</h2>
          <span>Unfair Advantage</span>
          <p>
            We don't just implement tools; we create clearer workflows, faster response times, and scalable operations your team can trust.
          </p>
        </div>
        <div className="advantage-grid">
          {advantages.map((item) => (
            <div className="advantage-item" data-reveal key={item}>
              <span />
              {item}
            </div>
          ))}
        </div>
      </section>

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
    </>
  );
}
