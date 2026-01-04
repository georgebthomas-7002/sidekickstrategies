# Known Issues & Applied Fixes

## Tailwind CSS 4 Issues

### Issue: `font-heading` utility not recognized
**Error**: `Cannot apply unknown utility class 'font-heading'`

**Cause**: Tailwind CSS 4 requires custom font families to be defined in `@theme` using CSS custom properties, not just in `tailwind.config.ts`.

**Fix Applied** (globals.css):
```css
@theme {
  --font-family-heading: var(--font-montserrat), sans-serif;
  --font-family-sans: var(--font-pt-sans), sans-serif;
  --font-family-serif: "Palatino Linotype", serif;
  --font-family-mono: var(--font-ibm-plex-mono), monospace;
}

/* Use CSS vars directly instead of @apply */
h3 {
  font-family: var(--font-family-heading);
  @apply font-semibold tracking-tight text-2xl;
}
```

**Files**: `frontend/app/globals.css`

---

## Sanity Typegen Issues

### Issue: Dynamic slices cause typegen to fail
**Error**: `slicing must use constant numbers`

**Cause**: Sanity typegen cannot evaluate dynamic GROQ expressions like `coalesce(^.limit, 3)`.

**Fix Applied** (queries.ts):
```groq
/* Before - fails typegen */
[0...coalesce(^.limit, 3)]
[0...$limit]

/* After - works */
[0...12]
[0...5]
```

**Impact**: The limit is now fixed at build time. If you need dynamic limits, handle it in the frontend by slicing the results.

**Files**: `frontend/sanity/lib/queries.ts`

---

## TypeScript Type Mismatches

### Issue: SanityImageCrop/Hotspot type incompatibility
**Error**: `Type 'SanityImageCrop' is not assignable to type 'CropData'`

**Cause**: Sanity types have optional number properties (`bottom?: number`), but `sanity-image` component expects required numbers (`bottom: number`).

**Fix Applied**:
```typescript
<Image
  crop={image.crop as any}
  hotspot={image.hotspot as any}
/>
```

**Files**:
- `app/components/Cta.tsx`
- `app/components/blocks/Hero.tsx`
- `app/posts/[slug]/page.tsx`
- `app/resources/[slug]/page.tsx`

---

### Issue: null vs undefined type mismatch
**Error**: `Type 'null' is not assignable to type 'undefined'`

**Cause**: Sanity returns `null` for missing values, but React components expect `undefined`.

**Fix Applied**:
```typescript
// For required props
fileUrl={download.file || ''}

// For optional props
fileType={download.fileType || undefined}
formHeading={download.formHeading || undefined}
```

**Files**: `app/resources/[slug]/page.tsx`

---

### Issue: Avatar person prop type mismatch
**Error**: `picture: ... | null` not assignable to `picture?: ... | undefined`

**Fix Applied**:
```typescript
<Avatar person={author as any} />
```

**Files**:
- `app/components/Posts.tsx`
- `app/posts/[slug]/page.tsx`

---

### Issue: Array null checks
**Error**: `'items' is possibly 'null'` or `'tags.length' is possibly 'undefined'`

**Fix Applied**:
```typescript
// Option 1: Safe variable
const safeItems = items || []

// Option 2: Explicit null checks
{podcast.tags && podcast.tags.length > 0 && (
  podcast.tags?.map(...)
)}
```

**Files**:
- `app/components/blocks/FAQAccordion.tsx`
- `app/podcasts/[slug]/page.tsx`
- `app/resources/[slug]/page.tsx`

---

## Vercel Deployment Issues

### Issue: 404 errors on deployed site
**Cause**: Root directory not set to `frontend` in monorepo.

**Fix**: In Vercel Project Settings → General:
- Set Root Directory to: `frontend`

### Issue: Build fails with missing types
**Cause**: Environment variables not configured in Vercel.

**Fix**: Add all required env vars in Vercel Project Settings → Environment Variables.

---

## Prettier Warning (Non-blocking)

### Issue: Typegen prettier formatting fails
**Warning**: `Cannot find package '@sanity/prettier-config'`

**Cause**: Root package.json references `@sanity/prettier-config` but it's not installed in frontend workspace.

**Impact**: None - types still generate, just not formatted.

**Status**: Low priority, doesn't affect functionality.

---

## Deprecation Warnings (Non-blocking)

### Sanity Typegen Config
**Warning**: `The separate typegen config has been deprecated`

**Status**: Works with current setup. Update to CLI config format when convenient.

### whatwg-encoding
**Warning**: `deprecated, use @exodus/bytes instead`

**Status**: Dependency of a sub-package. No action needed.

---

## Server Component Issues

### Issue: Event handlers in server components
**Error**: `Event handlers cannot be passed to Client Component props`

**Cause**: Using `onMouseEnter`, `onMouseLeave`, `onClick` in a component that's rendered as a server component.

**Fix Applied**: Replace JS event handlers with CSS-only hover states:
```typescript
// Before - breaks in server component
<a
  style={{color: 'rgba(255,255,255,0.7)'}}
  onMouseEnter={(e) => e.target.style.color = '#fff'}
  onMouseLeave={(e) => e.target.style.color = 'rgba(255,255,255,0.7)'}
>

// After - CSS only
<a className="text-white/70 hover:text-white transition-colors duration-200">
```

**Files**: `app/components/Footer.tsx`

---

## Sanity Schema Extraction Issues

### Issue: JSX in sanity.config.ts breaks schema extract
**Error**: `Expected ">" but found "src"`

**Cause**: esbuild can't parse JSX syntax in `.ts` files during `sanity schema extract`.

**Fix Applied**: Use `createElement()` instead of JSX:
```typescript
// Before - fails
const SidekickIcon = () => (
  <img src="/static/favicon.webp" alt="Sidekick" />
)

// After - works
import {createElement} from 'react'
const SidekickIcon = () =>
  createElement('img', {
    src: '/static/favicon.webp',
    alt: 'Sidekick',
    style: {width: '100%', height: '100%', objectFit: 'contain'},
  })
```

**Files**: `studio/sanity.config.ts`

---

### Issue: BlockRenderer type variance after typegen
**Error**: `Type ... is not comparable to type ... Property '_type' is incompatible`

**Cause**: After regenerating types, specific block types don't match the generic `BlockProps` type due to TypeScript's strict type checking.

**Fix Applied**: Use double cast through `unknown`:
```typescript
const Blocks = {
  callToAction: Cta,
  infoSection: Info,
  // ...
} as unknown as BlocksType  // not just 'as BlocksType'
```

**Files**: `app/components/BlockRenderer.tsx`

---

## Log of Fixes Applied

| Date | Commit | Issue | Fix |
|------|--------|-------|-----|
| 2026-01-03 | `b28012b` | font-heading not found | Use CSS vars in @theme |
| 2026-01-03 | `cb61932` | typegen slicing error | Constant slices [0...12] |
| 2026-01-03 | `c05c463` | TypeScript type errors | Cast as any, null checks |
| 2026-01-04 | `6d847e3` | JSX parsing in sanity.config.ts | Use createElement() instead of JSX |
| 2026-01-04 | `6d847e3` | BlockRenderer type variance | Cast as unknown as BlocksType |
| 2026-01-04 | `c6890dc` | Event handlers in server component | Use CSS-only hover states |

## Last Updated
2026-01-04
