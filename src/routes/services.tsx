import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/site/Layout";
import Services from "@/site/pages/Services";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | Hexa Systems" },
      { name: "description", content: "Explore performance marketing, AI voice agents, chatbots, websites, GoHighLevel, follow-up automation, ad audits, social media and AEO/GEO services." },
      { property: "og:title", content: "Services | Hexa Systems" },
      { property: "og:url", content: "https://thehexasystems.com/services" },
      { property: "og:description", content: "Explore performance marketing, AI voice agents, chatbots, websites, GoHighLevel, follow-up automation, ad audits, social media and AEO/GEO services." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thehexasystems.com/services" }],
  }),
  component: () => (
    <Layout>
      <Services />
    </Layout>
  ),
});
