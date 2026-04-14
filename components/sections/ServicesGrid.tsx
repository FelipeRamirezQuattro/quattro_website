"use client";

import Link from "next/link";
import Image from "next/image";
import { Code2, Monitor, BarChart3, Bot, ArrowRight } from "lucide-react";
import TiltCard from "@/components/ui/TiltCard";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";

const cards = [
  {
    Icon: Bot,
    title: "AI Solutions & Automation",
    body: "Deploy practical AI across your operations with agents, workflow automation, real-time data pipelines, and consulting that maps opportunity to execution.",
    cta: "Explore AI Services",
    href: "/services/ai-solutions",
    glow: "rgba(14,165,233,0.32)",
    image: "/services/ai-solutions.jpg",
  },
  {
    Icon: Code2,
    title: "Application Development",
    body: "Technology is amazing, but sometimes you need help getting everything to work together. That's where we come in to design an app built to solve your specific challenges.",
    cta: "View Solutions",
    href: "/services/custom-applications",
    glow: "rgba(23,84,154,0.3)",
    image: "/services/custom-applications.jpg",
  },
  {
    Icon: Monitor,
    title: "Modern Website Design",
    body: "Nowadays, more and more people are on the internet. Let's work together to share your company's story in a website that stands apart.",
    cta: "See Designs",
    href: "/services/website-development",
    glow: "rgba(56,189,248,0.2)",
    image: "/services/website-development.jpg",
  },
  {
    Icon: BarChart3,
    title: "QuickBooks Integrations",
    body: "Using QuickBooks but need an extra function? Let us create the app and integrate straight into QuickBooks for you to improve your business' success.",
    cta: "View Specifics",
    href: "/services/quickbooks",
    glow: "rgba(41,112,196,0.3)",
    image: "/services/quickbooks.jpg",
  },
];

export default function ServicesGrid() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <p className="font-mono text-quattro-primary text-sm tracking-widest uppercase mb-3">
            What We Do
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-quattro-text-dark mb-3 sm:mb-4">
            Our Custom Technology Solutions
          </h2>
          <p className="font-body text-base sm:text-lg text-gray-500 max-w-2xl mx-auto">
            From custom apps to QuickBooks integrations — we build what your
            business actually needs.
          </p>
        </AnimatedSection>

        <AnimatedSection
          stagger
          className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 sm:gap-6"
        >
          {cards.map(({ Icon, title, body, cta, href, glow, image }) => (
            <AnimatedItem key={title}>
              <TiltCard className="h-full">
                <div
                  className="h-full flex flex-col bg-quattro-surface-mid rounded-2xl border border-quattro-border-dark card-glow transition-all duration-300 group overflow-hidden"
                  style={{ boxShadow: `0 4px 30px rgba(0,0,0,0.3)` }}
                >
                  {/* Image */}
                  <div className="relative h-40 w-full shrink-0">
                    <Image
                      src={image}
                      alt={title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-quattro-surface-mid/80" />
                    <div
                      className="absolute bottom-3 left-4 w-10 h-10 rounded-xl flex items-center justify-center"
                      style={{
                        background: `linear-gradient(135deg, ${glow}, rgba(12,22,45,0.9))`,
                        border: `1px solid ${glow}`,
                      }}
                    >
                      <Icon size={20} color="rgb(56,189,248)" />
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6 sm:p-7">

                  <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">
                    {title}
                  </h3>
                  <p className="font-body text-quattro-text-secondary text-sm leading-relaxed flex-1 mb-6">
                    {body}
                  </p>

                  <Link
                    href={href}
                    className="inline-flex items-center gap-1.5 text-quattro-accent text-sm font-body font-medium hover:gap-3 transition-all duration-200 group/link"
                  >
                    {cta}{" "}
                    <ArrowRight
                      size={14}
                      className="transition-transform group-hover/link:translate-x-1"
                    />
                  </Link>
                  </div>
                </div>
              </TiltCard>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
