import { Link } from '@tanstack/react-router';
import { ArrowUpRight, Check } from 'lucide-react';
import { services } from '../content';
import { funnels } from '../funnel';
import { CTA, PageHero, Eyebrow, FAQ } from '../components/Design';

// Funnel layout: problem → solution → outcomes → action.
export default function ServiceDetail({ slug }: { slug: string }) {
  const service = services.find(s => s.slug === slug);
  const f = funnels[slug];
  if (!service || !f) return null;
  const related = service.related.map(r => services.find(s => s.slug === r)).filter((s): s is (typeof services)[number] => Boolean(s)).slice(0, 3);
  return <>
    <PageHero label={service.title.toUpperCase()} title={f.h1} text={f.lead}>
      <div className="hx-actions"><CTA>{f.cta}</CTA><CTA secondary to="/services">All Services</CTA></div>
    </PageHero>

    <section className="hx-section hx-fn-section">
      <div className="hx-container">
        <div className="hx-heading" data-reveal><Eyebrow>SOUND FAMILIAR?</Eyebrow><h2>You’re not alone.</h2></div>
        <div className="hx-fn-grid">{f.pains.map((p, i) => <article className="hx-glass hx-fn-card" key={p.title} data-reveal><span>0{i + 1}</span><h3>{p.title}</h3><p>{p.text}</p></article>)}</div>
      </div>
    </section>

    <section className="hx-section hx-why hx-fn-section">
      <div className="hx-container">
        <div className="hx-heading" data-reveal><Eyebrow>THE FIX</Eyebrow><h2>{f.solutionTitle}</h2><p>{f.solutionText}</p></div>
        <ol className="hx-fn-steps">{f.steps.map((s, i) => <li className="hx-glass" key={s.title} data-reveal><span>{String(i + 1).padStart(2, '0')}</span><h3>{s.title}</h3><p>{s.text}</p></li>)}</ol>
      </div>
    </section>

    <section className="hx-section hx-fn-section">
      <div className="hx-container hx-fn-outcomes" data-reveal>
        <div><Eyebrow>WHAT CHANGES</Eyebrow><h2>{service.outcome}.</h2><CTA>{f.cta}</CTA></div>
        <ul>{f.outcomes.map(o => <li key={o}><Check size={20} />{o}</li>)}</ul>
      </div>
    </section>

    <FAQ items={service.faqs.slice(0, 4)} />

    <section className="hx-final"><div className="hx-container" data-reveal>
      <Eyebrow>LET’S DO THIS</Eyebrow>
      <h2>{f.ctaTitle}</h2>
      <p>{f.ctaText}</p>
      <CTA>{f.cta}</CTA>
      {related.length > 0 && <div className="hx-svc-related">{related.map(s => <Link className="hx-text-link" to="/services/$slug" params={{ slug: s.slug }} key={s.slug}>{s.title} <ArrowUpRight size={16} /></Link>)}</div>}
    </div></section>
  </>;
}
