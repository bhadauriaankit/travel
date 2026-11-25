"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [isDone, setIsDone] = useState(false);

  const finish = useCallback(() => {
    setIsDone(true);
    if (onComplete) onComplete();
  }, [onComplete]);

  useEffect(() => {
    // Check if prefers reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      finish();
      return;
    }

    // Safety timeout to ensure preloader is never stuck
    const safetyTimeout = setTimeout(() => {
      finish();
    }, 2000);

    // Quick progress counter to reach 100% in ~1.4 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            finish();
          }, 150);
          return 100;
        }
        const increment = Math.floor(Math.random() * 10) + 6;
        return Math.min(100, prev + increment);
      });
    }, 50);

    return () => {
      clearInterval(interval);
      clearTimeout(safetyTimeout);
    };
  }, [finish]);

  return (
    <AnimatePresence>
      {!isDone && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            y: "-100%",
            transition: { duration: 0.7, ease: [0.76, 0, 0.24, 1] },
          }}
          onClick={finish}
          className="fixed inset-0 z-[120] flex flex-col items-center justify-center bg-[#0B0B0F] text-stone-100 select-none px-6 cursor-pointer"
        >
          {/* Animated Mountain Crest SVG */}
          <div className="w-24 h-24 mb-6 relative flex items-center justify-center">
            <svg
              viewBox="0 0 100 100"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              className="w-full h-full"
            >
              <motion.circle
                cx="50"
                cy="50"
                r="45"
                stroke="rgba(245, 158, 11, 0.25)"
                strokeWidth="1.5"
                strokeDasharray="4 4"
                animate={{ rotate: 360 }}
                transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
              />
              <motion.path
                d="M18 72 L42 34 L56 54 L68 36 L86 72"
                stroke="url(#preloaderGradient)"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 1.2, ease: "easeInOut" }}
              />
              <motion.circle
                cx="68"
                cy="30"
                r="4"
                fill="#F59E0B"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.6, duration: 0.3 }}
              />
              <defs>
                <linearGradient
                  id="preloaderGradient"
                  x1="18"
                  y1="72"
                  x2="86"
                  y2="34"
                  gradientUnits="userSpaceOnUse"
                >
                  <stop stopColor="#F59E0B" />
                  <stop offset="1" stopColor="#FB923C" />
                </linearGradient>
              </defs>
            </svg>
          </div>

          {/* Brand Wordmark */}
          <motion.h1
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.15 }}
            className="font-serif text-2xl sm:text-3xl font-bold tracking-widest uppercase text-stone-100"
          >
            Ankit Escapes
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="font-mono text-xs text-stone-400 tracking-widest mt-2 uppercase"
          >
            Adventure • Culture • Memories
          </motion.p>

          {/* Progress Bar & Percentage */}
          <div className="w-48 sm:w-64 mt-8 flex flex-col items-center gap-2">
            <div className="w-full h-[2px] bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-amber-500 to-orange-400"
                style={{ width: `${progress}%` }}
              />
            </div>
            <span className="font-mono text-xs text-amber-400 tracking-wider">
              {progress}%
            </span>
          </div>

          {/* Skip prompt */}
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              finish();
            }}
            className="mt-6 text-[11px] font-mono uppercase tracking-wider text-stone-500 hover:text-stone-300 transition-colors"
          >
            Click anywhere to enter →
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
