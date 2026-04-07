"use client";

import { Handshake, DollarSign, Zap, Shield } from "lucide-react";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";

const features = [
  {
    Icon: Handshake,
    title: "Strong, Authentic Partnerships",
    body: "Stay informed at every step. We believe in transparent communication to build trust and foster healthy partnerships. Our support team will be with you before, during, and after our services.",
    color: "#17549A",
  },
  {
    Icon: DollarSign,
    title: "Cost-Effective",
    body: "We offer competitive pricing models that provide excellent value for your investment. Never worry about hidden costs — full transparency always.",
    color: "#22C55E",
  },
  {
    Icon: Zap,
    title: "Innovative & Scalable",
    body: "Whether you're a startup or an enterprise, our team delivers scalable solutions for your evolving needs. We research modern technologies to create unique solutions.",
    color: "#38BDF8",
  },
  {
    Icon: Shield,
    title: "Secure by Default",
    body: "Our apps are protected by firewalls, tokens, and unique session IDs. We use modern encryption methods to protect personal data at every layer.",
    color: "#2970C4",
  },
];

export default function WhyChooseUs() {
  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10 sm:mb-14">
          <p className="font-mono text-quattro-primary text-sm tracking-widest uppercase mb-3">
            Our Promise
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-quattro-text-dark">
            Why Choose Us?
          </h2>
        </AnimatedSection>

        <AnimatedSection
          stagger
          className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6"
        >
          {features.map(({ Icon, title, body, color }) => (
            <AnimatedItem key={title}>
              <div className="flex gap-4 sm:gap-5 p-6 sm:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                {/* Left color bar + icon */}
                <div className="flex flex-col items-center">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
                    style={{
                      background: `${color}18`,
                      border: `1px solid ${color}30`,
                    }}
                  >
                    <Icon size={22} color={color} />
                  </div>
                  <div
                    className="w-0.5 flex-1 mt-3"
                    style={{ background: `${color}30` }}
                  />
                </div>

                <div>
                  <h3 className="font-display font-bold text-lg text-quattro-text-dark mb-2">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-gray-500 leading-relaxed">
                    {body}
                  </p>
                </div>
              </div>
            </AnimatedItem>
          ))}
        </AnimatedSection>
      </div>
    </section>
  );
}
