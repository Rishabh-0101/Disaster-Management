/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          950: '#050b1f',
          900: '#0a1128',
          800: '#0f1c3f',
          700: '#152a5c',
        },
        brand: {
          50: '#e6fbff',
          100: '#ccf7ff',
          200: '#99efff',
          300: '#5ce3ff',
          400: '#22d3ee',
          500: '#0ea5c9',
          600: '#0284a3',
          700: '#036680',
          800: '#0a4d63',
          900: '#0d3a4d',
        },
        accent: {
          orange: '#ff6b4a',
          coral: '#ff7d5c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, #050b1f 0%, #0a1128 40%, #0d3a63 100%)',
        'glow-gradient': 'radial-gradient(circle at top right, rgba(34,211,238,0.25), transparent 60%)',
      },
      boxShadow: {
        glow: '0 0 40px rgba(34,211,238,0.25)',
      },
    },
  },
  plugins: [],
};
