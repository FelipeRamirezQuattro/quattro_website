import type { Metadata } from "next";
import { Settings2 } from "lucide-react";
import ServicePageContent from "@/components/sections/ServicePageContent";
import { services } from "@/data/services";

const service = services.find((s) => s.slug === "software-solutions")!;

export const metadata: Metadata = {
  title: "Business Software Solutions & Implementation",
  description: service.description,
};

export default function SoftwareSolutionsPage() {
  return (
    <ServicePageContent
      service={service}
      Icon={Settings2}
      source="software-solutions-cta"
    />
  );
}
