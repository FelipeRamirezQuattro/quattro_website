import type { Metadata } from "next";
import { Briefcase, CheckCircle2 } from "lucide-react";
import CareerApplyForm from "@/components/sections/CareerApplyForm";
import CTABanner from "@/components/sections/CTABanner";

export const metadata: Metadata = {
  title: "Work With Us — Quattro Software",
  description:
    "Explore career opportunities at Quattro Software and join a team focused on integrity, craftsmanship, and real client impact.",
};

const positions = [
  {
    title: "Senior Full Stack Developer",
    type: "Full-time",
    location: "Remote / Hybrid",
    points: [
      "TypeScript and Node.js proficiency",
      "Experience building scalable web apps",
      "Strong communication and ownership",
    ],
  },
  {
    title: "QA Analyst",
    type: "Full-time",
    location: "Remote",
    points: [
      "Manual and automation testing",
      "Test case design and regression planning",
      "Attention to detail and process discipline",
    ],
  },
  {
    title: "UI/UX Designer",
    type: "Contract / Full-time",
    location: "Remote",
    points: [
      "Modern web interface design",
      "Design systems and interaction thinking",
      "Collaboration with dev and product teams",
    ],
  },
  {
    title: "Sales Specialist",
    type: "Full-time",
    location: "Hybrid",
    points: [
      "B2B software sales experience",
      "Strong discovery and consultative skills",
      "Comfort with CRM and pipeline management",
    ],
  },
];

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
            {positions.map((position) => (
              <article
                key={position.title}
                className="rounded-2xl border border-quattro-border-dark bg-quattro-surface-dark p-5 sm:p-6"
              >
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <h2 className="font-display text-xl sm:text-2xl text-white font-bold">
                      {position.title}
                    </h2>
                    <p className="font-mono text-xs text-quattro-accent uppercase tracking-wide mt-1">
                      {position.type} · {position.location}
                    </p>
                  </div>
                  <div className="w-10 h-10 rounded-xl border border-quattro-primary/40 bg-quattro-primary/20 flex items-center justify-center">
                    <Briefcase size={18} className="text-quattro-accent" />
                  </div>
                </div>
                <ul className="space-y-2">
                  {position.points.map((point) => (
                    <li
                      key={point}
                      className="flex items-start gap-2 text-quattro-text-secondary text-sm"
                    >
                      <CheckCircle2
                        size={16}
                        className="text-quattro-accent shrink-0 mt-0.5"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            ))}

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
