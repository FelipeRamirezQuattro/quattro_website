import type { NavItem } from "@/types";

export const navItems: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  {
    label: "Services",
    href: "/services",
    children: [
      {
        label: "AI Solutions",
        href: "/services/ai-solutions",
        description: "Agents, automation, and AI data pipelines",
      },
      {
        label: "Custom Applications",
        href: "/services/custom-applications",
        description: "Tailored apps built for your workflow",
      },
      {
        label: "Website Development",
        href: "/services/website-development",
        description: "Modern, conversion-focused websites",
      },
      {
        label: "QuickBooks Integration",
        href: "/services/quickbooks",
        description: "Seamless financial data sync",
      },
      {
        label: "Microsoft Power Apps",
        href: "/microsoft-power-apps",
        description: "Extend your Microsoft 365 ecosystem",
      },
      {
        label: "Staffing Solutions",
        href: "/it-technical-support",
        description: "Vetted technical talent on demand",
      },
    ],
  },
  { label: "How We Work", href: "/how-we-work" },
  { label: "Showcase", href: "/showcase" },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];
