/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{jsx,tsx,html}'],
  theme: {
    extend: {
      fontFamily: {
        mont: ['Montserrat', 'sans-serif'],
      },
      colors: {
        purple: {
          50: '#ececff',
          100: '#cacaeb',
          200: '#a6a6d8',
          300: '#8383c8',
          400: '#605fb7',
          500: '#47469e',
          600: '#36367b',
          700: '#272759',
          800: '#161737',
          900: '#070718',
        },
        lavender: {
          50: '#fdebfb',
          100: '#e8cae5',
          200: '#d7a9d1',
          300: '#c586bd',
          400: '#b365a9',
          500: '#9a4c90',
          600: '#793a71',
          700: '#572851',
          800: '#361831',
          900: '#160514',
        },
        cool: {
          50: '#e6f2ff',
          100: '#c3d5ef',
          200: '#9fbadf',
          300: '#7a9ed1',
          400: '#5582c3',
          500: '#3d69aa',
          600: '#2e5185',
          700: '#203a60',
          800: '#10233c',
          900: '#010c1a',
        },
      },
    },
  },
  plugins: [],
}
