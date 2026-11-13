"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import type { BlogPost } from "@/types";

const categories = ["All", "Engineering", "Product", "Integrations", "Company"];

export default function BlogListingClient() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const response = await fetch("/api/blog?limit=30", {
          cache: "no-store",
        });
        const data = await response.json();
        if (active) setPosts(Array.isArray(data.posts) ? data.posts : []);
      } catch {
        if (active) setPosts([]);
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((post) => post.category === activeCategory);
  }, [posts, activeCategory]);

  const displayPosts =
    filtered.length > 0
      ? filtered
      : Array.from({ length: 3 }).map((_, i) => ({
          id: `placeholder-${i}`,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
          title: "Coming Soon",
          slug: "#",
          excerpt:
            "We are preparing practical software and product insights for this category.",
          content: "",
          author: "PFS Connect Team",
          published: true,
          cover_image: undefined,
          category: activeCategory === "All" ? "Engineering" : activeCategory,
        }));

  return (
    <section className="py-16 sm:py-20 bg-pfs-surface-mid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center mb-10 sm:mb-12">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-3.5 sm:px-4 py-2 rounded-full font-mono text-[11px] sm:text-xs border transition-colors ${
                activeCategory === category
                  ? "bg-pfs-primary border-pfs-primary text-white"
                  : "bg-transparent border-pfs-border-dark text-pfs-text-secondary hover:border-pfs-primary/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-64 rounded-2xl bg-pfs-surface-dark border border-pfs-border-dark animate-pulse"
              />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
            {displayPosts.map((post) => (
              <article
                key={post.id}
                className="rounded-2xl border border-pfs-border-dark bg-pfs-surface-dark overflow-hidden
                           hover:border-pfs-primary/50 transition-all"
              >
                <div className="relative h-40 bg-pfs-surface-mid">
                  {post.cover_image ? (
                    <Image
                      src={post.cover_image}
                      alt={post.title}
                      fill
                      className="object-cover"
                    />
                  ) : (
                    <div className="absolute inset-0 gradient-mesh opacity-40" />
                  )}
                </div>

                <div className="p-5 sm:p-6">
                  <p className="font-mono text-xs text-pfs-accent mb-2 uppercase tracking-wide">
                    {post.category || "Engineering"}
                  </p>
                  <h2 className="font-display text-lg sm:text-xl text-white font-bold mb-3 min-h-12 sm:min-h-14">
                    {post.title}
                  </h2>
                  <p className="font-body text-sm text-pfs-text-secondary leading-relaxed mb-5 min-h-16">
                    {post.excerpt}
                  </p>
                  {post.slug === "#" ? (
                    <span className="inline-flex items-center gap-2 text-sm font-body text-pfs-text-secondary">
                      Publishing soon
                    </span>
                  ) : (
                    <Link
                      href={`/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-sm font-body text-pfs-accent hover:text-pfs-accent-2 transition-colors"
                    >
                      Read article
                      <ArrowUpRight size={14} />
                    </Link>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
