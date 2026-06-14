"use client";

/**
 * Navbar — плаващ, стъклен navbar с premium усещане.
 * - Появява се фон при скрол (по-четим)
 * - Магнитен CTA отдясно
 * - Mobile меню (sheet) с Framer Motion
 */
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { brand, navLinks } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import { Menu, Close } from "@/components/ui/Icons";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex justify-center px-4 pt-4">
      <nav
        className={`flex w-full max-w-6xl items-center justify-between rounded-2xl px-4 py-3 transition-all duration-300 sm:px-6 ${
          scrolled ? "glass shadow-card" : "border border-transparent"
        }`}
        aria-label="Основна навигация"
      >
        {/* Лого */}
        <a href="#hero" className="group flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan font-display text-sm font-bold text-white shadow-glow">
            {brand.name.charAt(0)}
          </span>
          <span className="font-display text-lg font-semibold tracking-tight text-white">
            {brand.name}
          </span>
        </a>

        {/* Desktop линкове */}
        <ul className="hidden items-center gap-1 lg:flex">
          {navLinks.map((l) => (
            <li key={l.href}>
              <a
                href={l.href}
                className="rounded-full px-3.5 py-2 text-sm text-slate-300 transition-colors duration-200 hover:bg-white/5 hover:text-white"
              >
                {l.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <div className="hidden sm:block">
            <MagneticButton href="#contact" variant="primary" className="!px-5 !py-2.5">
              Започни проект
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
                className="mt-2 rounded-xl bg-gradient-to-r from-accent to-accent-cyan px-4 py-3 text-center text-sm font-semibold text-white"
              >
                Започни проект
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
