"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaMapMarkerAlt, FaQuoteLeft } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { natureScenes } from "@/lib/data";

function NatureCard({ scene, index }) {
  const cardRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);

  return (
    <div
      ref={cardRef}
      className="relative rounded-3xl overflow-hidden h-[450px] sm:h-[550px] flex items-end p-6 sm:p-12 border border-white/10 shadow-2xl group"
    >
      {/* Background Image with Parallax Depth */}
      <motion.div style={{ y }} className="absolute inset-0 w-full h-[125%] -top-[12%]">
        <Image
          src={scene.image}
          alt={scene.title}
          fill
          sizes="100vw"
          loading="lazy"
          className="object-cover brightness-70 group-hover:scale-103 group-hover:brightness-80 transition-all duration-700"
        />
        {/* Gradients */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-transparent" />
      </motion.div>

      {/* Floating Content */}
      <div className="relative z-10 max-w-2xl">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-teal-300 font-mono text-xs border border-teal-500/30 mb-4">
          <FaMapMarkerAlt size={11} />
          <span>{scene.location}</span>
        </div>

        <blockquote className="font-serif text-xl sm:text-2xl md:text-3xl font-normal italic text-stone-100 leading-snug mb-4">
          {scene.quote}
        </blockquote>

        <h3 className="font-mono text-xs sm:text-sm uppercase tracking-wider text-amber-400">
          {scene.title}
        </h3>
      </div>
    </div>
  );
}

export default function Nature() {
  return (
    <section id="nature" className="relative py-24 sm:py-32 bg-[#0B0B0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Wilderness Chronicles"
          title="Best Scenes of Nature"
          subtitle="Sunrises over misty ridges, ancient cedar canopies, and mirrored alpine lakes that hush the mind."
        />

        <div className="flex flex-col gap-12 sm:gap-16">
          {natureScenes.map((scene, idx) => (
            <NatureCard key={scene.id} scene={scene} index={idx} />
          ))}
        </div>
      </div>
    </section>
  );
}
