import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./admin.css";
import { useAuth } from "../contexts/AuthContext";
import { useCms } from "../contexts/CmsContext";
import type {
  Service, Project, Stat, Faq, Advantage, Brand, TeamMember,
  HeroData, AboutData, ContactInfo, SiteSettings,
} from "../contexts/CmsContext";

/* ── Toast ── */
function Toast({ msg, onHide }: { msg: string; onHide: () => void }) {
  useEffect(() => { const t = setTimeout(onHide, 2800); return () => clearTimeout(t); }, [onHide]);
  return <div className="ad-toast">✓ {msg}</div>;
}

/* ── Icon helpers ── */
const Icon = {
  dashboard: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>,
  hero: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>,
  services: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>,
  portfolio: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>,
  stats: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>,
  about: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>,
  faq: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="10"/><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"/><line x1="12" y1="17" x2="12.01" y2="17" strokeLinecap="round" strokeWidth="3"/></svg>,
  team: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>,
  brands: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"/><line x1="7" y1="7" x2="7.01" y2="7" strokeWidth="3" strokeLinecap="round"/></svg>,
  contact: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>,
  settings: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>,
  logout: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>,
  plus: <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>,
  edit: <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none"><path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>,
  trash: <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none"><polyline points="3 6 5 6 21 6"/><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2"/></svg>,
  external: <svg viewBox="0 0 24 24" width="13" height="13" stroke="currentColor" strokeWidth="2" fill="none"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>,
  x: <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>,
};

type Section = "overview" | "hero" | "services" | "portfolio" | "stats" | "about" | "faq" | "team" | "brands" | "contact" | "settings";

