export default function Badge({
  children,
  variant = "amber",
  className = "",
}) {
  const variants = {
    amber: "bg-amber-500/10 border-amber-500/20 text-amber-400",
    teal: "bg-teal-500/10 border-teal-500/20 text-teal-300",
    stone: "bg-white/5 border-white/10 text-stone-300",
    outline: "bg-transparent border-white/20 text-stone-300",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-mono font-medium border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
