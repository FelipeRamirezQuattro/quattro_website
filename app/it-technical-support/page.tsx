import type { Metadata } from "next";
import { Users } from "lucide-react";
import { services } from "@/data/services";
import ServicePageContent from "@/components/sections/ServicePageContent";

const service = services.find((s) => s.slug === "it-technical-support")!;

export const metadata: Metadata = {
  title: "Staffing Solutions — Quattro Software",
  description: service.description,
};

export default function ITTechnicalSupportPage() {
  return (
    <ServicePageContent
      service={service}
      Icon={Users}
      source="service-it-technical-support"
    />
  );
}
