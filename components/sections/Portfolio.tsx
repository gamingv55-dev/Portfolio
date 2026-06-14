"use client";

/**
 * =========================== ПОРТФОЛИО ===========================
 *  КАКВО: Доказателство — реални проекти с ЖИВ интерактивен preview.
 *  КЪДЕ:  Сърцето на сайта, след услугите.
 *  КАК:   Карта с tilt; при hover „наднича“ в browser window, в който
 *         реалният сайт е зареден в <iframe> (мащабиран desktop изглед).
 *  ЗАЩО:  Посетителят вижда живия сайт, без да напуска страницата.
 *
 *  ▸ Линкове се сменят в lib/content.ts (projects[].link).
 *    Реален линк → жив iframe. Placeholder ([PROJECT_X_LINK]) → fallback.
 *    Сайт, който забранява вграждане (X-Frame-Options), няма да се
 *    показва — тогава сложи screenshot в projects[].image.
 * =================================================================
 */
import { useEffect, useRef, useState } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import Section from "@/components/ui/Section";
import { projects } from "@/lib/content";
import { External, ArrowRight } from "@/components/ui/Icons";

// Базова „desktop“ ширина, която мащабираме надолу до картата.
const BASE_WIDTH = 1280;

function ProjectCard({ project, index }: { project: (typeof projects)[number]; index: number }) {
  const tiltRef = useRef<HTMLDivElement>(null);
  const frameWrapRef = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState(false);
  const [inView, setInView] = useState(false); // lazy mount на iframe
  // Мащаб + логическа височина на iframe-а — изчислени от реалната рамка.
  const [dims, setDims] = useState({ scale: 0.42, height: BASE_WIDTH * (10 / 16) });

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-0.5, 0.5], [6, -6]), { stiffness: 150, damping: 18 });
  const rotY = useSpring(useTransform(mx, [-0.5, 0.5], [-8, 8]), { stiffness: 150, damping: 18 });

  const isPlaceholderLink = project.link.startsWith("[");

  // Мащабиране: измерваме рамката и нагласяме iframe-а да я запълни ТОЧНО.
  // scale = ширина/BASE; логическата височина = видима височина / scale.
  useEffect(() => {
    const el = frameWrapRef.current;
    if (!el) return;
    const update = () => {
      const w = el.clientWidth;
      const h = el.clientHeight;
      if (!w || !h) return;
      const scale = w / BASE_WIDTH;
      setDims({ scale, height: h / scale });
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, [inView]);

  // Зареждаме iframe-а едва когато картата влезе във viewport (производителност).
  useEffect(() => {
    const el = tiltRef.current;
    if (!el || isPlaceholderLink) return;
    const io = new IntersectionObserver(
      ([entry]) => entry.isIntersecting && (setInView(true), io.disconnect()),
      { rootMargin: "200px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, [isPlaceholderLink]);

  function onMove(e: React.MouseEvent<HTMLDivElement>) {
    const r = e.currentTarget.getBoundingClientRect();
    mx.set((e.clientX - r.left) / r.width - 0.5);
    my.set((e.clientY - r.top) / r.height - 0.5);
  }
  function reset() {
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
      className="[perspective:1400px]"
    >
      <motion.div
        ref={tiltRef}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={reset}
        style={{ rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" }}
        className="group relative overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03] transition-colors duration-300 hover:border-white/20"
      >
        {/* PREVIEW „монитор“ */}
        <div className="relative aspect-[16/10] overflow-hidden bg-ink-800" style={{ transform: "translateZ(30px)" }}>
          {/* browser лента */}
          <div className="absolute inset-x-0 top-0 z-20 flex items-center gap-1.5 border-b border-white/10 bg-ink-900/90 px-3 py-2 backdrop-blur">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/70" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-400/70" />
            <span className="ml-2 truncate text-[10px] text-slate-400">
              {isPlaceholderLink ? "preview" : project.link.replace(/^https?:\/\//, "")}
            </span>
          </div>

          {/* Стилизиран fallback (видим под iframe докато зарежда / при placeholder) */}
          <div className="absolute inset-0 top-7 bg-gradient-to-br from-ink-700 via-ink-800 to-ink-900">
            <div className="absolute inset-0 bg-grid-faint bg-[size:28px_28px] opacity-40" />
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
              <p className="font-display text-sm font-semibold text-white/40">{project.name}</p>
              <p className="text-[10px] uppercase tracking-widest text-white/20">
                {isPlaceholderLink ? "preview" : "зареждане…"}
              </p>
            </div>
          </div>

          {/* ЖИВ iframe — мащабиран desktop изглед, интерактивен при hover */}
          {!isPlaceholderLink && (
            <div ref={frameWrapRef} className="absolute inset-x-0 bottom-0 top-7 overflow-hidden">
              {inView && (
                <motion.iframe
                  src={project.link}
                  title={`Преглед на ${project.name}`}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  sandbox="allow-scripts allow-same-origin allow-popups"
                  className="origin-top-left border-0 bg-white"
                  style={{
                    width: BASE_WIDTH,
                    height: dims.height,
                    transform: `scale(${dims.scale})`,
                    pointerEvents: hovered ? "auto" : "none",
                  }}
                  animate={{ opacity: 1 }}
                  initial={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                />
              )}
            </div>
          )}

          {/* Overlay с CTA — pointer-events само върху бутона, за да е скролваем iframe-ът */}
          <motion.div
            className="pointer-events-none absolute inset-0 top-7 z-10 flex items-end justify-center bg-gradient-to-t from-ink-950 via-ink-950/20 to-transparent p-5"
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
                className="pointer-events-auto inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-ink-950 transition-transform hover:scale-105"
              >
                Отвори сайта
                <External className="h-4 w-4" />
              </a>
            )}
          </motion.div>
        </div>

        {/* Инфо */}
        <div className="flex items-start justify-between gap-4 p-6" style={{ transform: "translateZ(20px)" }}>
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
    </motion.div>
  );
}

export default function Portfolio() {
  return (
    <Section
      id="portfolio"
      label="Портфолио"
      title={<>Резултати, които <span className="text-gradient">говорят сами</span></>}
      subtitle="Наведи курсора върху проект, за да разгледаш живия сайт направо тук. После го отвори в нов таб."
    >
      <div className="grid gap-6 md:grid-cols-2">
        {projects.map((project, i) => (
          <ProjectCard key={project.name} project={project} index={i} />
        ))}
      </div>
    </Section>
  );
}
