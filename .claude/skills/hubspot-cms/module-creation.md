# HubSpot Module Creation

Complete guide for creating custom HubSpot CMS modules.

## Module Structure

```
my-module.module/
├── module.html          # HubL template (required)
├── module.css           # Scoped CSS styles
├── module.js            # JavaScript
├── fields.json          # Field definitions (required)
└── meta.json            # Module metadata (required)
```

## meta.json Configuration

```json
{
  "label": "My Custom Module",
  "css_assets": [],
  "external_js": [],
  "global": false,
  "host_template_types": ["PAGE", "BLOG_POST", "BLOG_LISTING"],
  "icon": "../images/module-icons/my-module.svg",
  "is_available_for_new_content": true,
  "js_assets": [],
  "other_assets": [],
  "smart_type": "NOT_SMART",
  "tags": [],
  "categories": ["design"]
}
```

### meta.json Options

| Property | Type | Description |
|----------|------|-------------|
| `label` | string | Display name in editor |
| `global` | boolean | True for global modules (shared across pages) |
| `host_template_types` | array | Where module can be used: PAGE, BLOG_POST, BLOG_LISTING, EMAIL |
| `is_available_for_new_content` | boolean | Show in module picker |
| `icon` | string | Path to SVG icon |
| `css_assets` | array | Additional CSS files |
| `js_assets` | array | Additional JS files |
| `categories` | array | Module categories: design, functionality, media, body_content, structure |

## fields.json - Field Definitions

### Basic Structure

```json
[
  {
    "name": "field_name",
    "label": "Field Label",
    "type": "field_type",
    "required": false,
    "locked": false,
    "default": "default value",
    "help_text": "Helpful description for editors"
  }
]
```

## All Field Types

### Text Fields

#### text (Single Line)
```json
{
  "name": "heading",
  "label": "Heading",
  "type": "text",
  "default": "Welcome",
  "validation_regex": "",
  "allow_new_line": false,
  "show_emoji_picker": false,
  "placeholder": "Enter heading text"
}
```

#### textarea (Multi-line)
```json
{
  "name": "description",
  "label": "Description",
  "type": "textarea",
  "default": "",
  "placeholder": "Enter description"
}
```

#### richtext (WYSIWYG)
```json
{
  "name": "content",
  "label": "Content",
  "type": "richtext",
  "default": "<p>Enter content here</p>",
  "enabled_features": [
    "bold",
    "italic",
    "underline",
    "link",
    "image",
    "lists",
    "heading",
    "alignment"
  ]
}
```

### Media Fields

#### image
```json
{
  "name": "hero_image",
  "label": "Hero Image",
  "type": "image",
  "default": {
    "src": "",
    "alt": "",
    "loading": "lazy",
    "width": 800,
    "height": 600
  },
  "responsive": true,
  "show_loading": true,
  "resizable": true
}
```

#### backgroundimage
```json
{
  "name": "background",
  "label": "Background Image",
  "type": "backgroundimage",
  "default": {
    "src": "",
    "background_position": "MIDDLE_CENTER",
    "background_size": "cover"
  }
}
```

#### videoplayer
```json
{
  "name": "video",
  "label": "Video",
  "type": "videoplayer",
  "default": {
    "player_id": null,
    "conversion_asset": null,
    "loop_video": false,
    "mute_by_default": false,
    "autoplay": false,
    "hide_controls": false,
    "size_type": "auto"
  }
}
```

#### file
```json
{
  "name": "download",
  "label": "Download File",
  "type": "file",
  "default": null,
  "picker": "file"
}
```

#### icon
```json
{
  "name": "icon",
  "label": "Icon",
  "type": "icon",
  "default": {
    "name": "star",
    "type": "FONTAWESOME",
    "unicode": "f005"
  },
  "icon_set": "fontawesome-5.14.0"
}
```

### Choice Fields

