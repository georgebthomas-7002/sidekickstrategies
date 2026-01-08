# HubL Reference Guide

Complete reference for HubSpot's templating language (HubL).

## Syntax Overview

### Variables
```jinja
{# Output a variable #}
{{ variable_name }}

{# Access nested properties #}
{{ content.name }}
{{ module.field_name }}
{{ theme.colors.primary.color }}

{# With default value #}
{{ variable|default("fallback") }}
```

### Statements
```jinja
{# Control flow and logic #}
{% if condition %}...{% endif %}
{% for item in items %}...{% endfor %}
{% set variable = value %}
```

### Comments
```jinja
{# This is a comment - not rendered in output #}
```

## Variables Reference

### Standard Variables

| Variable | Description |
|----------|-------------|
| `content` | Current page/post content object |
| `content.name` | Page title |
| `content.meta_description` | Meta description |
| `content.absolute_url` | Full page URL |
| `content.slug` | URL slug |
| `content.language` | Page language code |
| `content.publish_date` | Publication date |
| `content.updated` | Last updated date |
| `content.created` | Creation date |
| `content.author` | Author object |
| `content.featured_image` | Featured image URL |
| `content.featured_image_alt_text` | Featured image alt text |

### Request Variables

| Variable | Description |
|----------|-------------|
| `request.path` | Current URL path |
| `request.full_url` | Complete request URL |
| `request.domain` | Current domain |
| `request.remote_ip` | Visitor IP address |
| `request.query_dict` | URL query parameters as dict |
| `request.query` | URL query string |
| `request.referrer` | Referrer URL |
| `request.headers` | Request headers dict |

### Module Variables

| Variable | Description |
|----------|-------------|
| `module` | Current module context |
| `module.field_name` | Access module field value |
| `widget_data` | Raw module data |

### Theme Variables

| Variable | Description |
|----------|-------------|
| `theme` | Theme settings from fields.json |
| `theme.field_group.field_name` | Nested theme field |

### Blog Variables (in blog context)

| Variable | Description |
|----------|-------------|
| `blog` | Current blog object |
| `blog.name` | Blog name |
| `blog.absolute_url` | Blog listing URL |
| `blog_post` | Current blog post (on post page) |
| `blog_author` | Current author (on author page) |
| `tag` | Current tag (on tag page) |
| `topic` | Current topic (on topic page) |

## Control Flow Tags

### If/Elif/Else
```jinja
{% if content.featured_image %}
  <img src="{{ content.featured_image }}" alt="{{ content.featured_image_alt_text }}">
{% elif content.author.avatar %}
  <img src="{{ content.author.avatar }}" alt="{{ content.author.name }}">
{% else %}
  <img src="{{ get_asset_url('../images/default.jpg') }}" alt="Default">
{% endif %}
```

### For Loops
```jinja
{# Basic loop #}
{% for item in items %}
  <li>{{ item.name }}</li>
{% endfor %}

{# Loop with index #}
{% for item in items %}
  <li>{{ loop.index }}: {{ item.name }}</li>
{% endfor %}

{# Loop with else (when empty) #}
{% for post in blog_recent_posts('default', 5) %}
  <article>{{ post.name }}</article>
{% else %}
  <p>No posts found</p>
{% endfor %}
```

### Loop Variables

| Variable | Description |
|----------|-------------|
| `loop.index` | Current iteration (1-indexed) |
| `loop.index0` | Current iteration (0-indexed) |
| `loop.first` | True if first iteration |
| `loop.last` | True if last iteration |
| `loop.length` | Total number of items |
| `loop.revindex` | Iterations remaining (1-indexed) |
| `loop.cycle()` | Cycle through values |

```jinja
{% for item in items %}
  <div class="{{ loop.cycle('odd', 'even') }}">{{ item }}</div>
{% endfor %}
```

### Set Variables
```jinja
{# Simple assignment #}
{% set page_title = content.name %}

{# Computed value #}
{% set full_name = content.author.first_name ~ " " ~ content.author.last_name %}

{# From filter #}
{% set excerpt = content.post_body|truncatehtml(200) %}
```

## Functions Reference

### Asset Functions

| Function | Description | Example |
|----------|-------------|---------|
| `get_asset_url(path)` | Get URL for theme asset | `{{ get_asset_url('../images/logo.png') }}` |
| `get_public_template_url(path)` | Get URL for template file | `{{ get_public_template_url('page.html') }}` |

### Blog Functions

