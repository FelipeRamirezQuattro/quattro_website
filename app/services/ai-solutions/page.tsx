import type { Metadata } from "next";
import Image from "next/image";
import {
  Bot,
  Workflow,
  DatabaseZap,
  PlugZap,
  CloudCog,
  SearchCheck,
  CheckCircle2,
} from "lucide-react";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "AI Solutions & Automation — Quattro Software",
  description:
    "AI agent development, process automation, data integration, API development, cloud infrastructure, and automation consulting tailored to your operations.",
};

const aiTracks = [
  {
    title: "AI Agent Development",
    Icon: Bot,
    description:
      "Purpose-built AI agents that automate information-heavy work across operations, compliance, and field reporting.",
    bullets: [
      "Document processing agents",
      "Compliance and HSE reporting agents",
      "Form automation for permits, AFEs, and inspections",
      "Data extraction from unstructured sources (PDFs, emails, field reports)",
    ],
    image: "/services/ai-solutions/ai-agent.jpg",
  },
  {
    title: "Process Automation",
    Icon: Workflow,
    description:
      "Operational workflows redesigned for speed, consistency, and reduced manual effort across back-office and field teams.",
    bullets: [
      "Back-office workflow automation",
      "Field operations reporting automation",
      "Data entry elimination for high-volume forms",
      "Document generation from structured data",
    ],
    image: "/services/ai-solutions/process-automation.jpg",
  },
  {
    title: "AI-Powered Data Integration",
    Icon: DatabaseZap,
    description:
      "Unified data foundations that connect fragmented systems and feed reliable, real-time context into AI-enabled workflows.",
    bullets: [
      "Centralizing dispersed databases into unified data layers",
      "Connecting ERP and operational systems with AI models",
      "Real-time operational data pipelines",
      "Legacy system integration with modern AI",
    ],
    image: "/services/ai-solutions/data-integration.jpg",
  },
  {
    title: "System Integrations & API Development",
    Icon: PlugZap,
    description:
      "Integration architecture that keeps business systems synchronized through robust APIs, webhooks, and event-driven flows.",
    bullets: [
      "ERP integrations (SAP, Oracle, QuickBooks, industry-specific platforms)",
      "REST API design and development",
      "Third-party tool connections",
      "Webhook and event-driven automation",
    ],
    image: "/services/ai-solutions/api-integration.jpg",
  },
  {
    title: "Cloud Infrastructure for AI Applications",
    Icon: CloudCog,
    description:
      "Cloud environments optimized for AI workloads with reliability, scaling, and delivery practices built in from day one.",
    bullets: [
      "AI application deployment on AWS",
      "Scalable cloud architecture for O&G data workloads",
      "DevOps and CI/CD pipelines",
    ],
    image: "/services/ai-solutions/cloud-infrastructure.jpg",
  },
  {
    title: "AI Automation Consulting",
    Icon: SearchCheck,
    description:
      "Practical strategy and implementation planning to prioritize the right automation opportunities for measurable impact.",
    bullets: [
      "Process audits and automation opportunity mapping",
      "AI readiness assessments",
      "Automation roadmap design",
      "Technology selection and vendor evaluation",
    ],
    image: "/services/ai-solutions/consulting.jpg",
  },
];

export default function AISolutionsPage() {
  return (
    <>
      <section className="relative py-20 sm:py-24 lg:py-32 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-30 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <AnimatedSection>
            <AnimatedItem>
              <p className="font-mono text-quattro-accent text-xs sm:text-sm tracking-widest uppercase mb-3">
                New Service Category
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h1 className="font-display font-bold text-3xl sm:text-5xl lg:text-6xl text-white leading-tight mb-4 sm:mb-6">
                AI Solutions & Automation
              </h1>
            </AnimatedItem>
            <AnimatedItem>
              <p className="font-body text-base sm:text-xl text-quattro-text-secondary max-w-3xl">
                We help operations-heavy teams design and deploy AI systems that
                automate workflows, integrate legacy and modern platforms, and
                turn scattered data into reliable decision support.
              </p>
            </AnimatedItem>
          </AnimatedSection>
        </div>
      </section>

      <section className="py-16 sm:py-20 lg:py-24 bg-quattro-surface-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-10 sm:mb-14">
            <AnimatedItem>
              <p className="font-mono text-quattro-primary text-xs sm:text-sm tracking-widest uppercase mb-3">
                Capabilities
              </p>
            </AnimatedItem>
            <AnimatedItem>
              <h2 className="font-display font-bold text-2xl sm:text-4xl text-white">
                End-to-End AI Delivery Tracks
              </h2>
            </AnimatedItem>
          </AnimatedSection>

          <AnimatedSection
            stagger
            className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6"
          >
            {aiTracks.map(
              ({ title, description, bullets, Icon, image }) => (
                <AnimatedItem key={title}>
                  <article className="h-full rounded-2xl border border-quattro-border-dark bg-quattro-surface-dark overflow-hidden">
                    <div className="border-b border-quattro-border-dark bg-gradient-to-r from-quattro-primary/20 to-quattro-accent/10">
                      <div className="relative h-40 w-full">
                        <Image
                          src={image}
                          alt={title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute inset-0 bg-quattro-surface-dark/30" />
                        <div className="absolute bottom-3 left-3 w-10 h-10 rounded-xl bg-quattro-primary/80 border border-quattro-primary/60 flex items-center justify-center backdrop-blur-sm">
                          <Icon size={18} className="text-white" />
                        </div>
                      </div>
                    </div>

                    <div className="p-5 sm:p-6">
                      <h3 className="font-display font-bold text-lg sm:text-xl text-white mb-3">
                        {title}
                      </h3>
                      <p className="font-body text-sm text-quattro-text-secondary leading-relaxed mb-4">
                        {description}
                      </p>

                      <ul className="space-y-2">
                        {bullets.map((item) => (
                          <li
                            key={item}
                            className="flex items-start gap-2.5 font-body text-sm text-quattro-text-secondary"
                          >
                            <CheckCircle2
                              size={16}
                              className="text-quattro-accent shrink-0 mt-0.5"
                            />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </article>
                </AnimatedItem>
              ),
            )}
          </AnimatedSection>
        </div>
      </section>

      <CTABanner source="ai-solutions-cta" />
    </>
  );
}
