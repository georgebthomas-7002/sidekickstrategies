# HubSpot CMS Development Context

## Overview

HubSpot CMS is a platform for building marketing websites with drag-and-drop editing, personalization, and integrated CRM functionality.

## Skills Reference

| Skill | Path | Purpose |
|-------|------|---------|
| Main Entry | `.claude/skills/hubspot-cms/SKILL.md` | Overview, triggers, quick reference |
| Theme Creation | `.claude/skills/hubspot-cms/theme-creation.md` | Theme structure, theme.json, fields.json |
| HubL Reference | `.claude/skills/hubspot-cms/hubl-reference.md` | Complete HubL syntax, functions, filters |
| Module Creation | `.claude/skills/hubspot-cms/module-creation.md` | Module structure, all field types |
| Template Creation | `.claude/skills/hubspot-cms/template-creation.md` | Template types, drag-and-drop areas |

## Quick Reference

### CLI Commands

```bash
# Authentication
hs account auth                    # Authenticate CLI
hs account create-override         # Create per-folder override

# Theme Development
hs create theme <name>             # Create new theme
hs upload <src> <dest>             # Upload to HubSpot
hs watch <src> <dest>              # Watch and auto-upload
hs fetch <src> <dest>              # Download from HubSpot

# Module Development
hs create module <name>            # Create new module

# Template Development
hs create template <name>          # Create new template
hs create template <name> --type=page
hs create template <name> --type=blog-listing
hs create template <name> --type=blog-post
hs create template <name> --type=partial
```

### Theme Structure

```
my-theme/
├── theme.json              # Theme configuration
├── fields.json             # Theme settings (customizable)
├── css/
│   └── main.css            # Main stylesheet
├── js/
│   └── main.js             # Main JavaScript
├── images/
├── modules/
│   └── my-module.module/
│       ├── module.html     # HubL template
│       ├── module.css      # Styles
│       ├── module.js       # JavaScript
│       ├── fields.json     # Field definitions
│       └── meta.json       # Metadata
└── templates/
    ├── layouts/
    │   └── base.html
    └── pages/
        └── home.html
```

### Common HubL Patterns

```jinja
{# Variables #}
{{ content.name }}
{{ module.field_name }}
{{ theme.colors.primary.color }}

{# Conditionals #}
{% if condition %}...{% endif %}

{# Loops #}
{% for item in items %}...{% endfor %}

{# Include partial #}
{% include "partials/header.html" %}

{# Render module #}
{% module "name" path="@hubspot/rich_text" %}

{# Drag-and-drop area #}
{% dnd_area "main" %}
  {% dnd_section %}
    {% dnd_row %}
      {% dnd_column %}
        {% dnd_module path="@hubspot/rich_text" %}{% end_dnd_module %}
      {% end_dnd_column %}
    {% end_dnd_row %}
  {% end_dnd_section %}
{% end_dnd_area %}
```

### Common Field Types

| Type | Purpose |
|------|---------|
| `text` | Single line text |
| `textarea` | Multi-line text |
| `richtext` | WYSIWYG editor |
| `image` | Image with alt text |
| `link` | URL with options |
| `choice` | Dropdown/radio/checkbox |
| `boolean` | Toggle switch |
| `color` | Color picker |
| `font` | Font selector |
| `number` | Numeric input |
| `group` | Group of fields |
| `group` + `occurrence` | Repeater field |

### Template Annotations

```jinja
<!--
  templateType: page
  label: Page Name
  isAvailableForNewContent: true
  screenshotPath: ../images/preview.png
-->
```

**Template Types:** page, blog_listing, blog_post, email, error_page, search_results, password_prompt

## HubSpot Account

- **Portal ID:** 474711
- **Account Name:** sidekick-strategies-2026
- **CLI Config:** Uses `.hsaccount` in project root

## Common Tasks

### Creating a New Theme

1. `hs create theme client-name`
2. Configure `theme.json` with theme metadata
3. Define customizable settings in `fields.json`
4. Build modules in `modules/` directory
5. Create templates in `templates/` directory
6. `hs watch ./client-name @hubspot/client-name`

### Creating a New Module

1. Create directory: `modules/my-module.module/`
2. Create `meta.json` with module metadata
3. Define fields in `fields.json`
4. Build template in `module.html`
5. Add styles in `module.css`
6. Add interactivity in `module.js`

### Creating a New Template

1. Create file in appropriate directory (pages/, blog/, etc.)
2. Add template annotations at top
3. Extend base layout: `{% extends "layouts/base.html" %}`
4. Add drag-and-drop areas for flexible content
5. Include partials for reusable elements

## Best Practices

1. **Always provide defaults** for all fields
2. **Use semantic HTML** for accessibility
3. **Include alt text** for all images
4. **Test in page editor** before deployment
5. **Use partials** for reusable elements
6. **Leverage drag-and-drop** for editor flexibility
7. **Follow HubSpot naming conventions** for compatibility

## Sidekick Theme (Custom Theme - In Development)

**Location:** `hubspot-cms/sidekick-theme/`

### Current Status (January 2026)
All 5 phases complete. Full custom theme incorporating best features from Clean Pro, Elements, Focus, and Sprocket Rocket themes.

