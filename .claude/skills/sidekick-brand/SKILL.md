---
name: sidekick-brand
description: Official Sidekick Strategies brand system with finalized Brand Bible. Use ONLY when building sidekickstrategies.com, Sidekick brand materials, or internal tools. Enforces specific brand colors, typography, button styles, iconography, and component patterns. For creative client work or new projects, use /frontend-design instead.
version: 3.2
license: Sidekick Strategies internal use
---

# Sidekick Strategies Brand System

The official brand reference for building Sidekick Strategies digital properties. This skill enforces brand consistency through specific colors, typography, spacing, and component patterns.

**IMPORTANT:** This skill is for Sidekick Strategies brand work ONLY:
- ✅ sidekickstrategies.com website
- ✅ Sidekick internal tools and dashboards
- ✅ Sidekick marketing materials and presentations
- ❌ Client projects (use `/frontend-design` for creative freedom)
- ❌ New/experimental projects (use `/frontend-design`)

**Live Brand Bible:** https://sidekickstrategies.vercel.app/brand-bible

---

## Quick Reference: Critical Numbers

Memorize these. They drive every design decision.

| Category | Value | Usage |
|----------|-------|-------|
| **Base spacing unit** | 8px (0.5rem) | All spacing derives from this |
| **Body text** | 16px (1rem) | PT Sans Regular |
| **Line height (body)** | 1.5 to 1.6 | Optimal readability |
| **Line length** | 45 to 75 characters | Use `max-w-prose` in Tailwind |
| **Touch targets** | 44px minimum | Critical for mobile |
| **Contrast (text)** | 4.5:1 minimum | WCAG AA requirement |
| **Contrast (UI/large text)** | 3:1 minimum | Icons, buttons, headings |
| **Container max-width** | 1200px | Use `max-w-7xl` |
| **Animation duration** | 150ms to 300ms | Micro-interactions |

---

## Part 1: Sidekick Brand Foundation

### Color Palette

**Primary: Navy**
```
navy-50:  #f0f4fa    navy-100: #dce4f2    navy-200: #b9c9e5
navy-300: #8aa5d3    navy-400: #5a7fc0    navy-500: #3a5a9a
navy-600: #2a4578    navy-700: #1e3561    navy-800: #142d63  ← Primary dark
navy-900: #0f2250    navy-950: #0a1633
```

**Secondary: Teal**
```
teal-50:  #e6f7f9    teal-100: #cceff3    teal-200: #99dfe7
teal-300: #4dc5d4    teal-400: #1aabb9    teal-500: #028393  ← Primary accent
teal-600: #026d7a    teal-700: #025762    teal-800: #014149
teal-900: #012b31    teal-950: #001518
```

**Accent: Orange**
```
orange-50:  #fff5f0    orange-100: #ffe8de    orange-200: #ffd0bd
orange-300: #ffab8c    orange-400: #fa7d4d    orange-500: #f65625  ← CTA color
orange-600: #d9441a    orange-700: #b53615    orange-800: #912b11
orange-900: #6d200d    orange-950: #3a1006
```

**Supporting Colors**
```
peach:      #faaa68    Secondary warmth, highlights
light-blue: #98c1d9    Hover states, subtle highlights
slate:      #3d5a80    Supporting elements, secondary buttons
cream:      #e0fbfc    Light backgrounds, cards
```

