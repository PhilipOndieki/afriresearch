import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#FAFAF7',
        foreground: '#1A1A1A',
        accent: {
          DEFAULT: '#C2642A',
          light: '#D4814D',
          dark: '#A3501F',
        },
        muted: {
          DEFAULT: '#6B6B6B',
          foreground: '#9A9A9A',
        },
        border: '#E5E5E0',
        surface: {
          DEFAULT: '#F0F0EC',
          elevated: '#FFFFFF',
        },
      },
      fontFamily: {
        serif: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'display-2xl': ['clamp(3rem, 8vw, 7rem)',         { lineHeight: '1',    letterSpacing: '-0.02em' }],
        'display-xl':  ['clamp(2.5rem, 6vw, 5.5rem)',     { lineHeight: '1.05', letterSpacing: '-0.02em' }],
        'display-lg':  ['clamp(2rem, 4vw, 4rem)',          { lineHeight: '1.1',  letterSpacing: '-0.015em' }],
        'display-md':  ['clamp(2rem, 4vw, 4rem)',  { lineHeight: '1.15', letterSpacing: '-0.01em' }],
        'display-sm':  ['clamp(1.5rem, 3vw, 2.5rem)',    { lineHeight: '1.2',  letterSpacing: '-0.01em' }],
        'body-xl':     ['1.25rem',   { lineHeight: '1.6' }],
        'body-lg':     ['1.25rem',   { lineHeight: '1.65' }],
        'body-md':     ['1.0625rem', { lineHeight: '1.7' }],
        'body-sm':     ['0.9375rem', { lineHeight: '1.6' }],
        'label-lg':    ['0.9375rem', { lineHeight: '1.4', letterSpacing: '0.08em' }],
        'label-md':    ['0.9375rem', { lineHeight: '1.4', letterSpacing: '0.1em' }],
        'label-sm':    ['0.8125rem', { lineHeight: '1.4', letterSpacing: '0.12em' }],
      },
      spacing: {
        '1': '8px',
        '2': '16px',
        '3': '24px',
        '4': '32px',
        '5': '40px',
        '6': '48px',
        '7': '56px',
        '8': '64px',
        '9': '72px',
        '10': '80px',
        '11': '88px',
        '12': '96px',
        '14': '112px',
        '16': '128px',
        '20': '160px',
        '24': '192px',
        '28': '224px',
        '32': '256px',
        '36': '288px',
        '40': '320px',
        '44': '352px',
        '48': '384px',
        '52': '416px',
        '56': '448px',
        '60': '480px',
        '64': '512px',
        '72': '576px',
        '80': '640px',
        '96': '768px',
      },
      maxWidth: {
        'site': '1440px',
        'content': '1200px',
        'narrow': '860px',
        'prose': '680px',
      },
      gridTemplateColumns: {
        'editorial': '1fr 1fr',
        'editorial-3': '2fr 1fr 1fr',
        'editorial-aside': '1fr 380px',
        'editorial-reverse': '380px 1fr',
      },
      transitionTimingFunction: {
        'expo-out': 'cubic-bezier(0.16, 1, 0.3, 1)',
        'expo-in': 'cubic-bezier(0.7, 0, 0.84, 0)',
        'expo-in-out': 'cubic-bezier(0.87, 0, 0.13, 1)',
        'back-out': 'cubic-bezier(0.34, 1.56, 0.64, 1)',
      },
      transitionDuration: {
        '400': '400ms',
        '600': '600ms',
        '800': '800ms',
        '1000': '1000ms',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'fade-in': 'fadeIn 0.6s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'slide-in-right': 'slideInRight 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
      keyframes: {
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(40px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        slideInLeft: {
          from: { opacity: '0', transform: 'translateX(-60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
        slideInRight: {
          from: { opacity: '0', transform: 'translateX(60px)' },
          to: { opacity: '1', transform: 'translateX(0)' },
        },
      },
      aspectRatio: {
        'portrait': '3/4',
        'landscape': '4/3',
        'ultrawide': '21/9',
        'cinema': '16/7',
      },
    },
  },
  plugins: [],
};

export default config;
