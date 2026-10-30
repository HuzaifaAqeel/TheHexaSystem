import { useMemo, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowLeft, ArrowRight, CalendarDays, ChevronLeft, ChevronRight, Clock3 } from 'lucide-react';
import { contactConfig } from '../content';
import { sendContactRequest } from '../contact-request.server';
import { Button } from '@/components/ui/button';

const WEEKDAYS = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const TIMES = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM', '6:00 PM'];

function startOfDay(d: Date) { return new Date(d.getFullYear(), d.getMonth(), d.getDate()); }
function sameDay(a: Date, b: Date) { return a.getFullYear() === b.getFullYear() && a.getMonth() === b.getMonth() && a.getDate() === b.getDate(); }
function dateKey(d: Date) { return `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`; }
function formatDay(d: Date) { return `${(WEEKDAYS[(d.getDay() + 6) % 7] ?? '').toUpperCase()}, ${(MONTHS[d.getMonth()] ?? '').slice(0, 3).toUpperCase()} ${d.getDate()}, ${d.getFullYear()}`; }

/** Deterministic illustrative availability so a day always shows the same slots. */
function slotsFor(d: Date) {
  const key = dateKey(d);
  let hash = 0;
  for (let i = 0; i < key.length; i++) hash = (hash * 31 + key.charCodeAt(i)) >>> 0;
  return TIMES.filter((_, i) => ((hash >> i) & 3) !== 0);
}

