/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        mantis: {
          primary: {
            DEFAULT: '#2563eb',
            dark: '#1d4ed8',
          },
          secondary: '#64748b',
          success: '#10b981',
          warning: '#f59e0b',
          error: '#ef4444',
          info: '#06b6d4',
          white: '#ffffff',
          gray: {
            50: '#f8fafc',
            100: '#f1f5f9',
            200: '#e2e8f0',
            300: '#cbd5e1',
            400: '#94a3b8',
            500: '#64748b',
            600: '#475569',
            700: '#334155',
            800: '#1e293b',
            900: '#0f172a',
          },
        },
      },
      fontFamily: {
        mantis: [
          '-apple-system',
          'BlinkMacSystemFont',
          'Segoe UI',
          'Roboto',
          'Oxygen',
          'Ubuntu',
          'Cantarell',
          'sans-serif',
        ],
      },
      fontSize: {
        'mantis-xs': '0.75rem',
        'mantis-sm': '0.875rem',
        'mantis-base': '1rem',
        'mantis-lg': '1.125rem',
        'mantis-xl': '1.25rem',
        'mantis-2xl': '1.5rem',
        'mantis-3xl': '1.875rem',
      },
      spacing: {
        'mantis-1': '0.25rem',
        'mantis-2': '0.5rem',
        'mantis-3': '0.75rem',
        'mantis-4': '1rem',
        'mantis-5': '1.25rem',
        'mantis-6': '1.5rem',
        'mantis-8': '2rem',
        'mantis-10': '2.5rem',
        'mantis-12': '3rem',
      },
      borderRadius: {
        'mantis-sm': '0.125rem',
        'mantis-base': '0.25rem',
        'mantis-md': '0.375rem',
        'mantis-lg': '0.5rem',
        'mantis-xl': '0.75rem',
        'mantis-full': '9999px',
      },
      boxShadow: {
        'mantis-sm': '0 1px 2px 0 rgb(0 0 0 / 0.05)',
        'mantis-base': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        'mantis-md': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)',
        'mantis-lg': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'mantis-xl': '0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)',
      },
      transitionDuration: {
        'mantis-fast': '150ms',
        'mantis-base': '250ms',
        'mantis-slow': '350ms',
      },
      transitionProperty: {
        'mantis-colors': 'background-color, border-color, color',
      },
      animation: {
        'mantis-spin': 'spin 1s linear infinite',
        'mantis-fade-in': 'mantis-fade-in 300ms ease-out',
        'mantis-fade-out': 'mantis-fade-out 300ms ease-out',
        'mantis-slide-in-right': 'mantis-slide-in-right 300ms ease-out',
        'mantis-slide-in-left': 'mantis-slide-in-left 300ms ease-out',
        'mantis-slide-in-up': 'mantis-slide-in-up 300ms ease-out',
        'mantis-slide-in-down': 'mantis-slide-in-down 300ms ease-out',
        'mantis-scale-in': 'mantis-scale-in 300ms ease-out',
        'mantis-bounce': 'mantis-bounce 600ms ease-out',
        'mantis-pulse': 'mantis-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        'mantis-fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'mantis-fade-out': {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        'mantis-slide-in-right': {
          '0%': { transform: 'translateX(100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'mantis-slide-in-left': {
          '0%': { transform: 'translateX(-100%)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        'mantis-slide-in-up': {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'mantis-slide-in-down': {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        'mantis-scale-in': {
          '0%': { transform: 'scale(0)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'mantis-bounce': {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-30px)' },
          '70%': { transform: 'translateY(-15px)' },
          '90%': { transform: 'translateY(-4px)' },
        },
        'mantis-pulse': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
      },
    },
  },
  plugins: [],
};
