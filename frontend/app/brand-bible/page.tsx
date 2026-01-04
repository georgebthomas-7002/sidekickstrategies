/**
 * Brand Bible - Sidekick Strategies
 * Complete brand system documentation with hero presets
 */

import {
  HeroCleanSlate,
  HeroBoldEdge,
  HeroFlowState,
  HeroExecutiveSuite,
  heroPresets,
} from '@/app/components/heroes'

export const metadata = {
  title: 'Brand Bible | Sidekick Strategies',
  description: 'All the styles we use to build an amazing platform!',
}

// Brand color definitions
const brandColors = {
  primary: [
    { name: 'brand-50', hex: '#f0f4fa' },
    { name: 'brand-100', hex: '#dce4f2' },
    { name: 'brand-200', hex: '#b9c9e5' },
    { name: 'brand-300', hex: '#8aa5d3' },
    { name: 'brand-400', hex: '#5a7fc0' },
    { name: 'brand-500', hex: '#3a5a9a' },
    { name: 'brand-600', hex: '#2a4578' },
    { name: 'brand-700', hex: '#1e3561' },
    { name: 'brand-800', hex: '#142d63', main: true },
    { name: 'brand-900', hex: '#0f2250' },
    { name: 'brand-950', hex: '#0a1633' },
  ],
  secondary: [
    { name: 'secondary-50', hex: '#e6f7f9' },
    { name: 'secondary-100', hex: '#cceff3' },
    { name: 'secondary-200', hex: '#99dfe7' },
    { name: 'secondary-300', hex: '#4dc5d4' },
    { name: 'secondary-400', hex: '#1aabb9' },
    { name: 'secondary-500', hex: '#028393', main: true },
    { name: 'secondary-600', hex: '#026d7a' },
    { name: 'secondary-700', hex: '#025762' },
    { name: 'secondary-800', hex: '#014149' },
    { name: 'secondary-900', hex: '#012b31' },
    { name: 'secondary-950', hex: '#001518' },
  ],
  accent: [
    { name: 'accent-50', hex: '#fff5f0' },
    { name: 'accent-100', hex: '#ffe8de' },
    { name: 'accent-200', hex: '#ffd0bd' },
    { name: 'accent-300', hex: '#ffab8c' },
    { name: 'accent-400', hex: '#fa7d4d' },
    { name: 'accent-500', hex: '#f65625', main: true },
    { name: 'accent-600', hex: '#d9441a' },
    { name: 'accent-700', hex: '#b53615' },
    { name: 'accent-800', hex: '#912b11' },
    { name: 'accent-900', hex: '#6d200d' },
    { name: 'accent-950', hex: '#3a1006' },
  ],
  additional: [
    { name: 'peach', hex: '#faaa68' },
    { name: 'light-blue', hex: '#98c1d9' },
    { name: 'slate', hex: '#3d5a80' },
  ],
}

