/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{html,js,jsx}'],
  theme: {
    colors: {
      'primary': '#4463f5',
      'secondary': '#ffd60a',
      'dark': '#141414',
      'light': '#e9e9e9',
      'dark-blue': '#001f47',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#d3dce6',
    },
    fontFamily: {
      sans: ['Tanha'],
      serif: ['Tanha'],
    },
    extend: {
      spacing: {
        '8xl': '96rem',
        '9xl': '128rem',
      },
      borderRadius: {
        '4xl': '2rem',
      }
    }
  },
}