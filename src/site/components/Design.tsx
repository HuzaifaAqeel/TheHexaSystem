import { useEffect, useRef, useState } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, Check, ChevronDown, Phone, Target, MessageSquare, CalendarDays, Layers, BarChart3, Search, Plus, Megaphone, ContactRound, Bot, UserCheck, PenTool, Share2, Workflow as WorkflowIcon, Sparkles, Code2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { questions, process } from '../content';
import icon0 from '@/assets/lifecycle-0.png';
import st1 from '@/assets/step-1.png';
import st2 from '@/assets/step-2.png';
import st3 from '@/assets/step-3.png';
import st4 from '@/assets/step-4.png';
import st5 from '@/assets/step-5.png';
import st6 from '@/assets/step-6.png';
const step3d = [st1, st2, st3, st4, st5, st6];
import icon1 from '@/assets/lifecycle-1.png';
import icon2 from '@/assets/lifecycle-2.png';
import icon3 from '@/assets/lifecycle-3.png';

export const serviceIcons = [Target, Phone, MessageSquare, PenTool, Share2, Layers, Search, WorkflowIcon, Sparkles, Code2];
export function CTA({ children = 'Book a Free Strategy Call', secondary = false, to = '/contact' }: { children?: React.ReactNode; secondary?: boolean; to?: '/book-call' | '/services' | '/contact' | '/about' | '/blog' }) {
  return <Button asChild variant={secondary ? 'outline' : 'default'} className={`hx-button ${secondary ? 'hx-secondary' : 'hx-primary'}`}><Link to={to}>{children}<ArrowRight aria-hidden="true" /></Link></Button>;
}
export function Eyebrow({ children }: { children: React.ReactNode }) { return <p className="hx-eyebrow">{children}</p>; }
export function PageHero({ label, title, text, children }: { label: string; title: React.ReactNode; text: string; children?: React.ReactNode }) { return <section className="hx-page-hero"><div className="hx-container"><Eyebrow>{label}</Eyebrow><h1>{title}</h1><p className="hx-lead">{text}</p>{children}</div></section>; }
export function FinalCTA() { return <section className="hx-final"><div className="hx-container" data-reveal><Eyebrow>YOUR NEXT CHAPTER</Eyebrow><h2>Good leads deserve<br />a <em>great follow-up.</em></h2><p>Bring your marketing and AI together. Let’s talk about the system your business needs.</p><CTA /><Link className="hx-text-link" to="/contact">Or send us a message <ArrowRight size={16} /></Link></div></section>; }

export function Lifecycle() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const animations = Array.from(el.querySelectorAll<HTMLElement>('.hx-cycle-state')).map((node, index) => node.animate([
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(6px)', offset: 0 },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)', offset: .0714 },
      { opacity: 1, transform: 'translateY(0)', filter: 'blur(0)', offset: .19 },
      { opacity: 0, transform: 'translateY(-8px)', filter: 'blur(5px)', offset: .25 },
      { opacity: 0, transform: 'translateY(12px)', filter: 'blur(6px)', offset: 1 },
    ], { duration: 7000, iterations: Infinity, delay: index * 1750, easing: 'ease-out', fill: 'backwards' }));
    const visibility = () => animations.forEach(a => document.hidden ? a.pause() : a.play());
    visibility();
    document.addEventListener('visibilitychange', visibility);
    return () => { animations.forEach(a => a.cancel()); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  return <div className="hx-lifecycle" ref={ref}>{['ATTRACT', 'RESPOND', 'BOOK', 'GROW'].map((word, i) => <div aria-hidden="true" className={`hx-cycle-state hx-cycle-${i}`} key={word}><img src={[icon0, icon1, icon2, icon3][i]} alt="" width="512" height="512" /><span>{word}</span><span className="hx-cycle-note">One connected system.</span></div>)}</div>;
}