#### choice (Dropdown/Radio/Checkbox)
```json
{
  "name": "alignment",
  "label": "Alignment",
  "type": "choice",
  "default": "left",
  "display": "select",
  "choices": [
    ["left", "Left"],
    ["center", "Center"],
    ["right", "Right"]
  ]
}
```

**Display Options:**
- `select` - Dropdown menu
- `radio` - Radio buttons
- `checkbox` - Checkboxes (for multiple selection)

#### boolean (Toggle)
```json
{
  "name": "show_button",
  "label": "Show Button",
  "type": "boolean",
  "default": true,
  "display": "toggle"
}
```

### Color & Styling Fields

#### color
```json
{
  "name": "text_color",
  "label": "Text Color",
  "type": "color",
  "default": {
    "color": "#333333",
    "opacity": 100
  },
  "show_opacity": true
}
```

#### gradient
```json
{
  "name": "background_gradient",
  "label": "Background Gradient",
  "type": "gradient",
  "default": {
    "side_or_corner": {
      "verticalSide": "TOP",
      "horizontalSide": null
    },
    "colors": [
      {
        "color": {
          "r": 255,
          "g": 255,
          "b": 255,
          "a": 1
        }
      },
      {
        "color": {
          "r": 0,
          "g": 0,
          "b": 0,
          "a": 1
        }
      }
    ]
  }
}
```

#### font
```json
{
  "name": "heading_font",
  "label": "Heading Font",
  "type": "font",
  "default": {
    "font": "Lato",
    "font_set": "GOOGLE",
    "size": 32,
    "size_unit": "px",
    "color": "#000000",
    "styles": {
      "font-weight": "bold"
    }
  },
  "load_external_fonts": true
}
```

#### spacing
```json
{
  "name": "padding",
  "label": "Padding",
  "type": "spacing",
  "default": {
    "padding": {
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
}
```

#### border
```json
{
  "name": "border",
  "label": "Border",
  "type": "border",
  "default": {
    "top": {
      "width": {
        "value": 1,
        "units": "px"
      },
      "style": "solid",
      "color": "#cccccc",
      "opacity": 100
    }
  }
}
```

#### alignment
```json
{
  "name": "text_alignment",
  "label": "Text Alignment",
  "type": "alignment",
  "default": {
    "horizontal_align": "LEFT"
  },
  "alignment_direction": "HORIZONTAL"
}
```

### Number Fields

#### number
```json
{
  "name": "columns",
  "label": "Number of Columns",
  "type": "number",
  "default": 3,
  "min": 1,
  "max": 6,
  "step": 1,
  "display": "slider"
}
```

### Link & URL Fields

#### link
```json
{
  "name": "cta_link",
  "label": "CTA Link",
  "type": "link",
  "default": {
    "url": {
      "content_id": null,
      "type": "EXTERNAL",
      "href": ""
    },
    "open_in_new_tab": false,
    "no_follow": false
  },
  "supported_types": ["EXTERNAL", "CONTENT", "FILE", "EMAIL_ADDRESS", "BLOG"]
}
```

#### url
```json
{
  "name": "external_url",
  "label": "External URL",
  "type": "url",
  "default": {
    "type": "EXTERNAL",
    "href": ""
  }
}
```

### HubSpot Integration Fields

#### form
```json
{
  "name": "contact_form",
  "label": "Contact Form",
  "type": "form",
  "default": {
    "response_type": "inline",
    "message": "Thank you for submitting the form."
  }
}
```

#### menu
```json
{
  "name": "navigation",
  "label": "Navigation Menu",
  "type": "menu",
  "default": null
}
```

#### cta
```json
{
  "name": "cta_button",
  "label": "CTA Button",
  "type": "cta",
  "default": null
}
```

#### blog
```json
{
  "name": "blog_to_display",
  "label": "Select Blog",
  "type": "blog",
  "default": null
}
```

#### tag
```json
{
  "name": "filter_tag",
  "label": "Filter by Tag",
  "type": "tag",
  "default": null,
  "tag_value": "slug"
}
```

