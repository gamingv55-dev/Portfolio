"use client";

/**
 * ============================ ПРОЦЕС ============================
 *  КАКВО: Стъпките на работа — от анализ до поддръжка.
 *  КЪДЕ:  След портфолиото — „ето как стигаме до резултата“.
 *  КАК:   Вертикален timeline (вляво) с анимирана линия + reveal.
 *  ЗАЩО:  Сваля несигурността — клиентът вижда ясен, спокоен процес.
 * =================================================================
 */
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Section from "@/components/ui/Section";
import { processSteps } from "@/lib/content";

export default function Process() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "end 70%"],
  });
  const lineScale = useTransform(scrollYProgress, [0, 1], [0, 1]);

  return (
    <Section
      id="process"
      label="Процес"
      title={<>Ясен път от идея до <span className="text-gradient">резултат</span></>}
      subtitle="Без хаос и изненади. Всяка стъпка има цел и те държа информиран през целия процес."
    >
      <div ref={ref} className="relative mx-auto max-w-2xl pl-2">
        {/* Базова линия */}
        <div className="absolute left-[23px] top-3 bottom-3 w-px bg-white/10" />
        {/* Анимирана линия (запълва се при скрол) */}
        <motion.div
          style={{ scaleY: lineScale }}
          className="absolute left-[23px] top-3 bottom-3 w-px origin-top bg-gradient-to-b from-accent via-accent-soft to-accent-cyan"
        />

        <div className="space-y-6">
          {processSteps.map((s, i) => (
            <motion.div
              key={s.step}
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="relative flex items-start gap-5"
            >
              {/* Номер-точка */}
              <span className="relative z-10 grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/15 bg-ink-900 font-display text-sm font-bold text-accent-cyan shadow-glow">
                {s.step}
              </span>
              {/* Карта */}
              <div className="glass flex-1 rounded-2xl p-5 transition-colors duration-200 hover:border-white/20">
                <h3 className="font-display text-lg font-bold text-white">{s.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-slate-400">{s.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </Section>
  );
}
