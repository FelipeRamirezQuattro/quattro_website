import type { Metadata } from "next";
import { Globe } from "lucide-react";
import ServicePageContent from "@/components/sections/ServicePageContent";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Modern Website Design — Quattro Software",
  description:
    "Cutting-edge web development solutions. Whether launching a new project or enhancing your existing site, we bring your vision to life with mobile-first, conversion-focused design.",
};

export default function WebsiteDevelopmentPage() {
  const service = services.find((s) => s.slug === "website-development")!;
  return (
    <ServicePageContent
      service={service}
      Icon={Globe}
      source="website-development-cta"
    />
  );
}
