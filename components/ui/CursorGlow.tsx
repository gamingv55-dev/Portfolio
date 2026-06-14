"use client";

/**
 * CursorGlow — мек светлинен ореол, който следва курсора.
 * Декоративен слой (pointer-events-none), сложен веднъж в layout.
 * Изключва се на тъч устройства и при reduced-motion.
 */
import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function CursorGlow() {
  const [enabled, setEnabled] = useState(false);
  const x = useMotionValue(-200);
  const y = useMotionValue(-200);
  const sx = useSpring(x, { stiffness: 120, damping: 20 });
  const sy = useSpring(y, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!fine || reduced) return;
    setEnabled(true);

    const move = (e: MouseEvent) => {
      x.set(e.clientX);
      y.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [x, y]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed z-[5] h-[420px] w-[420px] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={{
        left: sx,
        top: sy,
        background:
          "radial-gradient(circle, rgba(124,92,255,0.14) 0%, rgba(34,211,238,0.06) 40%, transparent 70%)",
      }}
    />
  );
}
