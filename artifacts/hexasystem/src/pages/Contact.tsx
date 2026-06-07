import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

export default function Contact() {
  const location = useLocation();
  const [projectText, setProjectText] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const date = params.get("date");
    const time = params.get("time");

    if (date && time) {
      setProjectText(`I am confirming my strategy call for Jun ${date}, 2026 at ${time}.`);
    }
  }, [location.search]);

  return (
    <section className="section contact-section">
      <div className="contact-grid">
        <div className="contact-copy" data-reveal>
          <span className="calligraphic-label">Get in touch</span>
          <p className="kicker">Initiate Contact</p>
          <h2>Get in touch</h2>
          <form className="signal-form" onSubmit={(e) => e.preventDefault()}>
            <label>
              <span>Identification</span>
              <input name="name" type="text" placeholder="Name" autoComplete="name" required />
            </label>
            <label>
              <span>Commlink</span>
              <input name="email" type="email" placeholder="Email" autoComplete="email" required />
            </label>
            <label>
              <span>Transmission</span>
              <textarea
                name="project"
                rows={5}
                placeholder="Project details"
                value={projectText}
                onChange={(e) => setProjectText(e.target.value)}
                required
              />
            </label>
            <button className="button button-green" type="submit">
              Transmit Signal
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
