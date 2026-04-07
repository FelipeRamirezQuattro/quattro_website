"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Search,
  PenTool,
  Code2,
  TestTube2,
  Rocket,
  ArrowRight,
} from "lucide-react";
import { staggerContainer, fadeUp } from "@/lib/animations";

const steps = [
  {
    id: 1,
    icon: Search,
    label: "Discovery",
    color: "#17549A",
    desc: "Define goals, users & requirements",
  },
  {
    id: 2,
    icon: PenTool,
    label: "Design",
    color: "#2970C4",
    desc: "Prototype, iterate, confirm vision",
  },
  {
    id: 3,
    icon: Code2,
    label: "Build",
    color: "#38BDF8",
    desc: "Agile sprints, clean code, reviews",
  },
  {
    id: 4,
    icon: TestTube2,
    label: "Test",
    color: "#2970C4",
    desc: "QA, UAT, bug-free launch prep",
  },
  {
    id: 5,
    icon: Rocket,
    label: "Launch",
    color: "#17549A",
    desc: "Go live, monitor, support & grow",
  },
];

export default function WorkflowDiagram() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-quattro-surface-dark relative overflow-hidden">
      {/* Background grid */}
      <div className="absolute inset-0 grid-overlay opacity-30 pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          ref={ref}
          className="text-center mb-16"
        >
          <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
            Our Process
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-white mb-4">
            How We Turn Ideas Into Reality
          </h2>
          <p className="font-body text-quattro-text-secondary text-lg max-w-2xl mx-auto">
            A proven five-step workflow that takes your concept from discovery
            to a live, production-ready solution.
          </p>
        </motion.div>

        {/* Desktop: horizontal */}
        <div className="hidden md:flex items-start justify-between relative">
          {/* Animated SVG connecting line */}
          <svg
            className="absolute top-8 left-0 right-0 w-full h-4 pointer-events-none"
            viewBox="0 0 100 8"
            preserveAspectRatio="none"
          >
            <motion.path
              d="M 5 4 L 95 4"
              stroke="rgba(56,189,248,0.4)"
              strokeWidth="0.5"
              strokeDasharray="1 2"
              fill="none"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={inView ? { pathLength: 1, opacity: 1 } : {}}
              transition={{ duration: 1.5, ease: "easeInOut", delay: 0.3 }}
            />
          </svg>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate={inView ? "visible" : "hidden"}
            className="flex items-start justify-between w-full"
          >
            {steps.map((step, i) => (
              <motion.div
                key={step.id}
                variants={fadeUp}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center w-1/5 px-2"
              >
                {/* Node circle */}
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={inView ? { scale: 1, opacity: 1 } : {}}
                  transition={{ delay: 0.3 + i * 0.2, duration: 0.4 }}
                  className="relative w-16 h-16 rounded-full flex items-center justify-center mb-4 z-10 glow-pulse"
                  style={{
                    background: `linear-gradient(135deg, ${step.color}, rgba(8,15,30,1))`,
                    border: `2px solid ${step.color}`,
                    boxShadow: `0 0 20px ${step.color}40`,
                  }}
                >
                  <step.icon size={24} color="#fff" />
                  {/* Connector arrow */}
                  {i < steps.length - 1 && (
                    <div className="absolute -right-[calc(50%+18px)] top-1/2 -translate-y-1/2 text-quattro-accent/40">
                      <ArrowRight size={14} />
                    </div>
                  )}
                </motion.div>

                <h3 className="font-display font-semibold text-white text-sm mb-1">
                  {step.label}
                </h3>
                <p className="font-body text-xs text-quattro-text-secondary leading-relaxed">
                  {step.desc}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>

        {/* Mobile: vertical */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="flex md:hidden flex-col gap-6"
        >
          {steps.map((step, i) => (
            <motion.div
              key={step.id}
              variants={fadeUp}
              className="flex items-start gap-4"
            >
              <div
                className="w-12 h-12 rounded-full flex-shrink-0 flex items-center justify-center"
                style={{
                  background: `linear-gradient(135deg, ${step.color}, rgba(8,15,30,1))`,
                  border: `2px solid ${step.color}`,
                }}
              >
                <step.icon size={20} color="#fff" />
              </div>
              <div>
                <div className="font-mono text-quattro-accent text-xs mb-1">
                  0{i + 1}
                </div>
                <h3 className="font-display font-semibold text-white mb-1">
                  {step.label}
                </h3>
                <p className="font-body text-sm text-quattro-text-secondary">
                  {step.desc}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
