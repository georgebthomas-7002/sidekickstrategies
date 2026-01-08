# Claude Context System for Sidekick Strategies

## Quick Start
When starting a new session, read the context files in order:
1. `.context/PROJECT.md` - Project overview, tech stack, structure
2. `.context/BRAND.md` - Colors, fonts, design tokens
3. `.context/SANITY.md` - CMS schemas and configuration
4. `.context/FRONTEND.md` - Next.js components and routing
5. `.context/DEPLOYMENT.md` - Vercel, environment variables
6. `.context/HUBSPOT.md` - HubSpot CLI config, multi-project setup, API access
7. `.context/HUBSPOT_CMS.md` - HubSpot CMS themes, modules, HubL reference
8. `.context/KNOWN_ISSUES.md` - Gotchas and fixes applied

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
- HubSpot/API changes → Update `.context/HUBSPOT.md`
- HubSpot CMS/theme changes → Update `.context/HUBSPOT_CMS.md`

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
├── HUBSPOT.md          # HubSpot CLI, multi-project setup, API access
├── HUBSPOT_CMS.md      # HubSpot CMS themes, modules, HubL
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
Full HubSpot CRM control is set up with three methods:
1. **Official HubSpot MCP Server** - For reading CRM data (contacts, companies, deals)
2. **Direct API Access via Private App Token** - For write operations (RECOMMENDED)
3. **Custom Serverless Functions** - Alternative for write operations (deployed but not primary)

### HubSpot Account
- **Account ID:** 474711
- **Account Name:** sidekick-strategies-2026

### Multi-Project Folder Setup (Added January 8, 2026)

The project uses per-folder HubSpot configuration for multi-client support:

```
~/projects/sidekickstrategies/
├── .hsaccount                    → CLI uses portal 474711 automatically
├── .env.hubspot                  → Private App Token for API calls
└── sidekickstrategies/
    └── (project files)
```

**Two Authentication Types:**
| Type | Purpose | File |
|------|---------|------|
| Personal Access Key | CLI commands (`hs project upload`, etc.) | `.hsaccount` |
| Private App Token | CRM API calls (contacts, deals, etc.) | `.env.hubspot` |

**Adding Another Client:**
```bash
hs account auth                    # Authenticate new portal
cd /path/to/client-project
hs account create-override         # Creates .hsaccount
# Then create .env.hubspot with that client's token
```

**Full details:** See `.context/HUBSPOT.md`

### Direct API Access (Primary Write Method)
**IMPORTANT:** The MCP OAuth app is marketplace-distributed with user-level auth, which means it CANNOT have write scopes (HubSpot platform restriction). Use the Private App token for all write operations.

**Private App Token:** Stored in `.env.local` as `HUBSPOT_ACCESS_TOKEN`

**Capabilities with Direct API:**
| Operation | Endpoint | Method |
|-----------|----------|--------|
| Create Deal | `/crm/v3/objects/deals` | POST |
| Create Contact | `/crm/v3/objects/contacts` | POST |
| Create Company | `/crm/v3/objects/companies` | POST |
| Search Products | `/crm/v3/objects/products/search` | POST |
| Create Line Item | `/crm/v3/objects/line_items` | POST |
| Update Any Object | `/crm/v3/objects/{objectType}/{objectId}` | PATCH |

**Example: Create a Deal with Line Item**
```bash
# 1. Create the deal
curl -X POST 'https://api.hubapi.com/crm/v3/objects/deals' \
  -H 'Authorization: Bearer $HUBSPOT_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "dealname": "Deal Name",
      "amount": "5000",
      "dealstage": "978825825",
      "closedate": "2026-01-05"
    },
    "associations": [
      {
        "to": {"id": "CONTACT_ID"},
        "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 3}]
      }
    ]
  }'

# 2. Search for a product
curl -X POST 'https://api.hubapi.com/crm/v3/objects/products/search' \
  -H 'Authorization: Bearer $HUBSPOT_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{"query": "product name", "properties": ["name", "price", "hs_sku"]}'

# 3. Add line item with discount
curl -X POST 'https://api.hubapi.com/crm/v3/objects/line_items' \
  -H 'Authorization: Bearer $HUBSPOT_ACCESS_TOKEN' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "hs_product_id": "PRODUCT_ID",
      "quantity": "1",
      "price": "5500",
      "discount": "500"
    },
    "associations": [
      {
        "to": {"id": "DEAL_ID"},
        "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 20}]
      }
    ]
  }'
```

**Common Deal Stages (January Holding pipeline):**
| Stage | Value |
|-------|-------|
| January Holding | 978825825 |
| January Sent | 1073811210 |
| January Closed | 978825826 |

