# Claude Context System for Sidekick Strategies

## Quick Start
When starting a new session, read the context files in order:
1. `.context/PROJECT.md` - Project overview, tech stack, structure
2. `.context/BRAND.md` - Colors, fonts, design tokens
3. `.context/SANITY.md` - CMS schemas and configuration
4. `.context/FRONTEND.md` - Next.js components and routing
5. `.context/DEPLOYMENT.md` - Vercel, environment variables
6. `.context/KNOWN_ISSUES.md` - Gotchas and fixes applied

## Context Management Rules

### Rule 1: Monitor Context Usage
When auto-compact reaches **25% or lower**, immediately:
1. Suggest to the user: "Context is running low (X%). Should I save the current session context before continuing?"
2. If approved, update relevant `.context/*.md` files with new information
3. Create a session summary in `.context/sessions/YYYY-MM-DD.md`

### Rule 2: Update Context After Major Changes
After completing significant work, update the relevant context file:
- Schema changes → Update `.context/SANITY.md`
- Component changes → Update `.context/FRONTEND.md`
- Deployment fixes → Update `.context/DEPLOYMENT.md` and `.context/KNOWN_ISSUES.md`
- Brand/styling changes → Update `.context/BRAND.md`

### Rule 3: Session Handoff
Before ending a session or when context is low:
1. Summarize what was accomplished
2. Document any pending tasks
3. Note any issues encountered
4. Update the relevant context files

## File Structure
```
.context/
├── PROJECT.md          # Project overview and architecture
├── BRAND.md            # Design tokens, colors, fonts
├── SANITY.md           # CMS schemas and configuration
├── FRONTEND.md         # Next.js components and pages
├── DEPLOYMENT.md       # Vercel, env vars, hosting
├── KNOWN_ISSUES.md     # Bugs, gotchas, applied fixes
└── sessions/           # Session summaries (optional)
    └── YYYY-MM-DD.md
```

## Git Information
- Repository: https://github.com/georgebthomas-7002/sidekickstrategies
- Main branch: `main`
- Git user: George Thomas <george@georgebthomas.com>

## Key Commands
```bash
# Development
cd frontend && npm run dev      # Start Next.js (port 3000)
cd studio && npm run dev        # Start Sanity Studio (port 3333)

# From root (both)
npm run dev

# Type generation
cd frontend && npm run typegen

# Deploy Sanity Studio
cd studio && npx sanity deploy
```
