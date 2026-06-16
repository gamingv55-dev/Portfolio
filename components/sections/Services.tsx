"use client";

/**
 * ============================ УСЛУГИ =============================
 *  КАКВО: Нивата сайтове — от One Page до Cosmic Level.
 *  КЪДЕ:  След проблем/решение — „ето как го правя за теб“.
 *  КАК:   Карти с glow, hover повдигане, reveal stagger, икона/ниво.
 *  ЗАЩО:  Клиентът намира своето ниво и вижда ясна стойност.
 * =================================================================
 */
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import { services } from "@/lib/content";
import { Bolt, Layout, Sparkle, Cube, Check, ArrowRight } from "@/components/ui/Icons";
import { Typewriter } from "@/components/ui/typewriter";

const icons = [Bolt, Layout, Sparkle, Cube];

const accentMap = {
  violet: "from-accent/80 to-accent-soft text-accent-soft",
  cyan: "from-accent-cyan/80 to-cyan-300 text-accent-cyan",
  lime: "from-accent-lime/80 to-lime-300 text-accent-lime",
};

export default function Services() {
  return (
    <Section
      id="services"
      label="Услуги"
      title={
        <>
          Избери нивото, което{" "}
          <span className="text-gradient">
            бизнесът ти{" "}
            <Typewriter
              text={["заслужава", "иска", "търси"]}
              speed={90}
              deleteSpeed={50}
              waitTime={1800}
              initialDelay={400}
              loop={true}
              cursorChar="_"
              cursorClassName="ml-0.5 text-accent-cyan"
            />
          </span>
        </>
      }
      subtitle="От бърз продаващ One Page до high-end изживяване с 3D и motion. Всяко ниво е изградено около една цел — резултат."
    >
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((s, i) => {
          const Icon = icons[i] ?? Bolt;
          const accent = accentMap[s.accent];
          return (
            <motion.article
              key={s.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -8 }}
              className={`group relative flex flex-col rounded-3xl border p-6 transition-colors duration-300 ${
                s.highlight
                  ? "border-accent/40 bg-gradient-to-b from-accent/[0.1] to-transparent shadow-glow"
                  : "border-white/10 bg-white/[0.03] hover:border-white/20"
              }`}
            >
              {s.highlight && (
                <span className="absolute -top-3 left-6 rounded-full bg-gradient-to-r from-accent to-accent-cyan px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white">
                  Най-избиран
                </span>
              )}

              <div className="flex items-center justify-between">
                <span className={`grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br ${accent.split(" text-")[0]} text-white`}>
                  <Icon className="h-6 w-6" />
                </span>
                <span className="font-display text-sm font-semibold text-white/30">{s.tier}</span>
              </div>

              <h3 className="mt-5 font-display text-xl font-bold text-white">{s.name}</h3>
              <p className={`mt-1 text-sm font-medium ${accent.split("text-")[1] ? "text-" + accent.split("text-")[1] : "text-accent-soft"}`}>
                {s.tagline}
              </p>
              <p className="mt-3 text-sm leading-relaxed text-slate-400">{s.description}</p>

              <ul className="mt-5 space-y-2.5 border-t border-white/10 pt-5">
                {s.features.map((f) => (
                  <li key={f} className="flex items-center gap-2.5 text-sm text-slate-300">
                    <Check className="h-4 w-4 shrink-0 text-accent-cyan" />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href="#contact"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition-colors group-hover:text-accent-cyan"
              >
                Запитай за това ниво
                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
              </a>
            </motion.article>
          );
        })}
      </div>
    </Section>
  );
}
