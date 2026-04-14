import Image from "next/image";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";
import CTABanner from "@/components/sections/CTABanner";
import { CheckCircle2 } from "lucide-react";
import type { Service } from "@/types";
import type React from "react";

const miniProcess = [
  {
    step: "01",
    title: "Discovery",
    desc: "We map your requirements, constraints, and goals in a focused kick-off session.",
  },
  {
    step: "02",
    title: "Delivery",
    desc: "Our team builds, tests, and iterates with you at every checkpoint.",
  },
  {
    step: "03",
    title: "Partnership",
    desc: "We provide ongoing support and enhancements as your business evolves.",
  },
];

interface Props {
  service: Service;
  Icon: React.ElementType;
  source: string;
}

export default function ServicePageContent({ service, Icon, source }: Props) {
  return (
    <>
      {/* ── Hero ───────────────────────────────────────────────────── */}
      <section className="relative py-28 lg:py-36 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <AnimatedItem>
              {/* Icon */}
              <div
                className="w-16 h-16 rounded-2xl bg-quattro-primary/20 flex items-center justify-center mb-8
                              border border-quattro-primary/40"
              >
                <Icon size={30} className="text-quattro-accent" />
              </div>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="font-display font-bold text-4xl sm:text-5xl lg:text-6xl text-white leading-tight mb-6">
                {service.title}
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-quattro-text-secondary text-lg sm:text-xl max-w-2xl">
                {service.description}
              </p>
            </AnimatedItem>
            {service.image && (
              <AnimatedItem>
                <div className="relative h-56 sm:h-72 w-full rounded-2xl overflow-hidden mt-10 border border-quattro-border-dark">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-quattro-surface-dark/60 to-transparent" />
                </div>
              </AnimatedItem>
            )}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Features ───────────────────────────────────────────────── */}
      <section className="py-24 bg-quattro-surface-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="mb-12">
            <AnimatedItem>
              <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
                What&#39;s Included
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-white">
                Everything You Need to Succeed
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
          >
            {service.features.map((feature) => (
              <AnimatedItem key={feature}>
                <div
                  className="flex items-start gap-4 p-5 rounded-xl bg-quattro-surface-dark border border-quattro-border-dark
                                hover:border-quattro-primary/40 transition-colors"
                >
                  <CheckCircle2
                    size={20}
                    className="text-quattro-accent shrink-0 mt-0.5"
                  />
                  <span className="font-body text-quattro-text-secondary leading-relaxed">
                    {feature}
                  </span>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── Mini-process ───────────────────────────────────────────── */}
      <section className="py-24 bg-quattro-surface-light">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-14">
            <AnimatedItem>
              <p className="font-mono text-quattro-primary text-sm tracking-widest uppercase mb-3">
                How It Works
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="font-display font-bold text-3xl sm:text-4xl text-quattro-text-dark">
                Our 3-Step Engagement
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-3 gap-8"
          >
            {miniProcess.map((step, i) => (
              <AnimatedItem key={step.step}>
                <div className="relative p-7 rounded-2xl bg-white border border-quattro-border-light hover:shadow-lg transition-all">
                  {/* Connector line */}
                  {i < miniProcess.length - 1 && (
                    <div
                      className="hidden md:block absolute top-7 left-[calc(100%+1px)] w-8 h-0.5
                                    bg-gradient-to-r from-quattro-primary/40 to-transparent z-10"
                    />
                  )}
                  <span className="font-mono font-bold text-4xl text-quattro-primary/20 block mb-4">
                    {step.step}
                  </span>
                  <h3 className="font-display font-bold text-xl text-quattro-text-dark mb-3">
                    {step.title}
                  </h3>
                  <p className="font-body text-slate-500 leading-relaxed text-sm">
                    {step.desc}
                  </p>
                </div>
              </AnimatedItem>
            ))}
          </AnimatedSection>
        </div>
      </section>

      {/* ── CTA ────────────────────────────────────────────────────── */}
      <CTABanner source={source} />
    </>
  );
}
