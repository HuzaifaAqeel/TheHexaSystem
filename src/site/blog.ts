import voice from '@/assets/svc-1.jpg';
import funnel from '@/assets/svc-2.jpg';
import ads from '@/assets/svc-0.jpg';
import aeo from '@/assets/svc-aeo.jpg';

// Sample articles: general, educational guidance only. No client results or statistics.
export type PostBlock =
  | { t: 'p'; text: string }
  | { t: 'h2'; text: string }
  | { t: 'list'; items: string[] }
  | { t: 'steps'; items: { title: string; text: string }[] }
  | { t: 'quote'; text: string }
  | { t: 'callout'; title: string; text: string };

export type Post = { slug: string; title: string; excerpt: string; category: string; readTime: string; image: string; takeaways: string[]; body: PostBlock[]; service: string };

export const posts: Post[] = [
  {
    slug: 'why-missed-calls-cost-more-than-you-think',
    title: 'Why missed calls cost more than you think',
    excerpt: 'A missed call isn’t just a voicemail. For many service businesses it’s a customer who simply calls the next company on the list.',
    category: 'AI Voice Agents', readTime: '4 min read', image: voice, service: 'ai-voice-agents',
    takeaways: ['Callers rarely leave voicemails', 'After-hours calls are often high intent', 'Instant answers protect your ad spend'],
    body: [
      { t: 'p', text: 'When someone calls a service business, they usually need help now. If nobody answers, most people don’t wait. They go back to search and try the next name.' },
      { t: 'h2', text: 'The hidden cost' },
      { t: 'p', text: 'Every call you paid to generate, through ads, SEO or referrals, has a cost. A missed call means you paid for the lead and handed it to a competitor.' },
      { t: 'callout', title: 'Quick check', text: 'Look at your phone log for last week. How many calls came in outside business hours or while your team was busy?' },
      { t: 'h2', text: 'Where calls slip through' },
      { t: 'list', items: ['Evenings and weekends', 'While you’re on a job or with a customer', 'Busy periods when lines are full', 'Lunch breaks and holidays'] },
      { t: 'h2', text: 'How to fix it' },
      { t: 'steps', items: [
        { title: 'Answer instantly', text: 'Use a voice agent or answering setup so every call gets a response.' },
        { title: 'Capture the details', text: 'Name, number, need and urgency, saved straight to your CRM.' },
        { title: 'Book or hand off', text: 'Offer a time on your calendar, or flag urgent calls for your team.' },
      ] },
      { t: 'quote', text: 'The best lead is the one that’s already calling you. Make sure someone, or something, picks up.' },
    ],
  },
  {
    slug: 'the-follow-up-gap',
    title: 'The follow-up gap: where good leads go quiet',
    excerpt: 'Most leads aren’t lost to price. They’re lost because nobody followed up at the right time.',
    category: 'Follow-Up Funnels', readTime: '5 min read', image: funnel, service: 'ai-follow-up-funnels',
    takeaways: ['Speed matters most early on', 'One message is rarely enough', 'Old leads are an untapped list'],
    body: [
      { t: 'p', text: 'A lead fills in your form. You reply once. Then life gets busy and the conversation stops. Weeks later they’ve hired someone else.' },
      { t: 'h2', text: 'Why it happens' },
      { t: 'list', items: ['Follow-up depends on someone remembering', 'Quotes are sent but never checked on', 'No system for leads who say “not yet”'] },
      { t: 'callout', title: 'Reality check', text: 'People are busy, not uninterested. A helpful reminder is often all it takes.' },
      { t: 'h2', text: 'A simple follow-up rhythm' },
      { t: 'steps', items: [
        { title: 'Reply within minutes', text: 'Confirm you received the inquiry and share the next step.' },
        { title: 'Check in after the quote', text: 'Answer questions and make booking easy.' },
        { title: 'Stay helpful over time', text: 'Useful tips or seasonal reminders for leads who weren’t ready.' },
      ] },
      { t: 'h2', text: 'Let automation do the remembering' },
      { t: 'p', text: 'Automated text and email sequences make sure no lead is forgotten, while your team focuses on the conversations that are ready to close.' },
      { t: 'quote', text: 'Follow-up isn’t pushy when it’s helpful. Silence is what loses the job.' },
    ],
  },
  {
    slug: 'is-your-ad-budget-leaking',
    title: '5 signs your ad budget is leaking',
    excerpt: 'Rising costs and quiet phones are symptoms. Here’s where to look before you spend another dollar.',
    category: 'Performance Marketing', readTime: '6 min read', image: ads, service: 'ad-audit',
    takeaways: ['Track leads, not just clicks', 'Broad targeting wastes budget', 'Landing pages matter as much as ads'],
    body: [
      { t: 'p', text: 'Ads can look healthy in a dashboard while your calendar stays empty. These are the most common reasons.' },
      { t: 'steps', items: [
        { title: 'No conversion tracking', text: 'If you can’t see which ads bring calls and forms, you can’t improve them.' },
        { title: 'Targeting is too broad', text: 'Showing ads outside your service area or to the wrong audience.' },
        { title: 'Weak landing pages', text: 'Sending paid traffic to a generic homepage with no clear next step.' },
        { title: 'Irrelevant search terms', text: 'Paying for searches that have nothing to do with what you sell.' },
        { title: 'Set and forget', text: 'Campaigns that haven’t been reviewed in months.' },
      ] },
      { t: 'callout', title: 'Start here', text: 'Pick one campaign and confirm you can trace a booked job back to it. If you can’t, fix tracking first.' },
      { t: 'h2', text: 'What a healthy account looks like' },
      { t: 'list', items: ['Every lead tied to its source', 'Clear cost per lead and per booking', 'Regular reviews and small improvements'] },
      { t: 'quote', text: 'Don’t spend more until you know where the current budget is going.' },
    ],
  },
  {
    slug: 'getting-found-in-ai-answers',
    title: 'Getting found in AI answers: a beginner’s guide',
    excerpt: 'More customers ask ChatGPT and Google AI for recommendations. Here’s how to help AI understand your business.',
    category: 'AEO / GEO', readTime: '5 min read', image: aeo, service: 'aeo-geo-optimization',
    takeaways: ['Consistency builds trust', 'Answer real customer questions', 'No one can guarantee AI rankings'],
    body: [
      { t: 'p', text: 'Search is changing. Instead of scrolling through links, many people now ask an AI tool and read a short answer. Being part of that answer matters.' },
      { t: 'h2', text: 'What AI tools look for' },
      { t: 'list', items: ['Clear, consistent business details across the web', 'Pages that directly answer common questions', 'Credible signals like reviews and mentions', 'Well-structured, easy-to-read content'] },
      { t: 'h2', text: 'Three steps to start' },
      { t: 'steps', items: [
        { title: 'Check your details', text: 'Make sure your name, services and location match everywhere.' },
        { title: 'Write answer pages', text: 'Turn your most-asked questions into clear, helpful pages.' },
        { title: 'Add structure', text: 'Use headings, lists and structured data so content is easy to parse.' },
      ] },
      { t: 'callout', title: 'Be careful', text: 'Anyone promising guaranteed placement in AI answers is overselling. Focus on clarity and credibility.' },
      { t: 'quote', text: 'Make it easy for AI to understand you, and easy for customers to trust you.' },
    ],
  },
];
