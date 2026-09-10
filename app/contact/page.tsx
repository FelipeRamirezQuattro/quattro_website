import type { Metadata } from "next";
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  Users,
  PlayCircle,
} from "lucide-react";
import ContactForm from "@/components/sections/ContactForm";
import AnimatedSection, { AnimatedItem } from "@/components/ui/AnimatedSection";

export const metadata: Metadata = {
  title: "Contact Us — Quattro Software",
  description:
    "Get in touch with Quattro Software for AI solutions, custom software development, website design, QuickBooks integrations, Microsoft Power Apps, and staffing solutions.",
};

const contactItems = [
  {
    icon: Phone,
    label: "Phone",
    value: "(432) 363-4009",
    href: "tel:+14323634009",
  },
  {
    icon: Mail,
    label: "Email",
    value: "info@quattroapps.com",
    href: "mailto:info@quattroapps.com",
  },
  { icon: MapPin, label: "Location", value: "United States", href: "#" },
];

const socialLinks = [
  {
    icon: MessageCircle,
    label: "Facebook",
    href: "https://www.facebook.com/quattroapps",
  },
  {
    icon: Users,
    label: "LinkedIn",
    href: "https://www.linkedin.com/company/quattro-apps/",
  },
  {
    icon: PlayCircle,
    label: "YouTube",
    href: "https://www.youtube.com/@QuattroSoftware",
  },
];

export default function ContactPage() {
  return (
    <section className="py-16 sm:py-20 bg-quattro-surface-light">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 overflow-hidden rounded-3xl border border-quattro-border-light shadow-xl bg-white">
          {/* Left panel */}
          <div className="relative p-6 sm:p-10 lg:p-12 bg-quattro-surface-dark text-white">
            <div className="absolute inset-0 gradient-mesh opacity-20 pointer-events-none" />
            <div className="absolute inset-0 grid-overlay opacity-10 pointer-events-none" />

            <div className="relative">
              <AnimatedSection>
                <AnimatedItem>
                  <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
                    Contact
                  </p>
                </AnimatedItem>
                <AnimatedItem>
                  <h1 className="font-display font-bold text-2xl sm:text-4xl mb-3 sm:mb-4">
                    Let&#39;s Build Something Great
                  </h1>
                </AnimatedItem>
                <AnimatedItem>
                  <p className="font-body text-sm sm:text-base text-quattro-text-secondary mb-8 sm:mb-10 max-w-md">
                    Share your goals and challenges with us. We will help you
                    map a practical path from concept to launch.
                  </p>
                </AnimatedItem>
              </AnimatedSection>

              <div className="space-y-5 mb-10">
                {contactItems.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex items-start gap-4 group"
                  >
                    <div
                      className="w-10 h-10 rounded-xl bg-quattro-primary/20 border border-quattro-primary/30
                                    flex items-center justify-center group-hover:bg-quattro-primary/30 transition-colors"
                    >
                      <item.icon size={18} className="text-quattro-accent" />
                    </div>
                    <div>
                      <p className="font-mono text-xs uppercase tracking-wide text-quattro-text-secondary">
                        {item.label}
                      </p>
                      <p className="font-body text-white">{item.value}</p>
                    </div>
                  </a>
                ))}
              </div>

              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="w-10 h-10 rounded-full border border-quattro-border-dark bg-quattro-surface-mid
                               hover:border-quattro-accent hover:text-quattro-accent flex items-center justify-center transition-colors"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Right panel */}
          <div className="p-6 sm:p-10 lg:p-12 bg-quattro-surface-light">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
