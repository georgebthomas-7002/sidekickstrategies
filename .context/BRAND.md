# Brand Guidelines

## Colors

### Primary Palette
| Name | Hex | Usage |
|------|-----|-------|
| Primary (Dark Blue) | `#142d63` | Headers, primary text, brand identity |
| Secondary (Teal) | `#028393` | Accents, links, secondary elements |
| Accent (Orange) | `#f65625` | Buttons, CTAs, highlights |

### Extended Palette
| Name | Hex | Usage |
|------|-----|-------|
| Peach | `#faaa68` | Soft accents |
| Light Blue | `#98c1d9` | Backgrounds, subtle accents |
| Slate | `#3d5a80` | Secondary text, borders |
| White | `#ffffff` | Backgrounds |
| Black | `#000000` | Text |

### Tailwind Classes
```css
/* Primary (brand-*) */
brand-800: #142d63  /* Main primary */

/* Secondary (secondary-*) */
secondary-500: #028393  /* Main secondary */

/* Accent (accent-*) */
accent-500: #f65625  /* Main accent/buttons */
accent-600: #d9441a  /* Button hover */
```

### CSS Variables (globals.css @theme)
```css
--color-brand-primary: #142d63;
--color-brand-secondary: #028393;
--color-brand-accent: #f65625;
--color-brand-peach: #faaa68;
--color-brand-light-blue: #98c1d9;
--color-brand-slate: #3d5a80;
```

---

## Typography

### Font Families
| Element | Font | Tailwind Class | CSS Variable |
|---------|------|----------------|--------------|
| H1, H2 | Palatino Linotype | `font-serif` | `--font-family-serif` |
| H3, H4, H5, H6 | Montserrat | `font-heading` | `--font-family-heading` |
| Body/Paragraph | PT Sans | `font-sans` | `--font-family-sans` |
| Code/Labels | IBM Plex Mono | `font-mono` | `--font-family-mono` |

### Font Loading (layout.tsx)
```typescript
import {Montserrat, PT_Sans, IBM_Plex_Mono} from 'next/font/google'

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
})

const ptSans = PT_Sans({
  variable: '--font-pt-sans',
  subsets: ['latin'],
  weight: ['400', '700'],
})

const ibmPlexMono = IBM_Plex_Mono({
  variable: '--font-ibm-plex-mono',
  weight: ['400'],
  subsets: ['latin'],
})
```

### Responsive Sizing
| Element | Mobile | Tablet (md) | Desktop (lg) |
|---------|--------|-------------|--------------|
| H1 | 36px (text-4xl) | 48px (text-5xl) | 60px (text-6xl) |
| H2 | 30px (text-3xl) | 36px (text-4xl) | 48px (text-5xl) |
| H3 | 24px (text-2xl) | 30px (text-3xl) | 30px |
| H4 | 20px (text-xl) | 24px (text-2xl) | 24px |
| Body | 16px (text-base) | 18px (text-lg) | 18px |

### Minimum Font Size
**16px minimum** - No text smaller than 16px for accessibility.

---

## Button Styles (8 Types)

### 01. Solid Buttons

**Primary Orange Solid** - Main CTAs
```html
<button style="background-color: #f65625;" class="text-white hover:bg-[#d9441a] rounded-full px-8 py-3 font-mono text-sm">
  Button Text
</button>
```

**Teal Action** - Secondary emphasis
```html
<button style="background-color: #028393;" class="text-white hover:bg-[#026d7a] rounded-full px-8 py-3 font-mono text-sm">
  Explore Services
</button>
```

**Navy Solid** - Professional/authoritative
```html
<button style="background-color: #142d63;" class="text-white hover:bg-[#0f2250] rounded-full px-8 py-3 font-mono text-sm">
  Learn More
</button>
```

**Ghost Outline** - Subtle, non-competing
```html
<button style="border: 2px solid #142d63; color: #142d63;" class="bg-transparent hover:bg-[#142d63] hover:text-white rounded-full px-8 py-3 font-mono text-sm">
  View Details
</button>
```

### 02. Tech Cut Corner Buttons

**Tech Cut Orange** - clipPath corners, tech feel
```html
<button
  style="background-color: #f65625; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));"
  class="px-8 py-4 text-white font-mono text-sm uppercase tracking-wider">
  Initialize
</button>
```

**Tech Cut Teal** - Secondary tech variant
```html
<button
  style="background-color: #028393; clip-path: polygon(0 0, calc(100% - 8px) 0, 100% 8px, 100% 100%, 8px 100%, 0 calc(100% - 8px));"
  class="px-8 py-4 text-white font-mono text-sm uppercase tracking-wider">
  Deploy
</button>
```

### 03. Text Link Buttons

**Text Link Underline** - Animated underline on hover
- Navy text → Orange on hover
- Underline reveals from left on hover
- Right arrow icon translates on hover