### Tailwind Config Extension

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f0f4fa', 100: '#dce4f2', 200: '#b9c9e5',
          300: '#8aa5d3', 400: '#5a7fc0', 500: '#3a5a9a',
          600: '#2a4578', 700: '#1e3561', 800: '#142d63',
          900: '#0f2250', 950: '#0a1633',
        },
        teal: {
          50: '#e6f7f9', 100: '#cceff3', 200: '#99dfe7',
          300: '#4dc5d4', 400: '#1aabb9', 500: '#028393',
          600: '#026d7a', 700: '#025762', 800: '#014149',
          900: '#012b31', 950: '#001518',
        },
        'brand-orange': {
          50: '#fff5f0', 100: '#ffe8de', 200: '#ffd0bd',
          300: '#ffab8c', 400: '#fa7d4d', 500: '#f65625',
          600: '#d9441a', 700: '#b53615', 800: '#912b11',
          900: '#6d200d', 950: '#3a1006',
        },
        peach: '#faaa68',
        'light-blue': '#98c1d9',
        slate: '#3d5a80',
        cream: '#e0fbfc',
      },
      fontFamily: {
        'display': ['"Palatino Linotype"', 'Palatino', 'Georgia', 'serif'],
        'heading': ['Montserrat', 'system-ui', 'sans-serif'],
        'body': ['"PT Sans"', 'system-ui', 'sans-serif'],
        'mono': ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
}
```

### Color Application Rules

**The 60-30-10 Rule:**
- 60% Dominant: White/cream backgrounds, navy for dark sections
- 30% Secondary: Teal accents, navy text, slate supporting elements
- 10% Accent: Brand orange for CTAs and key highlights only

**Never:**
- Use brand-orange-500 for large surface areas
- Mix more than 3 colors in one section
- Use pure black (#000) for text; use navy-800 or navy-900

**Semantic Color Mapping:**
```
Primary action:     brand-orange-500  → hover: brand-orange-600
Secondary action:   teal-500          → hover: teal-600
Tertiary action:    navy-800          → hover: navy-700
Success:            #22c55e (green-500)
Warning:            #f59e0b (amber-500)
Error:              #ef4444 (red-500)
Info:               teal-500
```

---

### Typography System

**Font Stack (in priority order):**

| Role | Font | Weights | Usage |
|------|------|---------|-------|
| Display/H1-H2 | Palatino Linotype | 400 | Hero headlines, page titles |
| Subheadings/H3-H6 | Montserrat | 500, 600 | Section headings, labels |
| Body | PT Sans | 400, 700 | All body text, paragraphs |
| Code/Labels | IBM Plex Mono | 400 | Code blocks, technical labels |

**Type Scale (1.25 ratio, Major Third):**

| Element | Size | Line Height | Font | Tailwind |
|---------|------|-------------|------|----------|
| H1 | 72px (4.5rem) | 1.1 | Palatino | `text-7xl font-display leading-tight` |
| H2 | 48px (3rem) | 1.2 | Palatino | `text-5xl font-display leading-tight` |
| H3 | 30px (1.875rem) | 1.3 | Montserrat 600 | `text-3xl font-heading font-semibold` |
| H4 | 24px (1.5rem) | 1.3 | Montserrat 600 | `text-2xl font-heading font-semibold` |
| H5 | 20px (1.25rem) | 1.4 | Montserrat 500 | `text-xl font-heading font-medium` |
| H6 | 16px (1rem) | 1.4 | Montserrat 500 | `text-base font-heading font-medium uppercase tracking-wide` |
| Lead | 20px | 1.6 | PT Sans | `text-xl font-body leading-relaxed` |
| Body | 16px | 1.6 | PT Sans | `text-base font-body leading-relaxed` |
| Small | 14px | 1.5 | PT Sans | `text-sm font-body` |
| Caption | 12px | 1.5 | PT Sans Italic | `text-xs font-body italic` |

**Font Loading:**
```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:wght@400&family=Montserrat:wght@500;600&family=PT+Sans:ital,wght@0,400;0,700;1,400&display=swap" rel="stylesheet">
```

**Typography Rules:**
- Line length: 45 to 75 characters (`max-w-prose` or `max-w-2xl`)
- Letter-spacing: Add 0.05em to 0.1em for uppercase text
- Headings: Navy-800 or white on dark backgrounds
- Body: Navy-900 or navy-800 for optimal readability
- Never use pure black for text blocks

---

## Part 2: Spacing System (8px Grid)

All spacing uses multiples of 8px. This creates visual harmony and eliminates arbitrary decisions.

### Spacing Scale

| Token | Value | Tailwind | Usage |
|-------|-------|----------|-------|
| 0.5 | 4px | `p-1`, `m-1`, `gap-1` | Fine adjustments, icon gaps |
| 1 | 8px | `p-2`, `m-2`, `gap-2` | Tight spacing, compact UI |
| 2 | 16px | `p-4`, `m-4`, `gap-4` | Standard component padding |
| 3 | 24px | `p-6`, `m-6`, `gap-6` | Card padding, section gaps |
| 4 | 32px | `p-8`, `m-8`, `gap-8` | Major groupings |
| 5 | 40px | `p-10`, `m-10`, `gap-10` | Section dividers |
| 6 | 48px | `p-12`, `m-12`, `gap-12` | Section separations |
| 8 | 64px | `p-16`, `m-16`, `gap-16` | Page-level divisions |
| 10 | 80px | `p-20`, `m-20`, `gap-20` | Hero sections |
| 12 | 96px | `p-24`, `m-24`, `gap-24` | Major page sections |

### The Internal ≤ External Rule

**Critical principle:** Padding inside a component must be equal to or less than margins around it.

```jsx
// Correct: 16px internal, 24px external
<div className="grid gap-6">
  <div className="p-4 bg-white rounded-xl">Card content</div>
  <div className="p-4 bg-white rounded-xl">Card content</div>
</div>

// Wrong: 24px internal, 16px external (violates rule)
<div className="grid gap-4">
  <div className="p-6 bg-white rounded-xl">Card content</div>
