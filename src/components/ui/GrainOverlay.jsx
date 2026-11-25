"use client";

export default function GrainOverlay() {
  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 pointer-events-none z-[99] bg-noise opacity-40 mix-blend-overlay"
    />
  );
}
