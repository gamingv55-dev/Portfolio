"use client";

/**
 * BrowserMockup — анимиран „browser“ монитор за Hero.
 *  - Tilt спрямо курсора (parallax дълбочина)
 *  - Вътре: мини-рендиран сайт (hero, карти, бутон), който „оживява“
 *  - Реализиран с CSS/SVG + Framer Motion → бързо, без 3D библиотеки
 */
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

export default function BrowserMockup() {
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [8, -8]), { stiffness: 120, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-10, 10]), { stiffness: 120, damping: 18 });

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
    mx.set(0);
    my.set(0);
  }

  return (
    <motion.div
      onMouseMove={onMove}
      onMouseLeave={reset}
      style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
      className="relative mx-auto w-full max-w-md"
    >
      {/* Сияние зад монитора */}
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-accent/30 via-accent-cyan/20 to-transparent blur-2xl" />

      {/* Прозорец на браузъра */}
      <div className="overflow-hidden rounded-2xl border border-white/10 bg-ink-800 shadow-card" style={{ transform: "translateZ(40px)" }}>
        {/* Лента с бутони */}
        <div className="flex items-center gap-2 border-b border-white/10 bg-ink-900 px-4 py-3">
          <span className="h-3 w-3 rounded-full bg-red-400/80" />
          <span className="h-3 w-3 rounded-full bg-yellow-400/80" />
          <span className="h-3 w-3 rounded-full bg-green-400/80" />
          <div className="ml-3 flex-1">
            <div className="flex items-center gap-2 rounded-md bg-white/5 px-3 py-1 text-[11px] text-slate-400">
              <span className="h-2 w-2 rounded-full bg-accent-cyan" />
              your-business.com
            </div>
          </div>
        </div>

        {/* „Рендиран“ сайт вътре */}
        <div className="relative space-y-4 p-5">
          {/* mini nav */}
          <div className="flex items-center justify-between">
            <div className="h-3 w-16 rounded-full bg-white/20" />
            <div className="flex gap-2">
              <div className="h-2.5 w-8 rounded-full bg-white/10" />
              <div className="h-2.5 w-8 rounded-full bg-white/10" />
              <div className="h-2.5 w-10 rounded-full bg-accent/60" />
            </div>
          </div>

          {/* mini hero */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
            className="space-y-2 pt-3"
          >
            <div className="h-4 w-4/5 rounded bg-gradient-to-r from-white/70 to-white/30" />
            <div className="h-4 w-3/5 rounded bg-gradient-to-r from-accent-soft to-accent-cyan" />
            <div className="h-2 w-full rounded bg-white/10" />
            <div className="h-2 w-2/3 rounded bg-white/10" />
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 1.4, duration: 0.5 }}
              className="mt-2 h-7 w-28 origin-left rounded-lg bg-gradient-to-r from-accent to-accent-cyan"
            />
          </motion.div>

          {/* mini cards */}
          <div className="grid grid-cols-3 gap-2 pt-2">
            {[0, 1, 2].map((i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.6 + i * 0.15, duration: 0.5 }}
                className="space-y-1.5 rounded-lg border border-white/10 bg-white/5 p-2.5"
              >
                <div className="h-5 w-5 rounded-md bg-accent/50" />
                <div className="h-1.5 w-full rounded bg-white/15" />
                <div className="h-1.5 w-2/3 rounded bg-white/10" />
              </motion.div>
            ))}
          </div>
        </div>

        {/* shimmer линия — „живо“ зареждане */}
        <div className="relative h-1 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-shimmer bg-gradient-to-r from-transparent via-accent-cyan/60 to-transparent" />
        </div>
      </div>

      {/* Плаваща „performance“ карта */}
      <motion.div
        animate={{ y: [0, -10, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(80px)" }}
        className="absolute -right-4 -top-5 glass rounded-xl px-3 py-2 shadow-glow"
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-400">Lighthouse</p>
        <p className="font-display text-lg font-bold text-accent-cyan">98</p>
      </motion.div>

      {/* Плаваща „конверсия“ карта */}
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        style={{ transform: "translateZ(60px)" }}
        className="absolute -bottom-5 -left-4 glass rounded-xl px-3 py-2"
      >
        <p className="text-[10px] uppercase tracking-wider text-slate-400">Запитвания</p>
        <p className="font-display text-lg font-bold text-white">+42%</p>
      </motion.div>
    </motion.div>
  );
}
