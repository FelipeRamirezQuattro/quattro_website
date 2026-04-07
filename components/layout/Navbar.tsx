"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect, useRef } from "react";
import { ChevronDown, Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { navItems } from "@/data/nav";

export default function Navbar() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  // Close dropdown on Escape
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenDropdown(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <nav
        className={`sticky top-0 z-50 transition-all duration-300 ${
          scrolled
            ? "border-b border-quattro-border-dark shadow-[0_4px_30px_rgba(0,0,0,0.4)]"
            : ""
        }`}
        style={{
          background: "rgba(8,15,30,0.92)",
          backdropFilter: "blur(12px)",
          WebkitBackdropFilter: "blur(12px)",
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-1 shrink-0">
              <span className="font-display font-bold text-xl text-white tracking-tight">
                QUATTRO
              </span>
              <span className="font-body font-light text-sm text-quattro-text-secondary mt-0.5 tracking-widest uppercase">
                SOFTWARE
              </span>
            </Link>

            {/* Desktop nav */}
            <div
              ref={dropdownRef}
              className="hidden md:flex items-center gap-1"
            >
              {navItems.map((item) => (
                <div key={item.href} className="relative">
                  {item.children ? (
                    <>
                      <button
                        onClick={() =>
                          setOpenDropdown(
                            openDropdown === item.label ? null : item.label,
                          )
                        }
                        className={`flex items-center gap-1 px-3 py-2 text-sm font-body transition-colors rounded-md ${
                          isActive(item.href)
                            ? "text-quattro-accent"
                            : "text-quattro-text-secondary hover:text-white"
                        }`}
                      >
                        {item.label}
                        <ChevronDown
                          size={14}
                          className={`transition-transform ${
                            openDropdown === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>

                      <AnimatePresence>
                        {openDropdown === item.label && (
                          <motion.div
                            initial={{ opacity: 0, y: -8, scale: 0.97 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: -8, scale: 0.97 }}
                            transition={{ duration: 0.18 }}
                            className="absolute top-full left-0 mt-1 w-72 rounded-xl overflow-hidden shadow-2xl"
                            style={{
                              background: "rgba(12,22,45,0.97)",
                              backdropFilter: "blur(16px)",
                              border: "1px solid rgba(23,84,154,0.3)",
                            }}
                          >
                            {item.children.map((child, i) => (
                              <motion.div
                                key={child.href}
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: i * 0.05 }}
                              >
                                <Link
                                  href={child.href}
                                  className="block px-4 py-3 hover:bg-quattro-primary/20 transition-colors group"
                                >
                                  <div className="text-sm font-body font-medium text-white group-hover:text-quattro-accent transition-colors">
                                    {child.label}
                                  </div>
                                  {child.description && (
                                    <div className="text-xs text-quattro-text-secondary mt-0.5">
                                      {child.description}
                                    </div>
                                  )}
                                </Link>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      href={item.href}
                      className={`relative px-3 py-2 text-sm font-body transition-colors rounded-md ${
                        isActive(item.href)
                          ? "text-quattro-accent"
                          : "text-quattro-text-secondary hover:text-white"
                      }`}
                    >
                      {item.label}
                      {isActive(item.href) && (
                        <motion.div
                          layoutId="nav-underline"
                          className="absolute bottom-0 left-3 right-3 h-0.5 bg-quattro-accent rounded-full"
                        />
                      )}
                    </Link>
                  )}
                </div>
              ))}

              <Link
                href="/contact"
                className="ml-2 px-4 py-2 text-sm font-body font-medium bg-quattro-primary hover:bg-quattro-primary-light text-white rounded-lg transition-colors"
              >
                Get Started
              </Link>
            </div>

            {/* Mobile toggle */}
            <button
              className="md:hidden text-quattro-text-secondary hover:text-white transition-colors p-2"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-40 md:hidden flex flex-col"
            style={{
              background: "rgba(8,15,30,0.98)",
              backdropFilter: "blur(20px)",
            }}
          >
            {/* Close button */}
            <div className="flex justify-end p-6">
              <button
                onClick={() => setMobileOpen(false)}
                className="text-quattro-text-secondary hover:text-white p-2"
                aria-label="Close menu"
              >
                <X size={26} />
              </button>
            </div>

            {/* Links */}
            <nav className="flex flex-col items-center justify-center flex-1 gap-2 px-8">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                  className="w-full text-center"
                >
                  {item.children ? (
                    <div className="mb-2">
                      <div className="text-2xl font-display font-bold text-white mb-2">
                        {item.label}
                      </div>
                      <div className="flex flex-col gap-1">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="text-sm text-quattro-text-secondary hover:text-quattro-accent transition-colors py-1"
                          >
                            {child.label}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link
                      href={item.href}
                      className={`block text-2xl font-display font-bold py-2 transition-colors ${
                        isActive(item.href)
                          ? "text-quattro-accent"
                          : "text-white hover:text-quattro-accent"
                      }`}
                    >
                      {item.label}
                    </Link>
                  )}
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: navItems.length * 0.05 + 0.1 }}
                className="mt-6"
              >
                <Link
                  href="/contact"
                  className="inline-block px-8 py-3 bg-quattro-primary hover:bg-quattro-primary-light text-white font-display font-bold text-lg rounded-xl transition-colors"
                >
                  Get Started →
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
