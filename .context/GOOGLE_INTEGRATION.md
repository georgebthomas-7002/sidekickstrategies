# Google Calendar & Gmail Integration

## Overview
Google Calendar and Gmail access via MCP server, enabling calendar management and email operations directly from Claude Code.

## Status
**Setup Required** - Follow the walkthrough below to complete setup.

## Chosen Solution: taylorwilsdon/google_workspace_mcp

**Why this one:**
- Most feature-complete (Gmail + Calendar + Drive + Docs)
- One-click installation option
- Active maintenance
- Full read/write capabilities
- OAuth 2.0 with auto-refresh

### Capabilities

| Service | Read | Write | Features |
|---------|------|-------|----------|
| Gmail | Yes | Yes | Search, send, draft, labels, attachments |
| Calendar | Yes | Yes | View, create, modify, delete, multi-calendar |
| Drive | Yes | Yes | List, upload, download, share (available if needed) |

## What You Can Do

### Calendar
- "What's on my calendar tomorrow?"
- "Schedule a discovery call with [contact] for Tuesday at 2pm"
- "Block 2 hours for deep work every morning"
- "Find a free slot this week for a meeting"

### Gmail
- "Check for unread emails from [client]"
- "Draft a follow-up email to [contact]"
- "Search for emails about [project]"
- "Send the quote I just created to [email]"

### Combined with HubSpot Deal Wizard
- After creating a deal → Draft the proposal email
- After creating a quote → Schedule the follow-up call
- Before a meeting → Pull up related HubSpot contact info

## Setup Walkthrough

### Part 1: Google Cloud Console (~5 min)

#### Step 1: Create Google Cloud Project
1. Go to https://console.cloud.google.com
2. Sign in with your Google account
3. Click the project dropdown at top → "New Project"
4. Name: `Claude Code Integration`
5. Click "Create"

#### Step 2: Enable Gmail API
1. Go to: https://console.cloud.google.com/apis/library/gmail.googleapis.com
2. Make sure your project is selected at the top
3. Click "Enable"

#### Step 3: Enable Google Calendar API
1. Go to: https://console.cloud.google.com/apis/library/calendar-json.googleapis.com
2. Make sure your project is selected
3. Click "Enable"

#### Step 4: Configure OAuth Consent Screen
1. Go to: https://console.cloud.google.com/apis/credentials/consent
2. Select "External" user type → Create
3. Fill in:
   - App name: `Claude Code Integration`
   - User support email: Your email
   - Developer contact: Your email
4. Click "Save and Continue"
5. On Scopes page: Click "Save and Continue" (skip for now)
6. On Test Users page: Add your email address
7. Click "Save and Continue"

#### Step 5: Create OAuth Credentials
1. Go to: https://console.cloud.google.com/apis/credentials
2. Click "+ Create Credentials" → "OAuth client ID"
3. Application type: **Desktop app**
4. Name: `Claude Code`
5. Click "Create"
6. Click "Download JSON" - save this file!
7. Rename the downloaded file to `credentials.json`
8. Move it to: `~/.config/google-workspace-mcp/credentials.json`

### Part 2: Install MCP Server (~2 min)

```bash
# Install uv if not already installed
curl -LsSf https://astral.sh/uv/install.sh | sh

# Test the MCP server runs
uvx workspace-mcp --tool-tier core
```

### Part 3: Configure Claude Code

Add to your `.mcp.json`:
```json
{
  "mcpServers": {
    "google": {
      "type": "stdio",
      "command": "uvx",
      "args": ["workspace-mcp", "--tool-tier", "core"]
    }
  }
}
```

### Part 4: Authenticate
1. Restart Claude Code (or start new session)
2. Try: "What's on my calendar today?"
3. Browser opens for Google login
4. Grant permissions
5. Done! Tokens auto-refresh.

### Part 5: Test Commands
- "What's on my calendar this week?"
- "Check my recent emails"
- "Draft an email to test@example.com saying hello"
- "Create a test calendar event for tomorrow at 3pm"

## Configuration Reference

### MCP Config Location
- Project: `/home/georgebthomas/projects/sidekickstrategies/sidekickstrategies/.mcp.json`
- User-level: `~/.claude.json`

### Google Credentials Location
`~/.config/google-workspace-mcp/credentials.json`

### Tool Tiers
The MCP server has three tiers:
- `core` - Gmail + Calendar (recommended to start)
- `extended` - Adds Drive, Docs
- `complete` - Everything including Sheets, Slides, Forms

To change tier, modify the args in `.mcp.json`:
```json
"args": ["workspace-mcp", "--tool-tier", "extended"]
```

## Troubleshooting

### "Token expired" errors
Tokens should auto-refresh. If issues persist:
1. Delete `~/.config/google-workspace-mcp/token.json`
2. Re-authenticate

### "Access blocked" during auth
Your app is in "Testing" mode. Make sure your email is added as a test user in Google Cloud Console → OAuth consent screen → Test users.

### MCP server not connecting
1. Check `.mcp.json` syntax
2. Restart Claude Code
3. Run `uvx workspace-mcp --tool-tier core` manually to see errors

## Resources
- MCP Server Repo: https://github.com/taylorwilsdon/google_workspace_mcp
- Google Cloud Console: https://console.cloud.google.com
- OAuth Consent Setup: https://console.cloud.google.com/apis/credentials/consent
