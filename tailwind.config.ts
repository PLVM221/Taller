import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#16231f",
        canvas: "#f3f5f1",
        brand: {
          50: "#eefbf5",
          100: "#d7f4e5",
          500: "#1aa36f",
          600: "#11845a",
          700: "#0d6a49",
          900: "#0b3f30"
        },
        amber: "#f6b94a"
      },
      fontFamily: {
        sans: ["var(--font-manrope)", "sans-serif"],
        display: ["var(--font-space)", "sans-serif"]
      },
      boxShadow: {
        card: "0 1px 2px rgba(16,24,20,.04), 0 8px 28px rgba(16,24,20,.06)"
      }
    }
  },
  plugins: []
} satisfies Config;
