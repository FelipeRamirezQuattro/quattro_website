"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { Calendar, ArrowRight } from "lucide-react";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";
import Badge from "@/components/ui/Badge";
import NewsletterSignup from "./NewsletterSignup";
import type { BlogPost } from "@/types";
import { formatDate } from "@/lib/utils";

export default function BlogTeaser() {
  const [posts, setPosts] = useState<Partial<BlogPost>[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/blog?limit=2")
      .then((r) => r.json())
      .then((d) => {
        setPosts(d.posts ?? []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const placeholders: Partial<BlogPost>[] = [
    {
      id: "p1",
      title: "Coming Soon",
      excerpt: "Tech insights from the Quattro team — stay tuned.",
      category: "Technology",
    },
    {
      id: "p2",
      title: "Coming Soon",
      excerpt: "Company news and updates — check back soon.",
      category: "Company",
    },
  ];

  const displayPosts = loading ? [] : posts.length > 0 ? posts : placeholders;

  return (
    <section className="py-24 bg-quattro-surface-dark relative overflow-hidden">
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Blog teaser */}
          <div>
            <AnimatedSection direction="left">
              <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
                Insights
              </p>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-8">
                Latest from the Blog
              </h2>
            </AnimatedSection>

            <AnimatedSection stagger className="space-y-6">
              {displayPosts.map((post, i) => (
                <AnimatedItem key={post.id || i}>
                  <div className="p-6 rounded-2xl bg-quattro-surface-mid border border-quattro-border-dark hover:border-quattro-primary/50 transition-all group relative overflow-hidden">
                    {/* Coming soon overlay */}
                    {post.title === "Coming Soon" && (
                      <div className="absolute top-3 right-3">
                        <Badge variant="outline">Coming Soon</Badge>
                      </div>
                    )}
                    {post.category && (
                      <Badge className="mb-3">{post.category}</Badge>
                    )}
                    <h3 className="font-display font-bold text-white mb-2 group-hover:text-quattro-accent transition-colors">
                      {post.title}
                    </h3>
                    <p className="font-body text-sm text-quattro-text-secondary mb-4 line-clamp-2">
                      {post.excerpt}
                    </p>
                    {post.published_at && (
                      <div className="flex items-center gap-1.5 text-xs text-quattro-text-secondary/60">
                        <Calendar size={12} />
                        {formatDate(post.published_at)}
                      </div>
                    )}
                    {post.slug && post.title !== "Coming Soon" && (
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center gap-1 text-quattro-accent text-xs mt-3 hover:gap-2 transition-all"
                      >
                        Read More <ArrowRight size={12} />
                      </Link>
                    )}
                  </div>
                </AnimatedItem>
              ))}
            </AnimatedSection>

            <AnimatedSection className="mt-6">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-quattro-accent text-sm font-body hover:gap-3 transition-all"
              >
                View All Posts <ArrowRight size={14} />
              </Link>
            </AnimatedSection>
          </div>

          {/* Newsletter */}
          <div>
            <NewsletterSignup />
          </div>
        </div>
      </div>
    </section>
  );
}
