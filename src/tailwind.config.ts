import type { Config } from "tailwindcss";
import { colors } from "./theme";

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: colors.border,
        input: colors.border,
        ring: colors.primary,
        background: colors.background,
        surface: colors.surface,
        card: colors.card,
        "card-hover": colors.cardHover,
        foreground: colors.textPrimary,
        primary: colors.primary,
        "text-primary": colors.textPrimary,
        secondary: {
          DEFAULT: colors.secondary,
          foreground: colors.textSecondary,
        },
        destructive: {
          DEFAULT: colors.error,
          foreground: colors.textPrimary,
        },
        muted: {
          DEFAULT: colors.textMuted,
          foreground: colors.textSecondary,
        },
        accent: {
          DEFAULT: colors.primaryLight,
          foreground: colors.textPrimary,
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
