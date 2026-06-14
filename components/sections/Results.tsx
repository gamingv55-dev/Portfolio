"use client";

/**
 * ======================= РЕЗУЛТАТИ / ПОЛЗИ =======================
 *  КАКВО: Конкретно какво получава клиентът.
 *  КЪДЕ:  Преди контакта — последен тласък преди решението.
 *  КАК:   Списък с чек-икони + reveal stagger, на акцентен фон.
 *  ЗАЩО:  Превежда „дизайн“ в осезаема бизнес стойност.
 * =================================================================
 */
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { benefits } from "@/lib/content";
import { Check } from "@/components/ui/Icons";

export default function Results() {
  return (
    <Section
      id="results"
      label="Резултати"
      title={<>Какво печелиш <span className="text-gradient">реално</span></>}
      subtitle="Сайтът не е разход. Това е активът, който работи за теб 24/7."
    >
      <div className="grid gap-4 sm:grid-cols-2">
        {benefits.map((b, i) => (
          <motion.div
            key={b}
            initial={{ opacity: 0, x: -16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-40px" }}
            transition={{ duration: 0.45, delay: i * 0.05 }}
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors duration-200 hover:border-accent/30 hover:bg-white/[0.05]"
          >
            <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white">
              <Check className="h-4 w-4" />
            </span>
            <p className="text-sm font-medium text-slate-200 sm:text-base">{b}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