#### followupemail
```json
{
  "name": "follow_up",
  "label": "Follow-up Email",
  "type": "followupemail",
  "default": null
}
```

#### hubdbtable
```json
{
  "name": "data_table",
  "label": "HubDB Table",
  "type": "hubdbtable",
  "default": null
}
```

#### logo
```json
{
  "name": "site_logo",
  "label": "Site Logo",
  "type": "logo",
  "default": {
    "override_inherited_src": false,
    "src": "",
    "alt": ""
  }
}
```

### Content Reference Fields

#### page
```json
{
  "name": "related_page",
  "label": "Related Page",
  "type": "page",
  "default": null
}
```

#### simplemenu
```json
{
  "name": "simple_menu",
  "label": "Menu Items",
  "type": "simplemenu",
  "default": []
}
```

### Advanced Fields

#### html
```json
{
  "name": "custom_html",
  "label": "Custom HTML",
  "type": "html",
  "default": ""
}
```

#### hubl
```json
{
  "name": "custom_hubl",
  "label": "Custom HubL",
  "type": "hubl",
  "default": ""
}
```

#### embed
```json
{
  "name": "embed_code",
  "label": "Embed Code",
  "type": "embed",
  "default": {
    "source_type": "html",
    "html": ""
  },
  "supported_source_types": ["html", "oembed"]
}
```

## Grouping Fields

### group (Field Group)
```json
{
  "name": "button_settings",
  "label": "Button Settings",
  "type": "group",
  "expanded": true,
  "children": [
    {
      "name": "text",
      "label": "Button Text",
      "type": "text",
      "default": "Learn More"
    },
    {
      "name": "url",
      "label": "Button URL",
      "type": "link",
      "default": {}
    },
    {
      "name": "style",
      "label": "Button Style",
      "type": "choice",
      "choices": [
        ["primary", "Primary"],
        ["secondary", "Secondary"]
      ],
      "default": "primary"
    }
  ]
}
```

### Repeater Fields

```json
{
  "name": "features",
  "label": "Features",
  "type": "group",
  "occurrence": {
    "min": 1,
    "max": 10,
    "default": 3,
    "sorting_label_field": "title"
  },
  "children": [
    {
      "name": "icon",
      "label": "Icon",
      "type": "icon",
      "default": {}
    },
    {
      "name": "title",
      "label": "Title",
      "type": "text",
      "default": "Feature Title"
    },
    {
      "name": "description",
      "label": "Description",
      "type": "textarea",
      "default": "Feature description goes here."
    }
  ],
  "default": [
    {
      "icon": {},
      "title": "Feature 1",
      "description": "Description 1"
    },
    {
      "icon": {},
      "title": "Feature 2",
      "description": "Description 2"
    }
  ]
}
```

## Field Visibility Conditions

Control field visibility based on other field values:

```json
[
  {
    "name": "show_image",
    "label": "Show Image",
    "type": "boolean",
    "default": true
  },
  {
    "name": "image",
    "label": "Image",
    "type": "image",
    "default": {},
    "visibility": {
      "controlling_field_path": "show_image",
      "controlling_value_regex": "true",
      "operator": "EQUAL"
    }
  },
  {
    "name": "layout",
    "label": "Layout",
    "type": "choice",
    "choices": [
      ["grid", "Grid"],
      ["list", "List"],
      ["carousel", "Carousel"]
    ],
    "default": "grid"
  },
  {
    "name": "carousel_settings",
    "label": "Carousel Settings",
    "type": "group",
    "visibility": {
      "controlling_field_path": "layout",
      "controlling_value_regex": "carousel",
      "operator": "EQUAL"
    },
    "children": [
      {
        "name": "autoplay",
        "label": "Autoplay",
        "type": "boolean",
        "default": true
      }
    ]
  }
]
```

**Visibility Operators:**
- `EQUAL` - Field value matches regex
- `NOT_EQUAL` - Field value does not match regex
- `EMPTY` - Field has no value
- `NOT_EMPTY` - Field has a value
- `MATCHES_REGEX` - Full regex match

