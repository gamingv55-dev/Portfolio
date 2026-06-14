"use client";

/**
 * ============================== HERO ==============================
 *  КАКВО: Първото впечатление — силно послание + CTA + визуализация.
 *  КЪДЕ:  Най-горе, веднага след navbar.
 *  КАК:   Голямо заглавие с градиентен акцент, два CTA бутона,
 *         статистики и анимиран „browser“ монитор (code → website).
 *  ЗАЩО:  Да убеди за < 5 секунди, че сайтът означава резултат.
 * =================================================================
 */
import { motion } from "framer-motion";
import { hero } from "@/lib/content";
import MagneticButton from "@/components/ui/MagneticButton";
import { ArrowRight, Sparkle } from "@/components/ui/Icons";
import BrowserMockup from "./BrowserMockup";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
};
const item = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export default function Hero() {
  return (
    <section
      id="hero"
      className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28"
    >
      {/* Фонови акценти */}
      <div className="pointer-events-none absolute inset-0 bg-radial-accent" />
      <div className="pointer-events-none absolute inset-0 bg-grid-faint bg-[size:48px_48px] [mask-image:radial-gradient(70%_60%_at_50%_0%,black,transparent)]" />

      <div className="container-page relative grid items-center gap-16 lg:grid-cols-[1.05fr_1fr]">
        {/* Лява колона: текст */}
        <motion.div variants={container} initial="hidden" animate="show" className="flex flex-col items-start">
          <motion.span variants={item} className="section-label">
            <Sparkle className="h-3.5 w-3.5" />
            {hero.badge}
          </motion.span>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.08] tracking-tight text-white sm:text-5xl md:text-6xl"
          >
            {hero.titleLines.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
            <span className="block text-gradient">{hero.titleAccent}</span>
          </motion.h1>

          <motion.p
            variants={item}
            className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 sm:text-lg"
          >
            {hero.subtitle}
          </motion.p>

          <motion.div variants={item} className="mt-9 flex flex-wrap items-center gap-4">
            <MagneticButton href={hero.primaryCta.href} variant="primary">
              {hero.primaryCta.label}
              <ArrowRight className="h-4 w-4" />
            </MagneticButton>
            <MagneticButton href={hero.secondaryCta.href} variant="ghost">
              {hero.secondaryCta.label}
            </MagneticButton>
          </motion.div>

          {/* Статистики */}
          <motion.dl variants={item} className="mt-12 grid w-full max-w-md grid-cols-3 gap-4">
            {hero.stats.map((s) => (
              <div key={s.label} className="glass rounded-2xl px-4 py-4 text-center">
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-display text-2xl font-bold text-white">{s.value}</dd>
                <dd className="mt-1 text-xs text-slate-400">{s.label}</dd>
              </div>
            ))}
          </motion.dl>
        </motion.div>

        {/* Дясна колона: анимиран монитор */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateY: -12 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="relative [perspective:1400px]"
        >
          <BrowserMockup />
        </motion.div>
      </div>
    </section>
  );
}
