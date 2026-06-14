/**
 * Footer — затваря сайта с бранд, навигация и social линкове.
 */
import { brand, navLinks } from "@/lib/content";
import { Instagram, Behance, LinkedIn, Mail } from "@/components/ui/Icons";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-white/10 py-14">
      <div className="container-page">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <div className="flex items-center gap-2.5">
              <span className="grid h-9 w-9 place-items-center rounded-xl bg-gradient-to-br from-accent to-accent-cyan font-display text-sm font-bold text-white">
                {brand.name.charAt(0)}
              </span>
              <span className="font-display text-lg font-semibold text-white">{brand.name}</span>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-slate-400">
              {brand.role}. Изграждам сайтове, които превръщат вниманието в клиенти.
            </p>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3" aria-label="Footer навигация">
            {navLinks.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-slate-400 transition-colors hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>

          <div className="flex gap-3">
            {[
              { Icon: Instagram, href: brand.socials.instagram, label: "Instagram" },
              { Icon: Behance, href: brand.socials.behance, label: "Behance" },
              { Icon: LinkedIn, href: brand.socials.linkedin, label: "LinkedIn" },
              { Icon: Mail, href: `mailto:${brand.email}`, label: "Имейл" },
            ].map(({ Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="grid h-11 w-11 place-items-center rounded-xl text-slate-300 transition-colors duration-200 glass hover:border-white/20 hover:text-white"
              >
                <Icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} {brand.name}. Всички права запазени.</p>
          <p>Проектиран и разработен с фокус върху резултата.</p>
        </div>
      </div>
    </footer>
  );
}
