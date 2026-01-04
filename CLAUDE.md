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

## HubSpot Integration (Added January 2026)

### Overview
Full HubSpot CRM control is set up with two components:
1. **Official HubSpot MCP Server** - For reading CRM data (contacts, companies, deals)
2. **Custom Serverless Functions** - For writing/creating CRM data

### HubSpot Account
- **Account ID:** 474711
- **Account Name:** sidekick-strategies-2026

### MCP Server Configuration
The `hubspot-crm` MCP server is configured in `~/.claude.json` with:
- URL: `https://mcp.hubspot.com/`
- OAuth Client ID: `87ec5e6f-9ad1-40fe-8f39-9fcb387e0f5c`
- Token expires every 30 minutes - may need refresh

**To refresh the token:**
1. Run the OAuth server: `cd hubspot-mcp-auth && HUBSPOT_CLIENT_SECRET=a8e74ed0-e9df-4f79-8911-ee5fd8501dc1 node oauth-server.js`
2. Visit the install URL in browser
3. Update the token in Claude MCP config

### HubSpot Projects

#### 1. CRM Tools (`/hubspot-crm-tools`)
Serverless functions for CRM write operations:

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/create-contact` | POST | Create contacts with email, name, phone, etc. |
| `/api/create-company` | POST | Create companies with name, domain, industry |
| `/api/create-deal` | POST | Create deals with pipeline, stage, associations |
| `/api/create-task` | POST | Create tasks with subject, due date, associations |
| `/api/update-crm-object` | POST/PATCH | Update any CRM object by type and ID |

**Secret Required:** `HUBSPOT_ACCESS_TOKEN` (Private App token)
- Token stored in HubSpot project secrets (use `hs secrets list` to verify)

**View Project:** https://app.hubspot.com/developer-projects/474711/project/CRM%20Tools

#### 2. HubSpot MCP Auth (`/hubspot-mcp-auth`)
OAuth app for authenticating with the official HubSpot MCP server.
- Distribution: Marketplace (user-level OAuth)
- Scopes: contacts.read, companies.read, deals.read

**View Project:** https://app.hubspot.com/developer-projects/474711/project/HubSpot%20MCP%20Auth

### HubSpot CLI Authentication
Personal Access Key is stored in `~/.hscli/config.yml`
- Must include `developer` scope for project uploads
- Refresh via: `hs account auth`

### Key Files
```
hubspot-crm-tools/
├── hsproject.json                    # Project config
├── src/app/
│   ├── app-hsmeta.json              # App config with scopes
│   └── functions/
│       ├── createContact.js         # Create contact function
│       ├── createCompany.js         # Create company function
│       ├── createDeal.js            # Create deal function
│       ├── createTask.js            # Create task function
│       └── updateCrmObject.js       # Update any CRM object

hubspot-mcp-auth/
├── hsproject.json                    # Project config
├── oauth-server.js                   # Local OAuth token exchange server
└── src/app/
    └── app-hsmeta.json              # OAuth app config (isUserLevel: true)
```

### Common HubSpot Commands
```bash
# Upload project changes
cd hubspot-crm-tools && hs project upload

# Deploy specific build
hs project deploy --build-number 2

# Add/update secrets
hs secrets add HUBSPOT_ACCESS_TOKEN "pat-na1-xxx"

# View project in browser
hs project open

# List builds
hs project list-builds
```
