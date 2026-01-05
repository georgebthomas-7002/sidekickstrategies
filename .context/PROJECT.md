# Project Overview

## About
**Sidekick Strategies** - HubSpot consultancy and training company founded by George B. Thomas in 2022. Website migrated from HubSpot to Sanity.io + Next.js.

### Mission
"We teach businesses the strategies, tactics, and actions needed to empower them with HubSpot, and frankly, life!"

### Core Services
| Service | Pricing | Description |
|---------|---------|-------------|
| HubSpot Consulting | $350/hr or packages ($2,400-$3,000) | Audits, migrations, integrations, optimization |
| HubSpot Training | $2,750/month | Team training, 1-on-1 coaching, workshops |

### Key Differentiators
- 124+ HubSpot certifications (team collective)
- "FEAM" model (Family + Team)
- Empowerment over dependency approach
- Value-first philosophy

### Related Context Files
- `.context/BRAND.md` - Visual design + voice guidelines
- `.context/PERSONAS.md` - Target audience profiles
- `.context/TEAM.md` - Team member information
- `.context/RESEARCH.md` - Full website research
- `.context/SKILLS.md` - Recommended Claude Skills

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

## MCP Servers

The project uses Model Context Protocol (MCP) servers to enhance Claude Code capabilities. Configuration is stored in `.mcp.json` (project root).

| Server | Type | Purpose | Authentication |
|--------|------|---------|----------------|
| Playwright | Local (stdio) | Browser automation, screenshots, testing | None |
| Sanity | Remote (HTTP) | CMS operations, GROQ queries, 40+ tools | OAuth (browser) |
| Vercel | Remote (HTTP) | Deployment logs, project monitoring | OAuth (browser) |
| HubSpot | Remote (HTTP) | CRM data - contacts, deals, companies | Token in .env.local |
| Sentry | Remote (HTTP) | Error monitoring, debugging | OAuth (browser) |

### MCP Usage Examples
```
# Playwright
"Use Playwright to navigate to our site and take a screenshot"

# Sanity
"Query all published articles from Sanity"
"Run a GROQ query for posts by George"

# Vercel
"Show me recent deployments for this project"

# HubSpot
"List recent deals in the Decision stage"

# Sentry
"Show me recent errors from production"
```

### MCP Configuration
- **Config File**: `.mcp.json` (project root, committed to git)
- **Secrets**: Store tokens in `frontend/.env.local` (gitignored)
- **Verify Status**: Run `/mcp` in Claude Code

## HubSpot CRM Integration

Full HubSpot CRM control is configured with:
- **MCP Server**: Read access to contacts, companies, deals (OAuth)
- **Direct API**: Write access via Private App token for creating/updating objects
- **Account ID**: 474711

### Deal Creation Wizard
A conversational workflow for creating complete deals. Invoke with:
- `/create-deal` or "create deal for [name]"

**What it does:**
1. Looks up contact → finds associated company
2. Asks deal type (Implementation, Training, Consulting, Audit, CMS, Retainer, Custom)
3. Suggests products with prices
4. Applies discounts (max 25%)
5. Creates: Deal → Line Items → Quote → Invoice (optional)
6. Returns HubSpot links

**Context files** (in `.claude/context/deal-wizard/`):
| File | Purpose |
|------|---------|
| `product-catalog.json` | 18 products with HubSpot IDs and prices |
| `deal-templates.json` | 7 deal types + all pipeline/stage IDs |
| `quote-terms.json` | 8 quote terms templates by deal type |
| `sender-config.json` | George's owner ID (2740116), team, API token |

**Skill file**: `.claude/skills/deal-wizard.md`

**Key IDs:**
- George's Owner ID: 2740116
- Default Quote Template: 284147306418 (GBT - Quote 2024)
- Master Pipeline + Retainer: 666933831
- January Holding Stage: 978825825

See `CLAUDE.md` → "Deal Creation Wizard" section for full documentation.

## Planned: HubSpot Content Migration

A detailed migration plan exists for importing 50+ pages from HubSpot CMS to Sanity:
- **Plan File**: `~/.claude/plans/stateful-wobbling-wren.md`
- **Scope**: Landing pages, website pages, blog posts
- **Approach**: Direct import via HubSpot CMS API → NDJSON → Sanity CLI
- **Timeline**: ~5 weeks when ready to execute
- **Canvas**: Skipped for migration, available for new content

Key mapping: HubSpot modules → Sanity pageBuilder blocks (hero, callToAction, infoSection, etc.)

## Last Updated
2026-01-05 - Removed Google Calendar & Gmail integration (not functional in this environment)