**Association Type IDs:**
| Association | Type ID |
|-------------|---------|
| Deal → Contact | 3 |
| Deal → Company | 5 |
| Line Item → Deal | 20 |

### MCP Server Configuration (Read-Only)
The `hubspot-crm` MCP server is configured in `~/.claude.json` with:
- URL: `https://mcp.hubspot.com/`
- OAuth Client ID: `87ec5e6f-9ad1-40fe-8f39-9fcb387e0f5c`
- Token expires every 30 minutes - may need refresh
- **Limitation:** Marketplace OAuth apps cannot have write scopes

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
Personal Access Key is stored in `~/.hscli/config.yml` with per-project override via `.hsaccount`
- Must include `developer` scope for project uploads
- Refresh via: `hs account auth`
- Per-folder override: `hs account create-override` (creates `.hsaccount`)
- Current project auto-uses portal **474711** when in `/home/georgebthomas/projects/sidekickstrategies/`

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

## HubSpot CMS Development (Added January 2026)

### Overview
Build professional HubSpot CMS themes, modules, and templates for client websites.

### Skills Location
All HubSpot CMS skills are in `.claude/skills/hubspot-cms/`:

| Skill | File | Purpose |
|-------|------|---------|
| Main Entry | `SKILL.md` | Overview, triggers, quick reference |
| Theme Creation | `theme-creation.md` | Theme structure, theme.json, fields.json |
| HubL Reference | `hubl-reference.md` | Complete syntax, functions, filters, tags |
| Module Creation | `module-creation.md` | Module structure, all field types |
| Template Creation | `template-creation.md` | Template types, drag-and-drop areas |

### Triggers
- `/hubspot-theme` - Create a new HubSpot theme
- `/hubspot-module` - Create a new module
- `/hubspot-template` - Create a new template
- Natural language: "create hubspot theme", "build a module for [purpose]"

### Quick CLI Commands
```bash
# Theme development
hs create theme my-theme          # Create new theme
hs watch ./my-theme @hubspot/my-theme   # Watch and upload

# Module development
hs create module my-module        # Create new module

# Template development
hs create template my-page        # Create new template
```

### Context File
Full reference: `.context/HUBSPOT_CMS.md`

## Deal Creation Wizard (Added January 2026)

### Overview
A conversational workflow for creating complete HubSpot deals with line items, quotes, and invoices.

### How to Use
Say any of these to start:
- `/create-deal` - Explicit skill invocation
- "create deal for [contact name]" - Natural language
- "deal for [contact name]" - Short form

### What It Does
1. **Looks up contact** via MCP search
2. **Finds associated company** automatically
3. **Asks deal type** (Implementation, Training, Consulting, Audit, CMS, Retainer, Custom)
4. **Suggests products** based on deal type with prices
5. **Applies discounts** if requested (max 25%)
6. **Creates all objects** sequentially:
   - Deal with contact/company associations
   - Line items for each product
   - Quote with proper terms and sender (George)
   - Invoice (optional)
7. **Provides links** to created objects

### Context Files
Located in `.claude/context/deal-wizard/`:
| File | Purpose |
|------|---------|
| `product-catalog.json` | All products with HubSpot IDs and prices |
| `deal-templates.json` | Deal types, pipelines, stages |
| `quote-terms.json` | Quote terms templates by deal type |
| `sender-config.json` | George's owner ID, API token, team info |

### Skill File
Located at `.claude/skills/deal-wizard.md` - Contains full workflow logic and API patterns.

### Key IDs
- **George's Owner ID**: 2740116
- **Default Quote Template**: 284147306418 (GBT - Quote 2024)
- **January Holding Stage**: 978825825
- **Master Pipeline + Retainer**: 666933831

### Example Workflow
```
User: "create deal for Shaun Jones"

Claude: I found Shaun Jones (jones@jonesfwm.com) at Jones Financial.
        What type of deal? (1-7)

User: "1" (Implementation Hours)

Claude: For Implementation Hours, I recommend:
        1. 10 Hours | Implementation & Strategy - $3,000
        2. 20 Hours | Implementation & Strategy - $5,000
        3. 30 Hours | Implementation & Strategy - $7,500
        Which products? (enter numbers)

User: "2"

Claude: Subtotal: $5,000. Apply discount?

User: "$500 off"

Claude: [Shows summary]
        Create deal? Also create quote? Also create invoice?

User: "yes, yes, no"

Claude: [Creates Deal → Line Items → Quote]
        Done! Deal: https://app.hubspot.com/...
        Quote: https://app.hubspot.com/...
```

