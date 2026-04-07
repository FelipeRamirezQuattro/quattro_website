import type { Metadata } from "next";
import { Layers } from "lucide-react";
import { services } from "@/data/services";
import ServicePageContent from "@/components/sections/ServicePageContent";

const service = services.find((s) => s.slug === "microsoft-power-apps")!;

export const metadata: Metadata = {
  title: "Microsoft Power Apps — Quattro Software",
  description: service.description,
};

export default function MicrosoftPowerAppsPage() {
  return (
    <ServicePageContent
      service={service}
      Icon={Layers}
      source="service-microsoft-power-apps"
    />
  );
}
