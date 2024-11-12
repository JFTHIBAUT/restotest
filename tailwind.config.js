/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#2f7622',
        secondary: '#f39700',
        accent: '#c5d469',
      },
      fontFamily: {
        'league-spartan': ['League Spartan', 'sans-serif'],
      },
    },
  },
  plugins: [],
};