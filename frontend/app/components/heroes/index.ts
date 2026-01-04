/**
 * ═══════════════════════════════════════════════════════════════════════════
 * HERO PRESETS - Sidekick Strategies
 * ═══════════════════════════════════════════════════════════════════════════
 *
 * A collection of 4 distinct hero section styles, ranging from minimalist
 * to ultra-premium. Each hero is production-ready and uses the Sidekick
 * Strategies brand system.
 *
 * USAGE:
 *   import { HeroCleanSlate } from '@/app/components/heroes'
 *   // or
 *   import HeroCleanSlate from '@/app/components/heroes/HeroCleanSlate'
 *
 * AVAILABLE PRESETS:
 *
 * 1. HeroCleanSlate     - Minimalist, typography-focused, white background
 * 2. HeroBoldEdge       - Navy background, geometric shapes, accent pops
 * 3. HeroFlowState      - Gradient, floating orbs, modern movement
 * 4. HeroExecutiveSuite - Dark luxury, peach accents, ultra-premium
 *
 * ═══════════════════════════════════════════════════════════════════════════
 */

export { default as HeroCleanSlate } from './HeroCleanSlate'
export { default as HeroBoldEdge } from './HeroBoldEdge'
export { default as HeroFlowState } from './HeroFlowState'
export { default as HeroExecutiveSuite } from './HeroExecutiveSuite'

// Type exports for props
export type { default as HeroCleanSlateProps } from './HeroCleanSlate'
export type { default as HeroBoldEdgeProps } from './HeroBoldEdge'
export type { default as HeroFlowStateProps } from './HeroFlowState'
export type { default as HeroExecutiveSuiteProps } from './HeroExecutiveSuite'

/**
 * Hero preset metadata for use in a preset selector/CMS
 */
export const heroPresets = [
  {
    id: 'clean-slate',
    name: 'Clean Slate',
    component: 'HeroCleanSlate',
    description: 'Minimalist, typography-focused. White background with elegant serif headlines.',
    style: 'minimal',
    background: 'light',
    energy: 'calm',
  },
  {
    id: 'bold-edge',
    name: 'Bold Edge',
    component: 'HeroBoldEdge',
    description: 'Strong brand presence with navy background and geometric accent shapes.',
    style: 'geometric',
    background: 'dark',
    energy: 'confident',
  },
  {
    id: 'flow-state',
    name: 'Flow State',
    component: 'HeroFlowState',
    description: 'Fluid gradients and floating orbs with glassmorphic elements.',
    style: 'organic',
    background: 'gradient',
    energy: 'modern',
  },
  {
    id: 'executive-suite',
    name: 'Executive Suite',
    component: 'HeroExecutiveSuite',
    description: 'Ultra-premium dark theme with peach/gold accents and refined luxury details.',
    style: 'luxury',
    background: 'dark',
    energy: 'sophisticated',
  },
] as const

export type HeroPresetId = typeof heroPresets[number]['id']
