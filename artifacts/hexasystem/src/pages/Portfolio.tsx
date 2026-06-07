import React from "react";
import { Link } from "react-router-dom";
import { projects } from "../data";

export default function Portfolio() {
  return (
    <section className="section work-section section-dark">
      <div className="section-heading centered" data-reveal>
        <p className="kicker">Our Work</p>
        <h2>Featured Projects</h2>
      </div>
      <div className="project-grid">
        {projects.map((project) => (
          <article className="project-card" data-reveal key={project.title}>
            <div className="project-screen" aria-hidden="true">
              <span />
              <span />
              <span />
              <div />
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
      <Link className="button button-green work-button" to="/contact" data-reveal>
        View All Projects
      </Link>
    </section>
  );
}
