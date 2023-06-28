/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    fontFamily: {
      sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
    }
  },
  darkMode: 'class',
}

// !!! for color variables !!!
// theme: {
//   colors: {
//     primary: 'rgb(var(--color-primary) / <alpha-value>)',
//     secondary: 'rgb(var(--color-secondary) / <alpha-value>)',
//   }
// }
