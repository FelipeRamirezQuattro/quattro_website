"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Quote, ChevronLeft, ChevronRight, Star } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const testimonials = [
  {
    company: "Group 1826",
    text: "We're incredibly grateful for the app Quattro Software created for us! They go above and beyond typical custom software development. Not only did they design an app that streamlined our collection efforts, but they also continuously enhance it with updates for improved efficiency and automation. Their communication throughout the process has been excellent, and they're always available to offer support whenever we need it.",
    rating: 5,
    role: "Client",
  },
];

export default function TestimonialsCarousel() {
  const [current, setCurrent] = useState(0);

  const prev = () =>
    setCurrent((c) => (c - 1 + testimonials.length) % testimonials.length);
  const next = () => setCurrent((c) => (c + 1) % testimonials.length);

  return (
    <section className="py-24 bg-quattro-surface-light">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="font-mono text-quattro-primary text-sm tracking-widest uppercase mb-3">
            Client Stories
          </p>
          <h2 className="font-display font-bold text-3xl sm:text-4xl lg:text-5xl text-quattro-text-dark">
            What Our Clients Say
          </h2>
        </AnimatedSection>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-3xl p-8 sm:p-12 shadow-sm border border-gray-100"
            >
              {/* Quote mark */}
              <div className="text-quattro-primary mb-6">
                <Quote size={40} fill="currentColor" className="opacity-20" />
              </div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <Star
                      key={i}
                      size={18}
                      fill="rgb(251,191,36)"
                      color="rgb(251,191,36)"
                    />
                  ),
                )}
              </div>

              <blockquote className="font-body text-gray-600 text-lg leading-relaxed mb-8 italic">
                &ldquo;{testimonials[current].text}&rdquo;
              </blockquote>

              <div>
                <div className="font-display font-bold text-quattro-text-dark text-lg">
                  {testimonials[current].company}
                </div>
                <div className="font-body text-sm text-quattro-primary">
                  {testimonials[current].role}
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation */}
          {testimonials.length > 1 && (
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={prev}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-quattro-primary hover:border-quattro-primary transition-colors"
                aria-label="Previous testimonial"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === current ? "bg-quattro-primary w-6" : "bg-gray-300"
                    }`}
                    aria-label={`Testimonial ${i + 1}`}
                  />
                ))}
              </div>
              <button
                onClick={next}
                className="w-10 h-10 rounded-full border border-gray-200 flex items-center justify-center text-gray-400 hover:text-quattro-primary hover:border-quattro-primary transition-colors"
                aria-label="Next testimonial"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
