/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'display': ['"Playfair Display"', 'serif'],
        'sans': ['"Work Sans"', 'sans-serif'],
      },
      colors: {
        'spice': {
          50: '#FFF9ED',
          100: '#FFF3DB',
          200: '#FFE7B8',
          300: '#F9D38D',
          400: '#F3B53B', // turmeric gold
          500: '#E59B19',
          600: '#C97F10',
          700: '#A66211',
          800: '#864D17',
          900: '#723F19',
        },
        'leaf': {
          50: '#F1F5F3',
          100: '#E1EBE6',
          200: '#C3D7CD',
          300: '#A3C0B4',
          400: '#7DA495',
          500: '#5E8874',
          600: '#4D7461',
          700: '#405E48', // cardamom green
          800: '#334A3C',
          900: '#283C31',
        },
        'chili': {
          50: '#FEF2F0',
          100: '#FEE5E1',
          200: '#FACBC4',
          300: '#F5AA9F',
          400: '#EA7C6B',
          500: '#E05642',
          600: '#C93C20', // chili red
          700: '#AB2E18',
          800: '#8F291A',
          900: '#7A261B',
        },
        'cream': {
          50: '#FFFDF9',
          100: '#FFF9F0',
          200: '#FFF3E0',
          300: '#FFE8CC',
          400: '#F8DDB8',
          500: '#F0D1A4',
          600: '#DCBA87',
          700: '#C19E69',
          800: '#A98456',
          900: '#8A6B45',
        },
      },
    },
  },
  plugins: [],
};