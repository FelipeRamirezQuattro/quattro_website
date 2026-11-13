import Link from "next/link";
import {
  Phone,
  MessageCircle,
  PlayCircle,
  Users,
  ExternalLink,
} from "lucide-react";

export default function TopBar() {
  return (
    <div
      className="hidden md:flex items-center justify-between px-6 py-2 text-xs tracking-widest uppercase bg-pfs-surface-mid border-b border-pfs-border-dark"
      style={{ fontFamily: "var(--font-dm-sans)" }}
    >
      {/* Left — contact + socials */}
      <div className="flex items-center gap-4 text-pfs-text-secondary">
        <a
          href="tel:+14323634009"
          className="flex items-center gap-1.5 hover:text-pfs-accent transition-colors"
        >
          <Phone size={12} />
          <span>(432) 363-4009</span>
        </a>

        <span className="opacity-30">|</span>

        <div className="flex items-center gap-2">
          <a
            href="https://www.facebook.com/quattroapps"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Facebook"
            className="hover:text-pfs-accent transition-colors"
          >
            <MessageCircle size={13} />
          </a>
          <a
            href="https://www.youtube.com/@QuattroSoftware"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
            className="hover:text-pfs-accent transition-colors"
          >
            <PlayCircle size={13} />
          </a>
          <a
            href="https://www.linkedin.com/company/quattro-apps/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="hover:text-pfs-accent transition-colors"
          >
            <Users size={13} />
          </a>
        </div>
      </div>

      {/* Right — CTAs */}
      <div className="flex items-center gap-3">
        <a
          href="https://support.quattroapps.app/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1 px-3 py-1 rounded-full border border-pfs-border-dark text-pfs-text-secondary hover:border-pfs-accent hover:text-pfs-accent transition-all"
        >
          Support <ExternalLink size={10} />
        </a>
        <Link
          href="/contact"
          className="flex items-center gap-1 px-3 py-1 rounded-full bg-pfs-primary text-white hover:bg-pfs-primary-light transition-colors"
        >
          Free Consultation →
        </Link>
      </div>
    </div>
  );
}
