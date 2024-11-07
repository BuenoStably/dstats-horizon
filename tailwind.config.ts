import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        primary: "#8702ff",
        background: "#1211C", // Updated background color
        surface: "rgba(255, 255, 255, 0.05)",
        card: "rgba(255, 255, 255, 0.05)",
        "card-hover": "rgba(255, 255, 255, 0.08)",
        text: {
          primary: "#ffffff",
          secondary: "#a0a0a0",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;