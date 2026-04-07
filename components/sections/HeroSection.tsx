"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { ElementType } from "react";
import { Zap, ArrowRight, Play } from "lucide-react";
import Badge from "@/components/ui/Badge";
import CountUpNumber from "@/components/ui/CountUpNumber";
import { stats } from "@/data/stats";
import * as LucideIcons from "lucide-react";

// Map icon name string → Lucide component
type IconName = keyof typeof LucideIcons;
function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const Comp = LucideIcons[name as IconName] as ElementType;
  return Comp ? <Comp size={size} /> : null;
}

const headline = ["Crafting", "Code,", "Creating", "Solutions"];

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden gradient-mesh">
      {/* Animated grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-40 pointer-events-none" />

      {/* Floating geometric blobs */}
      <motion.div
        className="absolute top-20 left-10 w-64 h-64 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(23,84,154), transparent 70%)",
        }}
        animate={{ y: [0, -30, 0], x: [0, 15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-32 right-16 w-80 h-80 rounded-full opacity-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(56,189,248), transparent 70%)",
        }}
        animate={{ y: [0, 25, 0], x: [0, -20, 0] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgb(23,84,154), transparent 70%)",
        }}
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Pulsing glow ring behind headline */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 rounded-full glow-pulse opacity-20 pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 sm:pt-28 sm:pb-20 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-6 flex justify-center"
        >
          <Badge variant="accent">
            <Zap size={12} />
            Custom Software Development
          </Badge>
        </motion.div>

        {/* Animated headline */}
        <h1 className="font-display font-bold text-4xl sm:text-6xl lg:text-7xl text-white mb-5 sm:mb-6 leading-[1.1] sm:leading-tight">
          {headline.map((word, i) => (
            <motion.span
              key={word}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08, duration: 0.5, ease: "easeOut" }}
              className={`inline-block mr-4 ${word === "Solutions" ? "gradient-text" : ""}`}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* Body */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="font-body text-base sm:text-xl text-quattro-text-secondary max-w-2xl mx-auto mb-8 sm:mb-10 leading-relaxed"
        >
          We are a custom software development company committed to turning your
          ideas into powerful solutions that drive your business forward. Expert
          team, tailored solutions, free consultations.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 0.5 }}
          className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-12 sm:mb-16"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-quattro-primary hover:bg-quattro-primary-light text-white font-display font-semibold text-base sm:text-lg rounded-xl transition-all duration-200 shadow-[0_0_30px_rgba(23,84,154,0.5)] hover:shadow-[0_0_50px_rgba(23,84,154,0.7)]"
          >
            Start Your Project <ArrowRight size={18} />
          </Link>
          <Link
            href="/showcase"
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 border border-quattro-border-dark hover:border-quattro-accent text-quattro-text-secondary hover:text-white font-display font-semibold text-base sm:text-lg rounded-xl transition-all duration-200"
          >
            <Play size={16} /> View Our Work
          </Link>
        </motion.div>

        {/* Stat counters */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 max-w-2xl mx-auto"
        >
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center p-3.5 sm:p-4 rounded-2xl bg-quattro-surface-mid/60 border border-quattro-border-dark"
            >
              <div className="text-quattro-accent mb-1">
                <Icon name={stat.icon} size={18} />
              </div>
              <div className="font-display font-bold text-xl sm:text-3xl text-white">
                <CountUpNumber target={stat.value} suffix={stat.suffix} />
              </div>
              <div className="font-body text-xs text-quattro-text-secondary text-center mt-1">
                {stat.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-px h-12 bg-gradient-to-b from-quattro-accent to-transparent mx-auto"
        />
      </motion.div>
    </section>
  );
}
