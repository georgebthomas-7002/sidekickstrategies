# Project Overview

## About
**Sidekick Strategies** - Marketing/consulting website migrated from HubSpot to Sanity.io + Next.js.

## Tech Stack
| Layer | Technology | Version |
|-------|------------|---------|
| Frontend | Next.js (App Router) | 16.1.1 |
| CMS | Sanity.io | v5.1.0 |
| Styling | Tailwind CSS | v4.1.17 |
| Hosting | Vercel | - |
| Fonts | Google Fonts (Montserrat, PT Sans) + System (Palatino) | - |

## Project Structure
```
/sidekickstrategies
├── /frontend                 # Next.js 16 app (port 3000)
│   ├── /app                  # App Router pages
│   │   ├── /[slug]           # Dynamic pages (page builder)
│   │   ├── /articles         # Blog articles (listing + [slug])
│   │   ├── /podcasts         # Podcast episodes (listing + [slug])
│   │   ├── /resources        # Downloads (listing + [slug])
│   │   ├── /posts            # Legacy posts route
│   │   ├── /components       # React components
│   │   │   └── /blocks       # Page builder block components
│   │   ├── globals.css       # Tailwind + custom styles
│   │   └── layout.tsx        # Root layout with fonts
│   ├── /sanity               # Sanity client config & queries
│   │   └── /lib
│   │       ├── queries.ts    # GROQ queries
│   │       ├── live.ts       # Live preview config
│   │       └── types.ts      # Type helpers
│   ├── sanity.types.ts       # Generated types (npm run typegen)
│   ├── tailwind.config.ts    # Design tokens
│   └── package.json
│
├── /studio                   # Sanity Studio (port 3333)
│   ├── /src
│   │   ├── /schemaTypes
│   │   │   ├── /documents    # Document schemas
│   │   │   │   ├── page.ts
│   │   │   │   ├── post.ts
│   │   │   │   ├── podcast.ts
│   │   │   │   ├── download.ts
│   │   │   │   └── person.ts
│   │   │   ├── /objects      # Reusable object/block schemas
│   │   │   │   ├── hero.ts
│   │   │   │   ├── callToAction.ts
│   │   │   │   ├── featuredArticles.ts
│   │   │   │   ├── featuredPodcasts.ts
│   │   │   │   ├── downloadsGrid.ts
│   │   │   │   ├── testimonial.ts
│   │   │   │   ├── teamGrid.ts
│   │   │   │   ├── contactForm.ts
│   │   │   │   ├── faqAccordion.ts
│   │   │   │   └── ...
│   │   │   └── /singletons
│   │   │       └── settings.tsx
│   │   └── /structure        # Studio navigation
│   ├── sanity.config.ts      # Main studio config
│   ├── schema.json           # Generated schema (for typegen)
│   └── package.json
│
├── package.json              # Root workspace config
├── turbo.json                # Turborepo config
├── CLAUDE.md                 # This context system
└── .context/                 # Context files
```

## Key Features
1. **Visual Editing** - Sanity Presentation tool for live preview
2. **Page Builder** - Drag-and-drop blocks for pages
3. **Podcast Integration** - Transistor.fm embeds
4. **Gated Downloads** - Optional email capture for resources
5. **Sanity Canvas** - AI content mapping (configured)

## Content Types
| Type | Purpose | Route |
|------|---------|-------|
| Page | Landing pages with page builder | `/[slug]` |
| Post | Blog articles | `/posts/[slug]`, `/articles/[slug]` |
| Podcast | Episode pages with Transistor embed | `/podcasts/[slug]` |
| Download | Gated/ungated resources | `/resources/[slug]` |
| Person | Team members, authors, guests | (referenced) |
| Settings | Global site settings | (singleton) |

## Page Builder Blocks
1. Hero - Large banner with CTA buttons
2. Call to Action - Image + text section
3. Info Section - Rich text content
4. Featured Articles - Post grid/list
5. Featured Podcasts - Episode grid/list
6. Downloads Grid - Resource grid
7. Testimonial - Customer quote
8. Team Grid - Team member display
9. Contact Form - Configurable form
10. FAQ Accordion - Q&A expandable

## Last Updated
2026-01-03 - Initial context system creation
