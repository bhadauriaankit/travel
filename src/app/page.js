import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Gallery from "./components/Gallery";
import Videos from "./components/Videos";
import Blog from "./components/Blog";
import Footer from "./components/Footer";
import Moments from "./components/Moments";
import Nature from "./components/Nature";
import Contact from "./components/Contact";


export default function Home() {
  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white">
      <Navbar />
      <Hero />
      <Gallery />
      <Videos />
      <Moments />
      <Nature />
      <Blog />
      <Contact />
      <Footer />
    </div>
  );
}