// tailwind.config.js
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-lightest': '#E6FFFF',
        'brand-lighter': '#CCF5F5',
        'brand-light': '#B3EBEB',
        'brand-base': '#99E0E0',
        'brand-dark': '#66C7C7',
      },
    },
  },
  plugins: [],
};
