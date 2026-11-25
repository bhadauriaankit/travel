"use client";

import { useState } from "react";
import SmoothScroll from "@/components/ui/SmoothScroll";
import CustomCursor from "@/components/ui/CustomCursor";
import GrainOverlay from "@/components/ui/GrainOverlay";
import Preloader from "@/components/sections/Preloader";
import Navbar from "@/components/sections/Navbar";
import Hero from "@/components/sections/Hero";
import Stats from "@/components/sections/Stats";
import JourneyMap from "@/components/sections/JourneyMap";
import Gallery from "@/components/sections/Gallery";
import Videos from "@/components/sections/Videos";
import Moments from "@/components/sections/Moments";
import Nature from "@/components/sections/Nature";
import Blog from "@/components/sections/Blog";
import Quotes from "@/components/sections/Quotes";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  const [preloaderDone, setPreloaderDone] = useState(false);

  return (
    <SmoothScroll>
      <Preloader onComplete={() => setPreloaderDone(true)} />
      <CustomCursor />
      <GrainOverlay />

      <div className="relative min-h-screen bg-[#0B0B0F] text-[#F5F5F4] overflow-x-clip">
        <Navbar />
        <main id="main-content">
          <Hero />
          <Stats />
          <JourneyMap />
          <Gallery />
          <Videos />
          <Moments />
          <Nature />
          <Blog />
          <Quotes />
          <Contact />
        </main>
        <Footer />
      </div>
    </SmoothScroll>
  );
}
