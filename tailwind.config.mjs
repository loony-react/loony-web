/** @type {import('tailwindcss').Config} */
import tailwindcssTypepography from "@tailwindcss/typography"
export default {
  darkMode: "class",
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Scans your src files for class usage
  ],
  theme: {
    extend: {
      colors: {
        navbar: "#131313",
        body: "#212121",
        cardTop: "#262626",
        cardBot: "#2e2e2e",
      },
    },
  },
  plugins: [tailwindcssTypepography],
}
