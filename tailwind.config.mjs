/** @type {import('tailwindcss').Config} */
import tailwindcssTypepography from "@tailwindcss/typography"

export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}",
    "./packages/**/*.{html,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        /* Legacy tokens — kept for backward compat */
        navbar: "#111111",
        body: "#0d0d0d",
        cardTop: "#1a1a1a",
        cardBot: "#1a1a1a",

        /* Design system surfaces */
        surface: {
          0: "#0d0d0d",
          1: "#111111",
          2: "#1a1a1a",
          3: "#212121",
        },

        /* Borders */
        border: {
          DEFAULT: "rgba(255,255,255,0.08)",
          strong: "rgba(255,255,255,0.16)",
        },

        /* Accent */
        accent: {
          DEFAULT: "#10a37f",
          hover: "#0d8c6e",
        },

        /* Text */
        text: {
          primary: "#ececec",
          secondary: "#9b9ba4",
          muted: "#6b6b76",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "sans-serif"],
      },
      transitionDuration: {
        DEFAULT: "150ms",
      },
    },
  },
  plugins: [tailwindcssTypepography],
}