```jinja
{# Get recent posts #}
{% set posts = blog_recent_posts('default', 5) %}

{# Get posts by tag #}
{% set posts = blog_recent_tag_posts('default', 'news', 5) %}

{# Get posts by author #}
{% set posts = blog_recent_author_posts('default', 'author-slug', 5) %}

{# Get popular posts #}
{% set posts = blog_popular_posts('default', 5) %}

{# Get all tags #}
{% set tags = blog_tags('default', 250) %}

{# Get all authors #}
{% set authors = blog_authors('default', 250) %}

{# Get all topics #}
{% set topics = blog_topics('default', 250) %}

{# Get total post count #}
{% set count = blog_total_post_count('default') %}
```

### Content Functions

```jinja
{# Get content by ID #}
{% set page = content_by_id(12345) %}
<a href="{{ page.absolute_url }}">{{ page.name }}</a>

{# Get content by IDs (multiple) #}
{% set pages = content_by_ids([123, 456, 789]) %}

{# Get pages by tag #}
{% set pages = hubdb_table_rows(12345, "tag=news") %}
```

### Menu Functions

```jinja
{# Render a menu #}
{% menu "menu_id" %}

{# Advanced menu with custom attributes #}
{% menu name="main-menu", id="nav", class="navigation" %}

{# Get menu items as objects #}
{% set menu_items = menu('main-menu') %}
{% for item in menu_items %}
  <a href="{{ item.url }}" {% if item.active %}class="active"{% endif %}>
    {{ item.label }}
  </a>
  {% if item.children %}
    <ul>
      {% for child in item.children %}
        <li><a href="{{ child.url }}">{{ child.label }}</a></li>
      {% endfor %}
    </ul>
  {% endif %}
{% endfor %}
```

### Form Functions

```jinja
{# Embed a HubSpot form #}
{% form "form_id" %}

{# Form with options #}
{% form
  form_to_use="form_id",
  response_type="redirect",
  redirect_url="https://example.com/thank-you"
%}
```

### CTA Functions

```jinja
{# Embed a CTA #}
{% cta "cta_id" %}

{# CTA with alignment #}
{% cta guid="cta_id" align="center" %}
```

### Module Rendering

```jinja
{# Render a HubSpot module #}
{% module "unique_name" path="@hubspot/rich_text" %}

{# Module with label and default values #}
{% module "hero_text"
  path="@hubspot/rich_text",
  label="Hero Text",
  html="<h1>Welcome</h1>"
%}

{# Custom module from theme #}
{% module "card"
  path="../modules/card.module",
  heading="Title",
  body="Description"
%}
```

### Include & Extend

```jinja
{# Include a partial #}
{% include "partials/header.html" %}

{# Include with context #}
{% include "partials/card.html" with {"title": "Hello"} %}

{# Extend a base template #}
{% extends "layouts/base.html" %}

{% block content %}
  <main>Page content here</main>
{% endblock %}
```

### Macros

```jinja
{# Define a macro #}
{% macro button(text, url, class="btn") %}
  <a href="{{ url }}" class="{{ class }}">{{ text }}</a>
{% endmacro %}

{# Use the macro #}
{{ button("Learn More", "/about", "btn btn-primary") }}

{# Import macros from file #}
{% from "macros/buttons.html" import button, link %}
{{ button("Click Me", "/action") }}
```

### HubDB Functions

```jinja
{# Get HubDB table rows #}
{% set rows = hubdb_table_rows(12345) %}

{# With query #}
{% set rows = hubdb_table_rows(12345, "category=news&orderBy=created") %}

{# Get single row #}
{% set row = hubdb_table_row(12345, 1) %}

{# Get table columns #}
{% set columns = hubdb_table_columns(12345) %}
```

### Miscellaneous Functions

```jinja
{# Current year #}
{{ year() }}

{# Current datetime #}
{{ today() }}

{# Range of numbers #}
{% for i in range(1, 6) %}{{ i }}{% endfor %}

{# Personalization token #}
{{ personalization_token("contact.firstname", "there") }}

{# URL with tracking #}
{{ tracked_url("https://example.com") }}

{# Color utilities #}
{{ color_variant(theme.colors.primary.color, -20) }}  {# Darken #}
{{ color_variant(theme.colors.primary.color, 20) }}   {# Lighten #}
```

## Filters Reference

