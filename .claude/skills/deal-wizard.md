# Deal Creation Wizard

A conversational workflow for creating complete HubSpot deals with line items, quotes, and invoices.

## Triggers
- `/create-deal` - Explicit skill invocation
- "create deal for [name]" - Natural language trigger
- "new deal for [name]" - Natural language trigger
- "deal for [name]" - Natural language trigger

## Context Files
Load these files before starting the workflow:
- `.claude/context/deal-wizard/product-catalog.json` - Products with HubSpot IDs
- `.claude/context/deal-wizard/deal-templates.json` - Deal types and pipeline stages
- `.claude/context/deal-wizard/quote-terms.json` - Quote terms templates
- `.claude/context/deal-wizard/sender-config.json` - Sender and API configuration

## Configuration
- **HubSpot Account ID**: 474711
- **API Token**: From sender-config.json (hubspotApiToken)
- **Default Sender**: George B. Thomas (Owner ID: 2740116)
- **Default Quote Template**: GBT - Quote 2024 (ID: 284147306418)

## Workflow Steps

### Step 1: Contact Lookup
When user provides a name:
1. Use MCP `search_crm_objects` to find the contact
2. If multiple matches, present options and ask user to select
3. If no match, offer to create new contact or search by email
4. Get associated company via MCP search with association filter

```
MCP Query: search_crm_objects(objectType="contacts", query="[name]",
  properties=["firstname", "lastname", "email", "phone", "company"])
```

### Step 2: Deal Type Selection
Present deal type options from deal-templates.json:

```
What type of deal would you like to create for [Contact] at [Company]?

1. Implementation Hours Package - Monthly implementation and strategy hours
2. HubSpot Training - Training and onboarding programs
3. Consulting Sessions - One-time consulting hours
4. CRM Audit - Full CRM audit and roadmap
5. CMS Website Build - HubSpot CMS website development
6. Monthly Retainer - Ongoing monthly support
7. Custom Deal - Select products manually

Which type? (1-7)
```

### Step 3: Product Selection
Based on deal type, show suggested products:

```
For [Deal Type], I recommend:

SUGGESTED PRODUCTS:
| # | Product | Price | Description |
|---|---------|-------|-------------|
| 1 | [Product Name] | $X,XXX | [Brief desc] |
| 2 | [Product Name] | $X,XXX | [Brief desc] |

Enter product numbers to add (e.g., "1" or "1,2"),
or "all" for all suggested, or "list" to see all products.
```

Allow quantity modifications and custom product additions.

### Step 4: Discount Discussion
After product selection:

```
Subtotal: $[amount]

Would you like to apply a discount?

AVAILABLE DISCOUNTS:
- Annual Commitment (10%) - For 12-month commitment
- Nonprofit (15%) - For 501(c)(3) organizations
- Referral (5%) - For referred clients
- Custom percentage (max 25%)

Enter discount type or "none":
```

### Step 5: Deal Stage Selection
Determine appropriate stage based on current month and deal type:

```
For January deals, the default stage is "January Holding".

Current stage options:
1. January Holding (default)
2. January Sent
3. Different month

Which stage? (or press enter for default):
```

### Step 6: Quote Terms
Show terms based on deal type template:

```
I'll use the [Template Name] terms for this quote:

COMMENTS:
[Show comments from template]

TERMS:
[Show terms from template]

Would you like to:
1. Use these terms as-is
2. Modify the terms
3. Use custom terms
```

### Step 7: Confirmation Summary
Present complete summary before creation:

```
DEAL SUMMARY
═══════════════════════════════════════════════════════════

Contact:     [Name] ([email])
Company:     [Company Name]
Deal Name:   [Auto-generated name]
Deal Type:   [Type]
Pipeline:    [Pipeline Name]
Stage:       [Stage Name]

LINE ITEMS:
┌─────────────────────────────────────┬─────┬──────────────┐
│ Product                             │ Qty │ Amount       │
├─────────────────────────────────────┼─────┼──────────────┤
│ [Product 1]                         │  1  │ $5,000.00    │
│ [Product 2]                         │  1  │ $2,500.00    │
└─────────────────────────────────────┴─────┴──────────────┘
                                  Subtotal:   $7,500.00
                                  Discount:   -$750.00 (10%)
                                     TOTAL:   $6,750.00

Quote Expiration: [Date]
Quote Terms: [Template name]

═══════════════════════════════════════════════════════════

Create this deal? [yes/no]
Also create quote? [yes/no]
Also create invoice? [yes/no]
```

