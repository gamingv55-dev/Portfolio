"use client";

/**
 * ============================ КОНТАКТ ============================
 *  КАКВО: Финален CTA + форма за запитване + директни контакти.
 *  КЪДЕ:  Последна секция — тук се случва конверсията.
 *  КАК:   Силен текст вляво, стъклена форма вдясно, success state.
 *  ЗАЩО:  Всичко преди това води точно тук — към действие.
 *
 *  ▸ Формата праща на /api/contact (placeholder). Свържи я с реален
 *    бекенд / имейл услуга (Resend, Formspree, и т.н.) или остави
 *    mailto fallback. Контактите се сменят в lib/content.ts.
 * =================================================================
 */
import { useState } from "react";
import { motion } from "framer-motion";
import Section from "@/components/ui/Section";
import MagneticButton from "@/components/ui/MagneticButton";
import { brand, contact } from "@/lib/content";
import { Mail, Phone, Instagram, ArrowRight, Check } from "@/components/ui/Icons";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const data = Object.fromEntries(new FormData(form));

    try {
      // PLACEHOLDER: свържи с реален endpoint. Демо: симулиран успех.
      await new Promise((r) => setTimeout(r, 900));
      console.log("Запитване:", data);
      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <Section id="contact">
      <div className="grid items-start gap-10 lg:grid-cols-2">
        {/* Лява колона — текст + директни контакти */}
        <div>
          <span className="section-label">{contact.label}</span>
          <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl md:text-5xl">
            {contact.title}
          </h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-slate-400 sm:text-lg">
            {contact.text}
          </p>

          <div className="mt-9 space-y-3">
            <a
              href={`mailto:${brand.email}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/30"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-cyan">
                <Mail className="h-5 w-5" />
              </span>
              <span className="text-sm text-slate-300">{brand.email}</span>
            </a>
            <a
              href={`tel:${brand.phone.replace(/\s/g, "")}`}
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/30"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-cyan">
                <Phone className="h-5 w-5" />
              </span>
              <span className="text-sm text-slate-300">{brand.phone}</span>
            </a>
            <a
              href={brand.socials.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-2xl border border-white/10 bg-white/[0.03] px-5 py-4 transition-colors hover:border-accent/30"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/5 text-accent-cyan">
                <Instagram className="h-5 w-5" />
              </span>
              <span className="text-sm text-slate-300">Instagram</span>
            </a>
          </div>
        </div>

        {/* Дясна колона — форма */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6 }}
          className="glass rounded-3xl p-6 shadow-card sm:p-8"
        >
          {status === "success" ? (
            <div className="flex flex-col items-center justify-center py-16 text-center">
              <span className="grid h-16 w-16 place-items-center rounded-full bg-gradient-to-br from-accent to-accent-cyan text-white">
                <Check className="h-8 w-8" />
              </span>
              <h3 className="mt-5 font-display text-xl font-bold text-white">Благодаря!</h3>
              <p className="mt-2 text-sm text-slate-400">
                Получих запитването ти и ще се свържа с теб възможно най-скоро.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="mt-6 text-sm font-semibold text-accent-cyan hover:underline"
              >
                Изпрати ново запитване
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Име" name="name" type="text" placeholder="Твоето име" required />
                <Field label="Имейл" name="email" type="email" placeholder="ti@email.com" required />
              </div>
              <Field label="Бизнес / уебсайт (по избор)" name="business" type="text" placeholder="Име на бизнеса или линк" />

              <div>
                <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-slate-300">
                  Разкажи накратко за проекта
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  placeholder="Какъв сайт търсиш и каква е целта му?"
                  className="w-full resize-none rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
                />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-400">
                  Нещо се обърка. Опитай отново или ми пиши на {brand.email}.
                </p>
              )}

              <MagneticButton type="submit" variant="primary" className="w-full">
                {status === "loading" ? "Изпращане…" : contact.cta}
                {status !== "loading" && <ArrowRight className="h-4 w-4" />}
              </MagneticButton>
            </form>
          )}
        </motion.div>
      </div>
    </Section>
  );
}

/** Малко поле с label — за консистентност и достъпност. */
function Field({
  label,
  name,
  type,
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  required?: boolean;
}) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-slate-300">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-ink-900/60 px-4 py-3 text-sm text-white placeholder:text-slate-500 transition-colors focus:border-accent focus:outline-none focus:ring-2 focus:ring-accent/30"
      />
    </div>
  );
}
