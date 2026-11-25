"use client";

import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaTimes } from "react-icons/fa";

export default function Modal({ isOpen, onClose, children, title }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    }
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 md:p-10">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/80 backdrop-blur-md"
            aria-hidden="true"
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl bg-[#121218] border border-white/15 p-6 shadow-2xl z-10 text-stone-100"
            role="dialog"
            aria-modal="true"
            aria-label={title || "Dialog modal"}
          >
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100">
                {title}
              </h3>
              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="p-2 rounded-full text-stone-400 hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
              >
                <FaTimes size={18} />
              </button>
            </div>
            {children}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
