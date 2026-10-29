// Concise, problem-first funnel copy for each service detail page.
// Follows: recognise the pain → show the fix → show what changes → invite action. No invented results.
export type Funnel = {
  h1: string; lead: string;
  pains: { title: string; text: string }[];
  solutionTitle: string; solutionText: string;
  steps: { title: string; text: string }[];
  outcomes: string[];
  ctaTitle: string; ctaText: string; cta: string;
};

export const funnels: Record<string, Funnel> = {
  'performance-marketing': {
    h1: 'Spending on ads but not sure what’s working?',
    lead: 'Clicks are easy to buy. Customers aren’t. Our performance marketing for service businesses builds campaigns around the leads that actually turn into revenue.',
    pains: [
      { title: 'Budget disappears', text: 'Money goes out every month, but you can’t point to the jobs it brought in.' },
      { title: 'Leads feel random', text: 'Some weeks are busy, others are silent, and nobody knows why.' },
      { title: 'Reports say nothing', text: 'Impressions and clicks look fine, yet the phone isn’t ringing.' },
    ],
    solutionTitle: 'Campaigns built around real customers.',
    solutionText: 'We connect targeting, offers, landing pages and tracking so every dollar has a job.',
    steps: [
      { title: 'Audit & strategy', text: 'Find where spend leaks and where demand already exists.' },
      { title: 'Launch with intent', text: 'Focused campaigns, clear offers and pages built to convert.' },
      { title: 'Track every lead', text: 'Calls, forms and bookings tied back to the ad that started them.' },
      { title: 'Improve weekly', text: 'Cut what wastes money. Scale what brings customers.' },
    ],
    outcomes: ['Know which ads bring customers', 'More qualified inquiries', 'Clear cost per lead and per booking', 'Reporting you can actually read'],
    ctaTitle: 'Let’s make your ad spend accountable.', ctaText: 'We’ll review your current campaigns and show you where the opportunity is.', cta: 'Plan My Campaigns',
  },
  'ai-voice-agents': {
    h1: 'Every missed call is a customer calling your competitor.',
    lead: 'An AI voice agent — an AI receptionist for service businesses — answers instantly, day or night, captures the details and books the appointment.',
    pains: [
      { title: 'Calls go to voicemail', text: 'You’re on a job, in a meeting or closed. The caller doesn’t wait.' },
      { title: 'Staff are stretched', text: 'Your team repeats the same answers instead of doing real work.' },
      { title: 'After-hours is lost', text: 'Evenings and weekends are when many customers finally have time to call.' },
    ],
    solutionTitle: 'A receptionist that never misses a call.',
    solutionText: 'Trained on your services, hours and booking rules, and connected to your calendar and CRM.',
    steps: [
      { title: 'Learn your business', text: 'Services, common questions, service area and booking rules.' },
      { title: 'Design the conversation', text: 'Natural scripts that qualify callers and hand off when needed.' },
      { title: 'Connect your tools', text: 'Calendar, CRM and notifications so nothing gets lost.' },
      { title: 'Review and refine', text: 'We listen to real calls and keep improving responses.' },
    ],
    outcomes: ['Calls answered right away', 'Appointments booked automatically', 'Caller details saved to your CRM', 'Your team freed from repetitive calls'],
    ctaTitle: 'Stop losing callers to voicemail.', ctaText: 'See how an AI voice agent would handle your calls.', cta: 'Get My Voice Agent',
  },
  'chatbot-development': {
    h1: 'Visitors have questions. Most leave without asking.',
    lead: 'A custom AI chatbot for your website answers on the spot, qualifies the visitor and guides them to book or buy.',
    pains: [
      { title: 'Silent bounces', text: 'People land on your site, can’t find an answer quickly and leave.' },
      { title: 'Same questions daily', text: 'Your inbox fills with questions your website already answers.' },
      { title: 'Leads arrive cold', text: 'Inquiries come in with no context, so follow-up starts from zero.' },
    ],
    solutionTitle: 'A helpful assistant on every page.',
    solutionText: 'Trained on your own content, so answers stay accurate and on-brand.',
    steps: [
      { title: 'Gather your knowledge', text: 'Website pages, FAQs, documents and policies.' },
      { title: 'Shape the experience', text: 'Tone, qualifying questions and clear next steps.' },
      { title: 'Connect handoff', text: 'Send qualified leads to your CRM, calendar or team.' },
      { title: 'Monitor and improve', text: 'Review conversations and close any gaps.' },
    ],
    outcomes: ['Instant answers, any hour', 'Better-qualified inquiries', 'Fewer repetitive emails', 'Smooth handoff to your team'],
    ctaTitle: 'Turn visitors into conversations.', ctaText: 'Let’s design a chatbot around your customers’ real questions.', cta: 'Build My Chatbot',
  },
  'web-design': {
    h1: 'Your website should win trust in seconds.',
    lead: 'If visitors can’t quickly see why you’re the right choice, they move on. Our conversion-focused web design for service businesses makes the decision easy.',
    pains: [
      { title: 'Looks outdated', text: 'Your site doesn’t reflect the quality of your work.' },
      { title: 'Message is unclear', text: 'Visitors can’t tell what you do or why you’re different.' },
      { title: 'Nobody takes action', text: 'Traffic comes in, but inquiries don’t follow.' },
    ],
    solutionTitle: 'Design that guides people to say yes.',
    solutionText: 'Clear messaging, strong visuals and an obvious next step on every page.',
    steps: [
      { title: 'Understand your buyer', text: 'What they worry about and what convinces them.' },
      { title: 'Structure the story', text: 'Page flow and copy that answer questions in the right order.' },
      { title: 'Design the experience', text: 'A polished look that fits your brand on every screen.' },
      { title: 'Hand off cleanly', text: 'Ready-to-build designs, or built for you by our team.' },
    ],
    outcomes: ['A site that looks as good as your work', 'Clear, confident messaging', 'Easy paths to contact or book', 'Great on mobile'],
    ctaTitle: 'Make a first impression that converts.', ctaText: 'Tell us about your business and we’ll suggest where to start.', cta: 'Redesign My Website',
  },
  'social-media-management': {
    h1: 'Posting when you remember isn’t a strategy.',
    lead: 'Consistent, on-brand social media management for trades and service businesses builds the trust that makes people choose you when they’re ready to buy.',
    pains: [
      { title: 'Inconsistent posting', text: 'Weeks go by with nothing new, and your profile looks inactive.' },
      { title: 'No time to create', text: 'Running the business always comes before making content.' },
      { title: 'Little to show for it', text: 'Posts go out but don’t build credibility or conversations.' },
    ],
    solutionTitle: 'A steady presence, handled for you.',
    solutionText: 'Planned content, a consistent look and real engagement on the platforms that fit your audience.',
    steps: [
      { title: 'Pick the right platforms', text: 'Focus where your customers actually spend time.' },
      { title: 'Plan the content', text: 'A monthly calendar built around your services and audience.' },
      { title: 'Create and publish', text: 'Branded posts, captions and scheduling.' },
      { title: 'Engage and review', text: 'Respond, learn what works and adjust.' },
    ],
    outcomes: ['A profile that looks active and trusted', 'Consistent brand look', 'Hours saved each week', 'Clearer insight into what resonates'],
    ctaTitle: 'Show up consistently, without the stress.', ctaText: 'Let’s build a content plan that fits your brand.', cta: 'Manage My Socials',
  },
  'gohighlevel': {
    h1: 'Leads in five places and follow-up on sticky notes?',
    lead: 'GoHighLevel puts contacts, conversations and your pipeline in one place. Our GoHighLevel CRM setup for small businesses and home services sets it up so it actually works for you.',
    pains: [
      { title: 'Scattered leads', text: 'Forms, calls, texts and DMs live in different tools.' },
      { title: 'Manual follow-up', text: 'Reminders depend on someone remembering.' },
      { title: 'No clear pipeline', text: 'You can’t see which deals are moving and which are stuck.' },
    ],
    solutionTitle: 'One system for every lead.',
    solutionText: 'A clean CRM with pipelines, automations and calendars set up around how you sell.',
    steps: [
      { title: 'Map your process', text: 'How leads arrive, get qualified and become customers.' },
      { title: 'Build the account', text: 'Pipelines, calendars, forms and contact fields.' },
      { title: 'Automate follow-up', text: 'Texts, emails and tasks triggered at the right moment.' },
      { title: 'Train your team', text: 'Simple walkthroughs so everyone uses it confidently.' },
    ],
    outcomes: ['Every lead in one place', 'Automatic follow-up', 'A pipeline you can see at a glance', 'Less admin for your team'],
    ctaTitle: 'Get your CRM working for you.', ctaText: 'We’ll map your process and set GoHighLevel up around it.', cta: 'Set Up GoHighLevel',
  },
  'ad-audit': {
    h1: 'Your ads might be leaking money. Let’s find out where.',
    lead: 'A paid ad audit — a clear, honest review of your accounts — with a prioritised plan of what to fix first.',
    pains: [
      { title: 'Costs keep rising', text: 'You’re paying more for leads without knowing why.' },
      { title: 'Unclear performance', text: 'You don’t know whether your current setup is good or bad.' },
      { title: 'Second opinion needed', text: 'You want an independent look before spending more.' },
    ],
    solutionTitle: 'An evidence-based look at your accounts.',
    solutionText: 'We review structure, targeting, creative, landing pages and tracking, then rank what matters.',
    steps: [
      { title: 'Secure access', text: 'Read-only access to your ad and analytics accounts.' },
      { title: 'Deep review', text: 'Campaigns, budgets, audiences, ads and conversion tracking.' },
      { title: 'Find the leaks', text: 'Wasted spend, missed opportunities and broken tracking.' },
      { title: 'Action plan', text: 'A prioritised list you can apply yourself or with us.' },
    ],
    outcomes: ['Know exactly where money is wasted', 'Clear priorities, not a long list', 'Tracking you can trust', 'Confidence before spending more'],
    ctaTitle: 'Find the leaks before you spend more.', ctaText: 'Book an audit and get a clear, prioritised plan.', cta: 'Audit My Ads',
  },
  'ai-follow-up-funnels': {
    h1: 'Most leads aren’t lost. They’re just never followed up.',
    lead: 'An AI follow-up funnel keeps every lead warm with timely, personal messages until they’re ready to book.',
    pains: [
      { title: 'One message, then silence', text: 'A lead gets a single reply and then nothing.' },
      { title: 'Quotes go cold', text: 'Estimates are sent, but nobody checks back.' },
      { title: 'Old leads forgotten', text: 'Past inquiries sit in a list, untouched.' },
    ],
    solutionTitle: 'Follow-up that never forgets.',
    solutionText: 'Automated, personal sequences across text and email that respond to what each lead does.',
    steps: [
      { title: 'Map the journey', text: 'From first inquiry to booked, and every point in between.' },
      { title: 'Write the sequences', text: 'Helpful messages that sound like you, not a robot.' },
      { title: 'Automate with AI', text: 'Replies, reminders and booking links sent at the right time.' },
      { title: 'Reactivate the past', text: 'Reach out to old leads and estimates with a fresh reason to talk.' },
    ],
    outcomes: ['No lead left without a reply', 'More quotes followed through', 'Old contacts brought back', 'Less manual chasing'],
    ctaTitle: 'Turn “maybe later” into booked.', ctaText: 'Let’s build follow-up that works while you work.', cta: 'Build My Funnel',
  },
  'aeo-geo-optimization': {
    h1: 'Customers now ask AI. Does it mention you?',
    lead: 'People ask ChatGPT, Google AI and others for recommendations. Our AEO and GEO optimization for service businesses helps AI understand and trust your business.',
    pains: [
      { title: 'Invisible in AI answers', text: 'Competitors get mentioned and you don’t.' },
      { title: 'Unclear online info', text: 'Your services and details are inconsistent across the web.' },
      { title: 'No way to measure', text: 'You can’t tell how AI tools describe your business.' },
    ],
    solutionTitle: 'Be the clear, credible answer.',
    solutionText: 'Structured, trustworthy content and signals that AI tools can understand and cite.',
    steps: [
      { title: 'Check your visibility', text: 'See how AI tools describe you today.' },
      { title: 'Fix the foundations', text: 'Consistent details, structured data and clear pages.' },
      { title: 'Create answer content', text: 'Pages that directly answer what customers ask.' },
      { title: 'Track and refine', text: 'Monitor mentions and keep improving.' },
    ],
    outcomes: ['Clearer presence in AI answers', 'Consistent business information', 'Content that answers real questions', 'Visibility you can track'],
    ctaTitle: 'Get found where customers now search.', ctaText: 'We’ll check how AI sees your business today.', cta: 'Check My AI Visibility',
  },
  'web-development': {
    h1: 'A slow, fragile website costs you customers.',
    lead: 'We build fast, reliable custom web development and integrations that are easy to maintain and grow with you.',
    pains: [
      { title: 'Slow and clunky', text: 'Pages load slowly and visitors give up.' },
      { title: 'Afraid to change anything', text: 'Small updates break things or need a developer.' },
      { title: 'Tools don’t connect', text: 'Forms, CRM and booking don’t talk to each other.' },
    ],
    solutionTitle: 'Solid technology, built properly.',
    solutionText: 'Clean, fast builds with the integrations your business needs, and nothing it doesn’t.',
    steps: [
      { title: 'Scope it clearly', text: 'Agree on what to build and why.' },
      { title: 'Build for speed', text: 'Fast, accessible, mobile-ready pages.' },
      { title: 'Connect your tools', text: 'CRM, forms, booking, payments and analytics.' },
      { title: 'Launch and support', text: 'Testing, handover and ongoing help when you need it.' },
    ],
    outcomes: ['A fast, reliable website', 'Easy updates', 'Tools that work together', 'Built to grow with you'],
    ctaTitle: 'Build it right the first time.', ctaText: 'Tell us what you need and we’ll scope it with you.', cta: 'Start My Build',
  },
};
