import type { Metadata } from "next";
import {
  Code2,
  Users,
  Smartphone,
  Cloud,
  GitBranch,
  Database,
} from "lucide-react";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";
import ProcessTimeline from "@/components/sections/ProcessTimeline";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "How We Work — Quattro Software",
  description:
    "Discover Quattro Software's transparent 7-step development process — from initial requirements gathering through design, build, UAT, and ongoing support.",
};

const overviewCards = [
  {
    icon: Code2,
    title: "Transparent Communication",
    desc: "You are never left wondering. We provide regular updates, demos, and clear milestone tracking throughout the entire engagement.",
  },
  {
    icon: GitBranch,
    title: "Agile & Iterative",
    desc: "We work in focused sprints so you see progress fast, course-correct early, and always have a working build to review.",
  },
  {
    icon: Database,
    title: "Quality Assured",
    desc: "Every feature goes through rigorous testing — unit, integration, and UAT — before it ever reaches your users.",
  },
];

const supportPillars = [
  {
    icon: Cloud,
    title: "Cloud Hosting",
    desc: "Scalable infrastructure on AWS, Azure, or your preferred cloud.",
  },
  {
    icon: GitBranch,
    title: "Version Control",
    desc: "Git-based workflows with clear branching and release management.",
  },
  {
    icon: Smartphone,
    title: "Mobile-Ready",
    desc: "Every solution is responsive and tested across device sizes.",
  },
  {
    icon: Users,
    title: "Dedicated Support",
    desc: "Post-launch maintenance plans so your software never falls behind.",
  },
];

const techStack = [
  "Next.js",
  "React",
  "TypeScript",
  "Node.js",
  "Python",
  "PostgreSQL",
  "Supabase",
  "AWS",
  "Azure",
  "Power Apps",
  "QuickBooks API",
  "Tailwind CSS",
  "Docker",
  "REST APIs",
];

export default function HowWeWorkPage() {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative py-20 sm:py-24 lg:py-32 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative">
          <AnimatedSection>
            <AnimatedItem>
              <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-4">
                Our Methodology
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5 sm:mb-6">
                How We Build <span className="gradient-text">Software</span>
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-base sm:text-xl text-quattro-text-secondary max-w-2xl mx-auto">
                Every project follows the same disciplined process — adaptable
                to your size, industry, and timeline.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Overview cards ─────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 bg-quattro-surface-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-8"
          >
            {overviewCards.map((card) => (
              <AnimatedItem key={card.title}>
                <div
                  className="p-7 rounded-2xl bg-quattro-surface-dark border border-quattro-border-dark
                                hover:border-quattro-primary/50 transition-colors group"
                >
                  <div
                    className="w-12 h-12 rounded-xl bg-quattro-primary/20 flex items-center justify-center mb-5
                                  group-hover:bg-quattro-primary/30 transition-colors"
                  >
                    <card.icon size={22} className="text-quattro-accent" />
                  </div>
                  <h3 className="font-display font-bold text-white text-lg mb-3">
                    {card.title}
                  </h3>
                  <p className="font-body text-quattro-text-secondary text-sm leading-relaxed">
                    {card.desc}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Process Timeline ───────────────────────────────────────── */}
      <ProcessTimeline />

      {/* ── Support pillars ────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <AnimatedItem>
              <p className="font-mono text-quattro-primary text-sm tracking-widest uppercase mb-3">
                Beyond Launch
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-quattro-text-dark mb-4">
                We Support You End-to-End
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6"
          >
            {supportPillars.map((p) => (
              <AnimatedItem key={p.title}>
                <div
                  className="text-center p-6 rounded-2xl bg-white border border-quattro-border-light
                                hover:border-quattro-primary/30 hover:shadow-md transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-quattro-primary/10 flex items-center justify-center mx-auto mb-4">
                    <p.icon size={22} className="text-quattro-primary" />
                  </div>
                  <h3 className="font-display font-bold text-quattro-text-dark mb-2">
                    {p.title}
                  </h3>
                  <p className="font-body text-slate-500 text-sm leading-relaxed">
                    {p.desc}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Tech stack marquee ─────────────────────────────────────── */}
      <section className="py-14 sm:py-16 bg-quattro-surface-mid overflow-hidden">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 mb-8 text-center">
          <p className="font-mono text-quattro-text-secondary text-sm tracking-widest uppercase">
            Technologies We Work With
          </p>
        </div>
        <div className="flex overflow-hidden">
          <div className="flex gap-8 animate-marquee whitespace-nowrap">
            {[...techStack, ...techStack].map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-quattro-border-dark
                           bg-quattro-surface-dark text-quattro-text-secondary font-mono text-sm shrink-0"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-quattro-accent" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <CTABanner source="how-we-work-cta" />
    </>
  );
}
