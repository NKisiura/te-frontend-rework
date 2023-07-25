/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/**/*.{html,ts}'],
  theme: {
    fontFamily: {
      sans: ['"Helvetica Neue"', 'Helvetica', 'Arial', 'sans-serif'],
    },
    colors: {
      transparent: 'transparent',
      black: 'rgb(0 0 0 / <alpha-value>)',
      white: 'rgb(255 255 255 / <alpha-value>)',
      gray: {
        100: 'rgb(var(--gray-100) / <alpha-value>)',
        200: 'rgb(var(--gray-200) / <alpha-value>)',
        300: 'rgb(var(--gray-300) / <alpha-value>)',
        400: 'rgb(var(--gray-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--gray) / <alpha-value>)',
        600: 'rgb(var(--gray-600) / <alpha-value>)',
        700: 'rgb(var(--gray-700) / <alpha-value>)',
        800: 'rgb(var(--gray-800) / <alpha-value>)',
        900: 'rgb(var(--gray-900) / <alpha-value>)',
      },
      secondary: {
        100: 'rgb(var(--secondary-100) / <alpha-value>)',
        200: 'rgb(var(--secondary-200) / <alpha-value>)',
        300: 'rgb(var(--secondary-300) / <alpha-value>)',
        400: 'rgb(var(--secondary-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--secondary) / <alpha-value>)',
        600: 'rgb(var(--secondary-600) / <alpha-value>)',
        700: 'rgb(var(--secondary-700) / <alpha-value>)',
        800: 'rgb(var(--secondary-800) / <alpha-value>)',
        900: 'rgb(var(--secondary-900) / <alpha-value>)',
      },
      primary: {
        100: 'rgb(var(--primary-100) / <alpha-value>)',
        200: 'rgb(var(--primary-200) / <alpha-value>)',
        300: 'rgb(var(--primary-300) / <alpha-value>)',
        400: 'rgb(var(--primary-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
        600: 'rgb(var(--primary-600) / <alpha-value>)',
        700: 'rgb(var(--primary-700) / <alpha-value>)',
        800: 'rgb(var(--primary-800) / <alpha-value>)',
        900: 'rgb(var(--primary-900) / <alpha-value>)',
      },
      info: {
        100: 'rgb(var(--info-100) / <alpha-value>)',
        200: 'rgb(var(--info-200) / <alpha-value>)',
        300: 'rgb(var(--info-300) / <alpha-value>)',
        400: 'rgb(var(--info-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--info) / <alpha-value>)',
        600: 'rgb(var(--info-600) / <alpha-value>)',
        700: 'rgb(var(--info-700) / <alpha-value>)',
        800: 'rgb(var(--info-800) / <alpha-value>)',
        900: 'rgb(var(--info-900) / <alpha-value>)',
      },
      blue: {
        100: 'rgb(var(--blue-100) / <alpha-value>)',
        200: 'rgb(var(--blue-200) / <alpha-value>)',
        300: 'rgb(var(--blue-300) / <alpha-value>)',
        400: 'rgb(var(--blue-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--blue) / <alpha-value>)',
        600: 'rgb(var(--blue-600) / <alpha-value>)',
        700: 'rgb(var(--blue-700) / <alpha-value>)',
        800: 'rgb(var(--blue-800) / <alpha-value>)',
        900: 'rgb(var(--blue-900) / <alpha-value>)',
      },
      success: {
        100: 'rgb(var(--success-100) / <alpha-value>)',
        200: 'rgb(var(--success-200) / <alpha-value>)',
        300: 'rgb(var(--success-300) / <alpha-value>)',
        400: 'rgb(var(--success-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--success) / <alpha-value>)',
        600: 'rgb(var(--success-600) / <alpha-value>)',
        700: 'rgb(var(--success-700) / <alpha-value>)',
        800: 'rgb(var(--success-800) / <alpha-value>)',
        900: 'rgb(var(--success-900) / <alpha-value>)',
      },
      warning: {
        100: 'rgb(var(--warning-100) / <alpha-value>)',
        200: 'rgb(var(--warning-200) / <alpha-value>)',
        300: 'rgb(var(--warning-300) / <alpha-value>)',
        400: 'rgb(var(--warning-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--warning) / <alpha-value>)',
        600: 'rgb(var(--warning-600) / <alpha-value>)',
        700: 'rgb(var(--warning-700) / <alpha-value>)',
        800: 'rgb(var(--warning-800) / <alpha-value>)',
        900: 'rgb(var(--warning-900) / <alpha-value>)',
      },
      cyan: {
        100: 'rgb(var(--cyan-100) / <alpha-value>)',
        200: 'rgb(var(--cyan-200) / <alpha-value>)',
        300: 'rgb(var(--cyan-300) / <alpha-value>)',
        400: 'rgb(var(--cyan-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--cyan) / <alpha-value>)',
        600: 'rgb(var(--cyan-600) / <alpha-value>)',
        700: 'rgb(var(--cyan-700) / <alpha-value>)',
        800: 'rgb(var(--cyan-800) / <alpha-value>)',
        900: 'rgb(var(--cyan-900) / <alpha-value>)',
      },
      danger: {
        100: 'rgb(var(--danger-100) / <alpha-value>)',
        200: 'rgb(var(--danger-200) / <alpha-value>)',
        300: 'rgb(var(--danger-300) / <alpha-value>)',
        400: 'rgb(var(--danger-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--danger) / <alpha-value>)',
        600: 'rgb(var(--danger-600) / <alpha-value>)',
        700: 'rgb(var(--danger-700) / <alpha-value>)',
        800: 'rgb(var(--danger-800) / <alpha-value>)',
        900: 'rgb(var(--danger-900) / <alpha-value>)',
      },
      purple: {
        100: 'rgb(var(--purple-100) / <alpha-value>)',
        200: 'rgb(var(--purple-200) / <alpha-value>)',
        300: 'rgb(var(--purple-300) / <alpha-value>)',
        400: 'rgb(var(--purple-400) / <alpha-value>)',
        DEFAULT: 'rgb(var(--purple) / <alpha-value>)',
        600: 'rgb(var(--purple-600) / <alpha-value>)',
        700: 'rgb(var(--purple-700) / <alpha-value>)',
        800: 'rgb(var(--purple-800) / <alpha-value>)',
        900: 'rgb(var(--purple-900) / <alpha-value>)',
      },
    },
  },
  darkMode: 'class',
};
