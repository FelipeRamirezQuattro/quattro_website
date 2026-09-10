import type { Metadata } from "next";
import { Users } from "lucide-react";
import CareerApplyForm from "@/components/sections/CareerApplyForm";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Work With Us — Quattro Software",
  description:
    "Explore career opportunities at Quattro Software and join a team focused on integrity, craftsmanship, and real client impact.",
};

const cultureValues = [
  "Integrity in every interaction",
  "Family-like culture that values people first",
  "Reliable delivery and accountability",
  "Compassionate communication with clients and team members",
];

export default function WorkWithUsPage() {
  return (
    <>
      <section className="relative py-20 sm:py-24 lg:py-28 bg-quattro-surface-dark overflow-hidden">
        <div className="absolute inset-0 gradient-mesh opacity-25 pointer-events-none" />
        <div className="absolute inset-0 grid-overlay opacity-15 pointer-events-none" />

        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-4">
            Careers
          </p>
          <h1 className="font-display text-white text-3xl sm:text-5xl lg:text-6xl font-bold mb-5 sm:mb-6">
            Work With <span className="gradient-text">Quattro</span>
          </h1>
          <p className="font-body text-base sm:text-lg text-quattro-text-secondary max-w-2xl">
            Join a team that values craftsmanship, communication, and long-term
            partnerships.
          </p>
        </div>
      </section>

      <section className="py-16 sm:py-20 bg-quattro-surface-mid">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-[1fr_380px] gap-8">
          <div className="space-y-5">
            <article className="rounded-2xl border border-quattro-border-dark bg-quattro-surface-dark p-5 sm:p-6">
              <div className="flex items-start gap-4 mb-4">
                <div className="w-10 h-10 rounded-xl border border-quattro-primary/40 bg-quattro-primary/20 flex items-center justify-center shrink-0">
                  <Users size={18} className="text-quattro-accent" />
                </div>
                <h2 className="font-display text-xl sm:text-2xl text-white font-bold">
                  We&#39;re Always Looking for Great People
                </h2>
              </div>
              <p className="text-quattro-text-secondary text-sm leading-relaxed">
                We don&#39;t have specific openings posted right now, but
                we&#39;re always interested in connecting with talented
                developers, QA specialists, designers, and other
                professionals who share our values. Tell us about yourself
                below and we&#39;ll reach out if there&#39;s a fit.
              </p>
            </article>

            <div className="rounded-2xl border border-quattro-border-dark bg-quattro-surface-dark p-5 sm:p-6">
              <h3 className="font-display text-white text-xl font-bold mb-3">
                Our Culture
              </h3>
              <ul className="space-y-2">
                {cultureValues.map((value) => (
                  <li
                    key={value}
                    className="text-sm text-quattro-text-secondary"
                  >
                    • {value}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <CareerApplyForm />
          </div>
        </div>
      </section>

      <CTABanner source="careers-cta" />
    </>
  );
}