/* ════════════════════════════════════
   AUTH — Login / Signup
════════════════════════════════════ */
function AuthPage() {
  const { login, signup } = useAuth();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); setError("");
    const res = login(email, password);
    if (!res.success) { setError(res.error ?? "Login failed."); setLoading(false); }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Please enter your name."); return; }
    setLoading(true); setError("");
    const res = signup(name, email, password);
    if (!res.success) { setError(res.error ?? "Signup failed."); setLoading(false); }
  };

  return (
    <div className="ad-auth">
      <div className="ad-auth-card">
        <div className="ad-auth-logo">
          <img src="/logo.png" alt="Logo" />
          <span>TheHexaSystem</span>
        </div>

        {mode === "login" ? (
          <>
            <h1 className="ad-auth-title">Welcome back</h1>
            <p className="ad-auth-sub">Sign in to your account to continue</p>
            <form className="ad-form" onSubmit={handleLogin}>
              {error && <div className="ad-error">{error}</div>}
              <div className="ad-field"><label>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" /></div>
              <div className="ad-field"><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="••••••••" required /></div>
              <button className="ad-btn ad-btn-primary" type="submit" disabled={loading}>{loading ? "Signing in…" : "Sign In"}</button>
            </form>
            <div className="ad-divider" style={{ marginTop: 20 }}>or</div>
            <p className="ad-link-row" style={{ marginTop: 12 }}>Don't have an account? <button onClick={() => { setMode("signup"); setError(""); }}>Create one</button></p>
          </>
        ) : (
          <>
            <h1 className="ad-auth-title">Create account</h1>
            <p className="ad-auth-sub">Join TheHexaSystem platform</p>
            <form className="ad-form" onSubmit={handleSignup}>
              {error && <div className="ad-error">{error}</div>}
              <div className="ad-field"><label>Full Name</label><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="John Smith" required /></div>
              <div className="ad-field"><label>Email Address</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="you@example.com" required autoComplete="email" /></div>
              <div className="ad-field"><label>Password</label><input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Min 6 characters" required /></div>
              <button className="ad-btn ad-btn-primary" type="submit" disabled={loading}>{loading ? "Creating…" : "Create Account"}</button>
            </form>
            <p className="ad-link-row" style={{ marginTop: 16 }}>Already have an account? <button onClick={() => { setMode("login"); setError(""); }}>Sign in</button></p>
          </>
        )}
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   USER PROFILE (non-admin)
════════════════════════════════════ */
function UserProfile() {
  const { user, logout } = useAuth();
  if (!user) return null;
  const initials = user.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2);
  return (
    <div className="ad-auth" style={{ flexDirection: "column", gap: 16 }}>
      <div className="ad-auth-card" style={{ textAlign: "center" }}>
        <div className="ad-profile-avatar">{initials}</div>
        <h2 className="ad-auth-title">{user.name}</h2>
        <p className="ad-auth-sub">{user.email}</p>
        <p style={{ color: "#adff35", fontSize: "0.78rem", fontWeight: 800, marginBottom: 24, textTransform: "uppercase", letterSpacing: "0.08em" }}>Standard Account</p>
        <div className="ad-card" style={{ textAlign: "left" }}>
          <div className="ad-card-title"><span />Account Details</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {[["Name", user.name], ["Email", user.email], ["Account Type", "Standard User"], ["Member Since", new Date(user.joinedAt).toLocaleDateString()]].map(([k, v]) => (
              <div key={k} style={{ display: "flex", justifyContent: "space-between", fontSize: "0.84rem", paddingBottom: 10, borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
                <span style={{ color: "#5d7096" }}>{k}</span>
                <span style={{ color: "#dde4f0", fontWeight: 700 }}>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <p style={{ color: "#5d7096", fontSize: "0.82rem", marginBottom: 20, lineHeight: 1.6 }}>Admin access is restricted to authorised personnel only.</p>
        <button className="ad-btn ad-btn-ghost" onClick={logout} style={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>{Icon.logout} Sign Out</button>
      </div>
      <Link to="/" style={{ color: "#adff35", fontSize: "0.84rem", fontWeight: 700 }}>← Back to Website</Link>
    </div>
  );
}

/* ════════════════════════════════════
   DASHBOARD LAYOUT
════════════════════════════════════ */
const NAV_ITEMS: { id: Section; label: string; icon: React.ReactNode; group: string }[] = [
  { id: "overview",  label: "Overview",     icon: Icon.dashboard, group: "Dashboard" },
  { id: "hero",      label: "Hero Section", icon: Icon.hero,      group: "Content" },
  { id: "services",  label: "Services",     icon: Icon.services,  group: "Content" },
  { id: "portfolio", label: "Portfolio",    icon: Icon.portfolio, group: "Content" },
  { id: "stats",     label: "Stats",        icon: Icon.stats,     group: "Content" },
  { id: "about",     label: "About",        icon: Icon.about,     group: "Content" },
  { id: "faq",       label: "FAQ",          icon: Icon.faq,       group: "Content" },
  { id: "team",      label: "Team",         icon: Icon.team,      group: "People" },
  { id: "brands",    label: "Brands",       icon: Icon.brands,    group: "People" },
  { id: "contact",   label: "Contact Info", icon: Icon.contact,   group: "Settings" },
  { id: "settings",  label: "Site Settings",icon: Icon.settings,  group: "Settings" },
];

const SECTION_TITLES: Record<Section, [string, string]> = {
  overview:  ["Dashboard Overview", "Quick summary of your site content"],
  hero:      ["Hero Section",       "Edit the main headline and CTAs on your homepage"],
  services:  ["Services",           "Manage the services you offer"],
  portfolio: ["Portfolio",          "Manage case studies and featured work"],
  stats:     ["Stats",              "The numbers you display across the site"],
  about:     ["About & Advantages", "Edit your company description and selling points"],
  faq:       ["FAQ",                "Manage frequently asked questions"],
  team:      ["Team Members",       "Add or update team profiles"],
  brands:    ["Brand Strip",        "The logos in the marquee on the homepage"],
  contact:   ["Contact Info",       "Email, phone, location displayed on the contact page"],
  settings:  ["Site Settings",      "Site name, accent color, and footer text"],
};

function Sidebar({ active, onSelect, user, onLogout }: { active: Section; onSelect: (s: Section) => void; user: { name: string; email: string } | null; onLogout: () => void }) {
  const groups = Array.from(new Set(NAV_ITEMS.map(n => n.group)));
  const initials = user?.name.split(" ").map(n => n[0]).join("").toUpperCase().slice(0, 2) ?? "A";
  return (
    <aside className="ad-sidebar">
      <div className="ad-sidebar-logo">
        <img src="/logo.png" alt="Logo" />
        <span>Admin Panel</span>
      </div>
      <nav className="ad-nav">
        {groups.map(g => (
          <React.Fragment key={g}>
            <div className="ad-nav-section">{g}</div>
            {NAV_ITEMS.filter(n => n.group === g).map(n => (
              <button key={n.id} className={`ad-nav-item${active === n.id ? " active" : ""}`} onClick={() => onSelect(n.id)}>
                {n.icon}<span>{n.label}</span>
              </button>
            ))}
          </React.Fragment>
        ))}
      </nav>
      <div className="ad-sidebar-footer">
        <div className="ad-user-row">
          <div className="ad-user-avatar">{initials}</div>
          <div className="ad-user-info"><strong>{user?.name ?? "Admin"}</strong><span>Administrator</span></div>
          <button className="ad-logout-btn" onClick={onLogout} title="Sign out">{Icon.logout}</button>
        </div>
      </div>
    </aside>
  );
}

/* ════════════════════════════════════
   SECTION: OVERVIEW
════════════════════════════════════ */
function SectionOverview({ onNav }: { onNav: (s: Section) => void }) {
  const { cms } = useCms();
  const counts: [string, number, Section][] = [
    ["Services", cms.services.length, "services"],
    ["Portfolio Items", cms.projects.length, "portfolio"],
    ["FAQ Items", cms.faqs.length, "faq"],
    ["Team Members", cms.team.length, "team"],
  ];
  const quickActions: { label: string; desc: string; icon: string; sec: Section }[] = [
    { label: "Add Service",     desc: "Add a new service offering",   icon: "⚙️", sec: "services" },
    { label: "Add Portfolio",   desc: "Add a new case study",         icon: "💼", sec: "portfolio" },
    { label: "Edit Hero",       desc: "Update homepage headline",      icon: "🎯", sec: "hero" },
    { label: "Edit About",      desc: "Update company description",    icon: "ℹ️", sec: "about" },
    { label: "Manage FAQ",      desc: "Add or edit FAQ entries",       icon: "❓", sec: "faq" },
    { label: "Site Settings",   desc: "Colors, name, footer",          icon: "🎨", sec: "settings" },
  ];
  return (
    <>
      <div className="ad-stats-row">
        {counts.map(([label, count, sec]) => (
          <div className="ad-stat-card" key={label} style={{ cursor: "pointer" }} onClick={() => onNav(sec)}>
            <strong>{count}</strong><span>{label}</span>
          </div>
        ))}
      </div>
      <div className="ad-card">
        <div className="ad-card-title"><span />Quick Actions</div>
        <div className="ad-quick-actions">
          {quickActions.map(a => (
            <button key={a.label} className="ad-quick-card" onClick={() => onNav(a.sec)}>
              <div className="ad-quick-card-icon">{a.icon}</div>
              <strong>{a.label}</strong>
              <span>{a.desc}</span>
            </button>
          ))}
        </div>
      </div>
      <div className="ad-card">
        <div className="ad-card-title"><span />Hero Preview</div>
        <div style={{ background: "rgba(173,255,53,0.04)", border: "1px solid rgba(173,255,53,0.1)", borderRadius: 10, padding: "20px 24px" }}>
          <p style={{ color: "#888", fontSize: "0.78rem", marginBottom: 6, textTransform: "uppercase", letterSpacing: "0.08em" }}>Current Headline</p>
          <p style={{ color: "#fff", fontSize: "1.1rem", fontWeight: 900 }}>{cms.hero.line1} <span style={{ color: "#adff35" }}>{cms.hero.line2}</span> {cms.hero.line3}</p>
          <p style={{ color: "#6b7a96", fontSize: "0.84rem", marginTop: 6 }}>{cms.hero.body.slice(0, 80)}…</p>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: HERO
════════════════════════════════════ */
function SectionHero({ toast }: { toast: (m: string) => void }) {
  const { cms, updateHero } = useCms();
  const [form, setForm] = useState<HeroData>({ ...cms.hero });
  const set = (k: keyof HeroData, v: string) => setForm(f => ({ ...f, [k]: v }));
  const save = () => { updateHero(form); toast("Hero section saved!"); };
  return (
    <>
      <div className="ad-card">
        <div className="ad-card-title"><span />Headline Lines</div>
        <div className="ad-form-grid ad-form-grid-2">
          {([["line1", "Line 1 (plain)"], ["line2", "Line 2 (accented)"], ["cursive", "Cursive word"], ["line3", "Line 3 (large)"]] as [keyof HeroData, string][]).map(([k, label]) => (
            <label className="ad-label" key={k}><span>{label}</span><input className="ad-input" value={form[k]} onChange={e => set(k, e.target.value)} /></label>
          ))}
        </div>
      </div>
      <div className="ad-card">
        <div className="ad-card-title"><span />Body & CTAs</div>
        <div className="ad-form-grid">
          <label className="ad-label"><span>Body Text</span><textarea className="ad-textarea" value={form.body} onChange={e => set("body", e.target.value)} rows={3} /></label>
          <div className="ad-form-grid ad-form-grid-2">
            <label className="ad-label"><span>CTA Button 1</span><input className="ad-input" value={form.cta1} onChange={e => set("cta1", e.target.value)} /></label>
            <label className="ad-label"><span>CTA Button 2</span><input className="ad-input" value={form.cta2} onChange={e => set("cta2", e.target.value)} /></label>
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="ad-btn ad-btn-primary" onClick={save} style={{ display: "flex", alignItems: "center", gap: 8 }}>{Icon.edit} Save Hero Section</button>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: SERVICES
════════════════════════════════════ */
function SectionServices({ toast }: { toast: (m: string) => void }) {
  const { cms, addService, updateService, deleteService } = useCms();
  const [editing, setEditing] = useState<Service | null>(null);
  const [adding, setAdding] = useState(false);
  const blank = { title: "", text: "", detail: "" };
  const [form, setForm] = useState(blank);
  const set = (k: keyof typeof blank, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) { updateService({ ...editing, ...form }); toast("Service updated!"); }
    else { addService(form); toast("Service added!"); }
    setEditing(null); setAdding(false); setForm(blank);
  };

  const startEdit = (s: Service) => { setEditing(s); setAdding(false); setForm({ title: s.title, text: s.text, detail: s.detail }); };

  return (
    <>
      <div className="ad-section-head">
        <div><h2>Services ({cms.services.length})</h2><p>These appear on the home page and services page.</p></div>
        <button className="ad-btn ad-btn-primary ad-btn-sm" onClick={() => { setAdding(true); setEditing(null); setForm(blank); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icon.plus} Add Service</button>
      </div>

      {(adding || editing) && (
        <div className="ad-inline-editor">
          <div className="ad-inline-editor-head"><h4>{editing ? "Edit Service" : "New Service"}</h4><button className="ad-btn-icon ad-btn-ghost" onClick={() => { setAdding(false); setEditing(null); }}>{Icon.x}</button></div>
          <div className="ad-form-grid">
            <label className="ad-label"><span>Title</span><input className="ad-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Service name" /></label>
            <label className="ad-label"><span>Short Description</span><input className="ad-input" value={form.text} onChange={e => set("text", e.target.value)} placeholder="One line summary" /></label>
            <label className="ad-label"><span>Detailed Description</span><textarea className="ad-textarea" value={form.detail} onChange={e => set("detail", e.target.value)} placeholder="Expanded detail shown on hover/expand" rows={3} /></label>
          </div>
          <div className="ad-save-row"><button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => { setAdding(false); setEditing(null); }}>Cancel</button><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSave}>Save</button></div>
        </div>
      )}

      <div className="ad-card" style={{ padding: 0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>#</th><th>Title</th><th>Short Desc</th><th>Actions</th></tr></thead>
            <tbody>
              {cms.services.map((s, i) => (
                <tr key={s.id}>
                  <td style={{ color: "#adff35", fontWeight: 900, width: 40 }}>{String(i + 1).padStart(2, "0")}</td>
                  <td><strong style={{ color: "#fff" }}>{s.title}</strong></td>
                  <td><span className="ad-truncate">{s.text}</span></td>
                  <td>
                    <div className="ad-actions">
                      <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => startEdit(s)} title="Edit">{Icon.edit}</button>
                      <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteService(s.id); toast("Service removed."); }} title="Delete">{Icon.trash}</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: PORTFOLIO
════════════════════════════════════ */
function SectionPortfolio({ toast }: { toast: (m: string) => void }) {
  const { cms, addProject, updateProject, deleteProject } = useCms();
  const [editing, setEditing] = useState<Project | null>(null);
  const [adding, setAdding] = useState(false);
  const blank = { category: "", title: "", text: "", client: "", result: "" };
  const [form, setForm] = useState(blank);
  const set = (k: keyof typeof blank, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.title.trim()) return;
    if (editing) { updateProject({ ...editing, ...form }); toast("Project updated!"); }
    else { addProject(form); toast("Project added!"); }
    setEditing(null); setAdding(false); setForm(blank);
  };

  const startEdit = (p: Project) => { setEditing(p); setAdding(false); setForm({ category: p.category, title: p.title, text: p.text, client: p.client, result: p.result }); };

  return (
    <>
      <div className="ad-section-head">
        <div><h2>Portfolio ({cms.projects.length})</h2><p>Case studies shown on home and portfolio pages.</p></div>
        <button className="ad-btn ad-btn-primary ad-btn-sm" onClick={() => { setAdding(true); setEditing(null); setForm(blank); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icon.plus} Add Project</button>
      </div>

      {(adding || editing) && (
        <div className="ad-inline-editor">
          <div className="ad-inline-editor-head"><h4>{editing ? "Edit Project" : "New Project"}</h4><button className="ad-btn-icon ad-btn-ghost" onClick={() => { setAdding(false); setEditing(null); }}>{Icon.x}</button></div>
          <div className="ad-form-grid ad-form-grid-2">
            <label className="ad-label"><span>Category</span><input className="ad-input" value={form.category} onChange={e => set("category", e.target.value)} placeholder="e.g. AI Chatbots" /></label>
            <label className="ad-label"><span>Client Name</span><input className="ad-input" value={form.client} onChange={e => set("client", e.target.value)} placeholder="Company name" /></label>
          </div>
          <label className="ad-label"><span>Project Title</span><input className="ad-input" value={form.title} onChange={e => set("title", e.target.value)} placeholder="Project title" /></label>
          <label className="ad-label"><span>Description</span><textarea className="ad-textarea" value={form.text} onChange={e => set("text", e.target.value)} rows={3} placeholder="Describe the project" /></label>
          <label className="ad-label"><span>Key Result</span><input className="ad-input" value={form.result} onChange={e => set("result", e.target.value)} placeholder="e.g. 70% reduction in support tickets" /></label>
          <div className="ad-save-row"><button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => { setAdding(false); setEditing(null); }}>Cancel</button><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSave}>Save</button></div>
        </div>
      )}

      <div className="ad-card" style={{ padding: 0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Category</th><th>Title</th><th>Client</th><th>Result</th><th>Actions</th></tr></thead>
            <tbody>
              {cms.projects.map(p => (
                <tr key={p.id}>
                  <td><span className="ad-tag">{p.category}</span></td>
                  <td><strong style={{ color: "#fff" }}>{p.title}</strong></td>
                  <td style={{ color: "#adff35" }}>{p.client}</td>
                  <td><span className="ad-truncate" style={{ maxWidth: 180 }}>{p.result}</span></td>
                  <td><div className="ad-actions">
                    <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => startEdit(p)}>{Icon.edit}</button>
                    <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteProject(p.id); toast("Project removed."); }}>{Icon.trash}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: STATS
════════════════════════════════════ */
function SectionStats({ toast }: { toast: (m: string) => void }) {
  const { cms, addStat, updateStat, deleteStat } = useCms();
  const [editing, setEditing] = useState<Stat | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ value: "", label: "" });
  const set = (k: "value" | "label", v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.value.trim() || !form.label.trim()) return;
    if (editing) { updateStat({ ...editing, ...form }); toast("Stat updated!"); }
    else { addStat(form); toast("Stat added!"); }
    setEditing(null); setAdding(false); setForm({ value: "", label: "" });
  };

  return (
    <>
      <div className="ad-section-head">
        <div><h2>Stats ({cms.stats.length})</h2><p>Numbers displayed in the stats grid.</p></div>
        <button className="ad-btn ad-btn-primary ad-btn-sm" onClick={() => { setAdding(true); setEditing(null); setForm({ value: "", label: "" }); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icon.plus} Add Stat</button>
      </div>

      {(adding || editing) && (
        <div className="ad-inline-editor">
          <div className="ad-inline-editor-head"><h4>{editing ? "Edit Stat" : "New Stat"}</h4><button className="ad-btn-icon ad-btn-ghost" onClick={() => { setAdding(false); setEditing(null); }}>{Icon.x}</button></div>
          <div className="ad-form-grid ad-form-grid-2">
            <label className="ad-label"><span>Value</span><input className="ad-input" value={form.value} onChange={e => set("value", e.target.value)} placeholder="e.g. 200+" /></label>
            <label className="ad-label"><span>Label</span><input className="ad-input" value={form.label} onChange={e => set("label", e.target.value)} placeholder="e.g. Projects Deployed" /></label>
          </div>
          <div className="ad-save-row"><button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => { setAdding(false); setEditing(null); }}>Cancel</button><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSave}>Save</button></div>
        </div>
      )}

      <div className="ad-card" style={{ padding: 0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Value</th><th>Label</th><th>Actions</th></tr></thead>
            <tbody>
              {cms.stats.map(s => (
                <tr key={s.id}>
                  <td><strong style={{ color: "#adff35", fontSize: "1.1rem" }}>{s.value}</strong></td>
                  <td style={{ color: "#dde4f0" }}>{s.label}</td>
                  <td><div className="ad-actions">
                    <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => { setEditing(s); setAdding(false); setForm({ value: s.value, label: s.label }); }}>{Icon.edit}</button>
                    <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteStat(s.id); toast("Stat removed."); }}>{Icon.trash}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: ABOUT
════════════════════════════════════ */
function SectionAbout({ toast }: { toast: (m: string) => void }) {
  const { cms, updateAbout, addAdvantage, updateAdvantage, deleteAdvantage } = useCms();
  const [about, setAbout] = useState<AboutData>({ ...cms.about });
  const [advForm, setAdvForm] = useState("");
  const [editAdv, setEditAdv] = useState<Advantage | null>(null);
  const [tab, setTab] = useState<"about" | "advantages">("about");

  const saveAbout = () => { updateAbout(about); toast("About section saved!"); };

  const handleSaveAdv = () => {
    if (!advForm.trim()) return;
    if (editAdv) { updateAdvantage({ ...editAdv, text: advForm }); toast("Advantage updated!"); }
    else { addAdvantage({ text: advForm }); toast("Advantage added!"); }
    setEditAdv(null); setAdvForm("");
  };

  return (
    <>
      <div className="ad-tabs">
        <button className={`ad-tab${tab === "about" ? " active" : ""}`} onClick={() => setTab("about")}>About Text</button>
        <button className={`ad-tab${tab === "advantages" ? " active" : ""}`} onClick={() => setTab("advantages")}>Advantages</button>
      </div>

      {tab === "about" && (
        <div className="ad-card">
          <div className="ad-card-title"><span />About Content</div>
          <div className="ad-form-grid" style={{ gap: 18 }}>
            <label className="ad-label"><span>Greeting Word</span><input className="ad-input" value={about.greeting} onChange={e => setAbout(a => ({ ...a, greeting: e.target.value }))} /></label>
            <label className="ad-label"><span>Paragraph 1</span><textarea className="ad-textarea" value={about.text1} onChange={e => setAbout(a => ({ ...a, text1: e.target.value }))} rows={4} /></label>
            <label className="ad-label"><span>Paragraph 2</span><textarea className="ad-textarea" value={about.text2} onChange={e => setAbout(a => ({ ...a, text2: e.target.value }))} rows={3} /></label>
          </div>
          <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 16 }}>
            <button className="ad-btn ad-btn-primary" onClick={saveAbout} style={{ display: "flex", alignItems: "center", gap: 8 }}>{Icon.edit} Save About</button>
          </div>
        </div>
      )}

      {tab === "advantages" && (
        <>
          <div className="ad-section-head">
            <div><h2>Advantages ({cms.advantages.length})</h2><p>Listed in the "Why Choose Us" section.</p></div>
            <button className="ad-btn ad-btn-primary ad-btn-sm" onClick={() => { setEditAdv(null); setAdvForm(""); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icon.plus} Add Point</button>
          </div>
          <div className="ad-inline-editor">
            <div className="ad-inline-editor-head"><h4>{editAdv ? "Edit Advantage" : "Add Advantage"}</h4></div>
            <label className="ad-label"><span>Advantage Text</span><input className="ad-input" value={advForm} onChange={e => setAdvForm(e.target.value)} placeholder="e.g. 24/7 System Reliability" /></label>
            <div className="ad-save-row"><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSaveAdv}>Save</button></div>
          </div>
          <div className="ad-card" style={{ padding: 0 }}>
            <div className="ad-table-wrap">
              <table className="ad-table">
                <thead><tr><th>Advantage Point</th><th>Actions</th></tr></thead>
                <tbody>
                  {cms.advantages.map(a => (
                    <tr key={a.id}>
                      <td style={{ color: "#dde4f0" }}>{a.text}</td>
                      <td><div className="ad-actions">
                        <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => { setEditAdv(a); setAdvForm(a.text); }}>{Icon.edit}</button>
                        <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteAdvantage(a.id); toast("Removed."); }}>{Icon.trash}</button>
                      </div></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}
    </>
  );
}

/* ════════════════════════════════════
   SECTION: FAQ
════════════════════════════════════ */
function SectionFaq({ toast }: { toast: (m: string) => void }) {
  const { cms, addFaq, updateFaq, deleteFaq } = useCms();
  const [editing, setEditing] = useState<Faq | null>(null);
  const [adding, setAdding] = useState(false);
  const [form, setForm] = useState({ question: "", answer: "" });
  const set = (k: "question" | "answer", v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.question.trim()) return;
    if (editing) { updateFaq({ ...editing, ...form }); toast("FAQ updated!"); }
    else { addFaq(form); toast("FAQ added!"); }
    setEditing(null); setAdding(false); setForm({ question: "", answer: "" });
  };

  return (
    <>
      <div className="ad-section-head">
        <div><h2>FAQ ({cms.faqs.length})</h2><p>Shown on the home and about pages.</p></div>
        <button className="ad-btn ad-btn-primary ad-btn-sm" onClick={() => { setAdding(true); setEditing(null); setForm({ question: "", answer: "" }); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icon.plus} Add FAQ</button>
      </div>

      {(adding || editing) && (
        <div className="ad-inline-editor">
          <div className="ad-inline-editor-head"><h4>{editing ? "Edit FAQ" : "New FAQ"}</h4><button className="ad-btn-icon ad-btn-ghost" onClick={() => { setAdding(false); setEditing(null); }}>{Icon.x}</button></div>
          <label className="ad-label"><span>Question</span><input className="ad-input" value={form.question} onChange={e => set("question", e.target.value)} placeholder="What is your question?" /></label>
          <label className="ad-label"><span>Answer</span><textarea className="ad-textarea" value={form.answer} onChange={e => set("answer", e.target.value)} rows={4} placeholder="The full answer..." /></label>
          <div className="ad-save-row"><button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => { setAdding(false); setEditing(null); }}>Cancel</button><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSave}>Save</button></div>
        </div>
      )}

      <div className="ad-card" style={{ padding: 0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>#</th><th>Question</th><th>Answer Preview</th><th>Actions</th></tr></thead>
            <tbody>
              {cms.faqs.map((f, i) => (
                <tr key={f.id}>
                  <td style={{ color: "#5d7096", width: 36 }}>{i + 1}</td>
                  <td><span style={{ color: "#fff", fontWeight: 700 }}>{f.question}</span></td>
                  <td><span className="ad-truncate">{f.answer}</span></td>
                  <td><div className="ad-actions">
                    <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => { setEditing(f); setAdding(false); setForm({ question: f.question, answer: f.answer }); }}>{Icon.edit}</button>
                    <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteFaq(f.id); toast("FAQ removed."); }}>{Icon.trash}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: TEAM
════════════════════════════════════ */
function SectionTeam({ toast }: { toast: (m: string) => void }) {
  const { cms, addTeamMember, updateTeamMember, deleteTeamMember } = useCms();
  const [editing, setEditing] = useState<TeamMember | null>(null);
  const [adding, setAdding] = useState(false);
  const blank = { name: "", initials: "", role: "", bio: "", color: "#adff35" };
  const [form, setForm] = useState(blank);
  const set = (k: keyof typeof blank, v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) { updateTeamMember({ ...editing, ...form }); toast("Team member updated!"); }
    else { addTeamMember(form); toast("Team member added!"); }
    setEditing(null); setAdding(false); setForm(blank);
  };

  return (
    <>
      <div className="ad-section-head">
        <div><h2>Team ({cms.team.length})</h2><p>Shown on the About page.</p></div>
        <button className="ad-btn ad-btn-primary ad-btn-sm" onClick={() => { setAdding(true); setEditing(null); setForm(blank); }} style={{ display: "flex", alignItems: "center", gap: 6 }}>{Icon.plus} Add Member</button>
      </div>

      {(adding || editing) && (
        <div className="ad-inline-editor">
          <div className="ad-inline-editor-head"><h4>{editing ? "Edit Member" : "New Member"}</h4><button className="ad-btn-icon ad-btn-ghost" onClick={() => { setAdding(false); setEditing(null); }}>{Icon.x}</button></div>
          <div className="ad-form-grid ad-form-grid-2">
            <label className="ad-label"><span>Full Name</span><input className="ad-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Jane Smith" /></label>
            <label className="ad-label"><span>Initials</span><input className="ad-input" value={form.initials} onChange={e => set("initials", e.target.value)} placeholder="JS" maxLength={2} /></label>
            <label className="ad-label"><span>Role / Title</span><input className="ad-input" value={form.role} onChange={e => set("role", e.target.value)} placeholder="Lead Engineer" /></label>
            <label className="ad-label"><span>Avatar Color</span>
              <div className="ad-color-row">
                <input type="color" className="ad-color-swatch" value={form.color} onChange={e => set("color", e.target.value)} />
                <input className="ad-input" value={form.color} onChange={e => set("color", e.target.value)} placeholder="#adff35" style={{ flex: 1 }} />
              </div>
            </label>
          </div>
          <label className="ad-label"><span>Bio</span><textarea className="ad-textarea" value={form.bio} onChange={e => set("bio", e.target.value)} rows={3} /></label>
          <div className="ad-save-row"><button className="ad-btn ad-btn-ghost ad-btn-sm" onClick={() => { setAdding(false); setEditing(null); }}>Cancel</button><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSave}>Save</button></div>
        </div>
      )}

      <div className="ad-card" style={{ padding: 0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Member</th><th>Role</th><th>Bio</th><th>Actions</th></tr></thead>
            <tbody>
              {cms.team.map(m => (
                <tr key={m.id}>
                  <td>
                    <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: "50%", background: m.color + "33", border: `2px solid ${m.color}55`, display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 900, color: m.color, flexShrink: 0 }}>{m.initials}</div>
                      <strong style={{ color: "#fff" }}>{m.name}</strong>
                    </div>
                  </td>
                  <td style={{ color: "#adff35", fontSize: "0.78rem" }}>{m.role}</td>
                  <td><span className="ad-truncate">{m.bio}</span></td>
                  <td><div className="ad-actions">
                    <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => { setEditing(m); setAdding(false); setForm({ name: m.name, initials: m.initials, role: m.role, bio: m.bio, color: m.color }); }}>{Icon.edit}</button>
                    <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteTeamMember(m.id); toast("Removed."); }}>{Icon.trash}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: BRANDS
════════════════════════════════════ */
function SectionBrands({ toast }: { toast: (m: string) => void }) {
  const { cms, addBrand, updateBrand, deleteBrand } = useCms();
  const [editing, setEditing] = useState<Brand | null>(null);
  const [form, setForm] = useState({ letter: "", name: "" });
  const set = (k: "letter" | "name", v: string) => setForm(f => ({ ...f, [k]: v }));

  const handleSave = () => {
    if (!form.name.trim()) return;
    if (editing) { updateBrand({ ...editing, ...form }); toast("Brand updated!"); }
    else { addBrand(form); toast("Brand added!"); }
    setEditing(null); setForm({ letter: "", name: "" });
  };

  return (
    <>
      <div className="ad-section-head">
        <div><h2>Brand Strip ({cms.brands.length})</h2><p>Scrolling brand logos on the homepage.</p></div>
      </div>
      <div className="ad-inline-editor">
        <div className="ad-inline-editor-head"><h4>{editing ? `Editing: ${editing.name}` : "Add / Edit Brand"}</h4>{editing && <button className="ad-btn-icon ad-btn-ghost" onClick={() => { setEditing(null); setForm({ letter: "", name: "" }); }}>{Icon.x}</button>}</div>
        <div className="ad-form-grid ad-form-grid-2">
          <label className="ad-label"><span>Letter / Initial</span><input className="ad-input" value={form.letter} onChange={e => set("letter", e.target.value)} placeholder="V" maxLength={1} /></label>
          <label className="ad-label"><span>Brand Name</span><input className="ad-input" value={form.name} onChange={e => set("name", e.target.value)} placeholder="Vortex" /></label>
        </div>
        <div className="ad-save-row"><button className="ad-btn ad-btn-primary ad-btn-sm" onClick={handleSave}>{editing ? "Update Brand" : "Add Brand"}</button></div>
      </div>
      <div className="ad-card" style={{ padding: 0 }}>
        <div className="ad-table-wrap">
          <table className="ad-table">
            <thead><tr><th>Initial</th><th>Name</th><th>Actions</th></tr></thead>
            <tbody>
              {cms.brands.map(b => (
                <tr key={b.id}>
                  <td><div style={{ width: 32, height: 32, background: "rgba(173,255,53,0.12)", border: "1px solid rgba(173,255,53,0.2)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", color: "#adff35", fontWeight: 900 }}>{b.letter}</div></td>
                  <td style={{ color: "#fff", fontWeight: 700 }}>{b.name}</td>
                  <td><div className="ad-actions">
                    <button className="ad-btn ad-btn-ghost ad-btn-sm ad-btn-icon" onClick={() => { setEditing(b); setForm({ letter: b.letter, name: b.name }); }}>{Icon.edit}</button>
                    <button className="ad-btn ad-btn-danger ad-btn-sm ad-btn-icon" onClick={() => { deleteBrand(b.id); toast("Brand removed."); }}>{Icon.trash}</button>
                  </div></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   SECTION: CONTACT INFO
════════════════════════════════════ */
function SectionContact({ toast }: { toast: (m: string) => void }) {
  const { cms, updateContactInfo } = useCms();
  const [form, setForm] = useState<ContactInfo>({ ...cms.contactInfo });
  const set = (k: keyof ContactInfo, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <div className="ad-card">
      <div className="ad-card-title"><span />Contact Information</div>
      <div className="ad-form-grid" style={{ gap: 16 }}>
        {([["email", "Email Address"], ["phone", "Phone Number"], ["location", "Location"], ["responseTime", "Response Time"]] as [keyof ContactInfo, string][]).map(([k, label]) => (
          <label className="ad-label" key={k}><span>{label}</span><input className="ad-input" value={form[k]} onChange={e => set(k, e.target.value)} /></label>
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 20 }}>
        <button className="ad-btn ad-btn-primary" onClick={() => { updateContactInfo(form); toast("Contact info saved!"); }} style={{ display: "flex", alignItems: "center", gap: 8 }}>{Icon.edit} Save Contact Info</button>
      </div>
    </div>
  );
}

/* ════════════════════════════════════
   SECTION: SETTINGS
════════════════════════════════════ */
function SectionSettings({ toast }: { toast: (m: string) => void }) {
  const { cms, updateSettings } = useCms();
  const [form, setForm] = useState<SiteSettings>({ ...cms.settings });
  const set = (k: keyof SiteSettings, v: string) => setForm(f => ({ ...f, [k]: v }));
  return (
    <>
      <div className="ad-card">
        <div className="ad-card-title"><span />Site Identity</div>
        <div className="ad-form-grid" style={{ gap: 16 }}>
          <label className="ad-label"><span>Site Name</span><input className="ad-input" value={form.siteName} onChange={e => set("siteName", e.target.value)} /></label>
          <label className="ad-label"><span>Site Tagline</span><input className="ad-input" value={form.tagline} onChange={e => set("tagline", e.target.value)} /></label>
          <label className="ad-label"><span>Footer Text</span><input className="ad-input" value={form.footerText} onChange={e => set("footerText", e.target.value)} /></label>
        </div>
      </div>
      <div className="ad-card">
        <div className="ad-card-title"><span />Brand Color</div>
        <p style={{ fontSize: "0.82rem", color: "#5d7096", marginBottom: 16 }}>Changes the primary accent color across the entire site. Clear browser cache after changing.</p>
        <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
          <input type="color" className="ad-color-swatch" value={form.accentColor} onChange={e => set("accentColor", e.target.value)} style={{ width: 56, height: 56, cursor: "pointer" }} />
          <div>
            <input className="ad-input" value={form.accentColor} onChange={e => set("accentColor", e.target.value)} style={{ width: 140, fontFamily: "monospace" }} />
            <div style={{ marginTop: 8, width: 140, height: 6, borderRadius: 999, background: form.accentColor, boxShadow: `0 0 16px ${form.accentColor}88` }} />
          </div>
        </div>
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <button className="ad-btn ad-btn-primary" onClick={() => { updateSettings(form); toast("Settings saved!"); }} style={{ display: "flex", alignItems: "center", gap: 8 }}>{Icon.edit} Save Settings</button>
      </div>
    </>
  );
}

/* ════════════════════════════════════
   MAIN ADMIN APP
════════════════════════════════════ */
export default function AdminApp() {
  const { user, logout } = useAuth();
  const [section, setSection] = useState<Section>("overview");
  const [toastMsg, setToastMsg] = useState<string | null>(null);

  const toast = (msg: string) => setToastMsg(msg);
  const dismissToast = () => setToastMsg(null);

  if (!user) return <AuthPage />;
  if (!user.isAdmin) return <UserProfile />;

  const [title, subtitle] = SECTION_TITLES[section];

  return (
    <div className="ad-root">
      <div className="ad-shell">
        <Sidebar active={section} onSelect={setSection} user={user} onLogout={logout} />
        <div className="ad-main">
          <div className="ad-topbar">
            <div>
              <div className="ad-topbar-title">{title}</div>
              <div className="ad-topbar-sub">{subtitle}</div>
            </div>
            <div className="ad-topbar-right">
              <Link to="/" className="ad-view-site-btn" target="_blank">{Icon.external} View Site</Link>
            </div>
          </div>
          <div className="ad-content">
            {section === "overview"  && <SectionOverview onNav={setSection} />}
            {section === "hero"      && <SectionHero toast={toast} />}
            {section === "services"  && <SectionServices toast={toast} />}
            {section === "portfolio" && <SectionPortfolio toast={toast} />}
            {section === "stats"     && <SectionStats toast={toast} />}
            {section === "about"     && <SectionAbout toast={toast} />}
            {section === "faq"       && <SectionFaq toast={toast} />}
            {section === "team"      && <SectionTeam toast={toast} />}
            {section === "brands"    && <SectionBrands toast={toast} />}
            {section === "contact"   && <SectionContact toast={toast} />}
            {section === "settings"  && <SectionSettings toast={toast} />}
          </div>
        </div>
      </div>
      {toastMsg && <Toast msg={toastMsg} onHide={dismissToast} />}
    </div>
  );
}
