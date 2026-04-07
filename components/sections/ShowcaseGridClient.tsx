"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { projects } from "@/data/projects";

const allCategories = [
  "All",
  "AI Solutions",
  "App Development",
  "QuickBooks Integrations",
  "Web Development",
];

export default function ShowcaseGridClient() {
  const [activeFilter, setActiveFilter] = useState("All");

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((project) => project.categories.includes(activeFilter));

  return (
    <section className="py-16 sm:py-20 bg-quattro-surface-mid">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap gap-2.5 sm:gap-3 justify-center mb-10 sm:mb-14">
          {allCategories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-4 sm:px-5 py-2 rounded-full font-mono text-xs sm:text-sm transition-all duration-300 border ${
                activeFilter === category
                  ? "bg-quattro-primary text-white border-quattro-primary"
                  : "bg-transparent text-quattro-text-secondary border-quattro-border-dark hover:border-quattro-primary/50 hover:text-white"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeFilter}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
          >
            {filtered.map((project, i) => (
              <motion.div
                key={project.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.07 }}
              >
                <Link
                  href={`/showcase/${project.slug}`}
                  className="group block"
                >
                  <div className="rounded-2xl overflow-hidden border border-quattro-border-dark hover:border-quattro-primary/50 transition-all duration-300 hover:-translate-y-1">
                    <div
                      className={`h-52 bg-gradient-to-br ${project.gradient} relative`}
                    >
                      <div className="absolute inset-0 flex items-end p-6">
                        <div className="flex flex-wrap gap-2">
                          {project.categories.map((category) => (
                            <span
                              key={category}
                              className="px-2.5 py-1 rounded-full bg-white/15 backdrop-blur-sm text-white text-xs font-mono"
                            >
                              {category}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                        <ArrowUpRight size={16} className="text-white" />
                      </div>
                    </div>

                    <div className="p-5 sm:p-6 bg-quattro-surface-dark">
                      <h3 className="font-display font-bold text-white text-lg sm:text-xl mb-2 group-hover:text-quattro-accent transition-colors">
                        {project.title}
                      </h3>
                      <p className="font-body text-quattro-text-secondary text-sm leading-relaxed">
                        {project.description}
                      </p>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
