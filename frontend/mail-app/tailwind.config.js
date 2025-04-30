/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        pretendard: ['Pretendard', 'sans-serif'],
        // 다른 폰트도 추가 가능
      },
      colors: {
        'primary': '#3E99C6',
        'primary-dark': '#66BAE4',
        'disabled': '#AFAFAF',
      }
    }
  },
  plugins: [],
}