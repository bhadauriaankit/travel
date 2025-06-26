export default function Moments() {
  const moments = [
    {
      type: "image",
      src: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946475/moment2_nnu26y.jpg",
      alt: "Moment 1"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dgby0i19z/video/upload/v1750946483/moment1_qs2w9l.mp4"
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750946475/moment1_h9uj1s.jpg",
      alt: "Moment 2"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dgby0i19z/video/upload/v1750946482/moment2_tinjqo.mp4"
    }
  ];

  return (
    <section id="moments" className="p-8 sm:p-20 bg-black text-white">
      <h2 className="text-3xl font-bold mb-8 text-center">Special Moments</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {moments.map((item, idx) => (
          item.type === "image" ? (
            <img
              key={idx}
              src={item.src}
              alt={item.alt || `Moment ${idx + 1}`}
              className="rounded shadow-lg object-cover w-full h-60"
              loading="lazy"
            />
          ) : (
            <video
              key={idx}
              controls
              className="rounded shadow-lg w-full h-60 object-cover"
            >
              <source src={item.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          )
        ))}
      </div>
    </section>
  );
}