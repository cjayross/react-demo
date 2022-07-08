/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*.{ts,tsx}', './src/**/*.{ts,tsx}'],
  corePlugins: {
    preflight: false,
  },
  important: '#__next',
  theme: {
    extend: {
      colors: {
        bg: '#fffdf9',
        primary: '#191919',
        secondary: '#ed574a',
        success: '#4bb543',
      },
      opacity: {
        disabled: '.38',
      },
    },
  },
  plugins: [],
};
