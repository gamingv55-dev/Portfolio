"use client";

/**
 * =========================== ЗАЩО АЗ ============================
 *  КАКВО: Доверие — философията и подходът зад работата.
 *  КЪДЕ:  След процеса — затвърждава „на този човек можеш да вярваш“.
 *  КАК:   Bento grid с акценти и фин hover glow.
 *  ЗАЩО:  Хората купуват от хора, на които вярват.
 * =================================================================
 */
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { whyMe } from "@/lib/content";
import { Shield } from "@/components/ui/Icons";

export default function WhyMe() {
  return (
    <Section
      id="why"
      label="Защо аз"
      title={<>Не просто сайт — <span className="text-gradient">правилният сайт</span></>}
      subtitle="Разликата между „нещо онлайн“ и инструмент, който работи за бизнеса ти всеки ден."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {whyMe.map((w, i) => (
          <motion.div
            key={w.title}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
            className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] p-7 transition-colors duration-300 hover:border-accent/40"
          >
            <div className="pointer-events-none absolute -right-12 -top-12 h-40 w-40 rounded-full bg-accent/10 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100" />
            <span className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-accent/80 to-accent-cyan/80 text-white">
              <Shield className="h-6 w-6" />
            </span>
            <h3 className="mt-5 font-display text-xl font-bold text-white">{w.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-slate-400">{w.text}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
