import React from "react";
import { Link } from "react-router-dom";
import { capabilities } from "../data";

export default function Services() {
  return (
    <section className="section arsenal">
      <div className="section-heading" data-reveal>
        <p className="kicker">Services</p>
        <h2>What We Build</h2>
      </div>
      <div className="capability-list">
        {capabilities.map((capability, index) => (
          <article className="capability-card" data-reveal key={capability.title}>
            <span>{String(index + 1).padStart(2, "0")}</span>
            <h3>{capability.title}</h3>
            <div className="card-detail">
              <p>{capability.text}</p>
              <p className="detail-extra">{capability.detail}</p>
              <div className="card-btn-wrapper">
                <Link className="card-contact-btn" to="/contact">
                  Avail the Service <span className="arrow">→</span>
                </Link>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
