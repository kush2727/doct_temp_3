/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        white: '#FFFFFF',
        'soft-blue': '#E8F4F8',
        'teal-primary': '#00D4FF',
        'teal-dark': '#0099CC',
        'neon-green': '#00FF88',
        'dark-gray': '#1A1A1A',
        'medium-gray': '#666666',
        'light-gray': '#F5F5F5',
        'soft-red': '#FF6B6B',
        'soft-orange': '#FFA500',
      },
      fontSize: {
        'h1': ['48px', { lineHeight: '1.2', letterSpacing: '-0.02em', fontWeight: '700' }],
        'h2': ['36px', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '700' }],
        'h3': ['24px', { lineHeight: '1.4', letterSpacing: '0em', fontWeight: '600' }],
        'h4': ['20px', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '600' }],
        'body': ['16px', { lineHeight: '1.6', letterSpacing: '0em', fontWeight: '400' }],
        'small': ['14px', { lineHeight: '1.5', letterSpacing: '0em', fontWeight: '400' }],
        'tiny': ['12px', { lineHeight: '1.4', letterSpacing: '0.05em', fontWeight: '500' }],
      },
      spacing: {
        'xs': '4px',
        'sm': '8px',
        'md': '16px',
        'lg': '24px',
        'xl': '32px',
        '2xl': '48px',
        '3xl': '64px',
        '4xl': '96px',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'md': '0 4px 6px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
        '2xl': '0 25px 50px rgba(0, 0, 0, 0.15)',
        'glass': '0 8px 32px rgba(0, 0, 0, 0.1)',
        'glow-blue': '0 0 20px rgba(0, 212, 255, 0.3)',
        'glow-teal': '0 0 20px rgba(0, 153, 204, 0.3)',
      },
      borderRadius: {
        'sm': '4px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '24px',
      },
      zIndex: {
        'dropdown': '100',
        'sticky': '200',
        'fixed': '300',
        'modal-backdrop': '400',
        'modal': '500',
        'tooltip': '600',
      },
      transitionTimingFunction: {
        'in': 'cubic-bezier(0.4, 0, 1, 1)',
        'out': 'cubic-bezier(0, 0, 0.2, 1)',
        'in-out': 'cubic-bezier(0.4, 0, 0.2, 1)',
        'spring': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      backdropBlur: {
        'glass': '20px',
      },
      backgroundImage: {
        'gradient-teal': 'linear-gradient(135deg, #00D4FF 0%, #0099CC 100%)',
        'gradient-soft': 'linear-gradient(135deg, #E8F4F8 0%, #00D4FF 100%)',
        'gradient-neon': 'linear-gradient(135deg, #00FF88 0%, #00D4FF 100%)',
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
        'float': 'float 3s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
        'float': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
    },
  },
  plugins: [],
}
