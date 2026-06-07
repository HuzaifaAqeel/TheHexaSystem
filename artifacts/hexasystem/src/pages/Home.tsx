import React from "react";
import { Link } from "react-router-dom";
import { brands } from "../data";
import { useHeroPointer } from "../hooks";

export default function Home() {
  useHeroPointer();

  return (
    <>
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
              <span>We Build</span>
              <strong>Intelligent Systems</strong>
              <em>That</em>
              <span>Dominate</span>
            </h1>
            <p>
              Automation engines that eliminate repetitive work, multiply revenue 10x, and give your team back the time they deserve.
            </p>
            <div className="hero-actions">
              <Link className="button button-green" to="/book-call">
                Book a free call <span className="button-arrow" aria-hidden="true" />
              </Link>
              <Link className="button button-ghost" to="/services">
                Explore Services
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="brand-strip" aria-label="Relied on by brands across the globe">
        <p data-reveal>
          Relied on by brands <span>across the globe</span>
        </p>
        <div className="marquee" data-reveal>
          <div className="marquee-track">
            {[...brands, ...brands].map(([letter, name], index) => (
              <span className="brand-token" key={`${name}-${index}`}>
                <b>{letter}</b>
                {name}
              </span>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
