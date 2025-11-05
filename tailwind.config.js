/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{html,js}",
    "./src/pages/**/*.{html,js}",
    "./src/components/**/*.{html,js}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      // Custom Glassmorphic Colors - iOS 26 Liquid Glass Inspired
      colors: {
        // Glass theme colors
        glass: {
          // Dark mode glass colors
          'dark-bg': 'rgba(16, 18, 27, 0.4)',
          'dark-bg-solid': '#10121b',
          'dark-card': 'rgba(22, 25, 37, 0.6)',
          'dark-border': 'rgba(113, 119, 144, 0.25)',
          'dark-hover': 'rgba(12, 15, 25, 0.5)',
          'dark-overlay': 'rgba(36, 39, 59, 0.8)',

          // Light mode glass colors
          'light-bg': 'rgba(255, 255, 255, 0.31)',
          'light-bg-solid': '#ffffff',
          'light-card': 'rgba(255, 255, 255, 0.45)',
          'light-border': 'rgba(255, 255, 255, 0.35)',
          'light-hover': 'rgba(255, 255, 255, 0.55)',
          'light-overlay': 'rgba(255, 255, 255, 0.3)',
        },

        // Accent colors
        primary: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3a6df0',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },

        // Status colors
        success: {
          DEFAULT: '#3bf083',
          light: '#6effa8',
          dark: '#2bc96a',
        },
        danger: {
          DEFAULT: '#ff5c5c',
          light: '#ff8989',
          dark: '#f03a3a',
        },
        warning: {
          DEFAULT: '#ffce45',
          light: '#ffe070',
          dark: '#f8b827',
        },
        info: {
          DEFAULT: '#396df0',
          light: '#6b94ff',
          dark: '#1e4ed8',
        },

        // Text colors
        text: {
          'dark-primary': '#f9fafb',
          'dark-secondary': 'rgba(249, 250, 251, 0.78)',
          'dark-inactive': 'rgba(113, 119, 144, 0.78)',
          'light-primary': '#333333',
          'light-secondary': 'rgba(51, 51, 51, 0.78)',
          'light-inactive': 'rgba(0, 0, 0, 0.45)',
        },

        // Gradient colors (for hero sections and cards)
        gradient: {
          purple: {
            from: '#cf4af3',
            via: '#e73bd7',
            to: '#fd31a2',
          },
          blue: {
            from: '#4a90e2',
            via: '#357abd',
            to: '#1e5ba8',
          },
          orange: {
            from: '#ff8c51',
            via: '#ff705c',
            to: '#f96057',
          },
        },
      },

      // Custom fonts
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },

      // Custom backdrop blur values
      backdropBlur: {
        xs: '2px',
        '20': '20px',
        '30': '30px',
        '40': '40px',
      },

      // Custom border radius for glass panels
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.5rem',
        '4xl': '2rem',
      },

      // Custom box shadows for depth
      boxShadow: {
        'glass': '0 8px 32px 0 rgba(31, 38, 135, 0.37)',
        'glass-lg': '0 10px 40px 0 rgba(31, 38, 135, 0.5)',
        'glass-xl': '0 15px 50px 0 rgba(31, 38, 135, 0.6)',
        'glass-light': '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
        'glass-light-lg': '0 10px 40px 0 rgba(0, 0, 0, 0.15)',
        'inner-glass': 'inset 0 2px 4px 0 rgba(255, 255, 255, 0.1)',
      },

      // Animation timings
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
      },

      // Custom animations
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'fade-out': 'fadeOut 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.4s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'shimmer': 'shimmer 2s infinite',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeOut: {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-1000px 0' },
          '100%': { backgroundPosition: '1000px 0' },
        },
      },

      // Custom spacing for consistent padding/margins
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
      },

      // Custom z-index values
      zIndex: {
        '60': '60',
        '70': '70',
        '80': '80',
        '90': '90',
        '100': '100',
      },
    },
  },
  plugins: [
    // Custom plugin for glass utilities
    function({ addUtilities, theme }) {
      const newUtilities = {
        '.glass-effect': {
          backdropFilter: 'blur(20px) saturate(180%)',
          WebkitBackdropFilter: 'blur(20px) saturate(180%)',
        },
        '.glass-effect-light': {
          backdropFilter: 'blur(30px) saturate(200%)',
          WebkitBackdropFilter: 'blur(30px) saturate(200%)',
        },
        '.glass-effect-heavy': {
          backdropFilter: 'blur(40px) saturate(160%)',
          WebkitBackdropFilter: 'blur(40px) saturate(160%)',
        },
        '.text-gradient': {
          backgroundClip: 'text',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        },
        '.scrollbar-thin': {
          scrollbarWidth: 'thin',
          scrollbarColor: 'rgba(155, 155, 155, 0.5) transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar': {
          width: '6px',
        },
        '.scrollbar-thin::-webkit-scrollbar-track': {
          background: 'transparent',
        },
        '.scrollbar-thin::-webkit-scrollbar-thumb': {
          backgroundColor: 'rgba(155, 155, 155, 0.5)',
          borderRadius: '10px',
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
