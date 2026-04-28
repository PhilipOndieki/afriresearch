export const tokens = {
  colors: {
    background: '#FAFAF7',
    foreground: '#1A1A1A',
    accent: '#C2642A',
    accentLight: '#D4814D',
    accentDark: '#A3501F',
    muted: '#6B6B6B',
    mutedForeground: '#9A9A9A',
    border: '#E5E5E0',
    surface: '#F0F0EC',
    surfaceElevated: '#FFFFFF',
  },
  fonts: {
    serif: 'var(--font-cormorant)',
    sans: 'var(--font-inter)',
  },
  spacing: {
    unit: 8,
  },
  easing: {
    expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
    expoIn: 'cubic-bezier(0.7, 0, 0.84, 0)',
    expoInOut: 'cubic-bezier(0.87, 0, 0.13, 1)',
    backOut: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
  duration: {
    fast: 0.3,
    normal: 0.6,
    slow: 0.9,
    verySlow: 1.2,
  },
  breakpoints: {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
    '2xl': 1440,
  },
} as const;
