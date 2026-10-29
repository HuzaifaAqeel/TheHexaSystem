import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/site/Layout";
import Contact from "@/site/pages/Contact";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Strategy Call | Hexa Systems" },
      { name: "description", content: "Send Hexa Systems an inquiry or request a free strategy call about performance marketing, AI follow-up, and your lead-to-booking journey." },
      { property: "og:title", content: "Contact & Strategy Call | Hexa Systems" },
      { property: "og:description", content: "Send an inquiry or choose your preferred date for a free strategy conversation with Hexa Systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: () => (
    <Layout>
      <Contact />
    </Layout>
  ),
});