### String Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `capitalize` | Capitalize first letter | `{{ "hello"|capitalize }}` → "Hello" |
| `upper` | Uppercase | `{{ "hello"|upper }}` → "HELLO" |
| `lower` | Lowercase | `{{ "HELLO"|lower }}` → "hello" |
| `title` | Title Case | `{{ "hello world"|title }}` → "Hello World" |
| `trim` | Remove whitespace | `{{ "  hello  "|trim }}` → "hello" |
| `striptags` | Remove HTML tags | `{{ "<p>text</p>"|striptags }}` → "text" |
| `escape` | HTML escape | `{{ "<script>"|escape }}` |
| `safe` | Mark as safe (no escape) | `{{ html_content|safe }}` |
| `replace` | Replace substring | `{{ "hello"|replace("l", "x") }}` → "hexxo" |
| `truncate` | Truncate to length | `{{ text|truncate(100) }}` |
| `truncatehtml` | Truncate preserving HTML | `{{ html|truncatehtml(200) }}` |
| `wordcount` | Count words | `{{ content|wordcount }}` |
| `slugify` | URL-safe slug | `{{ "Hello World"|slugify }}` → "hello-world" |
| `urlencode` | URL encode | `{{ "hello world"|urlencode }}` |
| `md5` | MD5 hash | `{{ email|lower|trim|md5 }}` |
| `split` | Split into list | `{{ "a,b,c"|split(",") }}` |
| `join` | Join list | `{{ items|join(", ") }}` |
| `regex_replace` | Regex replace | `{{ text|regex_replace("[0-9]", "#") }}` |

### Number Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `abs` | Absolute value | `{{ -5|abs }}` → 5 |
| `round` | Round number | `{{ 3.7|round }}` → 4 |
| `int` | Convert to integer | `{{ "42"|int }}` → 42 |
| `float` | Convert to float | `{{ "3.14"|float }}` → 3.14 |
| `filesizeformat` | Human readable size | `{{ 1024|filesizeformat }}` → "1.0 KB" |

### Date/Time Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `datetimeformat` | Format datetime | `{{ content.publish_date|datetimeformat("%B %d, %Y") }}` |
| `unixtimestamp` | Convert to Unix timestamp | `{{ content.publish_date|unixtimestamp }}` |
| `strtotime` | Parse date string | `{{ "2025-01-08"|strtotime }}` |

**Common Date Formats:**
```jinja
{{ date|datetimeformat("%B %d, %Y") }}     {# January 08, 2025 #}
{{ date|datetimeformat("%m/%d/%Y") }}      {# 01/08/2025 #}
{{ date|datetimeformat("%Y-%m-%d") }}      {# 2025-01-08 #}
{{ date|datetimeformat("%I:%M %p") }}      {# 02:30 PM #}
{{ date|datetimeformat("%A") }}            {# Wednesday #}
```

### List/Dict Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `length` | Get length | `{{ items|length }}` |
| `first` | First item | `{{ items|first }}` |
| `last` | Last item | `{{ items|last }}` |
| `reverse` | Reverse list | `{{ items|reverse }}` |
| `sort` | Sort list | `{{ items|sort }}` |
| `sort(attribute='name')` | Sort by attribute | `{{ posts|sort(attribute='publish_date') }}` |
| `unique` | Remove duplicates | `{{ items|unique }}` |
| `random` | Random item | `{{ items|random }}` |
| `batch` | Batch into groups | `{{ items|batch(3) }}` |
| `selectattr` | Filter by attribute | `{{ items|selectattr('active') }}` |
| `rejectattr` | Reject by attribute | `{{ items|rejectattr('hidden') }}` |
| `map` | Map attribute | `{{ items|map(attribute='name') }}` |
| `groupby` | Group by attribute | `{{ items|groupby('category') }}` |
| `dictsort` | Sort dict | `{{ dict|dictsort }}` |
| `attr` | Get attribute | `{{ item|attr('name') }}` |

### JSON Filters

| Filter | Description | Example |
|--------|-------------|---------|
| `tojson` | Convert to JSON | `{{ data|tojson }}` |
| `fromjson` | Parse JSON | `{{ json_string|fromjson }}` |
| `pprint` | Pretty print | `{{ data|pprint }}` |

### Default & Conditional Filters

```jinja
{# Default value #}
{{ variable|default("fallback") }}

{# Boolean default #}
{{ show_widget|default(true) }}

{# First defined value #}
{{ content.custom_title or content.name }}
```

## Operators

### Comparison Operators

| Operator | Description |
|----------|-------------|
| `==` | Equal |
| `!=` | Not equal |
| `<` | Less than |
| `>` | Greater than |
| `<=` | Less than or equal |
| `>=` | Greater than or equal |

### Logical Operators

| Operator | Description |
|----------|-------------|
| `and` | Logical AND |
| `or` | Logical OR |
| `not` | Logical NOT |

### String Operators

