"use client";

/**
 * =========================== ПОРТФОЛИО ===========================
 *  КАКВО: Доказателство — реални проекти с ЖИВ интерактивен preview.
 *  КЪДЕ:  Сърцето на сайта, след услугите.
 *  КАК:   Карта, която при hover се УГОЛЕМЯВА и показва, че е жива;
 *         реалният сайт е зареден в <iframe> като мащабиран desktop изглед.
 *  ЗАЩО:  Посетителят вижда живия сайт, без да напуска страницата.
 *
 *  Стабилен мащаб: iframe е с ФИКСИРАН размер 1280×800 (16:10), а
 *  „area“ кутията също е 16:10 → нужно е само scale = areaWidth/1280,
 *  за да запълни ТОЧНО (без да разчитаме на измерена височина).
 *
 *  ▸ Линкове се сменят в lib/content.ts (projects[].link).
 *    Реален линк → жив iframe. Placeholder ([PROJECT_X_LINK]) → fallback.
 * =================================================================
 */
import { useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "@/components/ui/Section";
import { projects } from "@/lib/content";
import { External, ArrowRight } from "@/components/ui/Icons";

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [5, -5]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 150, damping: 18 });

  const isPlaceholderLink = project.link.startsWith("[");

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function onLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="relative"
    >
      {/* Wrapper за УГОЛЕМЯВАНЕ при hover (CSS scale → без layout shift; вдигнат z-index) */}
      <div
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{ zIndex: hovered ? 30 : 1 }}
        className={`relative [perspective:1400px] transition-transform duration-300 ease-out ${
          hovered ? "scale-[1.04]" : "scale-100"
        }`}
      >
        {/* Tilt слой */}
        <motion.div
          onMouseMove={onMove}
          style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
          className={`group relative overflow-hidden rounded-3xl border bg-white/[0.03] transition-[border-color,box-shadow] duration-300 ${
            hovered ? "border-accent/40 shadow-glow" : "border-white/10"
          }`}
        >
          {/* Browser лента (в нормален поток) */}
          <div className="flex items-center gap-1.5 border-b border-white/10 bg-ink-900 px-3 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 flex-1 truncate text-[11px] text-slate-400">
              {isPlaceholderLink ? "preview" : project.link.replace(/^https?:\/\//, "")}
            </span>
            {!isPlaceholderLink && (
              <span className="flex items-center gap-1.5 rounded-full bg-accent-cyan/10 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-accent-cyan">
                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent-cyan" />
                На живо
              </span>
            )}
          </div>

          {/* AREA — 16:10 кутия; iframe-ът я запълва 100% (без мащабиране → без race) */}
          <div
            className={`relative aspect-[16/10] overflow-hidden bg-ink-800 ${
              !isPlaceholderLink && hovered ? "cursor-grab active:cursor-grabbing" : ""
            }`}
          >
            {/* Fallback (под iframe-а — докато зарежда / при placeholder) */}
            <div className="absolute inset-0 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
              <div className="absolute inset-0 bg-grid-faint bg-[size:28px_28px] opacity-40" />
              <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
                <p className="font-display text-sm font-semibold text-white/40">{project.name}</p>
                <p className="text-[10px] uppercase tracking-widest text-white/20">
                  {isPlaceholderLink ? "preview" : "зареждане…"}
                </p>
              </div>
            </div>

            {/* ЖИВ iframe — запълва 100% от рамката (CSS, без JS-мащаб).
                Нативен loading="lazy" → браузърът сам отлага зареждането. */}
            {!isPlaceholderLink && (
              <motion.iframe
                src={project.link}
                title={`Преглед на ${project.name}`}
                loading="lazy"
                referrerPolicy="no-referrer"
                sandbox="allow-scripts allow-same-origin allow-popups"
                className="absolute inset-0 h-full w-full border-0 bg-white"
                style={{ pointerEvents: hovered ? "auto" : "none" }}
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                transition={{ duration: 0.5 }}
              />
            )}

            {/* Hint горе-център — показва се при hover, че е интерактивно */}
            {!isPlaceholderLink && (
              <motion.div
                className="pointer-events-none absolute inset-x-0 top-3 z-10 flex justify-center"
                animate={{ opacity: hovered ? 1 : 0, y: hovered ? 0 : -6 }}
                transition={{ duration: 0.25 }}
              >
                <span className="rounded-full bg-ink-950/80 px-3 py-1 text-[11px] font-medium text-white backdrop-blur">
                  Скролни вътре, за да разгледаш
                </span>
              </motion.div>
            )}

            {/* Overlay долу с CTA (pointer-events само върху бутона) */}
            <motion.div
              className="pointer-events-none absolute inset-0 z-10 flex items-end justify-center bg-gradient-to-t from-ink-950 via-ink-950/10 to-transparent p-5"
              animate={{ opacity: hovered ? 1 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {isPlaceholderLink ? (
                <span className="pointer-events-auto rounded-full glass px-4 py-2 text-xs font-medium text-slate-300">
                  Линк скоро ({project.link})
                </span>
              ) : (
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-bold text-ink-950 shadow-card transition-transform hover:scale-105"
                >
                  Отвори сайта
                  <External className="h-4 w-4" />
                </a>
              )}
            </motion.div>
          </div>

          {/* Инфо */}
          <div className="flex items-start justify-between gap-4 p-6">
            <div>
              <span className="text-xs font-medium uppercase tracking-wider text-accent-soft">
                {project.category}
              </span>
              <h3 className="mt-1.5 font-display text-xl font-bold text-white">{project.name}</h3>
              <p className="mt-1 text-sm leading-relaxed text-slate-400">{project.description}</p>
            </div>
            <span className="mt-1 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-white/10 text-slate-300 transition-colors group-hover:border-accent group-hover:text-accent-cyan">
              <ArrowRight className="h-4 w-4" />
            </span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <Section
      id="portfolio"
      label="Портфолио"
      title={<>Резултати, които <span className="text-gradient">говорят сами</span></>}
      subtitle="Наведи курсора върху проект — преглеждаш живия сайт направо тук. После го отвори в нов таб."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
