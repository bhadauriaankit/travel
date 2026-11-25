"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaPlay, FaMapMarkerAlt, FaClock } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import Modal from "@/components/ui/Modal";
import { videos } from "@/lib/data";

export default function Videos() {
  const [activeVideo, setActiveVideo] = useState(null);

  return (
    <section id="videos" className="relative py-24 sm:py-32 bg-[#0B0B0F]/90 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Cinematography"
          title="Motion & Resonances"
          subtitle="Moving visual records capturing ambient winds, train tracks, and mist flowing over ancient ridge peaks."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {videos.map((vid, idx) => (
            <motion.div
              key={vid.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              onClick={() => setActiveVideo(vid)}
              className="group relative rounded-2xl overflow-hidden bg-[#121218] border border-white/10 shadow-2xl cursor-pointer flex flex-col"
            >
              {/* Video Thumbnail with Hover Play Button */}
              <div className="relative aspect-video w-full overflow-hidden bg-black">
                <Image
                  src={vid.poster}
                  alt={vid.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-105 group-hover:brightness-90 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors" />

                {/* Duration & Tag Badges */}
                <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 font-mono text-[11px] border border-white/10">
                  {vid.tag}
                </div>

                <div className="absolute bottom-3 right-3 px-2.5 py-0.5 rounded-md bg-black/70 backdrop-blur-md text-stone-300 font-mono text-xs flex items-center gap-1.5 border border-white/10">
                  <FaClock size={10} />
                  <span>{vid.duration}</span>
                </div>

                {/* Centered Play Button */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-14 h-14 rounded-full bg-amber-500/90 text-black flex items-center justify-center shadow-xl shadow-amber-500/30 group-hover:scale-115 group-hover:bg-amber-400 transition-all pl-1">
                    <FaPlay size={16} />
                  </div>
                </div>
              </div>

              {/* Card Meta Content */}
              <div className="p-5 flex-1 flex flex-col justify-between">
                <div>
                  <span className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-mono mb-2">
                    <FaMapMarkerAlt size={11} />
                    {vid.location}
                  </span>
                  <h3 className="font-serif text-lg font-bold text-stone-100 group-hover:text-amber-300 transition-colors">
                    {vid.title}
                  </h3>
                </div>

                <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-stone-400">
                  <span className="font-mono">Full High-Definition</span>
                  <span className="text-amber-400 group-hover:underline">Watch clip →</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Video Player Modal */}
        <Modal
          isOpen={!!activeVideo}
          onClose={() => setActiveVideo(null)}
          title={activeVideo?.title || "Video Player"}
        >
          {activeVideo && (
            <div className="w-full">
              <div className="relative aspect-video w-full rounded-xl overflow-hidden bg-black shadow-2xl mb-4">
                <video
                  controls
                  autoPlay
                  preload="none"
                  className="w-full h-full object-contain"
                  poster={activeVideo.poster}
                >
                  <source src={activeVideo.videoUrl} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="flex flex-wrap items-center justify-between text-xs sm:text-sm text-stone-400 gap-2">
                <span className="flex items-center gap-1.5 text-amber-400">
                  <FaMapMarkerAlt /> {activeVideo.location}
                </span>
                <span className="font-mono">{activeVideo.tag} • Cloudinary Stream</span>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </section>
  );
}
