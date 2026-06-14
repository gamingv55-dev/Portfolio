/**
 * Section — обвивка („рафтът“) за всяка секция от сайта.
 * Дава: id за anchor навигация, единен вертикален ритъм,
 * по избор „етикет“ (kicker) + заглавие + подзаглавие.
 *
 * Така всяка секция изглежда подредена и надписана.
 */
import { ReactNode } from "react";
import Reveal from "./Reveal";

type Props = {
  id: string;
  label?: string;
  title?: ReactNode;
  subtitle?: ReactNode;
  children: ReactNode;
  className?: string;
  align?: "left" | "center";
};

export default function Section({
  id,
  label,
  title,
  subtitle,
  children,
  className = "",
  align = "center",
}: Props) {
  const alignment = align === "center" ? "items-center text-center" : "items-start text-left";
  return (
    <section id={id} className={`relative scroll-mt-24 py-24 sm:py-32 ${className}`}>
      <div className="container-page">
        {(label || title || subtitle) && (
          <Reveal className={`mx-auto mb-14 flex max-w-2xl flex-col gap-5 ${alignment}`}>
            {label && <span className="section-label">{label}</span>}
            {title && (
              <h2 className="font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
                {title}
              </h2>
            )}
            {subtitle && (
              <p className="text-base leading-relaxed text-slate-400 sm:text-lg">{subtitle}</p>
            )}
          </Reveal>
        )}
        {children}
      </div>
    </section>
  );
}
