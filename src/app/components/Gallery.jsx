"use client";

import { useState } from "react";

const cloudinaryImages = [
  "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel1_tlfvlv.jpg",
  "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel4_ftkgg5.jpg",
  "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946173/travel2_mox1s5.jpg",
  "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946174/travel3_kbedlu.jpg"
];

export default function Gallery() {
  const [brokenImages, setBrokenImages] = useState({});

  const handleImageError = (index) => {
    setBrokenImages((prev) => ({ ...prev, [index]: true }));
  };

  return (
    <section id="gallery" className="p-8 sm:p-20 bg-black text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Photo Gallery</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {cloudinaryImages.map((url, idx) => (
          <img
            key={idx}
            src={brokenImages[idx] ? "/fallback.jpg" : url}
            alt={`Travel photo ${idx + 1}`}
            className="rounded shadow-lg object-cover w-full h-60"
            loading="lazy"
            onError={() => handleImageError(idx)}
          />
        ))}
      </div>
    </section>
  );
}