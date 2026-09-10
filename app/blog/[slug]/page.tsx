import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import CTABanner from "@/components/sections/CTABanner";
import { getBlogPostBySlug, getPublishedBlogSlugs } from "@/lib/db";
import { formatDate, estimateReadTime } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
}

async function getPost(slug: string) {
  return getBlogPostBySlug(slug);
}

export async function generateStaticParams() {
  const slugs = await getPublishedBlogSlugs();
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Article Not Found — Quattro Software",
      description: "The requested article could not be found.",
    };
  }

  return {
    title: `${post.title} — Quattro Blog`,
    description: post.excerpt,
  };
}

export const revalidate = 3600;

export default async function BlogDetailPage({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) notFound();

  const headingMatches = post.content.match(/^##?\s+.+$/gm) || [];
  const toc = headingMatches.map((line) => {
    const text = line.replace(/^##?\s+/, "").trim();
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return { text, id };
  });

  return (
    <>
      <section className="py-20 bg-quattro-surface-dark">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <p className="font-mono text-xs uppercase tracking-widest text-quattro-accent mb-3">
            {post.category || "Engineering"}
          </p>
          <h1 className="font-display text-4xl sm:text-5xl font-bold text-white mb-4">
            {post.title}
          </h1>
          <p className="font-body text-quattro-text-secondary text-lg mb-4 max-w-3xl">
            {post.excerpt}
          </p>
          <p className="font-mono text-xs text-quattro-text-secondary uppercase tracking-wide">
            {formatDate(post.published_at || post.created_at)} ·{" "}
            {estimateReadTime(post.content)} min read · {post.author}
          </p>
        </div>
      </section>

      {post.cover_image && (
        <section className="bg-quattro-surface-mid">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-10 relative">
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden border border-quattro-border-dark">
              <Image
                src={post.cover_image}
                alt={post.title}
                fill
                className="object-cover"
                priority
              />
            </div>
          </div>
        </section>
      )}

      <section className="py-14 bg-quattro-surface-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_260px] gap-10">
          <article className="prose prose-invert max-w-none prose-headings:font-display prose-p:text-quattro-text-secondary prose-li:text-quattro-text-secondary">
            <ReactMarkdown remarkPlugins={[remarkGfm]}>
              {post.content}
            </ReactMarkdown>
          </article>

          <aside className="hidden lg:block">
            <div className="sticky top-28 rounded-xl border border-quattro-border-dark bg-quattro-surface-dark p-5">
              <p className="font-mono text-xs uppercase tracking-wide text-quattro-accent mb-3">
                Table Of Contents
              </p>
              <ul className="space-y-2">
                {toc.length === 0 && (
                  <li className="text-sm text-quattro-text-secondary">
                    No headings
                  </li>
                )}
                {toc.map((item) => (
                  <li
                    key={item.id}
                    className="text-sm text-quattro-text-secondary"
                  >
                    {item.text}
                  </li>
                ))}
              </ul>
            </div>
          </aside>
        </div>
      </section>

      <CTABanner source="blog-detail-cta" />
    </>
  );
}
