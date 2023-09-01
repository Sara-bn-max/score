/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#4463f5',
      'secondary': '#ffd60a',
      'dark': '#141414',
      'light': '#e9e9e9',
      'dark-blue': '#001f47',
      'yellow': '#ffc82c',
      'gray-dark': '#273444',
      'gray': '#8492a6',
      'gray-light': '#eeeeee',
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
  variants: {}, // Add your desired variants here
  plugins: [], // Add your plugins here
};
