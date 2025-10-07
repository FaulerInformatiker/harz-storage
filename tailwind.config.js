/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#f0f9ff",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
        },
        accent: {
          50: "#f0fdf4",
          500: "#22c55e",
          600: "#16a34a",
        },
        emerald: {
          600: '#059669', // Original emerald-600 - keep for backgrounds
          700: '#047857', // Darker for text on light backgrounds  
          800: '#065f46', // Even darker for better contrast
        },
        amber: {
          500: '#b45309', // Much darker amber for 4.5:1 contrast
        },
        red: {
          500: '#b91c1c', // Darker red for better contrast
        }
      },
    },
  },
  plugins: [],
};
