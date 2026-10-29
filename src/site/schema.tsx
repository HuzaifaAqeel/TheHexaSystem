// JSON-LD helpers for Hexa Systems.
// Schema here is tied only to visible, published site content:
// - Organization/WebSite: name, URL, logo and public contact email from the footer.
// - Service: the service title and meta description already published for that page.
// - FAQPage: ONLY the FAQs actually rendered on the service page (first 4).
// - Article: the blog post title, excerpt and cover image already published.
// No social profiles, addresses, ratings, testimonials or statistics are invented:
// the site publishes none of those, so sameAs, address and aggregateRating are omitted.

export const SITE_URL = "https://thehexasystems.com";
export const ORG_ID = `${SITE_URL}/#organization`;

export function JsonLd({ data }: { data: unknown }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": ORG_ID,
    name: "Hexa Systems",
    url: `${SITE_URL}/`,
    logo: `${SITE_URL}/logo.png`,
    email: "info@thehexasystems.com",
    description:
      "Performance marketing plus AI automation for service businesses. Ads bring the leads. AI answers every one of them.",
    slogan: "We Turn Ad Spend Into Booked Jobs",
    knowsAbout: [
      "Performance Marketing",
      "AI Voice Agents",
      "Chatbot Development",
      "Web Design",
      "Social Media Management",
      "GoHighLevel",
      "Ad Audit",
      "AI Follow-Up Funnels",
      "AEO / GEO Optimization",
      "Web Development",
    ],
  };
}

export function websiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: `${SITE_URL}/`,
    name: "Hexa Systems",
    publisher: { "@id": ORG_ID },
  };
}

export function serviceJsonLd(service: {
  slug: string;
  title: string;
  metaDescription: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: service.title,
    description: service.metaDescription,
    url: `${SITE_URL}/services/${service.slug}`,
    provider: { "@id": ORG_ID },
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: { "@type": "Answer", text: faq.answer },
    })),
  };
}

export function articleJsonLd(post: {
  slug: string;
  title: string;
  excerpt: string;
  image: string;
  category: string;
}) {
  const image = post.image.startsWith("http")
    ? post.image
    : `${SITE_URL}${post.image}`;
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image,
    url: `${SITE_URL}/blog/${post.slug}`,
    articleSection: post.category,
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
  };
}
