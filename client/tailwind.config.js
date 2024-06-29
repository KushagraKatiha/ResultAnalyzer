/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          100: '#2d2d2d',
          200: '#262626',
          300: '#1f1f1f',
          400: '#191919',
          500: '#141414',
          600: '#0f0f0f',
          700: '#0a0a0a',
          800: '#050505',
          900: '#000000',
        },
      },
    },
  },
  plugins: [],
};
