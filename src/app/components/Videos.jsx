const videoFiles = [
  { src: "https://res.cloudinary.com/dgby0i19z/video/upload/v1750951404/video2_srijio.mp4" },
  { src: "https://res.cloudinary.com/dgby0i19z/video/upload/v1750951404/video1_kzyhyi.mp4" }
  // Add more videos as needed
];

export default function Videos() {
  return (
    <section id="videos" className="p-8 sm:p-20 bg-gray-50 dark:bg-zinc-900">
      <h2 className="text-3xl font-bold mb-8 text-center">Travel Videos</h2>
      <div className="grid gap-8 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {videoFiles.map((video, idx) => (
          <div
            key={idx}
            className="rounded shadow-xl w-full aspect-video overflow-hidden"
          >
            <video controls className="w-full h-full object-cover rounded">
              <source src={video.src} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        ))}
      </div>
    </section>
  );
}
