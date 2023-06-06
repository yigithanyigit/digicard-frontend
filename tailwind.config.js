/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      dropShadow: {
        '3xl': '0 35px 35px rgba(0, 0, 0, 0.25)',
        '4xl': [
          '0 35px 35px rgba(0, 0, 0, 0.25)',
          '0 45px 65px rgba(0, 0, 0, 0.15)'
        ],
        'figma': ['0px 4px 4px rgba(0, 0, 0, 0.25)',]
      },
      colors: {
        'pink-red': '#F34747',
        'bone': '#F9F6EE',
        'back' : '#0F1E35',
      }
    },
  },
  plugins: [],
}