import type { Metadata } from "next";
import { BarChart3 } from "lucide-react";
import ServicePageContent from "@/components/sections/ServicePageContent";
import { services } from "@/data/services";

export const metadata: Metadata = {
  title: "QuickBooks Integration Apps — Quattro Software",
  description:
    "Leaders in QuickBooks integration development, testing, and support. We build tools that integrate financial management with QuickBooks to streamline your workflows.",
};

export default function QuickBooksPage() {
  const service = services.find((s) => s.slug === "quickbooks")!;
  return (
    <ServicePageContent
      service={service}
      Icon={BarChart3}
      source="quickbooks-cta"
    />
  );
}
