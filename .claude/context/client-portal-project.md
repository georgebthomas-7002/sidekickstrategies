# Sidekick Strategies Client Portal Plan

**Project Status:** Phase 2 Complete - Frontend Built
**Last Updated:** 2026-01-04

---

## Session Progress (2026-01-04)

### Phase 1: Backend Setup (Complete)
- [x] HubSpot Contact properties: `portal_enabled`, `portal_last_login`
- [x] HubSpot Company properties: `clickup_folder_id`, `clickup_list_id`, `portal_enabled`, `portal_tier`
- [x] Sanity schema: `portalClient` (deployed to n6sl2ooh/production)
- [x] Sanity schema: `portalSession` (deployed to n6sl2ooh/production)
- [x] Pilot client: Jones FWM configured in HubSpot + Sanity

### Phase 2: Frontend Implementation (Complete)
- [x] Portal layout with sidebar navigation (`/portal/layout.tsx`)
- [x] Login page with magic link form (`/portal/login/page.tsx`)
- [x] Verify page for token verification (`/portal/verify/page.tsx`)
- [x] Dashboard page with quick actions (`/portal/dashboard/page.tsx`)
- [x] Ask for Help form with category/priority (`/portal/help/page.tsx`)
- [x] Projects page showing ClickUp tasks (`/portal/projects/page.tsx`)
- [x] Billing page placeholder (`/portal/billing/page.tsx`)
- [x] Meetings page with scheduler embed (`/portal/meetings/page.tsx`)

### API Routes Created
- [x] `/api/portal/auth/request-magic-link` - Send login email
- [x] `/api/portal/auth/verify` - Verify token, create session
- [x] `/api/portal/auth/logout` - Clear session
- [x] `/api/portal/me` - Get current user
- [x] `/api/portal/tasks` - GET (list) + POST (create)

### Jones FWM Pilot Configuration
- HubSpot Company ID: `47522798621`
- HubSpot Contact ID (Shaun): `186064128913`
- ClickUp Folder ID: `90117447414`
- ClickUp List ID: `901112804768`
- Sanity portalClient ID: `6694a5d5-e094-4466-b637-12612c57ef1f`

### Next Steps (Phase 3)
- [ ] Set up Resend for production emails
- [ ] Test full flow with pilot client (Shaun Jones)
- [ ] Add real-time task updates
- [ ] Connect billing to HubSpot deals API
- [ ] Verify meeting scheduler integration

---

