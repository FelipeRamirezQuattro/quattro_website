import type { Metadata } from "next";
import ShowcaseGridClient from "@/components/sections/ShowcaseGridClient";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Showcase — Quattro Software",
  description:
    "Explore selected Quattro Software projects across AI solutions, web development, app development, and QuickBooks integrations.",
};

export default function ShowcasePage() {
  return (
    <>
      <section className="relative py-20 sm:py-24 lg:py-32 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <AnimatedItem>
              <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-4">
                Our Work
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5 sm:mb-6">
                Project <span className="gradient-text">Showcase</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-base sm:text-xl text-quattro-text-secondary max-w-2xl mx-auto">
                Real solutions for real businesses. Each project represents a
                partnership built on trust, precision, and shared goals.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      <ShowcaseGridClient />
    </>
  );
}