## module.html Template

```jinja
{# Access field values via module.field_name #}
<div class="my-module {% if module.custom_class %}{{ module.custom_class }}{% endif %}">

  {# Text field #}
  <h2>{{ module.heading }}</h2>

  {# Rich text field #}
  <div class="content">
    {{ module.content }}
  </div>

  {# Image field #}
  {% if module.image.src %}
    <img
      src="{{ module.image.src }}"
      alt="{{ module.image.alt }}"
      loading="{{ module.image.loading }}"
      {% if module.image.width %}width="{{ module.image.width }}"{% endif %}
    >
  {% endif %}

  {# Link field #}
  {% if module.button_link.url.href %}
    <a
      href="{{ module.button_link.url.href }}"
      {% if module.button_link.open_in_new_tab %}target="_blank" rel="noopener"{% endif %}
    >
      {{ module.button_text }}
    </a>
  {% endif %}

  {# Choice field #}
  <div class="align-{{ module.alignment }}">
    Content here
  </div>

  {# Color field #}
  <style>
    .my-module {
      color: {{ module.text_color.color }};
      {% if module.text_color.opacity < 100 %}
        opacity: {{ module.text_color.opacity / 100 }};
      {% endif %}
    }
  </style>

  {# Group/repeater field #}
  {% if module.features %}
    <div class="features">
      {% for feature in module.features %}
        <div class="feature">
          {% icon
            name="{{ feature.icon.name }}"
            style="{{ feature.icon.type }}"
            unicode="{{ feature.icon.unicode }}"
          %}
          <h3>{{ feature.title }}</h3>
          <p>{{ feature.description }}</p>
        </div>
      {% endfor %}
    </div>
  {% endif %}

  {# Form field #}
  {% if module.contact_form %}
    {% form
      form_to_use="{{ module.contact_form.form_id }}"
      response_type="{{ module.contact_form.response_type }}"
      message="{{ module.contact_form.message }}"
    %}
  {% endif %}

</div>
```

## module.css Scoped Styles

```css
/* Styles are automatically scoped to the module */

.my-module {
  padding: 40px 20px;
}

.my-module h2 {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.my-module .features {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 30px;
}

.my-module .feature {
  text-align: center;
  padding: 20px;
}

/* Responsive styles */
@media (max-width: 768px) {
  .my-module {
    padding: 20px 15px;
  }

  .my-module h2 {
    font-size: 1.5rem;
  }
}
```

## module.js JavaScript

```javascript
// JavaScript runs when module loads
(function() {
  // Module initialization
  const modules = document.querySelectorAll('.my-module');

  modules.forEach(function(module) {
    // Add interactivity
    const buttons = module.querySelectorAll('.feature');

    buttons.forEach(function(button) {
      button.addEventListener('click', function() {
        this.classList.toggle('active');
      });
    });
  });
})();
```

## CLI Commands

```bash
# Create new module
hs create module my-module

# Create module in theme
hs create module my-theme/modules/my-module

# Upload module
hs upload my-module.module @hubspot/my-module.module

# Watch for changes
hs watch my-module.module @hubspot/my-module.module

# Fetch module from HubSpot
hs fetch @hubspot/my-module.module ./my-module.module
```

## Best Practices

1. **Field Naming**
   - Use snake_case for field names
   - Make names descriptive but concise
   - Group related fields together

2. **Defaults**
   - Always provide sensible defaults
   - Match expected content structure
   - Test with default values

3. **Accessibility**
   - Include alt text fields for images
   - Use semantic HTML in module.html
   - Support keyboard navigation

4. **Performance**
   - Use lazy loading for images
   - Minimize JavaScript
   - Optimize CSS selectors

5. **Editor Experience**
   - Use clear, descriptive labels
   - Add help_text for complex fields
   - Group related settings
   - Use visibility conditions to reduce clutter

---
*Part of the HubSpot CMS Skill. See SKILL.md for overview.*