## Vision
Create a best-in-class client portal where clients can log in, request help (creates ClickUp tasks), view project status, see billing/invoices, and schedule meetings - all intelligently routed based on who's logged in.

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT PORTAL                                │
│  Next.js Frontend (/portal/*)                                       │
├─────────────────────────────────────────────────────────────────────┤
│                                                                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐              │
│  │   HubSpot    │  │    Sanity    │  │   ClickUp    │              │
│  │   (CRM)      │  │   (Content)  │  │   (Tasks)    │              │
│  │              │  │              │  │              │              │
│  │ • Contacts   │  │ • Portal     │  │ • Task CRUD  │              │
│  │ • Companies  │  │   Content    │  │ • Status     │              │
│  │ • Deals      │  │ • Resources  │  │ • Comments   │              │
│  │ • Meetings   │  │ • Sessions   │  │              │              │
│  └──────────────┘  └──────────────┘  └──────────────┘              │
│         │                  │                  │                     │
│         └──────────────────┼──────────────────┘                     │
│                            │                                        │
│              HubSpot Company.clickup_folder_id                      │
│                     (Mapping Layer)                                 │
└─────────────────────────────────────────────────────────────────────┘
```

## Key Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Authentication | Magic Link via Resend | No passwords, uses existing HubSpot contacts |
| Client Mapping | HubSpot Custom Property | Single source of truth, easy to manage |
| Email Service | Resend | Modern API, reliable, good free tier |
| Content Storage | Sanity | Rich content, real-time updates |

## MVP Features (Phase 1)

1. **Magic Link Authentication** - Email-based login using HubSpot contacts
2. **Ask for Help** - Create ClickUp tasks in client's folder
3. **Project Status View** - See all tasks, status, and progress from ClickUp
4. **Billing/Invoice Visibility** - View HubSpot deals, quotes, payment status
5. **Meeting Scheduling** - Book time with Sidekick team

---

## Data Model

### HubSpot Custom Properties to Create

**Contact Properties:**
| Property | Internal Name | Type | Purpose |
|----------|---------------|------|---------|
| Portal Enabled | `portal_enabled` | Checkbox | Gates portal access |
| Portal Last Login | `portal_last_login` | Date | Analytics |

**Company Properties:**
| Property | Internal Name | Type | Purpose |
|----------|---------------|------|---------|
| ClickUp Folder ID | `clickup_folder_id` | Text | Maps to ClickUp folder |
| ClickUp List ID | `clickup_list_id` | Text | Default list for new tasks |
| Portal Enabled | `portal_enabled` | Checkbox | Company-level gate |
| Portal Tier | `portal_tier` | Dropdown | standard/premium |

### Sanity Schemas to Create

**portalClient** - Client profiles with branding, welcome message
**portalSession** - Magic link tokens (temporary, single-use)
**portalAnnouncement** - Client-specific announcements

### ClickUp Structure (Delivery Space: 90110647697)

| Client | Folder ID | Main List ID |
|--------|-----------|--------------|
| Jones FWM | 90117447414 | 901112804768 |
| Craig Cody & Company | 90111470370 | 901102123793 |
| Girls With Impact | 90117375793 | 901112627596 |
| i9 Sports | 90115981889 | 901110210869 |
| Kaizen CPAs | 90111470376 | 901000652896 |
| LifeStarr | 90111480414 | 188285089 |
| Make Taxes Fair | 90111789726 | 901103369892 |
| Mick Hunt | 90116382315 | 901111100397 |
| Quality Data Systems | 90111470380 | 901100549115 |
| Retrofoam | 90116428360 | 901111217905 |
| Sonar Software | 90111985576 | 901103705083 |
| SafeSide Prevention | 90116607328 | 901111660045 |
| The Lighthouse | 90117196546 | 901112246235 |
| Vermost & Associates | 90111480922 | 901102801713 |
| Work Better Now | 90116189759 | 901110662484 |
| Sidekick Strategies | 90117258418 | 901112364319 |

---

## Authentication Flow

```
1. Client visits /portal/login
2. Enters email address
3. API checks HubSpot: contact exists + portal_enabled + company.portal_enabled
4. Generate magic token, store in Sanity portalSession (15min expiry)
5. Send email via Resend with magic link
6. Client clicks link → /portal/verify?token=xxx
7. Verify token (exists, not used, not expired)
8. Lookup HubSpot contact → company → clickup_folder_id
9. Create JWT with: { contactId, companyId, clickupFolderId, email }
10. Set httpOnly cookie, redirect to /portal/dashboard
```

---

## File Structure

```
frontend/app/
├── portal/
│   ├── layout.tsx              # Portal shell (sidebar, header, auth check)
│   ├── page.tsx                # Redirect to /portal/dashboard
│   ├── login/
│   │   └── page.tsx            # Magic link request form
│   ├── verify/
│   │   └── page.tsx            # Token verification
│   ├── dashboard/
│   │   └── page.tsx            # Welcome + summary cards
│   ├── help/
│   │   └── page.tsx            # "Ask for Help" form
│   ├── projects/
│   │   ├── page.tsx            # Task list from ClickUp
│   │   └── [taskId]/
│   │       └── page.tsx        # Task detail + comments
│   ├── billing/
│   │   └── page.tsx            # HubSpot deals/invoices
│   └── meetings/
│       └── page.tsx            # Meeting scheduler
├── api/
│   └── portal/
│       ├── auth/
│       │   ├── request-magic-link/route.ts
│       │   ├── verify/route.ts
│       │   └── logout/route.ts
│       ├── me/route.ts
│       ├── tasks/
│       │   ├── route.ts        # GET (list) + POST (create)
│       │   └── [taskId]/route.ts
│       ├── deals/route.ts
│       └── meetings/route.ts

studio/src/schemaTypes/
├── documents/
│   ├── portalClient.ts         # NEW
│   └── portalSession.ts        # NEW
├── objects/
│   └── portalAnnouncement.ts   # NEW
└── index.ts                    # Update exports
```

---

## Implementation Phases

### Phase 1: Foundation (Week 1)
- [ ] Create HubSpot custom properties (Contact + Company)
- [ ] Add Sanity schemas (portalClient, portalSession)
- [ ] Set up Resend for transactional emails
- [ ] Build magic link auth flow (request → verify → session)
- [ ] Create portal layout with auth middleware
- [ ] Basic dashboard page with user greeting

### Phase 2: Ask for Help + Project Status (Week 2)
- [ ] Build "Ask for Help" form component
- [ ] Create ClickUp task via API (in client's folder/list)
- [ ] Fetch and display tasks from ClickUp
- [ ] Task detail view with status and comments
- [ ] Add task status badges and filtering

### Phase 3: Billing & Meetings (Week 3)
- [ ] Fetch HubSpot deals associated with company
- [ ] Display deal pipeline, amounts, status
- [ ] Integrate meeting scheduler (HubSpot meetings or Calendly embed)
- [ ] Add meeting request flow

### Phase 4: Polish & Launch (Week 4)
- [ ] Error handling and edge cases
- [ ] Loading states and skeletons
- [ ] Mobile responsive design
- [ ] Set up initial client mappings in HubSpot
- [ ] Test with pilot client
- [ ] Documentation for internal team

---

## Dependencies to Add

```json
{
  "jose": "^5.x",
  "nanoid": "^5.x",
  "resend": "^3.x",
  "swr": "^2.x"
}
```

## Environment Variables to Add

```
PORTAL_JWT_SECRET=<generate-32-byte-secret>
PORTAL_MAGIC_LINK_SECRET=<generate-32-byte-secret>
RESEND_API_KEY=re_xxxx
CLICKUP_API_TOKEN=pk_xxxx
NEXT_PUBLIC_PORTAL_URL=https://sidekickstrategies.com/portal
```

---

## Security Checklist

- [ ] Magic link tokens: 32-byte random, 15-min expiry, single-use
- [ ] JWT in httpOnly, Secure, SameSite=Strict cookie
- [ ] All API routes validate JWT before processing
- [ ] ClickUp queries scoped to client's folder only
- [ ] HubSpot queries scoped to client's company only
- [ ] Rate limiting on auth endpoints
- [ ] Audit logging for sensitive actions

---

## Client Onboarding Checklist (Per Client)

1. [ ] Ensure HubSpot Company exists with contacts
2. [ ] Set `clickup_folder_id` on Company (from ClickUp)
3. [ ] Set `clickup_list_id` for default task list
4. [ ] Set `portal_enabled = true` on Company
5. [ ] Set `portal_enabled = true` on Contact(s) who need access
6. [ ] (Optional) Create portalClient in Sanity for custom branding

---

## Future Enhancements (Post-MVP)

- Real-time task updates via ClickUp webhooks
- Resource library with client-specific documents
- AI chat assistant for common questions
- Multi-user company access with roles
- White-label branding per client
- Training portal with video content
- Project timeline visualization
- Time tracking visibility

---

## Related Files

- **Sanity Project:** `n6sl2ooh` / `production`
- **HubSpot Account:** 474711 (sidekick-strategies-2026)
- **ClickUp Workspace:** 8617554
- **Frontend:** `/sidekickstrategies/frontend/`
- **Studio:** `/sidekickstrategies/studio/`
