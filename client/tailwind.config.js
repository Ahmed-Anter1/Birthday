/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        burgundy: {
          700: '#7f1d1d',
          800: '#5c0f0f',
          900: '#3f0808',
        },
      },
    },
  },
  plugins: [],
}