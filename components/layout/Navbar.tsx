"use client";

/**
 * Navbar — изпипан, „крафтнат“ navbar (не generic AI бар).
 *  - Лого монограм с „наличен“ индикатор и фин hover
 *  - Центрирани линкове в стъклена капсула с ПЛЪЗГАЩ СЕ индикатор
 *    (Framer layoutId), който следва hover-а и активната секция
 *  - Плавно сгъстяване при скрол (не рязко появяващо се поле)
 *  - Mobile sheet меню
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, navLinks } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import { Menu, Close, ArrowRight } from "@/components/ui/Icons";

// id-тата на секциите, към които сочат линковете (за scroll-spy)
const sectionIds = navLinks.map((l) => l.href.replace("#", ""));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [hovered, setHovered] = useState<number | null>(null);
  const [active, setActive] = useState<number>(-1);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
      // Scroll-spy: коя секция е най-горе в изгледа
      let current = -1;
      sectionIds.forEach((id, i) => {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 140) current = i;
      });
      setActive(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Кой линк да е подчертан: hover има приоритет, иначе активната секция
  const current = hovered !== null ? hovered : active;

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-full border py-2 pl-3 pr-2 transition-[background-color,border-color,box-shadow,padding] duration-500 sm:pl-4 ${
          scrolled
            ? "border-white/10 bg-ink-900/70 shadow-card backdrop-blur-xl"
            : "border-white/[0.06] bg-white/[0.02] backdrop-blur-md"
        }`}
        aria-label="Основна навигация"
      >
        {/* Лого */}
        <a href="#hero" className="group flex items-center gap-2.5 pr-2">
          <span className="relative grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan font-display text-sm font-bold text-white shadow-glow transition-transform duration-300 group-hover:scale-105">
            {brand.name.charAt(0)}
            {/* фина рамка/блясък */}
            <span className="pointer-events-none absolute inset-0 rounded-xl ring-1 ring-inset ring-white/20" />
            {/* „наличен за проекти“ индикатор */}
            <span className="absolute -bottom-0.5 -right-0.5 flex h-3 w-3 items-center justify-center">
              <span className="absolute h-3 w-3 animate-ping rounded-full bg-emerald-400/60" />
              <span className="h-2 w-2 rounded-full bg-emerald-400 ring-2 ring-ink-950" />
            </span>
          </span>
          <span className="flex flex-col leading-none">
            <span className="font-display text-base font-semibold tracking-tight text-white">
              {brand.name}
            </span>
            <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.22em] text-slate-500 transition-colors group-hover:text-accent-soft">
              свободен за проекти
            </span>
          </span>
        </a>

        {/* Desktop линкове — капсула с плъзгащ се индикатор */}
        <ul
          className="relative hidden items-center gap-0.5 lg:flex"
          onMouseLeave={() => setHovered(null)}
        >
          {navLinks.map((l, i) => (
            <li key={l.href} className="relative" onMouseEnter={() => setHovered(i)}>
              <a
                href={l.href}
                className={`relative z-10 inline-block rounded-full px-3.5 py-2 text-sm transition-colors duration-200 ${
                  current === i ? "text-white" : "text-slate-300 hover:text-white"
                }`}
              >
                {l.label}
              </a>
              {current === i && (
                <motion.span
                  layoutId="nav-indicator"
                  className="absolute inset-0 rounded-full bg-white/[0.08] ring-1 ring-inset ring-white/10"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                >
                  {/* тънка акцентна чертичка отдолу */}
                  <span className="absolute -bottom-px left-1/2 h-px w-5 -translate-x-1/2 rounded-full bg-gradient-to-r from-accent to-accent-cyan" />
                </motion.span>
              )}
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <MagneticButton href="#contact" variant="primary" className="!px-5 !py-2.5">
              Започни проект
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
          </div>
          {/* Mobile toggle */}
          <button
            onClick={() => setOpen((v) => !v)}
            className="grid h-10 w-10 place-items-center rounded-xl text-slate-200 transition-colors hover:bg-white/5 lg:hidden"
            aria-label={open ? "Затвори менюто" : "Отвори менюто"}
            aria-expanded={open}
          >
            {open ? <Close className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile меню */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute inset-x-4 top-20 z-40 lg:hidden"
          >
            <div className="glass flex flex-col gap-1 rounded-2xl p-3 shadow-card">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setOpen(false)}
                  className="rounded-xl px-4 py-3 text-sm text-slate-200 transition-colors hover:bg-white/5 hover:text-white"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setOpen(false)}
                className="mt-2 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Започни проект
                <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
