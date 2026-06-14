"use client";

/**
 * ======================= ПРОБЛЕМ / РЕШЕНИЕ =======================
 *  КАКВО: Контраст между „болката“ и „лекарството“.
 *  КЪДЕ:  Веднага след Hero — задържа с разпознаване на проблема.
 *  КАК:   Две колони — проблеми (приглушени) vs решения (акцент).
 *  ЗАЩО:  Посетителят се разпознава → доверява се на решението.
 * =================================================================
 */
import Section from "@/components/ui/Section";
import Reveal from "@/components/ui/Reveal";
import { problemSolution as p } from "@/lib/content";
import { Check } from "@/components/ui/Icons";

export default function ProblemSolution() {
  return (
    <Section id="problem">
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Проблем */}
        <Reveal className="glass rounded-3xl p-8 sm:p-10">
          <span className="section-label !text-slate-400">{p.problemLabel}</span>
          <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
            {p.problemTitle}
          </h2>
          <ul className="mt-8 space-y-5">
            {p.problems.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full border border-red-400/30 bg-red-500/10 text-red-400">
                  <svg viewBox="0 0 24 24" className="h-3.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
                    <path d="M18 6L6 18M6 6l12 12" />
                  </svg>
                </span>
                <div>
                  <p className="font-medium text-slate-200">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-400">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>

        {/* Решение */}
        <Reveal
          delay={0.1}
          className="relative overflow-hidden rounded-3xl border border-accent/30 bg-gradient-to-b from-accent/[0.08] to-transparent p-8 shadow-glow sm:p-10"
        >
          <div className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-accent/20 blur-3xl" />
          <span className="section-label">{p.solutionLabel}</span>
          <h2 className="mt-5 font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
            {p.solutionTitle}
          </h2>
          <ul className="mt-8 space-y-5">
            {p.solutions.map((item) => (
              <li key={item.title} className="flex gap-4">
                <span className="mt-1 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white">
                  <Check className="h-3.5 w-3.5" />
                </span>
                <div>
                  <p className="font-medium text-white">{item.title}</p>
                  <p className="mt-0.5 text-sm leading-relaxed text-slate-300/80">{item.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </Section>
  );
}
