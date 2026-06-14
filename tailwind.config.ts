import type { Config } from "tailwindcss";

/**
 * ДИЗАЙН ТОКЕНИ (Source of Truth за цветовете)
 * -------------------------------------------------
 * Premium / dark / tech палитра с висок контраст.
 * - ink:    почти черни тонове за фона (дълбочина без чисто #000)
 * - violet: основен акцент (доверие + технология)
 * - cyan:   вторичен акцент (енергия, "резултат")
 * Контрастът на body текста (slate-300/200) върху ink е > 4.5:1.
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#06060a",
          900: "#0a0a12",
          800: "#10101c",
          700: "#171728",
          600: "#22223a",
        },
        accent: {
          DEFAULT: "#7c5cff", // violet
          soft: "#9a82ff",
          cyan: "#22d3ee",
          lime: "#a3e635",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(124,92,255,0.25), 0 20px 60px -20px rgba(124,92,255,0.45)",
        "glow-cyan":
          "0 0 0 1px rgba(34,211,238,0.25), 0 20px 60px -20px rgba(34,211,238,0.4)",
        card: "0 30px 80px -40px rgba(0,0,0,0.8)",
      },
      backgroundImage: {
        "grid-faint":
          "linear-gradient(to right, rgba(255,255,255,0.035) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.035) 1px, transparent 1px)",
        "radial-accent":
          "radial-gradient(60% 60% at 50% 0%, rgba(124,92,255,0.18) 0%, transparent 70%)",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
        "border-flow": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        shimmer: "shimmer 2.5s infinite",
        "border-flow": "border-flow 6s ease infinite",
      },
    },
  },
  plugins: [],
};

export default config;
