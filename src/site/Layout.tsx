import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { ArrowRight, ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useScrollEffects } from './hooks';
import { CTA, serviceIcons } from './components/Design';
import { contactConfig, serviceGroups, services } from './content';
import meadow from '@/assets/meadow.mp4.asset.json';
import poster from '@/assets/meadow-poster.jpg';

export function Brand({ name = true }: { name?: boolean }) { return <Link to="/" className={`hx-brand ${name ? '' : 'hx-brand--mark'}`} aria-label="Hexa Systems home"><img className="hx-brand-symbol" src="/logo.png" alt="" width="273" height="325" />{name ? <span className="hx-brand-name">HEXA<small>SYSTEMS</small></span> : null}</Link>; }
export default function Layout({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const menu = useRef<HTMLDivElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  useScrollEffects();
  useEffect(() => { setOpen(false); }, [location.pathname]);
  useEffect(() => {
    if (!open) return;
    menu.current?.querySelector<HTMLElement>('a')?.focus();
    const key = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); toggle.current?.focus(); } };
    document.addEventListener('keydown', key);
    return () => document.removeEventListener('keydown', key);
  }, [open]);
  useEffect(() => {
    const node = video.current;
    if (!node) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    let inView = false;
    const sync = () => { if (inView && !document.hidden && !reduced.matches) void node.play().catch(() => {}); else node.pause(); };
    const observer = new IntersectionObserver(entries => { inView = entries.some(e => e.isIntersecting); sync(); });
    observer.observe(node); document.addEventListener('visibilitychange', sync); reduced.addEventListener('change', sync);
    return () => { observer.disconnect(); document.removeEventListener('visibilitychange', sync); reduced.removeEventListener('change', sync); };
  }, []);
  const links = [{ to: '/', label: 'Home' }, { to: '/services', label: 'Services' }, { to: '/about', label: 'About' }, { to: '/blog', label: 'Blog' }, { to: '/contact', label: 'Contact' }] as const;
  return <div className="hx-site"><a className="hx-skip" href="#main-content">Skip to content</a><header className="hx-header"><nav className="hx-container hx-nav" aria-label="Primary navigation"><Brand name={false} /><div ref={menu} id="main-menu" className={`hx-nav-links ${open ? 'is-open' : ''}`}>{links.map(l => l.to === '/services' ? <div className="hx-nav-drop" key={l.to}><Link to={l.to} className={location.pathname.startsWith('/services') ? 'active' : ''} onClick={() => setOpen(false)} aria-haspopup="true">{l.label}<ChevronDown size={16} /></Link><div className="hx-nav-menu" role="menu" aria-label="Services"><div className="hx-nav-menu-groups">{serviceGroups.map(g => <div className="hx-nav-group" key={g.title}><p className="hx-nav-group-title">{g.title}</p>{g.slugs.map(slug => { const s = services.find(x => x.slug === slug); if (!s) return null; const Icon = serviceIcons[s.index % serviceIcons.length]; return <Link key={s.slug} role="menuitem" to="/services/$slug" params={{ slug: s.slug }} onClick={() => setOpen(false)}><span className="hx-nav-item-icon"><Icon size={17} /></span><span className="hx-nav-item-text"><strong>{s.title}</strong><small>{s.hook}</small></span><ArrowUpRight className="hx-nav-item-arrow" size={15} /></Link>; })}</div>)}</div><Link className="hx-nav-menu-all" to="/services" onClick={() => setOpen(false)}>Explore all services<ArrowRight size={16} /></Link></div></div> : <Link key={l.to} to={l.to} className={location.pathname === l.to ? 'active' : ''} onClick={() => setOpen(false)}>{l.label}</Link>)}<div className="hx-mobile-cta"><CTA>Let’s Talk Growth</CTA></div></div><div className="hx-nav-cta"><CTA>Let’s Talk Growth</CTA></div><Button ref={toggle} variant="ghost" size="icon" className="hx-menu-button" aria-label={open ? 'Close menu' : 'Open menu'} aria-expanded={open} aria-controls="main-menu" onClick={() => setOpen(!open)}>{open ? <X /> : <Menu />}</Button></nav></header><main id="main-content">{children}</main><footer className="hx-footer"><div className="hx-footer-media" aria-hidden="true"><img src={poster} alt="" width="1920" height="1024" loading="lazy"/><video ref={video} src={meadow.url} poster={poster} muted loop playsInline preload="none" /></div><div className="hx-container"><div className="hx-footer-grid"><div className="hx-footer-brand"><Brand name={false} /><h3>A better way<br />to grow your business.</h3><p>Performance marketing and AI automation. Connected from the first click to the booked job.</p><CTA>Let’s Talk Growth</CTA></div><nav className="hx-footer-col" aria-label="Footer services"><h4>SERVICES</h4>{services.slice(0, 5).map(s => <Link key={s.slug} to="/services/$slug" params={{ slug: s.slug }}>{s.title}</Link>)}</nav><nav className="hx-footer-col" aria-label="Footer company"><h4>COMPANY</h4><Link to="/about">About Hexa</Link><Link to="/services">Our Services</Link><Link to="/blog">Blog</Link><Link to="/contact">Contact</Link></nav><div className="hx-footer-col"><h4>LET’S CONNECT</h4><a href={`mailto:${contactConfig.email}`}>{contactConfig.email}</a><Link to="/contact">Free Strategy Call ↗</Link><Link to="/contact">Send an Inquiry ↗</Link></div></div><div className="hx-footer-bottom"><span>© 2026 HEXA SYSTEMS. ALL RIGHTS RESERVED.</span><span>Marketing + AI. Working together.</span></div><p className="hx-footer-wordmark" aria-hidden="true">HEXA SYSTEMS</p></div><div className="hx-footer-fog" aria-hidden="true" /></footer></div>;
}
