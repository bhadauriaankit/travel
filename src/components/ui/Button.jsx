"use client";

import { motion } from "framer-motion";

export default function Button({
  children,
  variant = "primary",
  size = "md",
  className = "",
  onClick,
  href,
  type = "button",
  disabled = false,
  target,
  rel,
  ...props
}) {
  const baseStyles =
    "relative inline-flex items-center justify-center font-medium transition-all duration-300 rounded-full select-none cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 focus-visible:ring-offset-2 focus-visible:ring-offset-black disabled:opacity-50 disabled:cursor-not-allowed";

  const sizeStyles = {
    sm: "text-xs px-4 py-2 gap-1.5",
    md: "text-sm px-6 py-3 gap-2",
    lg: "text-base px-8 py-4 gap-2.5",
  };

  const variantStyles = {
    primary:
      "bg-gradient-to-r from-amber-500 to-orange-500 text-black font-semibold shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.98]",
    secondary:
      "bg-white/5 border border-white/15 text-stone-100 hover:bg-white/10 hover:border-white/30 backdrop-blur-md active:scale-[0.98]",
    teal:
      "bg-teal-500/10 border border-teal-500/30 text-teal-300 hover:bg-teal-500/20 active:scale-[0.98]",
    ghost:
      "text-stone-300 hover:text-white hover:bg-white/5 active:scale-[0.98]",
  };

  const combinedClasses = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <motion.a
        href={href}
        className={combinedClasses}
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.98 }}
        target={target}
        rel={target === "_blank" ? "noopener noreferrer" : rel}
        {...props}
      >
        {children}
      </motion.a>
    );
  }

  return (
    <motion.button
      type={type}
      className={combinedClasses}
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.03 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      {...props}
    >
      {children}
    </motion.button>
  );
}
