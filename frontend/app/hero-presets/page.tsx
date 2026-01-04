/**
 * Hero Presets Preview Page
 * View all 5 hero section styles in one place
 */

import {
  HeroCleanSlate,
  HeroBoldEdge,
  HeroFlowState,
  HeroDynamicImpact,
  HeroExecutiveSuite,
  heroPresets,
} from '@/app/components/heroes'

export const metadata = {
  title: 'Hero Presets | Sidekick Strategies',
  description: 'Preview all 5 hero section preset styles',
}

export default function HeroPresetsPage() {
  return (
    <main>
      {/* Navigation header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/90 backdrop-blur-sm border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <h1 className="font-heading text-white text-lg tracking-wide">Hero Presets</h1>
            <div className="flex gap-2">
              {heroPresets.map((preset, i) => (
                <a
                  key={preset.id}
                  href={`#${preset.id}`}
                  className="
                    px-3 py-1.5 text-xs font-mono uppercase tracking-wider
                    text-white/60 hover:text-white
                    border border-white/20 hover:border-white/40
                    transition-all duration-200
                  "
                >
                  {i + 1}
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero 1: Clean Slate */}
      <section id="clean-slate" className="relative">
        <div className="absolute top-20 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
          <span className="font-mono text-xs text-gray-500">01</span>
          <h2 className="font-heading text-lg text-brand-800">Clean Slate</h2>
          <p className="text-xs text-gray-500 mt-1">Minimalist / Typography-Focused</p>
        </div>
        <HeroCleanSlate />
      </section>

      {/* Hero 2: Bold Edge */}
      <section id="bold-edge" className="relative">
        <div className="absolute top-20 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
          <span className="font-mono text-xs text-gray-500">02</span>
          <h2 className="font-heading text-lg text-brand-800">Bold Edge</h2>
          <p className="text-xs text-gray-500 mt-1">Geometric / Strong Brand</p>
        </div>
        <HeroBoldEdge />
      </section>

      {/* Hero 3: Flow State */}
      <section id="flow-state" className="relative">
        <div className="absolute top-20 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
          <span className="font-mono text-xs text-gray-500">03</span>
          <h2 className="font-heading text-lg text-brand-800">Flow State</h2>
          <p className="text-xs text-gray-500 mt-1">Gradient / Modern Movement</p>
        </div>
        <HeroFlowState />
      </section>

      {/* Hero 4: Dynamic Impact */}
      <section id="dynamic-impact" className="relative">
        <div className="absolute top-20 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
          <span className="font-mono text-xs text-gray-500">04</span>
          <h2 className="font-heading text-lg text-brand-800">Dynamic Impact</h2>
          <p className="text-xs text-gray-500 mt-1">Diagonal / High Energy</p>
        </div>
        <HeroDynamicImpact />
      </section>

      {/* Hero 5: Executive Suite */}
      <section id="executive-suite" className="relative">
        <div className="absolute top-20 left-6 z-10 bg-white/90 backdrop-blur-sm px-4 py-3 shadow-lg">
          <span className="font-mono text-xs text-gray-500">05</span>
          <h2 className="font-heading text-lg text-brand-800">Executive Suite</h2>
          <p className="text-xs text-gray-500 mt-1">Luxury / Ultra-Premium</p>
        </div>
        <HeroExecutiveSuite />
      </section>

      {/* Summary footer */}
      <footer className="bg-gray-950 text-white py-16">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl mb-8">Hero Preset Summary</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroPresets.map((preset, i) => (
              <div
                key={preset.id}
                className="p-6 border border-white/10 hover:border-peach/30 transition-colors"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-peach text-sm">0{i + 1}</span>
                  <h3 className="font-heading text-lg">{preset.name}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{preset.description}</p>
                <div className="mt-4 flex gap-2">
                  <span className="px-2 py-1 text-xs font-mono bg-white/5 text-gray-500">
                    {preset.style}
                  </span>
                  <span className="px-2 py-1 text-xs font-mono bg-white/5 text-gray-500">
                    {preset.background}
                  </span>
                  <span className="px-2 py-1 text-xs font-mono bg-white/5 text-gray-500">
                    {preset.energy}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </footer>
    </main>
  )
}
