export default function Hero() {
  return (
    <section className="relative w-full h-[60vh] bg-cover bg-center flex items-center justify-center text-white" style={{ backgroundImage: 'url(/images/travel6.jpg)' }}>
      <div className="bg-black/60 p-6 rounded">
        <h1 className="text-4xl sm:text-6xl font-bold mb-4">Explore the World with Me</h1>
        <p className="text-lg sm:text-xl">Adventure | Culture | Memories</p>
      </div>
    </section>
  );
}