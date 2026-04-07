// ── Core domain types ───────────────────────────────────────────────────────

export interface Lead {
  id?: string;
  created_at?: string;
  name: string;
  email: string;
  phone?: string;
  company?: string;
  service?: string;
  message: string;
  source?: string;
  status?: string;
}

export interface BlogPost {
  id: string;
  created_at: string;
  updated_at: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  cover_image?: string;
  category?: string;
  tags?: string[];
  author: string;
  published: boolean;
  published_at?: string;
}

export interface NewsletterSubscriber {
  id?: string;
  email: string;
  name?: string;
  status?: string;
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
}

export interface Service {
  title: string;
  slug: string;
  icon: string;
  description: string;
  features: string[];
  href: string;
}

export interface Project {
  title: string;
  slug: string;
  categories: string[];
  description?: string;
  imageUrl?: string;
  gradient: string;
}

export interface ProcessStep {
  number: number;
  title: string;
  icon: string;
  bullets: string[];
}

export interface Value {
  title: string;
  icon: string;
  description: string;
}

export interface Stat {
  value: number;
  suffix: string;
  label: string;
  icon: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}
