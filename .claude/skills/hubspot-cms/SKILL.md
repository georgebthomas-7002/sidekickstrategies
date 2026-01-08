---
name: hubspot-cms
description: Build HubSpot CMS themes, modules, and templates. Use when creating themes from scratch, building custom modules, writing HubL templates, or working with the HubSpot CMS CLI.
---

# HubSpot CMS Development Skill

Build professional HubSpot CMS themes, modules, and templates for client websites.

## Triggers
- `/hubspot-theme` - Create a new HubSpot theme
- `/hubspot-module` - Create a new module
- `/hubspot-template` - Create a new template
- "create hubspot theme" - Natural language
- "build a module for [purpose]" - Natural language
- "write HubL for [purpose]" - Natural language

## Sub-Skills (Load as needed)

| File | Purpose | When to Load |
|------|---------|--------------|
| `theme-creation.md` | Theme structure, theme.json, fields.json | Creating/modifying themes |
| `hubl-reference.md` | Complete HubL syntax reference | Writing any HubL code |
| `module-creation.md` | Module structure, all field types | Creating/modifying modules |
| `template-creation.md` | Template types, drag-and-drop areas | Creating templates |
| `full-reference-guide.md` | 3000+ line comprehensive guide | Deep reference, edge cases |

## Quick Reference

### CLI Commands
```bash
# Create new assets
hs create theme <name>           # Create theme boilerplate
hs create module <name>          # Create module boilerplate
hs create template <name>        # Create template boilerplate

# Development workflow
hs watch <src> <dest>            # Watch and auto-upload changes
hs upload <src> <dest>           # Upload files to HubSpot
hs fetch <src> <dest>            # Download from HubSpot
```

### Theme Structure
```
my-theme/
├── theme.json                   # Theme configuration
├── fields.json                  # Theme settings (customizable)
├── css/
│   └── main.css
├── js/
│   └── main.js
├── images/
├── modules/
│   └── my-module.module/
└── templates/
    ├── layouts/
    │   └── base.html
    └── pages/
        └── home.html
```

### Module Structure
```
my-module.module/
├── module.html                  # HubL template
├── module.css                   # Scoped styles
├── module.js                    # JavaScript
├── fields.json                  # Module fields definition
└── meta.json                    # Module metadata
```

### Common HubL Patterns
```jinja
{# Variables #}
{{ content.name }}
{{ module.field_name }}

{# Conditionals #}
{% if condition %}...{% endif %}

{# Loops #}
{% for item in items %}...{% endfor %}

{# Include partial #}
{% include "partials/header.html" %}

{# Render module #}
{% module "unique_name" path="@hubspot/rich_text" %}
```

## Workflow for Client Themes

1. **Initialize**: `hs create theme client-theme`
2. **Configure**: Edit theme.json and fields.json
3. **Build modules**: Create custom modules for client needs
4. **Create templates**: Build page templates with drag-and-drop
5. **Develop**: `hs watch ./client-theme @hubspot/client-theme`
6. **Deploy**: Upload and activate in HubSpot

## Reference Files
- Full HubL Reference: `hubl-reference.md`
- Theme Details: `theme-creation.md`
- Module Details: `module-creation.md`
- Template Details: `template-creation.md`
- Comprehensive Guide: `full-reference-guide.md` (3000+ lines, deep dive)

## HubSpot Account
- **Portal ID**: 474711 (sidekick-strategies-2026)
- **CLI Config**: Uses `.hsaccount` in project root
