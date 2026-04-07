"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  staggerContainer,
  fadeUp,
  slideInLeft,
  slideInRight,
  fadeIn,
} from "@/lib/animations";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
  stagger?: boolean;
  once?: boolean;
}

const directionVariants = {
  up: fadeUp,
  left: slideInLeft,
  right: slideInRight,
  none: fadeIn,
};

export default function AnimatedSection({
  children,
  className = "",
  direction = "up",
  stagger = false,
  once = true,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once, margin: "-80px" });

  if (stagger) {
    return (
      <motion.div
        ref={ref}
        variants={staggerContainer}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        className={className}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      ref={ref}
      variants={directionVariants[direction]}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/** Wraps an individual child inside a stagger container — use inside AnimatedSection stagger=true */
export function AnimatedItem({
  children,
  className = "",
  direction = "up",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right" | "none";
}) {
  return (
    <motion.div variants={directionVariants[direction]} className={className}>
      {children}
    </motion.div>
  );
}
