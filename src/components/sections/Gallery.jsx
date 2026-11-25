"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import Lightbox from "yet-another-react-lightbox";
import { FaExpandAlt, FaMapMarkerAlt } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { galleryItems, galleryCategories } from "@/lib/data";

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const [failedImages, setFailedImages] = useState({});

  const filteredItems =
    activeCategory === "all"
      ? galleryItems
      : galleryItems.filter((item) => item.category === activeCategory);

  // Format slides for yet-another-react-lightbox
  const slides = filteredItems.map((item) => ({
    src: failedImages[item.id] ? "/fallback.svg" : item.src,
    alt: item.title,
    title: item.title,
    description: `${item.location} • ${item.caption}`,
  }));

  const handleImageError = (id) => {
    setFailedImages((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="gallery" className="relative py-24 sm:py-32 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Curated Visuals"
          title="Moments Frozen in Mountain Light"
          subtitle="A high-altitude visual journal capturing remote Himalayan passes, ancient stone shrines, and solitary miles."
        />

        {/* Filter Categories */}
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-12">
          {galleryCategories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                className={`relative px-5 py-2 rounded-full text-xs sm:text-sm font-medium tracking-wide transition-all cursor-pointer ${
                  isActive
                    ? "text-black font-semibold bg-gradient-to-r from-amber-500 to-orange-400 shadow-lg shadow-amber-500/20"
                    : "text-stone-400 hover:text-stone-200 bg-white/5 hover:bg-white/10 border border-white/10"
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* Masonry-Style Image Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {filteredItems.map((item, idx) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.5, delay: idx * 0.06 }}
                onClick={() => setLightboxIndex(idx)}
                className="group relative rounded-2xl overflow-hidden bg-[#121218] border border-white/10 shadow-xl cursor-pointer aspect-[4/3] sm:aspect-[3/2] flex flex-col justify-end"
              >
                {/* Next.js Optimized Image */}
                <Image
                  src={failedImages[item.id] ? "/fallback.svg" : item.src}
                  alt={item.title}
                  fill
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  loading="lazy"
                  onError={() => handleImageError(item.id)}
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-108 group-hover:brightness-95"
                />

                {/* Subtle Gradient Veil */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

                {/* Top Corner Category Pill */}
                <div className="absolute top-4 left-4 z-10">
                  <span className="px-3 py-1 rounded-full text-[11px] font-mono tracking-wider uppercase bg-black/60 backdrop-blur-md text-amber-300 border border-white/10">
                    {item.category}
                  </span>
                </div>

                {/* Expand Icon */}
                <div className="absolute top-4 right-4 z-10 w-8 h-8 rounded-full bg-black/50 backdrop-blur-md border border-white/20 flex items-center justify-center text-stone-200 opacity-0 group-hover:opacity-100 group-hover:scale-110 transition-all">
                  <FaExpandAlt size={12} />
                </div>

                {/* Caption & Location Bottom Overlay */}
                <div className="relative z-10 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono mb-1">
                    <FaMapMarkerAlt size={11} />
                    {item.location}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-xs text-stone-300/80 mt-1 line-clamp-2 leading-relaxed">
                    {item.caption}
                  </p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Lightbox Viewer */}
        <Lightbox
          open={lightboxIndex >= 0}
          index={lightboxIndex}
          close={() => setLightboxIndex(-1)}
          slides={slides}
        />
      </div>
    </section>
  );
}
