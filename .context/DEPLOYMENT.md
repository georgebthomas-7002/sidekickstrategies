# Deployment Configuration

## Vercel (Frontend)

### Project URLs
- **Production**: https://sidekickstrategies.vercel.app
- **Preview**: https://sidekickstrategies-git-main-sidekick-strategies.vercel.app

### Project Settings
| Setting | Value |
|---------|-------|
| Framework | Next.js (auto-detected) |
| Root Directory | `frontend` |
| Build Command | `npm run build` |
| Output Directory | `.next` |

### Environment Variables (Required)
| Variable | Value | Scope |
|----------|-------|-------|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | `n6sl2ooh` | All |
| `NEXT_PUBLIC_SANITY_DATASET` | `production` | All |
| `NEXT_PUBLIC_SANITY_API_VERSION` | `2025-09-25` | All |
| `SANITY_API_READ_TOKEN` | `[secret - see .env.local]` | All |

### Build Process
```
1. npm install (in /frontend)
2. npm run prebuild → npm run typegen (generates sanity.types.ts)
3. npm run build → next build
```

### Common Build Failures
1. **Missing Root Directory** - Must be set to `frontend`
2. **Missing Env Vars** - All 4 required for Sanity queries
3. **TypeScript Errors** - Fix locally with `npx tsc --noEmit`
4. **Typegen Errors** - GROQ slices must use constants, not variables

---

## Sanity Studio

### Hosted Studio
- **URL**: https://sidekick-strategies.sanity.studio/
- **App ID**: `t72zifau2hu3kkz1vl3vvfjn`

Deploy updates to Sanity hosting:
```bash
cd studio
npx sanity deploy
```

### Local Development
```bash
cd studio
npm run dev  # http://localhost:3333
```

### Environment Variables (studio/.env)
```
SANITY_STUDIO_PROJECT_ID="n6sl2ooh"
SANITY_STUDIO_DATASET="production"
SANITY_STUDIO_PREVIEW_URL="https://sidekickstrategies.vercel.app"
```

---

## GitHub Integration

### Repository
- URL: https://github.com/georgebthomas-7002/sidekickstrategies
- Branch: `main`
- Auto-deploy: Enabled (pushes trigger Vercel builds)

### Git Configuration
```bash
git config user.name "George Thomas"
git config user.email "george@georgebthomas.com"
```

---

## Local Development

### Start Both Services
```bash
# From project root
npm run dev

# Or separately:
cd frontend && npm run dev  # http://localhost:3000
cd studio && npm run dev    # http://localhost:3333
```

### Frontend Environment (frontend/.env.local)
```
NEXT_PUBLIC_SANITY_PROJECT_ID="n6sl2ooh"
NEXT_PUBLIC_SANITY_DATASET="production"
NEXT_PUBLIC_SANITY_API_VERSION="2025-09-25"
SANITY_API_READ_TOKEN="[token]"
```

---

## Deployment Checklist

### Before Pushing
- [ ] Run `npx tsc --noEmit` - No TypeScript errors
- [ ] Run `npm run typegen` - Types generate successfully
- [ ] Test locally with `npm run dev`

### Vercel Setup (First Time)
- [ ] Set Root Directory to `frontend`
- [ ] Add all 4 environment variables
- [ ] Trigger initial deploy

### After Schema Changes
1. Update schema in `/studio/src/schemaTypes/`
2. Run `cd frontend && npm run typegen`
3. Fix any TypeScript errors
4. Commit and push
5. Deploy studio: `cd studio && npx sanity deploy`

---

## Troubleshooting

### 404 on Vercel
1. Check Root Directory is `frontend`
2. Check all env vars are set
3. Check build logs for errors

### Typegen Fails
- Use constant slices in GROQ: `[0...12]` not `[0...$limit]`
- Check `studio/schema.json` exists

### Draft Mode Not Working
- Check `SANITY_API_READ_TOKEN` is set
- Check studio preview URL matches deployment

## Last Updated
2026-01-03
