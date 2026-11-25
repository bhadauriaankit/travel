"use client";

import { motion } from "framer-motion";

export default function Card({
  children,
  className = "",
  hover = true,
  onClick,
  ...props
}) {
  return (
    <motion.div
      onClick={onClick}
      whileHover={hover ? { y: -4, transition: { duration: 0.25 } } : undefined}
      className={`relative rounded-2xl bg-[#121218]/80 backdrop-blur-xl border border-white/10 p-6 shadow-xl shadow-black/40 transition-colors hover:border-amber-500/30 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
}
