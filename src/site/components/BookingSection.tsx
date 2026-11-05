import { Link } from '@tanstack/react-router';
import { ArrowRight } from 'lucide-react';
import CalendlyEmbed from './CalendlyEmbed';

// Real booking: the Calendly inline widget books the appointment on
// Calendly itself. The old in-site calendar showed illustrative slots and
// took booking requests by email — it never booked anything, so it is gone.
export default function BookingSection({ embedded = false }: { embedded?: boolean }) {
  return (
    <section className={`hx-book${embedded ? ' hx-book--embedded' : ''}`} aria-label="Book a free strategy call">
      <div className="hx-container">
        <header className="hx-book-head" data-reveal>
          <p className="hx-book-eyebrow"><span />FREE CONSULTATION<span /></p>
          <h2>Book a <em>Free Strategy Call</em></h2>
          <p className="hx-book-sub">30 minutes. Zero pressure.</p>
        </header>

        <div className="hx-book-panel" data-reveal>
          <CalendlyEmbed />
          <p className="hx-book-hint">Your booking is made on Calendly and confirmed straight away — pick a time that works for you.</p>
          {!embedded && <Link className="hx-book-alt" to="/contact">Or send us a message <ArrowRight size={15} aria-hidden="true" /></Link>}
        </div>
      </div>
    </section>
  );
}
