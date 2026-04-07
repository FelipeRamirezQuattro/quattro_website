"use client";

import { useRef } from "react";
import type { ElementType } from "react";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import {
  ClipboardList,
  PenTool,
  Code2,
  FlaskConical,
  RefreshCw,
  Rocket,
  Headphones,
} from "lucide-react";
import { processSteps } from "@/data/process";

const iconMap: Record<string, ElementType> = {
  ClipboardList,
  PenTool,
  Code2,
  FlaskConical,
  RefreshCw,
  Rocket,
  Headphones,
};

export default function ProcessTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 0.9", "end 0.1"],
  });

  // Map scroll progress → SVG pathLength 0→1
  const lineProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="py-24 bg-quattro-surface-dark relative overflow-hidden"
    >
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header */}
        <div className="text-center mb-20">
          <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
            Methodology
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            Our Development Process
          </h2>
          <p className="font-body text-quattro-text-secondary text-lg max-w-2xl mx-auto">
            A transparent, iterative workflow where you stay informed and in
            control from day one.
          </p>
        </div>

        {/* Desktop: alternating timeline */}
        <div className="hidden md:block relative">
          {/* Scroll-driven vertical line */}
          <div
            className="absolute left-1/2 top-0 bottom-0 -translate-x-1/2"
            style={{ width: 2 }}
          >
            {/* Placeholder track */}
            <div className="absolute inset-0 bg-quattro-border-dark rounded-full" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 right-0 origin-top rounded-full"
              style={{
                scaleY: lineProgress,
                background:
                  "linear-gradient(to bottom, rgb(23,84,154), rgb(56,189,248))",
              }}
            />
          </div>

          <div className="space-y-16">
            {processSteps.map((step, i) => {
              const isLeft = i % 2 === 0;
              return (
                <TimelineStep
                  key={step.number}
                  step={step}
                  isLeft={isLeft}
                  index={i}
                  scrollYProgress={scrollYProgress}
                  totalSteps={processSteps.length}
                />
              );
            })}
          </div>
        </div>

        {/* Mobile: vertical stack */}
        <div className="md:hidden space-y-8 relative">
          <div
            className="absolute left-6 top-0 bottom-0 w-0.5"
            style={{
              background:
                "linear-gradient(to bottom, rgba(23,84,154,0.3), rgba(56,189,248,0.3))",
            }}
          />
          {processSteps.map((step) => {
            const Icon = iconMap[step.icon] || Code2;
            return <MobileStep key={step.number} step={step} Icon={Icon} />;
          })}
        </div>
      </div>
    </section>
  );
}

// ── Desktop alternating step ─────────────────────────────────────────────────
function TimelineStep({
  step,
  isLeft,
  index,
  scrollYProgress,
  totalSteps,
}: {
  step: (typeof processSteps)[0];
  isLeft: boolean;
  index: number;
  scrollYProgress: ReturnType<typeof useScroll>["scrollYProgress"];
  totalSteps: number;
}) {
  const Icon = iconMap[step.icon] || Code2;
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  const stepProgress = (index + 0.5) / totalSteps;
  const isGlowing = useTransform(
    scrollYProgress,
    [
      Math.max(0, stepProgress - 0.1),
      stepProgress,
      Math.min(1, stepProgress + 0.1),
    ],
    [0, 1, 0.7],
  );

  return (
    <div ref={ref} className="relative flex items-start">
      {/* Center node */}
      <div className="absolute left-1/2 top-4 -translate-x-1/2 z-10">
        <motion.div
          style={{
            boxShadow: useTransform(
              isGlowing,
              [0, 1],
              ["0 0 0px rgba(56,189,248,0)", "0 0 30px rgba(56,189,248,0.7)"],
            ),
          }}
          className="w-12 h-12 rounded-full flex items-center justify-center border-2 border-quattro-primary bg-quattro-surface-dark transition-all duration-500"
        >
          <Icon size={20} color="rgb(56,189,248)" />
        </motion.div>
        {/* Step number badge */}
        <div className="absolute -top-2 -right-2 w-5 h-5 rounded-full bg-quattro-accent flex items-center justify-center text-xs font-mono font-bold text-quattro-surface-dark">
          {step.number}
        </div>
      </div>

      {/* Content — alternating left/right */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`w-5/12 ${isLeft ? "pr-12 text-right" : "ml-auto pl-12 text-left"}`}
      >
        <div
          className={`p-6 rounded-2xl bg-quattro-surface-mid border border-quattro-border-dark hover:border-quattro-primary/50 transition-colors ${
            isLeft ? "" : ""
          }`}
        >
          <h3 className="font-display font-bold text-lg text-white mb-3">
            {step.title}
          </h3>
          <ul className={`space-y-2 ${isLeft ? "text-right" : "text-left"}`}>
            {step.bullets.map((bullet, bi) => (
              <li
                key={bi}
                className="font-body text-sm text-quattro-text-secondary leading-relaxed"
              >
                {bullet}
              </li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  );
}

// ── Mobile step ──────────────────────────────────────────────────────────────
function MobileStep({
  step,
  Icon,
}: {
  step: (typeof processSteps)[0];
  Icon: ElementType;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -20 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.5 }}
      className="flex gap-5 pl-2"
    >
      {/* Icon node */}
      <div className="relative shrink-0">
        <div className="w-12 h-12 rounded-full bg-quattro-surface-mid border-2 border-quattro-primary flex items-center justify-center">
          <Icon size={20} color="rgb(56,189,248)" />
        </div>
        <div className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-quattro-accent flex items-center justify-center text-xs font-mono font-bold text-quattro-surface-dark">
          {step.number}
        </div>
      </div>

      {/* Content */}
      <div className="pb-6">
        <h3 className="font-display font-bold text-white mb-2">{step.title}</h3>
        <ul className="space-y-1.5">
          {step.bullets.map((bullet, i) => (
            <li
              key={i}
              className="font-body text-sm text-quattro-text-secondary leading-relaxed"
            >
              {bullet}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
}
