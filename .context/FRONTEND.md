# Frontend Architecture

## Next.js Configuration
- **Version**: 16.1.1 (App Router)
- **React**: 19.2.3
- **TypeScript**: 5.9.3
- **Port**: 3000

## Routes

### Static Pages
| Route | File | Purpose |
|-------|------|---------|
| `/` | `app/page.tsx` | Home page (template demo) |
| `/articles` | `app/articles/page.tsx` | Article listing |
| `/podcasts` | `app/podcasts/page.tsx` | Podcast listing |
| `/resources` | `app/resources/page.tsx` | Downloads listing |

### Dynamic Pages
| Route | File | Purpose |
|-------|------|---------|
| `/[slug]` | `app/[slug]/page.tsx` | Dynamic pages (page builder) |
| `/articles/[slug]` | `app/articles/[slug]/page.tsx` | Individual article |
| `/podcasts/[slug]` | `app/podcasts/[slug]/page.tsx` | Individual podcast |
| `/resources/[slug]` | `app/resources/[slug]/page.tsx` | Individual download |
| `/posts/[slug]` | `app/posts/[slug]/page.tsx` | Legacy post route |

### API Routes
| Route | Purpose |
|-------|---------|
| `/api/draft-mode/enable` | Enable Sanity draft mode |

---

## Key Components

### Layout Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `Header` | `app/components/Header.tsx` | Site header with logo |
| `Footer` | `app/components/Footer.tsx` | Navy footer with logo, tagline, contact |
| `BackToTop` | `app/components/BackToTop.tsx` | Scroll-to-top button (client component) |
| `RootLayout` | `app/layout.tsx` | HTML wrapper, fonts, global providers |

### Content Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `PageBuilder` | `app/components/PageBuilder.tsx` | Renders page builder array |
| `BlockRenderer` | `app/components/BlockRenderer.tsx` | Routes to specific block components |
| `PortableText` | `app/components/PortableText.tsx` | Renders Sanity rich text |
| `SanityImage` | `app/components/SanityImage.tsx` | Optimized image component |
| `Avatar` | `app/components/Avatar.tsx` | Author/person display |
| `ResolvedLink` | `app/components/ResolvedLink.tsx` | Handles internal/external links |

### Hero Preset Components (app/components/heroes/)
| Component | Style | Background | Animation |
|-----------|-------|------------|-----------|
| `HeroCleanSlate.tsx` | Editorial minimalism | White | Subtle entrance |
| `HeroBoldEdge.tsx` | Architectural geometry | Navy | Floating shapes |
| `HeroGradientFlow.tsx` | Organic flowing | 3-color gradient | Glass orbs |
| `HeroAuroraPulse.tsx` | Ethereal aurora | Dark | Morphing blobs |
| `HeroKineticGrid.tsx` | Tech-forward | Dark navy | Data flow lines |
| `HeroExecutiveSuite.tsx` | Ultra-premium luxury | Dark navy | Corner accents |

**⚠️ DEFAULT HERO RULE**: All hero sections should use the **"kinetic"** style (HeroKineticGrid) unless explicitly specified otherwise. This is the standard brand treatment seen on `/brand-bible` and `/fit` pages.

**Hero Pattern**: All heroes use inline styles with hex color values to prevent Tailwind v4 CSS purging. Each has a COLORS constant and CSS keyframe animations via `<style jsx>`.

**HeroKineticGrid Props** (most flexible):
- `headline`, `subheadline`, `eyebrowText`
- `primaryCta`, `secondaryCta`, `tertiaryCta` (orange, teal, text link)
- `image?: { src, alt }` - Shows tech-framed image on right side

### Block Components (app/components/blocks/)
| Component | Schema Type | Purpose |
|-----------|-------------|---------|
| `Hero.tsx` | hero | Large banner sections |
| `Cta.tsx` | callToAction | Image + text CTA |
| `InfoSection.tsx` | infoSection | Rich text block |
| `FeaturedArticles.tsx` | featuredArticles | Post grids |
| `FeaturedPodcasts.tsx` | featuredPodcasts | Episode grids |
| `DownloadsGrid.tsx` | downloadsGrid | Resource grids |
| `Testimonial.tsx` | testimonial | Customer quotes |
| `TeamGrid.tsx` | teamGrid | Team member display |
| `ContactForm.tsx` | contactForm | Contact/newsletter forms |
| `FAQAccordion.tsx` | faqAccordion | Expandable Q&A |

### Page-Specific Components
| Component | Location | Purpose |
|-----------|----------|---------|
| `DownloadForm` | `app/resources/[slug]/DownloadForm.tsx` | Gated download form (client) |

### Brand Bible Page
- `app/brand-bible/page.tsx` - Client component with full brand documentation
- `app/brand-bible/layout.tsx` - Static metadata for SEO/OG (since page.tsx is 'use client')

Comprehensive brand documentation with:

**Button Styles (8 types)**:
1. Primary Orange Solid - Main CTAs
2. Teal Action - Secondary emphasis
3. Navy Solid - Professional/authoritative
4. Ghost Outline - Subtle, non-competing
5. Tech Cut Orange - clipPath corners, tech feel
6. Tech Cut Teal - Secondary tech variant
7. Text Link Underline - Animated underline on hover
8. Text Link Arrow - Premium text link with arrow

