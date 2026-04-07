import HeroSection from "@/components/sections/HeroSection";
import WorkflowDiagram from "@/components/sections/WorkflowDiagram";
import ServicesGrid from "@/components/sections/ServicesGrid";
import WhyChooseUs from "@/components/sections/WhyChooseUs";
import CTABanner from "@/components/sections/CTABanner";
import TestimonialsCarousel from "@/components/sections/TestimonialsCarousel";
import BlogTeaser from "@/components/sections/BlogTeaser";

export default function Page() {
  return (
    <>
      <HeroSection />
      <ServicesGrid />
      <WhyChooseUs />
      <WorkflowDiagram />
      <TestimonialsCarousel />
      <BlogTeaser />
      <CTABanner />
    </>
  );
}