</div>
```

### Responsive Spacing

| Breakpoint | Side margins | Section padding |
|------------|--------------|-----------------|
| Mobile (<640px) | `px-4` (16px) | `py-12` (48px) |
| Tablet (640-1024px) | `px-6` (24px) | `py-16` (64px) |
| Desktop (>1024px) | `px-8` or container | `py-20` to `py-24` |

---

## Part 3: Layout and Grid

### 12-Column Grid

Standard configuration: 12 columns, 24px gutters, 1200px max-width.

```jsx
// Container pattern
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
  {/* Content */}
</div>

// Grid patterns
<div className="grid grid-cols-12 gap-6">
  <div className="col-span-12 md:col-span-8">Main content</div>
  <div className="col-span-12 md:col-span-4">Sidebar</div>
</div>
```

### Common Layout Splits

| Ratio | Columns | Usage |
|-------|---------|-------|
| 50/50 | 6/6 | Equal content sections |
| 66/33 | 8/4 | Content with sidebar |
| 33/66 | 4/8 | Sidebar with content |
| 75/25 | 9/3 | Wide content, narrow aside |
| 33/33/33 | 4/4/4 | Three equal columns |
| 25/25/25/25 | 3/3/3/3 | Four equal columns |

### Responsive Breakpoints

| Breakpoint | Tailwind | Target |
|------------|----------|--------|
| Base | (none) | Mobile first (< 640px) |
| sm | `sm:` | Large phones (≥ 640px) |
| md | `md:` | Tablets (≥ 768px) |
| lg | `lg:` | Laptops (≥ 1024px) |
| xl | `xl:` | Desktops (≥ 1280px) |
| 2xl | `2xl:` | Large screens (≥ 1536px) |

### Visual Hierarchy Patterns

**F-Pattern (text-heavy pages):**
- Place logo/navigation top-left
- Key content in horizontal band across top
- Important elements along left edge
- CTAs at natural scan endpoints

**Z-Pattern (landing pages):**
- Logo top-left
- Navigation/CTA top-right
- Hero content center
- Final CTA bottom-right

**Golden Ratio Layouts:**
- Content area: ~62% width
- Sidebar: ~38% width
- Use `grid-cols-5` with `col-span-3` and `col-span-2`

---

## Part 4: Component Specifications

### Buttons

**Size System:**

| Size | Height | Padding | Font | Tailwind |
|------|--------|---------|------|----------|
| Small | 32px | 12px/16px | 14px | `h-8 px-3 text-sm` |
| Medium | 40px | 16px/20px | 16px | `h-10 px-4 text-base` |
| Large | 48px | 20px/24px | 18px | `h-12 px-6 text-lg` |

**Variants:**

```jsx
// Primary CTA (brand-orange)
<button className="h-10 px-4 bg-brand-orange-500 text-white font-heading font-medium rounded-lg hover:bg-brand-orange-600 focus:outline-none focus:ring-2 focus:ring-brand-orange-500 focus:ring-offset-2 transition-colors">
  Get Started
</button>

// Secondary (teal)
<button className="h-10 px-4 bg-teal-500 text-white font-heading font-medium rounded-lg hover:bg-teal-600 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2 transition-colors">
  Explore
</button>

// Tertiary (navy solid)
<button className="h-10 px-4 bg-navy-800 text-white font-heading font-medium rounded-lg hover:bg-navy-700 focus:outline-none focus:ring-2 focus:ring-navy-500 focus:ring-offset-2 transition-colors">
  Contact Us
</button>

// Ghost/Outline
<button className="h-10 px-4 border-2 border-brand-orange-500 text-brand-orange-500 font-heading font-medium rounded-lg hover:bg-brand-orange-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-brand-orange-500 focus:ring-offset-2 transition-colors">
  View Details
</button>
```

**Required States (never skip):**
1. Default
2. Hover: Darken 10% or subtle lift
3. Focus: Visible ring (CRITICAL for accessibility)
4. Active/Pressed: Darken 15-20%
5. Disabled: `opacity-50 cursor-not-allowed`
6. Loading: Spinner, maintain width

### Form Inputs

```jsx
// Text input with label
<div className="space-y-1">
  <label className="block text-sm font-heading font-medium text-navy-800">
    Email Address
  </label>
  <input
    type="email"
    className="w-full h-10 px-4 border border-gray-300 rounded-lg font-body text-navy-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-colors"
    placeholder="you@example.com"
  />
</div>

// Error state
<input className="... border-red-500 focus:ring-red-500" />
<p className="mt-1 text-sm text-red-600">Please enter a valid email</p>