export default function BookingSection({ embedded = false }: { embedded?: boolean }) {
  const today = startOfDay(new Date());
  const [view, setView] = useState(() => new Date(today.getFullYear(), today.getMonth(), 1));
  const [date, setDate] = useState<Date | null>(null);
  const [time, setTime] = useState<string | null>(null);
  const [step, setStep] = useState<'date' | 'time' | 'details'>('date');
  const [draft, setDraft] = useState('');
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle');
  const [errorNote, setErrorNote] = useState('');

  const weeks = useMemo(() => {
    const first = new Date(view.getFullYear(), view.getMonth(), 1);
    const offset = (first.getDay() + 6) % 7; // Monday-first
    const daysInMonth = new Date(view.getFullYear(), view.getMonth() + 1, 0).getDate();
    const cells: (Date | null)[] = [];
    for (let i = 0; i < offset; i++) cells.push(null);
    for (let d = 1; d <= daysInMonth; d++) cells.push(new Date(view.getFullYear(), view.getMonth(), d));
    while (cells.length % 7) cells.push(null);
    const rows: (Date | null)[][] = [];
    for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7));
    return rows;
  }, [view]);

  const canGoBack = view.getFullYear() > today.getFullYear() || (view.getFullYear() === today.getFullYear() && view.getMonth() > today.getMonth());
  const move = (delta: number) => setView(v => new Date(v.getFullYear(), v.getMonth() + delta, 1));

  const pickDate = (d: Date) => { setDate(d); setTime(null); setStep('time'); };
  const pickTime = (t: string) => { setTime(t); setStep('details'); };
  const reset = () => { setDate(null); setTime(null); setStep('date'); setDraft(''); setStatus('idle'); setErrorNote(''); };

  const confirm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!date || !time) return;
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '');
    const email = String(data.get('email') || '');
    const timezone = String(data.get('timezone') || '');
    const body = `Name: ${name}\nEmail: ${email}\nTime zone: ${timezone}\n\nRequested strategy call:\n${formatDay(date)} at ${time}\n\n(Preferred time — please confirm availability.)`;
    const mailto = `mailto:${contactConfig.email}?subject=${encodeURIComponent('Strategy call request — Hexa Systems')}&body=${encodeURIComponent(body)}`;
    setStatus('sending');
    setDraft('');
    setErrorNote('');
    try {
      const result = await sendContactRequest({
        data: { kind: 'call-request', name, email, timezone, date: formatDay(date), time },
      });
      if (result.ok) {
        setStatus('sent');
        form.reset();
        return;
      }
      // Never claim a booking that did not happen. Fall back to the email draft.
      setStatus('error');
      setDraft(mailto);
      setErrorNote(
        result.reason === 'email_not_configured'
          ? 'Email delivery is not set up on the server yet, so your request was not sent automatically.'
          : 'Something went wrong sending your request, so it was not sent automatically.',
      );
    } catch {
      setStatus('error');
      setDraft(mailto);
      setErrorNote('Something went wrong sending your request, so it was not sent automatically.');
    }
  };

  return (
    <section className={`hx-book${embedded ? ' hx-book--embedded' : ''}`} aria-label="Book a free strategy call">
      <div className="hx-container">
        <header className="hx-book-head" data-reveal>
          <p className="hx-book-eyebrow"><span />FREE CONSULTATION<span /></p>
          <h2>Book a <em>Free Strategy Call</em></h2>
          <p className="hx-book-sub">30 minutes. Zero pressure.</p>
        </header>

        <div className="hx-book-panel" data-reveal>
          {step === 'date' && (
            <div className="hx-book-step" key={`cal-${view.getFullYear()}-${view.getMonth()}`}>
              <div className="hx-book-calnav">
                <Button variant="ghost" type="button" className="hx-book-navbtn" onClick={() => move(-1)} disabled={!canGoBack} aria-label="Previous month"><ChevronLeft size={18} /></Button>
                <strong>{MONTHS[view.getMonth()]} {view.getFullYear()}</strong>
                <Button variant="ghost" type="button" className="hx-book-navbtn" onClick={() => move(1)} aria-label="Next month"><ChevronRight size={18} /></Button>
              </div>
              <div className="hx-book-grid" role="grid" aria-label="Choose a date">
                {WEEKDAYS.map(w => <span key={w} className="hx-book-weekday">{w}</span>)}
                {weeks.flat().map((d, i) => {
                  if (!d) return <span key={`e${i}`} className="hx-book-day is-empty" aria-hidden="true" />;
                  const past = d < today;
                  const selected = date && sameDay(d, date);
                  return (
                    <Button variant="ghost"
                      key={dateKey(d)}
                      type="button"
                      role="gridcell"
                      className={`hx-book-day${past ? ' is-past' : ''}${selected ? ' is-selected' : ''}${sameDay(d, today) ? ' is-today' : ''}`}
                      disabled={past}
                      aria-label={d.toDateString()}
                      aria-pressed={!!selected}
                      onClick={() => pickDate(d)}
                    >
                      {d.getDate()}
                    </Button>
                  );
                })}
              </div>
              <p className="hx-book-hint">Choose your preferred date. We’ll confirm availability by email.</p>
            </div>
          )}

          {step === 'time' && date && (
            <div className="hx-book-step" key={`time-${dateKey(date)}`}>
              <Button variant="ghost" type="button" className="hx-book-back" onClick={reset}><ArrowLeft size={15} />Choose another date</Button>
              <p className="hx-book-times-label"><Clock3 size={14} />PREFERRED TIME — {formatDay(date)}</p>
              <div className="hx-book-times">
                {slotsFor(date).map(t => (
                  <Button variant="ghost" key={t} type="button" className="hx-book-time" onClick={() => pickTime(t)}>{t}</Button>
                ))}
              </div>
            </div>
          )}

          {step === 'details' && date && time && (
            <div className="hx-book-step" key="details">
              <div className="hx-book-summary">
                <span className="hx-book-summary-icon"><CalendarDays size={20} /></span>
                <div><small>{formatDay(date)}</small><strong>{time}</strong></div>
                <Button variant="ghost" type="button" className="hx-book-change" onClick={() => setStep('time')}>Change</Button>
              </div>
              <form className="hx-book-form" onSubmit={confirm}>
                <label>YOUR NAME *<input name="name" autoComplete="name" placeholder="John Smith" required maxLength={120} /></label>
                <label>EMAIL ADDRESS *<input type="email" name="email" autoComplete="email" placeholder="john@company.com" required maxLength={254} /></label>
                 <label>TIME ZONE *<input name="timezone" placeholder="e.g. Karachi (UTC+5)" required maxLength={100} /></label>
                 <Button type="submit" className="hx-book-confirm hx-button hx-primary" disabled={status === 'sending'}>{status === 'sending' ? 'Sending…' : 'Send Call Request'}<ArrowRight size={17} /></Button>
                <small className="hx-book-note">Your request is sent to the Hexa Systems team. Nothing is booked until we confirm your time by email.</small>
              </form>
              {status === 'sent' && (
                <div className="hx-book-draft" role="status">
                  <p>Request sent. We will reply to the email address you gave to confirm your time.</p>
                </div>
              )}
              {status === 'error' && draft && (
                <div className="hx-book-draft" role="status">
                  <p>{errorNote} Your request is ready as an email draft instead. Open it in your email app, review it, and send it — we’ll reply to confirm your time.</p>
                  <a href={draft}>Open Email Draft ↗</a>
                </div>
              )}
            </div>
          )}
          {!embedded && <Link className="hx-book-alt" to="/contact">Or send us a message <ArrowRight size={15} aria-hidden="true" /></Link>}
        </div>
      </div>
    </section>
  );
}
