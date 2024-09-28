/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        rajdhani: ['Rajdhani', 'sans-serif'],
      },
      colors: {
        'navy': '#001F3F',
        'gold': '#E7C967'
      },
    },
  },
  plugins: [],
}

