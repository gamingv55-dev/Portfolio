/**
 * Icons — leки SVG икони (Lucide-style), без emoji.
 * Всички ползват currentColor и viewBox 24x24 за консистентен размер.
 */
type IconProps = { className?: string };
const base = "h-6 w-6";

export const ArrowRight = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

export const Check = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 6L9 17l-5-5" />
  </svg>
);

export const Bolt = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M13 2L3 14h7l-1 8 10-12h-7l1-8z" />
  </svg>
);

export const Layout = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="3" y="3" width="18" height="18" rx="2" /><path d="M3 9h18M9 21V9" />
  </svg>
);

export const Search = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="11" cy="11" r="8" /><path d="M21 21l-4.3-4.3" />
  </svg>
);

export const Sparkle = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2 2M16 16l2 2M18 6l-2 2M8 16l-2 2" />
  </svg>
);

export const Shield = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

export const Cube = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 16V8l-9-5-9 5v8l9 5 9-5z" /><path d="M3.3 7.5L12 12.5l8.7-5M12 22V12.5" />
  </svg>
);

export const Mail = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" /><path d="M22 7l-10 6L2 7" />
  </svg>
);

export const Phone = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 16.9v3a2 2 0 01-2.2 2 19.8 19.8 0 01-8.6-3 19.5 19.5 0 01-6-6 19.8 19.8 0 01-3-8.6A2 2 0 014.1 2h3a2 2 0 012 1.7c.1.9.4 1.8.7 2.7a2 2 0 01-.5 2.1L8.1 9.8a16 16 0 006 6l1.3-1.3a2 2 0 012.1-.4c.9.3 1.8.6 2.7.7a2 2 0 011.7 2z" />
  </svg>
);

export const Instagram = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

export const Behance = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M8.2 7.6c.6 0 1.2 0 1.7.2.5.1.9.3 1.3.5.3.3.6.6.8 1 .2.5.3 1 .3 1.5 0 .6-.2 1.1-.4 1.5-.3.4-.7.7-1.2 1 .7.2 1.2.5 1.6 1 .3.5.5 1.1.5 1.8 0 .6-.1 1.1-.3 1.5-.2.4-.5.8-.9 1-.4.3-.8.5-1.4.6-.5.1-1 .2-1.6.2H2V7.6h6.2zM7.8 11.9c.5 0 .9-.1 1.2-.3.3-.2.4-.6.4-1 0-.3 0-.5-.1-.6-.1-.2-.2-.3-.4-.4-.2-.1-.4-.1-.6-.2H4.9v2.6h2.9zm.2 4.5c.3 0 .5 0 .7-.1.2 0 .4-.1.5-.2.2-.1.3-.3.4-.4.1-.2.1-.4.1-.7 0-.5-.1-.9-.4-1.1-.3-.2-.7-.3-1.2-.3H4.9v2.9h3.1zM16.5 16.3c.3.3.8.5 1.4.5.4 0 .8-.1 1.1-.3.3-.2.5-.4.6-.7h2c-.3 1-.8 1.7-1.5 2.2-.7.4-1.5.6-2.4.6-.7 0-1.3-.1-1.8-.3-.5-.2-1-.5-1.3-.9-.4-.4-.6-.9-.8-1.4-.2-.6-.3-1.2-.3-1.8 0-.6.1-1.2.3-1.8.2-.5.5-1 .9-1.4.4-.4.8-.7 1.3-.9.5-.2 1.1-.3 1.7-.3.7 0 1.3.1 1.8.4.5.3.9.6 1.3 1.1.3.5.6 1 .7 1.5.1.6.2 1.2.1 1.8h-5.9c0 .7.2 1.3.5 1.6zm2.4-4.3c-.3-.3-.7-.4-1.2-.4-.4 0-.7.1-.9.2-.2.1-.4.3-.6.5-.1.2-.2.4-.3.6 0 .2-.1.3-.1.5h3.6c-.1-.7-.3-1.1-.5-1.4zM15.3 8.7h4.5v1.1h-4.5z" />
  </svg>
);

export const LinkedIn = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.4 3H3.6A.6.6 0 003 3.6v16.8a.6.6 0 00.6.6h16.8a.6.6 0 00.6-.6V3.6a.6.6 0 00-.6-.6zM8.3 18.3H5.5V9.4h2.8v8.9zM6.9 8.2a1.6 1.6 0 110-3.3 1.6 1.6 0 010 3.3zm11.4 10.1h-2.8v-4.3c0-1 0-2.4-1.4-2.4s-1.6 1.1-1.6 2.3v4.4H9.7V9.4h2.7v1.2h.1c.4-.7 1.3-1.5 2.6-1.5 2.8 0 3.3 1.9 3.3 4.3v4.9z" />
  </svg>
);

export const Menu = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 6h16M4 12h16M4 18h16" />
  </svg>
);

export const Close = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

export const External = ({ className = base }: IconProps) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M15 3h6v6M10 14L21 3M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
  </svg>
);
