/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'primary': '#3E99C6',
        'primary-dark': '#66BAE4',
        'disabled': '#AFAFAF',
      }
    }
  },
  plugins: [],
}