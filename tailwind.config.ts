import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "var(--font-sans)",
          "ui-sans-serif",
          "system-ui",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "Arial",
          "sans-serif"
        ]
      },
      colors: {
        /** CTA / акценты — синий из макета */
        primary: {
          DEFAULT: "var(--primary)",
          hover: "var(--primary-hover)"
        },
        secondary: {
          DEFAULT: "var(--secondary)"
        },
        /** Заголовки и основной текст (#111827) */
        navy: {
          DEFAULT: "var(--navy)",
          hover: "var(--navy-hover)"
        }
      },
      boxShadow: {
        soft: "0 1px 2px rgb(17 24 39 / 0.05), 0 4px 16px rgb(59 130 246 / 0.06)",
        card: "0 1px 3px rgb(17 24 39 / 0.06), 0 8px 24px rgb(17 24 39 / 0.06)"
      }
    }
  },
  plugins: []
} satisfies Config;
