import { createFileRoute } from "@tanstack/react-router";
import Layout from "@/site/Layout";
import BookCall from "@/site/pages/BookCall";

export const Route = createFileRoute("/book-call")({
  head: () => ({
    meta: [
      { title: "Book a Free Strategy Call | Hexa Systems" },
      { name: "description", content: "Request a free strategy conversation about your marketing and lead follow-up with Hexa Systems." },
      { property: "og:title", content: "Book a Free Strategy Call | Hexa Systems" },
      { property: "og:url", content: "https://thehexasystems.com/book-call" },
      { property: "og:description", content: "Request a free strategy conversation about your marketing and lead follow-up with Hexa Systems." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://thehexasystems.com/book-call" }],
  }),
  component: () => (
    <Layout>
      <BookCall />
    </Layout>
  ),
});
