/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brandText: '#111827',   // Main text color
        gradStart: '#4F46E5',   // Gradient shuru hone ka color
        gradEnd: '#7C3AED',     // Gradient khatam hone ka color
      },
    },
  },
  plugins: [],
}
