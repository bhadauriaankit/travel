"use client";

import { useState, useEffect } from "react";
import { motion, useScroll, useSpring, AnimatePresence } from "framer-motion";
import { FaInstagram, FaYoutube, FaLinkedin, FaBars, FaTimes } from "react-icons/fa";
import { navLinks, socialLinks, siteConfig } from "@/lib/data";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Section observer for active state
  useEffect(() => {
    const sectionIds = ["hero", ...navLinks.map((link) => link.id)];
    const elements = sectionIds
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { threshold: 0.25, rootMargin: "-80px 0px -40% 0px" }
    );

    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    const targetElement = document.getElementById(targetId);
    if (!targetElement) return;

    if (window.__lenis) {
      window.__lenis.scrollTo(targetElement, { offset: -70 });
    } else {
      const top = targetElement.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top, behavior: "smooth" });
    }
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled
            ? "bg-[#0B0B0F]/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-2xl shadow-black/50"
            : "bg-transparent py-5 sm:py-6"
        }`}
      >
        {/* Scroll Progress Indicator */}
        <motion.div
          className="absolute top-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-amber-500 via-orange-400 to-amber-300 origin-left"
          style={{ scaleX }}
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#hero"
            onClick={(e) => handleNavClick(e, "hero")}
            className="flex items-center gap-2.5 group cursor-pointer"
          >
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-black font-bold font-serif text-sm shadow-md shadow-amber-500/20 group-hover:scale-105 transition-transform">
              AE
            </div>
            <span className="font-serif text-lg sm:text-xl font-bold tracking-tight text-stone-100 group-hover:text-amber-400 transition-colors">
              {siteConfig.name}
            </span>
          </a>

          {/* Desktop Nav Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden lg:flex items-center gap-1 xl:gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md"
          >
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              return (
                <a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  className={`relative px-3.5 py-1.5 text-xs font-medium tracking-wide transition-colors rounded-full cursor-pointer ${
                    isActive ? "text-amber-400 font-semibold" : "text-stone-300 hover:text-white"
                  }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.div
                      layoutId="activeNavIndicator"
                      className="absolute inset-0 bg-amber-500/10 border border-amber-500/30 rounded-full -z-10"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                </a>
              );
            })}
          </nav>

          {/* Desktop Social Links */}
          <div className="hidden sm:flex items-center gap-3">
            {socialLinks.map((social) => {
              const Icon =
                social.name === "Instagram"
                  ? FaInstagram
                  : social.name === "YouTube"
                  ? FaYoutube
                  : FaLinkedin;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Visit Ankit's ${social.name} profile`}
                  className="w-9 h-9 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-500/40 hover:bg-white/10 transition-all cursor-pointer"
                >
                  <Icon size={15} />
                </a>
              );
            })}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={mobileMenuOpen}
            className="lg:hidden p-2.5 rounded-xl bg-white/5 border border-white/10 text-stone-200 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
          >
            {mobileMenuOpen ? <FaTimes size={18} /> : <FaBars size={18} />}
          </button>
        </div>
      </header>

      {/* Full-screen Mobile Navigation Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-[#0B0B0F]/95 backdrop-blur-2xl flex flex-col justify-between pt-24 pb-10 px-8 lg:hidden"
          >
            <div className="flex flex-col gap-4 mt-6">
              <span className="font-mono text-xs text-amber-400 uppercase tracking-widest mb-2">
                Navigation
              </span>
              {navLinks.map((link, idx) => (
                <motion.a
                  key={link.id}
                  href={`#${link.id}`}
                  onClick={(e) => handleNavClick(e, link.id)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className={`font-serif text-2xl font-bold tracking-tight py-1 transition-colors ${
                    activeSection === link.id
                      ? "text-amber-400"
                      : "text-stone-300 hover:text-white"
                  }`}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>

            {/* Mobile Footer with Social Links */}
            <div className="border-t border-white/10 pt-6">
              <p className="font-mono text-xs text-stone-400 mb-4 uppercase tracking-wider">
                Connect with Ankit
              </p>
              <div className="flex gap-4">
                {socialLinks.map((social) => {
                  const Icon =
                    social.name === "Instagram"
                      ? FaInstagram
                      : social.name === "YouTube"
                      ? FaYoutube
                      : FaLinkedin;
                  return (
                    <a
                      key={social.name}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`Visit Ankit's ${social.name} profile`}
                      className="w-11 h-11 rounded-full bg-white/5 border border-white/15 flex items-center justify-center text-stone-200 hover:text-amber-400 hover:border-amber-400 transition-all"
                    >
                      <Icon size={18} />
                    </a>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
