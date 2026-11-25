"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaQuoteLeft } from "react-icons/fa";
import { quotes } from "@/lib/data";

export default function Quotes() {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % quotes.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 bg-[#0B0B0F] border-t border-b border-white/5 overflow-hidden">
      {/* Subtle radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="w-12 h-12 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 flex items-center justify-center mx-auto mb-8">
          <FaQuoteLeft size={18} />
        </div>

        <div className="min-h-[140px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.5 }}
              className="space-y-4"
            >
              <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl text-stone-100 font-normal italic leading-relaxed">
                “{quotes[current].quote}”
              </blockquote>
              <div className="flex items-center justify-center gap-2">
                <span className="font-serif font-bold text-amber-400 text-sm sm:text-base">
                  {quotes[current].author}
                </span>
                <span className="text-stone-400">•</span>
                <span className="font-mono text-xs text-stone-400">
                  {quotes[current].context}
                </span>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel indicator dots */}
        <div className="flex items-center justify-center gap-2 mt-8">
          {quotes.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setCurrent(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`h-1.5 rounded-full transition-all cursor-pointer ${
                current === idx
                  ? "w-8 bg-amber-400"
                  : "w-2 bg-white/20 hover:bg-white/40"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
