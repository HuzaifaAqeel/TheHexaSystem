import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, ArrowUpRight, Check, Lightbulb } from "lucide-react";
import Layout from "@/site/Layout";
import { CTA, Eyebrow } from "@/site/components/Design";
import { pageMeta, services } from "@/site/content";
import { posts, type PostBlock } from "@/site/blog";
import { JsonLd, articleJsonLd } from "@/site/schema";

export const Route = createFileRoute("/blog_/$slug")({
  loader: ({ params }) => {
    const post = posts.find((p) => p.slug === params.slug);
    if (!post) throw notFound();
    return { slug: post.slug, title: post.title, excerpt: post.excerpt };
  },
  head: ({ loaderData }) => pageMeta(loaderData?.title ?? "Article", loaderData?.excerpt ?? "Insights from Hexa Systems.", loaderData?.slug ? `https://thehexasystems.com/blog/${loaderData.slug}` : undefined),
  component: PostPage,
});

function Block({ b }: { b: PostBlock }) {
  if (b.t === "p") return <p>{b.text}</p>;
  if (b.t === "h2") return <h2>{b.text}</h2>;
  if (b.t === "list") return <ul className="hx-post-list">{b.items.map((i) => <li key={i}><Check size={18} />{i}</li>)}</ul>;
  if (b.t === "steps") return <ol className="hx-post-steps">{b.items.map((s, i) => <li key={s.title} className="hx-glass"><span>{String(i + 1).padStart(2, "0")}</span><div><h3>{s.title}</h3><p>{s.text}</p></div></li>)}</ol>;
  if (b.t === "quote") return <blockquote className="hx-post-quote">{b.text}</blockquote>;
  return <aside className="hx-post-callout"><Lightbulb size={22} /><div><strong>{b.title}</strong><p>{b.text}</p></div></aside>;
}

function PostPage() {
  const { slug } = Route.useParams();
  const post = posts.find((p) => p.slug === slug);
  if (!post) return null;
  const service = services.find((s) => s.slug === post.service);
  const more = posts.filter((p) => p.slug !== slug).slice(0, 3);
  return (
    <Layout>
      <JsonLd data={articleJsonLd(post)} />
      <article className="hx-post">
        <header className="hx-container hx-post-head" data-reveal>
          <Link to="/blog" className="hx-text-link"><ArrowLeft size={16} /> All articles</Link>
          <span className="hx-blog-meta">{post.category} · {post.readTime}</span>
          <h1>{post.title}</h1>
          <p className="hx-lead">{post.excerpt}</p>
        </header>
        <div className="hx-container"><img className="hx-post-cover" src={post.image} alt={post.title} /></div>
        <div className="hx-container hx-post-layout">
          <aside className="hx-glass hx-post-takeaways">
            <strong>Key takeaways</strong>
            <ul>{post.takeaways.map((t) => <li key={t}><Check size={16} />{t}</li>)}</ul>
          </aside>
          <div className="hx-post-body">{post.body.map((b, i) => <Block key={i} b={b} />)}</div>
        </div>
      </article>
      <section className="hx-final"><div className="hx-container" data-reveal>
        <Eyebrow>{service ? service.title.toUpperCase() : "LET’S TALK"}</Eyebrow>
        <h2>Want this set up for your business?</h2>
        <p>We can implement it for you, end to end.</p>
        <CTA>Let’s Talk Growth</CTA>
        {service ? <p><Link className="hx-text-link" to="/services/$slug" params={{ slug: service.slug }}>See our {service.title} service <ArrowUpRight size={16} /></Link></p> : null}
        <div className="hx-svc-related">{more.map((p) => <Link key={p.slug} className="hx-text-link" to="/blog/$slug" params={{ slug: p.slug }}>{p.title} <ArrowUpRight size={16} /></Link>)}</div>
      </div></section>
    </Layout>
  );
}
