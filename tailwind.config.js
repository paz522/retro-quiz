/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'retro-yellow': '#FFD700',
        'retro-red': '#FF4444',
        'retro-blue': '#4444FF',
        'retro-green': '#44FF44',
        'retro-text': '#333333',
        'retro-link': '#0000EE',
        'retro-visited': '#551A8B',
      },
      fontFamily: {
        'retro': ['MS PGothic', 'MS Gothic', 'sans-serif'],
        'display': ['Impact', 'Haettenschweiler', 'sans-serif']
      },
      backgroundImage: {
        'stars': 'url("/images/stars.gif")',
        'construction': 'url("/images/construction.gif")',
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        }
      }
    },
  },
  plugins: [],
} 