# HubSpot Template Creation

Complete guide for creating HubSpot CMS templates.

## Template Types

| Type | Purpose | Common Use |
|------|---------|------------|
| Page | Standard website pages | Homepage, About, Contact |
| Blog Listing | Blog index/archive | Blog homepage, category pages |
| Blog Post | Individual blog articles | Article detail pages |
| Email | Marketing emails | Newsletters, campaigns |
| System | Error pages, search, etc. | 404, password prompt |
| Partial | Reusable template fragments | Header, footer, sidebar |
| Global Partial | Site-wide reusable content | Global header/footer |

## Template Structure

```
templates/
├── layouts/
│   └── base.html           # Base layout (head, body structure)
├── pages/
│   ├── home.html           # Homepage template
│   ├── about.html          # About page template
│   └── contact.html        # Contact page template
├── blog/
│   ├── blog-listing.html   # Blog index template
│   └── blog-post.html      # Blog post template
├── partials/
│   ├── header.html         # Header partial
│   ├── footer.html         # Footer partial
│   └── sidebar.html        # Sidebar partial
└── system/
    ├── 404.html            # Error page
    ├── password-prompt.html # Password protected page
    └── search-results.html # Search results page
```

## Template Annotations

Every template requires annotations at the top:

```jinja
<!--
  templateType: page
  label: Home Page
  isAvailableForNewContent: true
  screenshotPath: ../images/template-previews/home.png
-->
```

### Required Annotations

| Annotation | Description | Values |
|------------|-------------|--------|
| `templateType` | Type of template | page, blog_listing, blog_post, email, error_page, search_results, password_prompt, subscription_preferences |
| `isAvailableForNewContent` | Show in template picker | true, false |
| `label` | Display name in editor | Any string |

### Optional Annotations

| Annotation | Description |
|------------|-------------|
| `screenshotPath` | Path to preview image |
| `description` | Template description |
| `contentWidth` | For email templates |

## Base Layout Template

```jinja
<!--
  templateType: page
  label: Base Layout
  isAvailableForNewContent: false
-->
<!DOCTYPE html>
<html lang="{{ html_lang }}" {{ html_lang_dir }}>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  {# Standard HubSpot head contents #}
  {{ standard_header_includes }}

  {# Page title - editable in page settings #}
  <title>{{ page_meta.html_title }}</title>

  {# Meta description #}
  <meta name="description" content="{{ page_meta.meta_description }}">

  {# Canonical URL #}
  <link rel="canonical" href="{{ content.absolute_url }}">

  {# Theme CSS #}
  {{ require_css(get_asset_url("../css/main.css")) }}

  {# Custom head code from page editor #}
  {% if content.head_html %}
    {{ content.head_html }}
  {% endif %}

  {# Theme settings CSS variables #}
  <style>
    :root {
      --primary-color: {{ theme.colors.primary.color }};
      --secondary-color: {{ theme.colors.secondary.color }};
      --body-font: {{ theme.typography.body.font }};
      --heading-font: {{ theme.typography.heading.font }};
    }
  </style>
</head>
<body class="{% if content.html_class %}{{ content.html_class }}{% endif %}">

  {# Include header partial #}
  {% include "partials/header.html" %}

  {# Main content area - defined by child templates #}
  <main id="main-content">
    {% block body %}{% endblock body %}
  </main>

  {# Include footer partial #}
  {% include "partials/footer.html" %}

  {# Theme JavaScript #}
  {{ require_js(get_asset_url("../js/main.js")) }}

  {# Standard HubSpot footer (tracking, forms, etc.) #}
  {{ standard_footer_includes }}

  {# Custom footer code #}
  {% if content.footer_html %}
    {{ content.footer_html }}
  {% endif %}

</body>
</html>
```

## Page Template

```jinja
<!--
  templateType: page
  label: Standard Page
  isAvailableForNewContent: true
  screenshotPath: ../images/template-previews/standard-page.png
-->
{% extends "layouts/base.html" %}

{% block body %}

  {# Drag-and-drop area for flexible content #}
  {% dnd_area "main_content"
    label="Main Content"
  %}

    {# Default section with row and column #}
    {% dnd_section %}
      {% dnd_row %}
        {% dnd_column %}

          {# Default module #}
          {% dnd_module
            path="@hubspot/rich_text",
            label="Page Content"
          %}
            {% module_attribute "html" %}
              <h1>{{ content.name }}</h1>
              <p>Add your content here.</p>
            {% end_module_attribute %}
          {% end_dnd_module %}

        {% end_dnd_column %}
      {% end_dnd_row %}
    {% end_dnd_section %}

  {% end_dnd_area %}

{% endblock body %}
```

