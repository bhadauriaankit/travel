"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  FaTrain,
  FaMotorcycle,
  FaCarSide,
  FaPlane,
  FaHiking,
  FaClock,
  FaCalendarAlt,
  FaBookOpen,
} from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { transportModes, timelineEvents } from "@/lib/data";

const transportIconMap = {
  train: FaTrain,
  bike: FaMotorcycle,
  car: FaCarSide,
  plane: FaPlane,
  walk: FaHiking,
};

const blogPosts = [
  {
    id: 1,
    title: "15 Indian States: A Tapestry of Soil and Dialects",
    readTime: "5 min read",
    date: "Visual Essay",
    tag: "Milestones",
    image: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel1_tlfvlv.jpg",
    excerpt:
      "Crossing state lines in India is not merely crossing geographical borders — it is stepping into an entirely new ecosystem of spice, rhythm, architecture, and language. From Himachal's snowy crests to the coastal palms of Goa, here is how 15 states reshaped my identity as a traveler.",
  },
  {
    id: 2,
    title: "The Circle of Light: 7 Jyotirlingas and the Path Forward",
    readTime: "7 min read",
    date: "Spiritual Journal",
    tag: "Pilgrimage",
    image: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel4_ftkgg5.jpg",
    excerpt:
      "Standing in the frosty dawn outside Kedarnath Dham at 3,583 meters, followed months later by the roaring waves against Somnath's ancient stone foundation. Completing 7 out of the 12 sacred Jyotirlingas has been a pilgrimage of surrender, silence, and steadfast devotion.",
  },
  {
    id: 3,
    title: "Solo Expeditions & General Class: Lessons on the Rail",
    readTime: "4 min read",
    date: "Reflections",
    tag: "Solo Travel",
    image: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946173/travel2_mox1s5.jpg",
    excerpt:
      "Nothing strips away pretensions faster than four solo trips and packed unreserved train carriages. Strangers sharing chai, passing snacks across narrow benches, and trusting the road when GPS stops working. Here is what real travel feels like.",
  },
];

export default function Blog() {
  return (
    <section id="blog" className="relative py-24 sm:py-32 bg-[#0B0B0F] border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Chronicles & Reflections"
          title="Field Notes & Travel Stories"
          subtitle="Long-form narratives, philosophical reflections, and road wisdom gathered across thousands of miles."
        />

        {/* Blog Post Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          {blogPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.12 }}
              className="group rounded-3xl bg-[#121218] border border-white/10 overflow-hidden shadow-2xl flex flex-col hover:-translate-y-2 hover:border-amber-500/40 transition-all duration-300"
            >
              {/* Cover Image */}
              <div className="relative aspect-[16/10] w-full overflow-hidden bg-black">
                <Image
                  src={post.image}
                  alt={post.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 33vw"
                  loading="lazy"
                  className="object-cover group-hover:scale-106 transition-transform duration-700"
                />
                <div className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-300 font-mono text-[11px] border border-white/10">
                  {post.tag}
                </div>
              </div>

              {/* Text Body */}
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-4 text-xs font-mono text-stone-400 mb-3">
                    <span className="flex items-center gap-1.5 text-amber-400">
                      <FaCalendarAlt size={11} /> {post.date}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <FaClock size={11} /> {post.readTime}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-stone-100 group-hover:text-amber-300 transition-colors mb-3 leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-stone-300 text-sm leading-relaxed mb-6 line-clamp-4">
                    {post.excerpt}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between text-xs">
                  <span className="text-amber-400 font-medium group-hover:underline flex items-center gap-1.5">
                    <FaBookOpen size={12} /> Read Full Story
                  </span>
                  <span className="text-stone-400 font-mono">By Ankit Bhadauria</span>
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Modes of Transport Icon Strip */}
        <div className="mb-24 bg-[#121218]/80 border border-white/10 rounded-3xl p-8 sm:p-10 backdrop-blur-xl">
          <div className="max-w-2xl mb-8">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
              My Modes of Travel
            </span>
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-stone-100 mt-2">
              The Journey is Just as Sacred as the Destination
            </h3>
            <p className="text-stone-400 text-sm mt-2 leading-relaxed">
              Every vehicle brings its own tempo. From the rhythmic clatter of broad-gauge trains to solitary saddle time on two wheels:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {transportModes.map((mode, i) => {
              const Icon = transportIconMap[mode.icon] || FaTrain;
              return (
                <motion.div
                  key={mode.name}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="p-5 rounded-2xl bg-white/5 border border-white/10 hover:border-amber-500/30 transition-all flex flex-col justify-between group"
                >
                  <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4 group-hover:scale-110 transition-transform">
                    <Icon size={20} />
                  </div>
                  <div>
                    <h4 className="font-serif font-bold text-stone-200 text-base mb-1.5">
                      {mode.name}
                    </h4>
                    <p className="text-stone-400 text-xs leading-relaxed">
                      {mode.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Timeline Component: Year -> Trip */}
        <div>
          <div className="text-center max-w-xl mx-auto mb-12">
            <span className="font-mono text-xs text-amber-400 uppercase tracking-widest">
              Chronological Roadmap
            </span>
            <h3 className="font-serif text-3xl font-bold text-stone-100 mt-2">
              The Timeline of Expeditions
            </h3>
          </div>

          <div className="relative border-l border-amber-500/20 max-w-3xl mx-auto pl-6 sm:pl-10 space-y-12">
            {timelineEvents.map((event, idx) => (
              <motion.div
                key={event.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="relative group"
              >
                {/* Glowing Dot on Line */}
                <div className="absolute -left-[31px] sm:-left-[47px] top-1.5 w-4 h-4 rounded-full bg-[#0B0B0F] border-2 border-amber-400 flex items-center justify-center group-hover:scale-125 transition-transform">
                  <div className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                </div>

                {/* Event Card */}
                <div className="p-6 rounded-2xl bg-[#121218]/90 border border-white/10 hover:border-amber-500/30 transition-colors">
                  <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                    <span className="font-mono text-xs font-semibold px-2.5 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20">
                      {event.year}
                    </span>
                    <span className="font-mono text-[11px] text-stone-400 uppercase">
                      {event.badge}
                    </span>
                  </div>

                  <h4 className="font-serif text-xl font-bold text-stone-100">
                    {event.title}
                  </h4>
                  <p className="text-amber-400/90 text-xs font-mono mb-3">
                    {event.subtitle}
                  </p>
                  <p className="text-stone-300 text-sm leading-relaxed">
                    {event.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
