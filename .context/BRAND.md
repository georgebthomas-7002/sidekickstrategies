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

## Button Styles

### Primary Button (Accent)
```html
<button class="bg-accent-500 text-white hover:bg-accent-600 rounded-full px-8 py-3 font-mono text-sm">
  Button Text
</button>
```

### Secondary Button (Outline)
```html
<button class="border-2 border-brand-800 text-brand-800 hover:bg-brand-800 hover:text-white rounded-full px-8 py-3 font-mono text-sm">
  Button Text
</button>
```

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

## Key Files
- `frontend/tailwind.config.ts` - Design tokens, color scales
- `frontend/app/globals.css` - @theme variables, base typography
- `frontend/app/layout.tsx` - Font imports
- `.context/PERSONAS.md` - Target audience profiles
- `.context/TEAM.md` - Team information and roles
- `.context/RESEARCH.md` - Comprehensive website research

## Last Updated
2026-01-03
