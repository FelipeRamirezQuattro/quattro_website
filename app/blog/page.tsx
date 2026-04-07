import type { Metadata } from "next";
import NewsletterSignup from "@/components/sections/NewsletterSignup";
import BlogListingClient from "@/components/sections/BlogListingClient";

export const metadata: Metadata = {
  title: "Blog — Quattro Software",
  description:
    "Insights on software development, integrations, product strategy, and digital operations from the Quattro Software team.",
};

export default function BlogPage() {
  return (
    <>
      <section className="relative py-20 sm:py-24 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-25 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-4">
            Knowledge Base
          </p>
          <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white mb-5 sm:mb-6">
            Quattro <span className="gradient-text">Blog</span>
          </h1>
          <p className="font-body text-base sm:text-lg text-quattro-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10">
            Practical advice and implementation notes from real client projects,
            product builds, and integration work.
          </p>

          <div className="max-w-md mx-auto">
            <NewsletterSignup />
          </div>
        </div>
      </section>

      <BlogListingClient />
    </>
  );
}
