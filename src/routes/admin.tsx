import { createFileRoute } from "@tanstack/react-router";
import AdminApp from "@/site/admin/AdminApp";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin | Hexa Systems" },
      { name: "description", content: "Manage Hexa Systems website content." },
      { property: "og:title", content: "Admin | Hexa Systems" },
      { property: "og:description", content: "Manage Hexa Systems website content." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: AdminApp,
});
