import AnimatedSection from "@/components/ui/AnimatedSection";
import LeadCaptureForm from "@/components/sections/LeadCaptureForm";

interface CTABannerProps {
  source?: string;
}

export default function CTABanner({ source = "cta" }: CTABannerProps) {
  return (
    <section className="py-16 sm:py-20 relative overflow-hidden">
      {/* Gradient background */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgb(14,55,105) 0%, rgb(23,84,154) 50%, rgb(41,112,196) 100%)",
          backgroundSize: "300% 300%",
        }}
      />

      {/* Animated border glow */}
      <div className="absolute inset-x-0 top-0 h-px shimmer-border" />
      <div className="absolute inset-x-0 bottom-0 h-px shimmer-border" />

      {/* Grid overlay */}
      <div className="absolute inset-0 grid-overlay opacity-20 pointer-events-none" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <AnimatedSection>
          <p className="font-mono text-quattro-accent text-sm tracking-widest uppercase mb-3">
            Let&#39;s Build Together
          </p>
          <h2 className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl text-white mb-3 sm:mb-4">
            Have a project you&#39;d like to talk about?
          </h2>
          <p className="font-body text-base sm:text-lg text-white/70 mb-8 sm:mb-10 max-w-xl mx-auto">
            Tell us about it — free consultation, no commitment.
          </p>

          <div
            className="max-w-2xl mx-auto p-6 sm:p-8 rounded-2xl"
            style={{
              background: "rgba(8,15,30,0.5)",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            <LeadCaptureForm source={source} dark />
          </div>
        </AnimatedSection>
      </div>
    </section>
  );
}
