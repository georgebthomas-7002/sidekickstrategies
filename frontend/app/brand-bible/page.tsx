/**
 * Brand Bible - Sidekick Strategies
 * Complete brand system documentation with hero presets
 */

'use client'

import { useEffect, useState } from 'react'
import {
  HeroCleanSlate,
  HeroBoldEdge,
  HeroFlowState,
  HeroExecutiveSuite,
  heroPresets,
} from '@/app/components/heroes'

// Note: metadata moved to layout.tsx for client component compatibility

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
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

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
              <a href="#buttons" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Buttons</a>
              <a href="#heroes" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Hero Presets</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Hero - Custom Brand Bible Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-white overflow-hidden pt-12">
        {/* Subtle decorative elements */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-brand-800/20 to-transparent" />
        <div
          className={`
            absolute bottom-24 left-12 md:left-24 w-20 h-[2px] bg-accent-500
            transition-all duration-1000 delay-500
            ${mounted ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0'}
          `}
          style={{ transformOrigin: 'left' }}
        />

        <div className="container mx-auto px-6 md:px-12 lg:px-24">
          <div className="max-w-4xl">
            {/* Eyebrow */}
            <div
              className={`
                mb-6 transition-all duration-700 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}
              `}
            >
              <span className="font-mono text-sm tracking-[0.2em] uppercase text-secondary-500">
                Sidekick Strategies Design System
              </span>
            </div>

            {/* Headline - Dark Blue */}
            <h1
              className={`
                font-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl
                text-brand-800 leading-[1.05] tracking-tight
                transition-all duration-700 delay-100 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              Brand Bible
            </h1>

            {/* Subheadline */}
            <p
              className={`
                mt-8 md:mt-10 font-sans text-lg md:text-xl text-gray-600
                max-w-2xl leading-relaxed
                transition-all duration-700 delay-200 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              All the styles we use to build an amazing platform. Colors, typography, buttons, and component presets for Sidekick Strategies.
            </p>

            {/* CTAs - Modern Button Styles */}
            <div
              className={`
                mt-12 md:mt-14 flex flex-col sm:flex-row gap-4 sm:gap-5
                transition-all duration-700 delay-300 ease-out
                ${mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
              `}
            >
              {/* Primary Button - Orange */}
              <a
                href="#colors"
                className="
                  group inline-flex items-center justify-center
                  px-8 py-4
                  bg-accent-500 text-white
                  font-heading text-sm tracking-wide uppercase font-semibold
                  rounded-lg
                  shadow-lg shadow-accent-500/20
                  transition-all duration-300
                  hover:bg-accent-600 hover:shadow-xl hover:shadow-accent-500/30 hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-accent-500 focus:ring-offset-2
                "
              >
                View Colors
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>

              {/* Secondary Button - Light Blue */}
              <a
                href="#heroes"
                className="
                  group inline-flex items-center justify-center
                  px-8 py-4
                  bg-light-blue text-brand-900
                  font-heading text-sm tracking-wide uppercase font-semibold
                  rounded-lg
                  shadow-lg shadow-light-blue/20
                  transition-all duration-300
                  hover:bg-[#7fb3cf] hover:shadow-xl hover:shadow-light-blue/30 hover:-translate-y-0.5
                  focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2
                "
              >
                Hero Presets
                <svg
                  className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>

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

      {/* Buttons Section */}
      <section id="buttons" className="py-20 scroll-mt-20">
        <div className="container mx-auto px-6">
          <div className="mb-12">
            <span className="font-mono text-xs text-accent-500 uppercase tracking-wider">01 — Core Variants</span>
            <h2 className="font-serif text-4xl text-brand-800 mt-2 mb-4">Button Styles</h2>
            <p className="font-sans text-gray-600 max-w-2xl">
              Seven distinctive button styles, each crafted for specific use cases with careful attention to contrast, hierarchy, and interaction.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Button 1: Primary Orange */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-accent-500 uppercase tracking-wider">01</span>
                <h3 className="font-heading text-lg text-brand-800 font-semibold mt-1">Primary Action</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Main CTAs and priority actions</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.25)' }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9441a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                >
                  Get Started
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-orange-50 text-orange-600 rounded">bg: #f65625</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">hover: #d9441a</span>
              </div>
            </div>

            {/* Button 2: Secondary Light Blue */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-light-blue uppercase tracking-wider">02</span>
                <h3 className="font-heading text-lg text-brand-800 font-semibold mt-1">Secondary Action</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Supporting and alternative actions</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    bg-light-blue text-brand-900
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    shadow-lg shadow-light-blue/25
                    transition-all duration-300
                    hover:bg-[#7aafcc] hover:shadow-xl hover:shadow-light-blue/40 hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-light-blue focus:ring-offset-2
                  "
                >
                  Learn More
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-blue-50 text-slate rounded">bg: #98c1d9</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">hover: #7aafcc</span>
              </div>
            </div>

            {/* Button 3: Navy Solid */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-blue-600 uppercase tracking-wider">03</span>
                <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Navy Solid</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Professional and authoritative</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  style={{ backgroundColor: '#142d63', boxShadow: '0 10px 15px -3px rgba(20, 45, 99, 0.25)' }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1e3561'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#142d63'}
                >
                  Contact Us
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-blue-50 text-blue-700 rounded">bg: #142d63</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">hover: #1e3561</span>
              </div>
            </div>

            {/* Button 4: Teal Action */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-teal-500 uppercase tracking-wider">04</span>
                <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Teal Action</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Fresh alternative accent</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  style={{ backgroundColor: '#028393', boxShadow: '0 10px 15px -3px rgba(2, 131, 147, 0.25)' }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:shadow-xl hover:-translate-y-0.5
                    active:translate-y-0 active:shadow-md
                    focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#026d7a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#028393'}
                >
                  Explore
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-teal-50 text-teal-600 rounded">bg: #028393</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">hover: #026d7a</span>
              </div>
            </div>

            {/* Button 5: Ghost / Outline */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-orange-400 uppercase tracking-wider">05</span>
                <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Ghost Outline</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Subtle, non-competing actions</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  style={{ borderColor: '#f65625', color: '#f65625' }}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3.5
                    bg-transparent
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    border-2
                    transition-all duration-300
                    hover:-translate-y-0.5
                    active:translate-y-0
                    focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2
                  "
                  onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#f65625'; e.currentTarget.style.color = 'white'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = '#f65625'; }}
                >
                  View Details
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">border: #f65625</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-orange-50 text-orange-600 rounded">hover: fill</span>
              </div>
            </div>

            {/* Button 6: Gradient */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span style={{ color: '#faaa68' }} className="font-mono text-xs uppercase tracking-wider">06</span>
                <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Gradient Premium</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">High-impact premium actions</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  style={{ background: 'linear-gradient(to right, #f65625, #faaa68)', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.3)' }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-6 py-3.5
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-500
                    hover:shadow-xl hover:-translate-y-0.5 hover:scale-[1.02]
                    active:translate-y-0 active:scale-100
                    focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2
                  "
                  onMouseEnter={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #d9441a, #f65625)'}
                  onMouseLeave={(e) => e.currentTarget.style.background = 'linear-gradient(to right, #f65625, #faaa68)'}
                >
                  Upgrade Now
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-gradient-to-r from-orange-100 to-amber-100 text-orange-600 rounded">gradient</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">hover: shift</span>
              </div>
            </div>

            {/* Button 7: Text Link */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span style={{ color: '#3d5a80' }} className="font-mono text-xs uppercase tracking-wider">07</span>
                <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Text Link</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Inline and minimal actions</p>
              </div>
              <div className="flex justify-center min-h-[80px] items-center mb-4">
                <button
                  style={{ color: '#142d63' }}
                  className="
                    inline-flex items-center justify-center gap-2
                    px-4 py-3
                    bg-transparent
                    font-heading text-sm tracking-wide uppercase font-semibold
                    transition-all duration-300
                    group
                  "
                  onMouseEnter={(e) => e.currentTarget.style.color = '#f65625'}
                  onMouseLeave={(e) => e.currentTarget.style.color = '#142d63'}
                >
                  <span className="relative">
                    Read More
                    <span style={{ backgroundColor: '#f65625' }} className="absolute bottom-0 left-0 w-0 h-0.5 transition-all duration-300 group-hover:w-full"></span>
                  </span>
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </button>
              </div>
              <div className="flex flex-wrap gap-1.5">
                <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">text only</span>
                <span className="px-2 py-1 text-[10px] font-mono bg-orange-50 text-orange-600 rounded">hover: underline</span>
              </div>
            </div>
          </div>

          {/* Dark Background Button Examples */}
          <div className="mt-16">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">02 — Dark Mode</span>
            <h3 className="font-heading text-2xl text-gray-800 font-semibold mt-2 mb-6">On Dark Backgrounds</h3>
            <div style={{ backgroundColor: '#0f2250' }} className="rounded-2xl p-8 md:p-12 relative overflow-hidden">
              {/* Subtle glow effect */}
              <div style={{ backgroundColor: 'rgba(246, 86, 37, 0.05)' }} className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl"></div>

              <div className="relative grid grid-cols-2 md:grid-cols-5 gap-6">
                {/* Primary on Dark */}
                <div className="text-center">
                  <button
                    style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.3)' }}
                    className="
                      inline-flex items-center justify-center
                      px-6 py-3.5
                      text-white
                      font-heading text-sm tracking-wide uppercase font-semibold
                      rounded-lg
                      transition-all duration-300
                      hover:shadow-xl hover:-translate-y-0.5
                    "
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#fa7d4d'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                  >
                    Primary
                  </button>
                  <p className="font-mono text-[10px] text-white/40 mt-3 uppercase tracking-wider">Orange on Navy</p>
                </div>

                {/* Light Blue on Dark */}
                <div className="text-center">
                  <button
                    style={{ backgroundColor: '#98c1d9', color: '#0f2250', boxShadow: '0 10px 15px -3px rgba(152, 193, 217, 0.3)' }}
                    className="
                      inline-flex items-center justify-center
                      px-6 py-3.5
                      font-heading text-sm tracking-wide uppercase font-semibold
                      rounded-lg
                      transition-all duration-300
                      hover:shadow-xl hover:-translate-y-0.5
                    "
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#98c1d9'; }}
                  >
                    Secondary
                  </button>
                  <p className="font-mono text-[10px] text-white/40 mt-3 uppercase tracking-wider">Light Blue</p>
                </div>

                {/* Teal on Dark */}
                <div className="text-center">
                  <button
                    style={{ backgroundColor: '#028393', boxShadow: '0 10px 15px -3px rgba(2, 131, 147, 0.3)' }}
                    className="
                      inline-flex items-center justify-center
                      px-6 py-3.5
                      text-white
                      font-heading text-sm tracking-wide uppercase font-semibold
                      rounded-lg
                      transition-all duration-300
                      hover:shadow-xl hover:-translate-y-0.5
                    "
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#1aabb9'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#028393'}
                  >
                    Teal
                  </button>
                  <p className="font-mono text-[10px] text-white/40 mt-3 uppercase tracking-wider">Teal Accent</p>
                </div>

                {/* Gradient on Dark */}
                <div className="text-center">
                  <button
                    style={{ background: 'linear-gradient(to right, #f65625, #faaa68)', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.3)' }}
                    className="
                      inline-flex items-center justify-center
                      px-6 py-3.5
                      text-white
                      font-heading text-sm tracking-wide uppercase font-semibold
                      rounded-lg
                      transition-all duration-300
                      hover:shadow-xl hover:-translate-y-0.5
                    "
                  >
                    Gradient
                  </button>
                  <p className="font-mono text-[10px] text-white/40 mt-3 uppercase tracking-wider">Premium</p>
                </div>

                {/* Ghost on Dark */}
                <div className="text-center">
                  <button
                    style={{ borderColor: 'rgba(255,255,255,0.4)' }}
                    className="
                      inline-flex items-center justify-center
                      px-6 py-3.5
                      bg-transparent text-white
                      font-heading text-sm tracking-wide uppercase font-semibold
                      rounded-lg
                      border-2
                      transition-all duration-300
                      hover:-translate-y-0.5
                    "
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = '#142d63'; e.currentTarget.style.borderColor = 'white'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.4)'; }}
                  >
                    Ghost
                  </button>
                  <p className="font-mono text-[10px] text-white/40 mt-3 uppercase tracking-wider">White Outline</p>
                </div>
              </div>
            </div>
          </div>

          {/* Button States */}
          <div className="mt-16">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">03 — Interaction</span>
            <h3 className="font-heading text-2xl text-gray-800 font-semibold mt-2 mb-6">Button States</h3>
            <p className="font-sans text-gray-600 mb-8 max-w-2xl">
              Comprehensive state handling for loading, disabled, and focus states.
            </p>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {/* Default */}
              <div className="text-center">
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.25)' }}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3.5
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9441a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                >
                  Default
                </button>
                <p className="font-mono text-[10px] text-gray-400 mt-3 uppercase tracking-wider">Normal State</p>
              </div>

              {/* Loading */}
              <div className="text-center">
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.25)' }}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3.5
                    text-transparent
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    relative cursor-wait
                  "
                  disabled
                >
                  Loading
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </button>
                <p className="font-mono text-[10px] text-gray-400 mt-3 uppercase tracking-wider">Loading State</p>
              </div>

              {/* Disabled */}
              <div className="text-center">
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.25)' }}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3.5
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    opacity-50 cursor-not-allowed
                  "
                  disabled
                >
                  Disabled
                </button>
                <p className="font-mono text-[10px] text-gray-400 mt-3 uppercase tracking-wider">Disabled State</p>
              </div>

              {/* Secondary Loading */}
              <div className="text-center">
                <button
                  style={{ backgroundColor: '#98c1d9', boxShadow: '0 10px 15px -3px rgba(152, 193, 217, 0.25)' }}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3.5
                    text-transparent
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    relative cursor-wait
                  "
                  disabled
                >
                  Loading
                  <span className="absolute inset-0 flex items-center justify-center">
                    <svg style={{ color: '#142d63' }} className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  </span>
                </button>
                <p className="font-mono text-[10px] text-gray-400 mt-3 uppercase tracking-wider">Secondary Loading</p>
              </div>
            </div>
          </div>

          {/* Button Groups */}
          <div className="mt-16">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">04 — Composition</span>
            <h3 className="font-heading text-2xl text-gray-800 font-semibold mt-2 mb-6">Button Groups</h3>
            <p className="font-sans text-gray-600 mb-8 max-w-2xl">
              Segmented controls and action groups for related options.
            </p>

            <div className="flex flex-wrap gap-8 items-center">
              {/* Toggle Group */}
              <div style={{ borderColor: '#142d63' }} className="inline-flex rounded-lg overflow-hidden border-2">
                <button style={{ color: '#142d63' }} className="px-5 py-3 bg-transparent font-heading text-sm uppercase font-semibold hover:bg-blue-50 transition-colors">
                  Day
                </button>
                <button style={{ backgroundColor: '#142d63' }} className="px-5 py-3 text-white font-heading text-sm uppercase font-semibold">
                  Week
                </button>
                <button style={{ color: '#142d63' }} className="px-5 py-3 bg-transparent font-heading text-sm uppercase font-semibold hover:bg-blue-50 transition-colors">
                  Month
                </button>
              </div>

              {/* Action Group */}
              <div className="inline-flex rounded-lg overflow-hidden">
                <button style={{ backgroundColor: '#f65625' }} className="px-6 py-3.5 text-white font-heading text-sm uppercase font-semibold hover:opacity-90 transition-colors">
                  Save
                </button>
                <button style={{ color: '#f65625', borderColor: '#f65625' }} className="px-6 py-3.5 bg-transparent font-heading text-sm uppercase font-semibold border-2 border-l-0 hover:bg-orange-50 transition-colors">
                  Cancel
                </button>
              </div>
            </div>
          </div>

          {/* Button Sizing */}
          <div className="mt-16">
            <span className="font-mono text-xs text-orange-500 uppercase tracking-wider">05 — Scale</span>
            <h3 className="font-heading text-2xl text-gray-800 font-semibold mt-2 mb-6">Size Variations</h3>
            <p className="font-sans text-gray-600 mb-8 max-w-2xl">
              Four sizes to accommodate different contexts—from compact inline actions to prominent hero CTAs.
            </p>

            <div className="bg-gray-50 rounded-xl p-8">
              <div className="flex flex-wrap items-center gap-4">
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 4px 6px -1px rgba(246, 86, 37, 0.2)' }}
                  className="
                    inline-flex items-center justify-center
                    px-4 py-2
                    text-white
                    font-heading text-xs tracking-wide uppercase font-semibold
                    rounded-md
                    transition-all duration-300
                    hover:-translate-y-0.5
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9441a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                >
                  Small
                </button>
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.2)' }}
                  className="
                    inline-flex items-center justify-center
                    px-6 py-3
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9441a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                >
                  Medium
                </button>
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 10px 15px -3px rgba(246, 86, 37, 0.2)' }}
                  className="
                    inline-flex items-center justify-center
                    px-8 py-4
                    text-white
                    font-heading text-sm tracking-wide uppercase font-semibold
                    rounded-lg
                    transition-all duration-300
                    hover:-translate-y-0.5
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9441a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                >
                  Large
                </button>
                <button
                  style={{ backgroundColor: '#f65625', boxShadow: '0 20px 25px -5px rgba(246, 86, 37, 0.25)' }}
                  className="
                    inline-flex items-center justify-center
                    px-10 py-5
                    text-white
                    font-heading text-base tracking-wide uppercase font-semibold
                    rounded-xl
                    transition-all duration-300
                    hover:-translate-y-0.5
                  "
                  onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#d9441a'}
                  onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#f65625'}
                >
                  Extra Large
                </button>
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
