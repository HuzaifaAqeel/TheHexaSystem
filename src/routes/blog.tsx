import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import Layout from "@/site/Layout";
import { PageHero } from "@/site/components/Design";
import { pageMeta } from "@/site/content";
import { posts } from "@/site/blog";

export const Route = createFileRoute("/blog")({
  head: () => pageMeta("Blog", "Insights from Hexa Systems on performance marketing, AI voice agents, follow-up funnels and lead conversion."),
  component: BlogPage,
});

function BlogPage() {
  const [first, ...rest] = posts;
  return (
    <Layout>
      <PageHero label="BLOG" title={<>Ideas for growth,<br /><em>without the guesswork.</em></>} text="Practical notes on marketing, AI automation and turning more leads into booked jobs." />
      <section className="hx-section hx-blog">
        <div className="hx-container">
          {first && (
            <Link to="/blog/$slug" params={{ slug: first.slug }} className="hx-glass hx-blog-feature" data-reveal>
              <img src={first.image} alt="" loading="lazy" />
              <div>
                <span className="hx-blog-meta">{first.category} · {first.readTime}</span>
                <h2>{first.title}</h2>
                <p>{first.excerpt}</p>
                <span className="hx-text-link">Read article <ArrowUpRight size={16} /></span>
              </div>
            </Link>
          )}
          <div className="hx-blog-grid">
            {rest.map((p) => (
              <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="hx-glass hx-blog-card" data-reveal>
                <img src={p.image} alt="" loading="lazy" />
                <div>
                  <span className="hx-blog-meta">{p.category} · {p.readTime}</span>
                  <h3>{p.title}</h3>
                  <p>{p.excerpt}</p>
                  <span className="hx-text-link">Read article <ArrowUpRight size={16} /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </Layout>
  );
}
