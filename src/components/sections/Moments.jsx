"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaCalendarAlt, FaMapMarkerAlt, FaQuoteLeft, FaChevronLeft, FaChevronRight } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { moments } from "@/lib/data";

export default function Moments() {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollAmount = clientWidth * 0.8;
      scrollRef.current.scrollTo({
        left: direction === "left" ? scrollLeft - scrollAmount : scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="moments" className="relative py-24 sm:py-32 bg-[#0B0B0F] overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute top-1/3 right-0 w-[500px] h-[500px] bg-teal-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12">
          <SectionHeading
            badge="Field Stories"
            title="Unscripted Moments"
            subtitle="Raw, unvarnished recollections from sacred trails, unreserved train coaches, and high passes."
            align="left"
            className="mb-0"
          />

          {/* Carousel Navigation Buttons */}
          <div className="hidden sm:flex items-center gap-3 mt-6 sm:mt-0">
            <button
              type="button"
              onClick={() => scroll("left")}
              aria-label="Scroll left"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all cursor-pointer"
            >
              <FaChevronLeft size={14} />
            </button>
            <button
              type="button"
              onClick={() => scroll("right")}
              aria-label="Scroll right"
              className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-white hover:bg-white/10 hover:border-amber-500/30 transition-all cursor-pointer"
            >
              <FaChevronRight size={14} />
            </button>
          </div>
        </div>

        {/* Scroll-Snap Carousel Container */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto pb-6 scroll-smooth snap-x snap-mandatory scrollbar-none"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {moments.map((moment, idx) => (
            <motion.div
              key={moment.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="snap-center shrink-0 w-[85vw] sm:w-[480px] md:w-[540px] rounded-3xl bg-[#121218] border border-white/10 overflow-hidden shadow-2xl flex flex-col group hover:border-amber-500/30 transition-colors"
            >
              {/* Media Container (Image or Native Video) */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                {moment.mediaType === "image" ? (
                  <Image
                    src={moment.mediaUrl}
                    alt={moment.title}
                    fill
                    sizes="(max-width: 768px) 85vw, 540px"
                    loading="lazy"
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <video
                    controls
                    preload="none"
                    className="w-full h-full object-cover"
                  >
                    <source src={moment.mediaUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                )}

                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 font-mono text-[11px] border border-white/10">
                  {moment.tag}
                </div>
              </div>

              {/* Story Content */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-stone-400 mb-3">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <FaMapMarkerAlt /> {moment.location}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaCalendarAlt /> {moment.date}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-4 group-hover:text-amber-300 transition-colors">
                    {moment.title}
                  </h3>

                  <p className="text-stone-300 text-sm sm:text-base leading-relaxed">
                    {moment.description}
                  </p>
                </div>

                <div className="mt-6 pt-4 border-t border-white/10 flex items-center gap-2 text-stone-400 text-xs italic">
                  <FaQuoteLeft className="text-amber-400/50" />
                  <span>Field Journal Entry</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
