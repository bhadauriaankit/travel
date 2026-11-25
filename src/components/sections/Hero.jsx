"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaChevronDown, FaCompass, FaPaperPlane } from "react-icons/fa";
import Button from "@/components/ui/Button";
import { siteConfig } from "@/lib/data";

export default function Hero() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "45%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const words = siteConfig.headline.split(" ");

  const scrollToSection = (e, id) => {
    e.preventDefault();
    const el = document.getElementById(id);
    if (!el) return;
    if (window.__lenis) {
      window.__lenis.scrollTo(el, { offset: -70 });
    } else {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section
      id="hero"
      ref={containerRef}
      className="relative w-full h-screen min-h-[680px] flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Parallax & Next.js Image Optimization */}
      <motion.div style={{ y: bgY }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
        <Image
          src="https://res.cloudinary.com/dgby0i19z/image/upload/q_auto,f_auto/v1750946174/travel1_tlfvlv.jpg"
          alt="Himalayan mountain pass overlooking clouds - Ankit Escapes"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center brightness-75 scale-105"
        />
        {/* Cinematic Vignette & Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0B0B0F]/60 via-transparent to-[#0B0B0F]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0B0B0F]/80 via-transparent to-[#0B0B0F]/80" />
        <div className="absolute inset-0 bg-[#0B0B0F]/30" />
      </motion.div>

      {/* Main Hero Content */}
      <motion.div
        style={{ y: textY, opacity }}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 text-center flex flex-col items-center"
      >
        {/* Subtle Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-black/40 border border-white/15 backdrop-blur-md mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-mono text-xs uppercase tracking-widest text-amber-300">
            15+ States • 7 Jyotirlingas • 5 Treks
          </span>
        </motion.div>

        {/* Word-by-word animated headline */}
        <h1 className="font-serif text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-stone-100 leading-[1.1] mb-6 drop-shadow-2xl">
          {words.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.7,
                delay: 0.3 + index * 0.12,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="inline-block mr-3 last:mr-0"
            >
              {word === "World" || word === "Me" ? (
                <span className="bg-gradient-to-r from-amber-400 via-orange-300 to-amber-500 bg-clip-text text-transparent">
                  {word}
                </span>
              ) : (
                word
              )}
            </motion.span>
          ))}
        </h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.8 }}
          className="font-mono text-sm sm:text-base md:text-lg text-stone-300 tracking-wider mb-8 uppercase"
        >
          {siteConfig.tagline}
        </motion.p>

        {/* Brief Narrative */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-stone-300/90 text-base sm:text-lg max-w-xl mb-10 leading-relaxed drop-shadow"
        >
          {siteConfig.bio}
        </motion.p>

        {/* Action CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="flex flex-wrap items-center justify-center gap-4"
        >
          <Button
            href="#map"
            onClick={(e) => scrollToSection(e, "map")}
            variant="primary"
            size="lg"
            className="group"
          >
            <FaCompass className="group-hover:rotate-45 transition-transform" />
            Explore Journeys
          </Button>

          <Button
            href="#contact"
            onClick={(e) => scrollToSection(e, "contact")}
            variant="secondary"
            size="lg"
          >
            <FaPaperPlane size={14} />
            Contact Me
          </Button>
        </motion.div>
      </motion.div>

      {/* Bouncing Scroll Down Indicator */}
      <motion.a
        href="#stats"
        onClick={(e) => scrollToSection(e, "stats")}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.6 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-stone-400 hover:text-amber-400 transition-colors cursor-pointer z-10"
        aria-label="Scroll to stats"
      >
        <span className="font-mono text-[10px] tracking-widest uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
        >
          <FaChevronDown size={14} />
        </motion.div>
      </motion.a>
    </section>
  );
}
