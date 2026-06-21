/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: "class", // enable class-based dark mode
  theme: {
    extend: {
      colors: {
        "editorial-bg": "var(--color-editorial-bg)",
        "editorial-card": "var(--color-editorial-card)",
        "editorial-text": "var(--color-editorial-text)",
        "editorial-dark-bg": "var(--color-editorial-dark-bg)",
        "editorial-dark-card": "var(--color-editorial-dark-card)",
        "editorial-dark-text": "var(--color-editorial-dark-text)",
      },
      fontFamily: {
        serif: ["EB Garamond", "Georgia", "serif"],
        sans: ["Space Grotesk", "Inter", "sans-serif"],
        mono: ["JetBrains Mono", "ui-monospace", "monospace"],
      },
    },
  },
  plugins: [],
};
