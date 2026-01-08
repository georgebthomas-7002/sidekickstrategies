# HubSpot CMS Development Guide
## Professional-Grade Reference for Client Theme Builds
### Sidekick Strategies

---

# TABLE OF CONTENTS

1. [THEMES](#1-themes-critical)
2. [HUBL LANGUAGE](#2-hubl-language-critical---complete-reference)
3. [MODULES](#3-modules-high-priority)
4. [TEMPLATES](#4-templates-high-priority)
5. [CLI WORKFLOW](#5-cli-workflow)
6. [BEST PRACTICES](#6-best-practices--performance-optimization)

---

# 1. THEMES (Critical)

## Theme Overview

A theme is a single directory of files that packages templates, modules, CSS, JSON, and JS files together. Themes provide a cohesive content editing experience throughout HubSpot.

**Sources:**
- [Theme Overview - HubSpot Docs](https://developers.hubspot.com/docs/cms/building-blocks/themes)
- [Getting Started with Themes](https://developers.hubspot.com/docs/cms/guides/getting-started-with-themes)

---

## Theme Directory Structure

### Standard Theme Structure (CMS Boilerplate)

```
your-theme-directory/
├── src/
│   └── theme/
│       ├── assets/           # Images, icons, fonts
│       ├── css/              # Stylesheets
│       ├── js/               # JavaScript files
│       ├── modules/          # Custom modules (.module folders)
│       ├── templates/        # Page templates
│       │   ├── layouts/      # Base layouts
│       │   └── partials/     # Reusable template parts
│       ├── fields.json       # Theme settings fields
│       └── theme.json        # Theme configuration
├── package.json
└── hsproject.json            # HubSpot project config
```

### Modern Elevate Theme Structure (React-Based)

```
├── src/
│   └── unified-theme/
│       ├── _locales/         # Localization files
│       ├── assets/           # Theme assets
│       ├── components/
│       │   ├── modules/      # Theme modules (Accordion, Button, Card, etc.)
│       │   ├── fieldLibrary/ # Field components
│       │   ├── utils/        # Utility helpers
│       │   └── types/        # TypeScript definitions
│       ├── styles/
│       ├── templates/
│       ├── fields.json
│       └── theme.json
```

---

## theme.json Configuration

The `theme.json` file contains meta-information for your theme directory.

### Complete theme.json Example

```json
{
  "label": "My Custom Theme",
  "preview_path": "./templates/home.html",
  "screenshot_path": "./assets/images/theme-screenshot.png",
  "enable_domain_stylesheets": false,
  "responsive_breakpoints": {
    "sm": {
      "value": 576,
      "unit": "px"
    },
    "md": {
      "value": 768,
      "unit": "px"
    },
    "lg": {
      "value": 992,
      "unit": "px"
    },
    "xl": {
      "value": 1200,
      "unit": "px"
    }
  }
}
```

### Configuration Options

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Human-readable theme name displayed to content creators |
| `preview_path` | string | Path to template for theme preview (e.g., `./templates/home.html`) |
| `screenshot_path` | string | Path to theme thumbnail image |
| `enable_domain_stylesheets` | boolean | Whether to include domain stylesheets |
| `responsive_breakpoints` | object | Define custom breakpoints for responsive design |

**Key Points:**
- The `label` should be descriptive and user-friendly
- `preview_path` should point to your most commonly used template
- Screenshot should be a clear representation of the theme design

---

## fields.json (Theme Settings)

The `fields.json` file controls available fields in the theme editor, allowing content creators to customize colors, fonts, spacing, and more.

### Basic Structure

```json
[
  {
    "type": "group",
    "name": "colors",
    "label": "Colors",
    "expanded": true,
    "children": [
      {
        "type": "color",
        "name": "primary_color",
        "label": "Primary Color",
        "default": {
          "color": "#0033A0",
          "opacity": 100
        }
      },
      {
        "type": "color",
        "name": "secondary_color",
        "label": "Secondary Color",
        "default": {
          "color": "#FF6600",
          "opacity": 100
        }
      }
    ]
  },
  {
    "type": "group",
    "name": "typography",
    "label": "Typography",
    "children": [
      {
        "type": "font",
        "name": "heading_font",
        "label": "Heading Font",
        "load_external_fonts": true,
        "default": {
          "font": "Montserrat",
          "font_set": "GOOGLE",
          "size": 32,
          "size_unit": "px",
          "color": "#333333",
          "styles": {
            "font-weight": "bold"
          }
        }
      },
      {
        "type": "font",
        "name": "body_font",
        "label": "Body Font",
        "load_external_fonts": true,
        "default": {
          "font": "Open Sans",
          "font_set": "GOOGLE",
          "size": 16,
          "size_unit": "px",
          "color": "#666666"
        }
      }
    ]
  }
]
```

### Marketplace Requirements

For themes intended for the HubSpot Marketplace:
- Must include at least **three color fields**
- Must include these standard field names:
  - `primary_color`
  - `secondary_color`
  - `heading_font`
  - `body_font`

---

## Asset Organization

### CSS Structure

```
css/
├── main.css              # Primary stylesheet
├── _variables.css        # CSS custom properties from theme fields
├── _base.css             # Reset and base styles
├── _typography.css       # Typography rules
├── _buttons.css          # Button styles
├── _forms.css            # Form styles
├── _layout.css           # Grid and layout
└── theme-overrides.css   # Theme field CSS variables
```

### JavaScript Structure

```
js/
├── main.js               # Main entry point
├── navigation.js         # Menu/nav functionality
├── forms.js              # Form enhancements
└── utils.js              # Utility functions
```

### Images/Assets

```
assets/
├── images/
│   ├── theme-screenshot.png
│   └── placeholders/
├── icons/
│   └── svg/
└── fonts/
```

---

## CLI: Creating Themes

### Create a New Theme

```bash
# Create theme from boilerplate
hs create website-theme my-theme-name

# Navigate to theme directory
cd my-theme-name

# Initialize HubSpot connection (if not done)
hs init

# Upload theme to HubSpot
hs upload src/theme my-theme-name

# Watch for changes during development
hs watch src/theme my-theme-name
```

### Theme Preview (Local Development)

```bash
# Preview theme locally without uploading
hs theme preview
# Opens local proxy server at https://hslocal.net:3000/
```

### Fetch Existing Theme

```bash
# Download theme from HubSpot account
hs fetch my-theme-name ./local-folder
```

---

## Common Pitfalls

1. **Missing required files**: Always include both `theme.json` and `fields.json` at theme root
2. **Incorrect paths**: Use relative paths from theme root (e.g., `./templates/home.html`)
3. **Breaking marketplace compatibility**: Ensure standard field names are used
4. **Performance issues**: Avoid loading unnecessary CSS/JS files globally

---

# 2. HUBL LANGUAGE (Critical - Complete Reference)

## HubL Overview

HubL (pronounced "Hubble") is HubSpot's templating language, an extension of Jinjava (based on Jinja2). It enables dynamic content, conditional logic, and interaction with HubSpot data.

**Sources:**
- [HubL Syntax Overview](https://developers.hubspot.com/docs/cms/reference/hubl/overview)
- [HubL Functions Reference](https://developers.hubspot.com/docs/cms/hubl/functions)
- [HubL Filters Reference](https://developers.hubspot.com/docs/cms/hubl/filters)
- [HubL Cheat Sheet](https://bootstrapcreative.com/resources/hubspot-hubl-docs-cheat-sheet/)

---

## Syntax Delimiters

| Delimiter | Purpose | Example |
|-----------|---------|---------|
| `{{ }}` | Expression/Output | `{{ content.name }}` |
| `{% %}` | Statement/Logic | `{% if condition %}` |
| `{# #}` | Comments | `{# This is a comment #}` |

---

## Variables

### Standard Variables

```hubl
{# Page/Content Variables #}
{{ content.absolute_url }}          {# Full URL of current page #}
{{ content.name }}                  {# Page name #}
{{ content.meta_description }}      {# Meta description #}
{{ content.featured_image }}        {# Featured image URL #}
{{ content.publish_date }}          {# Publish timestamp #}
{{ content.updated }}               {# Last updated timestamp #}

{# Request Variables #}
{{ request.path }}                  {# Current URL path #}
{{ request.query }}                 {# Query string #}
{{ request.query_dict }}            {# Query params as dictionary #}
{{ request.cookies }}               {# Request cookies #}
{{ request.domain }}                {# Current domain #}

{# Account/Settings Variables #}
{{ site_settings.company_name }}    {# Company name from settings #}
{{ site_settings.company_street_address_1 }}
{{ hub_id }}                        {# HubSpot portal ID #}
{{ local_dt }}                      {# Current datetime in account timezone #}
{{ local_time_zone }}               {# Account timezone setting #}

{# Template Context #}
{{ is_in_page_editor }}             {# Boolean: in editor? #}
{{ is_in_preview }}                 {# Boolean: in preview? #}
```

### Setting Variables

```hubl
{# Simple variable #}
{% set my_variable = "Hello World" %}

{# Variable from expression #}
{% set full_name = first_name ~ " " ~ last_name %}

{# Variable from content #}
{% set page_title = content.name %}

{# Array/List #}
{% set colors = ["red", "green", "blue"] %}

{# Dictionary/Object #}
{% set person = {"name": "John", "age": 30} %}

{# Using do for operations without output #}
{% do my_list.append("new item") %}
```

---

## Tags (Control Structures)

### If/Else Conditionals

```hubl
{# Basic if #}
{% if condition %}
  Content here
{% endif %}

{# If/Else #}
{% if content.featured_image %}
  <img src="{{ content.featured_image }}" alt="{{ content.name }}">
{% else %}
  <img src="{{ get_asset_url('./assets/default.jpg') }}" alt="Default">
{% endif %}

{# If/Elif/Else #}
{% if user_type == "admin" %}
  <p>Welcome, Administrator</p>
{% elif user_type == "member" %}
  <p>Welcome, Member</p>
{% else %}
  <p>Welcome, Guest</p>
{% endif %}

{# Comparison Operators #}
{% if value == 10 %}          {# Equal #}
{% if value != 10 %}          {# Not equal #}
{% if value > 10 %}           {# Greater than #}
{% if value >= 10 %}          {# Greater or equal #}
{% if value < 10 %}           {# Less than #}
{% if value <= 10 %}          {# Less or equal #}

{# Logical Operators #}
{% if condition1 and condition2 %}
{% if condition1 or condition2 %}
{% if not condition %}

{# Membership Testing #}
{% if "apple" in fruits %}
{% if item not in excluded_list %}

{# Truthiness Testing #}
{% if variable %}             {# True if not empty/null/false #}
{% if variable is defined %}  {# Check if variable exists #}
{% if variable is none %}     {# Check if null/None #}
```

### For Loops

```hubl
{# Basic loop #}
{% for item in items %}
  <p>{{ item }}</p>
{% endfor %}

{# Loop with index #}
{% for item in items %}
  <p>{{ loop.index }}: {{ item }}</p>
{% endfor %}

{# Loop variables #}
{{ loop.index }}      {# Current iteration (1-indexed) #}
{{ loop.index0 }}     {# Current iteration (0-indexed) #}
{{ loop.first }}      {# Boolean: first iteration? #}
{{ loop.last }}       {# Boolean: last iteration? #}
{{ loop.length }}     {# Total number of items #}
{{ loop.revindex }}   {# Iterations remaining (1-indexed) #}
{{ loop.cycle("odd", "even") }}  {# Cycle through values #}

{# Loop with else (no items) #}
{% for post in posts %}
  <article>{{ post.name }}</article>
{% else %}
  <p>No posts found.</p>
{% endfor %}

{# Loop over dictionary #}
{% for key, value in my_dict.items() %}
  <p>{{ key }}: {{ value }}</p>
{% endfor %}

{# Limit iterations #}
{% for item in items[:5] %}  {# First 5 items #}
{% for item in items[2:] %}  {# Skip first 2 #}

{# Loop with conditions #}
{% for product in products if product.in_stock %}
  <p>{{ product.name }}</p>
{% endfor %}
```

### Include

```hubl
{# Include a partial template #}
{% include "./partials/header.html" %}

{# Include with context #}
{% include "./partials/card.html" with context %}

{# Include with variables #}
{% include "./partials/alert.html" with {"message": "Success!", "type": "success"} %}

{# Ignore if missing #}
{% include "./partials/optional.html" ignore missing %}
```

### Block and Extends (Template Inheritance)

```hubl
{# base.html - Parent template #}
<!DOCTYPE html>
<html>
<head>
  <title>{% block title %}Default Title{% endblock %}</title>
  {{ standard_header_includes }}
</head>
<body>
  {% global_partial path="./partials/header.html" %}

  <main>
    {% block content %}
    {% endblock content %}
  </main>

  {% global_partial path="./partials/footer.html" %}
  {{ standard_footer_includes }}
</body>
</html>

{# page.html - Child template #}
{% extends "./layouts/base.html" %}

{% block title %}{{ content.name }} | My Site{% endblock %}

{% block content %}
  <h1>{{ content.name }}</h1>
  {% dnd_area "main_content" %}
  {% end_dnd_area %}
{% endblock content %}
```

### Macros

```hubl
{# Define a macro #}
{% macro button(text, url, style="primary", size="medium") %}
  <a href="{{ url }}" class="btn btn-{{ style }} btn-{{ size }}">
    {{ text }}
  </a>
{% endmacro %}

{# Use the macro #}
{{ button("Learn More", "/about", "secondary", "large") }}
{{ button("Contact Us", "/contact") }}

{# Macro with optional content #}
{% macro card(title) %}
  <div class="card">
    <h3>{{ title }}</h3>
    <div class="card-content">
      {{ caller() }}
    </div>
  </div>
{% endmacro %}

{% call card("My Card Title") %}
  <p>This content goes inside the card.</p>
{% endcall %}

{# Import macros from another file #}
{% import "./macros/buttons.html" as buttons %}
{{ buttons.primary("Click Me", "/url") }}

{# Macro nesting limit: 20 levels deep #}
```

### Global Partials

```hubl
{# Include a global partial #}
{% global_partial path="./partials/header.html" %}

{# Note: Do NOT use inside <head> - creates invalid HTML #}
{# Global partials add a wrapper <div> for editor identification #}
```

---

## Functions (Complete Reference)

### Asset Functions

```hubl
{# Get asset URL (images, CSS, JS) #}
{{ get_asset_url("./assets/images/logo.png") }}
{{ get_asset_url("./css/main.css") }}

{# Get public template URL #}
{{ get_public_template_url("./templates/page.html") }}
```

### Blog Functions

```hubl
{# Get recent blog posts #}
{% set recent_posts = blog_recent_posts("default", 5) %}
{% for post in recent_posts %}
  <a href="{{ post.absolute_url }}">{{ post.name }}</a>
{% endfor %}

{# Blog functions list #}
{{ blog_all_posts_url(blog_id) }}          {# URL to all posts listing #}
{{ blog_author_url(blog_id, author_slug) }} {# Author archive URL #}
{{ blog_authors(blog_id, limit) }}          {# List of blog authors #}
{{ blog_by_id(blog_id) }}                   {# Blog object by ID #}
{{ blog_page_link(page_number) }}           {# Pagination link #}
{{ blog_popular_posts(blog_id, limit) }}    {# Popular posts (cached 6 hrs) #}
{{ blog_post_archive_url(blog_id, year, month) }}
{{ blog_recent_author_posts(blog_id, author, limit) }}
{{ blog_recent_posts(blog_id, limit) }}     {# Recent posts (limit 200) #}
{{ blog_recent_tag_posts(blog_id, tag, limit) }}
{{ blog_tag_url(blog_id, tag_slug) }}       {# Tag archive URL #}
{{ blog_tags(blog_id, limit) }}             {# List of tags #}
{{ blog_total_post_count(blog_id) }}        {# Total post count #}

{# Get content by ID #}
{% set page = content_by_id(page_id) %}
{{ page.name }}
{{ page.absolute_url }}
```

### Menu Functions

```hubl
{# Get menu by ID/name #}
{% set main_menu = menu(menu_id) %}
{% for item in main_menu %}
  <a href="{{ item.url }}"
     {% if item.active %}class="active"{% endif %}>
    {{ item.label }}
  </a>
  {% if item.children %}
    <ul>
      {% for child in item.children %}
        <a href="{{ child.url }}">{{ child.label }}</a>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}

{# Menu item properties #}
{{ item.label }}        {# Menu item text #}
{{ item.url }}          {# Link URL #}
{{ item.active }}       {# Boolean: current page? #}
{{ item.activeChildren }} {# Boolean: has active child? #}
{{ item.children }}     {# Child menu items #}
{{ item.level }}        {# Nesting level (0-based) #}
```

### Date/Time Functions

```hubl
{# Format datetime #}
{{ format_datetime(timestamp, "MMMM d, yyyy") }}
{{ format_datetime(timestamp, "h:mm a z") }}
{{ format_date(timestamp, "short") }}
{{ format_time(timestamp, "medium") }}

{# Date arithmetic #}
{{ plus_time(timestamp, 1, "days") }}
{{ minus_time(timestamp, 2, "weeks") }}

{# Current time in account timezone #}
{{ local_dt }}
```

### Utility Functions

```hubl
{# Generate unique ID #}
{{ unique_id() }}

{# Create range #}
{% for i in range(1, 10) %}
  {{ i }}
{% endfor %}

{# Check if defined #}
{% if content.custom_field is defined %}

{# Ternary-style default #}
{{ variable|default("fallback value") }}

{# URL building #}
{{ require_css(get_asset_url("./css/custom.css")) }}
{{ require_js(get_asset_url("./js/custom.js")) }}
```

### CRM Functions

```hubl
{# Personalization tokens #}
{{ personalization_token("contact.firstname", "Friend") }}
{{ company_domain }}
{{ contact.email }}
```

---

## Filters (Complete Reference)

### String Filters

```hubl
{{ "hello world"|capitalize }}          {# "Hello world" #}
{{ "hello world"|title }}               {# "Hello World" #}
{{ "HELLO"|lower }}                     {# "hello" #}
{{ "hello"|upper }}                     {# "HELLO" #}
{{ "  hello  "|trim }}                  {# "hello" #}
{{ "hello world"|replace("world", "there") }}  {# "hello there" #}
{{ "hello"|center(20) }}                {# Centers in 20 chars #}
{{ text|wordcount }}                    {# Count words #}
{{ text|truncate(100) }}                {# Truncate with ellipsis #}
{{ text|truncatehtml(200) }}            {# Truncate HTML safely #}
{{ text|striptags }}                    {# Remove HTML tags #}
{{ text|urlize }}                       {# Convert URLs to links #}
{{ "item"|pluralize(count, "s") }}      {# Pluralization #}
{{ content|wordwrap(80) }}              {# Wrap at 80 chars #}
```

### Number Filters

```hubl
{{ 3.14159|round(2) }}                  {# 3.14 #}
{{ 1000|format_number }}                {# "1,000" #}
{{ price|format_currency_value("USD") }} {# "$99.99" #}
{{ value|int }}                         {# Convert to integer #}
{{ value|float }}                       {# Convert to float #}
{{ value|abs }}                         {# Absolute value #}
{{ 10|divide(3) }}                      {# 3.333... #}
{{ 10|multiply(2) }}                    {# 20 #}
```

### Date Filters

```hubl
{# Format dates (use format_datetime function instead - datetimeformat deprecated) #}
{{ timestamp|format_datetime("MMMM d, yyyy") }}
{{ timestamp|format_date("short") }}
{{ timestamp|format_time("medium", "America/New_York") }}

{# Parse date strings #}
{{ "2024-01-15"|strtotime }}
{{ "January 15, 2024"|strtodate("MMMM d, yyyy") }}
```

### HTML/Security Filters

```hubl
{# Escape for HTML context #}
{{ user_input|escape_html }}

{# Escape for HTML attributes #}
{{ attribute_value|escape_attr }}

{# Escape for JavaScript #}
{{ js_value|escape_js }}

{# Escape for URLs #}
{{ url_param|escape_url }}

{# Escape JSON #}
{{ data|escapejson }}

{# Safe HTML (allow specific tags) #}
{{ content|sanitize_html }}
{{ content|sanitize_html("IMAGES") }}
{{ content|sanitize_html("FORMATTING", "LINKS") }}
{# Options: FORMATTING, BLOCKS, STYLES, LINKS, TABLES, IMAGES, STRIP #}

{# Mark as safe (no escaping) #}
{{ trusted_html|safe }}
```

### List/Array Filters

```hubl
{{ items|first }}                       {# First item #}
{{ items|last }}                        {# Last item #}
{{ items|length }}                      {# Count items #}
{{ items|join(", ") }}                  {# Join with separator #}
{{ items|sort }}                        {# Sort ascending #}
{{ items|sort(reverse=true) }}          {# Sort descending #}
{{ items|sort(attribute="name") }}      {# Sort by property #}
{{ items|reverse }}                     {# Reverse order #}
{{ items|unique }}                      {# Remove duplicates #}
{{ items|shuffle }}                     {# Randomize order #}
{{ items|slice(3) }}                    {# Split into groups of 3 #}
{{ items|batch(3, "fill") }}            {# Batch into groups #}
{{ items|map(attribute="name") }}       {# Extract property #}
{{ items|select(attribute="active") }}  {# Filter by property #}
{{ items|reject(attribute="hidden") }}  {# Exclude by property #}
{{ items|groupby("category") }}         {# Group by property #}

{# List operations #}
{{ list1|union(list2) }}                {# Combine lists #}
{{ list1|intersect(list2) }}            {# Common items #}
{{ list1|difference(list2) }}           {# Items in list1 not in list2 #}
{{ list1|symmetric_difference(list2) }} {# Items in either but not both #}
```

### Dictionary Filters

```hubl
{{ dict|dictsort }}                     {# Sort by key #}
{{ dict|dictsort(by="value") }}         {# Sort by value #}
{{ dict|attr("key") }}                  {# Get attribute #}
{{ dict|items }}                        {# Get key-value pairs #}
{{ dict|keys }}                         {# Get keys #}
{{ dict|values }}                       {# Get values #}
```

### JSON Filters

```hubl
{{ data|tojson }}                       {# Convert to JSON string #}
{{ json_string|fromjson }}              {# Parse JSON string #}
```

### Debugging Filters

```hubl
{# Pretty print for debugging #}
{{ variable|pprint }}

{# Shows type and structure - VERY useful for debugging #}
{# Example output: (String: "Hello World") #}
{# Example output: (Dict: {"key": "value"}) #}
```

### Regex Filters

```hubl
{{ text|regex_replace("\\d+", "X") }}   {# Replace with regex #}
```

---

## Debugging Techniques

### Using pprint

```hubl
{# Debug any variable #}
<pre>{{ content|pprint }}</pre>
<pre>{{ module|pprint }}</pre>
<pre>{{ request|pprint }}</pre>

{# Conditional debugging (only in editor) #}
{% if is_in_page_editor %}
  <div class="debug-info">
    <pre>{{ my_variable|pprint }}</pre>
  </div>
{% endif %}
```

### Common Debug Patterns

```hubl
{# Check if variable is defined #}
{% if my_var is defined %}
  Variable exists: {{ my_var }}
{% else %}
  Variable not defined
{% endif %}

{# Check variable type #}
{{ my_var|pprint }}  {# Shows (Type: value) #}

{# Debug loop iteration #}
{% for item in items %}
  <p>Index: {{ loop.index }}, Item: {{ item|pprint }}</p>
{% endfor %}

{# Output all available content properties #}
<pre>{{ content|pprint }}</pre>
```

---

# 3. MODULES (High Priority)

## Module Overview

Modules are reusable components that content creators can customize in the page editor. They consist of multiple files that define structure, styling, functionality, and configuration.

**Sources:**
- [Modules Overview](https://developers.hubspot.com/docs/cms/building-blocks/modules)
- [Module and Theme Fields](https://developers.hubspot.com/docs/cms/building-blocks/module-theme-fields)
- [Configuring a Module](https://developers.hubspot.com/docs/cms/building-blocks/modules/configuration)

---

## Module File Structure

```
my-module.module/
├── module.html         # HubL/HTML template (required)
├── module.css          # Module styles (optional)
├── module.js           # Module JavaScript (optional)
├── fields.json         # Field definitions (required)
└── meta.json           # Module configuration (required)
```

---

## module.html

The main template file containing HTML and HubL.

```hubl
{# Access field values via module object #}
<div class="card {{ module.style_variant }}">
  {% if module.image.src %}
    <img
      src="{{ module.image.src }}"
      alt="{{ module.image.alt }}"
      {% if module.image.loading == "lazy" %}loading="lazy"{% endif %}
    >
  {% endif %}

  <div class="card-content">
    <h3>{{ module.heading }}</h3>
    {{ module.body_text }}

    {% if module.link.url.href %}
      <a href="{{ module.link.url.href }}"
         {% if module.link.open_in_new_tab %}target="_blank" rel="noopener"{% endif %}>
        {{ module.link.text }}
      </a>
    {% endif %}
  </div>
</div>

{# Repeater example #}
{% if module.items %}
  <ul class="item-list">
    {% for item in module.items %}
      <li>{{ item.title }} - {{ item.description }}</li>
    {% endfor %}
  </ul>
{% endif %}
```

---

## module.css

CSS for module styling. **HubL is NOT supported in module.css**.

```css
/* Scoped to module instances */
.card {
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.card-content {
  padding: 1.5rem;
}

.card h3 {
  margin-top: 0;
  color: #333;
}

/* Responsive styles */
@media (max-width: 768px) {
  .card {
    margin-bottom: 1rem;
  }
}
```

**Important Notes:**
- CSS is automatically bundled and minified
- Only loads when module is used on page
- Loads once regardless of how many instances

---

## module.js

JavaScript for module functionality.

```javascript
// module.js - vanilla JavaScript
document.addEventListener('DOMContentLoaded', function() {
  // Get all instances of this module
  const modules = document.querySelectorAll('.my-module');

  modules.forEach(function(module) {
    // Access data attributes passed from module.html
    const config = module.dataset.config;

    // Module-specific functionality
    initModule(module);
  });
});

function initModule(element) {
  // Your module logic here
}
```

**Passing data from HubL to JS (in module.html):**

```hubl
<div class="my-module"
     data-config="{{ module.config_value|escapejson }}"
     data-id="{{ name }}">
  {# Module content #}
</div>
```

---

## meta.json

Module configuration file.

```json
{
  "label": "Card Module",
  "css_assets": [],
  "external_js": [],
  "global": false,
  "help_text": "A versatile card component for displaying content",
  "host_template_types": ["PAGE", "BLOG_POST", "BLOG_LISTING"],
  "icon": "./icons/card-icon.svg",
  "is_available_for_new_content": true,
  "js_assets": [],
  "other_assets": [],
  "smart_type": "NOT_SMART",
  "tags": ["CONTENT"],
  "css_render_options": {
    "async": false
  },
  "js_render_options": {
    "async": false,
    "position": "footer"
  },
  "placeholder": {
    "show_module_icon": true,
    "title": "Card",
    "description": "Add a card with image, title, and link"
  }
}
```

### meta.json Options

| Property | Description |
|----------|-------------|
| `label` | Display name in editor |
| `global` | If true, module content is shared across all pages |
| `help_text` | Tooltip shown in editor |
| `host_template_types` | Where module can be used: PAGE, BLOG_POST, BLOG_LISTING, EMAIL |
| `icon` | Custom icon for module |
| `is_available_for_new_content` | Show in module picker |
| `css_assets`, `js_assets` | Additional shared dependencies |
| `css_render_options.async` | Load CSS asynchronously |
| `js_render_options.position` | "head" or "footer" |
| `placeholder` | Editor placeholder when module is empty |
| `tags` | Categorization: CONTENT, IMAGE, FORM, FUNCTIONALITY, etc. |

---

## fields.json (Module Fields)

### Complete Field Type Reference

#### Text Field

```json
{
  "type": "text",
  "name": "heading",
  "label": "Heading",
  "required": true,
  "default": "Your Heading Here",
  "placeholder": "Enter heading...",
  "inline_help_text": "The main heading for this section",
  "validation_regex": "^.{1,100}$"
}
```

#### Textarea Field

```json
{
  "type": "textarea",
  "name": "description",
  "label": "Description",
  "default": "",
  "rows": 4
}
```

#### Rich Text Field

```json
{
  "type": "richtext",
  "name": "body_content",
  "label": "Body Content",
  "default": "<p>Enter your content here...</p>",
  "enabled_features": [
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "lists",
    "indent",
    "alignment",
    "headings",
    "personalization_tokens"
  ]
}
```

#### Image Field

```json
{
  "type": "image",
  "name": "image",
  "label": "Image",
  "responsive": true,
  "resizable": true,
  "show_loading": true,
  "default": {
    "src": "",
    "alt": "",
    "loading": "lazy",
    "width": 800,
    "height": 600
  }
}
```

#### Link Field

```json
{
  "type": "link",
  "name": "cta_link",
  "label": "CTA Link",
  "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"],
  "default": {
    "url": {
      "type": "EXTERNAL",
      "href": ""
    },
    "open_in_new_tab": false,
    "no_follow": false
  }
}
```

#### URL Field

```json
{
  "type": "url",
  "name": "external_url",
  "label": "External URL",
  "supported_types": ["EXTERNAL", "CONTENT", "FILE"],
  "default": {
    "type": "EXTERNAL",
    "href": ""
  }
}
```

#### Choice Field (Dropdown/Radio/Checkbox)

```json
{
  "type": "choice",
  "name": "layout_style",
  "label": "Layout Style",
  "display": "select",
  "required": true,
  "choices": [
    ["left", "Left Aligned"],
    ["center", "Centered"],
    ["right", "Right Aligned"]
  ],
  "default": "left"
}
```

**Display options:** `select`, `radio`, `checkbox`

#### Boolean Field

```json
{
  "type": "boolean",
  "name": "show_border",
  "label": "Show Border",
  "display": "toggle",
  "default": false,
  "inline_help_text": "Enable to show a border around the module"
}
```

**Display options:** `toggle`, `checkbox`

#### Number Field

```json
{
  "type": "number",
  "name": "columns",
  "label": "Number of Columns",
  "min": 1,
  "max": 6,
  "step": 1,
  "default": 3,
  "display": "slider",
  "suffix": "cols"
}
```

**Display options:** `text`, `slider`

#### Color Field

```json
{
  "type": "color",
  "name": "background_color",
  "label": "Background Color",
  "default": {
    "color": "#ffffff",
    "opacity": 100
  }
}
```

#### Font Field

```json
{
  "type": "font",
  "name": "heading_font",
  "label": "Heading Font",
  "load_external_fonts": true,
  "default": {
    "font": "Montserrat",
    "font_set": "GOOGLE",
    "size": 32,
    "size_unit": "px",
    "color": "#333333",
    "styles": {
      "font-weight": "bold",
      "font-style": "normal",
      "text-decoration": "none"
    }
  }
}
```

#### Spacing Field

```json
{
  "type": "spacing",
  "name": "padding",
  "label": "Padding",
  "default": {
    "top": {
      "value": 20,
      "units": "px"
    },
    "right": {
      "value": 20,
      "units": "px"
    },
    "bottom": {
      "value": 20,
      "units": "px"
    },
    "left": {
      "value": 20,
      "units": "px"
    }
  }
}
```

#### Background Image Field

```json
{
  "type": "backgroundimage",
  "name": "background",
  "label": "Background Image",
  "default": {
    "src": "",
    "background_position": "CENTER",
    "background_size": "cover"
  }
}
```

#### Gradient Field

```json
{
  "type": "gradient",
  "name": "overlay_gradient",
  "label": "Overlay Gradient",
  "default": {
    "side_or_corner": {
      "verticalSide": "BOTTOM",
      "horizontalSide": null
    },
    "colors": [
      {
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 0.7
        }
      },
      {
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 0
        }
      }
    ]
  }
}
```

#### Icon Field

```json
{
  "type": "icon",
  "name": "icon",
  "label": "Icon",
  "icon_set": "fontawesome-5.14.0",
  "default": {
    "name": "arrow-right",
    "type": "SOLID",
    "unicode": "f061"
  }
}
```

#### Menu Field

```json
{
  "type": "menu",
  "name": "navigation_menu",
  "label": "Navigation Menu",
  "default": null
}
```

#### Simple Menu Field

```json
{
  "type": "simplemenu",
  "name": "quick_links",
  "label": "Quick Links",
  "default": []
}
```

#### Form Field

```json
{
  "type": "form",
  "name": "contact_form",
  "label": "Contact Form",
  "default": {
    "form_id": "",
    "response_type": "redirect",
    "redirect_url": "",
    "message": "Thank you for submitting!"
  }
}
```

#### Logo Field

```json
{
  "type": "logo",
  "name": "site_logo",
  "label": "Site Logo",
  "default": {
    "override_inherited_src": false,
    "src": "",
    "alt": ""
  }
}
```

#### Date Field

```json
{
  "type": "date",
  "name": "event_date",
  "label": "Event Date",
  "default": null
}
```

#### Date and Time Field

```json
{
  "type": "datetime",
  "name": "event_datetime",
  "label": "Event Date and Time",
  "default": null,
  "step": 30
}
```

#### HubDB Row Field

```json
{
  "type": "hubdbrow",
  "name": "selected_row",
  "label": "Select Row",
  "table_name_or_id": "my_table",
  "columns_to_fetch": ["name", "description", "image"]
}
```

#### HubDB Table Field

```json
{
  "type": "hubdbtable",
  "name": "data_table",
  "label": "Select Table"
}
```

#### CRM Object Field

```json
{
  "type": "crmobject",
  "name": "selected_contact",
  "label": "Select Contact",
  "object_type": "CONTACT",
  "properties_to_fetch": ["firstname", "lastname", "email"]
}
```

---

### Group Fields

```json
{
  "type": "group",
  "name": "card_settings",
  "label": "Card Settings",
  "expanded": true,
  "children": [
    {
      "type": "text",
      "name": "title",
      "label": "Title",
      "default": ""
    },
    {
      "type": "richtext",
      "name": "description",
      "label": "Description",
      "default": ""
    }
  ]
}
```

---

### Repeater Fields (Repeating Groups)

```json
{
  "type": "group",
  "name": "items",
  "label": "Items",
  "occurrence": {
    "min": 1,
    "max": 10,
    "default": 3,
    "sorting_label_field": "title"
  },
  "children": [
    {
      "type": "text",
      "name": "title",
      "label": "Title",
      "default": "Item Title"
    },
    {
      "type": "image",
      "name": "image",
      "label": "Image"
    },
    {
      "type": "richtext",
      "name": "description",
      "label": "Description"
    }
  ],
  "default": [
    {
      "title": "First Item",
      "description": "<p>Description 1</p>"
    },
    {
      "title": "Second Item",
      "description": "<p>Description 2</p>"
    }
  ]
}
```

---

### Style Fields

Style fields appear in the "Styles" tab of the module editor.

```json
[
  {
    "type": "group",
    "name": "styles",
    "label": "Styles",
    "tab": "STYLE",
    "children": [
      {
        "type": "color",
        "name": "background_color",
        "label": "Background Color",
        "default": {
          "color": "#ffffff",
          "opacity": 100
        }
      },
      {
        "type": "spacing",
        "name": "padding",
        "label": "Padding",
        "default": {
          "top": { "value": 20, "units": "px" },
          "right": { "value": 20, "units": "px" },
          "bottom": { "value": 20, "units": "px" },
          "left": { "value": 20, "units": "px" }
        }
      },
      {
        "type": "number",
        "name": "border_radius",
        "label": "Border Radius",
        "display": "slider",
        "min": 0,
        "max": 50,
        "default": 8,
        "suffix": "px"
      }
    ]
  }
]
```

**Using CSS output in module.html:**

```hubl
<style>
  .my-module-{{ name }} {
    background-color: {{ module.styles.background_color.color }};
    {{ module.styles.padding.css }}
    border-radius: {{ module.styles.border_radius }}px;
  }
</style>
```

---

### Field Visibility/Conditions

```json
{
  "type": "text",
  "name": "custom_url",
  "label": "Custom URL",
  "visibility": {
    "controlling_field_path": "link_type",
    "controlling_value_regex": "custom",
    "operator": "EQUAL"
  }
}
```

**Operators:** `EQUAL`, `NOT_EQUAL`, `EMPTY`, `NOT_EMPTY`, `MATCHES_REGEX`

---

### Field Inheritance (Theme Fields)

```json
{
  "type": "color",
  "name": "accent_color",
  "label": "Accent Color",
  "inherited_value": {
    "default_value_path": "theme.colors.primary_color"
  }
}
```

---

## Global vs Local Modules

### Local Modules
- Content is specific to each page where the module is placed
- Changes affect only that instance
- Standard module behavior

### Global Modules
- Content is shared across all pages
- Perfect for headers, footers, sidebars
- Set `"global": true` in meta.json

```json
{
  "label": "Site Header",
  "global": true
}
```

---

## CLI: Creating Modules

```bash
# Create a new module
hs create module my-module

# Create module with specific destination
hs create module my-module ./src/modules

# Options available during creation:
# - Module label
# - Content types (PAGE, BLOG_POST, BLOG_LISTING)
# - Global module toggle

# Fetch default HubSpot module for reference
hs fetch @hubspot/rich_text.module ./reference-modules
```

---

## Default HubSpot Modules Reference

```hubl
{# Rich Text #}
{% module "rich_text" path="@hubspot/rich_text" %}

{# Image #}
{% module "linked_image" path="@hubspot/linked_image" %}

{# Header #}
{% module "header" path="@hubspot/header" %}

{# Form #}
{% module "form" path="@hubspot/form" %}

{# Menu #}
{% module "menu" path="@hubspot/menu" %}

{# Simple Menu #}
{% module "simple_menu" path="@hubspot/simple_menu" %}

{# Logo #}
{% module "logo" path="@hubspot/logo" %}

{# Page Footer #}
{% module "page_footer" path="@hubspot/page_footer" %}

{# Video #}
{% module "video" path="@hubspot/video" %}

{# Social Follow #}
{% module "social_follow" path="@hubspot/social_follow" %}

{# Language Switcher #}
{% module "language_switcher" path="@hubspot/language_switcher" %}
```

---

# 4. TEMPLATES (High Priority)

## Template Overview

Templates define the structure and layout of pages, blog posts, and other content types in HubSpot.

**Sources:**
- [Templates Overview](https://developers.hubspot.com/docs/cms/building-blocks/templates)
- [HTML + HubL Templates](https://developers.hubspot.com/docs/cms/building-blocks/templates/html-hubl-templates)
- [Blog Templates](https://developers.hubspot.com/docs/cms/building-blocks/templates/blog)
- [Drag and Drop Areas](https://developers.hubspot.com/docs/cms/building-blocks/templates/drag-and-drop-areas)

---

## Template Annotations

Template annotations configure settings at the top of template files.

```hubl
<!--
  templateType: page
  isAvailableForNewContent: true
  label: Homepage
  screenshotPath: ../images/template-previews/home.png
  enableDomainStylesheets: false
-->
```

### Annotation Options

| Annotation | Values | Description |
|------------|--------|-------------|
| `templateType` | `page`, `blog_listing`, `blog_post`, `blog`, `email`, `section` | Template type |
| `isAvailableForNewContent` | `true`, `false` | Show in template picker |
| `label` | string | Display name |
| `screenshotPath` | path | Preview image |
| `enableDomainStylesheets` | `true`, `false` | Include domain CSS |
| `hiddenModules` | array | Modules to hide in editor |
| `hiddenSections` | array | Sections to hide in editor |

---

## Required Template Variables

All templates must include these variables:

```hubl
<!DOCTYPE html>
<html lang="{{ html_lang }}" {{ html_lang_dir }}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  {{ standard_header_includes }}
  <title>{{ page_meta.html_title }}</title>
  <meta name="description" content="{{ page_meta.meta_description }}">
  {{ require_css(get_asset_url("./css/main.css")) }}
</head>
<body>
  {# Page content here #}

  {{ standard_footer_includes }}
</body>
</html>
```

**Required:**
- `{{ standard_header_includes }}` - In `<head>`
- `{{ standard_footer_includes }}` - Before `</body>`

---

## Page Templates

### Basic Page Template

```hubl
<!--
  templateType: page
  isAvailableForNewContent: true
  label: Standard Page
  screenshotPath: ../images/template-previews/standard.png
-->
{% extends "./layouts/base.html" %}

{% block content %}
  {% dnd_area "main_content"
    label="Main Content"
    class="main-content"
  %}
    {% dnd_section %}
      {% dnd_column %}
        {% dnd_module
          path="@hubspot/rich_text"
          html="<h1>Page Title</h1><p>Your content here...</p>"
        %}
        {% end_dnd_module %}
      {% end_dnd_column %}
    {% end_dnd_section %}
  {% end_dnd_area %}
{% endblock %}
```

---

## Blog Templates

### Blog Listing Template

```hubl
<!--
  templateType: blog_listing
  isAvailableForNewContent: true
  label: Blog Listing
  screenshotPath: ../images/template-previews/blog-listing.png
-->
{% extends "./layouts/base.html" %}

{% block content %}
<div class="blog-listing">
  <h1>{{ group.public_title }}</h1>

  {% for content in contents %}
    <article class="blog-post-card">
      {% if content.featured_image %}
        <img src="{{ content.featured_image }}" alt="{{ content.featured_image_alt_text }}">
      {% endif %}

      <h2>
        <a href="{{ content.absolute_url }}">{{ content.name }}</a>
      </h2>

      <p class="meta">
        {{ content.publish_date|format_datetime("MMMM d, yyyy") }}
        {% if content.blog_author %}
          by {{ content.blog_author.display_name }}
        {% endif %}
      </p>

      <p>{{ content.post_summary|truncatehtml(200) }}</p>

      <a href="{{ content.absolute_url }}">Read More</a>
    </article>
  {% else %}
    <p>No posts found.</p>
  {% endfor %}

  {# Pagination #}
  {% if contents.total_page_count > 1 %}
    <nav class="pagination">
      {% if contents.has_previous %}
        <a href="{{ blog_page_link(contents.previous_page_number) }}">Previous</a>
      {% endif %}

      <span>Page {{ contents.page_number }} of {{ contents.total_page_count }}</span>

      {% if contents.has_next %}
        <a href="{{ blog_page_link(contents.next_page_number) }}">Next</a>
      {% endif %}
    </nav>
  {% endif %}
</div>
{% endblock %}
```

### Blog Post Template

```hubl
<!--
  templateType: blog_post
  isAvailableForNewContent: true
  label: Blog Post
  screenshotPath: ../images/template-previews/blog-post.png
-->
{% extends "./layouts/base.html" %}

{% block content %}
<article class="blog-post">
  <header>
    <h1>{{ content.name }}</h1>

    <p class="meta">
      Published {{ content.publish_date|format_datetime("MMMM d, yyyy") }}
      {% if content.blog_author %}
        by <a href="{{ blog_author_url(group.id, content.blog_author.slug) }}">
          {{ content.blog_author.display_name }}
        </a>
      {% endif %}
    </p>

    {% if content.tag_list %}
      <div class="tags">
        {% for tag in content.tag_list %}
          <a href="{{ blog_tag_url(group.id, tag.slug) }}">{{ tag.name }}</a>
        {% endfor %}
      </div>
    {% endif %}
  </header>

  {% if content.featured_image %}
    <img src="{{ content.featured_image }}"
         alt="{{ content.featured_image_alt_text }}"
         class="featured-image">
  {% endif %}

  <div class="post-body">
    {{ content.post_body }}
  </div>

  {# Author bio #}
  {% if content.blog_author %}
    <div class="author-bio">
      {% if content.blog_author.avatar %}
        <img src="{{ content.blog_author.avatar }}" alt="{{ content.blog_author.display_name }}">
      {% endif %}
      <div>
        <h4>{{ content.blog_author.display_name }}</h4>
        {{ content.blog_author.bio }}
      </div>
    </div>
  {% endif %}

  {# Related posts #}
  {% set related = blog_recent_tag_posts(group.id, content.tag_list[0].slug, 3) %}
  {% if related %}
    <section class="related-posts">
      <h3>Related Posts</h3>
      <div class="post-grid">
        {% for post in related if post.id != content.id %}
          <a href="{{ post.absolute_url }}">{{ post.name }}</a>
        {% endfor %}
      </div>
    </section>
  {% endif %}
</article>
{% endblock %}
```

### Blog Variables Reference

```hubl
{# Listing page variables #}
{{ group.id }}                    {# Blog ID #}
{{ group.public_title }}          {# Blog name #}
{{ group.absolute_url }}          {# Blog URL #}
{{ contents }}                    {# Array of posts #}
{{ contents.total_count }}        {# Total posts #}
{{ contents.page_number }}        {# Current page #}
{{ contents.total_page_count }}   {# Total pages #}
{{ contents.has_previous }}       {# Has previous page #}
{{ contents.has_next }}           {# Has next page #}

{# Post variables #}
{{ content.id }}                  {# Post ID #}
{{ content.name }}                {# Post title #}
{{ content.absolute_url }}        {# Post URL #}
{{ content.publish_date }}        {# Publish timestamp #}
{{ content.updated }}             {# Updated timestamp #}
{{ content.featured_image }}      {# Featured image URL #}
{{ content.featured_image_alt_text }}
{{ content.post_body }}           {# Full post content #}
{{ content.post_summary }}        {# Post excerpt #}
{{ content.blog_author }}         {# Author object #}
{{ content.tag_list }}            {# Array of tags #}
{{ content.topic_list }}          {# Array of topics #}
{{ content.comment_count }}       {# Number of comments #}
```

---

## Drag and Drop Areas

### DnD Hierarchy

```
dnd_area
  └── dnd_section (required top-level container)
        ├── dnd_column
        │     └── dnd_module
        └── dnd_row
              └── dnd_column
                    └── dnd_module
```

### dnd_area

```hubl
{% dnd_area "main_content"
  label="Main Content",
  class="main-content-wrapper"
%}
  {# Default content goes here #}
{% end_dnd_area %}
```

### dnd_section

```hubl
{% dnd_section
  vertical_alignment="MIDDLE",
  background_color={
    "color": "#f5f5f5",
    "opacity": 100
  },
  padding={
    "top": 60,
    "bottom": 60
  },
  max_width=1200,
  margin={
    "left": "auto",
    "right": "auto"
  }
%}
  {# Section content #}
{% end_dnd_section %}
```

#### dnd_section Parameters

| Parameter | Description |
|-----------|-------------|
| `vertical_alignment` | `TOP`, `MIDDLE`, `BOTTOM` |
| `background_color` | `{ "color": "#hex", "opacity": 0-100 }` |
| `background_image` | `{ "backgroundPosition": "...", "backgroundSize": "cover" }` |
| `background_linear_gradient` | Gradient configuration |
| `padding` | `{ "top": px, "right": px, "bottom": px, "left": px }` |
| `margin` | Margin configuration |
| `max_width` | Maximum width in pixels |

### dnd_row

```hubl
{% dnd_row %}
  {% dnd_column
    width=6
  %}
    {# Left column (50%) #}
  {% end_dnd_column %}

  {% dnd_column
    width=6
  %}
    {# Right column (50%) #}
  {% end_dnd_column %}
{% end_dnd_row %}
```

### dnd_column

```hubl
{% dnd_column
  width=6,
  offset=0,
  vertical_alignment="MIDDLE",
  background_color={
    "color": "#ffffff",
    "opacity": 100
  },
  padding={
    "top": 20,
    "right": 20,
    "bottom": 20,
    "left": 20
  }
%}
  {# Column content #}
{% end_dnd_column %}
```

**Grid System:** 12-column grid. Width values: 1-12.

### dnd_module

```hubl
{% dnd_module
  path="@hubspot/rich_text",
  html="<h2>Default Heading</h2><p>Default content...</p>"
%}
{% end_dnd_module %}

{# Custom module with field overrides #}
{% dnd_module
  path="./modules/card.module",
  heading="Card Title",
  image={
    "src": "{{ get_asset_url('./assets/placeholder.jpg') }}",
    "alt": "Placeholder"
  }
%}
{% end_dnd_module %}

{# Module with offset and width #}
{% dnd_module
  path="@hubspot/rich_text",
  offset=2,
  width=8
%}
{% end_dnd_module %}
```

### Complete DnD Example

```hubl
{% dnd_area "page_content" %}
  {# Hero Section #}
  {% dnd_section
    background_image={
      "backgroundPosition": "CENTER",
      "backgroundSize": "cover",
      "imageUrl": "{{ get_asset_url('./assets/hero-bg.jpg') }}"
    },
    padding={
      "top": 120,
      "bottom": 120
    }
  %}
    {% dnd_column
      width=8,
      offset=2
    %}
      {% dnd_module
        path="./modules/hero.module",
        heading="Welcome to Our Site",
        subheading="Your success starts here"
      %}
      {% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_section %}

  {# Three Column Features #}
  {% dnd_section
    max_width=1200,
    padding={
      "top": 60,
      "bottom": 60
    }
  %}
    {% dnd_row %}
      {% dnd_column width=4 %}
        {% dnd_module path="./modules/feature-card.module" %}
        {% end_dnd_module %}
      {% end_dnd_column %}

      {% dnd_column width=4 %}
        {% dnd_module path="./modules/feature-card.module" %}
        {% end_dnd_module %}
      {% end_dnd_column %}

      {% dnd_column width=4 %}
        {% dnd_module path="./modules/feature-card.module" %}
        {% end_dnd_module %}
      {% end_dnd_column %}
    {% end_dnd_row %}
  {% end_dnd_section %}
{% end_dnd_area %}
```

---

## Section Templates

Reusable sections that can be added to any dnd_area.

```hubl
<!--
  templateType: section
  label: CTA Banner
  description: "A full-width call-to-action banner"
  isAvailableForNewContent: true
  screenshotPath: ../images/section-previews/cta-banner.png
-->
{% dnd_section
  background_color={
    "color": "#0033A0",
    "opacity": 100
  },
  padding={
    "top": 60,
    "bottom": 60
  }
%}
  {% dnd_column width=8 offset=2 %}
    {% dnd_module
      path="./modules/cta-banner.module",
      heading="Ready to Get Started?",
      button_text="Contact Us",
      button_url="/contact"
    %}
    {% end_dnd_module %}
  {% end_dnd_column %}
{% end_dnd_section %}
```

---

## CLI: Creating Templates

```bash
# Create a new template
hs create template my-template

# Template types available:
# - page-template
# - email-template
# - partial
# - global-partial
# - blog-listing-template
# - blog-post-template
# - search-template
# - section

# Create specific template type
hs create template --template-type page-template my-page

# Create template with destination
hs create template my-template ./src/templates
```

---

# 5. CLI WORKFLOW

## CLI Overview

The HubSpot CLI enables local development with your preferred tools and workflows.

**Sources:**
- [HubSpot CLI Commands](https://developers.hubspot.com/docs/cms/developer-reference/local-development-cli)
- [Getting Started with Local Development](https://developers.hubspot.com/docs/cms/guides/getting-started-with-local-development)

---

## Installation

```bash
# Global installation (recommended)
npm install -g @hubspot/cli

# Project-specific installation
npm install @hubspot/cli

# Verify installation
hs --version
```

---

## Authentication & Setup

### Initialize Connection

```bash
# Initialize HubSpot connection
hs init

# Follow prompts to:
# 1. Choose authentication method
# 2. Enter personal access key (from HubSpot settings)
# 3. Select account
```

### Configuration File

Creates `hubspot.config.yml`:

```yaml
defaultPortal: my-account
portals:
  - name: my-account
    portalId: 12345678
    authType: personalaccesskey
    personalAccessKey: >-
      your-personal-access-key-here
```

### Multiple Accounts

```bash
# Add another account
hs auth

# Specify account for commands
hs upload src/theme my-theme --account=client-account

# Switch default account
hs accounts use client-account
```

---

## Create Commands

### Create Theme

```bash
# Create from boilerplate
hs create website-theme my-theme

# Structure created:
# my-theme/
# ├── src/
# │   └── theme/
# │       ├── css/
# │       ├── js/
# │       ├── modules/
# │       ├── templates/
# │       ├── fields.json
# │       └── theme.json
# └── package.json
```

### Create Module

```bash
# Create module interactively
hs create module my-module

# Create with destination
hs create module my-module ./src/modules

# Prompts for:
# - Module label
# - Host template types
# - Global module (yes/no)
```

### Create Template

```bash
# Create template
hs create template my-template

# Create specific type
hs create template --template-type page-template my-page
hs create template --template-type blog-listing-template blog-listing
hs create template --template-type section my-section

# Template types:
# - page-template
# - email-template
# - partial
# - global-partial
# - blog-listing-template
# - blog-post-template
# - search-template
# - section
```

### Create Serverless Function

```bash
# Create serverless function
hs create function my-function

# Prompts for:
# - Function folder name
# - Endpoint path
# - HTTP method (GET, POST, etc.)
```

---

## Upload & Watch

### Upload Files

```bash
# Upload directory
hs upload <local-src> <remote-dest>

# Examples:
hs upload src/theme my-theme
hs upload ./my-module.module my-theme/modules/my-module.module

# Upload specific account
hs upload src/theme my-theme --account=client-account
```

### Watch for Changes

```bash
# Watch directory (auto-upload on save)
hs watch <local-src> <remote-dest>

# Example:
hs watch src/theme my-theme

# Watch with specific account
hs watch src/theme my-theme --account=client-account

# Stop watch: Ctrl+C
```

### Theme Preview (Local Development)

```bash
# Preview theme locally (without uploading)
cd my-theme
hs theme preview

# Opens at https://hslocal.net:3000/
# Auto-refreshes on file changes
```

---

## Fetch Commands

### Fetch Files from HubSpot

```bash
# Fetch directory
hs fetch <remote-src> [local-dest]

# Examples:
hs fetch my-theme ./local-theme
hs fetch @hubspot/rich_text.module ./reference

# Fetch with overwrite
hs fetch my-theme ./local-theme --overwrite

# Fetch from specific account
hs fetch my-theme ./local-theme --account=client-account
```

### Fetch Default Modules

```bash
# Fetch HubSpot default modules for reference
hs fetch @hubspot/rich_text.module ./default-modules/
hs fetch @hubspot/form.module ./default-modules/
hs fetch @hubspot/menu.module ./default-modules/
```

---

## Validation

### Validate Theme

```bash
# Upload first, then validate
hs upload src/theme my-theme
hs theme validate my-theme
```

### Validate Module

```bash
# Upload first, then validate
hs upload my-module.module theme/modules/my-module.module
hs module validate theme/modules/my-module.module
```

---

## HubDB Commands

```bash
# List HubDB tables
hs hubdb list

# Fetch table data
hs hubdb fetch <table-name-or-id> <dest>

# Clear table rows
hs hubdb clear <table-name-or-id>

# Delete table
hs hubdb delete <table-name-or-id>
```

---

## File Management

```bash
# List remote files
hs ls [remote-path]
hs ls my-theme/modules

# Remove remote files
hs rm <remote-path>
```

---

## Secrets Management

```bash
# Add a secret
hs secrets add MY_API_KEY

# List secrets
hs secrets list

# Delete a secret
hs secrets delete MY_API_KEY
```

---

## Development Workflow Best Practices

### Initial Setup

```bash
# 1. Install CLI globally
npm install -g @hubspot/cli

# 2. Create project directory
mkdir my-client-theme && cd my-client-theme

# 3. Initialize HubSpot connection
hs init

# 4. Create theme from boilerplate
hs create website-theme my-theme

# 5. Upload theme
hs upload my-theme/src/theme my-theme

# 6. Start watching for changes
hs watch my-theme/src/theme my-theme
```

### Daily Development

```bash
# Start development session
cd my-client-theme
hs watch my-theme/src/theme my-theme

# Or use local preview (no upload)
cd my-theme
hs theme preview
```

### Fetch Latest from HubSpot

```bash
# When changes made in HubSpot Design Manager
hs fetch my-theme ./my-theme/src/theme --overwrite
```

### Multiple Environments

```bash
# Development account
hs upload src/theme my-theme --account=dev

# Staging account
hs upload src/theme my-theme --account=staging

# Production account
hs upload src/theme my-theme --account=production
```

---

# 6. BEST PRACTICES & PERFORMANCE OPTIMIZATION

## Theme Development Best Practices

**Sources:**
- [Optimizing HubSpot CMS for Speed](https://developers.hubspot.com/docs/cms/guides/speed)
- [Theme Marketplace Requirements](https://developers.hubspot.com/docs/cms/marketplace-guidelines/theme-requirements)
- [HubSpot CMS Boilerplate](https://github.com/HubSpot/cms-theme-boilerplate)

---

## Use the CMS Boilerplate

The HubSpot CMS Boilerplate is optimized for performance:

```bash
hs create website-theme my-theme
```

**Benefits:**
- Pre-optimized file structure
- Performance best practices built-in
- Modern CSS and JS patterns
- Accessibility compliance

---

## CSS Best Practices

### Modular CSS Architecture

```
css/
├── _variables.css      # Theme field CSS variables
├── _base.css           # Reset, typography, base
├── _utilities.css      # Utility classes
├── _components.css     # Reusable components
├── _layout.css         # Grid, containers
└── main.css            # Main entry (imports others)
```

### Use CSS Custom Properties (Variables)

```css
/* _variables.css - Generated from theme fields */
:root {
  --primary-color: {{ theme.colors.primary_color.color }};
  --secondary-color: {{ theme.colors.secondary_color.color }};
  --heading-font: {{ theme.typography.heading_font.font }};
  --body-font: {{ theme.typography.body_font.font }};
  --base-spacing: 1rem;
  --max-width: 1200px;
}

/* Use variables throughout */
.button-primary {
  background-color: var(--primary-color);
  font-family: var(--heading-font);
}
```

### Module-Level CSS

- Put module-specific CSS in `module.css`
- Only loads when module is used
- Automatically bundled and minified

```css
/* module.css - No HubL allowed */
.my-module {
  /* Module-specific styles */
}
```

---

## JavaScript Best Practices

### Modern, Modular JavaScript

```javascript
// Use modern ES6+ syntax
const initModule = (element) => {
  const config = JSON.parse(element.dataset.config);

  // Module logic here
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.my-module').forEach(initModule);
});
```

### Defer Non-Critical Scripts

```json
// meta.json
{
  "js_render_options": {
    "position": "footer",
    "async": true
  }
}
```

### Avoid Heavy Libraries

- Prefer native JavaScript over jQuery
- Use lightweight alternatives when possible
- Tree-shake unused code

---

## Image Optimization

### Use Responsive Images

```hubl
{% if module.image.src %}
  <img
    src="{{ module.image.src }}"
    alt="{{ module.image.alt }}"
    loading="{{ module.image.loading|default('lazy') }}"
    width="{{ module.image.width }}"
    height="{{ module.image.height }}"
  >
{% endif %}
```

### Lazy Loading

- Enable lazy loading for below-the-fold images
- HubSpot supports native lazy loading
- Use `loading="lazy"` attribute

### Image Field Configuration

```json
{
  "type": "image",
  "name": "image",
  "responsive": true,
  "resizable": true,
  "show_loading": true,
  "default": {
    "loading": "lazy"
  }
}
```

### Compress Before Upload

- Use TinyPNG, ImageOptim, or similar
- HubSpot auto-converts to WebP
- Use appropriate dimensions

---

## Core Web Vitals

### Target Metrics

| Metric | Target | Description |
|--------|--------|-------------|
| LCP (Largest Contentful Paint) | < 2.5s | Loading performance |
| FID (First Input Delay) | < 100ms | Interactivity |
| CLS (Cumulative Layout Shift) | < 0.1 | Visual stability |

### Optimization Tips

**LCP:**
- Optimize hero images
- Preload critical assets
- Use fast web fonts

**FID:**
- Minimize JavaScript
- Break up long tasks
- Use web workers for heavy computation

**CLS:**
- Set explicit dimensions on images/videos
- Avoid inserting content above existing content
- Use transform for animations

---

## Performance Testing

### HubSpot Tools

```bash
# Website Grader
https://website.grader.com/

# Code Alerts (Enterprise)
# Available in HubSpot Settings > Website > Code Alerts
```

### External Tools

- Google PageSpeed Insights
- Lighthouse
- WebPageTest
- GTmetrix

---

## Accessibility Best Practices

### Semantic HTML

```hubl
<header>
  <nav aria-label="Main navigation">
    {% module "menu" path="@hubspot/menu" %}
  </nav>
</header>

<main>
  <article>
    <h1>{{ content.name }}</h1>
    {# Content #}
  </article>
</main>

<footer>
  {# Footer content #}
</footer>
```

### ARIA Labels

```hubl
<button aria-label="Close menu" aria-expanded="false">
  <span class="sr-only">Close</span>
</button>

<nav aria-label="Breadcrumb">
  {# Breadcrumb navigation #}
</nav>
```

### Color Contrast

- Ensure 4.5:1 contrast ratio for normal text
- Ensure 3:1 contrast ratio for large text
- Test with accessibility tools

---

## Common Pitfalls to Avoid

### 1. Loading Too Much CSS/JS Globally

**Bad:**
```hubl
{{ require_css(get_asset_url("./css/all-modules.css")) }}
```

**Good:**
- Use module.css for module-specific styles
- Only load what's needed per page

### 2. Not Setting Image Dimensions

**Bad:**
```hubl
<img src="{{ image.src }}" alt="{{ image.alt }}">
```

**Good:**
```hubl
<img src="{{ image.src }}" alt="{{ image.alt }}" width="{{ image.width }}" height="{{ image.height }}">
```

### 3. Using Icon Fonts for All Icons

**Problem:** Loading entire Font Awesome for a few icons

**Solution:**
- Use inline SVG for small icon sets
- Load icons lazily
- Consider icon sprites

### 4. Blocking JavaScript in Head

**Bad:**
```json
{
  "js_render_options": {
    "position": "head"
  }
}
```

**Good:**
```json
{
  "js_render_options": {
    "position": "footer",
    "async": true
  }
}
```

### 5. Not Using Theme Fields

**Problem:** Hardcoding colors and fonts

**Solution:** Use theme fields for customizable values:

```hubl
<style>
  .header {
    background-color: {{ theme.colors.primary_color.color }};
    font-family: {{ theme.typography.heading_font.font }};
  }
</style>
```

---

## Marketplace Theme Requirements

For themes intended for the HubSpot Marketplace:

### Required Fields
- `primary_color`
- `secondary_color`
- At least 3 color fields total
- `heading_font`
- `body_font`

### Required Features
- Mobile responsive
- Accessible (WCAG 2.1 Level A)
- Cross-browser compatible
- Performance optimized

### Documentation
- Clear README
- Template descriptions
- Module documentation
- Customization guide

---

## Quick Reference Cheat Sheet

### CLI Commands

```bash
# Setup
npm install -g @hubspot/cli
hs init

# Create
hs create website-theme <name>
hs create module <name>
hs create template <name>

# Upload/Watch
hs upload <src> <dest>
hs watch <src> <dest>
hs theme preview

# Fetch
hs fetch <src> [dest]
hs fetch @hubspot/<module>.module ./ref
```

### HubL Essentials

```hubl
{# Variables #}
{{ variable }}
{% set my_var = "value" %}

{# Conditionals #}
{% if condition %}{% elif %}{% else %}{% endif %}

{# Loops #}
{% for item in items %}{% endfor %}

{# Includes #}
{% include "./path.html" %}
{% global_partial path="./path.html" %}

{# Macros #}
{% macro name(params) %}{% endmacro %}
{{ name(args) }}

{# Modules #}
{% module "name" path="./path.module" %}
{% dnd_module path="@hubspot/rich_text" %}{% end_dnd_module %}

{# Drag & Drop #}
{% dnd_area "name" %}
  {% dnd_section %}
    {% dnd_column width=6 %}
      {% dnd_module path="..." %}{% end_dnd_module %}
    {% end_dnd_column %}
  {% end_dnd_section %}
{% end_dnd_area %}
```

### Common Filters

```hubl
{{ text|truncate(100) }}
{{ date|format_datetime("MMMM d, yyyy") }}
{{ html|sanitize_html }}
{{ value|escape_html }}
{{ list|join(", ") }}
{{ obj|pprint }}  {# Debug #}
```

### Essential Variables

```hubl
{{ content.name }}
{{ content.absolute_url }}
{{ request.path }}
{{ standard_header_includes }}
{{ standard_footer_includes }}
{{ get_asset_url("./path/file.ext") }}
```

---

# Document Information

**Created:** January 2026
**Purpose:** Professional HubSpot CMS development reference for Sidekick Strategies
**Maintainer:** Development Team

## Source Documentation

- [HubSpot Developer Documentation](https://developers.hubspot.com/docs/cms)
- [HubSpot CMS Boilerplate](https://github.com/HubSpot/cms-theme-boilerplate)
- [HubL Cheat Sheet](https://bootstrapcreative.com/resources/hubspot-hubl-docs-cheat-sheet/)
- [Theme Requirements](https://developers.hubspot.com/docs/cms/marketplace-guidelines/theme-requirements)

---

*This document represents current HubSpot CMS best practices as of January 2026. HubSpot regularly updates their platform, so always refer to official documentation for the latest features and changes.*
