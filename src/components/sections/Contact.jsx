"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import emailjs from "@emailjs/browser";
import {
  FaPaperPlane,
  FaCheckCircle,
  FaExclamationCircle,
  FaSpinner,
  FaMapMarkerAlt,
  FaEnvelope,
  FaInstagram,
  FaYoutube,
  FaLinkedin,
} from "react-icons/fa";
import SectionHeading from "@/components/ui/SectionHeading";
import { siteConfig, socialLinks } from "@/lib/data";

export default function Contact() {
  const formRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    message: "",
    honeypot: "", // Spam bot trap
  });
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState("idle"); // idle | sending | success | error
  const [statusMessage, setStatusMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formState.name.trim()) errs.name = "Please enter your name";
    if (!formState.email.trim()) {
      errs.email = "Please enter your email";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formState.email)) {
      errs.email = "Please provide a valid email address";
    }
    if (!formState.message.trim() || formState.message.length < 10) {
      errs.message = "Message must be at least 10 characters long";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Bot trap check
    if (formState.honeypot) {
      setStatus("success");
      setStatusMessage("Message sent successfully!");
      return;
    }

    if (!validate()) return;

    setStatus("sending");

    const serviceId =
      process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "service_9qwo6bl";
    const templateId =
      process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "template_jx31o8c";
    const publicKey =
      process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "3H9Ly3WS_3mJTf_wp";

    try {
      await emailjs.sendForm(serviceId, templateId, formRef.current, publicKey);
      setStatus("success");
      setStatusMessage("Thank you! Your message has reached Ankit's inbox.");
      setFormState({ name: "", email: "", message: "", honeypot: "" });
      setTimeout(() => setStatus("idle"), 6000);
    } catch (error) {
      console.error("EmailJS Error:", error);
      setStatus("error");
      setStatusMessage(
        "Could not deliver email at this moment. Please reach out directly at ankitbhadauria20114@gmail.com or via social channels."
      );
    }
  };

  return (
    <section id="contact" className="relative py-24 sm:py-32 bg-[#0B0B0F] overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <SectionHeading
          badge="Direct Connection"
          title="Send a Signal Across the Trail"
          subtitle="Whether you seek trail guidance for Himalayan routes, Jyotirlinga pilgrimage tips, or collaboration — let's connect."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Story & Direct Details */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
            <div className="rounded-3xl bg-[#121218] border border-white/10 p-8 shadow-2xl">
              <h3 className="font-serif text-2xl font-bold text-stone-100 mb-4">
                Let's Exchange Travel Stories
              </h3>
              <p className="text-stone-300 text-sm sm:text-base leading-relaxed mb-8">
                Have questions regarding solo itineraries, high-altitude acclimatization, or general coach travel across central India? I read and respond to every note.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex items-center gap-3 text-stone-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <FaMapMarkerAlt />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block font-mono">Location Base</span>
                    <span className="font-medium text-stone-200">India • Roaming Nationwide</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-stone-300">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400">
                    <FaEnvelope />
                  </div>
                  <div>
                    <span className="text-xs text-stone-400 block font-mono">Email Dispatch</span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="font-medium text-amber-400 hover:underline"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>
              </div>

              {/* Social Channels Strip */}
              <div className="mt-8 pt-6 border-t border-white/10">
                <span className="font-mono text-xs text-stone-400 uppercase tracking-wider block mb-4">
                  Social Channels
                </span>
                <div className="flex gap-3">
                  {socialLinks.map((social) => {
                    const Icon =
                      social.name === "Instagram"
                        ? FaInstagram
                        : social.name === "YouTube"
                        ? FaYoutube
                        : FaLinkedin;
                    return (
                      <a
                        key={social.name}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit Ankit's ${social.name}`}
                        className="w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-stone-300 hover:text-amber-400 hover:border-amber-400/40 hover:bg-white/10 transition-all cursor-pointer"
                      >
                        <Icon size={18} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Glassmorphic Interactive Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-[#121218]/80 border border-white/10 p-8 sm:p-10 shadow-2xl backdrop-blur-2xl relative">
              <form ref={formRef} onSubmit={handleSubmit} className="space-y-6" noValidate>
                {/* Honeypot Spam Field */}
                <input
                  type="text"
                  name="honeypot"
                  value={formState.honeypot}
                  onChange={handleChange}
                  tabIndex={-1}
                  autoComplete="off"
                  className="hidden"
                  aria-hidden="true"
                />

                {/* Name Field */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className="block font-mono text-xs text-stone-400 uppercase tracking-wider mb-2"
                  >
                    Your Name *
                  </label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    disabled={status === "sending"}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                      errors.name ? "border-red-500/80 bg-red-500/5" : "border-white/10 hover:border-white/20"
                    }`}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-400 font-mono flex items-center gap-1">
                      <FaExclamationCircle size={10} /> {errors.name}
                    </p>
                  )}
                </div>

                {/* Email Field */}
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="block font-mono text-xs text-stone-400 uppercase tracking-wider mb-2"
                  >
                    Email Address *
                  </label>
                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    placeholder="e.g. wanderer@domain.com"
                    disabled={status === "sending"}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all ${
                      errors.email ? "border-red-500/80 bg-red-500/5" : "border-white/10 hover:border-white/20"
                    }`}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-400 font-mono flex items-center gap-1">
                      <FaExclamationCircle size={10} /> {errors.email}
                    </p>
                  )}
                </div>

                {/* Message Field */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className="block font-mono text-xs text-stone-400 uppercase tracking-wider mb-2"
                  >
                    Your Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formState.message}
                    onChange={handleChange}
                    placeholder="Share your travel inquiry, advice request, or thoughts..."
                    disabled={status === "sending"}
                    className={`w-full px-4 py-3.5 rounded-xl bg-white/5 border text-stone-100 placeholder-stone-500 focus:outline-none focus:ring-2 focus:ring-amber-500/50 transition-all resize-y ${
                      errors.message ? "border-red-500/80 bg-red-500/5" : "border-white/10 hover:border-white/20"
                    }`}
                  />
                  {errors.message && (
                    <p className="mt-1 text-xs text-red-400 font-mono flex items-center gap-1">
                      <FaExclamationCircle size={10} /> {errors.message}
                    </p>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full py-4 px-8 rounded-full font-serif font-bold text-base tracking-wide bg-gradient-to-r from-amber-500 to-orange-500 text-black shadow-lg shadow-amber-500/25 hover:shadow-amber-500/40 hover:brightness-110 active:scale-[0.98] transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "sending" ? (
                    <>
                      <FaSpinner className="animate-spin" size={16} />
                      <span>Transmitting Message...</span>
                    </>
                  ) : (
                    <>
                      <FaPaperPlane size={14} />
                      <span>Transmit Message</span>
                    </>
                  )}
                </button>

                {/* Feedback Toast Banner */}
                <AnimatePresence>
                  {status === "success" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-300 text-sm flex items-center gap-2.5"
                    >
                      <FaCheckCircle className="text-green-400 shrink-0" size={16} />
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}

                  {status === "error" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-300 text-sm flex items-center gap-2.5"
                    >
                      <FaExclamationCircle className="text-red-400 shrink-0" size={16} />
                      <span>{statusMessage}</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
