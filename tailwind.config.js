/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./**/*.{html,js,ts,jsx,tsx,md,mdx}",
    "./posts/**/*.{md,mdx}",
    "./_includes/**/*.{html,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'Noto Sans JP', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}