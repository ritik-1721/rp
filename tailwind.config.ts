import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // ── Core palette: warm off-white + dark grey ──
        black: '#222222',   // all text, borders, solid fills
        white: '#F5F5F5',   // backgrounds, inverted fills
        paper: '#F5F5F5',   // explicit alias for bg
        ink:   '#222222',   // explicit alias for text
        'ink-light': '#444444',

        // ── Design system tokens ──
        primary: '#222222',
        'on-primary': '#F5F5F5',
        'primary-container': '#333333',
        surface: '#EEEBE3',          // slightly warmer card bg
        'surface-container': '#E8E5DC',
        'surface-container-low': '#F0EDE5',
        'on-surface': '#222222',
        secondary: '#555555',
        'on-secondary': '#F5F5F5',
        'secondary-container': '#E0DDD5',
        'on-secondary-container': '#444444',
        muted: '#71717A',
        outline: '#888888',
        'outline-variant': '#BBBBBB',
        accent: '#AAFF00',
        'inverse-surface': '#222222',
        'inverse-on-surface': '#F5F5F5',
        error: '#ba1a1a',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        inter: ['Inter', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(2.5rem,6vw,4rem)', { lineHeight: '0.95', letterSpacing: '-0.04em', fontWeight: '700' }],
        'display-lg': ['clamp(2rem,4vw,2.5rem)', { lineHeight: '1.1', letterSpacing: '-0.03em', fontWeight: '700' }],
        'headline-md': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '600' }],
        'body-lg': ['1.125rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'body-md': ['1rem', { lineHeight: '1.6', letterSpacing: '0', fontWeight: '400' }],
        'label-bold': ['0.875rem', { lineHeight: '1.2', letterSpacing: '0.05em', fontWeight: '600' }],
        'label-sm': ['0.75rem', { lineHeight: '1.2', letterSpacing: '0.04em', fontWeight: '500' }],
      },
      borderRadius: {
        DEFAULT: '0px',
        none: '0px',
        sm: '0px',
        md: '0px',
        lg: '0px',
        xl: '0px',
        '2xl': '0px',
        '3xl': '0px',
        full: '9999px',
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        section: '120px',
        gutter: '24px',
      },
      animation: {
        'fade-up': 'fadeUp 0.6s ease forwards',
        'fade-in': 'fadeIn 0.4s ease forwards',
        'marquee': 'marquee 20s linear infinite',
        pulse: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
