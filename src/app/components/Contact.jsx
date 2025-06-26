"use client";

import { useRef, useState } from "react";
import emailjs from "@emailjs/browser";

export default function Contact() {
  const form = useRef();
  const [sent, setSent] = useState(false);

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_9qwo6bl",
        "template_jx31o8c",
        form.current,
        "3H9Ly3WS_3mJTf_wp"
      )
      .then(
        () => {
          setSent(true);
          form.current.reset();
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <section
      id="contact"
      className="p-8 sm:p-20 bg-gradient-to-b from-black via-gray-900 to-black text-white"
    >
      <h2 className="text-3xl font-bold mb-8 text-center">Contact Me</h2>
      <p className="text-center max-w-2xl mx-auto mb-6">
        Have questions about my travels? Want tips for your own adventures? Feel free to
        reach out — I'd love to connect with fellow travelers!
      </p>

      <form
        ref={form}
        onSubmit={sendEmail}
        className="max-w-xl mx-auto grid gap-6"
      >
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          required
          className="px-4 py-3 rounded bg-gray-100 text-black w-full"
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          required
          className="px-4 py-3 rounded bg-gray-100 text-black w-full"
        />
        <textarea
          name="message"
          rows="5"
          placeholder="Your Message"
          required
          className="px-4 py-3 rounded bg-gray-100 text-black w-full"
        ></textarea>
        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-semibold"
        >
          Send Message
        </button>
        {sent && (
          <p className="text-green-400 text-center font-medium mt-2">
            Message sent successfully!
          </p>
        )}
      </form>
    </section>
  );
}