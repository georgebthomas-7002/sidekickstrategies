# Gmail MCP Server Setup

## Status: COMPLETE

Setup completed on: 2026-01-04

## Configuration

### Google Cloud Project
- **Project ID:** `claude-code-integration-483321`
- **Client ID:** `697279889124-skpcqpnc366cc84qtaiandk65r4lrmi5.apps.googleusercontent.com`

### Files
| File | Purpose |
|------|---------|
| `~/.gmail-mcp/gcp-oauth.keys.json` | OAuth client credentials |
| `~/.gmail-mcp/credentials.json` | OAuth tokens (auto-refreshed) |

### MCP Server
- **Package:** `@gongrzhe/server-gmail-autoauth-mcp`
- **Config Location:** `.mcp.json` (gmail server entry)

## Capabilities

The Gmail MCP server provides these tools:

| Tool | Description |
|------|-------------|
| `gmail_search` | Search emails with Gmail query syntax |
| `gmail_get_message` | Get full email content by ID |
| `gmail_send` | Send new emails |
| `gmail_reply` | Reply to existing emails |
| `gmail_trash` | Move emails to trash |
| `gmail_mark_read` | Mark emails as read |
| `gmail_mark_unread` | Mark emails as unread |
| `gmail_batch_*` | Batch operations (up to 50 emails) |

## Usage Examples

Ask Claude:
- "Check my recent emails"
- "Show unread emails from today"
- "Search for emails from john@example.com"
- "Send an email to X about Y"
- "Reply to the latest email from Z"

## Troubleshooting

If Gmail stops working:
1. Re-run auth: `npx @gongrzhe/server-gmail-autoauth-mcp auth`
2. Check token file exists: `ls ~/.gmail-mcp/credentials.json`
3. Restart Claude Code

## Sources
- [Gmail-MCP-Server GitHub](https://github.com/GongRzhe/Gmail-MCP-Server)