export function FAQ({ items = questions }: { items?: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return <section className="hx-section hx-faq"><div className="hx-container hx-split"><div className="hx-faq-intro" data-reveal><Eyebrow>A LITTLE MORE CLARITY</Eyebrow><h2>Good questions.<br /><em>Straight answers.</em></h2><p>Still have something on your mind?</p><Link className="hx-text-link" to="/contact">Let’s talk <ArrowUpRight size={18} /></Link></div><div className="hx-faq-list">{items.map((faq, i) => <article className={`hx-faq-item ${open === i ? 'is-open' : ''}`} key={faq.question}><h3><Button variant="ghost" id={`faq-toggle-${i}`} className="hx-faq-toggle" aria-expanded={open === i} aria-controls={`faq-${i}`} onClick={() => setOpen(open === i ? null : i)}><span className="hx-faq-number" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span><span className="hx-faq-question">{faq.question}</span><span className="hx-faq-icon" aria-hidden="true"><Plus className={open === i ? 'hx-open' : ''} size={18} /></span></Button></h3><div id={`faq-${i}`} role="region" aria-labelledby={`faq-toggle-${i}`} className="hx-faq-answer" hidden={open !== i}><p>{faq.answer}</p></div></article>)}</div></div></section>;
}
export function Process({ heading = true }: { heading?: boolean }) { return <section className="hx-section"><div className="hx-container">{heading && <div className="hx-heading" data-reveal><Eyebrow>HOW IT WORKS</Eyebrow><h2>From first conversation<br />to a <em>connected system.</em></h2><p>Our published 25-day rollout. One clear step at a time.</p></div>}<div className="hx-process">{process.map((step, i) => <article key={step.title} data-reveal><div className="hx-process-top"><span>0{i + 1}</span><ArrowRight size={20} /></div><small>{step.period}</small><h3>{step.title}</h3><p>{step.text}</p></article>)}</div></div></section>; }
// Maps scroll progress (0–1) through the pinned Process section to the active step.
export function stepFromProgress(progress: number, count = 6) {
  return Math.min(count - 1, Math.max(0, Math.floor(progress * count)));
}
export function Workflow() {
  const [active, setActive] = useState(0);
  const trackRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      const progress = scrollable > 0 ? -rect.top / scrollable : 0;
      setActive(stepFromProgress(progress));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => { window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);
  const steps = ['Ad campaign', 'Lead capture', 'AI response', 'Qualification', 'Appointment', 'Reporting'];
  const descriptions = ['Reach prospective customers with focused Meta ad campaigns built around the jobs you want more of.', 'Every ad click lands on a focused page with one clear next step, and every inquiry is captured.', 'AI answers inbound calls and messages right away, so no new lead waits or goes cold.', 'Each inquiry is understood and qualified before it reaches your calendar.', 'Qualified leads book straight into your calendar, with reminders in the same connected workflow.', 'See leads, bookings and revenue together in clear weekly reporting.'];
  return <section className="hx-workflow hx-pin" ref={trackRef} style={{ ['--hx-steps' as string]: steps.length }}>
    <div className="hx-pin-stage"><div className="hx-container hx-pin-grid">
      <div className="hx-pin-copy">
        <Eyebrow>PROCESS</Eyebrow>
        <h2>Not more tools.<br /><em>More connection.</em></h2>
        <p>Your ads shouldn’t end at the click. We connect everything that happens next.</p>
        <CTA secondary to="/services">See the whole process</CTA>
      </div>
      <div className="hx-pin-cards">{steps.map((step, i) => { const depth = active - i; return <article key={step} className={`hx-pin-card ${i === active ? 'is-active' : ''} ${i > active ? 'is-next' : ''}`} style={{ ['--depth' as string]: Math.max(0, depth), zIndex: i }} aria-hidden={i > active}>
        <div className="hx-pin-card-top"><span>STEP 0{i + 1}</span></div><img className="hx-pin-3d" src={step3d[i] ?? st1} alt="" aria-hidden="true" width={816} height={816} loading="lazy" />
        <h3>{step}</h3><p>{descriptions[i]}</p>
      </article>; })}</div>
    </div></div>
  </section>;
}

export function Dashboard({ compact = false, kind = 0 }: { compact?: boolean; kind?: number }) {
  return <div className={`hx-dashboard ${compact ? 'is-compact' : ''}`}><div className="hx-dash-top"><span className="hx-mini-logo">h.</span><strong>{['Campaign overview', 'Voice assistant', 'Follow-up activity', 'Lead capture', 'Your pipeline', 'Weekly reporting', 'Campaign audit'][kind]}</strong><span className="hx-live">Connected</span></div>{kind === 1 ? <div className="hx-call-visual"><div className="hx-phone-icon"><Phone /></div><p>Incoming inquiry</p><div className="hx-wave">{Array.from({ length: 24 }, (_, i) => <i key={i} className={`wave-${i % 5}`} />)}</div><span>Listening · Qualifying · Booking</span></div> : kind === 2 ? <div className="hx-messages"><div>Thanks for your inquiry. What can we help you with?<small>AI assistant</small></div><div>I’d like to arrange an appointment.<small>New lead</small></div><div>Let’s find a time that works for you.<Check size={14} /></div></div> : kind === 3 ? <div className="hx-form-visual"><span>Let’s get you booked.</span><i>Your name</i><i>Email address</i><i>What do you need?</i><b>Request an appointment <ArrowRight size={14} /></b></div> : kind === 4 ? <div className="hx-pipeline">{['New lead', 'Contacted', 'Booked'].map((s, i) => <div key={s}><small>{s}</small>{Array.from({ length: 3 - i }, (_, j) => <span key={j}><i /><b /></span>)}</div>)}</div> : <><div className="hx-dash-label"><span>Lead-to-booking activity</span><span>Monthly view <ChevronDown size={12} /></span></div><div className="hx-chart" aria-hidden="true">{[25, 42, 35, 54, 48, 66, 56, 74, 64, 84, 78, 95].map((n, i) => <div key={i} className={`bar-${n}`}><span /></div>)}</div><div className="hx-chart-label"><span>Attract</span><span>Respond</span><span>Book</span></div><div className="hx-dash-bottom"><Check size={14} /><span>Every inquiry. One connected pipeline.</span></div></>}<p className="hx-concept">Conceptual workflow illustration · not client performance</p></div>;
}