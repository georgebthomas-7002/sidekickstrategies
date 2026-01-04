# Sanity CMS Configuration

## Project Details
- **Project ID**: `n6sl2ooh`
- **Dataset**: `production`
- **API Version**: `2025-09-25`
- **Studio Version**: v5.1.0

## Document Schemas

### page.ts
Landing pages with page builder array.
```typescript
fields: [
  name,           // string, required
  slug,           // slug from name
  heading,        // string, required (canvasApp.purpose configured)
  subheading,     // string (canvasApp.purpose configured)
  pageBuilder[],  // array of 10 block types
]
```

### post.ts (Articles)
Blog articles with rich content.
```typescript
fields: [
  title,          // string, required (canvasApp.purpose configured)
  slug,           // slug from title
  content,        // blockContent (canvasApp.purpose configured)
  excerpt,        // text (canvasApp.purpose configured)
  coverImage,     // image with AI Assist
  date,           // datetime
  author,         // reference to person
]
```

### podcast.ts
Podcast episodes with Transistor.fm integration.
```typescript
groups: ['content', 'media', 'meta']
fields: [
  title,               // (canvasApp.purpose configured)
  slug,
  description,         // text (canvasApp.purpose configured)
  showNotes,           // blockContent (canvasApp.purpose configured)
  transistorUrl,       // url (embed URL)
  transistorEpisodeId, // string (canvasApp.exclude: true)
  coverImage,          // image with AI Assist
  duration,            // string "45:30"
  episodeNumber,       // number
  seasonNumber,        // number (optional)
  publishedAt,         // datetime
  guests[],            // references to person
  hosts[],             // references to person
  tags[],              // string array (canvasApp.purpose configured)
]
```

### download.ts
Downloadable resources (gated/ungated).
```typescript
groups: ['content', 'file', 'settings']
fields: [
  title,           // (canvasApp.purpose configured)
  slug,
  description,     // blockContent (canvasApp.purpose configured)
  excerpt,         // text (canvasApp.purpose configured)
  thumbnail,       // image with AI Assist
  file,            // file asset
  fileType,        // select: pdf, ebook, whitepaper, etc.
  category,        // select: ebook, whitepaper, template, etc.
  isGated,         // boolean - requires email?
  formHeading,     // string (shown if gated)
  formDescription, // text (shown if gated)
  publishedAt,     // datetime
  tags[],          // string array (canvasApp.purpose configured)
]
```

### person.ts
Team members, authors, podcast guests.
```typescript
fields: [
  firstName,  // string
  lastName,   // string
  picture,    // image with AI Assist
]
```

### settings.tsx (Singleton)
Global site settings.
```typescript
fields: [
  title,        // string
  description,  // blockContent
  ogImage,      // image with AI Assist
]
// Document ID: "siteSettings"
```

---

## Object Schemas

### seo.ts (Reusable SEO Object)
Added to all document types for social sharing/SEO control.
```typescript
fields: [
  metaTitle,       // string, max 60 chars (overrides page title)
  metaDescription, // text, max 160 chars
  ogImage,         // image 1200x630 with alt text
  noIndex,         // boolean (hide from search engines)
]
// Collapsible section at bottom of documents
```

**Usage**: All pages, posts, podcasts, and downloads now have an "SEO & Social Sharing" collapsible section. If fields are empty, frontend falls back to default content (title, excerpt, cover image).

---

## Page Builder Blocks

### hero.ts
```typescript
fields: [
  eyebrow, heading, subheading,
  primaryButton, secondaryButton,
  backgroundImage, foregroundImage,
  size: 'large' | 'medium' | 'small',
  alignment: 'left' | 'center' | 'right',
  theme: 'light' | 'dark',
]
```

### callToAction.ts
```typescript
fields: [
  eyebrow, heading, body (blockContentTextOnly),
  button, image,
  theme: 'light' | 'dark',
  contentAlignment: 'textFirst' | 'imageFirst',
]
```

### featuredArticles.ts
```typescript
fields: [
  heading, subheading,
  displayMode: 'latest' | 'selected',
  articles[] (if selected),
  limit (if latest, default 3),
  layout: 'grid-3' | 'grid-2' | 'list' | 'featured+grid',
  showViewAll, viewAllLink,
]
```

### featuredPodcasts.ts
```typescript
fields: [
  heading, subheading,
  displayMode: 'latest' | 'selected',
  episodes[] (if selected),
  limit (if latest, default 3),
  layout: 'grid-3' | 'grid-2' | 'list' | 'featured+list',
  showViewAll, viewAllLink,
]
```

### downloadsGrid.ts
```typescript
fields: [
  heading, subheading,
  displayMode: 'latest' | 'selected' | 'category',
  downloads[], category, limit,
  layout: 'grid-3' | 'grid-2' | 'list',
  showViewAll, viewAllLink,
]
```

### testimonial.ts
```typescript
fields: [
  quote, authorName, authorTitle,
  authorImage, companyLogo,
  rating: 1-5,
  theme: 'light' | 'dark' | 'accent',
]
```

### teamGrid.ts
```typescript
fields: [
  heading, subheading,
  displayMode: 'all' | 'selected',
  members[] (references to person),
  layout: 'grid-4' | 'grid-3' | 'grid-2' | 'list',
  showBio, showSocialLinks,
]
```

### contactForm.ts
```typescript
fields: [
  heading, subheading,
  formType: 'contact' | 'newsletter' | 'consultation' | 'custom',
  submitButtonText, successMessage,
  showContactInfo, contactEmail, contactPhone, contactAddress,
  customFields[] (for custom type),
  theme: 'light' | 'dark',
]
```

### faqAccordion.ts
```typescript
fields: [
  heading, subheading,
  items[]: { question, answer (blockContent) },
  layout: 'single' | 'two-column',
  expandFirst, allowMultiple,
  theme: 'light' | 'dark',
]
```

---

## Sanity Canvas Configuration
Content mapping enabled on fields with `options.canvasApp.purpose` to help AI understand field intent:
- page: heading, subheading
- post: title, content, excerpt
- podcast: title, description, showNotes, tags
- download: title, description, excerpt, tags

Technical fields excluded with `canvasApp.exclude: true`:
- podcast.transistorEpisodeId

---

## Plugins Configured
1. **presentationTool** - Visual editing with draft mode
2. **structureTool** - Content studio UI
3. **unsplashImageAsset** - Stock photo integration
4. **assist** - AI image descriptions
5. **visionTool** - GROQ query testing

---

## Key Files
- `studio/sanity.config.ts` - Main configuration
- `studio/src/schemaTypes/index.ts` - Schema exports
- `studio/schema.json` - Generated schema for typegen
- `studio/.env` - Preview URL config

## Commands
```bash
# Regenerate types after schema changes
cd frontend && npm run typegen

# Deploy Studio to Sanity hosting
cd studio && npx sanity deploy
```

## Last Updated
2026-01-04
