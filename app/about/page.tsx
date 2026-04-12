import type { Metadata } from "next";
import Image from "next/image";
import { Award, Heart, Clock, MessageCircle, Star } from "lucide-react";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";
import CTABanner from "@/components/sections/CTABanner";
import NetworkAnimation from "@/components/sections/NetworkAnimation";
import { team } from "@/data/team";
import { values } from "@/data/values";

export const metadata: Metadata = {
  title: "About Us — Quattro Software",
  description:
    "Meet the team behind Quattro Software. We are a family-oriented custom software company founded in 2023, driven by integrity, reliability, and a passion for helping businesses grow.",
};

const valueIconMap: Record<string, React.ElementType> = {
  Award,
  Heart,
  Clock,
  MessageCircle,
  Star,
};

export default function AboutPage() {
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
                Our Story
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-5 sm:mb-6">
                About{" "}
                <span className="relative inline-block">
                  <span className="gradient-text">Quattro</span>
                  <span
                    className="absolute -bottom-1 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background:
                        "linear-gradient(to right, rgb(23,84,154), rgb(56,189,248))",
                    }}
                  />
                </span>{" "}
                Software
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-base sm:text-xl text-quattro-text-secondary max-w-2xl mx-auto">
                A family-oriented software company built on trust,
                craftsmanship, and the belief that every business deserves
                technology that works as hard as they do.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      {/* ── Who We Are ─────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            {/* Text */}
            <AnimatedSection>
              <AnimatedItem>
                <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
                  Who We Are
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-6 leading-tight">
                  Built on Relationships, Powered by Purpose
                </h2>
              </AnimatedItem>
              <AnimatedItem>
                <p className="font-body text-quattro-text-secondary leading-relaxed mb-5">
                  Quattro Software was founded in 2023 by Jeff Berthelsen — a
                  former controller with 13 years of business experience — who
                  saw firsthand how the right software could transform a
                  company&#39;s operations. He built Quattro to bridge that gap
                  between vision and technology.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <p className="font-body text-quattro-text-secondary leading-relaxed mb-5">
                  Our team is small, focused, and deeply committed. We are
                  developers, designers, analysts, and communicators who believe
                  software should solve real problems — not create new ones.
                </p>
              </AnimatedItem>
              <AnimatedItem>
                <p className="font-body text-quattro-text-secondary leading-relaxed">
                  We treat every client engagement like a partnership. You will
                  hear from us regularly, understand every decision, and launch
                  with confidence.
                </p>
              </AnimatedItem>
            </AnimatedSection>

            {/* Network animation */}
            <AnimatedSection>
              <AnimatedItem>
                <NetworkAnimation />
              </AnimatedItem>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ── Values ─────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <AnimatedItem>
              <p className="font-mono text-quattro-primary text-sm tracking-widest uppercase mb-3">
                What We Stand For
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-quattro-text-dark mb-4">
                Our Core Values
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-slate-500 max-w-xl mx-auto">
                These values are not aspirations — they are the standard we hold
                ourselves to every day.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            {values.map((v) => {
              const Icon = valueIconMap[v.icon] || Star;
              return (
                <AnimatedItem key={v.title}>
                  <div
                    className="group p-7 rounded-2xl bg-white border border-quattro-border-light
                                  hover:border-quattro-primary/40 hover:shadow-lg transition-all duration-300"
                  >
                    <div
                      className="w-12 h-12 rounded-xl bg-quattro-primary/10 flex items-center justify-center mb-5
                                    group-hover:bg-quattro-primary/20 transition-colors"
                    >
                      <Icon size={22} className="text-quattro-primary" />
                    </div>
                    <h3 className="font-display font-bold text-lg text-quattro-text-dark mb-2">
                      {v.title}
                    </h3>
                    <p className="font-body text-slate-500 text-sm leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                </AnimatedItem>
              );
            })}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Team ───────────────────────────────────────────────────── */}
      <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-dark">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <AnimatedItem>
              <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
                The People
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white mb-4">
                Meet the Team
              </h2>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-quattro-text-secondary max-w-xl mx-auto">
                A group of dedicated professionals who care deeply about the
                work they do and the clients they serve.
              </p>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {team.map((member) => (
              <AnimatedItem key={member.name}>
                <div
                  className="group p-7 rounded-2xl bg-quattro-surface-mid border border-quattro-border-dark
                                hover:border-quattro-primary/50 transition-all duration-300"
                >
                  {/* Avatar */}
                  {member.image ? (
                    <div className="w-16 h-16 rounded-2xl overflow-hidden mb-5">
                      <Image
                        src={member.image}
                        alt={member.name}
                        width={64}
                        height={64}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  ) : (
                    <div
                      className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${member.color}
                                     flex items-center justify-center mb-5`}
                    >
                      <span className="font-display font-bold text-xl text-white">
                        {member.initials}
                      </span>
                    </div>
                  )}
                  <h3 className="font-display font-bold text-white text-lg">
                    {member.name}
                  </h3>
                  <p className="font-mono text-quattro-accent text-xs tracking-wide mb-3">
                    {member.role}
                  </p>
                  <p className="font-body text-quattro-text-secondary text-sm leading-relaxed">
                    {member.bio}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <CTABanner source="about-cta" />
    </>
  );
}
