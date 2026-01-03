import type {Config} from 'tailwindcss'
import typography from '@tailwindcss/typography'

/**
 * =============================================================================
 * SIDEKICK STRATEGIES - DESIGN TOKENS
 * =============================================================================
 *
 * Customize your brand colors and fonts below. These tokens are used throughout
 * the site for consistent styling.
 *
 * BRAND COLORS: Update the 'brand' object with your primary/secondary colors
 * FONTS: Update the fontFamily section with your custom fonts
 *
 * After updating fonts, also update the font imports in:
 * - app/layout.tsx (for Next.js font loading)
 * =============================================================================
 */

// =============================================================================
// BRAND COLORS - Sidekick Strategies
// =============================================================================
const brandColors = {
  // Primary brand color - Dark Blue (#142d63)
  primary: {
    50: '#f0f4fa',
    100: '#dce4f2',
    200: '#b9c9e5',
    300: '#8aa5d3',
    400: '#5a7fc0',
    500: '#3a5a9a',
    600: '#2a4578',
    700: '#1e3561',
    800: '#142d63',  // Main primary color
    900: '#0f2250',
    950: '#0a1633',
  },
  // Secondary brand color - Teal (#028393)
  secondary: {
    50: '#e6f7f9',
    100: '#cceff3',
    200: '#99dfe7',
    300: '#4dc5d4',
    400: '#1aabb9',
    500: '#028393',  // Main secondary color
    600: '#026d7a',
    700: '#025762',
    800: '#014149',
    900: '#012b31',
    950: '#001518',
  },
  // Accent/Button color - Orange (#f65625)
  accent: {
    50: '#fff5f0',
    100: '#ffe8de',
    200: '#ffd0bd',
    300: '#ffab8c',
    400: '#fa7d4d',
    500: '#f65625',  // Main accent/button color
    600: '#d9441a',
    700: '#b53615',
    800: '#912b11',
    900: '#6d200d',
    950: '#3a1006',
  },
  // Additional brand colors
  peach: '#faaa68',      // Light orange/peach
  lightBlue: '#98c1d9',  // Light blue
  slate: '#3d5a80',      // Slate blue
}

export default {
  content: ['./app/**/*.{ts,tsx}', './sanity/**/*.{ts,tsx}'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
    },
    extend: {
      boxShadow: {
        layer: '0 35px 60px -15px rgba(0, 0, 0, 0.3)',
      },
      colors: {
        // Brand colors - use these for your site
        brand: brandColors.primary,
        secondary: brandColors.secondary,
        accent: brandColors.accent,

        // Additional brand colors
        peach: brandColors.peach,
        'light-blue': brandColors.lightBlue,
        slate: brandColors.slate,

        // Base colors
        black: '#000000',
        white: '#ffffff',
        cyan: {
          50: '#e7fefe',
          100: '#c5fcfc',
          200: '#96f8f8',
          300: '#62efef',
          400: '#18e2e2',
          500: '#04b8be',
          600: '#037782',
          700: '#024950',
          800: '#042f34',
          900: '#072227',
          950: '#0d181c',
        },
        gray: {
          50: '#f6f6f8',
          100: '#eeeef1',
          200: '#e3e4e8',
          300: '#bbbdc9',
          400: '#9499ad',
          500: '#727892',
          600: '#515870',
          700: '#383d51',
          800: '#252837',
          900: '#1b1d27',
          950: '#13141b',
        },
        red: {
          50: '#fff6f5',
          100: '#ffe7e5',
          200: '#ffdedc',
          300: '#fdada5',
          400: '#f77769',
          500: '#ef4434',
          600: '#cc2819',
          700: '#8b2018',
          800: '#4d1714',
          900: '#321615',
          950: '#1e1011',
        },
        orange: {
          50: '#fcf1e8',
          100: '#f9e3d2',
          200: '#f4c7a6',
          300: '#efab7a',
          400: '#ea8f4e',
          500: '#e57322',
          600: '#ba5f1e',
          700: '#8f4b1b',
          800: '#653818',
          900: '#3a2415',
          950: '#251a13',
        },
        yellow: {
          50: '#fefae1',
          100: '#fcf3bb',
          200: '#f9e994',
          300: '#f7d455',
          400: '#f9bc15',
          500: '#d28a04',
          600: '#965908',
          700: '#653a0b',
          800: '#3b220c',
          900: '#271a11',
          950: '#181410',
        },
        green: {
          50: '#e7f9ed',
          100: '#d0f4dc',
          200: '#a1eaba',
          300: '#72e097',
          400: '#43d675',
          500: '#3ab564',
          600: '#329454',
          700: '#297343',
          800: '#215233',
          900: '#183122',
          950: '#14211a',
        },
      },
      // =============================================================================
      // FONTS - Customize these for Sidekick Strategies
      // =============================================================================
      // To change fonts:
      // 1. Update the font names below
      // 2. Update the font imports in app/layout.tsx
      // 3. Add your Google Fonts or local fonts
      fontFamily: {
        // Primary font for body text
        sans: ['var(--font-inter)'],
        // Heading font (optional - uses sans by default)
        heading: ['var(--font-inter)'],
        // Monospace font for code, labels, badges
        mono: ['var(--font-ibm-plex-mono)'],
      },
    },
  },
  future: {
    hoverOnlyWhenSupported: true,
  },
  plugins: [typography],
} satisfies Config
