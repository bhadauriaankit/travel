export default function Nature() {
  const natureGallery = [
    {
      type: "image",
      src: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750951537/nature1_f3pg3g.jpg",
      alt: "Sunrise Over Hills"
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750951540/nature3_c0jlgc.jpg",
      alt: "Misty Forest"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dgby0i19z/video/upload/v1750951527/nature2_loqzpm.mp4"
    },
    {
      type: "image",
      src: "https://res.cloudinary.com/dgby0i19z/image/upload/v1750951539/nature2_s3njtf.jpg",
      alt: "Lake Reflection"
    },
    {
      type: "video",
      src: "https://res.cloudinary.com/dgby0i19z/video/upload/v1750951528/nature1_bpnuz8.mp4"
    }
  ];

  return (
    <section id="nature" className="p-8 sm:p-20 bg-green-50 dark:bg-green-900">
      <h2 className="text-3xl font-bold mb-8 text-center text-green-800 dark:text-green-200">Best Scenes of Nature</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {natureGallery.map((item, idx) => (
          item.type === "image" ? (
            <img
              key={idx}
              src={item.src}
              alt={item.alt || `Nature ${idx + 1}`}
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
