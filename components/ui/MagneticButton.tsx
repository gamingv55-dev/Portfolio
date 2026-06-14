"use client";

/**
 * MagneticButton — бутон, който леко „следва“ курсора (magnetic effect).
 * Рендира се като <a> (за линкове) или <button>.
 * Variant: "primary" (плътен акцент) | "ghost" (стъклен контур).
 */
import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

type Props = {
  children: ReactNode;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "ghost";
  type?: "button" | "submit";
  className?: string;
};

export default function MagneticButton({
  children,
  href,
  onClick,
  variant = "primary",
  type = "button",
  className = "",
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 18 });
  const sy = useSpring(y, { stiffness: 250, damping: 18 });

  function handleMove(e: React.MouseEvent) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const mx = e.clientX - (rect.left + rect.width / 2);
    const my = e.clientY - (rect.top + rect.height / 2);
    x.set(mx * 0.25);
    y.set(my * 0.35);
  }
  function reset() {
    x.set(0);
    y.set(0);
  }

  const base =
    "relative inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-ink-950";

  const variants = {
    primary:
      "text-white bg-gradient-to-r from-accent to-accent-cyan shadow-glow hover:shadow-glow-cyan",
    ghost:
      "text-slate-100 glass hover:bg-white/[0.08] hover:border-white/20",
  };

  const inner = <span className="relative z-10 flex items-center gap-2">{children}</span>;

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={reset}
      style={{ x: sx, y: sy }}
      className="inline-block"
    >
      {href ? (
        <a href={href} className={`${base} ${variants[variant]} ${className}`}>
          {inner}
        </a>
      ) : (
        <button
          type={type}
          onClick={onClick}
          className={`${base} ${variants[variant]} ${className}`}
        >
          {inner}
        </button>
      )}
    </motion.div>
  );
}
