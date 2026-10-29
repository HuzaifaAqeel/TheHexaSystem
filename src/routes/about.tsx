import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/site/Layout";
import About from "@/site/pages/About";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | Hexa Systems" },
      { name: "description", content: "Discover how Hexa Systems connects performance marketing and AI automation for service businesses." },
      { property: "og:title", content: "About | Hexa Systems" },
      { property: "og:url", content: "https://thehexasystems.com/about" },
      { property: "og:description", content: "Discover how Hexa Systems connects performance marketing and AI automation for service businesses." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thehexasystems.com/about" }],
  }),
  component: () => (
    <Layout>
      <About />
    </Layout>
  ),
});
