/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ink: '#080d16',
        paper: '#f4f3ef',
        electric: '#8eb8ff',
      },
    },
  },
  plugins: [],
};
