import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        syne: ["var(--font-syne)", "sans-serif"],
        outfit: ["var(--font-outfit)", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
      colors: {
        bg: {
          base: "#09090B",
          card: "#18181B",
          elevated: "#27272A",
        },
        accent: {
          DEFAULT: "#3B82F6",
          light: "rgba(59,130,246,0.15)",
          glow: "rgba(59,130,246,0.4)",
        },
        success: {
          DEFAULT: "#22C55E",
          light: "rgba(34,197,94,0.15)",
        },
        warning: {
          DEFAULT: "#F59E0B",
          light: "rgba(245,158,11,0.15)",
        },
        danger: {
          DEFAULT: "#EF4444",
          light: "rgba(239,68,68,0.15)",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          DEFAULT: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.16)",
        },
      },
      animation: {
        "pulse-dot": "pulse-dot 2s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "log-in": "log-in 0.3s ease forwards",
        "glow-blue": "glow-blue 2s ease-in-out infinite",
        "scan": "scan 6s linear infinite",
        "blink-cursor": "blink-cursor 1s step-end infinite",
        "float": "float 4s ease-in-out infinite",
        "gradient-x": "gradient-x 4s ease infinite",
        "spin-slow": "spin 12s linear infinite",
        "workflow-pulse": "workflow-pulse 2s ease-in-out infinite",
        "counter-up": "counter-up 0.6s ease forwards",
        "slide-in-left": "slide-in-left 0.4s ease forwards",
        "fade-up": "fade-up 0.5s ease forwards",
      },
      keyframes: {
        "pulse-dot": {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.4", transform: "scale(0.8)" },
        },
        "log-in": {
          from: { opacity: "0", transform: "translateX(-8px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "glow-blue": {
          "0%, 100%": { boxShadow: "0 0 12px rgba(59,130,246,0.3)" },
          "50%": { boxShadow: "0 0 28px rgba(59,130,246,0.6), 0 0 48px rgba(59,130,246,0.2)" },
        },
        "scan": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(200%)" },
        },
        "blink-cursor": {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-6px)" },
        },
        "gradient-x": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
        "workflow-pulse": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(59,130,246,0.4)" },
          "50%": { boxShadow: "0 0 0 6px rgba(59,130,246,0)" },
        },
        "counter-up": {
          from: { opacity: "0", transform: "translateY(10px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-20px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(16px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      backgroundImage: {
        "dot-grid": "radial-gradient(circle, rgba(59,130,246,0.12) 1px, transparent 1px)",
        "gradient-blue": "linear-gradient(135deg, #3B82F6, #8B5CF6)",
        "gradient-accent": "linear-gradient(135deg, #3B82F6 0%, #06B6D4 50%, #8B5CF6 100%)",
      },
      backgroundSize: {
        "dot": "24px 24px",
      },
    },
  },
  plugins: [],
};

export default config;