### Updating Products
To add new products:
1. Add product in HubSpot first
2. Get the product ID from HubSpot
3. Add entry to `.claude/context/deal-wizard/product-catalog.json`

### Updating Quote Terms
To modify quote terms for a deal type:
1. Edit `.claude/context/deal-wizard/quote-terms.json`
2. Find the template by ID (e.g., "implementation_hours")
3. Modify "comments" or "terms" arrays

## Client Portal (Added January 2026)

### Overview
A client-facing portal where clients can log in, request help (creates ClickUp tasks), view project status, see billing, and schedule meetings.

**Full Plan:** `/.claude/context/client-portal-project.md`

### Implementation Status (Updated January 4, 2026)

| Feature | Status | Notes |
|---------|--------|-------|
| Magic Link Auth | ✅ Complete | Resend integration, 15-min tokens |
| Login/Verify Pages | ✅ Complete | Full flow working |
| Dashboard | ✅ Complete | Welcome message, quick actions |
| Ask for Help | ✅ Complete | Creates ClickUp tasks |
| Projects View | ✅ Complete | Lists tasks from ClickUp |
| Billing Page | ✅ Complete | Shows HubSpot deals |
| Meetings Page | ⏳ Placeholder | Contact link only |
| Sanity Schemas | ✅ Complete | portalSession, portalClient |

### Architecture
- **Authentication:** Magic links via Resend (no passwords)
- **Client Mapping:** HubSpot Company → ClickUp Folder via custom properties
- **Content:** Sanity for portal content and session tokens
- **Tasks:** ClickUp for project delivery

### Key Files
```
frontend/app/
├── portal/
│   ├── layout.tsx              # Portal shell with auth check
│   ├── login/page.tsx          # Magic link request
│   ├── verify/page.tsx         # Token verification
│   ├── dashboard/page.tsx      # Welcome + summary
│   ├── help/page.tsx           # Ask for Help form
│   ├── projects/page.tsx       # ClickUp task list
│   ├── billing/
│   │   ├── page.tsx            # Billing overview
│   │   └── BillingContent.tsx  # Client component for deals
│   └── meetings/page.tsx       # Meeting scheduler (placeholder)
├── api/portal/
│   ├── auth/
│   │   ├── request-magic-link/route.ts
│   │   ├── verify/route.ts
│   │   └── logout/route.ts
│   ├── tasks/route.ts          # GET/POST ClickUp tasks
│   └── deals/route.ts          # GET HubSpot deals
└── lib/portal/auth.ts          # Auth utilities

studio/src/schemaTypes/documents/
├── portalSession.ts            # Magic link tokens
└── portalClient.ts             # Client profiles
```

### Key IDs and Mappings

**HubSpot Custom Properties:**
| Object | Property | Purpose |
|--------|----------|---------|
| Contact | `portal_enabled` | Gates portal access |
| Contact | `portal_last_login` | Analytics |
| Company | `clickup_folder_id` | Maps to ClickUp folder |
| Company | `clickup_list_id` | Default task list |
| Company | `portal_enabled` | Company-level gate |
| Company | `portal_tier` | standard/premium/enterprise |

**Sanity Schemas:**
| Schema | Purpose |
|--------|---------|
| `portalClient` | Client profiles, branding, enabled features |
| `portalSession` | Magic link tokens (15min expiry, single-use) |

**Pilot Client - Jones FWM:**
| System | ID |
|--------|-----|
| HubSpot Company | `47522798621` |
| HubSpot Contact (Shaun) | `186064128913` |
| ClickUp Folder | `90117447414` |
| ClickUp List | `901112804768` |
| Sanity portalClient | `6694a5d5-e094-4466-b637-12612c57ef1f` |

### Portal Routes
```
/portal/login     - Magic link request ✅
/portal/verify    - Token verification ✅
/portal/dashboard - Welcome + summary ✅
/portal/help      - "Ask for Help" form ✅
/portal/projects  - Task list from ClickUp ✅
/portal/billing   - HubSpot deals view ✅
/portal/meetings  - Meeting scheduler (placeholder)
```

### Environment Variables Needed
```
PORTAL_JWT_SECRET=<32-byte-secret>
RESEND_API_KEY=re_xxxx
CLICKUP_API_TOKEN=pk_xxxx
HUBSPOT_ACCESS_TOKEN=pat-na1-xxxx
```

### Client Onboarding Checklist
1. Set `clickup_folder_id` on HubSpot Company
2. Set `clickup_list_id` on HubSpot Company
3. Set `portal_enabled = true` on Company
4. Set `portal_enabled = true` on Contact(s)
5. (Optional) Create portalClient in Sanity for branding
