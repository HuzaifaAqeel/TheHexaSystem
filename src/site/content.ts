import { faqs } from './data';
import serviceCopy from './services.json';

export type Block = { t: 'p' | 'h3'; text: string } | { t: 'ul' | 'ol'; items: string[] } | { t: 'table'; head: string[]; rows: string[][] };
export type ServiceCopy = { title: string; slug: string; hook: string; outcome: string; desc: string; button: string; seoTitle: string; metaDescription: string; eyebrow: string; h1: string; intro: string; heroCta: string; support: string; sections: { title: string; blocks: Block[] }[]; faqs: { question: string; answer: string }[]; finalTitle: string; finalText: string; finalButton: string; related: string[] };
// Ten services and their page copy, sourced from the supplied services content document.
export const services = (serviceCopy as ServiceCopy[]).map((service, index) => ({ ...service, text: service.hook, detail: service.desc, index }));
export const serviceSlugs = services.map(s => s.slug);
export const serviceGroups = [
  { title: 'Get More Customers', slugs: ['performance-marketing', 'social-media-management', 'aeo-geo-optimization', 'ad-audit'] },
  { title: 'Convert More Leads', slugs: ['ai-voice-agents', 'chatbot-development', 'gohighlevel', 'ai-follow-up-funnels'] },
  { title: 'Create a Better Digital Foundation', slugs: ['web-design', 'web-development'] },
];
export const questions = faqs;
export const process = [
  { period: 'DAYS 01—05', title: 'Find the gaps.', text: 'Audit your ads, landing pages, and pipeline. Understand where leads arrive and what happens next.' },
  { period: 'DAYS 06—12', title: 'Bring the leads.', text: 'Launch the campaigns and landing page, connecting every inquiry to your pipeline.' },
  { period: 'DAYS 13—20', title: 'Connect the AI.', text: 'Put the voice agent and follow-up funnel to work, with booking and reminders connected.' },
  { period: 'DAY 25', title: 'Make it yours.', text: 'Handover the connected system with tracking and reporting, ready for your team.' },
];

// No receiving service was configured in the original website. Never simulate success.
export const contactConfig = {
  email: 'info@thehexasystems.com',
  bookingUrl: '', // Set only to an authorized, working scheduler URL.
};

export function pageMeta(title: string, description: string, canonical?: string) {
  const fullTitle = title.endsWith('Hexa Systems') ? title : `${title} | Hexa Systems`;
  const meta: Record<string, string>[] = [{ title: fullTitle }, { name: 'description', content: description }, { property: 'og:title', content: fullTitle }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' }];
  if (canonical) meta.push({ property: 'og:url', content: canonical });
  return {
    meta,
    links: canonical ? [{ rel: 'canonical', href: canonical }] : [],
  };
}