import { useId, useState } from 'react';
import { ArrowUpRight, Mail, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { contactConfig, services } from '../content';
import { Eyebrow } from '../components/Design';
import BookingSection from '../components/BookingSection';
import { sendContactRequest } from '../contact-request.server';

export function InquiryForm({ booking = false }: { booking?: boolean }) {
  const serviceLabel = useId();
  const [draft, setDraft] = useState<string | null>(null);
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorNote, setErrorNote] = useState('');

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const company = String(data.get('company') || '');
    const service = String(data.get('service') || '');
    const message = String(data.get('message') || '');
    const body = `Name: ${name}\nEmail: ${email}\nBusiness: ${company || 'Not specified'}\nInterest: ${service}\n\n${message}`;
    const mailto = `mailto:${contactConfig.email}?subject=${encodeURIComponent(booking ? 'Strategy call request — Hexa Systems' : 'Business inquiry — Hexa Systems')}&body=${encodeURIComponent(body)}`;
    setStatus('sending');
    setDraft(null);
    setErrorNote('');
    try {
      const result = await sendContactRequest({
        data: { kind: booking ? 'call-request' : 'inquiry', name, email, company, service, message },
      });
      if (result.ok) {
        setStatus('sent');
        form.reset();
        return;
      }
      // Never claim a send that did not happen. Fall back to the email draft.
      setStatus('error');
      setDraft(mailto);
      setErrorNote(
        result.reason === 'email_not_configured'
          ? 'Email delivery is not set up on the server yet, so your message was not sent automatically.'
          : 'Something went wrong sending your message, so it was not sent automatically.',
      );
    } catch {
      setStatus('error');
      setDraft(mailto);
      setErrorNote('Something went wrong sending your message, so it was not sent automatically.');
    }
  };

  return (
    <form className="hx-contact-form" onSubmit={onSubmit}>
      <div className="hx-form-row">
        <label>Your name<input name="name" autoComplete="name" placeholder="Full name" required maxLength={120} /></label>
        <label>Email address<input type="email" name="email" autoComplete="email" placeholder="you@company.com" required maxLength={254} /></label>
      </div>
      <label>Business name (optional)<input name="company" autoComplete="organization" placeholder="Your business" maxLength={160} /></label>
      <div className="hx-service-field">
        <span id={serviceLabel}>{booking ? 'What would you like to discuss?' : 'What can we help with?'}</span>
        <Select name="service" required>
          <SelectTrigger className="hx-service-select" aria-labelledby={serviceLabel}><SelectValue placeholder="Select a service" /></SelectTrigger>
          <SelectContent className="hx-service-menu" position="popper" sideOffset={8}>
            {services.map(s => <SelectItem className="hx-service-option" key={s.slug} value={s.title}>{s.title}</SelectItem>)}
            <SelectItem className="hx-service-option" value="Not sure yet">Not sure yet</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <label>{booking ? 'Your business & preferred call times' : 'Tell us a little more'}
        <textarea name="message" rows={5} required minLength={10} maxLength={4000} placeholder={booking ? 'Tell us about your business, your time zone, and a few times that work for you.' : 'Your goals, current challenges, and what you’d like to improve.'} />
      </label>
      <small>Your message is sent to the Hexa Systems team. If automatic sending is unavailable, you will be offered an email draft instead — nothing is claimed as sent until it really is.</small>
      <Button type="submit" className="hx-button hx-primary" disabled={status === 'sending'}>
        {status === 'sending' ? 'Sending…' : `Send ${booking ? 'Call Request' : 'Inquiry'}`}<ArrowUpRight />
      </Button>
      {status === 'sent' && (
        <div className="hx-form-notice" role="status">
          <p>Sent. Thanks — your message is on its way to the Hexa Systems team, and we will reply to the email address you gave.</p>
        </div>
      )}
      {status === 'error' && draft && (
        <div className="hx-form-notice" role="status">
          <p>{errorNote} Your message is ready as an email draft instead. Open it in your email app, review it, and send it — no message has been submitted yet.</p>
          <a href={draft}>Open Email Draft ↗</a>
        </div>
      )}
    </form>
  );
}

export default function Contact() {
  return (
    <div className="hx-contact-hub">
      <section className="hx-contact-intro">
        <div className="hx-container">
          <Eyebrow>LET’S TALK GROWTH</Eyebrow>
          <h1>Your next step.<br /><em>Let’s make it happen.</em></h1>
          <p>Tell us what you have in mind, or choose a time for a free strategy conversation.</p>
          <a className="hx-contact-email" href={`mailto:${contactConfig.email}`}><Mail size={20} />{contactConfig.email}</a>
        </div>
      </section>
      <section className="hx-contact-options">
        <div className="hx-container hx-contact-dual">
          <div className="hx-contact-inquiry" aria-labelledby="inquiry-heading">
            <header className="hx-contact-form-head">
              <span className="hx-contact-icon"><MessageSquare size={24} aria-hidden="true" /></span>
              <div><h2 id="inquiry-heading">Send an inquiry</h2><p>Your business. Your goals. We’re listening.</p></div>
            </header>
            <InquiryForm />
          </div>
          <BookingSection embedded />
        </div>
      </section>
    </div>
  );
}
