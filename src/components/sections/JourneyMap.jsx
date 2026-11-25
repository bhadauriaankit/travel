"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
} from "react-simple-maps";
import { FaOm, FaTimes, FaMapMarkerAlt, FaCheck, FaCalendarAlt, FaCompass } from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { visitedStates, jyotirlingas } from "@/lib/data";
import indiaTopo from "../../../public/maps/india.json";

export default function JourneyMap() {
  const [mounted, setMounted] = useState(false);
  const [tooltipContent, setTooltipContent] = useState("");
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const [selectedState, setSelectedState] = useState(null);
  const [selectedShrine, setSelectedShrine] = useState(null);
  const [showJyotirlingas, setShowJyotirlingas] = useState(true);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Quick lookup for visited states
  const visitedMap = new Map();
  visitedStates.forEach((st) => {
    visitedMap.set(st.name.toLowerCase(), st);
    if (st.displayName) {
      visitedMap.set(st.displayName.toLowerCase(), st);
    }
  });

  const handleStateClick = (geo) => {
    const geoName = geo.properties.name;
    const match = visitedMap.get(geoName.toLowerCase());
    if (match) {
      setSelectedShrine(null);
      setSelectedState(match);
    } else {
      setSelectedShrine(null);
      setSelectedState({
        name: geoName,
        displayName: geoName,
        status: "unvisited",
        tagline: "On the upcoming exploration wishlist",
        highlights: ["Future expedition planned"],
        image: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel3_kbedlu.jpg",
        category: "Upcoming",
      });
    }
  };

  const handleShrineClick = (shrine) => {
    setSelectedState(null);
    setSelectedShrine(shrine);
  };

  return (
    <section id="map" className="relative py-24 bg-[#0B0B0F] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Interactive Cartography"
          title="The Odyssey Across India"
          subtitle="Explore 15+ traversed states and track the 12 sacred Jyotirlingas. Click on highlighted states or temple markers to discover field notes."
        />

        {/* Controls Bar */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 bg-[#121218]/80 border border-white/10 rounded-2xl p-4 backdrop-blur-xl">
          <div className="flex items-center gap-4 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-amber-500 border border-amber-400" />
              <span className="text-stone-300 font-medium">15+ Explored States</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-3.5 h-3.5 rounded bg-[#1C1C26] border border-white/10" />
              <span className="text-stone-400">Wishlist States</span>
            </div>
          </div>

          {/* Toggle Jyotirlingas Layer */}
          <button
            type="button"
            onClick={() => setShowJyotirlingas(!showJyotirlingas)}
            className={`inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-medium transition-all cursor-pointer border ${
              showJyotirlingas
                ? "bg-amber-500/15 border-amber-500/40 text-amber-300 shadow-md shadow-amber-500/10"
                : "bg-white/5 border-white/10 text-stone-400 hover:text-stone-200"
            }`}
          >
            <FaOm size={14} className={showJyotirlingas ? "text-amber-400" : ""} />
            <span>Jyotirlinga Layer ({showJyotirlingas ? "Active" : "Hidden"})</span>
          </button>
        </div>

        {/* Map & Detail Split Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Map Viewer Canvas */}
          <div className="lg:col-span-8 bg-[#121218]/60 border border-white/10 rounded-3xl p-2 sm:p-6 shadow-2xl relative min-h-[500px] flex items-center justify-center overflow-hidden">
            {mounted ? (
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 1050,
                  center: [82.5, 22.0],
                }}
                className="w-full h-auto max-h-[640px]"
              >
                <Geographies geography={indiaTopo}>
                  {({ geographies }) =>
                    geographies.map((geo) => {
                      const geoName = geo.properties.name;
                      const isVisited = visitedMap.has(geoName.toLowerCase());

                      return (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          onMouseEnter={(e) => {
                            setTooltipContent(
                              isVisited
                                ? `${geoName} (Explored)`
                                : `${geoName} (Wishlist)`
                            );
                            setTooltipPos({ x: e.clientX, y: e.clientY });
                          }}
                          onMouseLeave={() => setTooltipContent("")}
                          onClick={() => handleStateClick(geo)}
                          style={{
                            default: {
                              fill: isVisited ? "#B45309" : "#1A1A24",
                              stroke: isVisited ? "#F59E0B" : "#2A2A38",
                              strokeWidth: 0.8,
                              outline: "none",
                              transition: "all 250ms",
                              cursor: "pointer",
                            },
                            hover: {
                              fill: isVisited ? "#D97706" : "#2E2E3E",
                              stroke: isVisited ? "#FBBF24" : "#4A4A5E",
                              strokeWidth: 1.5,
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: {
                              fill: "#F59E0B",
                              outline: "none",
                            },
                          }}
                        />
                      );
                    })
                  }
                </Geographies>

                {/* Jyotirlinga Markers Layer */}
                {showJyotirlingas &&
                  jyotirlingas.map((shrine) => (
                    <Marker
                      key={shrine.id}
                      coordinates={shrine.coordinates}
                      onClick={() => handleShrineClick(shrine)}
                    >
                      <g
                        className="cursor-pointer group"
                        onMouseEnter={(e) => {
                          setTooltipContent(
                            `${shrine.name} Jyotirlinga (${
                              shrine.visited ? "Completed" : "Planned"
                            })`
                          );
                          setTooltipPos({ x: e.clientX, y: e.clientY });
                        }}
                        onMouseLeave={() => setTooltipContent("")}
                      >
                        {shrine.visited ? (
                          <>
                            <circle
                              r="8"
                              fill="#F59E0B"
                              opacity="0.3"
                              className="animate-ping"
                            />
                            <circle
                              r="5"
                              fill="#F59E0B"
                              stroke="#FFFFFF"
                              strokeWidth="1.5"
                            />
                          </>
                        ) : (
                          <circle
                            r="4"
                            fill="#475569"
                            stroke="#94A3B8"
                            strokeWidth="1"
                          />
                        )}
                      </g>
                    </Marker>
                  ))}
              </ComposableMap>
            ) : (
              <div className="w-full h-[500px] flex flex-col items-center justify-center gap-3 text-stone-500 font-mono text-xs">
                <FaCompass className="animate-spin text-amber-500/60" size={28} />
                <span>Calibrating India Cartography...</span>
              </div>
            )}

            {/* Floating Tooltip */}
            {tooltipContent && (
              <div
                className="fixed z-50 pointer-events-none px-3 py-1.5 rounded-lg bg-black/90 border border-amber-500/40 text-amber-300 font-mono text-xs shadow-xl backdrop-blur-md -translate-x-1/2 -translate-y-10"
                style={{ left: `${tooltipPos.x}px`, top: `${tooltipPos.y}px` }}
              >
                {tooltipContent}
              </div>
            )}
          </div>

          {/* Interactive Info Sidebar */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <AnimatePresence mode="wait">
              {selectedShrine ? (
                <motion.div
                  key={`shrine-${selectedShrine.id}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-3xl bg-[#121218] border border-amber-500/30 p-6 shadow-2xl relative"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedShrine(null)}
                    aria-label="Close shrine details"
                    className="absolute top-4 right-4 p-2 text-stone-400 hover:text-white rounded-full bg-white/5 cursor-pointer"
                  >
                    <FaTimes size={14} />
                  </button>

                  <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-400 font-mono text-xs mb-3 border border-amber-500/20">
                    <FaOm />
                    <span>Sacred Jyotirlinga #{selectedShrine.id}</span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-100 mb-1">
                    {selectedShrine.name}
                  </h3>
                  <p className="text-amber-400/90 text-sm flex items-center gap-1.5 mb-4">
                    <FaMapMarkerAlt size={12} />
                    {selectedShrine.location}
                  </p>

                  <p className="text-stone-300 text-sm leading-relaxed mb-6">
                    {selectedShrine.significance}
                  </p>

                  <div className="p-3.5 rounded-xl bg-white/5 border border-white/10 flex items-center justify-between text-xs">
                    <span className="text-stone-400">Pilgrimage Status</span>
                    <span
                      className={`font-semibold flex items-center gap-1.5 ${
                        selectedShrine.visited ? "text-green-400" : "text-amber-400"
                      }`}
                    >
                      {selectedShrine.visited ? <FaCheck /> : <FaCalendarAlt />}
                      {selectedShrine.visited ? "Visited & Blessed" : "Upcoming Journey"}
                    </span>
                  </div>
                </motion.div>
              ) : selectedState ? (
                <motion.div
                  key={`state-${selectedState.name}`}
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -15 }}
                  className="rounded-3xl bg-[#121218] border border-white/15 p-6 shadow-2xl relative overflow-hidden"
                >
                  <button
                    type="button"
                    onClick={() => setSelectedState(null)}
                    aria-label="Close state details"
                    className="absolute top-4 right-4 z-10 p-2 text-stone-400 hover:text-white rounded-full bg-black/60 backdrop-blur-md cursor-pointer"
                  >
                    <FaTimes size={14} />
                  </button>

                  {/* State Image Thumbnail */}
                  <div className="relative w-full h-44 rounded-2xl overflow-hidden mb-5 border border-white/10">
                    <Image
                      src={selectedState.image}
                      alt={selectedState.displayName || selectedState.name}
                      fill
                      sizes="(max-width: 768px) 100vw, 380px"
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                    <span className="absolute bottom-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-amber-400 font-mono text-[11px] border border-amber-500/30">
                      {selectedState.category || "Exploration"}
                    </span>
                  </div>

                  <h3 className="font-serif text-2xl font-bold text-stone-100">
                    {selectedState.displayName || selectedState.name}
                  </h3>
                  <p className="text-amber-400 font-mono text-xs uppercase tracking-wider mb-4">
                    {selectedState.tagline}
                  </p>

                  <div className="space-y-2 mb-6">
                    <p className="text-stone-400 text-xs uppercase font-mono tracking-wider">
                      Journey Highlights:
                    </p>
                    <ul className="space-y-1.5 text-xs text-stone-300">
                      {selectedState.highlights?.map((h, i) => (
                        <li key={i} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="p-3 rounded-xl bg-white/5 border border-white/10 text-xs flex items-center justify-between">
                    <span className="text-stone-400">Expedition Status</span>
                    <span className="text-amber-400 font-semibold uppercase font-mono">
                      {selectedState.status === "visited" ? "100% Explored" : "Planned"}
                    </span>
                  </div>
                </motion.div>
              ) : (
                /* Default State Prompt */
                <div className="rounded-3xl bg-[#121218]/40 border border-white/10 p-8 text-center flex flex-col items-center justify-center min-h-[320px]">
                  <div className="w-16 h-16 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 mb-4">
                    <FaMapMarkerAlt size={26} />
                  </div>
                  <h4 className="font-serif text-xl font-bold text-stone-200 mb-2">
                    Click Any State or Shrine
                  </h4>
                  <p className="text-stone-400 text-xs sm:text-sm leading-relaxed max-w-xs">
                    Hover and select any of the 15+ explored states in saffron, or tap on the golden Jyotirlinga beacons to read travelogue notes.
                  </p>
                </div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
