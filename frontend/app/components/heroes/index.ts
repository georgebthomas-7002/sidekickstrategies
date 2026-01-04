/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESETS - Sidekick Strategies
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * A collection of 6 distinct hero section styles with animated backgrounds,
 * ranging from minimalist to ultra-premium luxury. Each hero is production-ready
 * and uses the Sidekick Strategies brand system with inline styles to prevent
 * Tailwind v4 CSS purging issues.
 *
 * USAGE:
 *   import { HeroCleanSlate } from '@/app/components/heroes'
 *   // or
 *   import HeroCleanSlate from '@/app/components/heroes/HeroCleanSlate'
 *
 * AVAILABLE PRESETS:
 *
 * 1. HeroCleanSlate     - Editorial minimalism, typography as art
 * 2. HeroBoldEdge       - Architectural geometry, floating shapes
 * 3. HeroGradientFlow   - 3-color animated gradient with glass orbs
 * 4. HeroAuroraPulse    - Ethereal aurora/northern lights effect
 * 5. HeroKineticGrid    - Tech-forward animated grid with data flows
 * 6. HeroExecutiveSuite - Ultra-premium dark luxury with testimonial
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

export { default as HeroCleanSlate } from './HeroCleanSlate'
export { default as HeroBoldEdge } from './HeroBoldEdge'
export { default as HeroGradientFlow } from './HeroGradientFlow'
export { default as HeroAuroraPulse } from './HeroAuroraPulse'
export { default as HeroKineticGrid } from './HeroKineticGrid'
export { default as HeroExecutiveSuite } from './HeroExecutiveSuite'

/**
 * Hero preset metadata for use in a preset selector/CMS
 */
export const heroPresets = [
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    component: 'HeroCleanSlate',
    description: 'Editorial minimalism with asymmetric layout. Typography as art on white canvas.',
    style: 'minimal',
    background: 'light',
    energy: 'refined',
    animation: 'subtle',
  },
  {
    id: 'bold-edge',
    name: 'Bold Edge',
    component: 'HeroBoldEdge',
    description: 'Architectural geometry with floating shapes. Navy background, confident presence.',
    style: 'geometric',
    background: 'dark',
    energy: 'commanding',
    animation: 'floating',
  },
  {
    id: 'gradient-flow',
    name: 'Gradient Flow',
    component: 'HeroGradientFlow',
    description: 'Fluid 3-color gradient in motion. Glassmorphic orbs and centered glass card.',
    style: 'organic',
    background: 'gradient',
    energy: 'dynamic',
    animation: 'flowing',
  },
  {
    id: 'aurora-pulse',
    name: 'Aurora Pulse',
    component: 'HeroAuroraPulse',
    description: 'Ethereal aurora borealis effect. Morphing gradient blobs with twinkling stars.',
    style: 'ethereal',
    background: 'dark',
    energy: 'mesmerizing',
    animation: 'aurora',
  },
  {
    id: 'kinetic-grid',
    name: 'Kinetic Grid',
    component: 'HeroKineticGrid',
    description: 'Tech-forward animated grid system. Flowing data lines and pulsing nodes.',
    style: 'technical',
    background: 'dark',
    energy: 'precise',
    animation: 'grid-flow',
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    component: 'HeroExecutiveSuite',
    description: 'Ultra-premium dark luxury. Peach/gold accents with testimonial card.',
    style: 'luxury',
    background: 'dark',
    energy: 'sophisticated',
    animation: 'elegant',
  },
] as const

export type HeroPresetId = typeof heroPresets[number]['id']
