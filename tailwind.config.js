/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'Avenir', 'Helvetica', 'Arial', 'sans-serif'],
      },
      colors: {
        body: {
          light: '#ffffff',
          dark: '#242424',
        },
        text: {
          light: '#213547',
          dark: 'rgba(255, 255, 255, 0.87)',
        },
        primary: {
          DEFAULT: '#646cff',
          hover: '#535bf2',
        },
        button: {
          light: '#f9f9f9',
          dark: '#1a1a1a',
        },
      },
    },
  },
  plugins: [],
};
