"use client";

import { FaInstagram, FaYoutube, FaLinkedin, FaArrowUp } from "react-icons/fa";
import { siteConfig, socialLinks, navLinks } from "@/lib/data";

export default function Footer() {
  const scrollToTop = () => {
    if (window.__lenis) {
      window.__lenis.scrollTo(0);
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleNavClick = (e, targetId) => {
    e.preventDefault();
    const el = document.getElementById(targetId);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="relative bg-[#07070A] border-t border-white/10 pt-20 pb-12 overflow-hidden text-stone-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 pb-16 border-b border-white/10">
          {/* Brand Column */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-amber-500 to-orange-500 flex items-center justify-center text-black font-bold font-serif text-sm">
                AE
              </div>
              <span className="font-serif text-2xl font-bold tracking-tight text-stone-100">
                {siteConfig.name}
              </span>
            </div>
            <p className="text-stone-400 text-sm leading-relaxed max-w-sm">
              Documenting the spirit of Indian landscapes — from sacred Jyotirlinga shrines to unmapped trails across 15+ states.
            </p>
            <div className="flex gap-3 pt-2">
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
                    aria-label={`Visit Ankit's ${social.name}`}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-400 hover:bg-white/10 transition-all cursor-pointer"
                  >
                    <Icon size={16} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="md:col-span-4">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest block mb-4">
              Expedition Index
            </span>
            <ul className="grid grid-cols-2 gap-2.5 text-sm">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={`#${link.id}`}
                    onClick={(e) => handleNavClick(e, link.id)}
                    className="hover:text-amber-400 transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Scroll to Top Column */}
          <div className="md:col-span-3 flex flex-col md:items-end justify-between">
            <span className="font-mono text-xs text-stone-400 uppercase tracking-widest block mb-4 md:mb-0">
              Return to Peak
            </span>
            <button
              type="button"
              onClick={scrollToTop}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-full bg-white/5 border border-white/10 text-stone-200 hover:text-amber-400 hover:border-amber-400 hover:bg-white/10 transition-all cursor-pointer font-serif text-sm group"
            >
              <span>Back to Top</span>
              <FaArrowUp
                size={12}
                className="group-hover:-translate-y-1 transition-transform"
              />
            </button>
          </div>
        </div>

        {/* Big Outlined Editorial Wordmark */}
        <div className="pt-16 pb-8 text-center select-none overflow-hidden">
          <span
            className="font-serif font-black text-5xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tighter uppercase opacity-10 hover:opacity-20 transition-opacity duration-500 text-transparent"
            style={{
              WebkitTextStroke: "1.5px #F59E0B",
            }}
          >
            ANKIT ESCAPES
          </span>
        </div>

        {/* Bottom Legal / Attributions */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-stone-400 gap-4">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} • Designed & Built with Next.js 15, React 19 & Tailwind v4.
          </p>
          <p className="flex items-center gap-2">
            <span>Crafted by Ankit Bhadauria</span>
            <span>•</span>
            <span className="text-amber-400">All Stories Authentic</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
