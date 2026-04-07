import type { Metadata } from "next";
import { Code2 } from "lucide-react";
import ServicePageContent from "@/components/sections/ServicePageContent";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "Custom Application Development — Quattro Software",
  description:
    "We create custom apps from the ground up, tailored to your processes, goals, and specific needs. Greater flexibility, scalability, and seamless integration.",
};

export default function CustomApplicationsPage() {
  const service = services.find((s) => s.slug === "custom-applications")!;
  return (
    <ServicePageContent
      service={service}
      Icon={Code2}
      source="custom-applications-cta"
    />
  );
}