## Drag-and-Drop Tags

### dnd_area
The main container for drag-and-drop content.

```jinja
{% dnd_area "area_name"
  label="Area Label",
  class="custom-class"
%}
  {# Content here #}
{% end_dnd_area %}
```

**Parameters:**
| Parameter | Description |
|-----------|-------------|
| `label` | Display name in editor |
| `class` | Additional CSS classes |

### dnd_section
A horizontal section (full-width container).

```jinja
{% dnd_section
  vertical_alignment="MIDDLE",
  background_color={
    color: "#ffffff",
    opacity: 100
  },
  padding={
    top: 60,
    bottom: 60
  },
  max_width=1200,
  margin={
    top: 0,
    bottom: 0
  }
%}
  {# Rows here #}
{% end_dnd_section %}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `vertical_alignment` | string | TOP, MIDDLE, BOTTOM |
| `background_color` | object | {color, opacity} |
| `background_image` | object | {backgroundPosition, backgroundSize, src} |
| `background_gradient` | object | Gradient configuration |
| `padding` | object | {top, right, bottom, left} |
| `margin` | object | {top, bottom} |
| `max_width` | number | Maximum width in pixels |

### dnd_row
A row within a section (horizontal grouping of columns).

```jinja
{% dnd_row
  vertical_alignment="MIDDLE",
  horizontal_alignment="CENTER",
  gutter=30
%}
  {# Columns here #}
{% end_dnd_row %}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `vertical_alignment` | string | TOP, MIDDLE, BOTTOM |
| `horizontal_alignment` | string | LEFT, CENTER, RIGHT |
| `gutter` | number | Gap between columns in pixels |

### dnd_column
A column within a row.

```jinja
{% dnd_column
  width=6,
  offset=0,
  vertical_alignment="TOP",
  background_color={},
  padding={}
%}
  {# Modules here #}
{% end_dnd_column %}
```

**Parameters:**
| Parameter | Type | Description |
|-----------|------|-------------|
| `width` | number | Column width (1-12 grid) |
| `offset` | number | Column offset (0-11) |
| `vertical_alignment` | string | TOP, MIDDLE, BOTTOM |
| `background_color` | object | {color, opacity} |
| `padding` | object | {top, right, bottom, left} |

### dnd_module
A module within a column.

```jinja
{% dnd_module
  path="@hubspot/rich_text",
  label="Content"
%}
  {% module_attribute "html" %}
    <p>Default content</p>
  {% end_module_attribute %}
{% end_dnd_module %}
```

**Parameters:**
| Parameter | Description |
|-----------|-------------|
| `path` | Module path (@hubspot/name or ../modules/name.module) |
| `label` | Display label in editor |
| Additional params | Any module field values |

## Blog Listing Template

```jinja
<!--
  templateType: blog_listing
  label: Blog Listing
  isAvailableForNewContent: true
  screenshotPath: ../images/template-previews/blog-listing.png
-->
{% extends "layouts/base.html" %}

{% block body %}

<div class="blog-listing">

  {# Blog header #}
  <header class="blog-header">
    <h1>{{ blog.name }}</h1>
    {% if blog.description %}
      <p>{{ blog.description }}</p>
    {% endif %}
  </header>

  {# Tag/Author page headers #}
  {% if tag %}
    <h2>Posts tagged: {{ tag.name }}</h2>
  {% elif blog_author %}
    <div class="author-header">
      {% if blog_author.avatar %}
        <img src="{{ blog_author.avatar }}" alt="{{ blog_author.display_name }}">
      {% endif %}
      <h2>Posts by {{ blog_author.display_name }}</h2>
      {% if blog_author.bio %}
        <p>{{ blog_author.bio }}</p>
      {% endif %}
    </div>
  {% endif %}

  {# Post listing #}
  <div class="blog-posts">
    {% for post in contents %}
      <article class="post-card">
        {% if post.featured_image %}
          <a href="{{ post.absolute_url }}">
            <img src="{{ post.featured_image }}"
                 alt="{{ post.featured_image_alt_text }}"
                 loading="lazy">
          </a>
        {% endif %}

        <div class="post-content">
          <time datetime="{{ post.publish_date|datetimeformat('%Y-%m-%d') }}">
            {{ post.publish_date|datetimeformat("%B %d, %Y") }}
          </time>

          <h2>
            <a href="{{ post.absolute_url }}">{{ post.name }}</a>
          </h2>

          <p>{{ post.post_summary|truncatehtml(150) }}</p>

          <a href="{{ post.absolute_url }}" class="read-more">
            Read More
          </a>
        </div>
      </article>
    {% endfor %}
  </div>

  {# Pagination #}
  {% if contents.total_page_count > 1 %}
    <nav class="pagination">
      {% if contents.has_previous %}
        <a href="{{ blog_page_link(contents.current_page - 1) }}" class="prev">
          Previous
        </a>
      {% endif %}

      {% for page in range(1, contents.total_page_count + 1) %}
        {% if page == contents.current_page %}
          <span class="current">{{ page }}</span>
        {% else %}
          <a href="{{ blog_page_link(page) }}">{{ page }}</a>
        {% endif %}
      {% endfor %}

      {% if contents.has_next %}
        <a href="{{ blog_page_link(contents.current_page + 1) }}" class="next">
          Next
        </a>
      {% endif %}
    </nav>
  {% endif %}

</div>

{% endblock body %}
```

## Blog Post Template

```jinja
<!--
  templateType: blog_post
  label: Blog Post
  isAvailableForNewContent: true
  screenshotPath: ../images/template-previews/blog-post.png
-->
{% extends "layouts/base.html" %}

{% block body %}

<article class="blog-post">

  {# Post header #}
  <header class="post-header">
    <time datetime="{{ content.publish_date|datetimeformat('%Y-%m-%d') }}">
      {{ content.publish_date|datetimeformat("%B %d, %Y") }}
    </time>

    <h1>{{ content.name }}</h1>

    {% if content.blog_author %}
      <div class="author">
        {% if content.blog_author.avatar %}
          <img src="{{ content.blog_author.avatar }}"
               alt="{{ content.blog_author.display_name }}">
        {% endif %}
        <span>By {{ content.blog_author.display_name }}</span>
      </div>
    {% endif %}

    {# Tags #}
    {% if content.tag_list %}
      <div class="tags">
        {% for tag in content.tag_list %}
          <a href="{{ blog_tag_url(group.id, tag.slug) }}">{{ tag.name }}</a>
        {% endfor %}
      </div>
    {% endif %}
  </header>

  {# Featured image #}
  {% if content.featured_image %}
    <figure class="featured-image">
      <img src="{{ content.featured_image }}"
           alt="{{ content.featured_image_alt_text }}">
      {% if content.featured_image_caption %}
        <figcaption>{{ content.featured_image_caption }}</figcaption>
      {% endif %}
    </figure>
  {% endif %}

  {# Post content #}
  <div class="post-body">
    {{ content.post_body }}
  </div>

  {# Author bio #}
  {% if content.blog_author.bio %}
    <aside class="author-bio">
      <h3>About {{ content.blog_author.display_name }}</h3>
      <p>{{ content.blog_author.bio }}</p>
    </aside>
  {% endif %}

  {# Related posts #}
  {% set related = blog_recent_posts(content.blog.id, 3) %}
  {% if related|length > 0 %}
    <aside class="related-posts">
      <h3>Related Posts</h3>
      <div class="posts-grid">
        {% for post in related %}
          {% if post.id != content.id %}
            <article>
              <a href="{{ post.absolute_url }}">{{ post.name }}</a>
            </article>
          {% endif %}
        {% endfor %}
      </div>
    </aside>
  {% endif %}

  {# Comments (if enabled) #}
  {% if content.comment_list %}
    <section class="comments">
      <h3>Comments</h3>
      {% module "blog_comments" path="@hubspot/blog_comments" %}
    </section>
  {% endif %}

</article>

{% endblock body %}
```

## System Templates

### 404 Error Page
```jinja
<!--
  templateType: error_page
  label: 404 Error Page
  isAvailableForNewContent: false
-->
{% extends "layouts/base.html" %}

{% block body %}

<div class="error-page">
  <h1>404</h1>
  <h2>Page Not Found</h2>
  <p>The page you're looking for doesn't exist or has been moved.</p>
  <a href="/" class="btn">Back to Home</a>
</div>

{% endblock body %}
```

### Search Results
```jinja
<!--
  templateType: search_results
  label: Search Results
  isAvailableForNewContent: false
-->
{% extends "layouts/base.html" %}

{% block body %}

<div class="search-results">
  <h1>Search Results</h1>

  {# Search input #}
  {% module "search_input" path="@hubspot/search_input" %}

  {# Results #}
  {% if search_results %}
    <p>Found {{ search_results.total }} results for "{{ request.query_dict.q }}"</p>

    {% for item in search_results.results %}
      <article class="search-result">
        <h2><a href="{{ item.url }}">{{ item.title }}</a></h2>
        <p>{{ item.description|truncate(200) }}</p>
      </article>
    {% endfor %}

    {# Pagination #}
    {% if search_results.total_pages > 1 %}
      <nav class="pagination">
        {# Pagination links #}
      </nav>
    {% endif %}
  {% else %}
    <p>No results found for "{{ request.query_dict.q }}"</p>
  {% endif %}
</div>

{% endblock body %}
```

## Partials

### Header Partial
```jinja
{# partials/header.html #}
<header class="site-header">
  <div class="container">

    {# Logo #}
    <div class="logo">
      {% if theme.logo.src %}
        <a href="/">
          <img src="{{ theme.logo.src }}"
               alt="{{ theme.logo.alt|default(site_settings.company_name) }}">
        </a>
      {% else %}
        <a href="/">{{ site_settings.company_name }}</a>
      {% endif %}
    </div>

    {# Navigation #}
    <nav class="main-nav" id="main-nav">
      {% menu "main-menu" %}
    </nav>

    {# Mobile menu toggle #}
    <button class="menu-toggle" aria-controls="main-nav" aria-expanded="false">
      <span class="sr-only">Menu</span>
      <span class="hamburger"></span>
    </button>

  </div>
</header>
```

### Footer Partial
```jinja
{# partials/footer.html #}
<footer class="site-footer">
  <div class="container">

    <div class="footer-content">
      {# Footer columns can be modules or hardcoded #}
      <div class="footer-col">
        <h4>About</h4>
        <p>{{ site_settings.company_name }}</p>
      </div>

      <div class="footer-col">
        <h4>Links</h4>
        {% menu "footer-menu" %}
      </div>

      <div class="footer-col">
        <h4>Contact</h4>
        <p>{{ site_settings.company_street_address_1 }}</p>
        <p>{{ site_settings.company_city }}, {{ site_settings.company_state }}</p>
      </div>
    </div>

    <div class="footer-bottom">
      <p>&copy; {{ year() }} {{ site_settings.company_name }}. All rights reserved.</p>
    </div>

  </div>
</footer>
```

## CLI Commands

```bash
# Create page template
hs create template my-page --type=page

# Create blog listing template
hs create template blog-listing --type=blog-listing

# Create blog post template
hs create template blog-post --type=blog-post

# Create partial
hs create template header --type=partial

# Create global partial
hs create template global-header --type=global-partial

# Upload templates
hs upload ./templates @hubspot/templates

# Watch for changes
hs watch ./templates @hubspot/templates
```

## Best Practices

1. **Use Base Layouts**
   - Create a base.html with common elements
   - Extend base in page templates
   - Keep DRY principles

2. **Leverage Partials**
   - Break reusable elements into partials
   - Use global partials for site-wide content
   - Include with context when needed

3. **Drag-and-Drop Areas**
   - Add dnd_areas for flexibility
   - Provide sensible defaults
   - Set appropriate default modules

4. **SEO**
   - Include proper meta tags
   - Use semantic HTML
   - Add structured data where appropriate

5. **Performance**
   - Use lazy loading for images
   - Minimize inline styles
   - Use require_css/require_js

6. **Accessibility**
   - Use semantic HTML elements
   - Add skip links
   - Ensure proper heading hierarchy

---
*Part of the HubSpot CMS Skill. See SKILL.md for overview.*
