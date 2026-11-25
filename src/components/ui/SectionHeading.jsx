"use client";

import { motion } from "framer-motion";

export default function SectionHeading({
  badge,
  title,
  subtitle,
  align = "center",
  className = "",
}) {
  const alignClasses =
    align === "center"
      ? "text-center items-center"
      : align === "left"
      ? "text-left items-start"
      : "text-right items-end";

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className={`flex flex-col mb-12 sm:mb-16 ${alignClasses} ${className}`}
    >
      {badge && (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium tracking-wider uppercase text-amber-400 bg-amber-500/10 border border-amber-500/20 mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
          {badge}
        </span>
      )}
      <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-stone-100 max-w-3xl leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-stone-400 text-base sm:text-lg max-w-2xl leading-relaxed">
          {subtitle}
        </p>
      )}
    </motion.div>
  );
}
