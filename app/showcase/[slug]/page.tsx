import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";
import CTABanner from "@/components/sections/CTABanner";
import { projects } from "@/data/projects";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return { title: "Project Not Found" };
  return {
    title: `${project.title} — Quattro Software`,
    description: project.description,
  };
}

export default async function ShowcaseDetailPage({ params }: Props) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative py-28 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-25 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          {/* Back link */}
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 font-mono text-quattro-text-secondary text-sm
                       hover:text-quattro-accent transition-colors mb-10"
          >
            <ArrowLeft size={14} />
            All Projects
          </Link>

          <AnimatedSection>
            <AnimatedItem>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.categories.map((cat) => (
                  <span
                    key={cat}
                    className="px-3 py-1 rounded-full bg-quattro-primary/20 text-quattro-accent
                               font-mono text-xs border border-quattro-primary/30"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="font-display font-bold text-4xl sm:text-5xl text-white mb-6">
                {project.title}
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-quattro-text-secondary text-lg max-w-2xl">
                {project.description}
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Gradient image placeholder ─────────────────────────────── */}
      <section className="bg-quattro-surface-mid py-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <AnimatedItem>
              <div
                className={`rounded-2xl overflow-hidden bg-gradient-to-br ${project.gradient}
                            h-72 sm:h-96 flex items-center justify-center border border-quattro-border-dark`}
              >
                <div className="text-center">
                  <p className="font-display font-bold text-3xl sm:text-4xl text-white/80 mb-2">
                    {project.title}
                  </p>
                  <p className="font-mono text-white/50 text-sm">
                    Project Showcase
                  </p>
                </div>
              </div>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Description ────────────────────────────────────────────── */}
      <section className="py-20 bg-quattro-surface-mid">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection>
            <AnimatedItem>
              <h2 className="font-display font-bold text-2xl text-white mb-5">
                About This Project
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-quattro-text-secondary leading-relaxed text-lg">
                {project.description}
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-quattro-text-secondary leading-relaxed mt-4">
                Quattro Software partnered with this client to understand their
                unique operational challenges and craft a tailored solution that
                scales with their growth. The engagement included discovery
                workshops, iterative design reviews, and a thorough QA process
                before launch.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <CTABanner source="showcase-detail-cta" />
    </>
  );
}
