/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Inter", "ui-sans-serif", "system-ui"],
      },
      boxShadow: {
        elevated:
          "0 4px 24px -2px rgba(0,0,0,0.08), 0 8px 32px -4px rgba(0,0,0,0.06)",
      },
      backgroundImage: {
        "lux-gradient":
          "linear-gradient(135deg,#0f172a 0%,#1e293b 45%,#334155 100%)",
        "lux-light":
          "linear-gradient(135deg,#ffffff 0%,#f8fafc 60%,#eef2f7 100%)",
      },
    },
  },
  plugins: [],
};
