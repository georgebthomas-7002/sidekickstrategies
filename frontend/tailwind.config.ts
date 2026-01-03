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
// BRAND COLORS - Customize these for Sidekick Strategies
// =============================================================================
const brandColors = {
  // Primary brand color - used for CTAs, links, accents
  primary: {
    50: '#f0f9ff',
    100: '#e0f2fe',
    200: '#bae6fd',
    300: '#7dd3fc',
    400: '#38bdf8',
    500: '#0ea5e9',  // Main primary color
    600: '#0284c7',
    700: '#0369a1',
    800: '#075985',
    900: '#0c4a6e',
    950: '#082f49',
  },
  // Secondary brand color - used for accents, highlights
  secondary: {
    50: '#fdf4ff',
    100: '#fae8ff',
    200: '#f5d0fe',
    300: '#f0abfc',
    400: '#e879f9',
    500: '#d946ef',  // Main secondary color
    600: '#c026d3',
    700: '#a21caf',
    800: '#86198f',
    900: '#701a75',
    950: '#4a044e',
  },
  // Accent color - for special highlights, badges, alerts
  accent: {
    50: '#fff7ed',
    100: '#ffedd5',
    200: '#fed7aa',
    300: '#fdba74',
    400: '#fb923c',
    500: '#f97316',  // Main accent color
    600: '#ea580c',
    700: '#c2410c',
    800: '#9a3412',
    900: '#7c2d12',
    950: '#431407',
  },
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

        // Base colors
        black: '#0d0e12',
        white: '#fff',
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
