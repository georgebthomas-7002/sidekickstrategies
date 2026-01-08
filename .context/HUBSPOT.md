# HubSpot Configuration Context

## Multi-Project Folder Setup (Added January 8, 2026)

### Overview
HubSpot CLI is configured with per-project folder switching. When you CD into a project folder, the correct HubSpot portal is automatically used.

### How It Works
```
~/projects/sidekickstrategies/
├── .hsaccount                    → CLI uses portal 474711 (sidekick-strategies-2026)
├── .env.hubspot                  → Private App Token for API calls
└── sidekickstrategies/
    └── (project files)
```

### Two Types of Authentication

| Type | Purpose | Storage |
|------|---------|---------|
| **Personal Access Key** | HubSpot CLI (`hs` commands, project uploads) | `~/.hscli/config.yml` + `.hsaccount` override |
| **Private App Token** | CRM API calls (contacts, deals, companies) | `.env.hubspot` in project root |

### Current Configuration

**Sidekick Strategies Portal:**
- **Portal ID:** 474711
- **Account Name:** sidekick-strategies-2026
- **CLI Override:** `/home/georgebthomas/projects/sidekickstrategies/.hsaccount`
- **API Token:** `/home/georgebthomas/projects/sidekickstrategies/.env.hubspot`

### Key Files

| File | Location | Purpose |
|------|----------|---------|
| `~/.hscli/config.yml` | Home directory | All authenticated HubSpot accounts (global) |
| `.hsaccount` | Project root | CLI account override for this folder |
| `.env.hubspot` | Project root | Private App Token for API calls |

### .env.hubspot Format
```bash
HUBSPOT_PORTAL_ID=474711
HUBSPOT_PRIVATE_APP_TOKEN=pat-na1-xxxxx
```

### Adding Another Client/Project

```bash
# 1. Authenticate the new account
hs account auth
# Name it something unique (e.g., "client-name-2026")

# 2. Create project folder with override
mkdir -p ~/projects/client-name
cd ~/projects/client-name
hs account create-override
# Select the account you just authenticated

# 3. Create .env.hubspot with that client's Private App Token
cat > .env.hubspot << 'EOF'
HUBSPOT_PORTAL_ID=<their-portal-id>
HUBSPOT_PRIVATE_APP_TOKEN=<their-private-app-token>
EOF

# 4. Add to .gitignore
echo ".hsaccount" >> .gitignore
echo ".env.hubspot" >> .gitignore
```

### Useful CLI Commands

```bash
# List all authenticated accounts
hs accounts list

# See which account is active
hs doctor

# Set global default account
hs accounts use <account-name>

# Create per-folder override
hs account create-override

# Remove per-folder override
hs account remove-override
```

### Usage After Setup

| Task | Authentication Used | How |
|------|---------------------|-----|
| `hs project upload` | Personal Access Key | Automatic via `.hsaccount` |
| `hs project dev` | Personal Access Key | Automatic via `.hsaccount` |
| `hs secrets add` | Personal Access Key | Automatic via `.hsaccount` |
| CRM API calls | Private App Token | Load from `.env.hubspot` |
| Claude MCP HubSpot tools | Private App Token | Configured separately |

### Security Notes
- Both `.hsaccount` and `.env.hubspot` are in `.gitignore`
- Never commit these files to version control
- Personal Access Keys can be revoked at: https://app.hubspot.com/personal-access-key/{portal-id}
- Private App tokens can be revoked in HubSpot Settings → Integrations → Private Apps

---

## HubSpot Account Details

### Portal Information
- **Account ID:** 474711
- **Account Name:** sidekick-strategies-2026
- **Account Type:** Standard

### API Access Methods

#### 1. Personal Access Key (CLI)
- **Purpose:** HubSpot CLI commands, project uploads, development
- **Location:** `~/.hscli/config.yml`
- **Scopes:** developer, content, etc.
- **Refresh:** `hs account auth`

#### 2. Private App Token (API)
- **Purpose:** Direct CRM API access for read/write operations
- **Location:** `.env.hubspot` (project root)
- **Capabilities:** Full CRUD on CRM objects

#### 3. MCP OAuth (Read-Only)
- **Purpose:** Claude MCP server integration
- **Limitation:** Marketplace OAuth apps cannot have write scopes
- **Use for:** Reading contacts, companies, deals via MCP tools

### Common Deal Stages

| Pipeline | Stage | ID |
|----------|-------|-----|
| January Holding | January Holding | 978825825 |
| January Holding | January Sent | 1073811210 |
| January Holding | January Closed | 978825826 |
| Master Pipeline + Retainer | (various) | 666933831 |

### Association Type IDs

| Association | Type ID |
|-------------|---------|
| Deal → Contact | 3 |
| Deal → Company | 5 |
| Line Item → Deal | 20 |

### Key Owner IDs
- **George Thomas:** 2740116

### HubSpot Projects

| Project | Purpose | Path |
|---------|---------|------|
| CRM Tools | Serverless functions for CRM write operations | `/hubspot-crm-tools` |
| HubSpot MCP Auth | OAuth app for MCP server | `/hubspot-mcp-auth` |

---

## HubSpot CMS Development

For building HubSpot themes, modules, and templates, see:
- **Context:** `.context/HUBSPOT_CMS.md`
- **Skills:** `.claude/skills/hubspot-cms/`

### Quick Reference

```bash
# Theme development
hs create theme my-theme
hs watch ./my-theme @hubspot/my-theme

# Module development
hs create module my-module

# Template development
hs create template my-page
```

### Available Skills
| Skill | Purpose |
|-------|---------|
| `SKILL.md` | Main entry point, triggers |
| `theme-creation.md` | Theme structure, fields.json |
| `hubl-reference.md` | Complete HubL syntax reference |
| `module-creation.md` | Module structure, field types |
| `template-creation.md` | Template types, drag-and-drop |
