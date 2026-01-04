/**
 * Brand Bible - Sidekick Strategies
 * Complete brand system documentation with 6 hero presets
 */

'use client'

import { useEffect, useState } from 'react'
import {
  HeroCleanSlate,
  HeroBoldEdge,
  HeroGradientFlow,
  HeroAuroraPulse,
  HeroKineticGrid,
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

// Hero component map for dynamic rendering
const heroComponents = {
  'clean-slate': HeroCleanSlate,
  'bold-edge': HeroBoldEdge,
  'gradient-flow': HeroGradientFlow,
  'aurora-pulse': HeroAuroraPulse,
  'kinetic-grid': HeroKineticGrid,
  'executive-suite': HeroExecutiveSuite,
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

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MAIN HERO - Using HeroCleanSlate */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <HeroCleanSlate
        headline="Brand Bible"
        subheadline="All the styles we use to build an amazing platform. Colors, typography, buttons, and component presets for Sidekick Strategies."
        primaryCta={{ label: "View Colors", href: "#colors" }}
        secondaryCta={{ label: "Hero Presets", href: "#heroes" }}
      />

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

      {/* Typography Section - Comprehensive */}
      <section id="typography" className="py-24 scroll-mt-20 relative overflow-hidden">
        {/* Subtle background pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23142d63' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />

        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div className="mb-16">
            <span style={{ color: '#028393' }} className="font-mono text-xs uppercase tracking-[0.2em]">
              Type System
            </span>
            <h2 style={{ color: '#142d63' }} className="font-serif text-5xl md:text-6xl mt-3 mb-6">
              Typography
            </h2>
            <p className="font-sans text-gray-600 text-lg max-w-2xl leading-relaxed">
              A refined type system combining classic serifs for headlines with modern sans-serifs for readability.
              Every text style is crafted for hierarchy, legibility, and brand consistency.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* HEADING HIERARCHY */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div style={{ backgroundColor: '#f65625' }} className="w-8 h-[2px]" />
              <span style={{ color: '#f65625' }} className="font-mono text-xs uppercase tracking-[0.15em]">
                01 — Heading Hierarchy
              </span>
            </div>

            <div className="space-y-1">
              {/* H1 */}
              <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-24 shrink-0">
                    <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">H1</span>
                  </div>
                  <div className="flex-1">
                    <h1 style={{ color: '#142d63' }} className="font-serif text-5xl md:text-6xl lg:text-7xl leading-[1.1] tracking-tight">
                      Strategy that moves you forward
                    </h1>
                  </div>
                  <div className="lg:w-48 shrink-0 text-right">
                    <p className="font-mono text-[10px] text-gray-400">Palatino Linotype</p>
                    <p className="font-mono text-[10px] text-gray-400">4.5rem / 72px</p>
                  </div>
                </div>
              </div>

              {/* H2 */}
              <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-24 shrink-0">
                    <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">H2</span>
                  </div>
                  <div className="flex-1">
                    <h2 style={{ color: '#142d63' }} className="font-serif text-4xl md:text-5xl leading-[1.15] tracking-tight">
                      Building competitive advantages
                    </h2>
                  </div>
                  <div className="lg:w-48 shrink-0 text-right">
                    <p className="font-mono text-[10px] text-gray-400">Palatino Linotype</p>
                    <p className="font-mono text-[10px] text-gray-400">3rem / 48px</p>
                  </div>
                </div>
              </div>

              {/* H3 */}
              <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-24 shrink-0">
                    <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">H3</span>
                  </div>
                  <div className="flex-1">
                    <h3 style={{ color: '#142d63' }} className="font-heading text-2xl md:text-3xl font-semibold leading-tight">
                      Navigate complexity with clarity
                    </h3>
                  </div>
                  <div className="lg:w-48 shrink-0 text-right">
                    <p className="font-mono text-[10px] text-gray-400">Montserrat Semibold</p>
                    <p className="font-mono text-[10px] text-gray-400">1.875rem / 30px</p>
                  </div>
                </div>
              </div>

              {/* H4 */}
              <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-24 shrink-0">
                    <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">H4</span>
                  </div>
                  <div className="flex-1">
                    <h4 style={{ color: '#142d63' }} className="font-heading text-xl md:text-2xl font-semibold">
                      Transforming challenges into opportunities
                    </h4>
                  </div>
                  <div className="lg:w-48 shrink-0 text-right">
                    <p className="font-mono text-[10px] text-gray-400">Montserrat Semibold</p>
                    <p className="font-mono text-[10px] text-gray-400">1.5rem / 24px</p>
                  </div>
                </div>
              </div>

              {/* H5 */}
              <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-24 shrink-0">
                    <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">H5</span>
                  </div>
                  <div className="flex-1">
                    <h5 style={{ color: '#142d63' }} className="font-heading text-lg md:text-xl font-medium">
                      Delivering measurable results every time
                    </h5>
                  </div>
                  <div className="lg:w-48 shrink-0 text-right">
                    <p className="font-mono text-[10px] text-gray-400">Montserrat Medium</p>
                    <p className="font-mono text-[10px] text-gray-400">1.25rem / 20px</p>
                  </div>
                </div>
              </div>

              {/* H6 */}
              <div className="group bg-white rounded-xl p-8 border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="flex flex-col lg:flex-row lg:items-center gap-6">
                  <div className="lg:w-24 shrink-0">
                    <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">H6</span>
                  </div>
                  <div className="flex-1">
                    <h6 style={{ color: '#142d63' }} className="font-heading text-base font-medium uppercase tracking-wider">
                      Section Label or Category
                    </h6>
                  </div>
                  <div className="lg:w-48 shrink-0 text-right">
                    <p className="font-mono text-[10px] text-gray-400">Montserrat Medium</p>
                    <p className="font-mono text-[10px] text-gray-400">1rem / 16px • Uppercase</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* BODY TEXT STYLES */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-20">
            <div className="flex items-center gap-4 mb-10">
              <div style={{ backgroundColor: '#f65625' }} className="w-8 h-[2px]" />
              <span style={{ color: '#f65625' }} className="font-mono text-xs uppercase tracking-[0.15em]">
                02 — Body Text Styles
              </span>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {/* Lead Paragraph */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Lead Paragraph</span>
                  <span className="font-mono text-[10px] text-gray-400">PT Sans • 20px</span>
                </div>
                <p className="font-sans text-xl text-gray-600 leading-relaxed">
                  We partner with ambitious organizations to solve complex challenges and unlock sustainable growth.
                  Our approach combines strategic insight with hands-on execution.
                </p>
              </div>

              {/* Body Paragraph */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Body Paragraph</span>
                  <span className="font-mono text-[10px] text-gray-400">PT Sans • 16px</span>
                </div>
                <p className="font-sans text-base text-gray-600 leading-relaxed">
                  Every engagement begins with understanding. We dive deep into your business, market dynamics,
                  and competitive landscape to identify opportunities that others miss. Our team brings decades
                  of experience across industries and disciplines.
                </p>
              </div>

              {/* Small Text */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Small Text</span>
                  <span className="font-mono text-[10px] text-gray-400">PT Sans • 14px</span>
                </div>
                <p className="font-sans text-sm text-gray-500 leading-relaxed">
                  Additional context or supplementary information that supports the main content.
                  This size works well for metadata, timestamps, and secondary descriptions.
                </p>
              </div>

              {/* Caption */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300">
                <div className="flex items-center justify-between mb-6">
                  <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Caption</span>
                  <span className="font-mono text-[10px] text-gray-400">PT Sans Italic • 12px</span>
                </div>
                <p className="font-sans text-xs text-gray-400 italic leading-relaxed">
                  Image captions, figure descriptions, and footnotes use this style.
                  The italic treatment provides visual differentiation from body text.
                </p>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* FONT SPECIMENS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-4 mb-10">
              <div style={{ backgroundColor: '#f65625' }} className="w-8 h-[2px]" />
              <span style={{ color: '#f65625' }} className="font-mono text-xs uppercase tracking-[0.15em]">
                03 — Font Specimens
              </span>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {/* Palatino */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Headlines</span>
                <h3 style={{ color: '#142d63' }} className="font-serif text-4xl mt-4 mb-2">Palatino</h3>
                <p className="font-sans text-gray-400 text-xs mb-6">Classic serif elegance</p>
                <div style={{ borderTopColor: '#f0f4fa' }} className="border-t pt-6">
                  <p style={{ color: '#142d63' }} className="font-serif text-6xl group-hover:scale-105 transition-transform origin-left">Aa</p>
                </div>
              </div>

              {/* Montserrat */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Subheadings</span>
                <h3 style={{ color: '#142d63' }} className="font-heading text-3xl font-semibold mt-4 mb-2">Montserrat</h3>
                <p className="font-sans text-gray-400 text-xs mb-6">Modern sans-serif</p>
                <div style={{ borderTopColor: '#f0f4fa' }} className="border-t pt-6">
                  <p style={{ color: '#142d63' }} className="font-heading text-6xl font-bold group-hover:scale-105 transition-transform origin-left">Aa</p>
                </div>
              </div>

              {/* PT Sans */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Body Text</span>
                <h3 style={{ color: '#142d63' }} className="font-sans text-3xl mt-4 mb-2">PT Sans</h3>
                <p className="font-sans text-gray-400 text-xs mb-6">Clean readability</p>
                <div style={{ borderTopColor: '#f0f4fa' }} className="border-t pt-6">
                  <p style={{ color: '#142d63' }} className="font-sans text-6xl group-hover:scale-105 transition-transform origin-left">Aa</p>
                </div>
              </div>

              {/* IBM Plex */}
              <div className="bg-white rounded-xl p-8 border border-gray-100 hover:shadow-lg transition-all duration-300 group">
                <span style={{ color: '#028393' }} className="font-mono text-[10px] uppercase tracking-wider">Code & Labels</span>
                <h3 style={{ color: '#142d63' }} className="font-mono text-2xl mt-4 mb-2">IBM Plex Mono</h3>
                <p className="font-sans text-gray-400 text-xs mb-6">Technical precision</p>
                <div style={{ borderTopColor: '#f0f4fa' }} className="border-t pt-6">
                  <p style={{ color: '#142d63' }} className="font-mono text-6xl group-hover:scale-105 transition-transform origin-left">Aa</p>
                </div>
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

            {/* Button 2: Teal Action */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-teal-500 uppercase tracking-wider">02</span>
                <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Teal Action</h3>
                <p className="font-sans text-sm text-gray-500 mt-1">Secondary emphasis actions</p>
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

            {/* Button 4: Ghost Outline */}
            <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
              <div className="mb-6">
                <span className="font-mono text-xs text-orange-400 uppercase tracking-wider">04</span>
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
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* HERO PRESETS SECTION - REDESIGNED SHOWCASE */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="heroes" className="scroll-mt-20">
        {/* Hero Section Header */}
        <div style={{ backgroundColor: '#0a1633' }} className="py-24 relative overflow-hidden">
          {/* Decorative elements */}
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[150px]"
            style={{ backgroundColor: 'rgba(2, 131, 147, 0.15)' }}
          />
          <div
            className="absolute bottom-0 left-1/4 w-80 h-80 rounded-full blur-[120px]"
            style={{ backgroundColor: 'rgba(246, 86, 37, 0.1)' }}
          />

          <div className="container mx-auto px-6 relative">
            <div className="max-w-4xl">
              <span style={{ color: '#faaa68' }} className="font-mono text-xs uppercase tracking-[0.3em]">
                Component Library
              </span>
              <h2 className="font-serif text-5xl md:text-6xl lg:text-7xl text-white mt-4 mb-6 leading-[1.1]">
                Hero Presets
              </h2>
              <p className="font-sans text-xl text-white/60 max-w-2xl leading-relaxed">
                Six distinct hero styles with animated backgrounds, ranging from minimalist
                elegance to premium luxury. Each is production-ready and fully customizable.
              </p>

              {/* Quick Navigation Pills */}
              <div className="mt-12 flex flex-wrap gap-3">
                {heroPresets.map((preset, i) => (
                  <a
                    key={preset.id}
                    href={`#hero-${preset.id}`}
                    className="
                      group flex items-center gap-3
                      px-5 py-3
                      bg-white/5 hover:bg-white/10
                      border border-white/10 hover:border-white/30
                      rounded-lg
                      transition-all duration-300
                    "
                  >
                    <span style={{ color: '#faaa68' }} className="font-mono text-sm">0{i + 1}</span>
                    <span className="text-white text-sm font-heading">{preset.name}</span>
                    <svg
                      className="w-4 h-4 text-white/40 group-hover:text-white/80 group-hover:translate-x-1 transition-all"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 9l-7 7-7-7" />
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Individual Hero Showcases */}
        {heroPresets.map((preset, index) => {
          const HeroComponent = heroComponents[preset.id as keyof typeof heroComponents]
          return (
            <div key={preset.id} id={`hero-${preset.id}`} className="relative scroll-mt-12">
              {/* Hero Info Bar */}
              <div
                style={{ backgroundColor: index % 2 === 0 ? '#f8fafc' : '#ffffff' }}
                className="py-8 border-b border-gray-200"
              >
                <div className="container mx-auto px-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
                    <div className="flex items-center gap-6">
                      <span
                        style={{ color: '#f65625' }}
                        className="font-mono text-2xl font-bold"
                      >
                        0{index + 1}
                      </span>
                      <div>
                        <h3 style={{ color: '#142d63' }} className="font-heading text-2xl font-semibold">
                          {preset.name}
                        </h3>
                        <p className="text-gray-500 text-sm mt-1">{preset.description}</p>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      <span
                        className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full"
                        style={{ backgroundColor: '#f0f4fa', color: '#142d63' }}
                      >
                        {preset.style}
                      </span>
                      <span
                        className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full"
                        style={{
                          backgroundColor: preset.background === 'light' ? '#fff' : preset.background === 'gradient' ? '#e6f7f9' : '#0a1633',
                          color: preset.background === 'dark' ? '#fff' : '#142d63',
                          border: preset.background === 'light' ? '1px solid #e5e7eb' : 'none',
                        }}
                      >
                        {preset.background}
                      </span>
                      <span
                        className="px-3 py-1.5 text-xs font-mono uppercase tracking-wider rounded-full"
                        style={{ backgroundColor: '#fff5f0', color: '#f65625' }}
                      >
                        {preset.animation}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* The Hero Component */}
              <HeroComponent />
            </div>
          )
        })}
      </section>

      {/* Summary Footer */}
      <footer style={{ backgroundColor: '#060d1a' }} className="text-white py-24">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mb-16">
            <span style={{ color: '#028393' }} className="font-mono text-xs uppercase tracking-[0.2em]">
              Quick Reference
            </span>
            <h2 className="font-serif text-4xl md:text-5xl mt-3 mb-6">Hero Preset Summary</h2>
            <p className="font-sans text-white/50 text-lg">
              Choose the right hero for your context. Each preset is designed for specific brand moods and audience expectations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {heroPresets.map((preset, i) => (
              <a
                key={preset.id}
                href={`#hero-${preset.id}`}
                className="group p-8 border border-white/10 hover:border-white/30 rounded-xl transition-all duration-300 hover:bg-white/5"
              >
                <div className="flex items-center gap-4 mb-4">
                  <span style={{ color: '#faaa68' }} className="font-mono text-xl font-bold">0{i + 1}</span>
                  <h3 className="font-heading text-xl group-hover:text-white transition-colors" style={{ color: 'rgba(255,255,255,0.9)' }}>
                    {preset.name}
                  </h3>
                </div>
                <p className="text-white/40 text-sm leading-relaxed mb-6">{preset.description}</p>
                <div className="flex flex-wrap gap-2">
                  <span className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/50 uppercase rounded">
                    {preset.style}
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/50 uppercase rounded">
                    {preset.background}
                  </span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-white/5 text-white/50 uppercase rounded">
                    {preset.animation}
                  </span>
                </div>
              </a>
            ))}
          </div>

          <div className="mt-20 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-mono text-xs text-white/30">
              Sidekick Strategies Brand Bible — Design System v2.0
            </p>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#f65625' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#028393' }} />
              <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#faaa68' }} />
              <span className="font-mono text-xs text-white/30 ml-2">6 Hero Presets</span>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}