### Theme Structure
```
sidekick-theme/
├── theme.json              # Theme metadata, 5 responsive breakpoints
├── fields.json             # 80+ theme settings
├── css/
│   ├── main.css            # Full CSS architecture
│   ├── blog.css            # Blog listing & post styles
│   ├── system.css          # Error pages, search, password, subscription
│   └── landing.css         # Landing page styles
├── js/main.js              # Core JS functionality
├── modules/
│   ├── core/               # Header, Footer, Hero (complete)
│   ├── content/            # Rich text, Image+Text, CTA, Accordion (complete)
│   ├── media/              # Image Gallery, Video Player, Logo Carousel (complete)
│   ├── social/             # Testimonial Card, Testimonial Grid (complete)
│   ├── data/               # Number Counter, Pricing Table, Feature Comparison (complete)
│   ├── forms/              # Contact, newsletter (planned for future)
│   └── blog/               # Post Card, Recent Posts, Sidebar, Author Bio (complete)
└── templates/
    ├── layouts/base.html   # Base layout (complete)
    ├── pages/home.html     # Home page template (complete)
    ├── blog/               # Blog listing & post templates (complete)
    ├── landing/            # Form, Video, eBook landing pages (complete)
    ├── partials/           # Header, footer partials (complete)
    └── system/             # 404, 500, search, password, subscription (complete)
```

### Theme Settings (fields.json)
| Group | Settings |
|-------|----------|
| Colors | Primary (Navy #142d63), Secondary (Teal #028393), Accent (Orange #f65625), Peach, Light Blue, Slate, backgrounds |
| Typography | Heading (Palatino), Subheading (Montserrat), Body (PT Sans), Mono (IBM Plex Mono) |
| Header | Logo, sticky header, mega menu, search, CTA button |
| Footer | Logo, columns (1-4), newsletter, social links, copyright |
| Blog | Posts per page, sidebar position, TOC, reading time |
| Buttons | Border radius, primary/secondary colors |
| Spacing | Section padding, container max width |
| Animation | Enable/disable, transition duration, scroll animations |

### Completed Modules
| Module | Features |
|--------|----------|
| `header.module` | Mega menu, sticky header, mobile nav, search overlay, CTA button |
| `footer.module` | Multi-column layout, newsletter signup, social links, bottom links |
| `hero.module` | 3 styles: standard (centered), split (image+text), kinetic (tech animated bg) |
| `rich-text.module` | WYSIWYG content, max width, alignment, background, padding options |
| `image-text.module` | 2-column layout, image left/right, badges, buttons, animation |
| `cta.module` | Banner/card/inline styles, gradient backgrounds, patterns, buttons |
| `accordion.module` | FAQ/collapsible sections, multiple layouts, icon styles, animation |
| `testimonial-card.module` | Single testimonial, star ratings, author info, company logos |
| `testimonial-grid.module` | Multiple testimonials grid, 2-4 columns, card/bordered/minimal styles |
| `number-counter.module` | Animated statistics, prefix/suffix, icons, multiple layouts |
| `pricing-table.module` | Pricing plans, featured badges, feature lists, responsive grid |
| `feature-comparison.module` | Plan comparison table, feature groups, checkmarks/text values |
| `post-card.module` | Blog post card: vertical/horizontal/overlay layouts, hover effects |
| `recent-posts.module` | Recent posts grid/list, configurable columns, excludes current post |
| `blog-sidebar.module` | Widget-based: search, categories, recent posts, newsletter, CTA, custom HTML |
| `author-bio.module` | Auto-detect or manual author, social links, horizontal/vertical/compact layouts |
| `logo-carousel.module` | Client logos: continuous scroll, slide, or static grid; grayscale on hover |
| `image-gallery.module` | Grid/masonry/carousel layouts, lightbox with keyboard nav, hover effects |
| `video-player.module` | YouTube, Vimeo, HubSpot Video, MP4; custom play button overlay, aspect ratios |

### Completed Templates
| Template | Features |
|----------|----------|
| `layouts/base.html` | Base layout with head, body, scripts |
| `pages/home.html` | Home page with drag-and-drop areas |
| `blog/blog-listing.html` | Post grid, topic filter, pagination, sidebar |
| `blog/blog-post.html` | Full post, author bio, TOC sidebar, share links, related posts |
| `system/404.html` | Custom 404 error page with search, suggestions |
| `system/500.html` | Custom 500 error page with retry action |
| `system/search-results.html` | Search results with pagination, type badges |
| `system/password-prompt.html` | Password protection page with toggle visibility |
| `system/subscription-preferences.html` | Email subscription management |
| `landing/landing-form.html` | Lead generation landing page with form |
| `landing/landing-video.html` | Video/webinar landing page |
| `landing/landing-ebook.html` | eBook/download landing page with preview |

### Development Commands
```bash
# Upload theme to HubSpot
cd hubspot-cms
hs upload ./sidekick-theme @hubspot/sidekick-theme

# Watch for changes
hs watch ./sidekick-theme @hubspot/sidekick-theme
```

### Implementation Plan
- **Phase 1:** Foundation (theme structure, CSS, header/footer) - COMPLETE
- **Phase 2:** Core Modules (hero, rich text, CTA, image+text, home template) - COMPLETE
- **Phase 3:** Content Modules (accordion, testimonials, pricing, counters, comparison) - COMPLETE
- **Phase 4:** Blog & Advanced (blog templates, gallery, video, carousel) - COMPLETE
- **Phase 5:** Polish (system pages, landing pages) - COMPLETE

### Theme Statistics
- **19 Custom Modules** across 6 categories
- **12 Page Templates** (pages, blog, system, landing)
- **4 CSS Files** (main, blog, system, landing)
- **80+ Theme Settings** for customization

### Research Reference
Full theme comparison research saved at: `.claude/plans/quirky-marinating-melody.md`
- Clean Pro, Focus/Focus Plus, Elements, Sprocket Rocket analysis
- Feature comparison matrix
- Best features to incorporate

## Related Context

- HubSpot API/CLI: `.context/HUBSPOT.md`
- Deal Creation: `.claude/skills/deal-wizard.md`
- HubSpot Helper: `.claude/skills/hubspot-helper/SKILL.md`
