/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './features/**/*.{js,ts,jsx,tsx}',
    './libs/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: 'var(--primary-color)',
        'primary-hover': 'var(--primary-hover-color)',
        border: 'var(--border-color)',
        'primary-text-100': 'var(--primary-text-100)',
      },
      borderRadius: {
        xl: '0.75rem',
      },

      keyframes: {
        ride: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(30px)' },
        },
      },
      animation: {
        ride: 'ride 1s linear infinite',
      },
    },
  },
  plugins: [],
};
