import { useEffect, useRef } from 'react';
import { Link } from '@tanstack/react-router';
import { CTA } from './Design';
import { Play, ArrowUpRight } from 'lucide-react';
import s0 from '@/assets/svc-0.jpg';
import s1 from '@/assets/svc-1.jpg';
import s2 from '@/assets/svc-2.jpg';
import s4 from '@/assets/svc-4.jpg';
import s6 from '@/assets/svc-6.jpg';
import sChat from '@/assets/svc-chatbot.jpg';
import sDesign from '@/assets/svc-webdesign.jpg';
import sSocial from '@/assets/svc-social.jpg';
import sAeo from '@/assets/svc-aeo.jpg';
import sDev from '@/assets/svc-webdev.jpg';
import { services } from '../content';

// One photo per service, in service order.
const photos = [s0, s1, sChat, sDesign, sSocial, s4, s6, s2, sAeo, sDev];
const COUNT = 10;
const PITCH = 196;

export function roundedQuad(w: number, hl: number, hr: number, H: number, r: number) {
  const tl = (H - hl) / 2, bl = tl + hl, tr = (H - hr) / 2, br = tr + hr;
  return `path('M ${r} ${tl + r * (tr - tl) / w} L ${w - r} ${tr - r * (tr - tl) / w} Q ${w} ${tr} ${w} ${tr + r} L ${w} ${br - r} Q ${w} ${br} ${w - r} ${br + r * (bl - br) / w} L ${r} ${bl - r * (bl - br) / w} Q 0 ${bl} 0 ${bl - r} L 0 ${tl + r} Q 0 ${tl} ${r} ${tl + r * (tr - tl) / w} Z')`;
}

export function ReelBand({ label = 'Hexa Systems services', linked = false }: { label?: string; linked?: boolean }) {
  const moved = useRef(0);
  const band = useRef<HTMLDivElement>(null);
  const cards = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const el = band.current; if (!el) return;
    const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
    let offset = 0, vel = 0, dragging = false, lastX = 0, lastT = 0, prev = performance.now(), raf = 0;
    const loop = PITCH * COUNT;
    const draw = (now: number) => {
      const dt = Math.min(0.05, (now - prev) / 1000); prev = now;
      const W = el.clientWidth, mobile = W <= 820, scale = mobile ? 640 : 1440, u = W / scale, c = scale / 2, span = c - 14;
      if (!dragging && !reduced && !document.hidden) { offset -= 50 * u * dt; offset += vel * dt; vel *= Math.pow(0.05, dt); }
      const H = el.clientHeight;
      cards.current.forEach((card, i) => {
        if (!card) return;
        let t = ((i * PITCH + offset / u) % loop + loop) % loop - loop / 2;
        const x = c + t * (1 + 0.083 * (t / span) ** 2);
        const d = Math.min(1.4, Math.abs(x - c) / span);
        const w = 170 + 48 * d * d;
        const qe = (ex: number) => Math.min(1.4, Math.abs(ex - c) / span) ** 2.6;
        const hl = 280 + 92 * qe(x - w / 2), hr = 280 + 92 * qe(x + w / 2);
        const h = Math.max(hl, hr);
        const cy = H / u / 2 + 10 - 12 * d * d;
        card.style.width = `${w * u}px`; card.style.height = `${h * u}px`;
        card.style.transform = `translate(${(x - w / 2) * u}px, ${(cy - h / 2) * u}px)`;
        card.style.clipPath = roundedQuad(w * u, hl * u, hr * u, h * u, 15 * u);
      });
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);
    const down = (e: PointerEvent) => { moved.current = 0; dragging = true; vel = 0; lastX = e.clientX; lastT = performance.now(); };
    const move = (e: PointerEvent) => { if (!dragging) return; const n = performance.now(), dx = e.clientX - lastX; moved.current += Math.abs(dx); if (moved.current > 6 && !el.hasPointerCapture(e.pointerId)) el.setPointerCapture(e.pointerId); offset += dx; vel = dx / Math.max(0.001, (n - lastT) / 1000); lastX = e.clientX; lastT = n; };
    const up = () => { dragging = false; };
    el.addEventListener('pointerdown', down); el.addEventListener('pointermove', move); el.addEventListener('pointerup', up); el.addEventListener('pointercancel', up);
    return () => { cancelAnimationFrame(raf); el.removeEventListener('pointerdown', down); el.removeEventListener('pointermove', move); el.removeEventListener('pointerup', up); el.removeEventListener('pointercancel', up); };
  }, []);

  return (
    <div className="hx-rm-band" ref={band} aria-label={label} role="region">
        {Array.from({ length: COUNT }, (_, i) => {
          const sv = services[i % services.length];
          if (linked && sv) return <Link key={i} to="/services/$slug" params={{ slug: sv.slug }} className="hx-rm-card hx-rm-card--svc" ref={n => { cards.current[i] = n as unknown as HTMLDivElement; }} aria-label={`Explore ${sv.title}`} draggable={false} onClick={e => { if (moved.current > 6) e.preventDefault(); }}>
            <img src={photos[i % photos.length]} alt="" draggable={false} />
            <span className="hx-rm-shade" />
            <h3 className="hx-rm-title">{sv.title}</h3>
            <span className="hx-rm-arrow"><ArrowUpRight size={16} /></span>
          </Link>;
          return <div key={i} className="hx-rm-card" ref={n => { cards.current[i] = n; }}>
            <img src={photos[i % photos.length]} alt={sv?.title ?? ''} draggable={false} loading={i < 6 ? 'eager' : 'lazy'} />
            <span className="hx-rm-play"><Play size={14} fill="currentColor" /></span>
          </div>;
        })}
      </div>
  );
}

export default function HeroReel() {
  return (
    <section className="hx-rm">
      <div className="hx-rm-copy">
        <span className="hx-rm-badge"><span>AI-powered growth systems</span></span>
        <h1><span>We Turn Ad Spend</span><span>Into Booked Jobs</span></h1>
        <p>Ads bring the leads. AI answers every one of them.<br />One connected system, from first click to booked job.</p>
        <svg className="hx-rm-slash" viewBox="0 0 40 40" aria-hidden="true"><path d="M12 32 L22 8 M22 34 L32 10" /></svg>
        <div className="hx-rm-note hx-rm-note--seen" aria-hidden="true">Ads + AI,<br />together
          <svg viewBox="0 0 120 200"><path d="M40 6 C 100 40, 110 110, 40 180 M40 180 l4 -18 M40 180 l18 -6" /></svg>
        </div>
      </div>
      <ReelBand />
      <div className="hx-rm-cta">
        <span className="hx-rm-note hx-rm-note--live" aria-hidden="true">Live in 25 days
          <svg viewBox="0 0 70 40"><path d="M4 8 C 30 4, 50 14, 64 32 M64 32 l-2 -12 M64 32 l-12 -2" /></svg>
        </span>
        <span className="hx-rm-cta-btn"><CTA to="/contact">Book a Strategy Call</CTA></span>
      </div>
    </section>
  );
}
