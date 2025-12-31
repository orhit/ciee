/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-bg": "#0b0f19",
        "brand-panel": "#111827",
        "brand-accent": "#3b82f6",
      },
    },
  },
  plugins: [],
};