| Operator | Description | Example |
|----------|-------------|---------|
| `~` | Concatenate | `{{ "Hello " ~ name }}` |
| `in` | Contains | `{% if "admin" in user.roles %}` |

### Math Operators

| Operator | Description |
|----------|-------------|
| `+` | Addition |
| `-` | Subtraction |
| `*` | Multiplication |
| `/` | Division |
| `//` | Floor division |
| `%` | Modulo |
| `**` | Power |

## Tests

```jinja
{# Check if defined #}
{% if variable is defined %}...{% endif %}

{# Check if none/null #}
{% if variable is none %}...{% endif %}

{# Check type #}
{% if variable is string %}
{% if variable is number %}
{% if variable is iterable %}
{% if variable is mapping %}  {# dict #}
{% if variable is sequence %}  {# list #}

{# Check value #}
{% if count is even %}
{% if count is odd %}
{% if count is divisibleby(3) %}

{# Check content #}
{% if text is containing("search") %}
{% if text is equalto("exact match") %}

{# Within range #}
{% if number is within(1, 10) %}
```

## Practical Examples

### Navigation with Active State
```jinja
{% set nav_items = [
  {"url": "/", "label": "Home"},
  {"url": "/about", "label": "About"},
  {"url": "/services", "label": "Services"},
  {"url": "/contact", "label": "Contact"}
] %}

<nav>
  {% for item in nav_items %}
    <a href="{{ item.url }}"
       {% if request.path == item.url %}class="active"{% endif %}>
      {{ item.label }}
    </a>
  {% endfor %}
</nav>
```

### Responsive Image
```jinja
{% if content.featured_image %}
  <img
    src="{{ content.featured_image }}"
    srcset="{{ resize_image_url(content.featured_image, 400) }} 400w,
            {{ resize_image_url(content.featured_image, 800) }} 800w,
            {{ resize_image_url(content.featured_image, 1200) }} 1200w"
    sizes="(max-width: 600px) 400px, (max-width: 1000px) 800px, 1200px"
    alt="{{ content.featured_image_alt_text|default(content.name) }}"
    loading="lazy"
  >
{% endif %}
```

### Blog Post Card
```jinja
{% macro post_card(post) %}
<article class="post-card">
  {% if post.featured_image %}
    <img src="{{ post.featured_image }}" alt="{{ post.featured_image_alt_text }}">
  {% endif %}
  <div class="post-content">
    <time datetime="{{ post.publish_date|datetimeformat('%Y-%m-%d') }}">
      {{ post.publish_date|datetimeformat("%B %d, %Y") }}
    </time>
    <h2><a href="{{ post.absolute_url }}">{{ post.name }}</a></h2>
    <p>{{ post.post_summary|truncatehtml(150) }}</p>
    <a href="{{ post.absolute_url }}" class="read-more">Read More</a>
  </div>
</article>
{% endmacro %}

{% for post in blog_recent_posts('default', 6) %}
  {{ post_card(post) }}
{% endfor %}
```

### Conditional Content by Page Type
```jinja
{% if is_listing_view %}
  {# Blog listing page #}
  <h1>{{ blog.name }}</h1>
{% elif content.blog_post_author %}
  {# Author page #}
  <h1>Posts by {{ blog_author.display_name }}</h1>
{% elif content.tag %}
  {# Tag page #}
  <h1>Posts tagged "{{ tag.name }}"</h1>
{% else %}
  {# Regular page #}
  <h1>{{ content.name }}</h1>
{% endif %}
```

### Schema.org Structured Data
```jinja
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": {{ content.name|tojson }},
  "datePublished": "{{ content.publish_date|datetimeformat('%Y-%m-%dT%H:%M:%S') }}",
  "dateModified": "{{ content.updated|datetimeformat('%Y-%m-%dT%H:%M:%S') }}",
  "author": {
    "@type": "Person",
    "name": {{ content.author.name|tojson }}
  },
  "image": {{ content.featured_image|tojson }},
  "description": {{ content.meta_description|tojson }}
}
</script>
```

## Debugging

```jinja
{# Print variable structure #}
<pre>{{ variable|pprint }}</pre>

{# Check if variable exists #}
{% if debug %}
  <div class="debug">
    Content ID: {{ content.id }}<br>
    Type: {{ content.type }}<br>
    Template: {{ content.template_path }}
  </div>
{% endif %}

{# Output raw HubL (for documentation) #}
{% raw %}
  {{ this.will.not.be.processed }}
{% endraw %}
```

---
*Part of the HubSpot CMS Skill. See SKILL.md for overview.*
