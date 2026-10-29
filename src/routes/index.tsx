import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/site/Layout";
import Home from "@/site/pages/Home";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Hexa Systems | We Turn Ad Spend Into Booked Jobs" },
      { name: "description", content: "Ads bring the leads. AI answers every one of them. Performance marketing plus AI automation for service businesses, live in 25 days." },
      { property: "og:title", content: "Hexa Systems | We Turn Ad Spend Into Booked Jobs" },
      { property: "og:description", content: "Ads bring the leads. AI answers every one of them. Performance marketing plus AI automation for service businesses, live in 25 days." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thehexasystems.com/" }],
  }),
  component: () => (
    <Layout>
      <Home />
    </Layout>
  ),
});