// Success state
<input className="... border-green-500 focus:ring-green-500" />
```

### Cards

```jsx
// Standard card
<div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition-shadow">
  <span className="text-xs font-heading font-medium text-teal-500 uppercase tracking-wide">
    Category
  </span>
  <h3 className="mt-2 text-xl font-heading font-semibold text-navy-800">
    Card Title
  </h3>
  <p className="mt-2 text-base font-body text-navy-600 leading-relaxed">
    Card description goes here with enough detail to be useful.
  </p>
  <a href="#" className="mt-4 inline-flex items-center text-teal-500 font-heading font-medium hover:text-teal-600">
    Learn more →
  </a>
</div>

// Card with image
<div className="bg-white rounded-xl shadow-md overflow-hidden">
  <img src="..." alt="..." className="w-full h-48 object-cover" />
  <div className="p-6">
    {/* Content */}
  </div>
</div>
```

**Card Elevation Scale:**
```
Resting:     shadow-md   (0 4px 6px rgba(0,0,0,0.1))
Hover:       shadow-lg   (0 10px 15px rgba(0,0,0,0.1))
Elevated:    shadow-xl   (0 20px 25px rgba(0,0,0,0.1))
```

### Navigation

```jsx
// Header navigation
<header className="bg-white border-b border-gray-200">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="flex items-center justify-between h-16">
      {/* Logo */}
      <a href="/" className="flex items-center">
        <span className="text-xl font-display text-navy-800">Sidekick Strategies</span>
      </a>
      
      {/* Nav links */}
      <nav className="hidden md:flex items-center gap-8">
        <a href="#" className="text-sm font-heading font-medium text-navy-600 hover:text-navy-800 transition-colors">
          Services
        </a>
        <a href="#" className="text-sm font-heading font-medium text-navy-600 hover:text-navy-800 transition-colors">
          About
        </a>
        <a href="#" className="h-10 px-4 inline-flex items-center bg-brand-orange-500 text-white font-heading font-medium rounded-lg hover:bg-brand-orange-600 transition-colors">
          Get Started
        </a>
      </nav>
    </div>
  </div>
</header>
```

### Footer

**Live Component:** `frontend/app/components/Footer.tsx`

The global footer uses navy-800 background with white/opacity text:

```jsx
<footer style={{backgroundColor: '#142d63'}}>
  <div className="container">
    {/* Main Content */}
    <div className="py-16 border-b border-white/10">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        {/* Logo & Tagline */}
        <div>
          <Image src="/images/sidekick-logo-2026.png" className="h-10 w-auto brightness-0 invert" />
          <p className="font-serif text-lg" style={{color: 'rgba(255,255,255,0.7)'}}>
            Your sidekick in the HubSpot journey.
          </p>
        </div>
        {/* Quick Links */}
        <div>
          <h4 className="font-heading text-xs uppercase tracking-widest" style={{color: '#f65625'}}>
            Connect
          </h4>
          <a href="mailto:hello@sidekickstrategies.com" style={{color: 'rgba(255,255,255,0.7)'}}>
            hello@sidekickstrategies.com
          </a>
        </div>
      </div>
    </div>
    {/* Bottom Bar */}
    <div className="py-6 flex justify-between">
      <p className="font-mono text-xs" style={{color: 'rgba(255,255,255,0.5)'}}>
        © {currentYear} Sidekick Strategies. All rights reserved.
      </p>
      <p className="font-mono text-xs" style={{color: 'rgba(255,255,255,0.3)'}}>
        Value First Humans
      </p>
    </div>
  </div>
</footer>
```

### Back to Top Button

**Live Component:** `frontend/app/components/BackToTop.tsx`

Client component that appears after scrolling 300px:

```jsx
'use client'
// Fixed position left-6 bottom-6
// Navy circle (w-12 h-12) with white arrow icon
// Fades in/out with transform animation
// smooth scroll to top on click
```

### Iconography

**Live Reference:** https://sidekickstrategies.vercel.app/brand-bible#iconography

40+ curated SVG icons organized into categories:

| Category | Icons | Usage |
|----------|-------|-------|
| Marketing & Agency | Megaphone, Analytics, Target, Launch, Ideas, Audience, Email, Global, Schedule, Growth | Agency services, marketing content |
| HubSpot & CRM | Contacts, Pipeline, Deals, Automation, Inbox, Database, Workflow, Reports, Integrate, Dashboard | HubSpot features, CRM pages |
| Sales | Partner, Success, Revenue, Business, Call, Award, Complete, Time, Premium, Goal | Sales content, success stories |
| Hero & Strength | Shield, Power, Energy, Protect, Ignite, Navigate, Dawn, Summit, Anchor, Lead | Hero sections, empowerment messaging |

**Icon Specifications:**
- Style: Stroke-based (1.5-2px stroke width)
- Base size: 24x24 (`w-6 h-6`)
- Colors: Use brand palette (Orange #f65625, Teal #028393, Navy #142d63)
- Light backgrounds: #fff5f0 (orange), #e6f7f9 (teal), #f0f4fa (navy)

---

## Part 5: Accessibility Requirements

### Contrast Minimums (Non-negotiable)

| Element | WCAG AA | WCAG AAA |
|---------|---------|----------|
| Normal text (<18px) | 4.5:1 | 7:1 |
| Large text (≥18px or ≥14px bold) | 3:1 | 4.5:1 |
| UI components, icons | 3:1 | N/A |
| Focus indicators | 3:1 | N/A |

### Tested Color Combinations

**Always safe:**
- Navy-800 on white: 12.6:1 ✓
- Navy-900 on white: 16.1:1 ✓
- White on navy-800: 12.6:1 ✓
- Brand-orange-500 on white: 4.6:1 ✓ (just passes)
- Teal-600 on white: 5.2:1 ✓

**Use with caution:**
- Teal-500 on white: 4.1:1 (fails AA for small text)
- Use teal-600 instead for text

### Focus States

**Never remove focus outlines.** Restyle them instead:

```jsx
// Good: Custom focus ring
className="focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-offset-2"