### Step 8: Object Creation Sequence
Objects MUST be created sequentially (HubSpot has no composite API):

#### 8a. Create Deal
```bash
curl -X POST 'https://api.hubapi.com/crm/v3/objects/deals' \
  -H 'Authorization: Bearer [token]' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "dealname": "[Company] - [Type] - [Month Year]",
      "amount": "[total]",
      "pipeline": "[pipeline_id]",
      "dealstage": "[stage_id]",
      "closedate": "[close_date]",
      "hubspot_owner_id": "2740116"
    },
    "associations": [
      {"to": {"id": "[contact_id]"}, "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 3}]},
      {"to": {"id": "[company_id]"}, "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 5}]}
    ]
  }'
```

#### 8b. Create Line Items (for each product)
```bash
curl -X POST 'https://api.hubapi.com/crm/v3/objects/line_items' \
  -H 'Authorization: Bearer [token]' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "hs_product_id": "[product_id]",
      "quantity": "[qty]",
      "price": "[unit_price]",
      "discount": "[discount_amount if any]"
    },
    "associations": [
      {"to": {"id": "[deal_id]"}, "types": [{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 20}]}
    ]
  }'
```

#### 8c. Create Quote
```bash
curl -X POST 'https://api.hubapi.com/crm/v3/objects/quotes' \
  -H 'Authorization: Bearer [token]' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "hs_title": "Quote for [Company] - [Type]",
      "hs_expiration_date": "[expiration_date]",
      "hs_status": "DRAFT",
      "hs_language": "en",
      "hs_template_type": "CUSTOMIZABLE_QUOTE_TEMPLATE",
      "hs_comments": "[comments from terms template]",
      "hs_terms": "[terms from terms template]"
    }
  }'
```

Then associate quote:
```bash
# Associate with deal
curl -X PUT 'https://api.hubapi.com/crm/v4/objects/quotes/[quote_id]/associations/deals/[deal_id]' \
  -H 'Authorization: Bearer [token]' \
  -d '[{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 64}]'

# Associate with line items
curl -X PUT 'https://api.hubapi.com/crm/v4/objects/quotes/[quote_id]/associations/line_items/[line_item_id]' \
  -H 'Authorization: Bearer [token]' \
  -d '[{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 67}]'

# Associate with quote template
curl -X PUT 'https://api.hubapi.com/crm/v4/objects/quotes/[quote_id]/associations/quote_template/284147306418' \
  -H 'Authorization: Bearer [token]' \
  -d '[{"associationCategory": "HUBSPOT_DEFINED", "associationTypeId": 286}]'
```

#### 8d. Create Invoice (if requested)
```bash
curl -X POST 'https://api.hubapi.com/crm/v3/objects/invoices' \
  -H 'Authorization: Bearer [token]' \
  -H 'Content-Type: application/json' \
  -d '{
    "properties": {
      "hs_currency": "USD"
    }
  }'
```

### Step 9: Completion Summary
```
DEAL CREATED SUCCESSFULLY!

CREATED OBJECTS:
- Deal: [name] (ID: [id])
- Line Items: [count] items
- Quote: [title] (DRAFT)
- Invoice: [if created]

LINKS:
- Deal: https://app.hubspot.com/contacts/474711/deal/[deal_id]
- Quote: https://app.hubspot.com/quotes/474711/details/[quote_id]

NEXT STEPS:
1. Review the quote in HubSpot
2. Edit if needed and publish
3. Send to [Contact Name]

Would you like to create another deal?
```

## Association Type IDs Reference
| Association | Type ID |
|-------------|---------|
| Deal → Contact | 3 |
| Deal → Company | 5 |
| Line Item → Deal | 20 |
| Quote → Deal | 64 |
| Quote → Line Item | 67 |
| Quote → Template | 286 |

## Current Month Stage Mapping
The wizard automatically determines the current month's "Holding" stage:
- January: 978825825
- February: 978825827
- March: 978825829
- April: 978825831
- May: 978730409
- June: 978730411
- July: 978730413
- August: 978730415
- September: 978730417
- October: 978730419
- November: 978730421
- December: 978730423

## Error Handling
- **Contact not found**: Offer to search by email or create new contact
- **No company associated**: Offer to associate existing company or create new
- **API error**: Show error message, offer retry or save details for manual creation
- **Discount too high**: Warn if >25%, require confirmation

## Quick Commands
- `deal for [name]` - Start wizard with contact lookup
- `list products` - Show all available products
- `list templates` - Show available deal templates
- `show stages` - Show current month stages
