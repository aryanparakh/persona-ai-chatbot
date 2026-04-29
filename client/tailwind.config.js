/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        mist: "#e2e8f0",
        sand: "#f8fafc",
        coral: "#ff7a59",
        gold: "#f7c873",
        teal: "#74d4c0",
      },
      boxShadow: {
        glow: "0 20px 80px rgba(15, 23, 42, 0.35)",
      },
      keyframes: {
        rise: {
          "0%": { opacity: 0, transform: "translateY(10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        pulseDots: {
          "0%, 80%, 100%": { transform: "scale(0.7)", opacity: 0.4 },
          "40%": { transform: "scale(1)", opacity: 1 },
        },
      },
      animation: {
        rise: "rise 300ms ease-out",
        pulseDots: "pulseDots 1.2s infinite ease-in-out",
      },
      fontFamily: {
        sans: ["'Plus Jakarta Sans'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      backgroundImage: {
        grid: "radial-gradient(circle at 1px 1px, rgba(226, 232, 240, 0.12) 1px, transparent 0)",
      },
    },
  },
  plugins: [],
};

