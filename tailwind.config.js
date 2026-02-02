/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "primary": "#2b8cee",
        "primary-hover": "#1a7bd9",
        "background-light": "#f6f7f8",
        "background-dark": "#0b1219",
        "surface-dark": "#16202c",
        "border-dark": "#2d3e50",
        "text-secondary": "#92adc9",
        "success": "#22c55e",
        "danger": "#ef4444",
      },
      fontFamily: {
        "display": ["Inter", "sans-serif"],
        "body": ["Inter", "sans-serif"],
        "mono": ["Roboto Mono", "monospace"],
      },
    },
  },
  plugins: [],
}
