import Image from "next/image";
import { FaInstagram, FaYoutube, FaLinkedin } from "react-icons/fa";

export default function Navbar() {
  return (
    <nav className="w-full flex items-center justify-between px-6 py-4 border-b dark:border-white/10">
      <div className="flex items-center gap-2">
        {/* <Image src="/next.svg" alt="Logo" width={80} height={24} className="dark:invert" /> */}
        <span className="text-xl font-bold">Ankit Escapes</span>
      </div>
      <ul className="hidden sm:flex gap-6 text-sm font-medium">
        <li><a href="#gallery" className="hover:text-gray-600">Photos</a></li>
        <li><a href="#videos" className="hover:text-gray-600">Videos</a></li>
        <li><a href="#blog" className="hover:text-gray-600">Blog</a></li>
        <li><a href="#contact" className="hover:text-gray-600">Contact</a></li>
      </ul>
      <div className="flex gap-3 text-xl">
        <a href="https://www.instagram.com/bhadauria_ankit/" target="_blank"><FaInstagram /></a>
        <a href="https://www.youtube.com/@bhadauria_ankit" target="_blank"><FaYoutube /></a>
        <a href="https://www.linkedin.com/in/ankitsingh-it/" target="_blank"><FaLinkedin /></a>
      </div>
    </nav>
  );
}