**Iconography (40+ icons)**:
- Marketing & Agency: Megaphone, Analytics, Target, Launch, Ideas, Audience, Email, Global, Schedule, Growth
- HubSpot & CRM: Contacts, Pipeline, Deals, Automation, Inbox, Database, Workflow, Reports, Integrate, Dashboard
- Sales: Partner, Success, Revenue, Business, Call, Award, Complete, Time, Premium, Goal
- Hero & Strength: Shield, Power, Energy, Protect, Ignite, Navigate, Dawn, Summit, Anchor, Lead

**Helper Components (local to page)**:
- `TextLinkUnderline` - Animated underline reveal on hover
- `TextLinkArrow` - Text link with arrow that translates
- `TertiaryTextLink` - Ghost-style for dark backgrounds
- `IconCard` - Icon display card with color prop (orange/teal/navy)

---

## SEO & Metadata

### Dynamic Pages (Sanity-Managed)
All dynamic routes use `generateMetadata()` with SEO field fallbacks:
```typescript
export async function generateMetadata(props: Props, parent: ResolvingMetadata): Promise<Metadata> {
  const {data: page} = await sanityFetch({query, params, stega: false})
  const ogImage = resolveOpenGraphImage(page?.seo?.ogImage || page?.coverImage)

  return {
    title: page?.seo?.metaTitle || page?.title,
    description: page?.seo?.metaDescription || page?.excerpt,
    openGraph: { images: ogImage ? [ogImage] : [] },
    ...(page?.seo?.noIndex && {robots: {index: false, follow: false}}),
  }
}
```

**Routes with SEO support**:
- `/[slug]` - Pages (uses seo.ogImage, falls back to nothing)
- `/articles/[slug]` - Posts (falls back to coverImage)
- `/podcasts/[slug]` - Podcasts (falls back to coverImage)
- `/resources/[slug]` - Downloads (falls back to thumbnail)

### Static Pages
For client components that can't export metadata, use a sibling `layout.tsx`:
```typescript
// app/brand-bible/layout.tsx
export const metadata: Metadata = {
  title: 'Brand Bible - Sidekick Strategies',
  openGraph: {
    images: [{ url: '/images/og-brand-bible.png', width: 1200, height: 630 }],
  },
}
```

**OG Image Location**: `/frontend/public/images/og-{page-name}.png`

---

## Sanity Integration

### Client Configuration
- `sanity/lib/client.ts` - Sanity client setup
- `sanity/lib/live.ts` - Live preview configuration
- `sanity/lib/queries.ts` - GROQ queries
- `sanity/lib/utils.ts` - Helper functions (dataAttr, resolveOpenGraphImage)
- `sanity/lib/types.ts` - Type helpers (ExtractPageBuilderType)

### Type Generation
```bash
npm run typegen  # Generates sanity.types.ts
```

**Important**: GROQ queries must use constant slices for typegen:
```groq
# Good - typegen can process
[0...12]

# Bad - typegen fails
[0...coalesce(^.limit, 3)]
[0...$limit]
```

### Query Patterns
```typescript
// Fetching with live preview
const {data} = await sanityFetch({
  query: getPageQuery,
  params: {slug},
})

// Static params generation
export async function generateStaticParams() {
  const {data} = await sanityFetch({
    query: pagesSlugs,
    perspective: 'published',
    stega: false,
  })
  return data
}
```

---

## Styling

### Container Width Standard (1640px)
All page builder sections use the `container` class which has:
- **Max-width**: 1640px
- **Horizontal padding**: 2rem (32px) on each side
- **Centering**: `margin: 0 auto`

**Defined in**: `app/globals.css` via `@utility container`

**Usage in components**:
```tsx
<section className="...">
  <div className="container">
    {/* Content here */}
  </div>
</section>
```

**Note**: This applies to all PAGE content (Hero, CTA, InfoSection, etc.), NOT article/blog content which uses narrower widths for readability.

### Tailwind CSS 4
- Config: `tailwind.config.ts`
- Styles: `app/globals.css`

### CSS-in-CSS Pattern (Tailwind 4)
```css
/* Fonts must be defined in @theme, not just tailwind.config.ts */
@theme {
  --font-family-heading: var(--font-montserrat), sans-serif;
  --font-family-sans: var(--font-pt-sans), sans-serif;
  --font-family-serif: "Palatino Linotype", serif;
  --font-family-mono: var(--font-ibm-plex-mono), monospace;
}

/* Use CSS vars directly instead of @apply for custom fonts */
h3 {
  font-family: var(--font-family-heading);  /* Works */
  @apply font-heading;  /* May not work in Tailwind 4 */
}
```

---

## Common Type Issues

### SanityImageCrop/Hotspot
Sanity types have optional properties, but `sanity-image` expects required:
```typescript
// Fix: Cast as any
<Image
  crop={image.crop as any}
  hotspot={image.hotspot as any}
/>
```

### Null vs Undefined
Sanity returns `null`, components expect `undefined`:
```typescript
// Fix: Use fallbacks
fileUrl={download.file || ''}
fileType={download.fileType || undefined}
```

### Array Null Checks
```typescript
// Fix: Check both null and length
{items && items.length > 0 && (
  items.map(...)
)}
```

---

## Key Files
- `app/layout.tsx` - Root layout, fonts, metadata
- `app/globals.css` - Tailwind config, typography
- `sanity/lib/queries.ts` - All GROQ queries
- `sanity.types.ts` - Generated types
- `tailwind.config.ts` - Design tokens

## Last Updated
2026-01-05
