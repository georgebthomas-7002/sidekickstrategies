# HubSpot Theme Creation

Complete guide for creating and managing HubSpot CMS themes.

## Theme Structure

```
my-theme/
├── theme.json              # Theme metadata and configuration
├── fields.json             # Theme settings (customizable by users)
├── css/
│   ├── main.css           # Main stylesheet
│   └── components/        # Component styles
├── js/
│   ├── main.js            # Main JavaScript
│   └── vendors/           # Third-party libraries
├── images/
│   └── (theme images)
├── modules/
│   └── (custom modules)
└── templates/
    ├── layouts/
    │   └── base.html      # Base layout template
    ├── pages/
    │   └── home.html      # Page templates
    ├── partials/
    │   └── header.html    # Reusable partials
    └── system/
        └── (system templates)
```

## theme.json Configuration

```json
{
  "name": "My Theme",
  "label": "My Theme",
  "version": "1.0.0",
  "author": "Sidekick Strategies",
  "screenshot_path": "./images/template-previews/theme-screenshot.png",
  "enable_domain_stylesheets": false,
  "documentation_url": "https://sidekickstrategies.com",
  "responsive_breakpoints": [
    {
      "name": "mobile",
      "mediaQuery": "(max-width: 767px)"
    },
    {
      "name": "tablet",
      "mediaQuery": "(min-width: 768px) and (max-width: 1024px)"
    },
    {
      "name": "desktop",
      "mediaQuery": "(min-width: 1025px)"
    }
  ]
}
```

## fields.json - Theme Settings

The fields.json file defines customizable theme settings that appear in the Design Manager.

### Basic Field Types

```json
[
  {
    "name": "primary_color",
    "label": "Primary Color",
    "type": "color",
    "default": {
      "color": "#FF6B35"
    }
  },
  {
    "name": "body_font",
    "label": "Body Font",
    "type": "font",
    "default": {
      "font": "Open Sans",
      "size": "16",
      "size_unit": "px"
    }
  },
  {
    "name": "logo",
    "label": "Site Logo",
    "type": "image",
    "default": {
      "src": ""
    }
  }
]
```

### Field Groups

```json
[
  {
    "name": "colors",
    "label": "Color Settings",
    "type": "group",
    "children": [
      {
        "name": "primary",
        "label": "Primary Color",
        "type": "color",
        "default": {"color": "#FF6B35"}
      },
      {
        "name": "secondary",
        "label": "Secondary Color",
        "type": "color",
        "default": {"color": "#004E89"}
      }
    ]
  }
]
```

### Available Field Types

| Type | Description | Use Case |
|------|-------------|----------|
| `text` | Single line text | Titles, labels |
| `textarea` | Multi-line text | Descriptions |
| `richtext` | WYSIWYG editor | Content blocks |
| `image` | Image picker | Logos, backgrounds |
| `color` | Color picker | Brand colors |
| `font` | Font selector | Typography |
| `number` | Numeric input | Spacing, sizing |
| `boolean` | Toggle switch | Feature flags |
| `choice` | Dropdown/radio | Options |
| `spacing` | Margin/padding | Layout spacing |
| `gradient` | Gradient picker | Backgrounds |
| `group` | Group of fields | Organize settings |

## CLI Commands

```bash
# Create new theme
hs create theme my-theme

# Upload theme to HubSpot
hs upload ./my-theme @hubspot/my-theme

# Watch for changes during development
hs watch ./my-theme @hubspot/my-theme

# Fetch theme from HubSpot
hs fetch @hubspot/my-theme ./my-theme
```

## Accessing Theme Settings in Templates

```jinja
{# Access theme settings in templates #}
{% set primary_color = theme.colors.primary.color %}
{% set logo_src = theme.logo.src %}

<style>
  :root {
    --primary-color: {{ theme.colors.primary.color }};
    --secondary-color: {{ theme.colors.secondary.color }};
  }
</style>

<img src="{{ theme.logo.src }}" alt="{{ theme.logo.alt }}">
```

## Best Practices

1. **Organize settings logically** - Group related fields together
2. **Provide sensible defaults** - Every field should have a default value
3. **Use descriptive labels** - Make settings easy to understand
4. **Document custom settings** - Add help text to complex fields
5. **Test responsiveness** - Use responsive breakpoints appropriately
6. **Keep assets organized** - Use clear folder structure for CSS/JS

## Common Pitfalls

- Forgetting to set default values for fields
- Not testing theme settings in the Design Manager
- Hardcoding values that should be theme settings
- Missing responsive breakpoints for mobile optimization

---
*Part of the HubSpot CMS Skill. See SKILL.md for overview.*
