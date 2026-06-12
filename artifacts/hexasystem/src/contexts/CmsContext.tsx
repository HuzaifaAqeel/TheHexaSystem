import React, { createContext, useContext, useState, useCallback } from "react";
import {
  capabilities as defaultServices,
  projects as defaultProjects,
  stats as defaultStats,
  faqs as defaultFaqs,
  advantages as defaultAdvantages,
  brands as defaultBrands,
} from "../data";

/* ─── Types ─── */
export interface Service {
  id: string;
  title: string;
  text: string;
  detail: string;
}

export interface Project {
  id: string;
  category: string;
  title: string;
  text: string;
  client: string;
  result: string;
  image?: string;
}

export interface Stat {
  id: string;
  value: string;
  label: string;
}

export interface Faq {
  id: string;
  question: string;
  answer: string;
}

export interface Advantage {
  id: string;
  text: string;
}

export interface Brand {
  id: string;
  letter: string;
  name: string;
}

export interface TeamMember {
  id: string;
  name: string;
  initials: string;
  role: string;
  bio: string;
  color: string;
  image?: string;
}

export interface HeroData {
  line1: string;
  line2: string;
  cursive: string;
  line3: string;
  body: string;
  cta1: string;
  cta2: string;
}

export interface AboutData {
  greeting: string;
  text1: string;
  text2: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  responseTime: string;
}

export interface SiteSettings {
  siteName: string;
  tagline: string;
  accentColor: string;
  footerText: string;
}

export interface CmsData {
  hero: HeroData;
  services: Service[];
  projects: Project[];
  stats: Stat[];
  faqs: Faq[];
  advantages: Advantage[];
  brands: Brand[];
  team: TeamMember[];
  about: AboutData;
  contactInfo: ContactInfo;
  settings: SiteSettings;
}

interface CmsContextValue {
  cms: CmsData;
  updateHero: (data: HeroData) => void;
  addService: (s: Omit<Service, "id">) => void;
  updateService: (s: Service) => void;
  deleteService: (id: string) => void;
  addProject: (p: Omit<Project, "id">) => void;
  updateProject: (p: Project) => void;
  deleteProject: (id: string) => void;
  updateStat: (s: Stat) => void;
  addStat: (s: Omit<Stat, "id">) => void;
  deleteStat: (id: string) => void;
  addFaq: (f: Omit<Faq, "id">) => void;
  updateFaq: (f: Faq) => void;
  deleteFaq: (id: string) => void;
  addAdvantage: (a: Omit<Advantage, "id">) => void;
  updateAdvantage: (a: Advantage) => void;
  deleteAdvantage: (id: string) => void;
  addBrand: (b: Omit<Brand, "id">) => void;
  updateBrand: (b: Brand) => void;
  deleteBrand: (id: string) => void;
  addTeamMember: (t: Omit<TeamMember, "id">) => void;
  updateTeamMember: (t: TeamMember) => void;
  deleteTeamMember: (id: string) => void;
  updateAbout: (a: AboutData) => void;
  updateContactInfo: (c: ContactInfo) => void;
  updateSettings: (s: SiteSettings) => void;
}

/* ─── Image Resize Helper ─── */
export async function resizeImage(file: File, maxWidth = 800): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return resolve(e.target?.result as string);
        
        let width = img.width;
        let height = img.height;
        if (width > maxWidth) {
          height = Math.round((height * maxWidth) / width);
          width = maxWidth;
        }
        canvas.width = width;
        canvas.height = height;
        ctx.drawImage(img, 0, 0, width, height);
        resolve(canvas.toDataURL("image/jpeg", 0.8));
      };
      img.onerror = () => resolve(e.target?.result as string);
      img.src = e.target?.result as string;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

/* ─── Default data ─── */
const uid = () => Math.random().toString(36).slice(2);

const DEFAULT: CmsData = {
  hero: {
    line1: "We Build",
    line2: "Intelligent Systems",
    cursive: "That",
    line3: "Dominate",
    body: "Automation engines that eliminate repetitive work, multiply revenue 10x, and give your team back the time they deserve.",
    cta1: "Book a free call",
    cta2: "Explore Services",
  },
  services: defaultServices.map((s) => ({ ...s, id: uid() })),
  projects: defaultProjects.map((p) => ({ ...p, id: uid() })),
  stats: defaultStats.map(([value, label]) => ({ id: uid(), value, label })),
  faqs: defaultFaqs.map((f) => ({ ...f, id: uid() })),
  advantages: defaultAdvantages.map((text) => ({ id: uid(), text })),
  brands: defaultBrands.map(([letter, name]) => ({ id: uid(), letter, name })),
  team: [
    { id: uid(), name: "Alex Kiran", initials: "AK", role: "Founder & AI Architect", bio: "Former ML engineer at a Fortune 500. Built AI systems that process millions of transactions daily.", color: "#adff35" },
    { id: uid(), name: "Sofia Mendez", initials: "SM", role: "Head of Automation", bio: "3+ years designing end-to-end automation pipelines for e-commerce, SaaS, and healthcare clients.", color: "#58e86a" },
    { id: uid(), name: "Rayan Jin", initials: "RJ", role: "Lead Voice AI Engineer", bio: "Voice AI specialist who has deployed hundreds of conversational agents.", color: "#b8ff5e" },
    { id: uid(), name: "Tara Noel", initials: "TN", role: "Web & Integration Specialist", bio: "Full-stack developer with a knack for connecting disparate systems.", color: "#7fff45" },
  ],
  about: {
    greeting: "Hello!",
    text1: "We operate at the intersection of design, data, and deep learning. We don't just build software; we architect intelligent systems that multiply human capability and accelerate business growth.",
    text2: "In a world cluttered with noise, we deliver pure signal.",
  },
  contactInfo: {
    email: "hello@thehexasystem.com",
    phone: "+1 (555) 012-3456",
    location: "Remote-First Global Team",
    responseTime: "Under 24 Hours",
  },
  settings: {
    siteName: "TheHexaSystem",
    tagline: "Intelligent Systems That Transform Your Business",
    accentColor: "#adff35",
    footerText: "© 2026 THEHEXASYSTEM. ALL RIGHTS RESERVED.",
  },
};

