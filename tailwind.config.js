/** @type {import('tailwindcss').Config} */
export default {
  content: [],
  theme: {
    extend: {
      fontFamily: {
        serif: ['ui-serif', 'Georgia'],
        sans: ['"Kolektiv Grotesk II", sans-serif'],
      },
      colors: {
        'primary': '#EF4036',
        'primary-light': '#FCF2F3',
        'dark': '#2B2E31',
        'light': '#D9D9D9',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
