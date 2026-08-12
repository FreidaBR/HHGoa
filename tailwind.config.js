/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        goa: {
          bg: '#053b27',
          dark: '#041d11',
          forest: '#07301c',
          emerald: '#074828',
          cream: '#faf3d2',
          gold: '#E5A93C',
          yellow: '#ffe600',
          pink: '#ff2a85',
          cyan: '#00e5ff',
          lime: '#ccff00',
          border: '#0a2418',
        },
      },
      fontFamily: {
        display: ['"Bebas Neue"', '"Anton"', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      boxShadow: {
        neo: '6px 6px 0px 0px #0a2418',
        'neo-sm': '4px 4px 0px 0px #0a2418',
        'neo-lg': '10px 10px 0px 0px #0a2418',
        'neo-yellow': '6px 6px 0px 0px #ffe600',
      },
      borderRadius: {
        retro: '2px',
      },
      animation: {
        'pulse-glow': 'pulseGlow 2s infinite ease-in-out',
        'fade-in': 'fadeIn 0.25s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          from: { opacity: '0', transform: 'translateY(12px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 15px rgba(255, 230, 0, 0.4)' },
          '50%': { boxShadow: '0 0 25px rgba(255, 230, 0, 0.9)' },
        },
      },
    },
  },
  plugins: [],
};