function load(): CmsData {
  try {
    const saved = localStorage.getItem("hexa_cms");
    if (saved) return { ...DEFAULT, ...JSON.parse(saved) };
  } catch {}
  return DEFAULT;
}

function save(data: CmsData) {
  try { localStorage.setItem("hexa_cms", JSON.stringify(data)); } catch {}
}

/* ─── Context ─── */
const CmsContext = createContext<CmsContextValue | null>(null);

export function CmsProvider({ children }: { children: React.ReactNode }) {
  const [cms, setCms] = useState<CmsData>(load);

  const update = useCallback((next: CmsData) => {
    setCms(next);
    save(next);
  }, []);

  const updateHero = useCallback((hero: HeroData) => update({ ...cms, hero }), [cms, update]);
  const addService = useCallback((s: Omit<Service, "id">) => update({ ...cms, services: [...cms.services, { ...s, id: uid() }] }), [cms, update]);
  const updateService = useCallback((s: Service) => update({ ...cms, services: cms.services.map(x => x.id === s.id ? s : x) }), [cms, update]);
  const deleteService = useCallback((id: string) => update({ ...cms, services: cms.services.filter(x => x.id !== id) }), [cms, update]);
  const addProject = useCallback((p: Omit<Project, "id">) => update({ ...cms, projects: [...cms.projects, { ...p, id: uid() }] }), [cms, update]);
  const updateProject = useCallback((p: Project) => update({ ...cms, projects: cms.projects.map(x => x.id === p.id ? p : x) }), [cms, update]);
  const deleteProject = useCallback((id: string) => update({ ...cms, projects: cms.projects.filter(x => x.id !== id) }), [cms, update]);
  const addStat = useCallback((s: Omit<Stat, "id">) => update({ ...cms, stats: [...cms.stats, { ...s, id: uid() }] }), [cms, update]);
  const updateStat = useCallback((s: Stat) => update({ ...cms, stats: cms.stats.map(x => x.id === s.id ? s : x) }), [cms, update]);
  const deleteStat = useCallback((id: string) => update({ ...cms, stats: cms.stats.filter(x => x.id !== id) }), [cms, update]);
  const addFaq = useCallback((f: Omit<Faq, "id">) => update({ ...cms, faqs: [...cms.faqs, { ...f, id: uid() }] }), [cms, update]);
  const updateFaq = useCallback((f: Faq) => update({ ...cms, faqs: cms.faqs.map(x => x.id === f.id ? f : x) }), [cms, update]);
  const deleteFaq = useCallback((id: string) => update({ ...cms, faqs: cms.faqs.filter(x => x.id !== id) }), [cms, update]);
  const addAdvantage = useCallback((a: Omit<Advantage, "id">) => update({ ...cms, advantages: [...cms.advantages, { ...a, id: uid() }] }), [cms, update]);
  const updateAdvantage = useCallback((a: Advantage) => update({ ...cms, advantages: cms.advantages.map(x => x.id === a.id ? a : x) }), [cms, update]);
  const deleteAdvantage = useCallback((id: string) => update({ ...cms, advantages: cms.advantages.filter(x => x.id !== id) }), [cms, update]);
  const addBrand = useCallback((b: Omit<Brand, "id">) => update({ ...cms, brands: [...cms.brands, { ...b, id: uid() }] }), [cms, update]);
  const updateBrand = useCallback((b: Brand) => update({ ...cms, brands: cms.brands.map(x => x.id === b.id ? b : x) }), [cms, update]);
  const deleteBrand = useCallback((id: string) => update({ ...cms, brands: cms.brands.filter(x => x.id !== id) }), [cms, update]);
  const addTeamMember = useCallback((t: Omit<TeamMember, "id">) => update({ ...cms, team: [...cms.team, { ...t, id: uid() }] }), [cms, update]);
  const updateTeamMember = useCallback((t: TeamMember) => update({ ...cms, team: cms.team.map(x => x.id === t.id ? t : x) }), [cms, update]);
  const deleteTeamMember = useCallback((id: string) => update({ ...cms, team: cms.team.filter(x => x.id !== id) }), [cms, update]);
  const updateAbout = useCallback((about: AboutData) => update({ ...cms, about }), [cms, update]);
  const updateContactInfo = useCallback((contactInfo: ContactInfo) => update({ ...cms, contactInfo }), [cms, update]);
  const updateSettings = useCallback((settings: SiteSettings) => update({ ...cms, settings }), [cms, update]);

  return (
    <CmsContext.Provider value={{
      cms, updateHero,
      addService, updateService, deleteService,
      addProject, updateProject, deleteProject,
      addStat, updateStat, deleteStat,
      addFaq, updateFaq, deleteFaq,
      addAdvantage, updateAdvantage, deleteAdvantage,
      addBrand, updateBrand, deleteBrand,
      addTeamMember, updateTeamMember, deleteTeamMember,
      updateAbout, updateContactInfo, updateSettings,
    }}>
      {children}
    </CmsContext.Provider>
  );
}

export function useCms() {
  const ctx = useContext(CmsContext);
  if (!ctx) throw new Error("useCms must be used within CmsProvider");
  return ctx;
}