**Text Link Arrow** - Premium text link with arrow
- Clean uppercase text + arrow
- Arrow translates right on hover

### 04. On Dark Backgrounds

**Tertiary Text Link** - Ghost-style for dark backgrounds
- White/80 opacity at rest
- Full white on hover with underline reveal

---

## Iconography (40+ Icons)

### Icon Categories

| Category | Icons | Use Cases |
|----------|-------|-----------|
| Marketing & Agency | Megaphone, Analytics, Target, Launch, Ideas, Audience, Email, Global, Schedule, Growth | Marketing pages, agency services |
| HubSpot & CRM | Contacts, Pipeline, Deals, Automation, Inbox, Database, Workflow, Reports, Integrate, Dashboard | HubSpot features, CRM content |
| Sales | Partner, Success, Revenue, Business, Call, Award, Complete, Time, Premium, Goal | Sales pages, success stories |
| Hero & Strength | Shield, Power, Energy, Protect, Ignite, Navigate, Dawn, Summit, Anchor, Lead | Hero sections, empowerment messaging |

### Icon Specifications
- **Style**: Stroke-based (consistent 1.5-2px stroke width)
- **Size**: 24x24 base, scalable via w-6 h-6 class
- **Colors**: Use brand colors (Orange #f65625, Teal #028393, Navy #142d63)
- **Backgrounds**: Light tinted backgrounds (#fff5f0 for orange, #e6f7f9 for teal, #f0f4fa for navy)

### Color Variants
All icons work in:
- Orange (#f65625) - Primary CTAs, energy
- Teal (#028393) - Secondary, trust
- Navy (#142d63) - Professional, authority
- Peach (#faaa68) - Soft accents
- Gray (#6b7280) - Neutral, subtle
- White (#ffffff) - On dark backgrounds

### Usage Notes
- Use Orange icons for primary actions and energy
- Use Teal icons for trust signals and secondary CTAs
- Use Navy icons for professional/authority contexts
- Use White icons on dark navy backgrounds

See full icon library at `/brand-bible#iconography`

---

## Voice & Tone

### Voice in 3 Words
**Empowering • Conversational • Human**

### Tone Characteristics

**Primary Tone: Warm Authority**
- Knowledgeable but never condescending
- Confident without being arrogant
- Accessible yet expert
- Personal and genuine

**Secondary Tone: Energetic Encouragement**
- Enthusiasm without hype
- Supportive coaching style
- Action-oriented motivation
- Celebration of wins (big and small)

### Voice Do's
- Use "humans" instead of "contacts" or "leads"
- Start sentences with "And" or "But" for conversational flow
- Include metaphors and analogies (maestro, ninja, X-ray vision)
- Ask rhetorical questions
- Use contractions (you're, we're, don't)
- Reference real experiences and stories
- End with invitations, not demands
- Include words like "frankly," "honestly," "here's the thing"

### Voice Don'ts
- Use corporate jargon ("synergy," "leverage," "optimize")
- Sound robotic or templated
- Be preachy or prescriptive
- Use excessive exclamation points
- Include meaningless superlatives
- Gate content behind manipulation
- Create artificial urgency

### Signature Phrases
- "Value First Humans"
- "Your sidekick in the HubSpot journey"
- "Strategies, tactics, and actions"
- "FEAM" (Family + Team)
- "Human signals over digital vanity metrics"
- "There is no gate"
- "Speed to meaningful help"

### Headline Patterns
- Statement + Qualifier: "Building Genuine Connections, Not Managing Transactions"
- Human-centered: "Learning That Scales and Leadership That Stays Human"
- Philosophy-forward: "Purpose, Passion, Persistence, and Love in Business"

### CTA Style
- Soft invitations over hard sells
- "Let's talk" over "Book now"
- "Start a conversation" over "Get a quote"
- Value-first framing: "See how we can help"

---

## Design Rules

### Default Hero Style
**All hero sections use the "kinetic" style by default** unless explicitly specified otherwise.

- **Style**: HeroKineticGrid (tech-forward with data flow lines)
- **Background**: Dark navy (#0a1628)
- **Elements**: Animated grid lines, floating particles, teal accents
- **Reference**: See `/brand-bible` and `/fit` pages

This creates brand consistency across the site with a modern, tech-forward aesthetic that reflects the HubSpot expertise and innovation-focused positioning.

---

## Key Files
- `frontend/tailwind.config.ts` - Design tokens, color scales
- `frontend/app/globals.css` - @theme variables, base typography
- `frontend/app/layout.tsx` - Font imports
- `.context/PERSONAS.md` - Target audience profiles
- `.context/TEAM.md` - Team information and roles
- `.context/RESEARCH.md` - Comprehensive website research

## Last Updated
2026-01-04
