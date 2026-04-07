import type { Metadata } from "next";
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
    visualLabel: "Agent Console Placeholder",
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
    visualLabel: "Workflow Map Placeholder",
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
    visualLabel: "Data Layer Placeholder",
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
    visualLabel: "Integration Hub Placeholder",
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
    visualLabel: "Cloud Stack Placeholder",
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
    visualLabel: "Roadmap Blueprint Placeholder",
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
              ({ title, description, bullets, Icon, visualLabel }) => (
                <AnimatedItem key={title}>
                  <article className="h-full rounded-2xl border border-quattro-border-dark bg-quattro-surface-dark overflow-hidden">
                    <div className="p-5 sm:p-6 border-b border-quattro-border-dark bg-gradient-to-r from-quattro-primary/20 to-quattro-accent/10">
                      <div className="flex items-center justify-between gap-3 mb-3">
                        <div className="w-11 h-11 rounded-xl bg-quattro-primary/20 border border-quattro-primary/40 flex items-center justify-center">
                          <Icon size={20} className="text-quattro-accent" />
                        </div>
                        <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-quattro-text-secondary">
                          Placeholder Visual
                        </span>
                      </div>
                      <div className="h-28 rounded-xl border border-quattro-primary/30 bg-[radial-gradient(circle_at_20%_20%,rgba(56,189,248,0.25),transparent_60%),radial-gradient(circle_at_80%_80%,rgba(23,84,154,0.3),transparent_55%),rgba(8,15,30,0.5)] flex items-end p-3">
                        <span className="font-body text-xs text-quattro-text-secondary">
                          {visualLabel}
                        </span>
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
