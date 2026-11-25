"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FaMapMarkedAlt, FaOm, FaMountain, FaUserNinja } from "react-icons/fa";
import { stats } from "@/lib/data";

function CounterItem({ stat, icon: Icon, delay }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    let start = 0;
    const end = stat.value;
    const duration = 1600;
    const stepTime = Math.max(Math.floor(duration / (end || 1)), 25);

    const timer = setInterval(() => {
      start += 1;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [isInView, stat.value]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="relative p-6 sm:p-8 rounded-2xl bg-[#121218]/60 border border-white/10 backdrop-blur-xl group hover:border-amber-500/30 transition-all flex flex-col justify-between"
    >
      <div className="flex items-center justify-between mb-4">
        <div className="w-12 h-12 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 group-hover:scale-110 transition-transform">
          <Icon size={22} />
        </div>
        <span className="font-mono text-xs text-stone-400 uppercase tracking-widest">
          Verified
        </span>
      </div>

      <div>
        <div className="flex items-baseline gap-1">
          <span className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-stone-100">
            {count}
          </span>
          <span className="font-serif text-3xl font-bold text-amber-400">
            {stat.suffix}
          </span>
        </div>
        <h3 className="font-serif text-lg font-semibold text-stone-200 mt-2">
          {stat.label}
        </h3>
        <p className="text-stone-400 text-xs sm:text-sm mt-1 leading-relaxed">
          {stat.sublabel}
        </p>
      </div>
    </motion.div>
  );
}

export default function Stats() {
  const icons = [FaMapMarkedAlt, FaOm, FaMountain, FaUserNinja];

  return (
    <section id="stats" className="relative py-16 sm:py-24 bg-[#0B0B0F] border-b border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, idx) => (
            <CounterItem
              key={stat.label}
              stat={stat}
              icon={icons[idx % icons.length]}
              delay={idx * 0.1}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