export default function BrandBiblePage() {
  return (
    <main className="bg-white">
      {/* Secondary Page Navigation - sits under global header */}
      <nav className="fixed top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-sm border-b border-gray-200">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-12">
            <div className="flex items-center gap-2">
              <span className="font-mono text-[10px] tracking-wider uppercase text-gray-400">Page:</span>
              <span className="font-heading text-sm font-medium text-brand-800">Brand Bible</span>
            </div>
            <div className="hidden md:flex items-center gap-1">
              <a href="#colors" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Colors</a>
              <a href="#typography" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Typography</a>
              <a href="#heroes" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Hero Presets</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero - Using Clean Slate preset */}
      <div className="pt-12">
        <HeroCleanSlate
          headline="Brand Bible"
          subheadline="All the styles we use to build an amazing platform. Colors, typography, and component presets for Sidekick Strategies."
          primaryCta={{ label: "View Colors", href: "#colors" }}
          secondaryCta={{ label: "Hero Presets", href: "#heroes" }}
          showBadge={false}
        />
      </div>

      {/* Colors Section */}
      <section id="colors" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-brand-800 mb-4">Color Palette</h2>
          <p className="font-sans text-gray-600 mb-12 max-w-2xl">
            Our brand colors create a professional, trustworthy feel with energetic accent options.
          </p>

          {/* Primary Colors */}
          <div className="mb-12">
            <h3 className="font-heading text-lg text-brand-800 mb-4 uppercase tracking-wider">Primary — Navy</h3>
            <div className="grid grid-cols-11 gap-1">
              {brandColors.primary.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className={`h-20 rounded-t ${color.main ? 'ring-2 ring-peach ring-offset-2' : ''}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="bg-gray-100 p-2 rounded-b">
                    <p className="font-mono text-[10px] text-gray-600">{color.name.split('-')[1]}</p>
                    <p className="font-mono text-[9px] text-gray-400">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Secondary Colors */}
          <div className="mb-12">
            <h3 className="font-heading text-lg text-brand-800 mb-4 uppercase tracking-wider">Secondary — Teal</h3>
            <div className="grid grid-cols-11 gap-1">
              {brandColors.secondary.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className={`h-20 rounded-t ${color.main ? 'ring-2 ring-peach ring-offset-2' : ''}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="bg-gray-100 p-2 rounded-b">
                    <p className="font-mono text-[10px] text-gray-600">{color.name.split('-')[1]}</p>
                    <p className="font-mono text-[9px] text-gray-400">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Accent Colors */}
          <div className="mb-12">
            <h3 className="font-heading text-lg text-brand-800 mb-4 uppercase tracking-wider">Accent — Orange</h3>
            <div className="grid grid-cols-11 gap-1">
              {brandColors.accent.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className={`h-20 rounded-t ${color.main ? 'ring-2 ring-peach ring-offset-2' : ''}`}
                    style={{ backgroundColor: color.hex }}
                  />
                  <div className="bg-gray-100 p-2 rounded-b">
                    <p className="font-mono text-[10px] text-gray-600">{color.name.split('-')[1]}</p>
                    <p className="font-mono text-[9px] text-gray-400">{color.hex}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Additional Colors */}
          <div>
            <h3 className="font-heading text-lg text-brand-800 mb-4 uppercase tracking-wider">Additional Colors</h3>
            <div className="flex gap-4">
              {brandColors.additional.map((color) => (
                <div key={color.name} className="text-center">
                  <div
                    className="w-24 h-24 rounded-lg shadow-md"
                    style={{ backgroundColor: color.hex }}
                  />
                  <p className="font-mono text-sm text-gray-600 mt-2">{color.name}</p>
                  <p className="font-mono text-xs text-gray-400">{color.hex}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Typography Section */}
      <section id="typography" className="py-20 bg-gray-50 scroll-mt-20">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-4xl text-brand-800 mb-4">Typography</h2>
          <p className="font-sans text-gray-600 mb-12 max-w-2xl">
            A refined type system combining classic serifs for headlines with modern sans-serifs for readability.
          </p>

          <div className="grid md:grid-cols-2 gap-12">
            {/* Serif - Headlines */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <span className="font-mono text-xs text-secondary-500 uppercase tracking-wider">H1 & H2</span>
              <h3 className="font-serif text-5xl text-brand-800 mt-4 mb-2">Palatino Linotype</h3>
              <p className="font-sans text-gray-500 text-sm mb-6">Classic serif for major headlines</p>
              <div className="space-y-4 border-t pt-6">
                <p className="font-serif text-6xl text-brand-800">Aa</p>
                <p className="font-serif text-2xl text-gray-600">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>

            {/* Heading - Montserrat */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <span className="font-mono text-xs text-secondary-500 uppercase tracking-wider">H3 & H4</span>
              <h3 className="font-heading text-4xl text-brand-800 mt-4 mb-2 font-semibold">Montserrat</h3>
              <p className="font-sans text-gray-500 text-sm mb-6">Modern sans for subheadings</p>
              <div className="space-y-4 border-t pt-6">
                <p className="font-heading text-6xl text-brand-800 font-bold">Aa</p>
                <p className="font-heading text-xl text-gray-600">The quick brown fox jumps over the lazy dog.</p>
              </div>
            </div>

            {/* Body - PT Sans */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <span className="font-mono text-xs text-secondary-500 uppercase tracking-wider">Body Text</span>
              <h3 className="font-sans text-4xl text-brand-800 mt-4 mb-2">PT Sans</h3>
              <p className="font-sans text-gray-500 text-sm mb-6">Clean, readable body text</p>
              <div className="space-y-4 border-t pt-6">
                <p className="font-sans text-6xl text-brand-800">Aa</p>
                <p className="font-sans text-lg text-gray-600 leading-relaxed">
                  The quick brown fox jumps over the lazy dog. Pack my box with five dozen liquor jugs.
                </p>
              </div>
            </div>

            {/* Mono - IBM Plex */}
            <div className="bg-white p-8 rounded-lg shadow-sm">
              <span className="font-mono text-xs text-secondary-500 uppercase tracking-wider">Code & Labels</span>
              <h3 className="font-mono text-3xl text-brand-800 mt-4 mb-2">IBM Plex Mono</h3>
              <p className="font-sans text-gray-500 text-sm mb-6">Technical text and labels</p>
              <div className="space-y-4 border-t pt-6">
                <p className="font-mono text-6xl text-brand-800">Aa</p>
                <p className="font-mono text-sm text-gray-600">const strategy = new Sidekick();</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Hero Presets Section */}
      <section id="heroes" className="scroll-mt-20">
        <div className="bg-brand-800 py-20">
          <div className="container mx-auto px-6">
            <h2 className="font-serif text-4xl text-white mb-4">Hero Presets</h2>
            <p className="font-sans text-white/70 mb-8 max-w-2xl">
              Four distinct hero styles, from minimalist to ultra-premium. Each is production-ready and customizable.
            </p>
            <div className="flex flex-wrap gap-3">
              {heroPresets.map((preset, i) => (
                <a
                  key={preset.id}
                  href={`#${preset.id}`}
                  className="
                    px-4 py-2
                    bg-white/10 hover:bg-white/20
                    border border-white/20 hover:border-peach
                    text-white text-sm font-mono
                    transition-all duration-200
                  "
                >
                  0{i + 1} — {preset.name}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Hero 1: Clean Slate */}
        <div id="clean-slate" className="relative scroll-mt-16">
          <div className="absolute top-8 left-6 z-10 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-xl rounded">
            <span className="font-mono text-xs text-accent-500">01</span>
            <h3 className="font-heading text-xl text-brand-800 font-semibold">Clean Slate</h3>
            <p className="text-sm text-gray-500 mt-1">Minimalist / Typography-Focused</p>
          </div>
          <HeroCleanSlate />
        </div>

        {/* Hero 2: Bold Edge */}
        <div id="bold-edge" className="relative scroll-mt-16">
          <div className="absolute top-8 left-6 z-10 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-xl rounded">
            <span className="font-mono text-xs text-accent-500">02</span>
            <h3 className="font-heading text-xl text-brand-800 font-semibold">Bold Edge</h3>
            <p className="text-sm text-gray-500 mt-1">Geometric / Strong Brand</p>
          </div>
          <HeroBoldEdge />
        </div>

        {/* Hero 3: Flow State */}
        <div id="flow-state" className="relative scroll-mt-16">
          <div className="absolute top-8 left-6 z-10 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-xl rounded">
            <span className="font-mono text-xs text-accent-500">03</span>
            <h3 className="font-heading text-xl text-brand-800 font-semibold">Flow State</h3>
            <p className="text-sm text-gray-500 mt-1">Gradient / Modern Movement</p>
          </div>
          <HeroFlowState />
        </div>

        {/* Hero 4: Executive Suite */}
        <div id="executive-suite" className="relative scroll-mt-16">
          <div className="absolute top-8 left-6 z-10 bg-white/95 backdrop-blur-sm px-5 py-4 shadow-xl rounded">
            <span className="font-mono text-xs text-accent-500">04</span>
            <h3 className="font-heading text-xl text-brand-800 font-semibold">Executive Suite</h3>
            <p className="text-sm text-gray-500 mt-1">Luxury / Ultra-Premium</p>
          </div>
          <HeroExecutiveSuite />
        </div>
      </section>

      {/* Summary Footer */}
      <footer className="bg-gray-950 text-white py-20">
        <div className="container mx-auto px-6">
          <h2 className="font-serif text-3xl mb-12">Hero Preset Summary</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {heroPresets.map((preset, i) => (
              <a
                key={preset.id}
                href={`#${preset.id}`}
                className="group p-6 border border-white/10 hover:border-peach/50 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-peach text-sm">0{i + 1}</span>
                  <h3 className="font-heading text-lg group-hover:text-peach transition-colors">{preset.name}</h3>
                </div>
                <p className="text-gray-400 text-sm leading-relaxed">{preset.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-[10px] font-mono bg-white/5 text-gray-500 uppercase">
                    {preset.style}
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-white/5 text-gray-500 uppercase">
                    {preset.background}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="font-mono text-xs text-gray-500">
              Sidekick Strategies Brand Bible — Design System v1.0
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