// Good: Focus-visible (keyboard only)
className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
```

### Touch Targets

**Minimum 44x44px** for all interactive elements.

```jsx
// Icon button with proper touch target
<button className="w-11 h-11 flex items-center justify-center rounded-lg hover:bg-gray-100">
  <Icon className="w-5 h-5" /> {/* Visual size smaller, touch target correct */}
</button>
```

### Screen Reader Considerations

- Headings must follow logical order (H1 → H2 → H3, never skip)
- All images need meaningful `alt` text (empty `alt=""` for decorative only)
- Form inputs must have associated labels
- Buttons/links must have descriptive text or `aria-label`
- Dynamic content needs `aria-live` regions

### Reduced Motion

```jsx
// Respect user preference
className="motion-safe:transition-all motion-safe:duration-200"

// Or in CSS
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

---

## Part 6: Animation and Interaction

### Timing Guidelines

| Interaction | Duration | Easing |
|-------------|----------|--------|
| Hover states | 150ms | ease-out |
| Button press | 100ms | ease-in |
| Fade in | 200ms | ease-out |
| Slide/transform | 200-300ms | ease-out |
| Page transitions | 300-400ms | ease-in-out |
| Modal open | 200ms | ease-out |
| Modal close | 150ms | ease-in |

### Tailwind Animation Classes

```jsx
// Fade in
className="animate-fade-in" // Define in config

// Slide up on enter
className="animate-slide-up"

// Pulse (for loading states)
className="animate-pulse"

// Smooth transitions
className="transition-all duration-200 ease-out"
className="transition-colors duration-150"
className="transition-transform duration-200"
```

### Custom Animations (add to Tailwind config)

```javascript
// tailwind.config.js
module.exports = {
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 200ms ease-out',
        'slide-up': 'slide-up 200ms ease-out',
        'slide-down': 'slide-down 200ms ease-out',
      },
    },
  },
}
```

### Staggered Animations

```jsx
// Stagger children on page load
<div className="space-y-4">
  {items.map((item, i) => (
    <div
      key={item.id}
      className="animate-slide-up"
      style={{ animationDelay: `${i * 50}ms`, animationFillMode: 'backwards' }}
    >
      {item.content}
    </div>
  ))}
</div>
```

---

## Part 7: Hero Section Patterns

Sidekick Strategies has six production-ready hero presets. Each uses inline styles with hex values to prevent Tailwind v4 CSS purging.

**Component Location:** `frontend/app/components/heroes/`

**Import Pattern:**
```jsx
import { HeroCleanSlate, HeroBoldEdge, HeroGradientFlow, HeroAuroraPulse, HeroKineticGrid, HeroExecutiveSuite } from '@/app/components/heroes'
```

### ⚠️ DEFAULT HERO RULE

**All hero sections use the "kinetic" style (HeroKineticGrid) by default** unless explicitly specified otherwise by the user.

This is the standard brand treatment seen on:
- `/brand-bible` page
- `/fit` page

**When to use a different hero:**
- Only when the user explicitly requests a different style
- When a specific page context calls for a different treatment (e.g., executive landing page)

