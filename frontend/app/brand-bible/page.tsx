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

// Helper Components for Button Section
function TextLinkUnderline() {
  const [hover, setHover] = useState(false)
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-2 py-4 px-1 font-heading text-sm tracking-[0.05em] uppercase font-medium transition-all duration-300"
      style={{ color: hover ? '#f65625' : '#142d63' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <span className="relative">
        Our approach
        <span
          className="absolute left-0 bottom-0 h-px transition-all duration-300"
          style={{ width: hover ? '100%' : '0%', backgroundColor: '#f65625' }}
        />
      </span>
      <svg
        className="w-4 h-4 transition-transform duration-300"
        style={{ transform: hover ? 'translateX(4px)' : 'translateX(0)' }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  )
}

function TextLinkArrow() {
  const [hover, setHover] = useState(false)
  return (
    <a
      href="#"
      className="group inline-flex items-center gap-3 px-2 py-4 font-heading text-sm tracking-[0.15em] uppercase transition-all duration-300"
      style={{ color: hover ? '#faaa68' : '#f65625' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Our expertise
      <svg
        className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-2"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  )
}

function TertiaryTextLink() {
  const [hover, setHover] = useState(false)
  return (
    <a
      href="#"
      className="inline-flex items-center justify-center px-4 py-4 font-mono text-sm tracking-wider uppercase transition-all duration-300"
      style={{ color: hover ? '#faaa68' : 'rgba(255,255,255,0.5)' }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      Hero Presets
      <svg
        className="ml-2 w-4 h-4 transition-transform duration-300"
        style={{ transform: hover ? 'translateX(4px)' : 'translateX(0)' }}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
      </svg>
    </a>
  )
}

// IconCard component for the Iconography section
function IconCard({ children, name, color = 'orange' }: { children: React.ReactNode, name: string, color?: 'orange' | 'teal' | 'navy' }) {
  const colors = {
    orange: { bg: '#fff5f0', icon: '#f65625' },
    teal: { bg: '#e6f7f9', icon: '#028393' },
    navy: { bg: '#f0f4fa', icon: '#142d63' },
  }
  const c = colors[color]
  return (
    <div className="group text-center">
      <div
        className="w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 group-hover:scale-105 group-hover:shadow-lg"
        style={{ backgroundColor: c.bg }}
      >
        <div className="w-6 h-6" style={{ color: c.icon }}>
          {children}
        </div>
      </div>
      <span className="font-mono text-[9px] text-gray-500 mt-2 block">{name}</span>
    </div>
  )
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
              <a href="#iconography" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Iconography</a>
              <a href="#heroes" className="px-3 py-1.5 text-xs font-heading text-gray-600 hover:text-brand-800 hover:bg-gray-100 rounded transition-colors">Hero Presets</a>
            </div>
          </div>
        </div>
      </nav>

      {/* Sticky Portal Activation CTA - Right side */}
      <div className="fixed right-0 top-1/3 z-50 hidden lg:block">
        <a
          href="/portal/login"
          className="group flex items-center gap-3 bg-gradient-to-r from-brand-800 to-brand-700 text-white px-5 py-4 rounded-l-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:translate-x-[-4px]"
        >
          <div className="flex flex-col items-end">
            <span className="font-mono text-[10px] uppercase tracking-wider text-white/60">Client Access</span>
            <span className="font-heading text-sm font-semibold">Activate Portal</span>
          </div>
          <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </div>
        </a>
      </div>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* MAIN HERO - Using HeroKineticGrid */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <HeroKineticGrid
        headline="Brand Bible"
        subheadline="All the styles we use to build an amazing platform. Colors, typography, buttons, and component presets for Sidekick Strategies."
        primaryCta={{ label: "View Colors", href: "#colors" }}
        secondaryCta={{ label: "Typography", href: "#typography" }}
        tertiaryCta={{ label: "Hero Presets", href: "#heroes" }}
        eyebrowText="Design System"
        image={{
          src: "https://cdn.sanity.io/images/canvases/caRI04Cg96Vv/c9eda9bc1ec993fbae5a161746136592a6f89714-1024x1024.png",
          alt: "Sidekick Strategies Brand Visual"
        }}
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
            <span className="font-mono text-xs text-accent-500 uppercase tracking-wider">Components</span>
            <h2 className="font-serif text-4xl text-brand-800 mt-2 mb-4">Button Styles</h2>
            <p className="font-sans text-gray-600 max-w-2xl">
              Eight distinctive button styles, each crafted for specific use cases with careful attention to contrast, hierarchy, and interaction.
            </p>
          </div>

          {/* Solid Buttons Row */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div style={{ backgroundColor: '#f65625' }} className="w-8 h-[2px]" />
              <span style={{ color: '#f65625' }} className="font-mono text-xs uppercase tracking-[0.15em]">01 — Solid Buttons</span>
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-heading text-sm tracking-wide uppercase font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-heading text-sm tracking-wide uppercase font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-teal-300 focus:ring-offset-2"
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
                    className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-white font-heading text-sm tracking-wide uppercase font-semibold rounded-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 active:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-300 focus:ring-offset-2"
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
                    className="inline-flex items-center justify-center px-6 py-3.5 bg-transparent font-heading text-sm tracking-wide uppercase font-semibold rounded-lg border-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 focus:outline-none focus:ring-2 focus:ring-orange-300 focus:ring-offset-2"
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

          {/* Tech Cut Corner Buttons Row */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div style={{ backgroundColor: '#028393' }} className="w-8 h-[2px]" />
              <span style={{ color: '#028393' }} className="font-mono text-xs uppercase tracking-[0.15em]">02 — Tech Cut Corner</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Button 5: Tech Cut Orange */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-6">
                  <span className="font-mono text-xs text-accent-500 uppercase tracking-wider">05</span>
                  <h3 className="font-heading text-lg text-brand-800 font-semibold mt-1">Tech Cut Orange</h3>
                  <p className="font-sans text-sm text-gray-500 mt-1">Technical feel with sharp corners</p>
                </div>
                <div className="flex justify-center min-h-[80px] items-center mb-4">
                  <button
                    style={{ backgroundColor: '#f65625', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    className="inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-xl"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#d9441a'; e.currentTarget.style.boxShadow = '0 0 30px rgba(246, 86, 37, 0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#f65625'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    <span className="mr-2">&gt;</span>
                    Initialize
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 text-[10px] font-mono bg-orange-50 text-orange-600 rounded">clipPath corners</span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">glow on hover</span>
                </div>
              </div>

              {/* Button 6: Tech Cut Teal */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-6">
                  <span className="font-mono text-xs text-teal-500 uppercase tracking-wider">06</span>
                  <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Tech Cut Teal</h3>
                  <p className="font-sans text-sm text-gray-500 mt-1">Secondary tech style variant</p>
                </div>
                <div className="flex justify-center min-h-[80px] items-center mb-4">
                  <button
                    style={{ backgroundColor: '#028393', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }}
                    className="inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300 hover:shadow-xl"
                    onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#1aabb9'; e.currentTarget.style.boxShadow = '0 0 30px rgba(2, 131, 147, 0.5)'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#028393'; e.currentTarget.style.boxShadow = 'none'; }}
                  >
                    View Architecture
                  </button>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 text-[10px] font-mono bg-teal-50 text-teal-600 rounded">clipPath corners</span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">glow on hover</span>
                </div>
              </div>
            </div>
          </div>

          {/* Text Link Buttons Row */}
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <div style={{ backgroundColor: '#142d63' }} className="w-8 h-[2px]" />
              <span style={{ color: '#142d63' }} className="font-mono text-xs uppercase tracking-[0.15em]">03 — Text Links</span>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {/* Button 7: Text Link with Underline Animation */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-6">
                  <span className="font-mono text-xs text-blue-600 uppercase tracking-wider">07</span>
                  <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Underline Animate</h3>
                  <p className="font-sans text-sm text-gray-500 mt-1">Elegant animated underline reveal</p>
                </div>
                <div className="flex justify-center min-h-[80px] items-center mb-4">
                  <TextLinkUnderline />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 text-[10px] font-mono bg-blue-50 text-blue-700 rounded">animated underline</span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">arrow shift</span>
                </div>
              </div>

              {/* Button 8: Text Link with Arrow */}
              <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300">
                <div className="mb-6">
                  <span className="font-mono text-xs text-orange-400 uppercase tracking-wider">08</span>
                  <h3 className="font-heading text-lg text-gray-800 font-semibold mt-1">Arrow Link</h3>
                  <p className="font-sans text-sm text-gray-500 mt-1">Premium text link with arrow</p>
                </div>
                <div className="flex justify-center min-h-[80px] items-center mb-4">
                  <TextLinkArrow />
                </div>
                <div className="flex flex-wrap gap-1.5">
                  <span className="px-2 py-1 text-[10px] font-mono bg-orange-50 text-orange-600 rounded">color: #f65625</span>
                  <span className="px-2 py-1 text-[10px] font-mono bg-gray-100 text-gray-600 rounded">arrow translate</span>
                </div>
              </div>
            </div>
          </div>

          {/* Dark Background Buttons Preview */}
          <div>
            <div className="flex items-center gap-4 mb-6">
              <div style={{ backgroundColor: '#faaa68' }} className="w-8 h-[2px]" />
              <span style={{ color: '#faaa68' }} className="font-mono text-xs uppercase tracking-[0.15em]">04 — On Dark Backgrounds</span>
            </div>
            <div className="rounded-2xl p-8 relative overflow-hidden" style={{ backgroundColor: '#0a1633' }}>
              {/* Subtle pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(2, 131, 147, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 131, 147, 0.5) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />
              <div className="relative flex flex-wrap gap-6 items-center justify-center">
                <button style={{ backgroundColor: '#f65625', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }} className="inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300">
                  <span className="mr-2">&gt;</span> Initialize
                </button>
                <button style={{ backgroundColor: '#028393', clipPath: 'polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px))' }} className="inline-flex items-center justify-center px-8 py-4 text-white font-mono text-sm tracking-wider uppercase transition-all duration-300">
                  View Architecture
                </button>
                <TertiaryTextLink />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════ */}
      {/* ICONOGRAPHY SECTION */}
      {/* ═══════════════════════════════════════════════════════════════════════ */}
      <section id="iconography" className="py-24 scroll-mt-20 relative overflow-hidden" style={{ backgroundColor: '#f8fafc' }}>
        {/* Subtle background pattern */}
        <div className="absolute inset-0 opacity-[0.02]" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23142d63' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")` }} />

        <div className="container mx-auto px-6 relative">
          {/* Section Header */}
          <div className="mb-16">
            <span style={{ color: '#028393' }} className="font-mono text-xs uppercase tracking-[0.2em]">Visual Assets</span>
            <h2 style={{ color: '#142d63' }} className="font-serif text-5xl md:text-6xl mt-3 mb-6">Iconography</h2>
            <p className="font-sans text-gray-600 text-lg max-w-2xl leading-relaxed">
              A curated icon library for marketing, sales, and agency work — plus hero-inspired icons for that extra punch of brand personality.
            </p>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* MARKETING & AGENCY ICONS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div style={{ backgroundColor: '#f65625' }} className="w-8 h-[2px]" />
              <span style={{ color: '#f65625' }} className="font-mono text-xs uppercase tracking-[0.15em]">01 — Marketing & Agency</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {/* Megaphone */}
              <IconCard name="Megaphone">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 12v1a10 10 0 01-10 10 10 10 0 01-7.07-2.93" />
                  <path d="M22 12a10 10 0 00-10-10" />
                  <path d="M16 12h-4a2 2 0 00-2 2v4" />
                  <path d="M5 17l1.5-1.5" />
                  <circle cx="3.5" cy="18.5" r="1.5" />
                </svg>
              </IconCard>

              {/* Chart */}
              <IconCard name="Analytics">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 3v18h18" />
                  <path d="M18 9l-5 5-4-4-3 3" />
                </svg>
              </IconCard>

              {/* Target */}
              <IconCard name="Target">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <circle cx="12" cy="12" r="6" />
                  <circle cx="12" cy="12" r="2" />
                </svg>
              </IconCard>

              {/* Rocket */}
              <IconCard name="Launch">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                  <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                  <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                  <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                </svg>
              </IconCard>

              {/* Lightbulb */}
              <IconCard name="Ideas">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 18h6" />
                  <path d="M10 22h4" />
                  <path d="M15.09 14c.18-.98.65-1.74 1.41-2.5A4.65 4.65 0 0018 8 6 6 0 006 8c0 1 .23 2.23 1.5 3.5A4.61 4.61 0 018.91 14" />
                </svg>
              </IconCard>

              {/* Users */}
              <IconCard name="Audience">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <path d="M23 21v-2a4 4 0 00-3-3.87" />
                  <path d="M16 3.13a4 4 0 010 7.75" />
                </svg>
              </IconCard>

              {/* Email */}
              <IconCard name="Email">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="4" width="20" height="16" rx="2" />
                  <path d="M22 7l-10 7L2 7" />
                </svg>
              </IconCard>

              {/* Globe */}
              <IconCard name="Global">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20" />
                  <path d="M2 12h20" />
                </svg>
              </IconCard>

              {/* Calendar */}
              <IconCard name="Schedule">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="4" width="18" height="18" rx="2" />
                  <path d="M16 2v4M8 2v4M3 10h18" />
                </svg>
              </IconCard>

              {/* Trending */}
              <IconCard name="Growth">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="23,6 13.5,15.5 8.5,10.5 1,18" />
                  <polyline points="17,6 23,6 23,12" />
                </svg>
              </IconCard>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* HUBSPOT & CRM ICONS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div style={{ backgroundColor: '#028393' }} className="w-8 h-[2px]" />
              <span style={{ color: '#028393' }} className="font-mono text-xs uppercase tracking-[0.15em]">02 — HubSpot & CRM</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {/* Contacts */}
              <IconCard name="Contacts" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
                  <circle cx="12" cy="7" r="4" />
                </svg>
              </IconCard>

              {/* Pipeline */}
              <IconCard name="Pipeline" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22,12 18,12 15,21 9,3 6,12 2,12" />
                </svg>
              </IconCard>

              {/* Deals */}
              <IconCard name="Deals" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              </IconCard>

              {/* Automation */}
              <IconCard name="Automation" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="3" />
                  <path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z" />
                </svg>
              </IconCard>

              {/* Inbox */}
              <IconCard name="Inbox" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22,13 16,13 14,16 10,16 8,13 2,13" />
                  <path d="M5.45 5.11L2 13v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-7.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z" />
                </svg>
              </IconCard>

              {/* Database */}
              <IconCard name="Database" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="12" cy="5" rx="9" ry="3" />
                  <path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" />
                  <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" />
                </svg>
              </IconCard>

              {/* Workflow */}
              <IconCard name="Workflow" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="6" height="6" rx="1" />
                  <rect x="15" y="3" width="6" height="6" rx="1" />
                  <rect x="9" y="15" width="6" height="6" rx="1" />
                  <path d="M6 9v3a1 1 0 001 1h4" />
                  <path d="M18 9v3a1 1 0 01-1 1h-4" />
                </svg>
              </IconCard>

              {/* Report */}
              <IconCard name="Reports" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
              </IconCard>

              {/* Integration */}
              <IconCard name="Integrate" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6" />
                  <polyline points="15,3 21,3 21,9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </IconCard>

              {/* Dashboard */}
              <IconCard name="Dashboard" color="teal">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="9" rx="1" />
                  <rect x="14" y="3" width="7" height="5" rx="1" />
                  <rect x="14" y="12" width="7" height="9" rx="1" />
                  <rect x="3" y="16" width="7" height="5" rx="1" />
                </svg>
              </IconCard>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* SALES ICONS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div style={{ backgroundColor: '#142d63' }} className="w-8 h-[2px]" />
              <span style={{ color: '#142d63' }} className="font-mono text-xs uppercase tracking-[0.15em]">03 — Sales</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {/* Handshake */}
              <IconCard name="Partner" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20.42 4.58a5.4 5.4 0 00-7.65 0l-.77.78-.77-.78a5.4 5.4 0 00-7.65 0C1.46 6.7 1.33 10.28 4 13l8 8 8-8c2.67-2.72 2.54-6.3.42-8.42z" />
                </svg>
              </IconCard>

              {/* Trophy */}
              <IconCard name="Success" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M6 9H4.5a2.5 2.5 0 010-5H6" />
                  <path d="M18 9h1.5a2.5 2.5 0 000-5H18" />
                  <path d="M4 22h16" />
                  <path d="M10 14.66V17c0 .55-.47.98-.97 1.21C7.85 18.75 7 20.24 7 22" />
                  <path d="M14 14.66V17c0 .55.47.98.97 1.21C16.15 18.75 17 20.24 17 22" />
                  <path d="M18 2H6v7a6 6 0 006 6 6 6 0 006-6V2z" />
                </svg>
              </IconCard>

              {/* Dollar */}
              <IconCard name="Revenue" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="12" y1="1" x2="12" y2="23" />
                  <path d="M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
                </svg>
              </IconCard>

              {/* Briefcase */}
              <IconCard name="Business" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="7" width="20" height="14" rx="2" />
                  <path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16" />
                </svg>
              </IconCard>

              {/* Phone */}
              <IconCard name="Call" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </IconCard>

              {/* Award */}
              <IconCard name="Award" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="8" r="6" />
                  <path d="M15.477 12.89L17 22l-5-3-5 3 1.523-9.11" />
                </svg>
              </IconCard>

              {/* Checkmark */}
              <IconCard name="Complete" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
                  <polyline points="22,4 12,14.01 9,11.01" />
                </svg>
              </IconCard>

              {/* Clock */}
              <IconCard name="Time" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12,6 12,12 16,14" />
                </svg>
              </IconCard>

              {/* Star */}
              <IconCard name="Premium" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12,2 15.09,8.26 22,9.27 17,14.14 18.18,21.02 12,17.77 5.82,21.02 7,14.14 2,9.27 8.91,8.26 12,2" />
                </svg>
              </IconCard>

              {/* Flag */}
              <IconCard name="Goal" color="navy">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z" />
                  <line x1="4" y1="22" x2="4" y2="15" />
                </svg>
              </IconCard>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* SUPERHERO / HERO ICONS */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div style={{ backgroundColor: '#faaa68' }} className="w-8 h-[2px]" />
              <span style={{ color: '#faaa68' }} className="font-mono text-xs uppercase tracking-[0.15em]">04 — Hero & Strength</span>
            </div>

            <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 gap-4">
              {/* Shield */}
              <IconCard name="Shield" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </IconCard>

              {/* Lightning */}
              <IconCard name="Power" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
                </svg>
              </IconCard>

              {/* Zap Circle */}
              <IconCard name="Energy" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="13,6 9,14 12,14 11,18 15,10 12,10 13,6" />
                </svg>
              </IconCard>

              {/* Shield Check */}
              <IconCard name="Protect" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 12l2 2 4-4" />
                </svg>
              </IconCard>

              {/* Flame */}
              <IconCard name="Ignite" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z" />
                </svg>
              </IconCard>

              {/* Compass */}
              <IconCard name="Navigate" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polygon points="16.24,7.76 14.12,14.12 7.76,16.24 9.88,9.88 16.24,7.76" />
                </svg>
              </IconCard>

              {/* Sunrise */}
              <IconCard name="Dawn" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M17 18a5 5 0 00-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                  <polyline points="8,6 12,2 16,6" />
                </svg>
              </IconCard>

              {/* Mountain */}
              <IconCard name="Summit" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
                </svg>
              </IconCard>

              {/* Anchor */}
              <IconCard name="Anchor" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="5" r="3" />
                  <line x1="12" y1="22" x2="12" y2="8" />
                  <path d="M5 12H2a10 10 0 0020 0h-3" />
                </svg>
              </IconCard>

              {/* Crown */}
              <IconCard name="Lead" color="orange">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                  <path d="M3 20h18" />
                </svg>
              </IconCard>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* COLOR VARIANTS SHOWCASE */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div className="mb-16">
            <div className="flex items-center gap-4 mb-8">
              <div style={{ backgroundColor: '#142d63' }} className="w-8 h-[2px]" />
              <span style={{ color: '#142d63' }} className="font-mono text-xs uppercase tracking-[0.15em]">05 — Color Variants</span>
            </div>

            <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
              <p className="font-sans text-gray-600 mb-8">Each icon works across all brand colors. Here's the Shield icon in every variant:</p>
              <div className="flex flex-wrap gap-6 items-center justify-center">
                {/* Orange */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fff5f0' }}>
                    <svg className="w-8 h-8" style={{ color: '#f65625' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 mt-2 block">Orange</span>
                </div>

                {/* Teal */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#e6f7f9' }}>
                    <svg className="w-8 h-8" style={{ color: '#028393' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 mt-2 block">Teal</span>
                </div>

                {/* Navy */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#f0f4fa' }}>
                    <svg className="w-8 h-8" style={{ color: '#142d63' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 mt-2 block">Navy</span>
                </div>

                {/* Peach */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center" style={{ backgroundColor: '#fef6ee' }}>
                    <svg className="w-8 h-8" style={{ color: '#faaa68' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 mt-2 block">Peach</span>
                </div>

                {/* Gray */}
                <div className="text-center">
                  <div className="w-16 h-16 rounded-xl flex items-center justify-center bg-gray-100">
                    <svg className="w-8 h-8 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                  </div>
                  <span className="font-mono text-[10px] text-gray-500 mt-2 block">Gray</span>
                </div>
              </div>
            </div>
          </div>

          {/* ═══════════════════════════════════════════════════════════════════ */}
          {/* DARK BACKGROUND SHOWCASE */}
          {/* ═══════════════════════════════════════════════════════════════════ */}
          <div>
            <div className="flex items-center gap-4 mb-8">
              <div style={{ backgroundColor: '#faaa68' }} className="w-8 h-[2px]" />
              <span style={{ color: '#faaa68' }} className="font-mono text-xs uppercase tracking-[0.15em]">06 — On Dark Backgrounds</span>
            </div>

            <div className="rounded-2xl p-8 relative overflow-hidden" style={{ backgroundColor: '#0a1633' }}>
              {/* Subtle grid pattern */}
              <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: `linear-gradient(rgba(2, 131, 147, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(2, 131, 147, 0.5) 1px, transparent 1px)`, backgroundSize: '40px 40px' }} />

              <div className="relative">
                <p className="font-sans text-white/60 mb-8 text-center">White icons work beautifully on dark backgrounds</p>
                <div className="flex flex-wrap gap-8 items-center justify-center">
                  {/* White Shield */}
                  <div className="text-center">
                    <svg className="w-10 h-10 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Shield</span>
                  </div>

                  {/* White Lightning */}
                  <div className="text-center">
                    <svg className="w-10 h-10 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Power</span>
                  </div>

                  {/* White Rocket */}
                  <div className="text-center">
                    <svg className="w-10 h-10 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 00-2.91-.09z" />
                      <path d="M12 15l-3-3a22 22 0 012-3.95A12.88 12.88 0 0122 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 01-4 2z" />
                      <path d="M9 12H4s.55-3.03 2-4c1.62-1.08 5 0 5 0" />
                      <path d="M12 15v5s3.03-.55 4-2c1.08-1.62 0-5 0-5" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Launch</span>
                  </div>

                  {/* White Target */}
                  <div className="text-center">
                    <svg className="w-10 h-10 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" />
                      <circle cx="12" cy="12" r="6" />
                      <circle cx="12" cy="12" r="2" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Target</span>
                  </div>

                  {/* White Crown */}
                  <div className="text-center">
                    <svg className="w-10 h-10 text-white mx-auto" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M2 4l3 12h14l3-12-6 7-4-7-4 7-6-7z" />
                      <path d="M3 20h18" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Lead</span>
                  </div>

                  {/* Colored icons on dark */}
                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto" style={{ color: '#f65625' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <polygon points="13,2 3,14 12,14 11,22 21,10 12,10 13,2" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Orange</span>
                  </div>

                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto" style={{ color: '#028393' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Teal</span>
                  </div>

                  <div className="text-center">
                    <svg className="w-10 h-10 mx-auto" style={{ color: '#faaa68' }} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M8 3l4 8 5-5 5 15H2L8 3z" />
                    </svg>
                    <span className="font-mono text-[10px] text-white/40 mt-2 block">Peach</span>
                  </div>
                </div>
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

      {/* Footer */}
      <footer style={{ backgroundColor: '#060d1a' }} className="text-white py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
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
