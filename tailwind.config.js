/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        krona: ['"Krona One"', 'sans-serif'],
      },
      colors: {
        'gradient-start': '#E9C77F',
        'gradient-end': '#FBE6B7',
      },
    },
  },
  plugins: [],
}