**Kinetic Grid characteristics:**
- Dark navy background (#0a1628)
- Animated data flow lines and grid pattern
- Floating teal particles
- Tech-forward aesthetic that reflects HubSpot expertise
- Supports optional image on right side with tech frame

### Hero Selection Guide

| Preset | Style | Background | Animation | Best For |
|--------|-------|------------|-----------|----------|
| **Clean Slate** | Editorial minimalism | White | Subtle entrance | Thought leadership, B2B consulting |
| **Bold Edge** | Architectural geometry | Navy | Floating shapes | Competitive positioning, strong statements |
| **Gradient Flow** | Organic flowing | 3-color gradient | Glass orbs | Creative services, transformation |
| **Aurora Pulse** | Ethereal aurora | Dark | Morphing blobs | High-end consulting, visionary |
| **Kinetic Grid** | Tech-forward | Dark navy | Data flow lines | Technical services, data-driven |
| **Executive Suite** | Ultra-premium luxury | Dark navy | Corner accents | Enterprise sales, executive audience |

### 1. Clean Slate (HeroCleanSlate.tsx)

**Style:** Editorial minimalism with asymmetric layout. Typography as art on white canvas.
**Background:** White
**Best for:** Sophisticated B2B, thought leadership

```jsx
<HeroCleanSlate
  headline="Strategy that moves you forward"
  subheadline="We partner with ambitious organizations..."
  primaryCta={{ label: "Start a conversation", href: "/contact" }}
  secondaryCta={{ label: "Our approach", href: "/about" }}
/>
```

### 2. Bold Edge (HeroBoldEdge.tsx)

**Style:** Architectural geometry with floating shapes. Navy background, confident presence.
**Background:** Dark (navy-900)
**Best for:** Competitive positioning, strong brand statements

```jsx
<HeroBoldEdge
  headline="Build strategies that dominate"
  subheadline="We don't just consult—we architect competitive advantages..."
  primaryCta={{ label: "Get started", href: "/contact" }}
  secondaryCta={{ label: "View case studies", href: "/work" }}
/>
```

### 3. Gradient Flow (HeroGradientFlow.tsx)

**Style:** Fluid 3-color gradient in motion. Glassmorphic orbs and centered glass card.
**Background:** Teal-to-navy gradient
**Best for:** Creative services, transformation themes

```jsx
<HeroGradientFlow
  headline="Where strategy meets momentum"
  subheadline="Navigate complexity with clarity..."
  primaryCta={{ label: "Begin your journey", href: "/contact" }}
  secondaryCta={{ label: "Explore services", href: "/services" }}
/>
```

### 4. Aurora Pulse (HeroAuroraPulse.tsx)

**Style:** Ethereal aurora borealis effect. Morphing gradient blobs with twinkling stars.
**Background:** Dark with aurora effects
**Best for:** High-end consulting, visionary positioning

```jsx
<HeroAuroraPulse
  headline="Illuminate your path forward"
  subheadline="In a landscape of uncertainty, we bring clarity..."
  primaryCta={{ label: "Discover possibilities", href: "/contact" }}
  secondaryCta={{ label: "Our vision", href: "/about" }}
/>
```

### 5. Kinetic Grid (HeroKineticGrid.tsx)

**Style:** Tech-forward animated grid system. Flowing data lines and pulsing nodes.
**Background:** Dark navy with grid animation
**Best for:** Technical services, data-driven messaging, Brand Bible page

**Props:**
- `headline`, `subheadline`, `eyebrowText`
- `primaryCta`, `secondaryCta`, `tertiaryCta` (orange, teal, text link)
- `image?: { src, alt }` - Shows tech-framed image on right side

```jsx
<HeroKineticGrid
  headline="Systems designed for scale"
  subheadline="We engineer strategic frameworks..."
  eyebrowText="System Online"
  primaryCta={{ label: "Initialize", href: "/contact" }}
  secondaryCta={{ label: "Typography", href: "#typography" }}
  tertiaryCta={{ label: "View architecture", href: "/services" }}
  image={{
    src: "https://cdn.sanity.io/images/...",
    alt: "Brand Visual"
  }}
/>
```

### 6. Executive Suite (HeroExecutiveSuite.tsx)

**Style:** Ultra-premium dark luxury. Peach/gold accents with testimonial card.
**Background:** Deep navy-black gradient
**Best for:** Enterprise sales, executive audience

**Features:**
- Testimonial card with attribution
- Trust indicators (Fortune 500 count, Value Created, Years)
- Corner accent lines with elegant animation

```jsx
<HeroExecutiveSuite
  headline="Excellence, delivered"
  subheadline="Trusted by industry leaders..."
  primaryCta={{ label: "Schedule a consultation", href: "/contact" }}
  secondaryCta={{ label: "Our expertise", href: "/services" }}
/>
```

### Technical Notes

**CRITICAL:** All hero components use:
1. **COLORS constant** - Hex values to prevent Tailwind v4 purging
2. **Inline styles** - For dynamic brand colors
3. **Single-line classNames** - Multi-line causes Turbopack parsing errors
4. **`<style jsx>`** - For CSS keyframe animations
5. **useState** - For mounted and hover states

**Eyebrow text standard:** `text-xs tracking-[0.25em] uppercase` (12px, readable)

---

## Part 8: State Handling

Every component needs complete state coverage.

### Loading States

```jsx
// Button loading
<button className="h-10 px-4 bg-brand-orange-500 text-white rounded-lg opacity-75 cursor-wait" disabled>
  <svg className="animate-spin h-5 w-5 mr-2 inline" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
  </svg>
  Processing...
</button>

// Skeleton loading
<div className="animate-pulse space-y-4">
  <div className="h-4 bg-gray-200 rounded w-3/4" />
  <div className="h-4 bg-gray-200 rounded w-1/2" />
  <div className="h-4 bg-gray-200 rounded w-5/6" />
</div>
```

### Empty States

```jsx
<div className="text-center py-12">
  <div className="mx-auto w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
    <Icon className="w-8 h-8 text-gray-400" />
  </div>
  <h3 className="text-lg font-heading font-medium text-navy-800">No results found</h3>
  <p className="mt-2 text-base font-body text-navy-600">
    Try adjusting your search or filters to find what you're looking for.
  </p>
  <button className="mt-4 h-10 px-4 bg-teal-500 text-white font-heading font-medium rounded-lg hover:bg-teal-600 transition-colors">
    Clear filters
  </button>
</div>
```

### Error States

```jsx
<div className="bg-red-50 border border-red-200 rounded-lg p-4">
  <div className="flex gap-3">
    <div className="flex-shrink-0">
      <AlertIcon className="w-5 h-5 text-red-500" />
    </div>
    <div>
      <h4 className="text-sm font-heading font-medium text-red-800">
        Something went wrong
      </h4>
      <p className="mt-1 text-sm font-body text-red-700">
        We couldn't load the data. Please try again or contact support.
      </p>
      <button className="mt-3 text-sm font-heading font-medium text-red-600 hover:text-red-700">
        Try again →
      </button>
    </div>
  </div>
</div>
```

### Success States

```jsx
<div className="bg-green-50 border border-green-200 rounded-lg p-4">
  <div className="flex gap-3">
    <CheckIcon className="w-5 h-5 text-green-500" />
    <div>
      <h4 className="text-sm font-heading font-medium text-green-800">
        Changes saved
      </h4>
      <p className="mt-1 text-sm font-body text-green-700">
        Your updates have been applied successfully.
      </p>
    </div>
  </div>
</div>
```

---

## Part 9: Data Visualization

### Chart Colors (in order of use)

```
1. Teal-500:       #028393
2. Brand-orange-500: #f65625
3. Navy-500:       #3a5a9a
4. Peach:          #faaa68
5. Light-blue:     #98c1d9
6. Slate:          #3d5a80
```

### Dashboard Layout

```jsx
<div className="grid grid-cols-12 gap-6">
  {/* Primary KPI row */}
  <div className="col-span-12 grid grid-cols-4 gap-6">
    <KPICard value="$1.2M" label="Revenue" trend="+12%" />
    <KPICard value="847" label="Customers" trend="+8%" />
    <KPICard value="94%" label="Satisfaction" trend="+2%" />
    <KPICard value="23" label="Active Projects" trend="-1" />
  </div>
  
  {/* Main chart area */}
  <div className="col-span-12 lg:col-span-8">
    <ChartCard title="Revenue Over Time" />
  </div>
  
  {/* Secondary metrics */}
  <div className="col-span-12 lg:col-span-4 space-y-6">
    <MetricCard title="Top Sources" />
    <MetricCard title="Recent Activity" />
  </div>
</div>
```

### Tufte Principles

1. **Maximize data-ink ratio:** Remove chartjunk, decorative elements
2. **No 3D effects:** Distorts perception
3. **Bar charts start at zero:** Always
4. **Pie charts:** Maximum 5 slices, or use bar chart instead
5. **Label directly:** Avoid legends when possible

---

## Part 10: Anti-Patterns to Avoid

### Typography Crimes

- ❌ Using more than 3 font families
- ❌ Line length over 90 characters
- ❌ Line height under 1.3 for body text
- ❌ Pure black (#000) for large text blocks
- ❌ Centered body text for paragraphs
- ❌ All caps without added letter-spacing

### Spacing Crimes

- ❌ Arbitrary pixel values (17px, 23px instead of scale values)
- ❌ Internal padding larger than external margins
- ❌ Inconsistent spacing on identical components
- ❌ Cramped touch targets (under 44px)

### Color Crimes

- ❌ Accent color (orange) covering large areas
- ❌ Text that fails contrast requirements
- ❌ Information conveyed by color alone
- ❌ More than 3 colors in one section
- ❌ Teal-500 for small text (use teal-600)

### Interaction Crimes

- ❌ Removing focus outlines without replacement
- ❌ Missing hover/active states
- ❌ Animations without reduced-motion support
- ❌ Click targets that look different than their hit area
- ❌ Form inputs without visible labels

### Layout Crimes

- ❌ Inconsistent container widths across pages
- ❌ Gutters that change arbitrarily
- ❌ Elements that don't align to anything
- ❌ Mobile layouts as afterthought (not mobile-first)

---

## Part 11: Performance Guidelines

### Core Web Vitals Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Hero image/text load |
| INP (Interaction to Next Paint) | < 200ms | Click response time |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |

### Image Optimization

```jsx
// Next.js Image (preferred)
<Image
  src="/hero.jpg"
  alt="Descriptive alt text"
  width={1200}
  height={600}
  priority // For above-fold images
  className="object-cover"
/>

// Standard HTML with lazy loading
<img
  src="/image.jpg"
  alt="Descriptive alt text"
  loading="lazy" // Below-fold images
  decoding="async"
  width="800"
  height="400"
/>
```

### Font Loading Strategy

```css
/* Use font-display: swap */
@font-face {
  font-family: 'PT Sans';
  src: url('/fonts/pt-sans.woff2') format('woff2');
  font-display: swap;
}
```

### Prevent Layout Shift

- Always specify `width` and `height` on images
- Reserve space for dynamic content
- Use skeleton loaders that match content dimensions
- Avoid inserting content above existing content

---

## Part 12: Design Checklist

Run through before shipping any interface:

### Visual Hierarchy
- [ ] Clear focal point established
- [ ] Typography scale followed consistently
- [ ] Color distribution follows 60-30-10
- [ ] Spacing uses 8px grid system
- [ ] White space used intentionally

### Components
- [ ] All interactive states designed (hover, focus, active, disabled)
- [ ] Loading states implemented
- [ ] Empty states designed
- [ ] Error states with recovery paths
- [ ] Success confirmations included

### Accessibility
- [ ] Color contrast meets WCAG AA (4.5:1 text, 3:1 UI)
- [ ] Focus indicators visible
- [ ] Touch targets minimum 44px
- [ ] Headings in logical order
- [ ] Form inputs have labels
- [ ] Images have alt text
- [ ] Reduced motion respected

### Responsiveness
- [ ] Mobile-first approach used
- [ ] All breakpoints tested
- [ ] Touch targets adequate on mobile
- [ ] Typography scales appropriately
- [ ] Images responsive

### Performance
- [ ] Images optimized (WebP/AVIF, lazy loading)
- [ ] Fonts use display: swap
- [ ] No layout shift on load
- [ ] Animations hardware-accelerated

### Brand Consistency
- [ ] Sidekick colors used correctly
- [ ] Typography matches brand stack
- [ ] Tone aligns with voice guidelines
- [ ] No en dashes, em dashes, or "thrive"

---

## Part 13: Quick Tailwind Recipes

### Page Container

```jsx
<main className="min-h-screen bg-white">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
    {/* Content */}
  </div>
</main>
```

### Section with Alternating Background

```jsx
<section className="py-16 lg:py-24 bg-cream">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    {/* Content */}
  </div>
</section>
```

### Responsive Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
  {/* Items */}
</div>
```

### Centered Content Block

```jsx
<div className="max-w-3xl mx-auto text-center">
  <h2 className="text-3xl lg:text-5xl font-display text-navy-800">
    Section Title
  </h2>
  <p className="mt-4 text-lg font-body text-navy-600 leading-relaxed">
    Section description with comfortable line length.
  </p>
</div>
```

### Feature Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
  <div className="p-6 bg-white rounded-xl shadow-md">
    <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
      <Icon className="w-6 h-6 text-teal-500" />
    </div>
    <h3 className="text-lg font-heading font-semibold text-navy-800">Feature Title</h3>
    <p className="mt-2 text-base font-body text-navy-600">Feature description.</p>
  </div>
</div>
```

### Testimonial Card

```jsx
<div className="bg-navy-800 rounded-2xl p-8 text-white">
  <blockquote className="text-xl font-body italic leading-relaxed">
    "Their strategic insight transformed our approach entirely."
  </blockquote>
  <div className="mt-6 flex items-center gap-4">
    <img src="/avatar.jpg" alt="" className="w-12 h-12 rounded-full" />
    <div>
      <p className="font-heading font-medium">James Mitchell</p>
      <p className="text-sm text-gray-300">CEO, Apex Holdings</p>
    </div>
  </div>
</div>
```

---

## Usage Instructions for Claude Code

When this skill is activated:

1. **Always apply** the Sidekick color palette, typography, and spacing system
2. **Never use** generic fonts (Inter, Arial, Roboto) or non-brand colors
3. **Check contrast** for all text and interactive elements
4. **Include all states** for interactive components
5. **Follow mobile-first** responsive patterns
6. **Use semantic HTML** with proper heading hierarchy
7. **Add focus states** to all interactive elements
8. **Respect reduced motion** preferences

When in doubt, reference the Quick Reference section at the top of this document.
