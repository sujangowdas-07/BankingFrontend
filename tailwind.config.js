/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e6f0ff',
          100: '#cce0ff',
          200: '#99c2ff',
          300: '#66a3ff',
          400: '#3385ff',
          500: '#0066ff',
          600: '#0052cc',
          700: '#003d99',
          800: '#002966',
          900: '#001433',
        },
        navy: {
          50: '#e6e9f0',
          100: '#ccd3e0',
          200: '#99a7c2',
          300: '#667ba3',
          400: '#334f85',
          500: '#002366',
          600: '#001c52',
          700: '#00153d',
          800: '#000e29',
          900: '#000714',
        }
      }
    },
  },
  plugins: [],
}
