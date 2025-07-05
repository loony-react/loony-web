/** @type {import('tailwindcss').Config} */
import typepography from "@tailwindcss/typography"
export default {
  content: [
    "./src/**/*.{html,js,ts,jsx,tsx}", // Scans your src files for class usage
  ],
  theme: {
    extend: {}, // Customize your theme here if needed
  },
  plugins: [typepography()],
}
